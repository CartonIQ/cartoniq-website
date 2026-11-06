import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Cpu, Play, Pause, RotateCcw, Zap, Sliders, ShieldAlert } from 'lucide-react';

interface Playground2DProps {
  reducedMotion: boolean;
}

type SimulationMode = 'synapse' | 'radar' | 'matrix';

export const Playground2D: React.FC<Playground2DProps> = ({ reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(!reducedMotion);
  const [mode, setMode] = useState<SimulationMode>('synapse');
  const [particleDensity, setParticleDensity] = useState<number>(45);
  const [isInView, setIsInView] = useState<boolean>(true);
  const [activeBlipsCount, setActiveBlipsCount] = useState<number>(0);

  // Mouse interaction coordinates
  const mouseRef = useRef<{ x: number; y: number; isDown: boolean }>({
    x: -9999,
    y: -9999,
    isDown: false
  });

  // Intersection observer to pause simulation when offscreen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setIsRunning(false);
    }
  }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = Math.min(480, Math.max(340, window.innerHeight * 0.45)));

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.min(480, Math.max(340, window.innerHeight * 0.45));
    };

    window.addEventListener('resize', handleResize);

    // Initialize 2D Nodes for Synapse mode
    interface Node2D {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    }

    const nodes: Node2D[] = Array.from({ length: particleDensity }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 2 + 1.5,
      color: Math.random() > 0.8 ? '#ff0033' : '#e4e4e7',
      pulse: Math.random() * Math.PI
    }));

    // Radar scan angle
    let radarAngle = 0;
    const radarBlips = Array.from({ length: 8 }, () => ({
      dist: Math.random() * (Math.min(width, height) * 0.42),
      angle: Math.random() * Math.PI * 2,
      life: 0
    }));

    // Matrix characters
    const hexChars = '0123456789ABCDEF<>[]#$*+-~=';
    const matrixColumns = Math.floor(width / 20);
    const matrixDrops: number[] = Array.from({ length: matrixColumns }, () => Math.floor(Math.random() * 20));

    // Render loop
    const render = () => {
      if (!isRunning || !isInView) return;

      // Dark fade trail
      ctx.fillStyle = mode === 'matrix' ? 'rgba(3, 3, 3, 0.2)' : 'rgba(3, 3, 3, 0.35)';
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;

      if (mode === 'synapse') {
        // Mode 1: 2D Interactive Synapse & Conduit Grid
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          n.pulse += 0.04;

          // Bounce off bounds
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          // Mouse influence
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const distMouse = Math.sqrt(dx * dx + dy * dy);
          if (distMouse < 140) {
            const force = (140 - distMouse) / 140;
            if (mouse.isDown) {
              // Attract
              n.x += (dx / distMouse) * force * 3;
              n.y += (dy / distMouse) * force * 3;
            } else {
              // Repel
              n.x -= (dx / distMouse) * force * 1.5;
              n.y -= (dy / distMouse) * force * 1.5;
            }
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + Math.sin(n.pulse) * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();

          // Connect adjacent nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
            if (dist < 110) {
              const alpha = (1 - dist / 110) * 0.45;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = n.color === '#ff0033' || n2.color === '#ff0033' 
                ? `rgba(255, 0, 51, ${alpha * 1.2})` 
                : `rgba(255, 255, 255, ${alpha * 0.6})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        // Draw cursor connection
        if (mouse.x > 0 && mouse.y > 0) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, mouse.isDown ? 18 : 12, 0, Math.PI * 2);
          ctx.strokeStyle = '#ff0033';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      } else if (mode === 'radar') {
        // Mode 2: 2D Tactical Radar Sweep
        const cx = width / 2;
        const cy = height / 2;
        const maxR = Math.min(width, height) * 0.42;

        radarAngle += 0.025;

        // Concentric range circles
        ctx.strokeStyle = 'rgba(255, 0, 51, 0.2)';
        ctx.lineWidth = 1;
        for (let r = maxR / 4; r <= maxR; r += maxR / 4) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Axis crosshairs
        ctx.beginPath();
        ctx.moveTo(cx - maxR, cy);
        ctx.lineTo(cx + maxR, cy);
        ctx.moveTo(cx, cy - maxR);
        ctx.lineTo(cx, cy + maxR);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.stroke();

        // Sweeping beam
        const beamX = cx + Math.cos(radarAngle) * maxR;
        const beamY = cy + Math.sin(radarAngle) * maxR;
        const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
        sweepGrad.addColorStop(0, 'rgba(255, 0, 51, 0.2)');
        sweepGrad.addColorStop(1, 'rgba(255, 0, 51, 0.0)');

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, maxR, radarAngle - 0.4, radarAngle);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 0, 51, 0.12)';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(beamX, beamY);
        ctx.strokeStyle = '#ff0033';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw blips
        radarBlips.forEach(b => {
          const bx = cx + Math.cos(b.angle) * b.dist;
          const by = cy + Math.sin(b.angle) * b.dist;
          const diff = Math.abs((radarAngle % (Math.PI * 2)) - (b.angle % (Math.PI * 2)));
          if (diff < 0.1) b.life = 1;

          if (b.life > 0.01) {
            ctx.beginPath();
            ctx.arc(bx, by, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 0, 51, ${b.life})`;
            ctx.shadowColor = '#ff0033';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
            b.life -= 0.012;
          }
        });
      } else if (mode === 'matrix') {
        // Mode 3: 2D Hex Stream
        ctx.font = '11px monospace';
        for (let i = 0; i < matrixDrops.length; i++) {
          const char = hexChars[Math.floor(Math.random() * hexChars.length)];
          const x = i * 20;
          const y = matrixDrops[i] * 18;

          ctx.fillStyle = Math.random() > 0.88 ? '#ffffff' : '#ff0033';
          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.975) {
            matrixDrops[i] = 0;
          }
          matrixDrops[i]++;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (isRunning && isInView) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      // Clear or static frame
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#71717a';
      ctx.font = '12px monospace';
      ctx.fillText('[SIMULATION PAUSED // POWER_SAVER_ACTIVE]', 20, 30);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isRunning, isInView, mode, particleDensity]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  const handlePointerLeave = () => {
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
    mouseRef.current.isDown = false;
  };

  return (
    <section id="playground" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-zinc-900 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff0033] mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>EXPERIENCE 04 // INTERACTIVE 2D CREATIVE CODING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            2D KINETIC LAB
          </h2>
        </div>
        <div className="text-xs font-mono text-zinc-500 max-w-md">
          <span className="text-white">Strictly zero 3D overhead.</span> Pure HTML5 2D Canvas experiment featuring particle synapses, radar telemetry, and pointer physics.
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-zinc-950 border border-zinc-800 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        {/* Mode Selector */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 hidden sm:inline">EXPERIMENT:</span>
          {(['synapse', 'radar', 'matrix'] as SimulationMode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                if (!isRunning) setIsRunning(true);
              }}
              className={`px-3 py-1.5 transition-colors uppercase cursor-pointer ${
                mode === m
                  ? 'bg-[#ff0033] text-white font-bold'
                  : 'bg-black text-zinc-400 hover:text-white border border-zinc-850'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Play / Pause / Reset Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 border transition-colors cursor-pointer ${
              isRunning
                ? 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:text-white'
                : 'bg-[#ff0033] text-white border-[#ff0033]'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'PAUSE SIM' : 'RESUME SIM'}</span>
          </button>

          {/* Density toggle for synapse */}
          {mode === 'synapse' && (
            <button
              onClick={() => setParticleDensity(prev => prev >= 70 ? 25 : prev + 20)}
              className="px-2.5 py-1.5 bg-black border border-zinc-850 text-zinc-400 hover:text-white cursor-pointer hidden sm:block"
              title="Cycle particle density"
            >
              NODES: {particleDensity}
            </button>
          )}
        </div>
      </div>

      {/* 2D Canvas Frame */}
      <div 
        ref={containerRef}
        className="relative bg-[#050505] border-x border-b border-zinc-800 overflow-hidden select-none cursor-crosshair tech-bracket"
      >
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerDown={() => { mouseRef.current.isDown = true; }}
          onPointerUp={() => { mouseRef.current.isDown = false; }}
          onPointerLeave={handlePointerLeave}
          className="w-full h-[340px] sm:h-[420px] block"
        />

        {/* HUD Overlay details */}
        <div className="absolute top-3 left-3 font-mono text-[10px] text-zinc-600 bg-black/60 px-2 py-1 border border-zinc-900 pointer-events-none">
          CANVAS_MODE: {mode.toUpperCase()} // INTERACTION: {mode === 'synapse' ? 'DRAG / CLICK TO ATTRACT' : 'POINTER TRACK'}
        </div>

        <div className="absolute bottom-3 right-3 font-mono text-[10px] text-zinc-600 bg-black/60 px-2 py-1 border border-zinc-900 pointer-events-none">
          ACCELERATION: 2D CONTEXT // 0 WebGL
        </div>
      </div>
    </section>
  );
};
