import { Helmet } from "react-helmet-async";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import AnimatedMenu from "@/components/AnimatedMenu";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Sobre | Gustavo Melo</title>
        <meta
          name="description"
          content="Desenvolvedor Backend especializado em Python, Node.js e NestJS. Conheça minha trajetória e habilidades."
        />
      </Helmet>

      <div className="min-h-screen bg-black">
        <AnimatedMenu />
        <main>
          <AboutSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
