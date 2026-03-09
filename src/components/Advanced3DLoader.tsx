import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Advanced3DLoader = ({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 3000;
    const interval = 30;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onLoadingComplete, 800);
          }, 500);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated 3D Shapes */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Central Rotating Cube */}
        <motion.div
          className="absolute"
          style={{ perspective: "1000px" }}
          animate={{
            rotateY: [0, 360],
            rotateX: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="w-32 h-32 relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Cube faces */}
            {[
              {
                transform: "translateZ(64px)",
                bg: "from-white/20 to-white/10",
              },
              {
                transform: "rotateY(180deg) translateZ(64px)",
                bg: "from-white/15 to-white/5",
              },
              {
                transform: "rotateY(90deg) translateZ(64px)",
                bg: "from-white/20 to-white/10",
              },
              {
                transform: "rotateY(-90deg) translateZ(64px)",
                bg: "from-white/15 to-white/5",
              },
              {
                transform: "rotateX(90deg) translateZ(64px)",
                bg: "from-white/20 to-white/10",
              },
              {
                transform: "rotateX(-90deg) translateZ(64px)",
                bg: "from-white/15 to-white/5",
              },
            ].map((face, i) => (
              <motion.div
                key={i}
                className={`absolute w-32 h-32 bg-gradient-to-br ${face.bg} border border-white/20 backdrop-blur-sm`}
                style={{
                  transform: face.transform,
                  backfaceVisibility: "hidden",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Orbiting Spheres */}
        {[0, 120, 240].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-white/30 to-white/10 border border-white/20 backdrop-blur-sm"
            animate={{
              x: [
                Math.cos((angle * Math.PI) / 180) * 150,
                Math.cos(((angle + 360) * Math.PI) / 180) * 150,
              ],
              y: [
                Math.sin((angle * Math.PI) / 180) * 150,
                Math.sin(((angle + 360) * Math.PI) / 180) * 150,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Loading Text */}
        <motion.div
          className="absolute bottom-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.p
            className="text-white/60 text-sm mb-4 font-light tracking-widest"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Materializing shapes...
          </motion.p>

          {/* Progress Bar */}
          <div className="w-64 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white/60"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Percentage */}
          <motion.p className="text-white/40 text-xs mt-2 font-mono">
            {Math.floor(progress)}%
          </motion.p>
        </motion.div>

        {/* Floating Particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Advanced3DLoader;
