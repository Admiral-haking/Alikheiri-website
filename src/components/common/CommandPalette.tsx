import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Code2,
  Briefcase,
  Layers,
  Wrench,
  BookOpen,
  Mail,
  FileText,
  Palette,
  Globe,
  Volume2,
  VolumeX,
  X,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { AccentTheme } from '../../types/portfolio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onShowToast: (msg: string) => void;
  onToggleNotFound?: () => void;
  onOpenAdmin?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onShowToast,
  onToggleNotFound
  ,onOpenAdmin
}) => {
  const { t, language, setLanguage, isRtl } = useLanguage();
  const { accent, setAccent, soundEnabled, toggleSound, playSound } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      playSound('modal');
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Section items
  const navigationItems = [
    { id: 'nav-work', label: t.nav.work, icon: Briefcase, action: () => scrollToSection('#work') },
    { id: 'nav-stack', label: t.nav.stack, icon: Layers, action: () => scrollToSection('#stack') },
    { id: 'nav-experience', label: t.nav.experience, icon: Code2, action: () => scrollToSection('#experience') },
    { id: 'nav-services', label: t.nav.services, icon: Wrench, action: () => scrollToSection('#services') },
    { id: 'nav-github', label: t.github.title, icon: Code2, action: () => scrollToSection('#github') },
    { id: 'nav-blog', label: t.nav.articles, icon: BookOpen, action: () => scrollToSection('#blog') },
    { id: 'nav-contact', label: t.nav.contact, icon: Mail, action: () => scrollToSection('#contact') }
  ];

  // Action items
  const actionItems = [
    {
      id: 'act-resume',
      label: t.commandPalette.openResumeAction,
      icon: FileText,
      action: () => {
        onClose();
        onOpenResume();
      }
    },
    {
      id: 'act-email',
      label: t.commandPalette.copyEmailAction,
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText('alikheiri10313@gmail.com');
        onShowToast(t.contact.emailCopied);
        onClose();
      }
    },
    {
      id: 'act-sound',
      label: `${t.commandPalette.toggleSound} (${soundEnabled ? 'ON' : 'OFF'})`,
      icon: soundEnabled ? Volume2 : VolumeX,
      action: () => {
        toggleSound();
        onShowToast(soundEnabled ? 'Audio muted' : 'Audio enabled');
      }
    },
    {
      id: 'act-lang',
      label: language === 'en' ? t.commandPalette.switchToFa : t.commandPalette.switchToEn,
      icon: Globe,
      action: () => {
        setLanguage(language === 'en' ? 'fa' : 'en');
        onClose();
      }
    },
    {
      id: 'act-404',
      label: 'Inspect 404 Cyber Portal View',
      icon: Sparkles,
      action: () => {
        onClose();
        if (onToggleNotFound) onToggleNotFound();
      }
    },
    {
      id: 'act-admin',
      label: 'Open portfolio content manager',
      icon: Wrench,
      action: () => { onClose(); onOpenAdmin?.(); }
    }
  ];

  // Accent items
  const accentItems: { id: string; label: string; accentVal: AccentTheme; color: string }[] = [
    { id: 'acc-cyan', label: t.commandPalette.accentCyan, accentVal: 'cyan', color: '#00F5FF' },
    { id: 'acc-purple', label: t.commandPalette.accentPurple, accentVal: 'purple', color: '#8B5CF6' },
    { id: 'acc-emerald', label: t.commandPalette.accentEmerald, accentVal: 'emerald', color: '#10B981' },
    { id: 'acc-amber', label: t.commandPalette.accentAmber, accentVal: 'amber', color: '#F59E0B' }
  ];

  const scrollToSection = (hash: string) => {
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter items based on query
  const filteredNav = navigationItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredActions = actionItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredAccents = accentItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const allFiltered = [
    ...filteredNav.map(i => ({ ...i, type: 'nav' })),
    ...filteredActions.map(i => ({ ...i, type: 'action' })),
    ...filteredAccents.map(i => ({
      ...i,
      type: 'accent',
      icon: Palette,
      action: () => {
        setAccent(i.accentVal);
        onClose();
        onShowToast(`Accent updated: ${i.accentVal}`);
      }
    }))
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < allFiltered.length - 1 ? prev + 1 : 0));
        playSound('hover');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : allFiltered.length - 1));
        playSound('hover');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (allFiltered[selectedIndex]) {
          playSound('click');
          allFiltered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, allFiltered, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl rounded-2xl glass-panel-elevated border border-white/10 shadow-2xl overflow-hidden"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={t.commandPalette.placeholder}
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
          {allFiltered.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500 font-mono">
              {t.commandPalette.noResults}
            </div>
          ) : (
            allFiltered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playSound('click');
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-colors text-start ${
                    isSelected
                      ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp
                      className={`w-4 h-4 ${
                        isSelected ? 'text-cyan-400' : 'text-slate-500'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                    {item.type}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-t border-white/5 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>Use ↑↓ to navigate</span>
            <span>·</span>
            <span>↵ to select</span>
          </div>
          <span>ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
