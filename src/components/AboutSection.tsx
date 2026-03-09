import AnimatedSection from "./AnimatedSection";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import {
  Code2,
  Database,
  Sparkles,
  Wrench,
  TrendingUp,
  Award,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const { texts } = usePortfolioData();

  const stats = [
    { value: "1+", label: "Ano de Experiência", icon: TrendingUp },
    { value: "5+", label: "Projetos Concluídos", icon: Award },
    { value: "3+", label: "Certificações", icon: Users },
    { value: "100%", label: "Dedicação", icon: Zap },
  ];

  const expertise = [
    {
      icon: Code2,
      title: "Backend Development",
      description: "Python, Node.js, NestJS, RESTful APIs",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Database,
      title: "Database & Architecture",
      description: "PostgreSQL, MongoDB, RAG Architecture",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: Sparkles,
      title: "AI & Innovation",
      description: "IA Agents, RAG, Automation",
      color: "from-amber-500/20 to-orange-500/20",
    },
    {
      icon: Wrench,
      title: "DevOps & Tools",
      description: "Git, Docker, CI/CD, AWS",
      color: "from-green-500/20 to-emerald-500/20",
    },
  ];

  return (
    <section
      id="about"
      className="py-32 md:py-40 relative overflow-hidden bg-black"
    >
      {/* Minimal Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Gradient Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <AnimatedSection>
            <div className="mb-20">
              <motion.div
                className="inline-block mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-mono text-gray-500">
                  // sobre mim
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Construindo o futuro
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                  uma API por vez
                </span>
              </h2>
            </div>
          </AnimatedSection>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-12 mb-20">
            {/* Left Column - About Text */}
            <AnimatedSection delay={100} className="lg:col-span-3">
              <div className="space-y-8">
                <div className="space-y-6">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {texts.about.paragraph1}
                  </p>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    {texts.about.paragraph2}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-8">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                      >
                        <Icon className="w-5 h-5 text-gray-400 mb-3 group-hover:text-white transition-colors" />
                        <div className="text-4xl font-bold text-white mb-2">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {stat.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>

            {/* Right Column - Expertise */}
            <AnimatedSection delay={200} className="lg:col-span-2">
              <div className="space-y-4">
                <h3 className="text-lg font-mono text-gray-500 mb-6">
                  // expertise
                </h3>

                {/* Expertise Cards */}
                <div className="space-y-3">
                  {expertise.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className={`group relative p-5 rounded-xl bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all overflow-hidden`}
                      >
                        <div className="relative z-10">
                          <Icon className="w-6 h-6 text-white mb-3" />
                          <h4 className="font-semibold text-white mb-2">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-300">
                            {item.description}
                          </p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
