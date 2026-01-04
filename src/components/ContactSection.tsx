import { Mail, MapPin, Phone, Github, Linkedin, Instagram, Youtube, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AnimatedSection from "./AnimatedSection";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "gustavoluizsantosmelo@gmail.com",
    href: "mailto:gustavoluizsantosmelo@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+55 (12) 93585-4861",
    href: "tel:+5512935854861",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "São Paulo, Brasil",
    href: null,
  },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ), label: "Twitter", href: "https://twitter.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/gusttavosants" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/gustsants/" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Em breve entrarei em contato.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get a quote
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <AnimatedSection delay={100}>
              <div className="space-y-8">
                {/* Logo/Brand */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">G</span>
                  </div>
                  <span className="font-bold text-xl">Gustavo<span className="text-primary">Melo</span></span>
                </div>

                {/* Social Links */}
                <div>
                  <p className="text-sm text-muted-foreground mb-4">Me siga nas redes:</p>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-center gap-4">
                      <div className="text-primary">
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form - Orange Theme */}
            <AnimatedSection delay={200}>
              <div className="rounded-xl p-8 bg-primary text-primary-foreground">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider mb-2 opacity-80">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/50 focus:outline-none transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider mb-2 opacity-80">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/50 focus:outline-none transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-wider mb-2 opacity-80">
                      Your Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/50 focus:outline-none transition-all"
                      placeholder="Enter your phone"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-wider mb-2 opacity-80">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/50 focus:outline-none transition-all resize-none"
                      placeholder="Type your message..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-background text-foreground rounded-lg font-medium hover:bg-background/90 transition-all"
                  >
                    Send message
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
