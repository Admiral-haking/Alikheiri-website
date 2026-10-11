/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CyberBackground } from './components/common/CyberBackground';
import { CustomCursor } from './components/common/CustomCursor';
import { Toast } from './components/common/Toast';
import { CommandPalette } from './components/common/CommandPalette';
import { ProjectModal } from './components/common/ProjectModal';
import { ArticleModal } from './components/common/ArticleModal';
import { ResumeModal } from './components/common/ResumeModal';
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
        <ProjectsSection onSelectProject={p => setSelectedProject(p)} />
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
      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        onOpenResume={() => setResumeOpen(true)}
        onShowToast={showToast}
        onToggleNotFound={() => setShowNotFound(true)}
      />

      {/* Case Study Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Article Reader Modal */}
      <ArticleModal
        post={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onShowToast={showToast}
      />

      {/* Full Resume / CV Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        onShowToast={showToast}
      />

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
