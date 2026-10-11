import React from 'react';
import { Volume2, VolumeX, Command, FileText, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { AccentTheme } from '../../types/portfolio';

interface QuickControlsProps {
  onOpenCmdPalette: () => void;
  onOpenResume: () => void;
  onShowToast: (msg: string) => void;
}

export const QuickControls: React.FC<QuickControlsProps> = ({
  onOpenCmdPalette,
  onOpenResume,
  onShowToast
}) => {
  const { accent, setAccent, soundEnabled, toggleSound, playSound, theme, toggleTheme } = useTheme();

  const accents: { name: AccentTheme; color: string; label: string }[] = [
    { name: 'cyan', color: '#00F5FF', label: 'Neon Cyan' },
    { name: 'purple', color: '#8B5CF6', label: 'Electric Purple' },
    { name: 'emerald', color: '#10B981', label: 'Matrix Emerald' },
    { name: 'amber', color: '#F59E0B', label: 'Solar Amber' }
  ];

  return (
    <aside aria-label="Theme & Controls Dock" className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 p-1.5 rounded-full glass-panel border border-white/10 shadow-xl backdrop-blur-xl">
      {/* Accent color selectors */}
      <div className="flex items-center gap-1 px-2 border-r border-white/10">
        {accents.map(acc => {
          const isActive = accent === acc.name;
          return (
            <button
              key={acc.name}
              onClick={() => {
                setAccent(acc.name);
                onShowToast(`Theme accent: ${acc.label}`);
              }}
              title={acc.label}
              className={`w-4 h-4 rounded-full transition-transform ${
                isActive ? 'scale-125 ring-2 ring-white/50' : 'hover:scale-110 opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: acc.color }}
              aria-label={`Select ${acc.label}`}
            />
          );
        })}
      </div>

      {/* Audio Sound FX Toggle */}
      <button
        onClick={() => { toggleTheme(); playSound('click'); onShowToast(theme === 'dark' ? 'Light mode enabled' : 'Dark mode enabled'); }}
        title="Toggle light and dark mode"
        className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Toggle light and dark mode"
      >
        {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      </button>

      <button
        onClick={() => {
          toggleSound();
          onShowToast(soundEnabled ? 'Audio FX muted' : 'Audio FX enabled');
        }}
        title={soundEnabled ? 'Mute audio FX' : 'Enable cyber audio FX'}
        className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Toggle sound effects"
      >
        {soundEnabled ? (
          <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
        ) : (
          <VolumeX className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Resume Quick Trigger */}
      <button
        onClick={() => {
          playSound('click');
          onOpenResume();
        }}
        title="View Resume"
        className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="View Resume"
      >
        <FileText className="w-3.5 h-3.5" />
      </button>

      {/* Cmd+K Quick Trigger */}
      <button
        onClick={() => {
          playSound('click');
          onOpenCmdPalette();
        }}
        title="Command Palette (Cmd+K)"
        className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Command Palette"
      >
        <Command className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
