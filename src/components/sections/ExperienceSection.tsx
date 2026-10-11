import React from 'react';
import { Briefcase, Calendar, MapPin, Download, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { experiences } from '../../data/realProfileData';

interface ExperienceSectionProps {
  onOpenResume: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenResume }) => {
  const { t, isRtl, language } = useLanguage();
  const { playSound } = useTheme();

  return (
    <section id="experience" className="py-24 relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
              {t.experience.kicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight text-balance">
              {t.experience.title}
            </h2>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onOpenResume();
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-colors self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.experience.downloadResume}</span>
          </button>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Luminous vertical beam line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-400 via-indigo-500 to-transparent opacity-30 pointer-events-none" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const role = language === 'fa' ? exp.roleFa : exp.role;
              const company = language === 'fa' ? exp.companyFa : exp.company;
              const period = language === 'fa' ? exp.periodFa : exp.period;
              const description = language === 'fa' ? exp.descriptionFa : exp.description;
              const achievements = language === 'fa' ? exp.achievementsFa : exp.achievements;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node marker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050508] border-2 border-cyan-400 flex items-center justify-center z-10 shadow-[0_0_12px_rgba(0,245,255,0.4)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  </div>

                  {/* Spacer for 2-column timeline layout on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Timeline Card */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-all space-y-4">
                      {/* Period & Location */}
                      <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                        <span className="font-semibold">{period}</span>
                        <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <div>
                        <h3 className="text-lg font-bold text-white font-sans">{role}</h3>
                        <p className="text-xs text-slate-300 font-mono mt-0.5">{company}</p>
                      </div>

                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-1.5 pt-2 border-t border-white/5">
                        <div className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                          {t.experience.keyAchievements}
                        </div>
                        {achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack tags */}
                      <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
                        {exp.skills.map((sk, sIdx) => (
                          <React.Fragment key={sk}>
                            <span>{sk}</span>
                            {sIdx < exp.skills.length - 1 && (
                              <span className="text-slate-600">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
