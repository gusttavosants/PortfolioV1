import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Github", href: "https://github.com/gusttavosants" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gustsants/" },
];

const AnimatedMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    }),
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <motion.button
        className="fixed top-8 right-8 z-50 text-white"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="flex flex-col gap-1.5"
          animate={isOpen ? "open" : "closed"}
        >
          <motion.span
            className="w-6 h-0.5 bg-white origin-center"
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 6 },
            }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white origin-center"
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -6 },
            }}
          />
        </motion.div>
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-black border-l border-white/10 z-40 overflow-y-auto"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="p-12 pt-24">
                {/* Brand */}
                <motion.div
                  className="mb-16"
                  custom={0}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                >
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Gustavo<span className="text-gray-400">Melo</span>
                  </h2>
                  <p className="text-gray-500 text-sm">Backend Developer</p>
                </motion.div>

                {/* Navigation */}
                <nav className="mb-16">
                  {menuItems.map((item, index) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={handleNavClick}
                    >
                      <motion.div
                        className="block py-4 text-4xl md:text-5xl font-bold text-white/40 hover:text-white transition-colors relative group"
                        custom={index + 1}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        whileHover={{ x: 10 }}
                      >
                        <span className="relative">
                          {item.label}
                          <motion.span className="absolute -left-6 top-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </motion.span>
                        </span>
                      </motion.div>
                    </Link>
                  ))}
                </nav>

                {/* Social Links */}
                <motion.div
                  className="space-y-3"
                  custom={menuItems.length + 1}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                >
                  <p className="text-gray-500 text-sm mb-4">Follow me</p>
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white/60 hover:text-white transition-colors text-sm"
                      whileHover={{ x: 5 }}
                    >
                      ↗ {link.label}
                    </motion.a>
                  ))}
                </motion.div>

                {/* Footer */}
                <motion.div
                  className="mt-16 pt-8 border-t border-white/10"
                  custom={menuItems.length + 2}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                >
                  <p className="text-gray-600 text-xs">© 2025 Gustavo Melo</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedMenu;
