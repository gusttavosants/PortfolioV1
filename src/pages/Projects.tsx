import { Helmet } from "react-helmet-async";
import InteractiveProjects from "@/components/InteractiveProjects";
import Footer from "@/components/Footer";
import AnimatedMenu from "@/components/AnimatedMenu";

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Projetos | Gustavo Melo</title>
        <meta
          name="description"
          content="Portfólio de projetos backend: chatbots, APIs RESTful, sistemas de automação e soluções com IA."
        />
      </Helmet>

      <div className="min-h-screen bg-black">
        <AnimatedMenu />
        <main>
          <InteractiveProjects />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Projects;
