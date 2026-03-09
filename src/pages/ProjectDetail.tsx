import { useParams, useNavigate, Link } from "react-router-dom";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import AnimatedMenu from "@/components/AnimatedMenu";
import Footer from "@/components/Footer";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, githubUsername, featuredGithubProjects } =
    usePortfolioData();
  const { repos } = useGithubRepos(githubUsername);

  const manualProject = projects.find((p) => p.id === id);
  const featuredGithubProject = featuredGithubProjects.find((p) => p.id === id);
  const githubRepo = featuredGithubProject
    ? repos.find((repo) => repo.name === featuredGithubProject.repoName)
    : null;

  const project = manualProject
    ? {
        ...manualProject,
        longDescription:
          manualProject.longDescription || manualProject.description,
        screenshots: manualProject.screenshots || [],
      }
    : featuredGithubProject
      ? {
          id: featuredGithubProject.id,
          title: featuredGithubProject.title,
          description: featuredGithubProject.description,
          coverImage: featuredGithubProject.coverImage,
          longDescription: featuredGithubProject.longDescription,
          technologies: githubRepo
            ? [githubRepo.language, ...githubRepo.topics].filter(Boolean)
            : [],
          githubUrl:
            githubRepo?.html_url ||
            `https://github.com/${githubUsername}/${featuredGithubProject.repoName}`,
          liveUrl: githubRepo?.homepage || null,
          screenshots: featuredGithubProject.screenshots,
        }
      : null;

  const detailProjects = [
    ...projects,
    ...featuredGithubProjects.map((featuredProject) => ({
      id: featuredProject.id,
      title: featuredProject.title,
    })),
  ];

  const currentIndex = detailProjects.findIndex((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Projeto não encontrado
          </h1>
          <Link to="/projects" className="text-gray-400 hover:text-white">
            Voltar para projetos
          </Link>
        </div>
      </div>
    );
  }

  const prevProject =
    currentIndex > 0 ? detailProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < detailProjects.length - 1
      ? detailProjects[currentIndex + 1]
      : null;

  return (
    <>
      <Helmet>
        <title>{project.title} | Gustavo Melo</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="min-h-screen bg-black">
        <AnimatedMenu />

        <main className="pt-24 pb-20">
          {/* Back Button */}
          <div className="container mx-auto px-6 mb-12">
            <motion.button
              onClick={() => navigate("/projects")}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar para projetos</span>
            </motion.button>
          </div>

          {/* Project Content */}
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed mb-8">
                  {project.description}
                </p>

                {project.longDescription && (
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 whitespace-pre-line">
                    {project.longDescription}
                  </p>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5" />
                      <span>Ver no GitHub</span>
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 hover:border-white/20 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Ver projeto ao vivo</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>

              {/* Project Image Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-16"
              >
                {project.coverImage && (
                  <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <img
                      src={project.coverImage}
                      alt={`${project.title} cover`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {project.screenshots && project.screenshots.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {project.screenshots.map((screenshot, index) => (
                      <div
                        key={`${screenshot}-${index}`}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                      >
                        <img
                          src={screenshot}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                        <Github className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="text-gray-400">
                        Nenhum print cadastrado ainda
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between pt-12 border-t border-white/10"
              >
                {prevProject ? (
                  <Link
                    to={`/projects/${prevProject.id}`}
                    className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                      <ChevronLeft className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-500 mb-1">Anterior</div>
                      <div className="font-medium">{prevProject.title}</div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {nextProject ? (
                  <Link
                    to={`/projects/${nextProject.id}`}
                    className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">Próximo</div>
                      <div className="font-medium">{nextProject.title}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProjectDetail;
