import React from 'react';
import { ArrowLeft, AlertTriangle, RefreshCw, Terminal } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface NotFoundViewProps {
  onReturnHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onReturnHome }) => {
  const { t, isRtl } = useLanguage();
  const { playSound } = useTheme();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-[#050508] text-slate-100 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background glitch effect grid */}
      <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />

      <div className="relative max-w-lg w-full p-8 rounded-2xl glass-panel-elevated border border-cyan-500/30 text-center space-y-6 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-mono">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>PORTAL DISCONNECTED // 404</span>
        </div>

        <div className="space-y-2">
          <div className="text-7xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400">
            404
          </div>
          <h2 className="text-xl font-bold font-sans text-white">
            Coordinates Not Found in Quantum Memory
          </h2>
          <p className="text-xs font-sans text-slate-400 leading-relaxed">
            The target node or resource you requested has been moved, deallocated, or exists in an alternate dimensional partition.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] text-slate-400 text-start space-y-1">
          <div>&gt; STATUS: ERR_COORDINATES_VOID</div>
          <div>&gt; PROTOCOL: HTTP/3.0 QUIC</div>
          <div>&gt; FALLBACK: RE-ROUTING TO NEURAL HUB...</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              playSound('click');
              onReturnHome();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,245,255,0.4)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
