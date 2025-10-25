import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
    return ( 
    <section 
    id="hero" 
    className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 md:pt-32"
    >
        <div className="container max-w-4xl mx-auto text-center z-10">
            <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    <span className="opacity-0 animate-fade-in"> Hi, I'm </span>
                    <span className="text-primary opacity-0 animate-fade-in-delay-1"> Oldzhay </span>
                    <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2"> Ahmed </span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-2-2xl md:auto opacity-0 animate-fade-in-delay-3">
                    I'm very passionate about learning new things, and this is my very first project in React.
                    I'm excited to explore web development and improve my skills through hands-on experience. 
                    This project is just the beginning of my journey into building amazing apps!
                </p>

                <div className="pt-4 opacity-0 animate-fade-in-delay-4">
                    <a href="#projects" className="cosmic-button">
                    View My Work
                    </a>
                </div>
            </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
            <span> Scroll </span>
            <ArrowDown className="h-5 w-5 text-primary" />

        </div>

    </section>
    );
};

