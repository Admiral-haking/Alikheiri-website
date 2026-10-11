import { Project, GitHubRepo } from '../types/portfolio';

const owner = 'https://github.com/Admiral-haking';

export const portfolioProjects: Project[] = [
  {
    id: 'pulsecore', title: 'PulseCore', titleFa: 'پالس‌کور',
    subtitle: 'TypeScript system project', subtitleFa: 'پروژه سیستمی با TypeScript', category: 'systems',
    tags: ['TypeScript', 'Systems', 'Open Source'],
    description: 'A TypeScript project from AliKheiri focused on building practical, maintainable software systems.',
    descriptionFa: 'پروژه‌ای با TypeScript از علی خیری با تمرکز بر ساخت نرم‌افزارهای کاربردی و قابل نگهداری.',
    challenge: 'Turning a technical idea into a clear, usable public repository.',
    challengeFa: 'تبدیل یک ایده فنی به یک مخزن عمومی روشن و قابل استفاده.',
    solution: 'A focused codebase with a public development history and a clear path for iteration.',
    solutionFa: 'یک کدبیس متمرکز با سابقه توسعه عمومی و مسیر مشخص برای ادامه کار.',
    impact: 'One of the most recently updated public projects in the profile.',
    impactFa: 'یکی از جدیدترین پروژه‌های عمومی به‌روزشده در پروفایل.',
    metrics: [{ label: 'Language', value: 'TS' }, { label: 'Stars', value: '0' }, { label: 'Status', value: 'Active' }],
    githubUrl: `${owner}/PulseCore`, demoUrl: `${owner}/PulseCore`, featured: true, visualType: 'telemetry', role: 'System development and experimentation', roleFa: 'توسعه و آزمایش سامانه', status: 'Public · Active development', statusFa: 'عمومی · در حال توسعه'
  },
  {
    id: 'kronos', title: 'KRONOS', titleFa: 'کرونوس',
    subtitle: 'TypeScript application', subtitleFa: 'اپلیکیشن TypeScript', category: 'fullstack',
    tags: ['TypeScript', 'Application Development'],
    description: 'A public TypeScript application project exploring product development from idea to implementation.',
    descriptionFa: 'پروژه عمومی TypeScript برای تجربه و توسعه محصول از ایده تا پیاده‌سازی.',
    challenge: 'Keep the product direction understandable while the implementation evolves.',
    challengeFa: 'حفظ مسیر روشن محصول همزمان با رشد پیاده‌سازی.',
    solution: 'An iterative repository that makes the source and progress available to collaborators.',
    solutionFa: 'مخزنی مرحله‌ای که کد و روند پیشرفت را در دسترس همکاران قرار می‌دهد.',
    impact: 'A recently created public project in the AliKheiri portfolio.',
    impactFa: 'یک پروژه عمومی تازه‌ساخته‌شده در مجموعه کارهای علی خیری.',
    metrics: [{ label: 'Language', value: 'TS' }, { label: 'Stars', value: '0' }, { label: 'Visibility', value: 'Public' }],
    githubUrl: `${owner}/KRONOS`, demoUrl: `${owner}/KRONOS`, featured: true, visualType: 'stream', role: 'Product engineering and iteration', roleFa: 'مهندسی و توسعه مرحله‌ای محصول', status: 'Public · Iterating', statusFa: 'عمومی · در حال تکمیل'
  },
  {
    id: 'iam-sso', title: 'IAM SSO System', titleFa: 'سامانه IAM و SSO',
    subtitle: 'Identity and access management', subtitleFa: 'مدیریت هویت و دسترسی', category: 'systems',
    tags: ['TypeScript', 'IAM', 'SSO', 'Security'],
    description: 'A public identity and single sign-on system project focused on authentication architecture.',
    descriptionFa: 'پروژه عمومی سامانه هویت و ورود یکپارچه با تمرکز بر معماری احراز هویت.',
    challenge: 'Model authentication as a reusable platform capability instead of a page-level feature.',
    challengeFa: 'تبدیل احراز هویت به یک قابلیت قابل استفاده مجدد در سطح پلتفرم.',
    solution: 'A dedicated repository for exploring identity, access, and SSO concerns in TypeScript.',
    solutionFa: 'مخزنی مستقل برای بررسی هویت، دسترسی و SSO با TypeScript.',
    impact: 'A security-oriented project with a public source repository.',
    impactFa: 'پروژه‌ای امنیت‌محور با کد منبع عمومی.',
    metrics: [{ label: 'Focus', value: 'IAM' }, { label: 'Language', value: 'TS' }, { label: 'Stars', value: '0' }],
    githubUrl: `${owner}/IAM-SSO-System`, demoUrl: `${owner}/IAM-SSO-System`, featured: true, visualType: 'neural', role: 'Identity, access, and security architecture', roleFa: 'معماری هویت، دسترسی و امنیت', status: 'Public · In development', statusFa: 'عمومی · در حال توسعه'
  },
  {
    id: 'mlops-from-scratch', title: 'MLOps From Scratch', titleFa: 'MLOps از صفر',
    subtitle: 'Persian sentiment analysis pipeline', subtitleFa: 'خط لوله تحلیل احساسات فارسی', category: 'ai',
    tags: ['Python', 'MLOps', 'NLP', 'A/B Testing'],
    description: 'An end-to-end MLOps pipeline for Persian sentiment analysis with automated training, A/B testing, and drift monitoring.',
    descriptionFa: 'خط لوله کامل MLOps برای تحلیل احساسات فارسی با آموزش خودکار، تست A/B و پایش drift.',
    challenge: 'Make a machine-learning experiment reproducible and observable beyond a notebook.',
    challengeFa: 'تبدیل آزمایش یادگیری ماشین به فرایندی تکرارپذیر و قابل مشاهده فراتر از نوت‌بوک.',
    solution: 'A production-minded pipeline connecting training, evaluation, experimentation, and monitoring.',
    solutionFa: 'خط لوله‌ای عملیاتی که آموزش، ارزیابی، آزمایش و پایش را به هم متصل می‌کند.',
    impact: 'A concrete AI/ML project with a documented public description.',
    impactFa: 'یک پروژه واقعی AI/ML با توضیح عمومی مستند.',
    metrics: [{ label: 'Domain', value: 'NLP' }, { label: 'Language', value: 'Python' }, { label: 'Stars', value: '1' }],
    githubUrl: `${owner}/mlops-from-scratch`, demoUrl: `${owner}/mlops-from-scratch`, featured: false, visualType: 'quantum', role: 'ML pipeline design and observability', roleFa: 'طراحی و مشاهده‌پذیری خط لوله ML', status: 'Public · Research project', statusFa: 'عمومی · پروژه تحقیقاتی'
  },
  {
    id: 'ai-orchestra-pro', title: 'AI Orchestra Pro', titleFa: 'AI Orchestra Pro',
    subtitle: 'Enterprise multi-agent LLM orchestration', subtitleFa: 'هماهنگ‌سازی ایجنت‌های LLM سازمانی', category: 'ai',
    tags: ['Python', 'LLM', 'Agents', 'Orchestration'],
    description: 'An enterprise-grade multi-agent LLM orchestration project published by AliKheiri.',
    descriptionFa: 'پروژه هماهنگ‌سازی چندایجنت LLM در سطح سازمانی که توسط علی خیری منتشر شده است.',
    challenge: 'Coordinate specialized AI capabilities as a system with explicit responsibilities.',
    challengeFa: 'هماهنگ‌کردن قابلیت‌های تخصصی هوش مصنوعی در قالب سیستمی با مسئولیت‌های روشن.',
    solution: 'A dedicated public project exploring orchestration patterns for multi-agent applications.',
    solutionFa: 'پروژه‌ای عمومی برای بررسی الگوهای هماهنگ‌سازی اپلیکیشن‌های چندایجنت.',
    impact: 'A clear example of the profile’s focus on practical AI systems.',
    impactFa: 'نمونه‌ای روشن از تمرکز پروفایل روی سامانه‌های عملی هوش مصنوعی.',
    metrics: [{ label: 'Domain', value: 'AI' }, { label: 'Language', value: 'Python' }, { label: 'Stars', value: '0' }],
    githubUrl: `${owner}/ai-orchestra-pro`, demoUrl: `${owner}/ai-orchestra-pro`, featured: false, visualType: 'neural', role: 'Multi-agent orchestration research', roleFa: 'تحقیق در هماهنگ‌سازی چندایجنت', status: 'Public · Experiment', statusFa: 'عمومی · آزمایشی'
  }
];

const githubEntries: [string, string, string, number][] = [
  ['PulseCore', 'TypeScript system project', 'TypeScript', 0],
  ['KRONOS', 'TypeScript application project', 'TypeScript', 0],
  ['IAM-SSO-System', 'Identity and single sign-on system', 'TypeScript', 0],
  ['freelanceflow', 'Freelance workflow project', 'Kotlin', 0],
  ['research-log', 'Paper implementations and AI/ML notes', 'Markdown', 1],
  ['agentin', 'AI agent project', 'Python', 1],
  ['pro-project-manager', 'Project management application', 'TypeScript', 1],
  ['mlops-from-scratch', 'MLOps pipeline for Persian sentiment analysis', 'Python', 1],
  ['trading-platform', 'Trading platform project', 'TypeScript', 1],
  ['ai-orchestra-pro', 'Enterprise-grade multi-agent LLM orchestration', 'Python', 0]
];

export const fallbackGitHubRepos: GitHubRepo[] = githubEntries.map(([name, description, language, stars], index) => ({
  id: index + 1, name, description, language, stars, forks: 0,
  updatedAt: '2026-09-27', htmlUrl: `${owner}/${name}`, topics: []
}));

