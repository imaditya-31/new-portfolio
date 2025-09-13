export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'flutter' | 'web' | 'design';
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
}