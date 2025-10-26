import { CVData, Theme } from './types';

export const INITIAL_CV_DATA: CVData = {
  fullName: "",
  title: "",
  contact: { email: "", phone: "", website: "", linkedin: "" },
  summary: "",
  experiences: [],
  education: [],
  skills: [],
  certifications: [],
  languages: [],
  projects: [],
  hobbies: "",
};

export const THEME_CLASSES: Record<Theme, string> = {
  light: "bg-white text-gray-800",
  dark: "bg-gray-800 text-gray-100",
  orange: "bg-orange-50 text-orange-900",
  multi: "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100",
};
