import React from 'react';
import { ShieldCheck, Cpu, Sparkles, Network, MapPin, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface AboutSectionProps {
  onOpenResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  const { t, isRtl } = useLanguage();
  const { playSound } = useTheme();

  return (
    <section id="about" className="py-24 relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
            {t.about.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight text-balance">
            {t.about.title}
          </h2>
        </div>

        {/* Content Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Left Column: Avatar & Quick Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="reveal-up relative rounded-2xl p-6 glass-panel border border-white/10 overflow-hidden group">
              {/* Profile Avatar Graphic */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-tr from-[#090b14] via-[#121626] to-[#0d1222] border border-cyan-500/20 flex items-center justify-center">
                {/* Procedural Cybernetic Silhouette Avatar */}
                <div className="relative flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="relative w-36 h-36 rounded-full bg-cyan-950/40 border-2 border-cyan-400/60 p-2 shadow-[0_0_25px_rgba(0,245,255,0.25)] flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#050508] border border-cyan-500/30 flex items-center justify-center overflow-hidden">
                      <Cpu className="w-16 h-16 text-cyan-400 animate-pulse" />
                    </div>
                    {/* Active presence marker */}
                    <span className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#050508] shadow-[0_0_8px_#10B981]" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-lg font-bold text-white font-sans">AliKheiri</div>
                    <div className="text-xs text-cyan-400 font-mono">AI Systems Builder</div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{t.about.location}</span>
                  </div>
                </div>
              </div>

              {/* Quick resume trigger */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Verified Credentials</span>
                <button
                  onClick={() => {
                    playSound('click');
                    onOpenResume();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Inspect Full CV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Principles */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
              <p>{t.about.bio1}</p>
              <p>{t.about.bio2}</p>
            </div>

            {/* Operating Principles */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                {t.about.principlesTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.about.principles.map((pr, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl glass-panel border border-white/5 space-y-2 hover:border-cyan-500/20 transition-colors"
                  >
                    <div className="text-xs font-bold font-sans text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{pr.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{pr.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
