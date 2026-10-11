import React from 'react';
import { GitBranch, Layers3, ShieldCheck, Workflow } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { useLanguage } from '../../context/LanguageContext';

interface ArchitectureDiagramProps { project: Project }

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ project }) => {
  const { language, isRtl } = useLanguage();
  const text = language === 'fa' ? project.architectureFa : project.architecture;
  const nodes = text.split(/\s*(?:→|←)\s*/).filter(Boolean);
  const Icon = project.category === 'systems' ? ShieldCheck : project.category === 'ai' ? Workflow : project.category === 'fullstack' ? Layers3 : GitBranch;

  return (
    <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-4" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
        <Icon className="w-4 h-4" />
        <span>{language === 'fa' ? 'جریان معماری' : 'Architecture flow'}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {nodes.map((node, index) => (
          <React.Fragment key={`${node}-${index}`}>
            <span className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/10 text-[11px] text-slate-200 font-mono leading-relaxed">
              {node}
            </span>
            {index < nodes.length - 1 && <span className="text-cyan-400 font-mono" aria-hidden="true">{isRtl ? '←' : '→'}</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
