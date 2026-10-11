import { Experience, TechSkill } from '../types/portfolio';

export const experiences: Experience[] = [
  {
    id: 'education', role: 'Computer Engineering Student', roleFa: 'دانشجوی مهندسی کامپیوتر',
    company: 'Quchan University of Technology', companyFa: 'دانشگاه فناوری قوچان',
    period: 'Present', periodFa: 'اکنون', location: 'Mashhad, Iran',
    description: 'Studying computer engineering while building backend systems and AI security projects through independent research and practice.',
    descriptionFa: 'تحصیل مهندسی کامپیوتر همزمان با ساخت سامانه‌های بک‌اند و پروژه‌های امنیت هوش مصنوعی از مسیر تحقیق و تمرین مستقل.',
    achievements: ['Studying backend design, data security, distributed systems, and ethical hacking', 'Learning German while preparing for future international opportunities', 'Open to backend internships and open-source collaborations'],
    achievementsFa: ['مطالعه طراحی بک‌اند، امنیت داده، سیستم‌های توزیع‌شده و هک اخلاقی', 'یادگیری زبان آلمانی برای فرصت‌های بین‌المللی آینده', 'آماده همکاری در کارآموزی بک‌اند و پروژه‌های متن‌باز'],
    skills: ['TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'Python', 'Docker'], type: 'education'
  },
  {
    id: 'ghalb-dovom', role: 'Web Developer (Node.js & Next.js)', roleFa: 'توسعه‌دهنده وب (Node.js و Next.js)',
    company: 'ghlbedovom · Part-time', companyFa: 'قلب دوم · پاره‌وقت', period: 'Nov 2025 - Present', periodFa: 'نوامبر ۲۰۲۵ - اکنون', location: 'Mashhad · On-site',
    description: 'Building scalable web applications, REST APIs, and modern interfaces with React, TypeScript, MongoDB, and PostgreSQL.',
    descriptionFa: 'ساخت وب‌اپلیکیشن‌های مقیاس‌پذیر، REST API و رابط‌های مدرن با React، TypeScript، MongoDB و PostgreSQL.',
    achievements: ['Working with NestJS, PostgreSQL, Redis, Express, and Docker', 'Exploring OAuth2, OIDC, RBAC, rate limiting, and audit logging', 'Learning advanced PostgreSQL indexing, query planning, locking, and event-driven architecture'],
    achievementsFa: ['کار با NestJS، PostgreSQL، Redis، Express و Docker', 'بررسی OAuth2، OIDC، RBAC، rate limiting و ثبت رخدادهای امنیتی', 'یادگیری ایندکس‌گذاری پیشرفته PostgreSQL، query planning، locking و معماری رویدادمحور'],
    skills: ['Node.js', 'Next.js', 'React', 'TypeScript', 'MongoDB', 'PostgreSQL'], type: 'full-time'
  },
  {
    id: 'freelance-research', role: 'Full Stack Engineer', roleFa: 'مهندس فول‌استک', company: 'Freelance & Research-Based', companyFa: 'فریلنس و تحقیقاتی', period: 'Jan 2022 - Present', periodFa: 'ژانویه ۲۰۲۲ - اکنون', location: 'Remote',
    description: 'Designed a hybrid AI threat-simulation system deployed across three national and one international data center using Java, Spring Boot, Python, FastAPI, AWS EC2, and S3.',
    descriptionFa: 'طراحی سامانه ترکیبی هوش مصنوعی برای شبیه‌سازی تهدید و استقرار آن در سه دیتاسنتر ملی و یک دیتاسنتر بین‌المللی با Java، Spring Boot، Python، FastAPI و AWS.',
    achievements: ['Built microservices and API integrations with Java Spring Boot and Python FastAPI', 'Managed logs and models with AWS EC2 and S3', 'Focused research on defensive AI and data security'],
    achievementsFa: ['ساخت میکروسرویس و اتصال API با Java Spring Boot و Python FastAPI', 'مدیریت لاگ‌ها و مدل‌ها با AWS EC2 و S3', 'تمرکز تحقیقاتی بر هوش مصنوعی دفاعی و امنیت داده'], skills: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'AWS'], type: 'contract'
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
