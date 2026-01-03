import { Award, ExternalLink, Calendar, FileText } from "lucide-react";
import { useState } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import AnimatedSection from "./AnimatedSection";
import PdfViewer from "./PdfViewer";

const CertificatesSection = () => {
  const { certificates, isLoading } = usePortfolioData();
  const [pdfViewer, setPdfViewer] = useState<{
    isOpen: boolean;
    pdfData: string;
    title: string;
  }>({
    isOpen: false,
    pdfData: "",
    title: ""
  });

  const handleViewPdf = (pdfData: string, title: string) => {
    setPdfViewer({
      isOpen: true,
      pdfData,
      title
    });
  };

  const handleClosePdfViewer = () => {
    setPdfViewer({
      isOpen: false,
      pdfData: "",
      title: ""
    });
  };

  if (isLoading) {
    return (
      <section id="certificates" className="py-20 md:py-32 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-muted-foreground">Carregando certificados...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="certificates" className="py-20 md:py-32 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <AnimatedSection>
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
            </AnimatedSection>

            {/* Certificates Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <AnimatedSection key={cert.id} delay={index * 100}>
                  <div className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:glow h-full">
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

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{cert.date}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between gap-2">
                        {cert.pdfFile && (
                          <button
                            onClick={() => handleViewPdf(cert.pdfFile!, cert.title)}
                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <FileText className="w-3 h-3" />
                            <span>Visualizar PDF</span>
                          </button>
                        )}
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-primary hover:underline ml-auto"
                        >
                          <span>Ver credencial</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {certificates.length === 0 && (
              <div className="text-center text-muted-foreground py-12">
                Nenhum certificado adicionado ainda.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      <PdfViewer
        isOpen={pdfViewer.isOpen}
        onClose={handleClosePdfViewer}
        pdfData={pdfViewer.pdfData}
        title={pdfViewer.title}
      />
    </>
  );
};

export default CertificatesSection;
