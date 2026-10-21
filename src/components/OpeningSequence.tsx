import React, { useEffect, useState } from 'react';
import { ArrowRight, Terminal, Github, Briefcase, Zap, FastForward } from 'lucide-react';
import { PROFILE } from '../data/profile';

interface OpeningSequenceProps {
  onComplete: () => void;
  reducedMotion?: boolean;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete, reducedMotion = false }) => {
  const [step, setStep] = useState<number>(0);
  const letters = ['C', 'A', 'R', 'T', 'O', 'N', 'I', 'Q'];

  useEffect(() => {
    if (reducedMotion) {
      // Fast forward immediately if user prefers reduced motion
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => setStep(1), 250); // lines & grid
    const t2 = setTimeout(() => setStep(2), 650); // CARTONIQ letters stagger
    const t3 = setTimeout(() => setStep(3), 1400); // scanline sweep
    const t4 = setTimeout(() => setStep(4), 1900); // tagline
    const t5 = setTimeout(() => setStep(5), 2400); // developer intro
    const t6 = setTimeout(() => setStep(6), 2900); // actions ready

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [reducedMotion, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden select-none">
      {/* Background HUD Grid */}
      <div className={`absolute inset-0 bg-tech-grid opacity-30 transition-opacity duration-700 ${step >= 1 ? 'opacity-35' : 'opacity-0'}`} />

      {/* Red Scanline sweep */}
      <div 
        className={`absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ff0033] to-transparent shadow-[0_0_20px_#ff0033] pointer-events-none transition-all duration-1000 ${
          step >= 3 ? 'top-full opacity-0' : 'top-0 opacity-100'
        }`}
      />

      {/* Top Bar / HUD */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-[#ff0033] animate-pulse"></span>
          <span className="text-white font-bold tracking-widest">CARTONIQ // OS_CORE</span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="hidden sm:inline text-zinc-400">INIT_SYS: ONLINE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-zinc-500 hidden md:inline">PRESS [ESC] TO BYPASS</span>
          <button
            onClick={onComplete}
            className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 hover:bg-[#ff0033] text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#ff0033] transition-colors cursor-pointer text-xs font-mono"
            title="Skip sequence"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>SKIP INTRO</span>
          </button>
        </div>
      </div>

      {/* Centerpiece: Giant Dominating CARTONIQ Typography */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center my-6">
        {/* Subtle tech label */}
        <div className={`text-xs font-mono tracking-widest text-[#ff0033] mb-4 transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          [ 0x7F :: DEVELOPER PORTFOLIO SEQUENCE ]
        </div>

        {/* Giant Letters */}
        <div className="w-full flex justify-center items-center overflow-hidden">
          <h1 className="text-[14vw] sm:text-[15vw] md:text-[16vw] font-black tracking-tighter leading-none flex items-center justify-center font-display select-none">
            {letters.map((char, index) => {
              const isRevealed = step >= 2;
              return (
                <span
                  key={index}
                  className="inline-block transition-all duration-700 transform"
                  style={{
                    transitionDelay: `${index * 55}ms`,
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed 
                      ? 'translateY(0) scale(1)' 
                      : 'translateY(35%) scale(0.92)',
                    color: index === 6 || index === 7 ? '#ff0033' : '#ffffff',
                    textShadow: index >= 6 ? '0 0 30px rgba(255, 0, 51, 0.6)' : 'none'
                  }}
                >
                  {char}
                </span>
              );
            })}
          </h1>
        </div>

        {/* Tagline Reveal */}
        <div className="overflow-hidden mt-3 sm:mt-5 text-center">
          <p 
            className={`text-lg sm:text-2xl md:text-3xl font-bold tracking-widest uppercase transition-all duration-700 ${
              step >= 4 ? 'opacity-100 translate-y-0 text-white' : 'opacity-0 translate-y-6 text-zinc-700'
            }`}
          >
            {PROFILE.tagline}
          </p>
        </div>

        {/* Developer Introduction */}
        <div className={`mt-4 sm:mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono transition-all duration-700 ${
          step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 text-zinc-300">
            <span className="text-[#ff0033] font-bold">DEV:</span> {PROFILE.developer}
          </span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 text-zinc-300">
            <span className="text-[#ff0033] font-bold">ROLE:</span> {PROFILE.role}
          </span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 text-[#ff0033]">
            {PROFILE.mission}
          </span>
        </div>

        {/* Action Controls */}
        <div className={`mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 transition-all duration-700 ${
          step >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          <button
            onClick={onComplete}
            className="flex items-center gap-2.5 px-6 py-3.5 bg-[#ff0033] hover:bg-[#d9002c] text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,0,51,0.5)] cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
            <span>EXPLORE PROJECTS</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#hire-me"
            onClick={onComplete}
            className="flex items-center gap-2 px-5 py-3.5 bg-black hover:bg-zinc-900 text-white border border-zinc-700 hover:border-[#ff0033] font-mono text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-[#ff0033]" />
            <span>HIRE ME</span>
          </a>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 font-mono text-xs sm:text-sm transition-all"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GITHUB</span>
          </a>
        </div>
      </div>

      {/* Bottom HUD / Calibration info */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-600 border-t border-zinc-900 pt-4 gap-2">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#ff0033]" />
          <span>CARTONIQ_ARCH v2.6 // PURE 2D EXPERIMENTAL ENGINE</span>
        </div>
        <div>
          <span>DOMAIN: {PROFILE.websiteUrl.replace('https://', '')}</span>
        </div>
      </div>
    </div>
  );
};
