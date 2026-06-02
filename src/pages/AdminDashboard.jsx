import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://portfolio-backend-production-1584.up.railway.app";

export const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    demoUrl: "",
    githubUrl: "",
    image: "", // holds final URL (either typed or returned from upload)
  });
  const [imageFile, setImageFile] = useState(null);     // selected file object
  const [imagePreview, setImagePreview] = useState(""); // local preview URL
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

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
    } catch {
      setError("Failed to load projects");
    }
  };

  // When user picks a file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, image: "" })); // clear manual URL if file chosen
  };

  // Clear file selection
  const clearFile = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("adminToken");
    let imageUrl = form.image;

    // If a file was selected, upload it first
    if (imageFile) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await fetch(`${API_BASE}/api/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!uploadRes.ok) {
          const data = await uploadRes.json();
          setError(data.message || "Image upload failed");
          setUploading(false);
          return;
        }

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      } catch {
        setError("Image upload failed. Please try again.");
        setUploading(false);
        return;
      }
      setUploading(false);
    }

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
        body: JSON.stringify({ ...form, image: imageUrl, tech: techArray }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to add project");
        return;
      }

      // Reset form
      setForm({ title: "", description: "", tech: "", demoUrl: "", githubUrl: "", image: "" });
      clearFile();
      fetchProjects();
    } catch {
      setError("Something went wrong.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    try {
      await fetch(`${API_BASE}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch {
      setError("Failed to delete project");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const textFields = [
    { key: "title", label: "Title", required: true },
    { key: "description", label: "Description", required: false },
    { key: "demoUrl", label: "Demo URL", required: false },
    { key: "githubUrl", label: "GitHub URL", required: false },
  ];

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
          {textFields.map(({ key, label, required }) => (
            <div key={key}>
              <label className="block text-sm mb-1">{label}</label>
              <input
                type="text"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required={required}
              />
            </div>
          ))}

          {/* Tech tags */}
          <div>
            <label className="block text-sm mb-1">Tech (comma separated)</label>
            <input
              type="text"
              value={form.tech}
              onChange={(e) => setForm({ ...form, tech: e.target.value })}
              placeholder="React, Node.js, MongoDB"
              className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Image — file picker + URL fallback */}
          <div>
            <label className="block text-sm mb-1">Project Image</label>

            {/* File picker */}
            <div className="flex items-center gap-3 mb-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 rounded-md border border-border bg-background hover:bg-secondary transition text-sm"
              >
                Choose File
              </button>
              {imageFile && (
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  {imageFile.name}
                  <button
                    type="button"
                    onClick={clearFile}
                    className="text-red-400 hover:text-red-600 text-xs"
                  >
                    ✕ Remove
                  </button>
                </span>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Preview */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-md mb-2 border border-border"
              />
            )}

            {/* URL fallback */}
            {!imageFile && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Or paste an image URL:
                </p>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://example.com/image.png"
                  className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={uploading}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
          >
            {uploading ? "Uploading image..." : "Add Project"}
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
                <div className="flex items-center gap-3">
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-12 h-12 object-cover rounded-md border border-border"
                    />
                  )}
                  <div className="text-left">
                    <p className="font-medium">{p.title}</p>
                    <div className="flex gap-3">
                      {p.demoUrl && (
                        <a href={p.demoUrl} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">
                          Demo ↗
                        </a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>

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
