import { ArrowRight, ExternalLink, Github } from "lucide-react";



 const projects = [
    {
        id: 1,
        title: "Web Development Portfolio",
        Description: "A clean and responsive project demonstrating layout, animation, and UI design with React and TailwindCSS.",
        image: "public/assets/projects/Pi7_Gif.gif",
        tags: ["React", "TailwindCSS"],
        demoUrl: "#",
        githubUrl: "https://github.com/Olci2/Portfolio",

    },
    {
        id: 2,
        title: "OpenWebUI LLM Setup",
        Description: "Dockerized interface for running a local LLM with OpenWebUI on macOS. Explored containerization and networking fundamentals.",
        image: "public/assets/projects/OpenWebUI/Screenshot 2025-10-26 at 20.37.04.png",
        tags: ["Docker", "OpenWebUI"],
        demoUrl: "#",
        githubUrl: "https://github.com/Olci2/OpenWebUI-LLM-Docker",

    },
    {
        id: 3,
        title: "random project",
        Description: "#",
        image: "#",
        tags: ["#"],
        demoUrl: "#",
        githubUrl: "https://github.com/Olci2",

    },
];

export const ProjectSection = () => {
                return <section 
                id="projects" 
                className="py-24 px-4 relative">
                <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                {""}
                Featured
                <span className="text-primary">Projects</span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    A curated selection of recent projects that showcase clean design, practical engineering, and real-world problem-solving — explore demos, view source, and the ideas behind each build.
                </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {projects.map((project, key) => (
                    <div 
                    key={key} 
                    className="group bd-card rounded-lg overflow-hidden shadow-xs card-hover"
                    >
                    <div className="h-48 overflow-hidden ">
                    <img 
                    src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            </div>

                                <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-primary text-secondary-foreground"> 
                                    {tag}
                                    </span>
                                ))}
                       

                 </div>
                 <h3 className="text-xl font-semibold mb-1" >{project.title}</h3>
                 <p className="text-muted-foreground text-sm mb-4">
                 {project.description}
                 </p>
                 <div className="flex justify-between items-center">
                 <div className="flex space-x-3">

                 <a href={project.demoUrl} 
                 target="_blank"
                 className="text-foregorund/80 hover:text-primary trasnition-colors duration-300">
                 <ExternalLink size={20}/>
                 </a>
                 <a href={project.githubUrl} 
                 target="_blank"
                 className="text-foregorund/80 hover:text-primary trasnition-colors duration-300"> 
                 <Github size={20} />
                 </a>
                 </div>

                 </div>
                 </div>
                 </div>     
))}
          </div>
          <div className="text-center mt-12">
                                        <a className="cosmic-button w-fit flex items-center mx-auto gap-2"
                                        href="https://github.com/Olci2" 
                                        target="_blank"> 
                                        Check My Github<ArrowRight size={16}/>
                                        </a>
                                        </div>
                                        </div> 


    </section>
};