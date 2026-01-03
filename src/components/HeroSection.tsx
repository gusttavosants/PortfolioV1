import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const HeroSection = () => {
  const { texts } = usePortfolioData();
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal-style greeting */}
          <div className="inline-block mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="font-mono text-sm text-muted-foreground bg-secondary px-4 py-2 rounded-full border border-border">
              <span className="text-primary">$</span> whoami
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Olá, eu sou{" "}
            <span className="text-gradient">{texts.hero.title}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {texts.hero.subtitle}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {["Python", "Node.js", "TypeScript", "Nest.js", "React", "IA/RAG"].map((tech) => (
              <span
                key={tech}
                className="font-mono text-sm px-4 py-2 rounded-lg bg-secondary/50 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <a
              href="https://github.com/gusttavosants"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary/50 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:glow"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/gustsants/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary/50 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:glow"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:gustavoluizsantosmelo@gmail.com"
              className="p-3 rounded-lg bg-secondary/50 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:glow"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
