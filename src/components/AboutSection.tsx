import React from 'react';
import { User, Terminal, Smartphone, Sparkles, Layers, ShieldCheck, Cpu } from 'lucide-react';
import { PROFILE } from '../data/profile';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-zinc-900 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff0033] mb-2">
            <User className="w-3.5 h-3.5" />
            <span>DEVELOPER PROFILE // IDENTITY & PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            ABOUT MOHD ARSH
          </h2>
        </div>
        <div className="text-xs font-mono text-zinc-500 max-w-md">
          {PROFILE.role} behind CARTONIQ. Building native mobile solutions and streamlining Linux toolchains.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Profile Card & Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 bg-black border border-zinc-800 tech-bracket relative overflow-hidden">
            {/* Visual Header */}
            <div className="flex items-start justify-between pb-6 border-b border-zinc-900">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#ff0033] uppercase">
                  PRIMARY_IDENTIFIER
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
                  {PROFILE.developer}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  CARTONIQ // {PROFILE.role}
                </p>
              </div>

              <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 flex items-center justify-center font-display font-black text-xl text-[#ff0033]">
                CQ
              </div>
            </div>

            {/* Direct Bio */}
            <div className="py-6 space-y-4 text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed border-b border-zinc-900">
              <p>
                I am <strong className="text-white">Mohd Arsh</strong>, an Android app developer driven by the urge to take creative ideas from concepts into working, installable applications.
              </p>
              <p>
                My development workflow combines traditional native tools like <strong className="text-white">Android Studio</strong>, Gradle, and Kotlin with specialized mobile environments like <strong className="text-white">Termux</strong> on Linux userland. This allows me to write, test, and automate utilities anywhere directly on hardware.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="pt-6 font-mono text-xs">
              <div className="text-[#ff0033] font-bold mb-1">CORE MISSION</div>
              <div className="text-white font-semibold italic">
                "{PROFILE.mission}"
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Focus Areas & Interests */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-b border-zinc-900 pb-3 font-mono text-xs text-white font-bold flex items-center gap-2">
            <span className="text-[#ff0033]">›</span>
            <span>GENUINE TECHNICAL INTERESTS & SPECIALIZATIONS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROFILE.focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-5 bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-white mb-2">
                  <span className="text-[#ff0033]">0{idx + 1}.</span>
                  <span>{area.label}</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>

          {/* Genuine Transparency Note */}
          <div className="p-4 bg-zinc-950/60 border border-zinc-900 text-xs font-mono text-zinc-500">
            <span className="text-[#ff0033] font-bold mr-2">// ENGINEERING COMMITMENT:</span>
            All skills, technologies, and project archives presented on this site are genuine and actively practiced. No inflated claims or synthetic credentials.
          </div>
        </div>
      </div>
    </section>
  );
};
