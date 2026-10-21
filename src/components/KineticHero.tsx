import React, { useState } from 'react';
import { ArrowDown, Terminal, Briefcase, Github, ShieldCheck, Cpu, Code2, Sparkles } from 'lucide-react';
import { PROFILE } from '../data/profile';

interface KineticHeroProps {
  reducedMotion: boolean;
  onExploreProjects: () => void;
  onOpenTerminal: () => void;
}

export const KineticHero: React.FC<KineticHeroProps> = ({ reducedMotion, onExploreProjects, onOpenTerminal }) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Decorative Technical HUD Lines */}
      <div className="absolute top-20 right-4 sm:right-8 font-mono text-[10px] text-zinc-600 hidden md:flex flex-col items-end gap-1">
        <span className="text-[#ff0033]">LOC: LAT 28°N / LONG 77°E</span>
        <span>ENV: ANDROID_LAB_BUILD</span>
        <span>VER: 2026.04-STABLE</span>
      </div>

      {/* Top telemetry grid info */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#ff0033] inline-block animate-ping" />
          <span className="text-white font-semibold">SYS_LEVEL: PRIMARY_INTERFACE</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-500">
          <span>KERNEL: LINUX / TERMUX READY</span>
          <span className="hidden sm:inline">LANG: KOTLIN // JAVA</span>
        </div>
      </div>

      {/* Giant Typography Centerpiece */}
      <div className="my-auto py-8 sm:py-12 relative">
        {/* Subhead label */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-[2px] bg-[#ff0033]" />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#ff0033] uppercase">
            {PROFILE.developer} // {PROFILE.role}
          </span>
        </div>

        {/* Giant CARTONIQ Title with 2D perspective / shift */}
        <div className="relative select-none">
          <h1 
            className="text-[15vw] sm:text-[14vw] md:text-[13vw] font-black tracking-tighter leading-[0.88] font-display text-white transition-transform duration-200 ease-out flex flex-wrap"
            style={{
              transform: reducedMotion ? 'none' : `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`
            }}
          >
            <span>CARTON</span>
            <span className="text-[#ff0033] glow-red inline-block">IQ</span>
          </h1>

          {/* Ghost outline layered underneath */}
          <div 
            className="absolute -top-1 -left-1 text-[15vw] sm:text-[14vw] md:text-[13vw] font-black tracking-tighter leading-[0.88] font-display text-transparent select-none pointer-events-none hidden md:block opacity-20"
            style={{
              WebkitTextStroke: '1px #ff0033',
              transform: reducedMotion ? 'none' : `translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0)`
            }}
            aria-hidden="true"
          >
            CARTONIQ
          </div>
        </div>

        {/* Tagline & Mission */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline border-t border-zinc-900 pt-6">
          <div className="md:col-span-7">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-display">
              {PROFILE.tagline}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 font-sans max-w-xl leading-relaxed">
              {PROFILE.bio}
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col justify-between font-mono text-xs gap-3">
            <div className="p-3.5 bg-zinc-950/80 border border-zinc-900 tech-bracket">
              <div className="text-[#ff0033] font-bold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CORE DIRECTIVE</span>
              </div>
              <p className="text-zinc-300">
                "{PROFILE.mission}"
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] text-zinc-400">
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-800">#Kotlin</span>
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-800">#AndroidStudio</span>
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-800">#Termux</span>
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-800">#Linux</span>
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-800">#Gradle</span>
            </div>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={onExploreProjects}
            className="flex items-center gap-2.5 px-6 py-3.5 bg-[#ff0033] hover:bg-[#d9002c] text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,0,51,0.5)] cursor-pointer"
          >
            <Code2 className="w-4 h-4" />
            <span>EXPLORE ARCHIVE</span>
          </button>

          <a
            href="#hire-me"
            className="flex items-center gap-2.5 px-6 py-3.5 bg-black hover:bg-zinc-900 text-white border border-zinc-700 hover:border-[#ff0033] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-[#ff0033]" />
            <span>HIRE ME FOR APPS</span>
          </a>

          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-4 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 font-mono text-xs sm:text-sm transition-all cursor-pointer"
            title="Launch Terminal"
          >
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="hidden sm:inline">LAUNCH TERMINAL</span>
            <span className="sm:hidden">TERMINAL</span>
          </button>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-colors"
            title="GitHub CartonIQ"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Telemetry & Scroll Anchor */}
      <div className="border-t border-zinc-900 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Cpu className="w-3.5 h-3.5 text-[#ff0033]" />
            <span>DEV STACK: ANDROID NATIVE & LINUX UTILITIES</span>
          </div>
          <span className="hidden md:inline text-zinc-700">|</span>
          <span className="hidden md:inline text-zinc-500">NO 3D OVERHEAD // HIGH ACCESSIBILITY</span>
        </div>

        <a
          href="#terminal"
          className="flex items-center gap-2 text-zinc-400 hover:text-[#ff0033] transition-colors"
        >
          <span>SCROLL TO SYSTEM PANELS</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
