import { Experience, TechSkill } from '../types/portfolio';

export const experiences: Experience[] = [
  {
    id: 'education', role: 'Computer Science Student', roleFa: 'دانشجوی علوم کامپیوتر',
    company: 'Independent learning & project work', companyFa: 'یادگیری مستقل و توسعه پروژه',
    period: 'Present', periodFa: 'اکنون', location: 'Iran',
    description: 'Building real backend and AI systems while strengthening computer science and system design fundamentals.',
    descriptionFa: 'ساخت سامانه‌های واقعی بک‌اند و هوش مصنوعی همزمان با تقویت مبانی علوم کامپیوتر و طراحی سیستم.',
    achievements: ['Studying distributed systems, consistency, fault tolerance, and system design', 'Building public projects around authentication, scheduling, MLOps, and LLM orchestration', 'Looking for backend engineering internships and open-source collaborations'],
    achievementsFa: ['مطالعه سیستم‌های توزیع‌شده، سازگاری، تحمل خطا و طراحی سیستم', 'ساخت پروژه‌های عمومی در حوزه احراز هویت، زمان‌بندی، MLOps و هماهنگ‌سازی LLM', 'آماده همکاری در کارآموزی بک‌اند و پروژه‌های متن‌باز'],
    skills: ['TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'Python', 'Docker'], type: 'education'
  },
  {
    id: 'teamcore', role: 'Backend Engineer in Progress', roleFa: 'مهندس بک‌اند در مسیر حرفه‌ای',
    company: 'teamcore', companyFa: 'teamcore', period: 'Current focus', periodFa: 'تمرکز فعلی', location: 'Iran / Remote',
    description: 'Designing practical backend services with attention to clean architecture, observability, and production fundamentals.',
    descriptionFa: 'طراحی سرویس‌های بک‌اند کاربردی با تمرکز بر معماری تمیز، مشاهده‌پذیری و مبانی محیط عملیاتی.',
    achievements: ['Working with NestJS, PostgreSQL, Redis, Express, and Docker', 'Exploring OAuth2, OIDC, RBAC, rate limiting, and audit logging', 'Learning advanced PostgreSQL indexing, query planning, locking, and event-driven architecture'],
    achievementsFa: ['کار با NestJS، PostgreSQL، Redis، Express و Docker', 'بررسی OAuth2، OIDC، RBAC، rate limiting و ثبت رخدادهای امنیتی', 'یادگیری ایندکس‌گذاری پیشرفته PostgreSQL، query planning، locking و معماری رویدادمحور'],
    skills: ['NestJS', 'PostgreSQL', 'Redis', 'Docker', 'OAuth2', 'OIDC'], type: 'full-time'
  }
];

export const techSkills: TechSkill[] = [
  { id: 'typescript', name: 'TypeScript', category: 'languages', level: 82, years: 2, highlight: 'Backend services and full-stack applications', iconName: 'FileCode2' },
  { id: 'python', name: 'Python', category: 'languages', level: 78, years: 2, highlight: 'AI experiments, FastAPI and MLOps projects', iconName: 'Code' },
  { id: 'sql', name: 'SQL', category: 'languages', level: 72, years: 2, highlight: 'Relational data modeling and PostgreSQL queries', iconName: 'Database' },
  { id: 'nestjs', name: 'NestJS', category: 'backend', level: 78, years: 2, highlight: 'Modular backend services and API architecture', iconName: 'Server' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', level: 70, years: 1, highlight: 'Python APIs and ML service experiments', iconName: 'Zap' },
  { id: 'postgres', name: 'PostgreSQL', category: 'databases', level: 76, years: 2, highlight: 'Indexes, query planning, locking and relational design', iconName: 'Database' },
  { id: 'redis', name: 'Redis', category: 'databases', level: 72, years: 2, highlight: 'Queues, caching, locks and background jobs', iconName: 'Flame' },
  { id: 'docker', name: 'Docker', category: 'devops', level: 68, years: 2, highlight: 'Reproducible local and service environments', iconName: 'Box' },
  { id: 'langchain', name: 'LangChain / LangGraph', category: 'ai', level: 68, years: 1, highlight: 'LLM orchestration and agent execution experiments', iconName: 'Brain' },
  { id: 'mlops', name: 'MLOps fundamentals', category: 'ai', level: 64, years: 1, highlight: 'Training, evaluation, drift monitoring and A/B testing', iconName: 'Activity' }
];
