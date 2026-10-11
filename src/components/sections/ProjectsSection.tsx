import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { portfolioProjects } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';
import { ProjectVisual } from '../common/ProjectVisual';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const { t, isRtl, language } = useLanguage();
  const { playSound } = useTheme();

  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: t.projects.categories.all },
    { id: 'fullstack', label: t.projects.categories.fullstack },
    { id: 'ai', label: t.projects.categories.ai },
    { id: 'systems', label: t.projects.categories.systems }
  ];

  const filteredProjects = portfolioProjects.filter(p => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="work" className="py-24 relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
              {t.projects.kicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight text-balance">
              {t.projects.title}
            </h2>
            <p className="text-sm text-slate-400 font-sans">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Functional Button Tabs for Category Filtering (Allowed per Section 1.A) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {filters.map(filter => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => {
                    playSound('click');
                    setActiveFilter(filter.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,245,255,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Showcase Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {filteredProjects.map((project, idx) => {
            const title = language === 'fa' ? project.titleFa : project.title;
            const subtitle = language === 'fa' ? project.subtitleFa : project.subtitle;
            const description = language === 'fa' ? project.descriptionFa : project.description;

            return (
              <div
                key={project.id}
                className="group rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Preview Header */}
                <div
                  className="relative h-60 sm:h-72 w-full bg-[#080912] cursor-pointer overflow-hidden border-b border-white/[0.06]"
                  onClick={() => {
                    playSound('modal');
                    onSelectProject(project);
                  }}
                >
                  <ProjectVisual
                    type={project.visualType}
                    className="h-full w-full rounded-none border-none group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  {/* Subtle hover prompt */}
                  <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md bg-black/60 border border-white/10 text-[11px] font-mono text-cyan-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span>{t.projects.viewDetails}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Clean Unboxed Tags with Typographic Separators (No Pills, per Section 1.A) */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
                      {project.tags.map((tag, tagIdx) => (
                        <React.Fragment key={tag}>
                          <span>{tag}</span>
                          {tagIdx < project.tags.length - 1 && (
                            <span className="text-slate-600">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white font-sans group-hover:text-cyan-300 transition-colors">
                        {title}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{subtitle}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed line-clamp-3">
                      {description}
                    </p>
                  </div>

                  {/* Metrics preview row */}
                  <div className="pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {project.metrics.map(m => (
                      <div key={m.label} className="text-center p-2 rounded-lg bg-white/[0.02]">
                        <div className="text-sm font-bold font-mono text-cyan-300 tabular-nums">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono truncate">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        playSound('click');
                        onSelectProject(project);
                      }}
                      className="px-4 py-2 text-xs font-mono font-medium rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors flex items-center gap-1.5"
                    >
                      <span>{t.projects.viewDetails}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title={t.projects.sourceCode}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors"
                        title={t.projects.liveDemo}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
