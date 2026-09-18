export type ProjectCategory = 'all' | 'fintech' | 'store' | 'cross-platform';

export interface Project {
  id: string | number;
  title: string;
  tagline: string;
  description: string;
  company?: string;
  category: 'fintech' | 'store' | 'cross-platform';
  status: 'In Development' | 'Live on App Store & Play Store' | 'Live on Play Store' | 'Production';
  technologies: string[];
  playStoreUrl?: string;
  appStoreUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  metrics?: string[];
  architecture?: string;
  features: string[];
  accentColor?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  isCurrent?: boolean;
  type: 'Full-time';
  description: string[];
  technologies: string[];
  keyWins?: string[];
}

export interface SkillItem {
  name: string;
  level?: 'Core' | 'Advanced' | 'Experienced';
  highlight?: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  gradient: string;
  skills: SkillItem[];
}

export interface MetricStat {
  label: string;
  value: string;
  suffix?: string;
  description: string;
  highlight?: boolean;
}