import { usePortfolioData } from "@/hooks/usePortfolioData";
import AnimatedSection from "./AnimatedSection";
import { Briefcase, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const ExperienceSection = () => {
  const { experiences } = usePortfolioData();

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section
      id="experiences"
      className="py-32 md:py-40 relative overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <AnimatedSection>
            <div className="mb-20">
              <motion.div
                className="inline-block mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-mono text-gray-500">
                  // trajetória
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Experiência
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                  Profissional
                </span>
              </h2>
            </div>
          </AnimatedSection>

          {/* Experience Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                  {/* Icon */}
                  <div className="absolute -left-4 top-8 w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="ml-12">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {exp.startDate} - {exp.endDate || "Atual"}
                      </span>
                    </div>

                    {/* Title & Company */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-gray-400 mb-4 font-medium">
                      {exp.company}
                    </p>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
