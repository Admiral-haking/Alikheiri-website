import React, { useEffect } from 'react';
import { X, Printer, Download, MapPin, Mail, Globe, Award, GraduationCap, Briefcase } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { experiences, techSkills } from '../../data/realProfileData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const { t, isRtl, language } = useLanguage();
  const { playSound } = useTheme();

  useEffect(() => {
    if (isOpen) {
      playSound('modal');
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    playSound('click');
    window.print();
  };

  const handleExportJson = () => {
    playSound('click');
    const resumeData = {
      name: 'AliKheiri',
      role: 'Backend Engineer in Progress & Computer Science Student',
      contact: {
        email: 'alikheiri10313@gmail.com',
        location: 'Iran / Remote',
        website: 'https://github.com/Admiral-haking'
      },
      skills: techSkills.map(s => ({ name: s.name, category: s.category, level: s.level })),
      experience: experiences
    };
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AliKheiri_Resume_Data.json';
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Resume JSON export downloaded');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="relative w-full max-w-4xl my-auto glass-panel-elevated rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div>
            <h2 className="text-lg font-bold text-white font-sans">{t.resume.title}</h2>
            <p className="text-xs text-slate-400 font-mono">{t.resume.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download="AliKheiri-Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF</span>
            </a>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.resume.printBtn}</span>
            </button>
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.resume.downloadJson}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Container */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[#080910] text-slate-200 font-sans print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-white/10 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                AliKheiri
              </h1>
              <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wide">
                Backend Engineer in Progress · CS Student
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Iran · Remote
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                alikheiri10313@gmail.com
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                https://github.com/Admiral-haking
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Executive Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Computer engineering student and full-stack developer based in Mashhad, Iran. I build Node.js and Next.js applications, REST APIs, backend services, and practical AI security systems with a focus on clean architecture and safe data handling.
            </p>
          </div>

          {/* Core Technical Arsenal */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Core Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-slate-200 font-semibold">Languages & Core:</span>
                <p className="text-slate-400">TypeScript, Rust, Python, Go, Modern C++, SQL, WebAssembly</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-slate-200 font-semibold">Frontend & Motion:</span>
                <p className="text-slate-400">React 19, Next.js, Tailwind CSS v4, WebGL, Three.js, Motion</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-slate-200 font-semibold">AI & Systems:</span>
                <p className="text-slate-400">LangGraph, FastAPI, PyTorch, Vector DBs (Qdrant), Gemini SDK</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-slate-200 font-semibold">Cloud & Reliability:</span>
                <p className="text-slate-400">Kubernetes, Docker, Kafka, PostgreSQL, ClickHouse, Redis, eBPF</p>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" />
              Professional Track Record
            </h3>

            <div className="space-y-6">
              {experiences.map(exp => (
                <div key={exp.id} className="space-y-2 border-l-2 border-cyan-500/30 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-sm font-bold text-white font-sans">
                      {language === 'fa' ? exp.roleFa : exp.role}
                    </span>
                    <span className="text-xs font-mono text-cyan-400">
                      {language === 'fa' ? exp.periodFa : exp.period}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {language === 'fa' ? exp.companyFa : exp.company} · {exp.location}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'fa' ? exp.descriptionFa : exp.description}
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pt-1">
                    {(language === 'fa' ? exp.achievementsFa : exp.achievements).map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" />
              Education
            </h3>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white font-bold">Computer Science student</span>
                <span className="text-cyan-400">In progress</span>
              </div>
              <p className="text-xs text-slate-400">Independent study focused on backend engineering, distributed systems, and AI infrastructure.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
