import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { cn } from "@/components/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({
        title: "Something went wrong.",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          I'm always excited to connect with fellow developers, collaborators,
          or anyone interested in my work. Whether you have a project in mind,
          want to discuss ideas, or just want to say hello, feel free to reach
          out!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center justify-center space-y-8">
            <h3 className="text-2xl font-semibold text-center">Contact Information</h3>
            <div className="space-y-6 flex flex-col">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Email</h4>
                  <a href="mailto:oldzhay.ahmed.work@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    oldzhay.ahmed.work@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Location</h4>
                  <span className="text-muted-foreground">United Kingdom</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <h4 className="font-medium">Connect With Me</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/oldzhay-ahmed-it-/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors duration-300">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/Olci2/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors duration-300">
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="John Doe..."
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="john@gmail.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                <textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn("cosmic-button w-full flex items-center justify-center gap-2")}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
