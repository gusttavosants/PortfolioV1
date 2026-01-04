import { Code2, Database, Server, Cloud } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const skills = [
  {
    icon: Server,
    title: "APIs & Microservices",
    description: "Desenvolvimento de APIs RESTful com Python (FastAPI, Flask) e Node.js (NestJS), focando em arquitetura escalável e performance.",
  },
  {
    icon: Database,
    title: "Bancos de Dados",
    description: "Modelagem e otimização de bancos SQL (PostgreSQL, MySQL) e NoSQL (MongoDB), com aplicação de Arquitetura RAG.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Experiência com AWS, Azure e Supabase, combinando desenvolvimento com conhecimento em infraestrutura e suporte técnico.",
  },
  {
    icon: Code2,
    title: "Arquitetura",
    description: "Design de sistemas backend, padrões de projeto e clean code, com foco em soluções robustas e escaláveis.",
  },
];

const AboutSection = () => {
  const { texts } = usePortfolioData();
  
  return (
    <section id="about" className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sobre mim
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </div>
          </AnimatedSection>

          {/* About Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Profile Image */}
            <AnimatedSection delay={100}>
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border border-border bg-card">
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-8xl text-primary/30">👨‍💻</span>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 border-l-2 border-t-2 border-primary/50 rounded-tl-2xl" />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r-2 border-b-2 border-primary/50 rounded-br-2xl" />
              </div>
            </AnimatedSection>

            {/* Text Content */}
            <AnimatedSection delay={200}>
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold">
                  Eu vou <span className="text-gradient">Desenvolver</span> os melhores sistemas
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {texts.about.paragraph1}
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  {texts.about.paragraph2}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all">
                    <span className="text-2xl md:text-3xl font-bold text-primary block">1+</span>
                    <span className="text-sm text-muted-foreground">Ano de Estudo</span>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all">
                    <span className="text-2xl md:text-3xl font-bold text-primary block">5+</span>
                    <span className="text-sm text-muted-foreground">Projetos</span>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all">
                    <span className="text-2xl md:text-3xl font-bold text-primary block">3+</span>
                    <span className="text-sm text-muted-foreground">Certificados</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Skills Section Title */}
          <AnimatedSection delay={300}>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Minhas Skills
              </h3>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
            </div>
          </AnimatedSection>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <AnimatedSection key={skill.title} delay={400 + index * 100}>
                <div className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:glow h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <skill.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {skill.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
