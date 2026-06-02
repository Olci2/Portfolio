import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://portfolio-backend-production-1584.up.railway.app";

export const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    link: "",
    image: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
  const storedToken = localStorage.getItem("adminToken");

  if (!storedToken) {
    navigate("/admin");
    return;
  }

  fetchProjects();
}, [navigate]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch  {
      setError("Failed to load projects");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    const techArray = form.tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch(`${API_BASE}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, tech: techArray }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to add project");
        return;
      }

      setForm({
        title: "",
        description: "",
        tech: "",
        link: "",
        image: "",
      });

      fetchProjects();
    } catch  {
      setError("Something went wrong.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProjects();
    } catch  {
      setError("Failed to delete project");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Add Project Form */}
      <div className="bg-card border border-border rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Add Project</h2>

        <form onSubmit={handleAdd} className="space-y-3">
          {["title", "description", "link", "image"].map((field) => (
            <div key={field}>
              <label className="block text-sm mb-1 capitalize">
                {field}
              </label>

              <input
                type="text"
                value={form[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required={field === "title"}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm mb-1">
              Tech (comma separated)
            </label>

            <input
              type="text"
              value={form.tech}
              onChange={(e) =>
                setForm({ ...form, tech: e.target.value })
              }
              placeholder="React, Node.js, MongoDB"
              className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition"
          >
            Add Project
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Projects</h2>

        {projects.length === 0 ? (
          <p className="text-muted-foreground">No projects yet.</p>
        ) : (
          <ul className="space-y-3">
            {projects.map((p) => (
              <li
                key={p._id}
                className="flex justify-between items-center bg-card border border-border px-4 py-3 rounded-lg"
              >
                <span className="font-medium">{p.title}</span>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};