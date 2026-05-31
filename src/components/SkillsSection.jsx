import { useState } from "react";
import { cn } from "@/components/lib/utils";

const skills = [
  // frontend

  { name: "HTML5", level: 50, category: "frontend" },
  { name: "CSS3/SCSS", level: 80, category: "frontend" },
  { name: "JavaScript", level: 80, category: "frontend" },
  { name: "React.js", level: 80, category: "frontend" },
  { name: "Tailwind CSS", level: 80, category: "frontend" },

  //backend
  { name: "Node.js", level: 60, category: "backend" },
  { name: "Express.js", level: 60, category: "backend" },
  { name: "MongoDB", level: 60, category: "backend" },
  { name: "Firebase", level: 60, category: "backend" },
  { name: "RESTful APIs", level: 60, category: "backend" },
  { name: "JSON & Fetch/Axios", level: 80, category: "backend" },

  //tools
  { name: "Git & GitHub", level: 80, category: "tools" },
  { name: "VS Code", level: 80, category: "tools" },
  { name: "npm / yarn", level: 80, category: "tools" },
  { name: "Vite", level: 60, category: "tools" },
  { name: "Linux & macOS Terminal", level: 60, category: "tools" },
  { name: "Docker", level: 60, category: "tools" },

  //creative & personal skills
  { name: "Problem-Solving", level: 90, category: "personal" },
  { name: "Communication", level: 90, category: "personal" },
  { name: "Time Management", level: 90, category: "personal" },
  { name: "Learning Agility", level: 90, category: "personal" },
  { name: "UI Design Canva", level: 90, category: "personal" },
  { name: "Research & Analysis", level: 90, category: "personal" },
  { name: "Collaboration", level: 90, category: "personal" },
];

const categories = ["all", "frontend", "backend", "tools", "personal"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory,
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My
          <span className="text-primary">Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
