import { Briefcase, Code, User } from "lucide-react";
import CV from "../assets/Oldzhay_Ahmed_CV.pdf";



export const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-4 relative">
            {""}
            <div className="container mx-auto max-w-5xl ">

                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    About <span className="text-primary">Me</span>
                </h2>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <div className="space-7-6">
                        <h3 className="text-2xl font-semibold ">Passionate Web Developer & Tech Creator</h3>

                        <p className="text-muted-foreground">
                            I'm a dedicated web developer passionate about building dynamic, user-friendly websites. With expertise in HTML, CSS, JavaScript, and modern frameworks like React and Node.js, I create responsive and engaging web applications. I thrive on solving complex problems and continuously learning new technologies to sharpen my skills and deliver exceptional results.
                             </p>

                        <p className="text-muted-foreground">
                             Beyond coding, I love sharing knowledge through tech blogging and tutorials. When I'm not immersed in development, you'll find me exploring the latest tech trends, contributing to open-source projects, or indulging my passions for photography and travel.
                             </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                               
                            <a href="#contact" className="cosmic-button">{""}
                                Get In Touch
                            </a>
                                 { /*cv*/ }
                            <a href={CV} 
                                 download="Oldzhay_Ahmed_CV.pdf"
                             className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-center">
                                Download CV
                            </a>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 gap-6">
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                <Code className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left ">
                                    <h4 className="font-semibold text-lg">Web Development</h4>
                                    <p className="text-muted-foreground ">
                                       Crafting clean, responsive, and dynamic websites with React, Node.js, and modern web tools to bring ideas to life on the web.
                                    </p>
                                </div>
                        </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                           <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                <User className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left ">
                                    <h4 className="font-semibold text-lg">UI/UX Design</h4>
                                    <p className="text-muted-foreground ">
                                      Designing intuitive interfaces and smooth experiences that connect with users and make digital interactions effortless.
                                    </p>
                                </div>
                        </div>

                        </div>
                        <div className="gradient-border p-6 card-hover">
                               <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                <Briefcase className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left ">
                                    <h4 className="font-semibold text-lg">Professional Growth</h4>
                                    <p className="text-muted-foreground ">
                                        Continuously learning, adapting, and bringing a strong work ethic to every project to achieve both personal and professional excellence.
                                    </p>
                                </div>
                        </div>
                        </div>
                        
            </div>
            </div>
            </div>
            </section>
    );
};