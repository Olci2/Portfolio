import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://portfolio-backend-production-1584.up.railway.app";

const STATUS_OPTIONS = ["Completed", "In Development", "Concept", "Archived"];

export const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    longDescription: "",
    tech: "",
    learned: "",
    challenges: "",
    status: "Completed",
    demoUrl: "",
    githubUrl: "",
    image: "",
  });

  // Cover image
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Screenshots
  const [screenshotFiles, setScreenshotFiles] = useState([]);
  const [screenshotPreviews, setScreenshotPreviews] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const coverInputRef = useRef(null);
  const screenshotsInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/projects`);
      setProjects(await res.json());
    } catch {
      setError("Failed to load projects");
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setForm((p) => ({ ...p, image: "" }));
  };

  const handleScreenshotsChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setScreenshotFiles(files);
    setScreenshotPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeScreenshot = (index) => {
    setScreenshotFiles((prev) => prev.filter((_, i) => i !== index));
    setScreenshotPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("adminToken");
    let imageUrl = form.image;
    let screenshotUrls = [];

    setUploading(true);

    // Upload cover image
    if (imageFile) {
      try {
        const fd = new FormData();
        fd.append("image", imageFile);
        const res = await fetch(`${API_BASE}/api/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        if (!res.ok) {
          setError("Cover image upload failed");
          setUploading(false);
          return;
        }
        imageUrl = (await res.json()).url;
      } catch {
        setError("Cover image upload failed");
        setUploading(false);
        return;
      }
    }

    // Upload screenshots
    if (screenshotFiles.length > 0) {
      try {
        const fd = new FormData();
        screenshotFiles.forEach((f) => fd.append("screenshots", f));
        const res = await fetch(`${API_BASE}/api/upload/screenshots`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        if (!res.ok) {
          setError("Screenshots upload failed");
          setUploading(false);
          return;
        }
        screenshotUrls = (await res.json()).urls;
      } catch {
        setError("Screenshots upload failed");
        setUploading(false);
        return;
      }
    }

    setUploading(false);

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
        body: JSON.stringify({
          ...form,
          image: imageUrl,
          screenshots: screenshotUrls,
          tech: techArray,
        }),
      });
      if (!res.ok) {
        setError((await res.json()).message || "Failed");
        return;
      }

      // Reset
      setForm({
        title: "",
        description: "",
        longDescription: "",
        tech: "",
        learned: "",
        challenges: "",
        status: "Completed",
        demoUrl: "",
        githubUrl: "",
        image: "",
      });
      setImageFile(null);
      setImagePreview("");
      setScreenshotFiles([]);
      setScreenshotPreviews([]);
      if (coverInputRef.current) coverInputRef.current.value = "";
      if (screenshotsInputRef.current) screenshotsInputRef.current.value = "";
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

  const field = (
    key,
    label,
    required = false,
    placeholder = "",
    textarea = false,
  ) => (
    <div key={key}>
      <label className="block text-sm mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          required={required}
        />
      ) : (
        <input
          type="text"
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          required={required}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/admin");
          }}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <div className="bg-card border border-border rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Add Project</h2>

        <form onSubmit={handleAdd} className="space-y-4">
          {/* Basic info */}
          {field("title", "Title", true)}
          {field(
            "description",
            "Short Description (shown on card)",
            true,
            "One or two sentences...",
            true,
          )}
          {field(
            "longDescription",
            "Full Write-up (shown when expanded)",
            false,
            "Detailed explanation of the project...",
            true,
          )}

          {/* Status */}
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Tech */}
          <div>
            <label className="block text-sm mb-1">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              value={form.tech}
              onChange={(e) => setForm({ ...form, tech: e.target.value })}
              placeholder="React, Node.js, MongoDB"
              className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {field(
            "learned",
            "What I Learned",
            false,
            "Skills, concepts, tools you picked up...",
            true,
          )}
          {field(
            "challenges",
            "Challenges Faced",
            false,
            "What was hard and how you overcame it...",
            true,
          )}
          {field("demoUrl", "Demo URL")}
          {field("githubUrl", "GitHub URL")}

          {/* Cover image */}
          <div>
            <label className="block text-sm mb-1">Cover Image</label>
            <div className="flex items-center gap-3 mb-2">
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="px-3 py-2 rounded-md border border-border bg-background hover:bg-secondary transition text-sm"
              >
                Choose File
              </button>
              {imageFile && (
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  {imageFile.name}
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview("");
                      coverInputRef.current.value = "";
                    }}
                    className="text-red-400 hover:text-red-600 text-xs"
                  >
                    ✕
                  </button>
                </span>
              )}
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-md mb-2 border border-border"
              />
            )}
            {!imageFile && (
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="Or paste image URL..."
                className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
          </div>

          {/* Screenshots */}
          <div>
            <label className="block text-sm mb-1">Screenshots (up to 6)</label>
            <div className="flex items-center gap-3 mb-2">
              <button
                type="button"
                onClick={() => screenshotsInputRef.current?.click()}
                className="px-3 py-2 rounded-md border border-border bg-background hover:bg-secondary transition text-sm"
              >
                Choose Screenshots
              </button>
              {screenshotFiles.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {screenshotFiles.length} file(s) selected
                </span>
              )}
              <input
                ref={screenshotsInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleScreenshotsChange}
                className="hidden"
              />
            </div>
            {screenshotPreviews.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {screenshotPreviews.map((src, i) => (
                  <div key={i} className="relative">
                    <img
                      src={src}
                      alt={`screenshot ${i + 1}`}
                      className="w-20 h-20 object-cover rounded-md border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeScreenshot(i)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={uploading}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Add Project"}
          </button>
        </form>
      </div>

      {/* Projects list */}
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
                    <div className="flex gap-2 items-center">
                      {p.status && (
                        <span className="text-xs text-muted-foreground">
                          {p.status}
                        </span>
                      )}
                      {p.screenshots?.length > 0 && (
                        <span className="text-xs text-muted-foreground">
                          · {p.screenshots.length} screenshot(s)
                        </span>
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
