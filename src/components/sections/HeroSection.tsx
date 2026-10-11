import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Twitter, Terminal, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const { t, isRtl, language } = useLanguage();
  const { playSound, accent } = useTheme();

  // Typewriter effect
  const roles = t.hero.roles;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  useEffect(() => {
    const fullRole = roles[currentRoleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText === fullRole) {
      // Pause at full word
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex(prev => (prev + 1) % roles.length);
      setTypingSpeed(80);
    } else {
      timeout = setTimeout(() => {
        const nextText = isDeleting
          ? fullRole.substring(0, currentText.length - 1)
          : fullRole.substring(0, currentText.length + 1);
        setCurrentText(nextText);
        setTypingSpeed(isDeleting ? 40 : 80);
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  // Interactive 3D wireframe canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 450);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // 3D Icosahedron vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const vertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    // Edges connecting vertices
    const edges: [number, number][] = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [1, 7], [1, 8], [1, 9],
      [2, 11], [2, 4], [2, 3], [2, 6], [2, 10],
      [3, 4], [3, 6], [3, 8], [3, 9],
      [4, 5], [4, 9], [4, 11],
      [5, 9], [5, 11],
      [6, 7], [6, 8], [6, 10],
      [7, 8], [7, 10],
      [8, 9], [10, 11]
    ];

    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 3.5;
      targetRotX = -ny * 3.5;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const getAccentColor = () => {
      switch (accent) {
        case 'purple': return '#8B5CF6';
        case 'emerald': return '#10B981';
        case 'amber': return '#F59E0B';
        case 'cyan':
        default: return '#00F5FF';
      }
    };

    const render = () => {
      rotX += (targetRotX - rotX) * 0.04 + 0.003;
      rotY += (targetRotY - rotY) * 0.04 + 0.005;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.32;
      const accentColor = getAccentColor();

      // Transform vertices
      const projected = vertices.map(v => {
        let x = v[0];
        let y = v[1];
        let z = v[2];

        // Rotate Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // Rotate X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const distance = 4.2;
        const fov = scale / (distance + z2);
        return {
          x: cx + x1 * fov,
          y: cy + y2 * fov,
          z: z2
        };
      });

      // Draw edges
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.12, Math.min(0.7, 0.45 - avgZ * 0.25));

        ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
        if (accent === 'purple') ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
        if (accent === 'emerald') ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
        if (accent === 'amber') ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;

        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw node spheres
      projected.forEach(p => {
        const radius = Math.max(2, 3.5 - p.z * 0.8);
        ctx.fillStyle = '#090a12';
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, [accent]);

  const scrollTo = (id: string) => {
    playSound('click');
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[95vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Background cinematic overlay with scanlines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] via-transparent to-[#050508]" />
        <div className="ambient-orb absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        {/* Split Screen Hero: Left Typography / Right Visual Object */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability status line */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00F5FF]" />
              <span>{t.hero.status}</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <p className="text-sm font-mono text-slate-400 tracking-wider">
                {t.hero.greeting}
              </p>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans text-balance">
                {t.hero.name}
              </h1>

              {/* Typewriter role */}
              <div className="h-10 sm:h-12 flex items-center gap-2">
                <span className="text-xl sm:text-3xl font-bold font-mono text-cyan-400 text-glow">
                  {currentText}
                </span>
                <span className="w-0.5 h-6 sm:h-8 bg-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Tagline narrative */}
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-2xl font-normal">
              {t.hero.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollTo('#work')}
                className="accent-button px-6 py-3 rounded-xl text-black font-mono font-semibold text-xs tracking-wide flex items-center gap-2 cursor-pointer"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('#contact')}
                className="px-6 py-3 rounded-xl glass-panel text-slate-200 hover:text-white hover:border-cyan-500/40 font-mono text-xs tracking-wide transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{t.hero.contactBtn}</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center gap-4 text-slate-400">
              <a
                href="https://github.com/Admiral-haking"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-cyan-400 hover:bg-white/[0.05] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/ali-khairi-6016b1336/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-cyan-400 hover:bg-white/[0.05] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/REYZERZZ"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-cyan-400 hover:bg-white/[0.05] transition-colors"
                aria-label="Telegram"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:alikheiri10313@gmail.com"
                className="p-2 rounded-lg hover:text-cyan-400 hover:bg-white/[0.05] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Holographic Geometry Sphere */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="soft-float relative w-72 h-72 sm:w-96 sm:h-96 rounded-2xl p-4 glass-panel border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full block" />
              <div className="absolute bottom-3 right-4 text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest pointer-events-none">
                Backend · AI · Security
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width KPI / Proof strip placed below the split in compliance with Section 2.B */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 z-10">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 px-6 rounded-2xl glass-panel border border-white/[0.08]"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              {t.hero.quickStats.experience}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {t.hero.quickStats.experienceLabel}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              {t.hero.quickStats.projects}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {t.hero.quickStats.projectsLabel}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400 tabular-nums">
              {t.hero.quickStats.uptime}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {t.hero.quickStats.uptimeLabel}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              {t.hero.quickStats.users}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {t.hero.quickStats.usersLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
