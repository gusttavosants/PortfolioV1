import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Instagram,
  Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
  { icon: Github, label: "GitHub", href: "https://github.com/gusttavosants" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gustsants/",
  },
];

const InteractiveContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-32 md:py-40 relative bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-bl from-white/5 to-transparent blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4">
              <span className="text-sm font-mono text-gray-500">
                // contato
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Vamos construir
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                algo juntos
              </span>
            </h2>
            <p className="max-w-2xl text-lg text-gray-400 leading-relaxed">
              Se você quer conversar sobre backend, produtos, freelas ou
              oportunidades, este é o melhor lugar para começar.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-white font-bold text-xl">G</span>
                </motion.div>
                <div>
                  <span className="font-bold text-xl text-white">
                    Gustavo<span className="text-gray-400">Melo</span>
                  </span>
                  <p className="text-sm text-gray-500">Backend Developer</p>
                </div>
              </div>

              <div>
                <p className="mb-4 text-sm font-mono text-gray-500">// redes</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-400 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                      aria-label={social.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 6 }}
                  >
                    <div className="rounded-xl border border-white/10 bg-black/30 p-3 text-white">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white hover:text-gray-300 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <p className="mb-2 text-sm font-mono text-gray-500">
                  // envie uma mensagem
                </p>
                <h3 className="text-2xl font-semibold text-white">
                  Fale comigo
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-wider mb-2 text-gray-400"
                  >
                    Seu nome
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 transition-all focus:border-white/30 focus:outline-none"
                    placeholder="Digite seu nome"
                    required
                    animate={{
                      scale: focusedField === "name" ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-wider mb-2 text-gray-400"
                  >
                    Seu e-mail
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 transition-all focus:border-white/30 focus:outline-none"
                    placeholder="Digite seu e-mail"
                    required
                    animate={{
                      scale: focusedField === "email" ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs uppercase tracking-wider mb-2 text-gray-400"
                  >
                    Telefone
                  </label>
                  <motion.input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 transition-all focus:border-white/30 focus:outline-none"
                    placeholder="Digite seu telefone"
                    animate={{
                      scale: focusedField === "phone" ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-wider mb-2 text-gray-400"
                  >
                    Mensagem
                  </label>
                  <motion.textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 transition-all focus:border-white/30 focus:outline-none"
                    placeholder="Escreva sua mensagem..."
                    required
                    animate={{
                      scale: focusedField === "message" ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-black transition-all hover:bg-gray-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enviar mensagem
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveContact;
