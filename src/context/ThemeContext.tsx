import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccentTheme } from '../types/portfolio';
import { playCyberSound } from '../utils/audio';

interface ThemeContextType {
  accent: AccentTheme;
  setAccent: (accent: AccentTheme) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playSound: (type: 'click' | 'hover' | 'modal' | 'success' | 'warp') => void;
  cursorGlow: boolean;
  toggleCursorGlow: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accent, setAccentState] = useState<AccentTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('alikheiri_portfolio_accent') as AccentTheme;
      if (['cyan', 'purple', 'emerald', 'amber'].includes(saved)) {
        return saved;
      }
    }
    return 'cyan';
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('alikheiri_portfolio_sound');
      return saved === 'true'; // Default muted for friendly UX, toggleable anytime
    }
    return false;
  });

  const [cursorGlow, setCursorGlow] = useState<boolean>(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    localStorage.setItem('alikheiri_portfolio_accent', accent);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem('alikheiri_portfolio_sound', String(soundEnabled));
  }, [soundEnabled]);

  const setAccent = (newAccent: AccentTheme) => {
    setAccentState(newAccent);
    if (soundEnabled) playCyberSound('warp');
  };

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      if (next) playCyberSound('success');
      return next;
    });
  };

  const playSound = (type: 'click' | 'hover' | 'modal' | 'success' | 'warp') => {
    if (soundEnabled) {
      playCyberSound(type);
    }
  };

  const toggleCursorGlow = () => {
    setCursorGlow(prev => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        accent,
        setAccent,
        soundEnabled,
        toggleSound,
        playSound,
        cursorGlow,
        toggleCursorGlow
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
