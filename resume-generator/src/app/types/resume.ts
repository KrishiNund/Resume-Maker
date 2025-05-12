export interface EducationEntry {
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  degree: string;
  comment?: string;
}

export interface ExperienceEntry {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SkillsEntry {
  skill: string;
}

export interface ProjectEntry {
  title: string;
  description: string;
  link?: string;
}

export interface ResumePreviewProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  link: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: SkillsEntry[];
  projects: ProjectEntry[];
  showEducation: boolean;
  showExperience: boolean;
  showSkills: boolean;
  showProjects: boolean;
  sectionOrder: string[];
}
  