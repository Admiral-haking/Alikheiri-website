import React, { useState } from 'react';
import {
  FileCode2,
  Cpu,
  Code,
  Server,
  Terminal,
  Layers,
  Palette,
  Eye,
  Sparkles,
  Zap,
  Network,
  Activity,
  Brain,
  GitBranch,
  Bot,
  Database,
  Cloud,
  Box,
  FolderGit2,
  CheckCircle,
  Flame,
  BarChart3,
  Search,
  SlidersHorizontal
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { techSkills } from '../../data/realProfileData';
import { TechSkill } from '../../types/portfolio';

// Map icon names to Lucide icons
const iconMap: Record<string, React.ElementType> = {
  FileCode2,
  Cpu,
  Code,
  Server,
  Terminal,
  Layers,
  Palette,
  Eye,
  Sparkles,
  Zap,
  Network,
  Activity,
  Brain,
  GitBranch,
  Bot,
  Database,
  Cloud,
  Box,
  FolderGit2,
  CheckCircle,
  Flame,
  BarChart3
};

export const TechStackSection: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const { playSound } = useTheme();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<TechSkill | null>(null);

  const categories = [
    { id: 'all', label: t.stack.categories.all },
    { id: 'languages', label: t.stack.categories.languages },
    { id: 'frontend', label: t.stack.categories.frontend },
    { id: 'backend', label: t.stack.categories.backend },
    { id: 'ai', label: t.stack.categories.ai },
    { id: 'devops', label: t.stack.categories.devops },
    { id: 'databases', label: t.stack.categories.databases }
  ];

  const filteredSkills = techSkills.filter(skill => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.highlight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="stack" className="py-24 relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
            {t.stack.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight text-balance">
            {t.stack.title}
          </h2>
        </div>

        {/* Filter Bar & Search */}
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Functional Button Tabs for Category Filtering (Allowed per Section 1.A) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playSound('click');
                    setActiveCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,245,255,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] max-w-sm">
            <Search className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.stack.searchPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {filteredSkills.map(skill => {
            const IconComponent = iconMap[skill.iconName] || Code;
            return (
              <div
                key={skill.id}
                onClick={() => {
                  playSound('click');
                  setSelectedSkill(skill);
                }}
                className="reveal-up lift-on-hover p-5 rounded-xl glass-panel border border-white/[0.07] hover:border-cyan-500/30 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-sans">{skill.name}</h3>
                      <div className="text-[11px] font-mono text-slate-400">
                        {skill.years} {t.stack.experienceYears}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 tabular-nums">
                    {skill.level}%
                  </span>
                </div>

                {/* Highlight narrative */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {skill.highlight}
                </p>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Modal */}
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
            <div
              className="relative w-full max-w-md p-6 rounded-2xl glass-panel-elevated border border-white/10 shadow-2xl space-y-4"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-sans">{selectedSkill.name}</h3>
                    <div className="text-xs font-mono text-cyan-400">{selectedSkill.category}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">{t.stack.proficiency}:</span>
                  <span className="text-white font-bold">{selectedSkill.level}%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Production Experience:</span>
                  <span className="text-white font-bold">{selectedSkill.years} Years</span>
                </div>
                <div className="py-2 space-y-1">
                  <span className="text-slate-400">Architecture Specialty:</span>
                  <p className="text-slate-200 text-xs font-sans leading-relaxed">
                    {selectedSkill.highlight}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSkill(null)}
                className="w-full py-2 text-xs font-mono rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
