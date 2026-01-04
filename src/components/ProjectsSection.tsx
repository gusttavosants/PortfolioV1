import { ExternalLink } from "lucide-react";
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
    <section id="projects" className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Works
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
              <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
                Uma seleção dos meus projetos mais relevantes, 
                demonstrando diferentes tecnologias e padrões de arquitetura.
              </p>
            </div>
          </AnimatedSection>

          {/* Projects Grid - Card Style from Reference */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 100}>
                <div className="group relative rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden h-full flex flex-col">
                  {/* Project Header */}
                  <div className="p-6 flex-grow">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs px-2 py-1 rounded bg-secondary/50 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Link */}
                  <div className="p-4 border-t border-border">
                    <a
                      href={project.liveUrl || project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-all"
                    >
                      View live
                      <ExternalLink className="w-4 h-4" />
                    </a>
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
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
