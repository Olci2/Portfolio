import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_BASE = "https://portfolio-backend-production-1584.up.railway.app";

const STATUS_STYLES = {
  Completed: "bg-green-500/20 text-green-400 border border-green-500/30",
  "In Development":
    "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Concept: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Archived: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
};

// Screenshot gallery shown inside expanded card
const ScreenshotGallery = ({ screenshots, title }) => {
  const [active, setActive] = useState(0);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div className="mt-4">
      {/* Main image */}
      <div className="rounded-lg overflow-hidden border border-border mb-2 h-56">
        <img
          src={screenshots[active]}
          alt={`${title} screenshot ${active + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Thumbnails */}
      {screenshots.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {screenshots.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${
                active === i
                  ? "border-primary"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt={`thumb ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Expanded detail panel shown below a clicked card
const ProjectDetail = ({ project, onClose }) => {
  return (
    <div className="col-span-full bg-card border border-primary/30 rounded-xl p-6 md:p-8 relative animate-fade-in">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary/50 transition-colors"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-5">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              {project.status && (
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[project.status] || STATUS_STYLES.Concept}`}
                >
                  {project.status}
                </span>
              )}
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Tech stack */}
          {project.tech?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium border border-primary/40 rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* What I learned */}
          {project.learned && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                What I Learned
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.learned}
              </p>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Challenges
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.challenges}
              </p>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4 pt-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 cosmic-button text-sm"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-all text-sm"
              >
                <Github size={15} /> GitHub
              </a>
            )}
          </div>
        </div>

        {/* RIGHT — screenshots */}
        <div>
          {/* Cover image if no screenshots */}
          {(!project.screenshots || project.screenshots.length === 0) &&
            project.image && (
              <div className="rounded-lg overflow-hidden border border-border h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          <ScreenshotGallery
            screenshots={project.screenshots}
            title={project.title}
          />
        </div>
      </div>
    </div>
  );
};

export const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Insert detail panel after the card's row
  // We render cards + detail panel in a flat list with col-span tricks
  const renderProjects = () => {
    const items = [];

    projects.forEach((project) => {
      // Card
      items.push(
        <div
          key={project._id}
          onClick={() => handleCardClick(project._id)}
          className={`group bg-card rounded-xl overflow-hidden shadow-xs card-hover cursor-pointer border-2 transition-all duration-300 ${
            expandedId === project._id
              ? "border-primary/60"
              : "border-transparent hover:border-primary/20"
          }`}
        >
          {/* Image */}
          <div className="h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div className="p-6">
            {/* Status + tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {project.status && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[project.status] || STATUS_STYLES.Concept}`}
                >
                  {project.status}
                </span>
              )}
              {(project.tech || []).slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium border rounded-full bg-primary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
              {project.tech?.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{project.tech.length - 3} more
                </span>
              )}
            </div>

            <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    <Github size={18} />
                  </a>
                )}
              </div>

              <span className="text-xs text-primary flex items-center gap-1 font-medium">
                {expandedId === project._id ? (
                  <>
                    <ChevronUp size={14} /> Less
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} /> Details
                  </>
                )}
              </span>
            </div>
          </div>
        </div>,
      );

      // Insert detail panel after this card if it's the expanded one
      if (expandedId === project._id) {
        items.push(
          <ProjectDetail
            key={`detail-${project._id}`}
            project={project}
            onClose={() => setExpandedId(null)}
          />,
        );
      }
    });

    return items;
  };

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A curated selection of projects that showcase clean design, practical
          engineering, and real-world problem-solving. Click any card to explore
          the full story behind each build.
        </p>

        {loading ? (
          <p className="text-center text-muted-foreground">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <p className="text-center text-muted-foreground">No projects yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {renderProjects()}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            href="https://github.com/Olci2"
            target="_blank"
            rel="noreferrer"
          >
            Check My Github
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
