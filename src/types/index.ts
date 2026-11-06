export type ProjectCategory = 'all' | 'android' | 'tools' | 'web';

export interface ProjectItem {
  id: string;
  code: string; // e.g. CTQ-01
  title: string;
  tagline: string;
  category: 'android' | 'tools' | 'web';
  status: 'Production' | 'Active' | 'Development' | 'Open Source';
  verified: boolean;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  architecture: string[];
  metrics?: { label: string; value: string }[];
  repoUrl: string;
  demoUrl?: string;
  releaseDate?: string;
  previewVisual?: 'radar' | 'code' | 'circuit' | 'terminal';
}

export interface TerminalEntry {
  id: string;
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
  isError?: boolean;
}

export interface InquiryFormState {
  clientName: string;
  email: string;
  category: string;
  description: string;
  budget: string;
  deadline: string;
}
