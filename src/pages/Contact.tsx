import { Helmet } from "react-helmet-async";
import InteractiveContact from "@/components/InteractiveContact";
import Footer from "@/components/Footer";
import AnimatedMenu from "@/components/AnimatedMenu";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contato | Gustavo Melo</title>
        <meta
          name="description"
          content="Entre em contato para discutir projetos, oportunidades de desenvolvimento backend ou colaborações."
        />
      </Helmet>

      <div className="min-h-screen bg-black">
        <AnimatedMenu />
        <main>
          <InteractiveContact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
