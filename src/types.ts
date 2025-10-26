export interface Experience {
  role?: string;
  company?: string;
  duration?: string;
  details?: string;
}

export interface Education {
  degree?: string;
  institute?: string;
  year?: string;
}

export interface Project {
  title?: string;
  link?: string;
  details?: string;
}

export interface Certification {
  name?: string;
  issuer?: string;
  year?: string;
}

export interface Contact {
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
}

export interface CVData {
  fullName: string;
  title: string;
  contact: Contact;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  languages: string[];
  projects: Project[];
  hobbies: string;
}

export type Theme = 'light' | 'dark' | 'orange' | 'multi';
