import { Helmet } from "react-helmet-async";
import InteractiveHero from "@/components/InteractiveHero";
import Footer from "@/components/Footer";
import AnimatedMenu from "@/components/AnimatedMenu";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Home | Gustavo Melo</title>
        <meta
          name="description"
          content="Backend Software Engineer especializado em Python, Node.js e NestJS. Desenvolvedor de soluções robustas e escaláveis."
        />
        <meta
          name="keywords"
          content="backend developer, software engineer, python, nodejs, nestjs, typescript, API, web development"
        />
      </Helmet>

      <div className="min-h-screen bg-black">
        <AnimatedMenu />
        <main>
          <InteractiveHero />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
