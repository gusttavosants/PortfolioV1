import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import InteractiveHero from "./InteractiveHero";
import InteractiveProjects from "./InteractiveProjects";
import InteractiveContact from "./InteractiveContact";
import AboutSection from "./AboutSection";

const HorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const sections = [
    { id: "home", component: <InteractiveHero />, title: "Home" },
    { id: "about", component: <AboutSection />, title: "About" },
    { id: "projects", component: <InteractiveProjects />, title: "Work" },
    { id: "contact", component: <InteractiveContact />, title: "Contact" },
  ];

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{ x }}
        >
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="min-w-full h-full flex items-center justify-center relative"
            >
              {/* Section Number */}
              <motion.div
                className="absolute top-8 left-8 text-white/20 text-9xl font-bold pointer-events-none"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                0{index + 1}
              </motion.div>

              {/* Section Content */}
              <div className="w-full h-full">
                {section.component}
              </div>

              {/* Section Title - Vertical */}
              <motion.div
                className="absolute right-8 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <p
                  className="text-white/40 text-sm tracking-widest uppercase"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >
                  {section.title}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className="w-12 h-1 bg-white/20 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-white"
              style={{
                scaleX: useTransform(
                  scrollYProgress,
                  [index / sections.length, (index + 1) / sections.length],
                  [0, 1]
                ),
              }}
              initial={{ scaleX: 0 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HorizontalScroll;
