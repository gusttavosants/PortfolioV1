import { usePortfolioData } from "@/hooks/usePortfolioData";

const HeroSection = () => {
  const { texts } = usePortfolioData();

  const topSkills = [
    "JavaScript",
    "React.js",
    "CSS",
    "Software Design",
    "UI/UX Design",
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Greeting */}
          <h1
            className="text-2xl md:text-3xl font-normal text-white mb-6 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Hi, I'm Gustavo.
          </h1>

          {/* Description */}
          <p
            className="text-base md:text-lg text-gray-400 leading-relaxed mb-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Frontend Software Engineer who develops user-centered products.
          </p>
          <p
            className="text-base md:text-lg text-gray-400 leading-relaxed mb-8 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Passionate to create them with engineering and design principles.
          </p>
          <p
            className="text-base md:text-lg text-gray-400 leading-relaxed mb-8 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            Currently working on{" "}
            <a href="#projects" className="text-white hover:underline">
              amazing projects
            </a>
            . ✨
          </p>

          {/* Top Skills */}
          <div
            className="mb-10 animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <h2 className="text-sm font-medium text-white mb-4">Top Skills</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {topSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all animate-fade-up"
            style={{ animationDelay: "0.7s" }}
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Say Hello
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
