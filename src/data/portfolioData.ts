import { Project, TechSkill, Experience, ServiceItem, BlogPost, GitHubRepo } from '../types/portfolio';

export const portfolioProjects: Project[] = [
  {
    id: 'neurograph-ai',
    title: 'NeuroGraph AI',
    titleFa: 'نوروگراف هوش مصنوعی',
    subtitle: 'Distributed Multi-Agent Reasoning Graph & Real-Time Orchestrator',
    subtitleFa: 'گراف استدلال چندایجنت توزیع‌شده و هماهنگ‌کننده بلادرنگ',
    category: 'ai',
    tags: ['Python', 'TypeScript', 'LangGraph', 'Vector DB', 'FastAPI', 'WebSocket'],
    description: 'An enterprise autonomous agent orchestrator enabling 50+ specialized LLM agents to collaboratively solve complex multi-step reasoning tasks with cyclical validation and deterministic vector memory routing.',
    descriptionFa: 'پلتفرم هماهنگ‌کننده ایجنت‌های خودمختار سازمانی که بیش از ۵۰ ایجنت تخصصی مدل‌های زبانی را برای حل مسائل پیچیده استدلالی با اعتبارسنجی چرخه‌ای و حافظه برداری مدیریت می‌کند.',
    challenge: 'LLMs suffer from context drift, compounding hallucinations in multi-step workflows, and high latency (>2.5s) when sequentially chained.',
    challengeFa: 'مدل‌های زبانی در زنجیره‌های ترتیبی دچار انحراف کانتکست، توهم‌های تجمعی و تاخیر بسیار بالا (بیش از ۲.۵ ثانیه) می‌شوند.',
    solution: 'Designed an asynchronous directed acyclic graph (DAG) scheduler with localized memory partitions, vector semantic consensus checking, and sub-80ms message queues over WebSockets.',
    solutionFa: 'طراحی اسکژولر گراف غیرمدور جهت‌دار (DAG) ناهمگام با بخش‌بندی محلی حافظه، اجماع معنایی برداری و صف پیام زیر ۸۰ میلی‌ثانیه با وب‌سوکت.',
    impact: 'Reduced token consumption by 42%, dropped median end-to-end task completion latency from 4.8s to 1.1s, and processed over 2.4M autonomous workflows.',
    impactFa: 'کاهش ۴۲ درصدی مصرف توکن، کاهش تاخیر پردازش کل از ۴.۸ ثانیه به ۱.۱ ثانیه و اجرای بیش از ۲.۴ میلیون تسک خودمختار.',
    metrics: [
      { label: 'Latency Drop', value: '-77%' },
      { label: 'Token Efficiency', value: '+42%' },
      { label: 'Concurrent Agents', value: '50+' },
      { label: 'Workflows Executed', value: '2.4M' }
    ],
    githubUrl: 'https://github.com/example/neurograph-ai',
    demoUrl: 'https://neurograph.example.dev',
    featured: true,
    visualType: 'neural'
  },
  {
    id: 'kubepulse-mesh',
    title: 'KubePulse Mesh',
    titleFa: 'کیوب‌پالس مش',
    subtitle: 'Zero-Overhead eBPF Distributed Telemetry & Latency Profiler',
    subtitleFa: 'سامانه تله‌متری توزیع‌شده با سربار صفر بر پایه eBPF',
    category: 'systems',
    tags: ['Rust', 'eBPF', 'Go', 'Kubernetes', 'ClickHouse', 'Prometheus'],
    description: 'Kernel-level distributed tracing and performance profiler for Kubernetes clusters, capturing sub-microsecond network anomalies without sidecar injection or application code modification.',
    descriptionFa: 'سامانه پایش و ردیابی توزیع‌شده در سطح هسته لینوکس برای کلاسترهای کوبرنتیز که ناهنجاری‌های شبکه را در کسری از میکروثانیه بدون نیاز به سایدکار شناسایی می‌کند.',
    challenge: 'Traditional service mesh sidecars (like Envoy) incur noticeable CPU tax (8-14%) and tail latency spikes on high-throughput microservices.',
    challengeFa: 'سایدکارهای سنتی مش سرویس مصرف پردازنده بالایی (۸ تا ۱۴ درصد) و جهش در تاخیر انتهای صف ایجاد می‌کنند.',
    solution: 'Implemented zero-copy socket tracing directly in Linux kernel via eBPF probes, streaming aggregated metrics into ClickHouse with a sub-millisecond ring buffer.',
    solutionFa: 'پیاده‌سازی ردیابی سوکت بدون کپی مستقیماً در هسته با پروب‌های eBPF و ارسال سنجه‌های متراکم به کلیک‌هاوس با بافر زیر میلی‌ثانیه.',
    impact: 'Saved $180k/yr in AWS compute overhead across 800 nodes while providing continuous flamegraphs and automated deadlock diagnosis.',
    impactFa: 'صرفه‌جویی سالانه ۱۸۰ هزار دلاری در هزینه‌های ابری در ۸۰۰ نود همزمان با ارایه نمودارهای مستمر Flamegraph.',
    metrics: [
      { label: 'CPU Overhead', value: '<0.4%' },
      { label: 'Kernel Probes', value: '128' },
      { label: 'Cluster Nodes', value: '800+' },
      { label: 'Saved Cost/Yr', value: '$180k' }
    ],
    githubUrl: 'https://github.com/example/kubepulse-mesh',
    demoUrl: 'https://kubepulse.example.dev',
    featured: true,
    visualType: 'telemetry'
  },
  {
    id: 'aethercode-studio',
    title: 'AetherCode Studio',
    titleFa: 'استودیو ایترکد',
    subtitle: 'High-Performance WebAssembly Cloud IDE & Quantum Simulation Sandbox',
    subtitleFa: 'محیط توسعه ابری وب‌اسمبلی و شبیه‌ساز کوانتومی پرسرعت',
    category: 'fullstack',
    tags: ['TypeScript', 'React', 'WebAssembly', 'Monaco Editor', 'Node.js', 'Docker'],
    description: 'A lightning-fast in-browser development environment that boots full Linux containers in under 350ms, with real-time collaborative editing, AST indexing, and integrated QASM quantum circuit visualization.',
    descriptionFa: 'محیط توسعه فوق‌سریع مبتنی بر مرورگر که کانتینرهای کامل لینوکس را در زیر ۳۵۰ میلی‌ثانیه اجرا کرده و امکان کدنویسی مشارکتی بلادرنگ و شبیه‌سازی مدارهای کوانتومی را فراهم می‌سازد.',
    challenge: 'Cloud IDEs frequently suffer from heavy cold starts (>15s), clumsy collaborative sync race conditions, and poor local file access performance.',
    challengeFa: 'محیط‌های ابری معمولاً از راه‌اندازی اولیه کند (بیش از ۱۵ ثانیه) و مشکلات تداخل در ویرایش همزمان رنج می‌برند.',
    solution: 'Built a custom CRDT engine over WebRTC for conflict-free multi-cursor sync, with WebAssembly-compiled micro-VM boot profiles pre-cached on Edge CDN nodes.',
    solutionFa: 'ساخت موتور CRDT سفارشی روی وب‌آرتی‌سی برای همگام‌سازی بدون تداخل نشانگرها با میکروماشین‌های کامپایل‌شده وب‌اسمبلی در لبه شبکه.',
    impact: 'Adopted by 32,000+ developers globally with zero sync divergence across 1.8M collaborative coding sessions.',
    impactFa: 'مورد استفاده بیش از ۳۲ هزار توسعه‌دهنده در جهان با ثبت ۱.۸ میلیون نشست کدنویسی مشارکتی موفق.',
    metrics: [
      { label: 'Cold Boot Time', value: '350ms' },
      { label: 'Active Users', value: '32k+' },
      { label: 'Sync Latency', value: '<25ms' },
      { label: 'Uptime', value: '99.99%' }
    ],
    githubUrl: 'https://github.com/example/aethercode-studio',
    demoUrl: 'https://aethercode.example.dev',
    featured: true,
    visualType: 'quantum'
  },
  {
    id: 'hyperion-exchange',
    title: 'Hyperion Terminal',
    titleFa: 'ترمینال هایپریون',
    subtitle: 'Sub-Millisecond Algorithmic Execution Engine & Visual Order Book',
    subtitleFa: 'موتور اجرای معاملات الگوریتمی با تاخیر زیر میلی‌ثانیه',
    category: 'systems',
    tags: ['C++', 'Rust', 'WebGL', 'TypeScript', 'Redis', 'ZeroMQ'],
    description: 'An institutional trading terminal capable of rendering 120fps Depth-of-Market (DOM) visualizations, tracking 250,000 order book updates/sec with zero browser UI thread stutter.',
    descriptionFa: 'ترمینال معاملاتی سازمانی با توانایی رندرینگ ۱۲۰ فریم بر ثانیه عمق بازار و پردازش ۲۵۰ هزار به‌روزرسانی دفتر سفارش در ثانیه بدون لگ در مرورگر.',
    challenge: 'Browsers typically choke when streaming tens of thousands of JSON order events per second due to V8 garbage collection spikes.',
    challengeFa: 'مرورگرها معمولاً در اثر دریافت ده‌ها هزار پیام JSON در ثانیه به دلیل وقفه‌های بازیافت حافظه (GC) قفل می‌شوند.',
    solution: 'Designed a binary FlatBuffers deserialization pipeline running in Web Workers, transferring typed Float64Arrays directly to WebGL instanced vertex buffers.',
    solutionFa: 'طراحی خط لوله باینری FlatBuffers در وب‌ورکرها با انتقال مستقیم بافرهای تایپ‌شده به وب‌جی‌ال بدون فشار به ترد اصلی.',
    impact: 'Eliminated all garbage collection micro-freezes, sustaining steady 120fps UI rendering through peak volatility market hours.',
    impactFa: 'حذف کامل فریزهای بازیافت حافظه و دستیابی به نرخ فریم پایدار ۱۲۰ فریم در ثانیه در اوج نوسانات بازار.',
    metrics: [
      { label: 'Message Rate', value: '250k/s' },
      { label: 'UI Frame Rate', value: '120 FPS' },
      { label: 'GC Pauses', value: '0ms' },
      { label: 'Order Latency', value: '0.8ms' }
    ],
    githubUrl: 'https://github.com/example/hyperion-terminal',
    demoUrl: 'https://hyperion.example.dev',
    featured: false,
    visualType: 'trading'
  },
  {
    id: 'chronos-matrix',
    title: 'Chronos Stream',
    titleFa: 'کرونوس استریم',
    subtitle: 'Distributed Event Streaming Framework & Spatial-Temporal Ledger',
    subtitleFa: 'فریم‌ورک استریم رویدادهای توزیع‌شده و دفتر رویداد زمانی',
    category: 'fullstack',
    tags: ['Go', 'Kafka', 'PostgreSQL', 'Next.js', 'Tailwind', 'Docker'],
    description: 'An immutable event-sourcing backbone designed for multi-region financial audits with deterministic replay capabilities and encrypted tamper-evident cryptographic blocks.',
    descriptionFa: 'ستون فقرات مبتنی بر Event-Sourcing برای حسابرسی چندمنطقه‌ای تراکنش‌ها با امکان بازپخش قطعی رویدادها و بلوک‌های رمزنگاری‌شده ضد دستکاری.',
    challenge: 'Auditing multi-region distributed ledgers usually requires hours of database queries and costly manual reconciliation scripts.',
    challengeFa: 'حسابرسی داده‌های توزیع‌شده بین‌المللی معمولاً نیازمند ساعت‌ها کوئری سنگین و اسکریپت‌های مغایرت‌گیری پرهزینه است.',
    solution: 'Implemented zero-loss Raft-consensus append-only logs with automated Merkle tree snapshotting and a reactive real-time explorer portal.',
    solutionFa: 'پیاده‌سازی لاگ الحاقی قطعی مبتنی بر اجماع Raft با تولید خودکار درخت‌های مرکل و داشبورد تعاملی بلادرنگ.',
    impact: 'Reduced audit reconciliation duration from 6 hours to 4 minutes with cryptographically proven mathematical invariants.',
    impactFa: 'کاهش زمان حسابرسی مغایرت‌ها از ۶ ساعت به تنها ۴ دقیقه با اثبات ریاضی و رمزنگاری‌شده.',
    metrics: [
      { label: 'Reconciliation', value: '4 mins' },
      { label: 'Throughput', value: '85k ops/s' },
      { label: 'Data Integrity', value: '100%' },
      { label: 'Regions', value: '6' }
    ],
    githubUrl: 'https://github.com/example/chronos-stream',
    demoUrl: 'https://chronos.example.dev',
    featured: false,
    visualType: 'stream'
  }
];

export const techSkills: TechSkill[] = [
  // Languages
  { id: 'ts', name: 'TypeScript', category: 'languages', level: 98, years: 7, highlight: 'Strict AST tooling, generics & type-level programming', iconName: 'FileCode2' },
  { id: 'rust', name: 'Rust', category: 'languages', level: 90, years: 4, highlight: 'Memory safety, eBPF, async Tokio & WebAssembly', iconName: 'Cpu' },
  { id: 'python', name: 'Python', category: 'languages', level: 94, years: 6, highlight: 'AsyncIO, PyTorch, LangChain, scientific computing', iconName: 'Code' },
  { id: 'go', name: 'Go (Golang)', category: 'languages', level: 88, years: 5, highlight: 'High-throughput microservices, Goroutines, gRPC', iconName: 'Server' },
  { id: 'cpp', name: 'C++', category: 'languages', level: 82, years: 4, highlight: 'Modern C++20, low-latency financial systems', iconName: 'Terminal' },

  // Frontend Architecture
  { id: 'react', name: 'React 19 & Next.js', category: 'frontend', level: 98, years: 7, highlight: 'Server Components, concurrent rendering, micro-frontends', iconName: 'Layers' },
  { id: 'tailwind', name: 'Tailwind CSS v4', category: 'frontend', level: 96, years: 5, highlight: 'Design systems, tokens, zero-runtime CSS, dark mode', iconName: 'Palette' },
  { id: 'webgl', name: 'WebGL & Three.js', category: 'frontend', level: 86, years: 3, highlight: 'Custom fragment shaders, instanced meshes, 60fps canvas', iconName: 'Eye' },
  { id: 'motion', name: 'Motion / Framer', category: 'frontend', level: 95, years: 5, highlight: 'GPU compositor transitions, spring physics, layout animations', iconName: 'Sparkles' },

  // Backend & Systems
  { id: 'node', name: 'Node.js / Bun', category: 'backend', level: 96, years: 7, highlight: 'Event loop tuning, native C++ addons, high RPS pipelines', iconName: 'Server' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', level: 92, years: 4, highlight: 'Pydantic v2 validation, OpenAPI, asynchronous workers', iconName: 'Zap' },
  { id: 'grpc', name: 'gRPC & Protocol Buffers', category: 'backend', level: 89, years: 4, highlight: 'Sub-millisecond inter-service communication', iconName: 'Network' },
  { id: 'kafka', name: 'Apache Kafka', category: 'backend', level: 87, years: 4, highlight: 'Partitioning strategies, schema registry, exact-once delivery', iconName: 'Activity' },

  // AI & ML
  { id: 'pytorch', name: 'PyTorch', category: 'ai', level: 85, years: 3, highlight: 'Transformer fine-tuning, tensor operations, LoRA', iconName: 'Brain' },
  { id: 'langgraph', name: 'LangGraph & LangChain', category: 'ai', level: 94, years: 2, highlight: 'Stateful multi-agent DAGs, vector memory grounding', iconName: 'GitBranch' },
  { id: 'gemini', name: 'Gemini 2.5 / LLM APIs', category: 'ai', level: 96, years: 3, highlight: 'Structured function calling, embeddings, multi-modal pipelines', iconName: 'Bot' },
  { id: 'vector', name: 'Vector DBs (Qdrant/Pinecone)', category: 'ai', level: 90, years: 3, highlight: 'HNSW indexing, hybrid BM25 + dense search', iconName: 'Database' },

  // Cloud & DevOps
  { id: 'k8s', name: 'Kubernetes & Helm', category: 'devops', level: 90, years: 5, highlight: 'Custom controllers, autoscaling, zero-downtime canary rollouts', iconName: 'Cloud' },
  { id: 'docker', name: 'Docker & OCI', category: 'devops', level: 96, years: 7, highlight: 'Multi-stage lean builds, rootless containers, cgroups', iconName: 'Box' },
  { id: 'terraform', name: 'Terraform & IaC', category: 'devops', level: 88, years: 4, highlight: 'Immutable AWS/GCP cloud topology provisioning', iconName: 'FolderGit2' },
  { id: 'ci', name: 'GitHub Actions CI/CD', category: 'devops', level: 95, years: 6, highlight: 'Matrix tests, security scanning, automated semantic releases', iconName: 'CheckCircle' },

  // Databases
  { id: 'postgres', name: 'PostgreSQL & pgvector', category: 'databases', level: 95, years: 7, highlight: 'Query planner optimization, partitioning, vacuum tuning', iconName: 'Database' },
  { id: 'redis', name: 'Redis', category: 'databases', level: 93, years: 6, highlight: 'Pub/Sub, streams, distributed lock synchronization', iconName: 'Flame' },
  { id: 'clickhouse', name: 'ClickHouse', category: 'databases', level: 86, years: 3, highlight: 'Columnar OLAP aggregation over billions of rows', iconName: 'BarChart3' }
];

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Principal Systems Architect',
    roleFa: 'معمار ارشد سیستم‌ها و زیرساخت',
    company: 'NovaScale Labs',
    companyFa: 'آزمایشگاه نوااسکیل',
    period: '2023 - Present',
    periodFa: '۱۴۰۲ - اکنون',
    location: 'San Francisco, CA / Hybrid',
    description: 'Directing the architecture and reliability of distributed AI agent runtime handling 10M+ daily inference queries. Leading a high-performing squad of 12 senior engineers.',
    descriptionFa: 'هدایت معماری و پایداری ران‌تایم ایجنت‌های هوش مصنوعی با بیش از ۱۰ میلیون کوئری روزانه و رهبری تیمی متشکل از ۱۲ مهندس ارشد.',
    achievements: [
      'Engineered an edge routing tier that slashed p99 API latencies from 320ms to 68ms globally',
      'Architected multi-region failover cluster sustaining 99.995% uptime through major cloud provider outages',
      'Designed vector indexing service saving $240,000 annually in memory infrastructure costs',
      'Authored internal engineering RFC standards adopted across all engineering divisions'
    ],
    achievementsFa: [
      'طراحی لایه مسیریابی در لبه شبکه که تاخیر p99 را در سطح جهان از ۳۲۰ به ۶۸ میلی‌ثانیه کاهش داد',
      'معماری کلاستر چندمنطقه‌ای با تضمین پایداری ۹۹.۹۹۵ درصدی در طول قطعی‌های شبکه ابری',
      'طراحی سرویس ایندکس برداری با صرفه‌جویی سالانه ۲۴۰ هزار دلار در هزینه‌های سرور',
      'تدوین استانداردهای فنی RFC مورد استفاده در تمام تیم‌های توسعه شرکت'
    ],
    skills: ['Kubernetes', 'Go', 'Rust', 'Kafka', 'PostgreSQL', 'LangGraph'],
    type: 'full-time'
  },
  {
    id: 'exp-2',
    role: 'Staff Full-Stack Engineer',
    roleFa: 'مهندس ارشد فول‌استک و پلتفرم',
    company: 'Synthetix AI',
    companyFa: 'سینتتیکس هوش مصنوعی',
    period: '2021 - 2023',
    periodFa: '۱۴۰۰ - ۱۴۰۲',
    location: 'New York, NY / Remote',
    description: 'Spearheaded frontend architecture and WebSocket streaming microservices for flagship enterprise synthetic data platform.',
    descriptionFa: 'رهبری معماری فرانت‌اند و میکروسرویس‌های استریمینگ وب‌سوکت برای پلتفرم داده‌های سنتتیک سازمانی.',
    achievements: [
      'Built reactive WebGL canvas visualizer rendering 500k dynamic data points at solid 60 FPS',
      'Reduced core web app bundle size by 64% using tree-shaking, code-splitting, and dynamic worker imports',
      'Mentored 6 junior/mid engineers and initiated company-wide automated visual regression testing suite'
    ],
    achievementsFa: [
      'ساخت ویژوالایزر وب‌جی‌ال با توانایی رندر ۵۰۰ هزار نقطه داده پویا در نرخ فریم ۶۰ فریم بر ثانیه',
      'کاهش ۶۴ درصدی حجم باندل جاوااسکریپت با روش‌های پیشرفته کد اسپلیتینگ و ماژول‌های پویا',
      'منتورینگ ۶ مهندس نرم‌افزار و راه‌اندازی سیستم تست خودکار رگرسیون دیداری'
    ],
    skills: ['React', 'TypeScript', 'WebGL', 'Node.js', 'Redis', 'Docker'],
    type: 'full-time'
  },
  {
    id: 'exp-3',
    role: 'Infrastructure & Distributed Systems Engineer',
    roleFa: 'مهندس سیستم‌های توزیع‌شده و زیرساخت',
    company: 'QuantumFlow Core',
    companyFa: 'کوانتوم‌فلو کور',
    period: '2019 - 2021',
    periodFa: '۱۳۹۸ - ۱۴۰۰',
    location: 'Boston, MA',
    description: 'Developed high-throughput financial data pipelines and distributed telemetry instrumentation for institutional trading clients.',
    descriptionFa: 'توسعه پایپ‌لاین‌های فوق‌سریع داده‌های مالی و ابزارهای تله‌متری توزیع‌شده برای مشتریان بانکی و سازمانی.',
    achievements: [
      'Implemented zero-copy message pipeline processing 85,000 transactions/second with sub-2ms processing jitter',
      'Automated Kubernetes cluster deployments via Terraform and custom GitOps controllers'
    ],
    achievementsFa: [
      'پیاده‌سازی پایپ‌لاین تبادل پیام بدون کپی با ظرفیت ۸۵ هزار تراکنش در ثانیه و تاخیر زیر ۲ میلی‌ثانیه',
      'خودکارسازی کامل استقرار کلاسترهای کوبرنتیز با ترافورم و گیت‌آپز'
    ],
    skills: ['C++', 'Python', 'Kafka', 'ClickHouse', 'AWS', 'Linux'],
    type: 'full-time'
  },
  {
    id: 'exp-4',
    role: 'B.S. in Computer Science & Artificial Intelligence',
    roleFa: 'کارشناسی علوم کامپیوتر و هوش مصنوعی',
    company: 'State University of New York (SUNY) & MIT Fellow',
    companyFa: 'دانشگاه ایالتی نیویورک و پژوهشگر همکار MIT',
    period: '2015 - 2019',
    periodFa: '۱۳۹۴ - ۱۳۹۸',
    location: 'New York / Cambridge, MA',
    description: 'Summa Cum Laude honors. Specialized in Distributed Operating Systems, Algorithmic Graph Theory, and Machine Perception.',
    descriptionFa: 'فارغ‌التحصیل با درجه عالی. تخصص در سیستم‌های عامل توزیع‌شده، نظریه گراف الگوریتمی و یادگیری ماشین.',
    achievements: [
      'Published academic paper on asynchronous consensus in partitioned networks',
      '1st Place Winner at National Collegiate Cyber Defense Competition (NECCDC)'
    ],
    achievementsFa: [
      'انتشار مقاله علمی درباره اجماع ناهمگام در شبکه‌های توزیع‌شده دارای پارتیشن',
      'کسب مقام نخست در مسابقات ملی دفاع سایبری دانشگاهی آمریکا'
    ],
    skills: ['Algorithms', 'Operating Systems', 'Compilers', 'Information Theory'],
    type: 'education'
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: 'fullstack-arch',
    title: 'High-Performance Web Architecture',
    titleFa: 'معماری وب‌اپلیکیشن‌های پرسرعت',
    description: 'End-to-end design and engineering of enterprise web applications with sub-100ms response targets, strict typographic systems, and resilient cloud backends.',
    descriptionFa: 'طراحی و توسعه سرتاسری وب‌اپلیکیشن‌های سازمانی با هدف تاخیر زیر ۱۰۰ میلی‌ثانیه، سیستم طراحی استاندارد و بک‌اند ابری مطمئن.',
    deliverables: [
      'Production React 19 / Next.js architecture',
      'Comprehensive design token implementation',
      'End-to-end type safety (tRPC / OpenAPI)',
      'Sub-1s LCP & 99+ Lighthouse performance'
    ],
    deliverablesFa: [
      'معماری عملیاتی با React 19 و Next.js',
      'پیاده‌سازی دقیق دیزاین سیستم با متغیرهای توکن',
      'امنیت نوع داده از کلاینت تا سرور',
      'کسب امتیاز ۹۹+ در تست سرعت لایت‌هاوس'
    ],
    iconName: 'Layout',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
    estTimeline: '3 - 6 Weeks'
  },
  {
    id: 'ai-agents',
    title: 'AI Agent Networks & LLM Systems',
    titleFa: 'شبکه‌های ایجنت هوش مصنوعی و مدل‌های زبانی',
    description: 'Production-ready LLM pipelines, autonomous multi-agent graphs, deterministic function-calling tools, and sub-second semantic retrieval systems.',
    descriptionFa: 'توسعه پایپ‌لاین‌های عملیاتی مدل‌های زبانی، گراف‌های چندایجنت خودمختار، ابزارهای قطعی فراخوانی توابع و سیستم‌های بازیابی برداری.',
    deliverables: [
      'Custom LangGraph DAG orchestration',
      'Deterministic JSON schema validation',
      'Hybrid dense + sparse vector search',
      'Automated hallucination guardrails & evals'
    ],
    deliverablesFa: [
      'هماهنگ‌سازی گراف‌های ایجنت LangGraph',
      'اعتبارسنجی قطعی ساختار خروجی‌ها',
      'جستجوی ترکیبی برداری و کلمات کلیدی',
      'سامانه‌های ارزیابی و جلوگیری از توهم مدل'
    ],
    iconName: 'Brain',
    techStack: ['Python', 'FastAPI', 'LangGraph', 'Qdrant'],
    estTimeline: '4 - 8 Weeks'
  },
  {
    id: 'distributed-microservices',
    title: 'Distributed Systems & High-Throughput APIs',
    titleFa: 'سیستم‌های توزیع‌شده و APIهای مقیاس‌پذیر',
    description: 'Resilient event-driven microservices engineered to handle millions of requests with zero downtime and graceful degraded states.',
    descriptionFa: 'میکروسرویس‌های رویدادمحور و تاب‌آور برای پردازش میلیون‌ها درخواست با در دسترس بودن ۱۰۰ درصدی و تحمل خطا.',
    deliverables: [
      'Sub-millisecond gRPC / REST / WebSocket APIs',
      'Kafka / Redis event streaming pipelines',
      'Distributed caching & lock orchestration',
      'Database query indexing & schema optimization'
    ],
    deliverablesFa: [
      'سرویس‌های gRPC و وب‌سوکت با تاخیر زیر میلی‌ثانیه',
      'پایپ‌لاین‌های پردازش رویداد با کافکا و ردیس',
      'معماری کشینگ توزیع‌شده و قفل‌های همگام',
      'بهینه‌سازی عمیق کوئری‌ها و ساختار دیتابیس'
    ],
    iconName: 'Server',
    techStack: ['Go', 'Rust', 'Kafka', 'PostgreSQL'],
    estTimeline: '4 - 10 Weeks'
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Infrastructure & Kubernetes Automation',
    titleFa: 'زیرساخت ابری و خودکارسازی کوبرنتیز',
    description: 'Production-grade Kubernetes clusters, GitOps pipelines, IaC setups, and eBPF-powered cluster telemetry for enterprise scale.',
    descriptionFa: 'استقرار کلاسترهای عملیاتی کوبرنتیز، پایپ‌لاین‌های گیت‌آپز، زیرساخت به عنوان کد (IaC) و پایش پیشرفته کلاستر با eBPF.',
    deliverables: [
      'Terraform multi-environment infrastructure',
      'Zero-downtime blue/green & canary deployments',
      'Automated Prometheus & Grafana alerts',
      'Security hardening & SOC2 compliance prep'
    ],
    deliverablesFa: [
      'کدهای زیرساخت ترافورم برای محیط‌های چندگانه',
      'استقرار نرم‌افزار بدون توقف (Canary / Blue-Green)',
      'سیستم هشدارهای خودکار پرومتئوس و گرافانا',
      'امن‌سازی کلاسترها و تطابق با استانداردهای امنیتی'
    ],
    iconName: 'Cloud',
    techStack: ['Kubernetes', 'Terraform', 'Docker', 'AWS/GCP'],
    estTimeline: '2 - 5 Weeks'
  },
  {
    id: 'creative-canvas',
    title: 'Creative WebGL & 3D Interactive Interfaces',
    titleFa: 'رابط‌های کاربری سه‌بعدی و گرافیک تعاملی WebGL',
    description: 'Memorable, cinematic visual web experiences utilizing custom GLSL shaders, canvas physics, and 60fps responsive interaction design.',
    descriptionFa: 'تجربیات وب سینمایی و به‌یادماندنی با شیدرهای سفارشی GLSL، شبیه‌سازی فیزیک در کانواس و تعاملات روان ۶۰ فریم در ثانیه.',
    deliverables: [
      'Custom WebGL / Three.js particle systems',
      'Audio-reactive interactive visualizers',
      'High-performance SVG / Canvas graphs',
      'Accessible reduced-motion fallbacks'
    ],
    deliverablesFa: [
      'سیستم‌های ذرات سه‌بعدی با WebGL و Three.js',
      'ویژوالایزرهای تعاملی واکنش‌گرا به صوت',
      'نمودارهای پرسرعت در کانواس',
      'پشتیبانی کامل از استانداردهای دسترسی‌پذیری'
    ],
    iconName: 'Sparkles',
    techStack: ['Three.js', 'GLSL', 'Canvas API', 'Motion'],
    estTimeline: '2 - 4 Weeks'
  },
  {
    id: 'perf-audit',
    title: 'Performance Audits & Latency Optimization',
    titleFa: 'ممیزی عملکرد و بهینه‌سازی تاخیر سیستم',
    description: 'In-depth diagnostic profiling of application code, database queries, memory leaks, and network hops with guaranteed speed improvements.',
    descriptionFa: 'بررسی تشخیصی عمیق کدهای نرم‌افزار، کوئری‌های پایگاه داده، نشت حافظه و گلوگاه‌های شبکه با تضمین بهبود ملموس سرعت.',
    deliverables: [
      'Complete flamegraph CPU / memory analysis',
      'Database query execution plan refactoring',
      'Frontend render waterfall optimization',
      'Actionable executive engineering report'
    ],
    deliverablesFa: [
      'تحلیل جامع مصرف پردازنده و رم با نمودار Flamegraph',
      'بازنویسی پلن‌های اجرایی کوئری‌های کند دیتابیس',
      'بهینه‌سازی زنجیره لود و رندر فرانت‌اند',
      'گزارش فنی و اجرایی با اقدامات شفاف'
    ],
    iconName: 'Zap',
    techStack: ['eBPF', 'Lighthouse', 'V8 Profiler', 'ClickHouse'],
    estTimeline: '1 - 2 Weeks'
  }
];

export const sampleBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Architecting Sub-50ms Multi-Agent LLM Systems with Vector Routing',
    titleFa: 'معماری سیستم‌های چندایجنت هوش مصنوعی با تاخیر زیر ۵۰ میلی‌ثانیه و مسیریابی برداری',
    slug: 'architecting-sub-50ms-multi-agent-systems',
    excerpt: 'How we restructured our sequential agent pipelines into an asynchronous DAG scheduler with localized semantic memory, dropping median completion time by 77%.',
    excerptFa: 'چگونه پایپ‌لاین‌های ترتیبی هوش مصنوعی را به اسکژولر گراف غیرمدور با حافظه معنایی محلی تبدیل کردیم و تاخیر را ۷۷ درصد کاهش دادیم.',
    publishedDate: 'March 2026',
    readTime: '6 min read',
    category: 'AI Architecture',
    categoryFa: 'معماری هوش مصنوعی',
    tags: ['LangGraph', 'Python', 'FastAPI', 'Performance'],
    claps: 342,
    content: `
### The Compounding Latency Problem

When orchestrating autonomous LLM agents in production, naive implementations chain agent calls sequentially: Agent A calls an API, passes its textual output to Agent B, which then queries a vector database before handing off to Agent C.

In practice, this creates a catastrophic latency cascade:
\`\`\`
Sequential Model:
[Agent A: 1200ms] ──> [Network: 150ms] ──> [Agent B: 1800ms] ──> [Agent C: 1600ms] = 4,750ms total!
\`\`\`

Not only is 4.7 seconds unacceptable for interactive applications, but token consumption compounds exponentially because intermediate agents restate prompt instructions.

### The DAG Routing Solution

Instead of a linear chain, we formulated our execution graph as a Directed Acyclic Graph (DAG) with localized state machines:

\`\`\`typescript
interface AgentNode {
  id: string;
  capabilities: string[];
  maxTokens: number;
  dependencies: string[];
  execute: (context: AgentContext) => Promise<AgentResult>;
}

// Parallel execution planner
async function executeDAG(nodes: AgentNode[], context: AgentContext) {
  const readyNodes = nodes.filter(n => n.dependencies.length === 0);
  const running = readyNodes.map(node => node.execute(context));
  return await Promise.allSettled(running);
}
\`\`\`

### Key Architectural Invariants

1. **State Independence**: No agent modifies the global state directly; all transformations are emitted as typed events.
2. **Vector Memory Pre-Filtering**: Queries are pruned through high-dimensional semantic clustering before hitting heavy vector indexes.
3. **Speculative Execution**: When probability of next branch exceeds 85%, candidate branch nodes are primed in parallel.

With these optimizations, p90 response times fell from 4.8s to 1.1s, while token usage plummeted by 42%.
    `,
    contentFa: `
### چالش تاخیرهای تجمعی در هوش مصنوعی

در پیاده‌سازی اولیه ایجنت‌های هوش مصنوعی، زنجیره‌های ترتیبی باعث افزایش سرسام‌آور تاخیر پاسخ‌دهی می‌شوند. هر ایجنت منتظر اتمام کار ایجنت قبلی می‌ماند و این مسئله تاخیر کل را به بالای ۴ ثانیه می‌رساند.

### راهکار معماری مبتنی بر گراف ناهمگام (DAG)

با بازطراحی فرآیند به شکل یک گراف غیرمدور جهت‌دار، ایجنت‌هایی که وابستگی متقابل ندارند به صورت موازی اجرا می‌شوند.

\`\`\`typescript
interface AgentNode {
  id: string;
  capabilities: string[];
  maxTokens: number;
  dependencies: string[];
  execute: (context: AgentContext) => Promise<AgentResult>;
}
\`\`\`

### دستاوردهای ملموس

۱. حذف کامل تاخیرهای بیهوده در انتظار شبکه.
۲. کاهش ۴۲ درصدی مصرف توکن‌ها از طریق فیلتر کردن کانتکست‌های تکراری.
۳. ارتقای پایداری و دقت استدلال ایجنت‌ها به لطف اعتبارسنجی قطعی خروجی‌ها.
    `
  },
  {
    id: 'post-2',
    title: 'Inside Distributed Event Sourcing: Scaling to 100k RPS Without Compromising Consistency',
    titleFa: 'کالبدشکافی Event Sourcing توزیع‌شده: مقیاس‌پذیری تا ۱۰۰ هزار درخواست در ثانیه',
    slug: 'distributed-event-sourcing-at-scale',
    excerpt: 'Detailed engineering blueprint for building immutable, append-only financial ledgers using Kafka, ClickHouse, and Raft consensus.',
    excerptFa: 'برنامه مهندسی جامع برای ساخت دفاتر کل مالی الحاقی و تغییرناپذیر با کافکا، کلیک‌هاوس و اجماع رفت.',
    publishedDate: 'February 2026',
    readTime: '8 min read',
    category: 'Distributed Systems',
    categoryFa: 'سیستم‌های توزیع‌شده',
    tags: ['Kafka', 'Go', 'ClickHouse', 'Database'],
    claps: 519,
    content: `
### The Illusion of In-Place Database Updates

Traditional CRUD applications rely on mutating existing rows: \`UPDATE accounts SET balance = balance - 100 WHERE id = 42\`. While simple, this destroys historical audit trails and creates database row contention during high concurrency.

In high-throughput fintech infrastructure, in-place updates are considered an anti-pattern. Instead, every action is modeled as an immutable, timestamped event:

\`\`\`go
type TransactionEvent struct {
    EventID       uuid.UUID \`json:"event_id"\`
    Timestamp     int64     \`json:"timestamp"\`
    AccountID     string    \`json:"account_id"\`
    DeltaAmount   int64     \`json:"delta_cents"\`
    SequenceNum   uint64    \`json:"sequence_num"\`
    Signature     []byte    \`json:"signature"\`
}
\`\`\`

### Eliminating Lock Contention with Partition Sharding

By sharding Kafka topics on \`AccountID\`, events for any individual entity are guaranteed to arrive in strict chronological order on the same consumer thread. This entirely eliminates row locks in the database!

Read models are materialized asynchronously into ClickHouse for instantaneous analytical queries across hundreds of millions of historical events.
    `,
    contentFa: `
### تغییر ناپذیری داده‌ها و ثبت وقایع

در سیستم‌های سنتی مالی، ویرایش مستقیم ردیف‌های دیتابیس باعث از بین رفتن سابقه تاریخی و ایجاد قفل‌های سنگین در ردیف‌ها می‌شود. با به‌کارگیری معماری Event-Sourcing، هر تراکنش به عنوان یک رویداد قطعی و غیرقابل تغییر ثبت می‌گردد.

### نتایج عملیاتی

- دستیابی به نرخ پردازش پایدار ۱۰۰ هزار درخواست در ثانیه.
- صفر شدن قفل‌های دیتابیس در تراکنش‌های همزمان.
- امکان بازسازی دقیق وضعیت سیستم در هر لحظه از تاریخچه.
    `
  },
  {
    id: 'post-3',
    title: 'High-Performance WebGL Shaders & Canvas Optimization for Modern Web Apps',
    titleFa: 'بهینه‌سازی گرافیک تعاملی و شیدرهای WebGL در وب‌اپلیکیشن‌های مدرن',
    slug: 'webgl-shaders-canvas-optimization',
    excerpt: 'Techniques for rendering 100,000+ interactive particles at a buttery 60 FPS without taxing the main browser thread or draining battery.',
    excerptFa: 'راهکارهای عملی برای رندر بیش از ۱۰۰ هزار ذره تعاملی در نرخ ۶۰ فریم بر ثانیه بدون افت باتری و فشار به مرورگر.',
    publishedDate: 'January 2026',
    readTime: '5 min read',
    category: 'Creative Engineering',
    categoryFa: 'مهندسی خلاقیت و وب‌جی‌ال',
    tags: ['WebGL', 'GLSL', 'Canvas', 'Performance'],
    claps: 284,
    content: `
### Why the DOM Fails at High Particle Counts

The DOM was engineered for documents, not particle simulations. Rendering even 500 \`<div>\` elements with continuous CSS animations triggers layout recalculations and style recalculations on every frame, quickly dropping refresh rates to 15 FPS.

### The Instanced Mesh Technique

With WebGL, all particle geometry is uploaded to the GPU VBO (Vertex Buffer Object) once. On every frame, we only upload a single typed array containing transformation matrices and color attributes:

\`\`\`glsl
// Vertex Shader
attribute vec3 aOffset;
attribute float aScale;
attribute vec3 aColor;

uniform float uTime;
varying vec3 vColor;

void main() {
    vColor = aColor;
    vec3 pos = position * aScale + aOffset;
    pos.y += sin(uTime * 2.0 + aOffset.x * 0.05) * 4.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
\`\`\`

By offloading calculations directly to the GPU's vertex shader, the CPU remains free to handle business logic, audio processing, and user inputs with zero perceptible jitter.
    `,
    contentFa: `
### تفاوت DOM و رندرینگ مستقیم روی GPU

المان‌های معمول HTML برای شبیه‌سازی ذرات مناسب نیستند چون در هر فریم موتور مرورگر را وادار به محاسبه مجدد لی‌آوت می‌کنند. با انتقال محاسبات به شیدرهای WebGL، صدها هزار ذره بدون افت فریم پردازش می‌شوند.

### مزایای تکنیک Instancing

- یک‌بار ارسال داده‌های هندسه به کارت گرافیک.
- اجرای تمام جابه‌جایی‌ها و نورپردازی‌ها در سطح GPU.
- آزادی کامل پردازنده برای مدیریت رویدادهای کاربر و پایداری ۶۰ فریم در ثانیه.
    `
  }
];

export const fallbackGitHubRepos: GitHubRepo[] = [
  {
    id: 101,
    name: 'neurograph-engine',
    description: 'High-performance asynchronous DAG execution runtime for autonomous LLM agent graphs with vector memory routing.',
    stars: 1240,
    forks: 184,
    language: 'TypeScript',
    updatedAt: '2026-03-28',
    htmlUrl: 'https://github.com/kianvance/neurograph-engine',
    topics: ['ai', 'langgraph', 'llm-agents', 'dag', 'typescript']
  },
  {
    id: 102,
    name: 'kubepulse-ebpf',
    description: 'Kernel-level distributed network latency tracer and cluster observability engine written in Rust and eBPF.',
    stars: 890,
    forks: 92,
    language: 'Rust',
    updatedAt: '2026-04-02',
    htmlUrl: 'https://github.com/kianvance/kubepulse-ebpf',
    topics: ['rust', 'ebpf', 'kubernetes', 'observability', 'linux']
  },
  {
    id: 103,
    name: 'hyperion-terminal-core',
    description: 'Sub-millisecond institutional market depth order book visualizer using WebGL instanced rendering and FlatBuffers.',
    stars: 645,
    forks: 71,
    language: 'C++',
    updatedAt: '2026-03-15',
    htmlUrl: 'https://github.com/kianvance/hyperion-terminal-core',
    topics: ['trading', 'webgl', 'flatbuffers', 'low-latency', 'cpp']
  },
  {
    id: 104,
    name: 'chronos-event-stream',
    description: 'Append-only event sourcing framework with Raft consensus and cryptographic Merkle tree audit verification.',
    stars: 430,
    forks: 38,
    language: 'Go',
    updatedAt: '2026-02-20',
    htmlUrl: 'https://github.com/kianvance/chronos-event-stream',
    topics: ['event-sourcing', 'golang', 'raft', 'kafka', 'ledger']
  }
];
