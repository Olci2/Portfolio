import { Briefcase, Code, GraduationCap, Cpu, BookOpen } from "lucide-react";

const timelineItems = [
  {
    type: "education",
    icon: GraduationCap,
    date: "May 2025 — Present",
    title: "BTEC Higher National in Business",
    place: "London College of Communication (LCC)",
    description:
      "Studying applied business with a focus on professional development, strategic thinking, and leadership. Pursuing this alongside tech to move toward a product owner / tech lead role — keeping the IT skills sharp while building the business and management foundation to lead teams and products.",
  },
  {
    type: "work",
    icon: Briefcase,
    date: "Apr 2024 — Apr 2025",
    title: "Home Lab Server Management",
    place: "Self-employed",
    description:
      "Built and managed a personal home lab server — now remotely hosted in Bulgaria where electricity and internet costs are lower. Set up Proxmox with multiple VMs, Home Assistant for home automation, and Tailscale (WireGuard-based VPN) for secure remote access. Ran smaller LLMs locally for experimentation. Also tackled firewall configuration — painful but educational.",
  },
  {
    type: "milestone",
    icon: Code,
    date: "Early 2025",
    title: "Started Coding — Frontend First",
    place: "Self-taught",
    description:
      "Began the coding journey focused primarily on frontend development — HTML, CSS, JavaScript, then React. Learned through hands-on building rather than courses, picking up Tailwind CSS, component-based thinking, and modern tooling like Vite along the way.",
  },
  {
    type: "milestone",
    icon: Code,
    date: "2025",
    title: "First Noteworthy Project — This Portfolio",
    place: "React · Node.js · MongoDB · Railway · Vercel",
    description:
      "Built a full-stack portfolio from scratch — React frontend with a custom Node.js/Express backend, MongoDB database, JWT-protected admin dashboard, Cloudinary image uploads, and contact form via Resend. Deployed the backend on Railway and the frontend on Vercel.",
  },
];

const currentlyLearning = [
  {
    icon: "🐳",
    title: "Docker & Kubernetes",
    description: "Container orchestration, deployments, scaling — widely expanding in the industry and a core skill for any backend/DevOps work.",
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    description: "Going deeper into Node.js, APIs, databases, and server architecture beyond what the portfolio already uses.",
  },
  {
    icon: "📦",
    title: "Cloud & Infrastructure",
    description: "Experimenting with cloud platforms, CI/CD pipelines, and infrastructure-as-code to understand how production systems are built and scaled.",
  },
  {
    icon: "💼",
    title: "Business & Product Management",
    description: "Through LCC — learning how to bridge the gap between technology and business, with the goal of moving into a product owner or tech lead role.",
  },
];

const TYPE_STYLES = {
  education: "bg-primary/10 text-primary border-primary/30",
  work: "bg-green-500/10 text-green-400 border-green-500/30",
  milestone: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
};

const LINE_STYLES = {
  education: "bg-primary",
  work: "bg-green-500",
  milestone: "bg-yellow-500",
};

export const TimelineSection = () => {
  return (
    <section id="timeline" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary">Journey</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Education, work experience, and the milestones that got me here.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden sm:block" />

          <div className="space-y-10">
            {timelineItems.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  className={`relative flex flex-col sm:flex-row gap-6 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className="sm:w-[calc(50%-2rem)] w-full">
                    <div className="bg-card border border-border rounded-xl p-5 card-hover">
                      {/* Badge */}
                      <span
                        className={`inline-block text-xs px-2 py-0.5 rounded-full border font-medium mb-3 ${TYPE_STYLES[item.type]}`}
                      >
                        {item.type === "education"
                          ? "Education"
                          : item.type === "work"
                          ? "Work"
                          : "Milestone"}
                      </span>

                      <p className="text-xs text-muted-foreground mb-1">{item.date}</p>
                      <h3 className="font-semibold text-lg mb-0.5">{item.title}</h3>
                      <p className="text-sm text-primary/80 mb-3">{item.place}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Centre dot */}
                  <div className="hidden sm:flex absolute left-1/2 top-6 -translate-x-1/2 w-10 h-10 rounded-full bg-card border-2 border-border items-center justify-center z-10">
                    <div className={`w-3 h-3 rounded-full ${LINE_STYLES[item.type]}`} />
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Currently Learning */}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-3 mb-10">
            <BookOpen className="text-primary h-6 w-6" />
            <h3 className="text-2xl font-bold">
              Currently <span className="text-primary">Learning</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {currentlyLearning.map((item, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-5 card-hover flex gap-4 items-start"
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="text-left">
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};