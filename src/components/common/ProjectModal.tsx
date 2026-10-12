import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Zap } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { ProjectVisual } from './ProjectVisual';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { language, t, isRtl } = useLanguage();
  const { playSound } = useTheme();

  useEffect(() => {
    if (project) {
      playSound('modal');
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [project]);

  if (!project) return null;

  const title = language === 'fa' ? project.titleFa : project.title;
  const subtitle = language === 'fa' ? project.subtitleFa : project.subtitle;
  const description = language === 'fa' ? project.descriptionFa : project.description;
  const challenge = language === 'fa' ? project.challengeFa : project.challenge;
  const solution = language === 'fa' ? project.solutionFa : project.solution;
  const impact = language === 'fa' ? project.impactFa : project.impact;
  const role = language === 'fa' ? project.roleFa : project.role;
  const status = language === 'fa' ? project.statusFa : project.status;
  const highlights = language === 'fa' ? project.highlightsFa : project.highlights;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <div
        className="relative w-full max-w-4xl my-auto glass-panel-elevated rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div>
            <h3 id="project-modal-title" className="text-xl font-bold tracking-tight text-white font-sans">{title}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{subtitle}</p>
          </div>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={t.projects.closeModal}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 project-modal-content">
          {/* Interactive Visual Canvas Container */}
          <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-white/10 bg-[#090a12]">
            <ProjectVisual type={project.visualType} className="h-full w-full" isInteractive={true} />
            {project.imageUrl && <img src={project.imageUrl} alt={`${title} GitHub preview`} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen pointer-events-none" />}
          </div>

          {/* Clean Unboxed Tags with Typographic Separator */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
            {project.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span>{tag}</span>
                {idx < project.tags.length - 1 && <span className="text-slate-600">·</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Overview text */}
          <p className="readable-copy rtl-safe text-sm text-slate-300 leading-relaxed font-sans">{description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 project-detail-card">
              <div className="text-[10px] uppercase tracking-widest text-cyan-400 font-mono mb-2">{t.projects.roleLabel}</div>
              <p className="readable-copy rtl-safe text-xs text-slate-200 leading-relaxed">{role}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 project-detail-card">
              <div className="text-[10px] uppercase tracking-widest text-cyan-400 font-mono mb-2">{t.projects.statusLabel}</div>
              <p className="readable-copy rtl-safe text-xs text-slate-200 leading-relaxed">{status}</p>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-5 rounded-xl bg-white/[0.02] border border-white/5">
            {project.metrics.map(m => (
              <div key={m.label} className="text-center">
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 tabular-nums">
                  {m.value}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Deep Architectural Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold tracking-wider uppercase">
                <Zap className="w-3.5 h-3.5" />
                <span>{t.projects.challengeTitle}</span>
              </div>
              <p className="readable-copy rtl-safe text-xs text-slate-300 leading-relaxed">{challenge}</p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase">
                <Zap className="w-3.5 h-3.5" />
                <span>{t.projects.solutionTitle}</span>
              </div>
              <p className="readable-copy rtl-safe text-xs text-slate-300 leading-relaxed">{solution}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase">
              {t.projects.architectureTitle}
            </div>
            <ArchitectureDiagram project={project} />
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase">
              {language === 'fa' ? 'نکات قابل بررسی در سورس' : 'What to inspect in the source'}
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {highlights.map(item => (
                <li key={item} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact Statement */}
          <div className="p-5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
            <div className="text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase">
              {t.projects.impactTitle}
            </div>
            <p className="readable-copy rtl-safe text-xs text-slate-200 leading-relaxed">{impact}</p>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            {project.githubUrl && <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 transition-colors border border-white/10"
            >
              <Github className="w-3.5 h-3.5" />
              <span>{t.projects.sourceCode}</span>
            </a>}
            {project.demoUrl && project.demoUrl !== project.githubUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.projects.liveDemo}</span>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            {t.projects.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
};
