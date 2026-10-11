import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const Footer: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const { playSound } = useTheme();

  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#050508]/90 py-12 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Left: Quiet Brand & Copyright */}
        <div className="space-y-1 text-center md:text-start">
          <div className="text-sm font-bold text-white font-sans flex items-center justify-center md:justify-start gap-2">
            <span>{t.nav.brand}</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-mono text-cyan-400 font-normal">{t.nav.role}</span>
          </div>
          <p className="text-xs text-slate-500 font-mono">{t.footer.copyright}</p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4 text-slate-400">
          <a
            href="https://github.com/Admiral-haking"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:text-cyan-400 hover:bg-white/[0.05] transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/ali-khairi-6016b1336/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:text-cyan-400 hover:bg-white/[0.05] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://t.me/REYZERZZ"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:text-cyan-400 hover:bg-white/[0.05] transition-colors"
            aria-label="Telegram"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="mailto:alikheiri10313@gmail.com"
            className="p-2 rounded-lg hover:text-cyan-400 hover:bg-white/[0.05] transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Back to Top */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500 font-mono hidden lg:inline">
            {t.footer.builtWith}
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/10 text-xs font-mono transition-colors"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
