import { usePortfolioData } from "@/hooks/usePortfolioData";
import AnimatedSection from "./AnimatedSection";
import { Briefcase } from "lucide-react";

const ExperienceSection = () => {
  const { experiences } = usePortfolioData();

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section id="experiences" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="font-mono text-sm text-primary mb-4 block">
                // carreira
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Experiência Profissional<span className="text-primary">.</span>
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </div>
          </AnimatedSection>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-5 md:left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" />

            {experiences.map((exp, index) => (
              <AnimatedSection key={exp.id} delay={100 * index}>
                <div className={`mb-12 flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:flex w-1/2" />
                  <div className="relative w-full md:w-1/2 md:px-8">
                    {/* Timeline Dot */}
                    <div className="absolute top-1 left-5 md:left-0 -translate-x-1/2 md:translate-x-0 w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div className="pl-12 md:pl-0">
                      <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:glow">
                        <p className="text-sm text-muted-foreground mb-1">{exp.startDate} - {exp.endDate || 'Atual'}</p>
                        <h3 className="font-semibold text-lg mb-1">{exp.title}</h3>
                        <p className="text-primary text-sm font-medium mb-3">{exp.company}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
