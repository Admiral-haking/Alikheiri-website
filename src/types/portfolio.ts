export type AccentTheme = 'cyan' | 'purple' | 'emerald' | 'amber';
export type Language = 'en' | 'fa';

export interface Project {
  id: string;
  title: string;
  titleFa: string;
  subtitle: string;
  subtitleFa: string;
  category: 'fullstack' | 'ai' | 'systems' | 'creative';
  tags: string[];
  description: string;
  descriptionFa: string;
  challenge: string;
  challengeFa: string;
  solution: string;
  solutionFa: string;
  architecture: string;
  architectureFa: string;
  highlights: string[];
  highlightsFa: string[];
  impact: string;
  impactFa: string;
  metrics: { label: string; value: string }[];
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  visualType: 'neural' | 'telemetry' | 'quantum' | 'trading' | 'stream';
  role?: string;
  roleFa?: string;
  status?: string;
  statusFa?: string;
  imageUrl?: string;
}

export interface TechSkill {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'ai' | 'devops' | 'databases';
  level: number; // 1-100
  years: number;
  highlight: string;
  iconName: string;
}

export interface Experience {
  id: string;
  role: string;
  roleFa: string;
  company: string;
  companyFa: string;
  period: string;
  periodFa: string;
  location: string;
  description: string;
  descriptionFa: string;
  achievements: string[];
  achievementsFa: string[];
  skills: string[];
  type: 'full-time' | 'contract' | 'education';
}

export interface ServiceItem {
  id: string;
  title: string;
  titleFa: string;
  description: string;
  descriptionFa: string;
  deliverables: string[];
  deliverablesFa: string[];
  iconName: string;
  techStack: string[];
  estTimeline: string;
}

export interface BlogPost {
  id: string;
  title: string;
  titleFa: string;
  slug: string;
  excerpt: string;
  excerptFa: string;
  content: string;
  contentFa: string;
  publishedDate: string;
  readTime: string;
  category: string;
  categoryFa: string;
  tags: string[];
  claps: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  htmlUrl: string;
  topics: string[];
  license?: string;
}
