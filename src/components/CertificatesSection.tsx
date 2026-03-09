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
    title: "",
  });

  const handleViewPdf = (pdfData: string, title: string) => {
    setPdfViewer({
      isOpen: true,
      pdfData,
      title,
    });
  };

  const handleClosePdfViewer = () => {
    setPdfViewer({
      isOpen: false,
      pdfData: "",
      title: "",
    });
  };

  if (isLoading) {
    return (
      <section id="certificates" className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400">Carregando certificados...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="certificates"
        className="py-32 md:py-40 bg-black relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="mb-20">
                <div className="inline-block mb-4">
                  <span className="text-sm font-mono text-gray-500">
                    // certificados
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Certificados
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                    & Qualificações
                  </span>
                </h2>
                <p className="max-w-2xl text-lg text-gray-400 leading-relaxed">
                  Certificações e cursos que demonstram meu compromisso com o
                  aprendizado contínuo e a busca por excelência técnica.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <AnimatedSection key={cert.id} delay={index * 100}>
                  <div className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <div className="rounded-xl border border-white/10 bg-black/40 p-2 backdrop-blur-sm">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
                        {cert.issuer}
                      </p>
                      <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-white transition-colors group-hover:text-gray-200">
                        {cert.title}
                      </h3>

                      <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{cert.date}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        {cert.pdfFile && (
                          <button
                            onClick={() =>
                              handleViewPdf(cert.pdfFile!, cert.title)
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white transition hover:bg-white/10"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Abrir PDF</span>
                          </button>
                        )}
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
                        >
                          <span>Ver credencial</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {certificates.length === 0 && (
              <div className="py-12 text-center text-gray-400">
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
