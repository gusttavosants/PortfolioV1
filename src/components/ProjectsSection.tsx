import { Github, ExternalLink, Folder } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import AnimatedSection from "./AnimatedSection";

const ProjectsSection = () => {
  const { projects, isLoading } = usePortfolioData();

  if (isLoading) {
    return (
      <section id="projects" className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="text-muted-foreground">Carregando projetos...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="font-mono text-sm text-primary mb-4 block">
                // projetos
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O que eu construí<span className="text-primary">.</span>
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
              <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
                Uma seleção dos meus projetos mais relevantes, 
                demonstrando diferentes tecnologias e padrões de arquitetura.
              </p>
            </div>
          </AnimatedSection>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 100}>
                <div className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:glow flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Folder className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2 py-1 rounded bg-secondary/50 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              Nenhum projeto adicionado ainda.
            </div>
          )}

          {/* View More */}
          <AnimatedSection delay={600}>
            <div className="text-center mt-12">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground hover:border-primary hover:text-primary transition-all font-medium"
              >
                <Github className="w-5 h-5" />
                <span>Ver mais no GitHub</span>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
