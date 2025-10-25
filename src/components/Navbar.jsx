
import {useEffect, useState} from "react";
import { cn } from "@/components/lib/utils";
import { Menu, X } from "lucide-react";


const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects',href: '#projects' },
  { name: 'Contact', href: '#contact' },

];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

   useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
        window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    return (
    <nav 
    className={cn(
        "fixed w-full z-40 transition-all duration-300", 
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
    )}
    >

     <div className="container mx-auto px-4 md:px-20 flex items-center justify-between">
  <a
    className="text-xl font-bold text-primary flex items-center"
    href="#hero"
  >
    <span className="relative z-10">
      <span className="text-glow text-foreground">OldzhayTech</span> Portfolio
    </span>
  </a>

  {/* Desktop nav */}
  <div className="hidden md:flex space-x-8">
    {navItems.map((item, key) => (
      <a
        key={key}
        href={item.href}
        className="text-foreground/80 hover:text-primary transition-colors duration-300"
      >
        {item.name}
      </a>
    ))}
  </div>

  {/* Mobile toggle button */}
  <button
    onClick={() => setIsMenuOpen((prev) => !prev)}
    className="md:hidden p-2 text-foreground z-50"
    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
  >
    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
  </button>

  {/* Mobile menu */}
  <div
    className={cn(
      "fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex flex-col items-center justify-center md:hidden transition-all duration-300",
      isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}
  >
    <div className="flex flex-col space-y-8 text-xl px-4">
      {navItems.map((item, key) => (
        <a
          key={key}
          href={item.href}
          className="text-foreground/80 hover:text-primary transition-colors duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          {item.name}
        </a>
      ))}
    </div>
  </div>
</div>
    </nav>
     

        );
};