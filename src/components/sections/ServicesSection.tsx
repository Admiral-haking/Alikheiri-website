import React, { useState } from 'react';
import {
  Layout,
  Brain,
  Server,
  Cloud,
  Sparkles,
  Zap,
  Check,
  ArrowRight,
  Calculator,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { servicesData } from '../../data/portfolioData';

const serviceIcons: Record<string, React.ElementType> = {
  Layout,
  Brain,
  Server,
  Cloud,
  Sparkles,
  Zap
};

interface ServicesSectionProps {
  onSelectServicesForContact: (serviceTitles: string[]) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServicesForContact
}) => {
  const { t, isRtl, language } = useLanguage();
  const { playSound } = useTheme();

  // Selected services in calculator
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (id: string) => {
    playSound('click');
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleBookConsultation = () => {
    playSound('click');
    const selectedTitles = servicesData
      .filter(s => selectedServices.includes(s.id))
      .map(s => (language === 'fa' ? s.titleFa : s.title));
    onSelectServicesForContact(selectedTitles);
    const contactEl = document.querySelector('#contact');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
            {t.services.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight text-balance">
            {t.services.title}
          </h2>
        </div>

        {/* Services Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {servicesData.map(service => {
            const IconComponent = serviceIcons[service.iconName] || Layout;
            const isSelected = selectedServices.includes(service.id);
            const title = language === 'fa' ? service.titleFa : service.title;
            const description = language === 'fa' ? service.descriptionFa : service.description;
            const deliverables = language === 'fa' ? service.deliverablesFa : service.deliverables;

            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`p-6 rounded-2xl glass-panel border transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_20px_rgba(0,245,255,0.15)]'
                    : 'border-white/[0.08] hover:border-cyan-500/30'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-cyan-400 border-cyan-400 text-black'
                          : 'border-white/20 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-sans">{title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans mt-2">
                      {description}
                    </p>
                  </div>

                  {/* Core Deliverables */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      {t.services.deliverables}
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {deliverables.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer: Timeline & Tech */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {service.estTimeline}
                  </span>
                  <span className="text-cyan-400 font-semibold">
                    {isSelected ? 'Selected' : '+ Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Scope & Estimation Banner */}
        <div
          className="p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="space-y-2 text-center sm:text-start">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>{t.services.calculatorTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl">
              {selectedServices.length === 0
                ? t.services.calculatorDesc
                : `${selectedServices.length} services selected. Click to pre-fill your architecture inquiry.`}
            </p>
          </div>

          <button
            onClick={handleBookConsultation}
            className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-semibold text-xs tracking-wide transition-colors whitespace-nowrap shadow-[0_0_20px_-3px_rgba(0,245,255,0.6)] flex items-center gap-2"
          >
            <span>{t.services.sendInquiry}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
