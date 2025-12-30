export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  location: string;
  credentialUrl: string;
  image: string;
}

export interface TextContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string | null;
}
