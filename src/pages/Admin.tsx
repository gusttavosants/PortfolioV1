import { useState, type ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Award,
  Folder,
  LogOut,
  Briefcase,
  FileText,
  Edit,
} from "lucide-react";
import {
  Certificate,
  Project,
  Experience,
  TextContent,
} from "@/types/portfolio";

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
    reader.readAsDataURL(file);
  });

const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    certificates,
    projects,
    experiences,
    isLoading,
    addCertificate,
    removeCertificate,
    updateCertificate,
    addProject,
    removeProject,
    updateProject,
    addExperience,
    removeExperience,
    texts,
    updateTexts,
  } = usePortfolioData();

  const [newCertificate, setNewCertificate] = useState<Omit<Certificate, "id">>(
    {
      title: "",
      issuer: "",
      date: "",
      location: "",
      credentialUrl: "",
      image: "",
    },
  );

  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    technologies: [],
    githubUrl: "",
    liveUrl: null,
    coverImage: "",
    longDescription: "",
    screenshots: [],
  });

  const [techInput, setTechInput] = useState("");
  const [projectScreenshotsInput, setProjectScreenshotsInput] = useState("");

  const [editableTexts, setEditableTexts] = useState<TextContent>(texts);

  const [newExperience, setNewExperience] = useState<Omit<Experience, "id">>({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [editingCertificate, setEditingCertificate] =
    useState<Certificate | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectEditModalOpen, setIsProjectEditModalOpen] = useState(false);
  const [editingProjectScreenshotsInput, setEditingProjectScreenshotsInput] =
    useState("");

  const handleAddCertificate = () => {
    if (!newCertificate.title || !newCertificate.issuer) {
      toast.error("Preencha título e emissor do certificado");
      return;
    }
    addCertificate(newCertificate);
    setNewCertificate({
      title: "",
      issuer: "",
      date: "",
      location: "",
      credentialUrl: "",
      image: "",
    });
    toast.success("Certificado adicionado!");
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) {
      toast.error("Preencha título e descrição do projeto");
      return;
    }
    addProject(newProject);
    setNewProject({
      title: "",
      description: "",
      technologies: [],
      githubUrl: "",
      liveUrl: null,
      coverImage: "",
      longDescription: "",
      screenshots: [],
    });
    setTechInput("");
    setProjectScreenshotsInput("");
    toast.success("Projeto adicionado!");
  };

  const handleAddExperience = () => {
    if (
      !newExperience.title ||
      !newExperience.company ||
      !newExperience.startDate
    ) {
      toast.error("Preencha pelo menos cargo, empresa e data de início.");
      return;
    }
    addExperience(newExperience);
    setNewExperience({
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    toast.success("Experiência adicionada!");
  };

  const handleTextChange = (
    section: "hero" | "about",
    field: string,
    value: string,
  ) => {
    setEditableTexts((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSaveTexts = () => {
    updateTexts(editableTexts);
    toast.success("Textos atualizados com sucesso!");
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      setNewProject((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const handleRemoveTech = (index: number) => {
    setNewProject((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleEditCertificate = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    setIsEditModalOpen(true);
  };

  const handleSaveCertificateEdit = () => {
    if (!editingCertificate) return;

    if (!editingCertificate.title || !editingCertificate.issuer) {
      toast.error("Preencha título e emissor do certificado");
      return;
    }

    updateCertificate(editingCertificate.id, editingCertificate);
    setIsEditModalOpen(false);
    setEditingCertificate(null);
    toast.success("Certificado atualizado!");
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingCertificate(null);
  };

  const handleEditCertificateImageUpload = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageData = await readFileAsDataUrl(file);
    setEditingCertificate((prev) =>
      prev ? { ...prev, image: imageData } : null,
    );
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setEditingProjectScreenshotsInput((project.screenshots || []).join(", "));
    setIsProjectEditModalOpen(true);
  };

  const handleSaveProjectEdit = () => {
    if (!editingProject) return;

    if (!editingProject.title || !editingProject.description) {
      toast.error("Preencha título e descrição do projeto");
      return;
    }

    updateProject(editingProject.id, editingProject);
    setIsProjectEditModalOpen(false);
    setEditingProject(null);
    setEditingProjectScreenshotsInput("");
    toast.success("Projeto atualizado!");
  };

  const handleCancelProjectEdit = () => {
    setIsProjectEditModalOpen(false);
    setEditingProject(null);
    setEditingProjectScreenshotsInput("");
  };

  const handleProjectCoverUpload = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageData = await readFileAsDataUrl(file);
    setNewProject((prev) => ({ ...prev, coverImage: imageData }));
  };

  const handleProjectScreenshotsUpload = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const uploadedImages = await Promise.all(files.map(readFileAsDataUrl));
    setNewProject((prev) => ({
      ...prev,
      screenshots: [...(prev.screenshots || []), ...uploadedImages],
    }));
    setProjectScreenshotsInput("");
  };

  const handleEditProjectCoverUpload = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageData = await readFileAsDataUrl(file);
    setEditingProject((prev) =>
      prev ? { ...prev, coverImage: imageData } : null,
    );
  };

  const handleEditProjectScreenshotsUpload = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const uploadedImages = await Promise.all(files.map(readFileAsDataUrl));
    setEditingProject((prev) =>
      prev
        ? {
            ...prev,
            screenshots: [...(prev.screenshots || []), ...uploadedImages],
          }
        : null,
    );
    setEditingProjectScreenshotsInput("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin | Portfolio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Painel Admin</h1>
                <p className="text-muted-foreground text-sm">
                  Gerencie o conteúdo do seu portfólio
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>

            <Tabs defaultValue="certificates" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="certificates" className="gap-2">
                  <Award className="w-4 h-4" />
                  Certificados ({certificates.length})
                </TabsTrigger>
                <TabsTrigger value="projects" className="gap-2">
                  <Folder className="w-4 h-4" />
                  Projetos ({projects.length})
                </TabsTrigger>
                <TabsTrigger value="experiences" className="gap-2">
                  <Briefcase className="w-4 h-4" />
                  Experiências ({experiences.length})
                </TabsTrigger>
                <TabsTrigger value="texts" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Textos
                </TabsTrigger>
              </TabsList>

              {/* Certificates Tab */}
              <TabsContent value="certificates" className="space-y-6">
                {/* Add Certificate Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Adicionar Certificado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        placeholder="Título do certificado"
                        value={newCertificate.title}
                        onChange={(e) =>
                          setNewCertificate((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="Emissor"
                        value={newCertificate.issuer}
                        onChange={(e) =>
                          setNewCertificate((prev) => ({
                            ...prev,
                            issuer: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="Data (ex: 2024)"
                        value={newCertificate.date}
                        onChange={(e) =>
                          setNewCertificate((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="Local (ex: Alura, Udemy)"
                        value={newCertificate.location}
                        onChange={(e) =>
                          setNewCertificate((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="URL da credencial"
                        value={newCertificate.credentialUrl}
                        onChange={(e) =>
                          setNewCertificate((prev) => ({
                            ...prev,
                            credentialUrl: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <Input
                      placeholder="URL da imagem"
                      value={newCertificate.image}
                      onChange={(e) =>
                        setNewCertificate((prev) => ({
                          ...prev,
                          image: e.target.value,
                        }))
                      }
                    />
                    <Button
                      onClick={handleAddCertificate}
                      className="w-full gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar Certificado
                    </Button>
                  </CardContent>
                </Card>

                {/* Certificates List */}
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <Card key={cert.id}>
                      <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          {cert.image && (
                            <img
                              src={cert.image}
                              alt={cert.title}
                              className="w-16 h-12 rounded object-cover shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <h3 className="font-medium truncate">
                              {cert.title}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {cert.issuer} • {cert.location} • {cert.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditCertificate(cert)}
                            className="text-primary hover:text-primary"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              removeCertificate(cert.id);
                              toast.success("Certificado removido");
                            }}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Edit Certificate Modal */}
                <Dialog
                  open={isEditModalOpen}
                  onOpenChange={setIsEditModalOpen}
                >
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Editar Certificado</DialogTitle>
                    </DialogHeader>
                    {editingCertificate && (
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <Input
                            placeholder="Título do certificado"
                            value={editingCertificate.title}
                            onChange={(e) =>
                              setEditingCertificate((prev) =>
                                prev
                                  ? { ...prev, title: e.target.value }
                                  : null,
                              )
                            }
                          />
                          <Input
                            placeholder="Emissor"
                            value={editingCertificate.issuer}
                            onChange={(e) =>
                              setEditingCertificate((prev) =>
                                prev
                                  ? { ...prev, issuer: e.target.value }
                                  : null,
                              )
                            }
                          />
                          <Input
                            placeholder="Data (ex: 2024)"
                            value={editingCertificate.date}
                            onChange={(e) =>
                              setEditingCertificate((prev) =>
                                prev ? { ...prev, date: e.target.value } : null,
                              )
                            }
                          />
                          <Input
                            placeholder="Local (ex: Alura, Udemy)"
                            value={editingCertificate.location}
                            onChange={(e) =>
                              setEditingCertificate((prev) =>
                                prev
                                  ? { ...prev, location: e.target.value }
                                  : null,
                              )
                            }
                          />
                          <Input
                            placeholder="URL da credencial"
                            value={editingCertificate.credentialUrl}
                            onChange={(e) =>
                              setEditingCertificate((prev) =>
                                prev
                                  ? { ...prev, credentialUrl: e.target.value }
                                  : null,
                              )
                            }
                          />
                        </div>
                        <Input
                          placeholder="URL da imagem"
                          value={editingCertificate.image}
                          onChange={(e) =>
                            setEditingCertificate((prev) =>
                              prev ? { ...prev, image: e.target.value } : null,
                            )
                          }
                        />
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm text-muted-foreground">
                              Anexar nova imagem
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleEditCertificateImageUpload}
                              className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={handleCancelEdit}>
                            Cancelar
                          </Button>
                          <Button onClick={handleSaveCertificateEdit}>
                            Salvar Alterações
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects" className="space-y-6">
                {/* Add Project Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Adicionar Projeto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Título do projeto"
                      value={newProject.title}
                      onChange={(e) =>
                        setNewProject((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                    <Textarea
                      placeholder="Descrição"
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        placeholder="URL do GitHub"
                        value={newProject.githubUrl}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            githubUrl: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="URL do demo (opcional)"
                        value={newProject.liveUrl || ""}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            liveUrl: e.target.value || null,
                          }))
                        }
                      />
                      <Input
                        placeholder="URL da capa do projeto"
                        value={newProject.coverImage || ""}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            coverImage: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <Textarea
                      placeholder="Descrição longa da página do projeto"
                      value={newProject.longDescription || ""}
                      onChange={(e) =>
                        setNewProject((prev) => ({
                          ...prev,
                          longDescription: e.target.value,
                        }))
                      }
                    />

                    <Textarea
                      placeholder="URLs dos prints separadas por vírgula"
                      value={projectScreenshotsInput}
                      onChange={(e) => {
                        setProjectScreenshotsInput(e.target.value);
                        setNewProject((prev) => ({
                          ...prev,
                          screenshots: e.target.value
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean),
                        }));
                      }}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">
                          Anexar capa do projeto
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProjectCoverUpload}
                          className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">
                          Anexar prints do projeto
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleProjectScreenshotsUpload}
                          className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium"
                        />
                      </div>
                    </div>

                    {!!newProject.screenshots?.length && (
                      <p className="text-xs text-muted-foreground">
                        {newProject.screenshots.length} print(s) anexado(s)
                      </p>
                    )}

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Adicionar tecnologia"
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), handleAddTech())
                          }
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAddTech}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {newProject.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {newProject.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-secondary text-sm"
                            >
                              {tech}
                              <button
                                type="button"
                                onClick={() => handleRemoveTech(index)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button onClick={handleAddProject} className="w-full gap-2">
                      <Plus className="w-4 h-4" />
                      Adicionar Projeto
                    </Button>
                  </CardContent>
                </Card>

                {/* Projects List */}
                <div className="space-y-3">
                  {projects.map((project) => (
                    <Card key={project.id}>
                      <CardContent className="p-4 flex items-start justify-between gap-4">
                        {project.coverImage && (
                          <img
                            src={project.coverImage}
                            alt={project.title}
                            className="h-20 w-28 shrink-0 rounded object-cover"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium">{project.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {project.description}
                          </p>
                          {project.longDescription && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
                              {project.longDescription}
                            </p>
                          )}
                          {!!project.screenshots?.length && (
                            <p className="text-xs text-muted-foreground mt-2">
                              {project.screenshots.length} print(s)
                              cadastrado(s)
                            </p>
                          )}
                          {project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-0.5 rounded bg-secondary/50 text-muted-foreground"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProject(project)}
                            className="text-primary hover:text-primary"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              removeProject(project.id);
                              toast.success("Projeto removido");
                            }}
                            className="shrink-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Dialog
                  open={isProjectEditModalOpen}
                  onOpenChange={setIsProjectEditModalOpen}
                >
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Editar Projeto</DialogTitle>
                    </DialogHeader>
                    {editingProject && (
                      <div className="space-y-4">
                        <Input
                          placeholder="Título do projeto"
                          value={editingProject.title}
                          onChange={(e) =>
                            setEditingProject((prev) =>
                              prev ? { ...prev, title: e.target.value } : null,
                            )
                          }
                        />
                        <Textarea
                          placeholder="Descrição"
                          value={editingProject.description}
                          onChange={(e) =>
                            setEditingProject((prev) =>
                              prev
                                ? { ...prev, description: e.target.value }
                                : null,
                            )
                          }
                        />
                        <div className="grid gap-4 md:grid-cols-2">
                          <Input
                            placeholder="URL do GitHub"
                            value={editingProject.githubUrl}
                            onChange={(e) =>
                              setEditingProject((prev) =>
                                prev
                                  ? { ...prev, githubUrl: e.target.value }
                                  : null,
                              )
                            }
                          />
                          <Input
                            placeholder="URL do demo"
                            value={editingProject.liveUrl || ""}
                            onChange={(e) =>
                              setEditingProject((prev) =>
                                prev
                                  ? { ...prev, liveUrl: e.target.value || null }
                                  : null,
                              )
                            }
                          />
                          <Input
                            placeholder="URL da capa"
                            value={editingProject.coverImage || ""}
                            onChange={(e) =>
                              setEditingProject((prev) =>
                                prev
                                  ? { ...prev, coverImage: e.target.value }
                                  : null,
                              )
                            }
                          />
                        </div>
                        <Textarea
                          placeholder="Descrição longa"
                          value={editingProject.longDescription || ""}
                          onChange={(e) =>
                            setEditingProject((prev) =>
                              prev
                                ? { ...prev, longDescription: e.target.value }
                                : null,
                            )
                          }
                        />
                        <Textarea
                          placeholder="URLs dos prints separadas por vírgula"
                          value={editingProjectScreenshotsInput}
                          onChange={(e) => {
                            setEditingProjectScreenshotsInput(e.target.value);
                            setEditingProject((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    screenshots: e.target.value
                                      .split(",")
                                      .map((item) => item.trim())
                                      .filter(Boolean),
                                  }
                                : null,
                            );
                          }}
                        />
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm text-muted-foreground">
                              Anexar nova capa
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleEditProjectCoverUpload}
                              className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-muted-foreground">
                              Anexar novos prints
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleEditProjectScreenshotsUpload}
                              className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium"
                            />
                          </div>
                        </div>
                        {!!editingProject.screenshots?.length && (
                          <p className="text-xs text-muted-foreground">
                            {editingProject.screenshots.length} print(s)
                            anexado(s)
                          </p>
                        )}
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={handleCancelProjectEdit}
                          >
                            Cancelar
                          </Button>
                          <Button onClick={handleSaveProjectEdit}>
                            Salvar Alterações
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TabsContent>

              {/* Experiences Tab */}
              <TabsContent value="experiences" className="space-y-6">
                {/* Add Experience Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Adicionar Experiência
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        placeholder="Cargo"
                        value={newExperience.title}
                        onChange={(e) =>
                          setNewExperience((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="Empresa"
                        value={newExperience.company}
                        onChange={(e) =>
                          setNewExperience((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="Data de Início (ex: Jan 2022)"
                        value={newExperience.startDate}
                        onChange={(e) =>
                          setNewExperience((prev) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="Data de Término (ou 'Atual')"
                        value={newExperience.endDate || ""}
                        onChange={(e) =>
                          setNewExperience((prev) => ({
                            ...prev,
                            endDate: e.target.value || null,
                          }))
                        }
                      />
                    </div>
                    <Textarea
                      placeholder="Descrição das atividades"
                      value={newExperience.description}
                      onChange={(e) =>
                        setNewExperience((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                    <Button
                      onClick={handleAddExperience}
                      className="w-full gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar Experiência
                    </Button>
                  </CardContent>
                </Card>

                {/* Experiences List */}
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <Card key={exp.id}>
                      <CardContent className="p-4 flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium">{exp.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {exp.company} • {exp.startDate} -{" "}
                            {exp.endDate || "Atual"}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {exp.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            removeExperience(exp.id);
                            toast.success("Experiência removida");
                          }}
                          className="shrink-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Texts Tab */}
              <TabsContent value="texts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Editar Textos da Página
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4 rounded-md border p-4">
                      <h3 className="font-medium">Seção Hero</h3>
                      <Input
                        placeholder="Título Principal"
                        value={editableTexts.hero.title}
                        onChange={(e) =>
                          handleTextChange("hero", "title", e.target.value)
                        }
                      />
                      <Textarea
                        placeholder="Subtítulo"
                        value={editableTexts.hero.subtitle}
                        onChange={(e) =>
                          handleTextChange("hero", "subtitle", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Texto do Botão (CTA)"
                        value={editableTexts.hero.cta}
                        onChange={(e) =>
                          handleTextChange("hero", "cta", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-4 rounded-md border p-4">
                      <h3 className="font-medium">Seção Sobre</h3>
                      <Input
                        placeholder="Título da Seção Sobre"
                        value={editableTexts.about.title}
                        onChange={(e) =>
                          handleTextChange("about", "title", e.target.value)
                        }
                      />
                      <Textarea
                        placeholder="Primeiro Parágrafo"
                        value={editableTexts.about.paragraph1}
                        onChange={(e) =>
                          handleTextChange(
                            "about",
                            "paragraph1",
                            e.target.value,
                          )
                        }
                      />
                      <Textarea
                        placeholder="Segundo Parágrafo"
                        value={editableTexts.about.paragraph2}
                        onChange={(e) =>
                          handleTextChange(
                            "about",
                            "paragraph2",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <Button onClick={handleSaveTexts} className="w-full">
                      Salvar Textos
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
