export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null; // Pode ser nulo se for o emprego atual
  description: string;
}
