import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#about" },
  { label: "Certificados", href: "#certificates" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo - Centered */}
          <a
            href="#home"
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 text-foreground hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
          >
            <span className="font-bold text-lg">Gustavo</span>
            <span className="font-bold text-lg text-primary">Melo</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Spacer for mobile */}
          <div className="md:hidden w-10" />
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden glass border-t border-border animate-fade-up">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block px-4 py-2 text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors rounded-lg"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
