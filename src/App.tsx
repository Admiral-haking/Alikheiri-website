/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CyberBackground } from './components/common/CyberBackground';
import { CustomCursor } from './components/common/CustomCursor';
import { Toast } from './components/common/Toast';
const CommandPalette = lazy(() => import('./components/common/CommandPalette').then(module => ({ default: module.CommandPalette })));
const ProjectModal = lazy(() => import('./components/common/ProjectModal').then(module => ({ default: module.ProjectModal })));
const ArticleModal = lazy(() => import('./components/common/ArticleModal').then(module => ({ default: module.ArticleModal })));
const ResumeModal = lazy(() => import('./components/common/ResumeModal').then(module => ({ default: module.ResumeModal })));
import { Navbar } from './components/layout/Navbar';
import { QuickControls } from './components/layout/QuickControls';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { TechStackSection } from './components/sections/TechStackSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { GithubSection } from './components/sections/GithubSection';
import { BlogSection } from './components/sections/BlogSection';
import { ContactSection } from './components/sections/ContactSection';
import { NotFoundView } from './components/sections/NotFoundView';
const AdminPanel = lazy(() => import('./components/common/AdminPanel').then(module => ({ default: module.AdminPanel })));
import { portfolioProjects } from './data/realPortfolioData';
import { Project, BlogPost } from './types/portfolio';

const PortfolioContent: React.FC = () => {
  const { isRtl } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);

  // Modals state
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [showNotFound, setShowNotFound] = useState(false);
  const [adminOpen, setAdminOpen] = useState(() => window.location.hash === '#admin');
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('alikheiri_projects');
      return saved ? JSON.parse(saved) : portfolioProjects;
    } catch { return portfolioProjects; }
  });

  const findProjectFromHash = (items: Project[]) => {
    const match = window.location.hash.match(/^#project\/(.+)$/);
    return match ? items.find(item => item.id === decodeURIComponent(match[1])) ?? null : null;
  };

  const openProject = (project: Project) => {
    setSelectedProject(project);
    window.history.replaceState(null, '', `#project/${encodeURIComponent(project.id)}`);
  };

  // Initial service selection from calculator to contact form
  const [selectedServiceTitles, setSelectedServiceTitles] = useState<string[]>([]);

  // Toast notifications state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setAdminOpen(true);
        return;
      }
      setSelectedProject(findProjectFromHash(projects));
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [projects]);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setScrollProgress(progress);
      setShowTopButton(window.scrollY > 560);
    };
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'));
    if (!elements.length) return;
    if (!('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [projects]);

  if (showNotFound) {
    return <NotFoundView onReturnHome={() => setShowNotFound(false)} />;
  }

  return (
    <div
      className="relative min-h-screen bg-[#050508] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-white/5 pointer-events-none">
        <div className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(0,245,255,.8)] transition-[width] duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>
      {/* Dynamic 60fps Cyber Canvas Background */}
      <CyberBackground />

      {/* Desktop Neon Custom Cursor */}
      <CustomCursor />

      {/* Top Bar Navigation Contract */}
      <Navbar
        onOpenCmdPalette={() => setCmdPaletteOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection onOpenResume={() => setResumeOpen(true)} />
        <AboutSection onOpenResume={() => setResumeOpen(true)} />
        <TechStackSection />
        <ProjectsSection projects={projects} onSelectProject={openProject} />
        <ExperienceSection onOpenResume={() => setResumeOpen(true)} />
        <ServicesSection
          onSelectServicesForContact={titles => {
            setSelectedServiceTitles(titles);
            showToast(`${titles.length} services pre-filled in contact form`);
          }}
        />
        <GithubSection />
        <BlogSection onSelectPost={post => setSelectedArticle(post)} />
        <ContactSection
          initialServiceSelection={selectedServiceTitles}
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer />

      {showTopButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 hover:text-white hover:-translate-y-1 transition-all shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Quick Controls HUD Dock */}
      <QuickControls
        onOpenCmdPalette={() => setCmdPaletteOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onShowToast={showToast}
      />

      {/* Command Palette Overlay */}
      <Suspense fallback={null}>
        <CommandPalette
          isOpen={cmdPaletteOpen}
          onClose={() => setCmdPaletteOpen(false)}
          onOpenResume={() => setResumeOpen(true)}
          onShowToast={showToast}
          onToggleNotFound={() => setShowNotFound(true)}
          onOpenAdmin={() => setAdminOpen(true)}
        />

        {adminOpen && <AdminPanel projects={projects} onClose={() => setAdminOpen(false)} onSave={next => { setProjects(next); localStorage.setItem('alikheiri_projects', JSON.stringify(next)); setAdminOpen(false); showToast('Portfolio content saved locally'); }} />}

        <ProjectModal
          project={selectedProject}
        onShowToast={showToast}
          onClose={() => {
            setSelectedProject(null);
            if (window.location.hash.startsWith('#project/')) window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }}
        />

        <ArticleModal
          post={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onShowToast={showToast}
        />

        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
          onShowToast={showToast}
        />
      </Suspense>

      {/* Toast Feedback */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
