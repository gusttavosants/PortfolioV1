import { useState, useEffect } from "react";
import { Certificate, Project } from "@/types/portfolio";

const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: "1",
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
  },
  {
    id: "2",
    title: "Docker Certified Associate",
    issuer: "Docker Inc.",
    date: "2024",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop",
  },
  {
    id: "3",
    title: "PostgreSQL Administration",
    issuer: "PostgreSQL",
    date: "2023",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
  },
  {
    id: "4",
    title: "Node.js Application Developer",
    issuer: "OpenJS Foundation",
    date: "2023",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
  },
  {
    id: "5",
    title: "Python Professional Certificate",
    issuer: "Python Institute",
    date: "2023",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
  },
  {
    id: "6",
    title: "Kubernetes Administrator",
    issuer: "CNCF",
    date: "2022",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
  },
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    title: "API Gateway Microservices",
    description: "Gateway de APIs com autenticação JWT, rate limiting, load balancing e monitoramento em tempo real.",
    technologies: ["Node.js", "Redis", "Docker", "Kong"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "2",
    title: "Sistema de Filas Distribuído",
    description: "Sistema de processamento assíncrono com filas distribuídas, retry automático e dead letter queues.",
    technologies: ["Python", "RabbitMQ", "PostgreSQL", "Celery"],
    githubUrl: "#",
    liveUrl: null,
  },
  {
    id: "3",
    title: "E-commerce Backend",
    description: "Backend completo para e-commerce com carrinho, pagamentos, estoque e notificações em tempo real.",
    technologies: ["Java", "Spring Boot", "MySQL", "Stripe"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "4",
    title: "Data Pipeline ETL",
    description: "Pipeline de dados para processamento batch e streaming com orquestração e monitoramento.",
    technologies: ["Python", "Apache Airflow", "Spark", "S3"],
    githubUrl: "#",
    liveUrl: null,
  },
  {
    id: "5",
    title: "Real-time Chat API",
    description: "API de chat em tempo real com WebSockets, persistência de mensagens e notificações push.",
    technologies: ["Node.js", "Socket.io", "MongoDB", "Redis"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "6",
    title: "Authentication Service",
    description: "Serviço de autenticação com OAuth2, 2FA, gerenciamento de sessões e integração LDAP.",
    technologies: ["Go", "PostgreSQL", "Redis", "gRPC"],
    githubUrl: "#",
    liveUrl: null,
  },
];

const STORAGE_KEYS = {
  certificates: "portfolio_certificates",
  projects: "portfolio_projects",
};

export const usePortfolioData = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedCertificates = localStorage.getItem(STORAGE_KEYS.certificates);
    const storedProjects = localStorage.getItem(STORAGE_KEYS.projects);

    setCertificates(
      storedCertificates ? JSON.parse(storedCertificates) : DEFAULT_CERTIFICATES
    );
    setProjects(
      storedProjects ? JSON.parse(storedProjects) : DEFAULT_PROJECTS
    );
    setIsLoading(false);
  }, []);

  const saveCertificates = (newCertificates: Certificate[]) => {
    setCertificates(newCertificates);
    localStorage.setItem(STORAGE_KEYS.certificates, JSON.stringify(newCertificates));
  };

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(newProjects));
  };

  const addCertificate = (certificate: Omit<Certificate, "id">) => {
    const newCertificate = { ...certificate, id: crypto.randomUUID() };
    saveCertificates([...certificates, newCertificate]);
  };

  const removeCertificate = (id: string) => {
    saveCertificates(certificates.filter((c) => c.id !== id));
  };

  const updateCertificate = (id: string, certificate: Omit<Certificate, "id">) => {
    saveCertificates(
      certificates.map((c) => (c.id === id ? { ...certificate, id } : c))
    );
  };

  const addProject = (project: Omit<Project, "id">) => {
    const newProject = { ...project, id: crypto.randomUUID() };
    saveProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    saveProjects(projects.filter((p) => p.id !== id));
  };

  const updateProject = (id: string, project: Omit<Project, "id">) => {
    saveProjects(
      projects.map((p) => (p.id === id ? { ...project, id } : p))
    );
  };

  return {
    certificates,
    projects,
    isLoading,
    addCertificate,
    removeCertificate,
    updateCertificate,
    addProject,
    removeProject,
    updateProject,
  };
};
