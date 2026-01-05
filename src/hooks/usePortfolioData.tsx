import { useState, useEffect } from "react";
import { Certificate, Project, Experience, TextContent } from "@/types/portfolio";

const DEFAULT_CERTIFICATES: Certificate[] = [
  
];

const DEFAULT_EXPERIENCES: Experience[] = [
  {
    id: "1",
    title: "Trainee Desenvolvedor Backend",
    company: "Pixafow",
    startDate: "Ago 2024",
    endDate: "Atual",
    description: "Atuo no desenvolvimento de aplicações backend com Node.js, TypeScript e Nest.js. Trabalhando com arquitetura RAG, criação de agentes de IA e vibe coding. Participando de projetos que envolvem Python e integração de sistemas."
  },
  {
    id: "2",
    title: "Auxiliar de Produção",
    company: "Fábrica Delapria",
    startDate: "Jun 2025",
    endDate: "Nov 2025",
    description: "Aplicação de disciplina e atenção aos detalhes na execução de processos, garantindo a qualidade do produto e a eficiência da linha de produção. Desenvolvimento de Trabalho em Equipe e Comunicação Interpessoal em um ambiente de ritmo acelerado. Habilidade em seguir protocolos e gerenciar o fluxo de trabalho sob pressão, demonstrando Senso de Responsabilidade."
  },
  {
    id: "3",
    title: "Jovem Aprendiz",
    company: "AmstedMaxion",
    startDate: "Fev 2024",
    endDate: "Dez 2024",
    description: "Exposição e contato com rotinas de Infraestrutura de Tecnologia da Informação (TI), auxiliando na organização e manutenção de recursos de dados. Fortalecimento de habilidades comportamentais (soft skills), como Agilidade e Capacidade de Adaptação em novos ambientes de trabalho. Atuação proativa na resolução de pequenos desafios operacionais, desenvolvendo o senso de Iniciativa e Organização."
  }
];

const DEFAULT_TEXTS: TextContent = {
  hero: {
    title: "Gustavo",
    subtitle: "Desenvolvedor Backend | Python | Node.js | NestJS | IA/RAG",
    cta: "Entre em contato",
  },
  about: {
    title: "Sobre mim",
    paragraph1: "Sou um Desenvolvedor Backend e estudante de Análise e Desenvolvimento de Sistemas com forte paixão pela construção de soluções robustas. Meu foco principal está em Python e no ecossistema Node.js (incluindo NestJS), aplicando as melhores práticas para desenvolver RESTful APIs eficientes e escaláveis.",
    paragraph2: "Possuo experiência em arquitetura de dados, incluindo a aplicação de Arquitetura RAG (Retrieval-Augmented Generation), e conhecimentos em Operações de TI. Demonstro agilidade na resolução de problemas e grande capacidade de adaptação a novas tecnologias e projetos. Além do desenvolvimento, trago um diferencial com experiência prévia em Manutenção de Hardware, Instalação de Sistemas e Suporte a Usuários, o que me proporciona uma visão completa sobre a infraestrutura e o ciclo de vida do software.",
  },
};

const DEFAULT_PROJECTS: Project[] = [
  
];

const STORAGE_KEYS = {
  certificates: "portfolio_certificates",
  projects: "portfolio_projects",
  experiences: "portfolio_experiences",
  texts: "portfolio_texts",
};

export const usePortfolioData = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [texts, setTexts] = useState<TextContent>(DEFAULT_TEXTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedCertificates = localStorage.getItem(STORAGE_KEYS.certificates);
    const storedProjects = localStorage.getItem(STORAGE_KEYS.projects);
    const storedExperiences = localStorage.getItem(STORAGE_KEYS.experiences);
    const storedTexts = localStorage.getItem(STORAGE_KEYS.texts);

    setCertificates(
      storedCertificates ? JSON.parse(storedCertificates) : DEFAULT_CERTIFICATES
    );
    setProjects(
      storedProjects ? JSON.parse(storedProjects) : DEFAULT_PROJECTS
    );
    setExperiences(
      storedExperiences ? JSON.parse(storedExperiences) : DEFAULT_EXPERIENCES
    );
    setTexts(storedTexts ? JSON.parse(storedTexts) : DEFAULT_TEXTS);
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

  const saveExperiences = (newExperiences: Experience[]) => {
    setExperiences(newExperiences);
    localStorage.setItem(STORAGE_KEYS.experiences, JSON.stringify(newExperiences));
  };

  const saveTexts = (newTexts: TextContent) => {
    setTexts(newTexts);
    localStorage.setItem(STORAGE_KEYS.texts, JSON.stringify(newTexts));
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

    // Texts
    texts,
    updateTexts: (newTexts: TextContent) => {
      saveTexts(newTexts);
    },

    // Experiences
    experiences,
    addExperience: (experience: Omit<Experience, "id">) => {
      const newExperience = { ...experience, id: crypto.randomUUID() };
      saveExperiences([...experiences, newExperience]);
    },
    removeExperience: (id: string) => {
      saveExperiences(experiences.filter((e) => e.id !== id));
    },
    updateExperience: (id: string, experience: Omit<Experience, "id">) => {
      saveExperiences(
        experiences.map((e) => (e.id === id ? { ...experience, id } : e))
      );
    },
  };
};
