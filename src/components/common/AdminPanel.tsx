import React, { useRef, useState } from 'react';
import { Download, Save, Upload, X } from 'lucide-react';
import { Project } from '../../types/portfolio';

interface AdminPanelProps {
  projects: Project[];
  onSave: (projects: Project[]) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ projects, onSave, onClose }) => {
  const [draft, setDraft] = useState(projects);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const update = (id: string, field: keyof Project, value: string) => {
    setDraft(items => items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'alikheiri-projects.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const value = JSON.parse(String(reader.result));
        if (Array.isArray(value) && value.every(item => item.id && item.title)) setDraft(value);
      } catch { /* keep the current draft */ }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-xl p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto glass-panel-elevated rounded-2xl border border-white/10 overflow-hidden" dir="ltr">
        <div className="flex items-center justify-between gap-4 p-5 border-b border-white/10">
          <div><h2 className="text-lg font-bold text-white">Portfolio Content Manager</h2><p className="text-xs text-slate-400 mt-1">Local editor · changes are saved in this browser</p></div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10" aria-label="Close content manager"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-5">
          {draft.map(project => (
            <div key={project.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center justify-between"><h3 className="text-sm font-bold text-cyan-300">{project.id}</h3><span className="text-[11px] text-slate-500">{project.githubUrl}</span></div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input value={project.title} onChange={e => update(project.id, 'title', e.target.value)} aria-label={`${project.id} English title`} className="px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-xs text-white" placeholder="English title" />
                <input value={project.titleFa} onChange={e => update(project.id, 'titleFa', e.target.value)} aria-label={`${project.id} Persian title`} className="px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-xs text-white" placeholder="عنوان فارسی" dir="rtl" />
                <textarea value={project.description} onChange={e => update(project.id, 'description', e.target.value)} aria-label={`${project.id} English description`} className="min-h-20 px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-xs text-white" placeholder="English description" />
                <textarea value={project.descriptionFa} onChange={e => update(project.id, 'descriptionFa', e.target.value)} aria-label={`${project.id} Persian description`} className="min-h-20 px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-xs text-white" placeholder="توضیح فارسی" dir="rtl" />
                <input value={project.status || ''} onChange={e => update(project.id, 'status', e.target.value)} aria-label={`${project.id} status`} className="px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-xs text-white" placeholder="Status" />
                <input value={project.role || ''} onChange={e => update(project.id, 'role', e.target.value)} aria-label={`${project.id} role`} className="px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-xs text-white" placeholder="Your role" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 p-5 border-t border-white/10">
          <button onClick={() => onSave(draft)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400 text-black text-xs font-semibold"><Save className="w-4 h-4" />Save locally</button>
          <button onClick={exportJson} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-xs"><Download className="w-4 h-4" />Export JSON</button>
          <button onClick={() => fileInput.current?.click()} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-xs"><Upload className="w-4 h-4" />Import JSON</button>
          <input ref={fileInput} type="file" accept="application/json" onChange={importJson} className="hidden" />
        </div>
      </div>
    </div>
  );
};
