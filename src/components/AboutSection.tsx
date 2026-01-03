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
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="font-mono text-sm text-primary mb-4 block">
                // sobre mim
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {texts.about.title}<span className="text-primary">.</span>
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </div>
          </AnimatedSection>

          {/* About Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <AnimatedSection delay={100}>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {texts.about.paragraph1}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {texts.about.paragraph2}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center p-4 rounded-lg bg-secondary/30 border border-border">
                    <span className="text-2xl md:text-3xl font-bold text-primary block">1+</span>
                    <span className="text-sm text-muted-foreground">Ano de Estudo</span>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/30 border border-border">
                    <span className="text-2xl md:text-3xl font-bold text-primary block">5+</span>
                    <span className="text-sm text-muted-foreground">Projetos</span>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/30 border border-border">
                    <span className="text-2xl md:text-3xl font-bold text-primary block">3+</span>
                    <span className="text-sm text-muted-foreground">Certificados</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Code Block */}
            <AnimatedSection delay={200}>
              <div className="relative">
                <div className="rounded-xl overflow-hidden border border-border bg-card">
                  <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-primary/60" />
                    <span className="ml-2 font-mono text-xs text-muted-foreground">developer.ts</span>
                  </div>
                  <pre className="p-6 font-mono text-sm overflow-x-auto">
                    <code>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-foreground">developer</span>{" "}
                      <span className="text-primary">=</span> {"{"}
                      {"\n"}
                      {"  "}
                      <span className="text-foreground">name</span>
                      <span className="text-primary">:</span>{" "}
                      <span className="text-primary">"Gustavo Melo"</span>,
                      {"\n"}
                      {"  "}
                      <span className="text-foreground">role</span>
                      <span className="text-primary">:</span>{" "}
                      <span className="text-primary">"Backend Developer"</span>,
                      {"\n"}
                      {"  "}
                      <span className="text-foreground">languages</span>
                      <span className="text-primary">:</span> [
                      <span className="text-primary">"TS"</span>,{" "}
                      <span className="text-primary">"Python"</span>,{" "}
                      <span className="text-primary">"Node.js"</span>],
                      {"\n"}
                      {"  "}
                      <span className="text-foreground">available</span>
                      <span className="text-primary">:</span>{" "}
                      <span className="text-blue-400">true</span>
                      {"\n"}
                      {"}"};</code>
                  </pre>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <AnimatedSection key={skill.title} delay={300 + index * 100}>
                <div className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:glow h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <skill.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {skill.title}
                  </h3>
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
