import { Helmet } from "react-helmet-async";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import AnimatedMenu from "@/components/AnimatedMenu";

const Experience = () => {
  return (
    <>
      <Helmet>
        <title>Experiências | Gustavo Melo</title>
        <meta
          name="description"
          content="Trajetória profissional como desenvolvedor backend. Experiência com Python, Node.js, NestJS e arquitetura RAG."
        />
      </Helmet>

      <div className="min-h-screen bg-black">
        <AnimatedMenu />
        <main>
          <ExperienceSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Experience;
