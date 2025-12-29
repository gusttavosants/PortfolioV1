import { Award, ExternalLink, Calendar } from "lucide-react";

const certificates = [
  {
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
  },
  {
    title: "Docker Certified Associate",
    issuer: "Docker Inc.",
    date: "2024",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop",
  },
  {
    title: "PostgreSQL Administration",
    issuer: "PostgreSQL",
    date: "2023",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
  },
  {
    title: "Node.js Application Developer",
    issuer: "OpenJS Foundation",
    date: "2023",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
  },
  {
    title: "Python Professional Certificate",
    issuer: "Python Institute",
    date: "2023",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
  },
  {
    title: "Kubernetes Administrator",
    issuer: "CNCF",
    date: "2022",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
  },
];

const CertificatesSection = () => {
  return (
    <section id="certificates" className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-primary mb-4 block">
              // certificações
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Certificados<span className="text-primary">.</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              Certificações e cursos que demonstram meu compromisso com o aprendizado contínuo 
              e a busca por excelência técnica.
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div
                key={cert.title}
                className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Certificate Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="p-2 rounded-lg bg-primary/20 backdrop-blur-sm">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {cert.issuer}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{cert.date}</span>
                    </div>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <span>Ver credencial</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
