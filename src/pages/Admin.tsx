import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Award, Folder, LogOut, Briefcase, FileText } from "lucide-react";
import { Certificate, Project, Experience, TextContent } from "@/types/portfolio";

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
    addProject,
    removeProject,
    addExperience,
    removeExperience,
    texts,
    updateTexts,
  } = usePortfolioData();

  const [newCertificate, setNewCertificate] = useState<Omit<Certificate, "id">>({
    title: "",
    issuer: "",
    date: "",
    location: "",
    credentialUrl: "",
    image: "",
  });

  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    technologies: [],
    githubUrl: "",
    liveUrl: null,
  });

  const [techInput, setTechInput] = useState("");

  const [editableTexts, setEditableTexts] = useState<TextContent>(texts);

  const [newExperience, setNewExperience] = useState<Omit<Experience, "id">>({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleAddCertificate = () => {
    if (!newCertificate.title || !newCertificate.issuer) {
      toast.error("Preencha título e emissor do certificado");
      return;
    }
    addCertificate(newCertificate);
    setNewCertificate({ title: "", issuer: "", date: "", location: "", credentialUrl: "", image: "" });
    toast.success("Certificado adicionado!");
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) {
      toast.error("Preencha título e descrição do projeto");
      return;
    }
    addProject(newProject);
    setNewProject({ title: "", description: "", technologies: [], githubUrl: "", liveUrl: null });
    setTechInput("");
    toast.success("Projeto adicionado!");
  };

  const handleAddExperience = () => {
    if (!newExperience.title || !newExperience.company || !newExperience.startDate) {
      toast.error("Preencha pelo menos cargo, empresa e data de início.");
      return;
    }
    addExperience(newExperience);
    setNewExperience({ title: "", company: "", startDate: "", endDate: "", description: "" });
    toast.success("Experiência adicionada!");
  };

  const handleTextChange = (section: 'hero' | 'about', field: string, value: string) => {
    setEditableTexts(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      }
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
            <Button variant="outline" size="sm" onClick={logout} className="gap-2">
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
                    <CardTitle className="text-lg">Adicionar Certificado</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        placeholder="Título do certificado"
                        value={newCertificate.title}
                        onChange={(e) =>
                          setNewCertificate((prev) => ({ ...prev, title: e.target.value }))
                        }
                      />
                      <Input
                        placeholder="Emissor"
                        value={newCertificate.issuer}
                        onChange={(e) =>
                          setNewCertificate((prev) => ({ ...prev, issuer: e.target.value }))
                        }
                      />
                      <Input
                        placeholder="Data (ex: 2024)"
                        value={newCertificate.date}
                        onChange={(e) =>
                          setNewCertificate((prev) => ({ ...prev, date: e.target.value }))
                        }
                      />
                      <Input
                        placeholder="Local (ex: Alura, Udemy)"
                        value={newCertificate.location}
                        onChange={(e) =>
                          setNewCertificate((prev) => ({ ...prev, location: e.target.value }))
                        }
                      />
                      <Input
                        placeholder="URL da credencial"
                        value={newCertificate.credentialUrl}
                        onChange={(e) =>
                          setNewCertificate((prev) => ({ ...prev, credentialUrl: e.target.value }))
                        }
                      />
                    </div>
                    <Input
                      placeholder="URL da imagem"
                      value={newCertificate.image}
                      onChange={(e) =>
                        setNewCertificate((prev) => ({ ...prev, image: e.target.value }))
                      }
                    />
                    <Button onClick={handleAddCertificate} className="w-full gap-2">
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
                            <h3 className="font-medium truncate">{cert.title}</h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {cert.issuer} • {cert.location} • {cert.date}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            removeCertificate(cert.id);
                            toast.success("Certificado removido");
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
                        setNewProject((prev) => ({ ...prev, title: e.target.value }))
                      }
                    />
                    <Textarea
                      placeholder="Descrição"
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject((prev) => ({ ...prev, description: e.target.value }))
                      }
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        placeholder="URL do GitHub"
                        value={newProject.githubUrl}
                        onChange={(e) =>
                          setNewProject((prev) => ({ ...prev, githubUrl: e.target.value }))
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
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Adicionar tecnologia"
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
                        />
                        <Button type="button" variant="outline" onClick={handleAddTech}>
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
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium">{project.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {project.description}
                          </p>
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Experiences Tab */}
              <TabsContent value="experiences" className="space-y-6">
                {/* Add Experience Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Adicionar Experiência</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        placeholder="Cargo"
                        value={newExperience.title}
                        onChange={(e) => setNewExperience((prev) => ({ ...prev, title: e.target.value }))}
                      />
                      <Input
                        placeholder="Empresa"
                        value={newExperience.company}
                        onChange={(e) => setNewExperience((prev) => ({ ...prev, company: e.target.value }))}
                      />
                      <Input
                        placeholder="Data de Início (ex: Jan 2022)"
                        value={newExperience.startDate}
                        onChange={(e) => setNewExperience((prev) => ({ ...prev, startDate: e.target.value }))}
                      />
                      <Input
                        placeholder="Data de Término (ou 'Atual')"
                        value={newExperience.endDate || ''}
                        onChange={(e) => setNewExperience((prev) => ({ ...prev, endDate: e.target.value || null }))}
                      />
                    </div>
                    <Textarea
                      placeholder="Descrição das atividades"
                      value={newExperience.description}
                      onChange={(e) => setNewExperience((prev) => ({ ...prev, description: e.target.value }))}
                    />
                    <Button onClick={handleAddExperience} className="w-full gap-2">
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
                            {exp.company} • {exp.startDate} - {exp.endDate || 'Atual'}
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
                    <CardTitle className="text-lg">Editar Textos da Página</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4 rounded-md border p-4">
                      <h3 className="font-medium">Seção Hero</h3>
                      <Input
                        placeholder="Título Principal"
                        value={editableTexts.hero.title}
                        onChange={(e) => handleTextChange('hero', 'title', e.target.value)}
                      />
                      <Textarea
                        placeholder="Subtítulo"
                        value={editableTexts.hero.subtitle}
                        onChange={(e) => handleTextChange('hero', 'subtitle', e.target.value)}
                      />
                       <Input
                        placeholder="Texto do Botão (CTA)"
                        value={editableTexts.hero.cta}
                        onChange={(e) => handleTextChange('hero', 'cta', e.target.value)}
                      />
                    </div>

                    <div className="space-y-4 rounded-md border p-4">
                      <h3 className="font-medium">Seção Sobre</h3>
                       <Input
                        placeholder="Título da Seção Sobre"
                        value={editableTexts.about.title}
                        onChange={(e) => handleTextChange('about', 'title', e.target.value)}
                      />
                      <Textarea
                        placeholder="Primeiro Parágrafo"
                        value={editableTexts.about.paragraph1}
                        onChange={(e) => handleTextChange('about', 'paragraph1', e.target.value)}
                      />
                      <Textarea
                        placeholder="Segundo Parágrafo"
                        value={editableTexts.about.paragraph2}
                        onChange={(e) => handleTextChange('about', 'paragraph2', e.target.value)}
                      />
                    </div>

                    <Button onClick={handleSaveTexts} className="w-full">Salvar Textos</Button>
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
