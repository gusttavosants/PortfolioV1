import { Github, Linkedin, Instagram, Youtube, ChevronDown } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import FloatingCubes from "./FloatingCubes";

const HeroSection = () => {
  const { texts } = usePortfolioData();
  
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50" />
      
      {/* Floating 3D Cubes */}
      <FloatingCubes />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[auto_1fr] gap-12 items-center">
            {/* Social Links - Left Side */}
            <div className="hidden lg:flex flex-col items-center gap-6">
              <div className="flex flex-col gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/gusttavosants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Main Content */}
            <div className="relative">
              <div className="main-frame p-8 md:p-12 lg:p-16 bg-card/40 backdrop-blur-sm">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  {/* Text Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <p className="text-muted-foreground mb-2 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                      — Olá
                    </p>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                      Eu sou <span className="text-gradient">{texts.hero.title}</span>
                    </h1>
                    
                    <p className="text-lg text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                      {texts.hero.subtitle}
                    </p>
                    
                    <a
                      href="#about"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all glow animate-fade-up"
                      style={{ animationDelay: "0.4s" }}
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Saiba mais
                    </a>
                  </div>

                  {/* Profile Image Placeholder */}
                  <div className="relative animate-fade-up" style={{ animationDelay: "0.5s" }}>
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-primary/30 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <span className="text-6xl text-primary/50">👨‍💻</span>
                      </div>
                    </div>
                    
                    {/* Decorative element */}
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
                  </div>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="absolute -bottom-16 left-0 flex items-center gap-2 text-muted-foreground text-sm">
                <ChevronDown className="w-4 h-4 animate-bounce" />
                <span className="rotate-90 origin-left translate-x-4">scroll down</span>
              </div>
            </div>
          </div>

          {/* Mobile Social Links */}
          <div className="flex lg:hidden justify-center gap-4 mt-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary/50 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/gusttavosants"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary/50 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/gustsants/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary/50 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
