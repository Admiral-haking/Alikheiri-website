import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ProjectVisualProps {
  type: 'neural' | 'telemetry' | 'quantum' | 'trading' | 'stream';
  className?: string;
  isInteractive?: boolean;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  type,
  className = '',
  isInteractive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { accent } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 480);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const getPrimaryColor = () => {
      switch (accent) {
        case 'purple':
          return '#8B5CF6';
        case 'emerald':
          return '#10B981';
        case 'amber':
          return '#F59E0B';
        case 'cyan':
        default:
          return '#00F5FF';
      }
    };

    const getSecondaryColor = () => {
      switch (accent) {
        case 'purple':
          return '#3B82F6';
        case 'emerald':
          return '#00F5FF';
        case 'amber':
          return '#EC4899';
        case 'cyan':
        default:
          return '#8B5CF6';
      }
    };

    let tick = 0;

    // Simulation variables based on type
    const neuralNodes = Array.from({ length: 18 }, (_, i) => ({
      x: (width * (0.15 + (i % 5) * 0.18)) + (Math.random() - 0.5) * 20,
      y: (height * (0.2 + Math.floor(i / 5) * 0.22)) + (Math.random() - 0.5) * 20,
      r: Math.random() * 3 + 3,
      layer: i % 5,
      pulse: Math.random() * Math.PI * 2
    }));

    const telemetryBars = Array.from({ length: 36 }, () => Math.random() * 0.7 + 0.2);

    const render = () => {
      tick += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Dark background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#090a12');
      bgGrad.addColorStop(1, '#050508');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle cyber grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 24;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const primary = getPrimaryColor();
      const secondary = getSecondaryColor();

      if (type === 'neural') {
        // Draw Neural Graph
        ctx.lineWidth = 1;
        for (let i = 0; i < neuralNodes.length; i++) {
          for (let j = i + 1; j < neuralNodes.length; j++) {
            const n1 = neuralNodes[i];
            const n2 = neuralNodes[j];
            if (Math.abs(n1.layer - n2.layer) === 1) {
              const pulseEffect = (Math.sin(tick * 3 + i) + 1) / 2;
              ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 + pulseEffect * 0.25})`;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();

              // Moving synapse packet
              const tPacket = (tick * 0.8 + i * 0.4) % 1;
              const px = n1.x + (n2.x - n1.x) * tPacket;
              const py = n1.y + (n2.y - n1.y) * tPacket;
              ctx.fillStyle = primary;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Draw nodes
        neuralNodes.forEach(n => {
          ctx.fillStyle = '#0f172a';
          ctx.strokeStyle = primary;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + Math.sin(tick * 2 + n.pulse) * 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = primary;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (type === 'telemetry') {
        // Draw eBPF Telemetry Waterfall & Waves
        const barW = (width - 40) / telemetryBars.length;
        telemetryBars.forEach((b, i) => {
          const dynamicHeight = (Math.sin(tick * 2 + i * 0.3) * 0.3 + b) * (height * 0.45);
          const x = 20 + i * barW;
          const y = height - 30 - dynamicHeight;

          const barGrad = ctx.createLinearGradient(x, y, x, height - 30);
          barGrad.addColorStop(0, primary);
          barGrad.addColorStop(1, 'rgba(139, 92, 246, 0.1)');
          ctx.fillStyle = barGrad;
          ctx.fillRect(x, y, barW - 3, dynamicHeight);
        });

        // Overlay latency curve
        ctx.strokeStyle = secondary;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < telemetryBars.length; i++) {
          const x = 20 + i * barW + barW / 2;
          const y = height * 0.45 + Math.sin(tick * 2.5 + i * 0.4) * 25;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (type === 'quantum') {
        // Draw Quantum Bloch Sphere simulation
        const cx = width / 2;
        const cy = height / 2;
        const radius = Math.min(width, height) * 0.34;

        // Equator and Meridian rings
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius, radius * 0.38, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * 0.38, radius, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Qubit vector rotating
        const theta = tick;
        const phi = tick * 0.7;
        const vx = cx + Math.sin(theta) * Math.cos(phi) * radius;
        const vy = cy + Math.sin(phi) * radius * 0.5 - Math.cos(theta) * radius * 0.4;

        ctx.strokeStyle = primary;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(vx, vy);
        ctx.stroke();

        ctx.fillStyle = primary;
        ctx.beginPath();
        ctx.arc(vx, vy, 5, 0, Math.PI * 2);
        ctx.fill();

        // Wave rings
        const ripple = (tick * 25) % radius;
        ctx.strokeStyle = `rgba(0, 245, 255, ${Math.max(0, 1 - ripple / radius) * 0.3})`;
        ctx.beginPath();
        ctx.arc(cx, cy, ripple, 0, Math.PI * 2);
        ctx.stroke();
      } else if (type === 'trading') {
        // Draw Order Book Depth Chart
        const midX = width / 2;
        ctx.beginPath();
        ctx.moveTo(0, height - 20);

        // Bids (Green / Accent)
        for (let x = 0; x <= midX; x += 10) {
          const ratio = x / midX;
          const y = height - 20 - Math.pow(ratio, 2.5) * (height * 0.65);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(midX, height - 20);
        const bidGrad = ctx.createLinearGradient(0, height * 0.4, midX, height);
        bidGrad.addColorStop(0, `${primary}40`);
        bidGrad.addColorStop(1, `${primary}05`);
        ctx.fillStyle = bidGrad;
        ctx.fill();
        ctx.strokeStyle = primary;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Asks (Red/Rose / Secondary)
        ctx.beginPath();
        ctx.moveTo(midX, height - 20);
        for (let x = midX; x <= width; x += 10) {
          const ratio = (width - x) / midX;
          const y = height - 20 - Math.pow(ratio, 2.5) * (height * 0.65);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height - 20);
        const askGrad = ctx.createLinearGradient(midX, height * 0.4, width, height);
        askGrad.addColorStop(0, 'rgba(239, 68, 68, 0.35)');
        askGrad.addColorStop(1, 'rgba(239, 68, 68, 0.05)');
        ctx.fillStyle = askGrad;
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Mid-market price indicator
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(midX, 20);
        ctx.lineTo(midX, height - 20);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (type === 'stream') {
        // Draw Append-Only Blockchain / Merkle Blocks
        const blockW = 70;
        const blockH = 44;
        const count = 5;
        const startX = (width - (count * (blockW + 24) - 24)) / 2;
        const y = (height - blockH) / 2;

        for (let i = 0; i < count; i++) {
          const bx = startX + i * (blockW + 24);
          const isLatest = i === count - 1;

          ctx.fillStyle = isLatest ? 'rgba(0, 245, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)';
          ctx.strokeStyle = isLatest ? primary : 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = isLatest ? 1.5 : 1;
          ctx.fillRect(bx, y, blockW, blockH);
          ctx.strokeRect(bx, y, blockW, blockH);

          // Connector arrow
          if (i < count - 1) {
            ctx.strokeStyle = secondary;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(bx + blockW, y + blockH / 2);
            ctx.lineTo(bx + blockW + 24, y + blockH / 2);
            ctx.stroke();
          }

          // Small hash dots inside
          ctx.fillStyle = isLatest ? primary : 'rgba(255, 255, 255, 0.4)';
          ctx.fillRect(bx + 10, y + 12, 28, 4);
          ctx.fillRect(bx + 10, y + 22, 42, 4);
        }
      }

      // Border glow
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [type, accent, isInteractive]);

  return (
    <div className={`relative overflow-hidden rounded-xl border border-white/10 ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none scanline opacity-30" />
    </div>
  );
};
