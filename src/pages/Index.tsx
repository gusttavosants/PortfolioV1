import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CertificatesSection from "@/components/CertificatesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio | Desenvolvedor Backend</title>
        <meta
          name="description"
          content="Portfolio de desenvolvedor backend especializado em APIs, bancos de dados e arquitetura de software. Node.js, Python, Java, PostgreSQL, Docker e AWS."
        />
        <meta
          name="keywords"
          content="desenvolvedor backend, backend developer, API, Node.js, Python, Java, PostgreSQL, Docker, AWS"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <CertificatesSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
