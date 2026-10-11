import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Clock, MapPin, CheckCircle2, Shield, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface ContactSectionProps {
  initialServiceSelection?: string[];
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialServiceSelection = [],
  onShowToast
}) => {
  const { t, isRtl } = useLanguage();
  const { playSound } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(
    initialServiceSelection.length > 0 ? initialServiceSelection.join(', ') : t.contact.projectTypeOptions[0]
  );
  const [message, setMessage] = useState(
    initialServiceSelection.length > 0
      ? `Hi Ali, I'd like to discuss the following project: ${initialServiceSelection.join(', ')}.`
      : ''
  );

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('alikheiri10313@gmail.com');
    setCopiedEmail(true);
    playSound('click');
    onShowToast(t.contact.emailCopied);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) errs.name = 'Please provide your name';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Please provide a valid email address';
    if (!message.trim() || message.trim().length < 8) errs.message = 'Please provide a brief message (min 8 chars)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      playSound('warp');
      return;
    }

    setIsSubmitting(true);
    playSound('click');
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\n${message}`);
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;
    if (endpoint) {
      try {
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name, email, projectType, message }) });
        if (!response.ok) throw new Error('Contact endpoint failed');
        setIsSubmitting(false); setSubmitted(true); playSound('success'); onShowToast(t.contact.successTitle);
        setName(''); setEmail(''); setMessage('');
        return;
      } catch {
        onShowToast('Online form unavailable; opening your email client.');
      }
    }
    window.location.href = `mailto:alikheiri10313@gmail.com?subject=${subject}&body=${body}`;
    setIsSubmitting(false); setSubmitted(true); playSound('success'); onShowToast(t.contact.successTitle);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
            {t.contact.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight text-balance">
            {t.contact.title}
          </h2>
          <p className="text-sm text-slate-400 font-sans">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Content Layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Left: Contact Info & Quick Transmit Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08] space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  Direct Inbound
                </span>
                <h3 className="text-xl font-bold text-white font-sans">
                  alikheiri10313@gmail.com
                </h3>
              </div>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-colors border border-white/10"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{t.contact.emailCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-cyan-400" />
                    <span>{t.contact.copyEmail}</span>
                  </>
                )}
              </button>

              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <a href="https://www.linkedin.com/in/ali-khairi-6016b1336/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors">LinkedIn</a>
                <a href="https://t.me/REYZERZZ" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors">Telegram</a>
                <a href="https://teamcore.ir" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors">teamcore.ir</a>
                <a href="https://ghlbedovom.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors">ghlbedovom.com</a>
              </div>

              {/* Status details */}
              <div className="pt-4 border-t border-white/5 space-y-3 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{t.contact.timezone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>End-to-end encrypted dispatch</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Average response time: &lt;24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Validated Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-white/[0.08]">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-14 h-14 mx-auto rounded-full bg-cyan-950/60 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,245,255,0.4)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-sans">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-md mx-auto leading-relaxed">
                    {t.contact.successMessage}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 text-xs font-mono rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors border border-white/10"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-medium">
                        {t.contact.nameLabel} *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={t.contact.namePlaceholder}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 ${
                          errors.name ? 'border-rose-500' : 'border-white/10'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] font-mono text-rose-400">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-medium">
                        {t.contact.emailLabel} *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={t.contact.emailPlaceholder}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 ${
                          errors.email ? 'border-rose-500' : 'border-white/10'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] font-mono text-rose-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="project-type" className="text-xs font-mono text-slate-300 font-medium">
                      {t.contact.projectTypeLabel}
                    </label>
                    <select
                      id="project-type"
                      value={projectType}
                      onChange={e => setProjectType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#090b14] border border-white/10 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                    >
                      {t.contact.projectTypeOptions.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-medium">
                      {t.contact.messageLabel} *
                    </label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder={t.contact.messagePlaceholder}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border text-xs font-sans text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 resize-none ${
                        errors.message ? 'border-rose-500' : 'border-white/10'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] font-mono text-rose-400">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs tracking-wide transition-all shadow-[0_0_20px_-3px_rgba(0,245,255,0.6)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{t.contact.submitting}</span>
                    ) : (
                      <>
                        <span>{t.contact.submitBtn}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
