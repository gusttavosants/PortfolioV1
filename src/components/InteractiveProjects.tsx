import { motion } from "framer-motion";
import { ArrowUpRight, Github, RefreshCw, Star, GitFork } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { Link } from "react-router-dom";
import { useState } from "react";

const InteractiveProjects = () => {
  const {
    projects,
    isLoading,
    githubUsername,
    updateGithubUsername,
    featuredGithubProjects,
    toggleFeaturedGithubProject,
    updateFeaturedGithubProject,
  } = usePortfolioData();
  const [usernameInput, setUsernameInput] = useState(githubUsername);
  const {
    repos,
    isLoading: isLoadingRepos,
    error,
    refetch,
  } = useGithubRepos(githubUsername);

  if (isLoading) {
    return (
      <section id="projects" className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="py-32 md:py-40 relative bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div className="inline-block mb-4">
              <span className="text-sm font-mono text-gray-500">
                // trabalhos
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Projetos
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Selecionados
              </span>
            </h2>
          </motion.div>

          <div className="mb-16 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <Github className="h-5 w-5 text-white" />
              <h3 className="text-lg font-semibold text-white">
                GitHub conectado
              </h3>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <input
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Seu username do GitHub"
                className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-white/30"
              />
              <button
                onClick={() => updateGithubUsername(usernameInput.trim())}
                className="rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-gray-200"
              >
                Salvar usuário
              </button>
              <button
                onClick={refetch}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white transition hover:bg-white/10"
              >
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-400">
              Repositórios públicos carregados de{" "}
              <span className="text-white">github.com/{githubUsername}</span>
            </p>
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative h-full"
                >
                  <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-white/5 transition-all hover:border-white/20">
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                      <div className="flex items-start justify-between">
                        <span className="text-6xl font-bold text-white/10">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <motion.div
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ArrowUpRight className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>

                      <div>
                        <h3 className="mb-3 text-3xl font-bold text-white transition-transform group-hover:translate-x-2">
                          {project.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-gray-300">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="mt-20">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Repositórios do GitHub
                </h3>
                <p className="mt-2 text-gray-400">
                  Seus repositórios públicos mais recentes aparecem
                  automaticamente aqui.
                </p>
              </div>
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                Ver perfil
              </a>
            </div>

            {isLoadingRepos ? (
              <div className="text-gray-400">Carregando repositórios...</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {repos.slice(0, 6).map((repo) => {
                  const featuredRepo = featuredGithubProjects.find(
                    (project) => project.repoName === repo.name,
                  );

                  return (
                    <div
                      key={repo.id}
                      className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
                    >
                      {featuredRepo?.coverImage ? (
                        <img
                          src={featuredRepo.coverImage}
                          alt={featuredRepo.title}
                          className="mb-4 h-40 w-full rounded-xl object-cover"
                        />
                      ) : null}

                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-lg font-semibold text-white transition group-hover:translate-x-1"
                          >
                            {repo.name}
                          </a>
                          <p className="mt-2 line-clamp-3 text-sm text-gray-400">
                            {repo.description || "Sem descrição no GitHub."}
                          </p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-gray-500" />
                      </div>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {repo.language && (
                          <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">
                            {repo.language}
                          </span>
                        )}
                        {repo.topics.slice(0, 2).map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-gray-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {repo.stargazers_count}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="h-4 w-4" />
                          {repo.forks_count}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          onClick={() =>
                            toggleFeaturedGithubProject(
                              repo.name,
                              repo.description ||
                                "Repositório em destaque do GitHub.",
                            )
                          }
                          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                            featuredRepo
                              ? "bg-white text-black hover:bg-gray-200"
                              : "border border-white/10 bg-black/30 text-white hover:bg-white/10"
                          }`}
                        >
                          {featuredRepo
                            ? "Remover destaque"
                            : "Destacar no portfólio"}
                        </button>

                        {featuredRepo && (
                          <Link
                            to={`/projects/${featuredRepo.id}`}
                            className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                          >
                            Abrir página do projeto
                          </Link>
                        )}
                      </div>

                      {featuredRepo && (
                        <div className="mt-4 space-y-3 rounded-xl border border-white/10 bg-black/30 p-4">
                          <input
                            value={featuredRepo.title}
                            onChange={(e) =>
                              updateFeaturedGithubProject(featuredRepo.id, {
                                title: e.target.value,
                              })
                            }
                            placeholder="Título em destaque"
                            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
                          />
                          <input
                            value={featuredRepo.coverImage || ""}
                            onChange={(e) =>
                              updateFeaturedGithubProject(featuredRepo.id, {
                                coverImage: e.target.value,
                              })
                            }
                            placeholder="URL da capa do repositório"
                            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
                          />
                          <textarea
                            value={featuredRepo.description}
                            onChange={(e) =>
                              updateFeaturedGithubProject(featuredRepo.id, {
                                description: e.target.value,
                              })
                            }
                            placeholder="Resumo curto do projeto"
                            className="min-h-[88px] w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
                          />
                          <textarea
                            value={featuredRepo.longDescription}
                            onChange={(e) =>
                              updateFeaturedGithubProject(featuredRepo.id, {
                                longDescription: e.target.value,
                              })
                            }
                            placeholder="Descrição longa da página do projeto"
                            className="min-h-[120px] w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
                          />
                          <textarea
                            value={featuredRepo.screenshots.join(", ")}
                            onChange={(e) =>
                              updateFeaturedGithubProject(featuredRepo.id, {
                                screenshots: e.target.value
                                  .split(",")
                                  .map((item) => item.trim())
                                  .filter(Boolean),
                              })
                            }
                            placeholder="URLs dos prints, separadas por vírgula"
                            className="min-h-[88px] w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {featuredGithubProjects.length > 0 && (
            <div className="mt-20">
              <h3 className="mb-6 text-2xl font-bold text-white">
                Repos em destaque
              </h3>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {featuredGithubProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/10"
                  >
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="h-48 w-full bg-gradient-to-br from-white/10 to-white/5" />
                    )}
                    <div className="p-5">
                      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
                        Destaque GitHub
                      </p>
                      <h4 className="text-xl font-semibold text-white">
                        {project.title}
                      </h4>
                      <p className="mt-2 line-clamp-3 text-sm text-gray-400">
                        {project.description}
                      </p>
                      <p className="mt-4 text-xs text-gray-500">
                        {project.screenshots.length} print(s) cadastrado(s)
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {projects.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              Nenhum projeto adicionado ainda.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveProjects;
