import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const { accent, cursorGlow } = useTheme();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  // Smooth lerp for trailing ring
  useEffect(() => {
    if (isTouch || !cursorGlow) return;

    let animId: number;
    const updateTrail = () => {
      setTrail(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18
      }));
      animId = requestAnimationFrame(updateTrail);
    };

    animId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animId);
  }, [pos, isTouch, cursorGlow]);

  if (isTouch || !cursorGlow || !isVisible) return null;

  const accentColor =
    accent === 'purple'
      ? '#8B5CF6'
      : accent === 'emerald'
      ? '#10B981'
      : accent === 'amber'
      ? '#F59E0B'
      : '#00F5FF';

  return (
    <>
      {/* Precision core dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-transform duration-75"
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: accentColor,
          transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0) scale(${isHovering ? 0 : 1})`,
          boxShadow: `0 0 10px ${accentColor}`
        }}
      />
      {/* Smooth outer tracking ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border transition-all duration-150"
        style={{
          width: isHovering ? '48px' : '28px',
          height: isHovering ? '48px' : '28px',
          borderColor: isHovering ? accentColor : `rgba(255, 255, 255, 0.25)`,
          backgroundColor: isHovering ? `${accentColor}18` : 'transparent',
          transform: `translate3d(${trail.x - (isHovering ? 24 : 14)}px, ${trail.y - (isHovering ? 24 : 14)}px, 0)`,
          boxShadow: isHovering ? `0 0 20px ${accentColor}40` : 'none'
        }}
      />
    </>
  );
};
