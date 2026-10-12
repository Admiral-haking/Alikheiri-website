import React, { useState } from 'react';
import { Menu, X, Command, Sparkles, Globe, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onOpenCmdPalette: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCmdPalette, onOpenResume }) => {
  const { t, isRtl, language, toggleLanguage } = useLanguage();
  const { playSound, soundEnabled, toggleSound } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    playSound('click');
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#050508]/80 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark) */}
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playSound('click');
          }}
          className="text-lg font-bold tracking-tight text-white font-sans hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>{t.nav.brand}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_#00F5FF]" />
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono font-medium text-slate-300">
          <a
            href="#work"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#work');
            }}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.work}
          </a>
          <a
            href="#stack"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#stack');
            }}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.stack}
          </a>
          <a
            href="#experience"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#experience');
            }}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.experience}
          </a>
          <a
            href="#services"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#services');
            }}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.services}
          </a>
          <a
            href="#blog"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#blog');
            }}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.articles}
          </a>
        </nav>

        {/* Zone 3: 1 primary action + discrete helper triggers */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick command search trigger */}
          <button
            onClick={() => {
              playSound('click');
              onOpenCmdPalette();
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/10 text-xs font-mono transition-colors"
            title="Open command palette (Cmd+K / Ctrl+K)"
            aria-label="Open command palette"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="text-[11px] font-sans">K</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => {
              playSound('click');
              toggleLanguage();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors"
            title="Switch Language (English / فارسی)"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase text-[11px]">{language}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              playSound('click');
              handleNavClick('#contact');
            }}
            className="max-[420px]:hidden px-4 py-2 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-[0_0_15px_-3px_rgba(0,245,255,0.5)]"
          >
            {t.nav.contact}
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-11 min-h-11 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden glass-panel-elevated border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-150"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="flex flex-col space-y-3 text-sm font-mono text-slate-200">
            <button
              onClick={() => handleNavClick('#work')}
              className="text-start py-2 hover:text-cyan-400 transition-colors"
            >
              {t.nav.work}
            </button>
            <button
              onClick={() => handleNavClick('#stack')}
              className="text-start py-2 hover:text-cyan-400 transition-colors"
            >
              {t.nav.stack}
            </button>
            <button
              onClick={() => handleNavClick('#experience')}
              className="text-start py-2 hover:text-cyan-400 transition-colors"
            >
              {t.nav.experience}
            </button>
            <button
              onClick={() => handleNavClick('#services')}
              className="text-start py-2 hover:text-cyan-400 transition-colors"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick('#github')}
              className="text-start py-2 hover:text-cyan-400 transition-colors"
            >
              {t.github.title}
            </button>
            <button
              onClick={() => handleNavClick('#blog')}
              className="text-start py-2 hover:text-cyan-400 transition-colors"
            >
              {t.nav.articles}
            </button>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 px-4 text-xs font-mono font-medium rounded-lg bg-white/10 hover:bg-white/15 text-white text-center transition-colors border border-white/10"
            >
              {t.nav.resume}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCmdPalette();
              }}
              className="py-2.5 px-4 text-xs font-mono rounded-lg bg-white/5 text-slate-300 border border-white/10"
            >
              Cmd+K
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
