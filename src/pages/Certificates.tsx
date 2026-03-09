import { Helmet } from "react-helmet-async";
import CertificatesSection from "@/components/CertificatesSection";
import Footer from "@/components/Footer";
import AnimatedMenu from "@/components/AnimatedMenu";

const Certificates = () => {
  return (
    <>
      <Helmet>
        <title>Certificados | Gustavo Melo</title>
        <meta
          name="description"
          content="Certificações e qualificações profissionais em desenvolvimento backend e tecnologias web."
        />
      </Helmet>

      <div className="min-h-screen bg-black">
        <AnimatedMenu />
        <main>
          <CertificatesSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Certificates;
