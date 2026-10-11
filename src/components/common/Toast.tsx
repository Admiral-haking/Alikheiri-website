import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0e101b] border border-cyan-500/40 text-cyan-200 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-cyan-400 shrink-0" />
      )}
      <span className="text-xs font-mono font-medium tracking-wide">{message}</span>
    </div>
  );
};
