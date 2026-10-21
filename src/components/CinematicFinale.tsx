import React, { useState } from 'react';
import { ArrowUp, Terminal, Github, Mail, Briefcase, Zap, ShieldCheck } from 'lucide-react';
import { PROFILE } from '../data/profile';

interface CinematicFinaleProps {
  reducedMotion: boolean;
  onLaunchTerminal: () => void;
}

export const CinematicFinale: React.FC<CinematicFinaleProps> = ({ reducedMotion, onLaunchTerminal }) => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="relative bg-black border-t border-zinc-900 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />

      {/* Red accent line running across top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff0033] to-transparent shadow-[0_0_15px_#ff0033]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-28 pb-12">
        {/* Experience 6: Giant Typography Finale */}
        <div className="mb-16 sm:mb-24 text-center md:text-left select-none">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-[#ff0033] mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>EXPERIENCE 06 // CINEMATIC FINALE</span>
          </div>

          <h2 className="text-[10vw] sm:text-[8vw] md:text-[6.5vw] font-black font-display tracking-tighter leading-[0.92] text-white uppercase">
            BUILD USEFUL THINGS.
          </h2>
          <h2 className="text-[10vw] sm:text-[8vw] md:text-[6.5vw] font-black font-display tracking-tighter leading-[0.92] text-[#ff0033] glow-red uppercase">
            TURN IDEAS INTO REALITY.
          </h2>

          <p className="mt-6 text-sm sm:text-base text-zinc-400 font-sans max-w-2xl mx-auto md:mx-0">
            Engineered with high performance, precision grids, and genuine dedication to Android craft. Ready to bring your next software concept to production.
          </p>

          {/* Quick Actions in Finale */}
          <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 font-mono text-xs">
            <a
              href="#hire-me"
              className="flex items-center gap-2 px-6 py-3.5 bg-[#ff0033] hover:bg-[#d9002c] text-white font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,0,51,0.4)]"
            >
              <Briefcase className="w-4 h-4" />
              <span>START A PROJECT</span>
            </a>

            <button
              onClick={onLaunchTerminal}
              className="flex items-center gap-2 px-5 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-green-400" />
              <span>TERMINAL OS</span>
            </button>

            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 px-5 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#ff0033]" />
              <span>{copiedEmail ? 'EMAIL COPIED!' : 'COPY EMAIL'}</span>
            </button>
          </div>
        </div>

        {/* Technical Footer HUD */}
        <div className="border-t border-zinc-900 pt-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs font-mono">
          {/* Identity Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#ff0033] flex items-center justify-center text-white font-black text-[10px]">
                C
              </div>
              <span className="font-display font-black text-white text-base tracking-tight">CARTONIQ</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">{PROFILE.developer}</span>
            </div>
            <p className="text-zinc-500 text-[11px] leading-relaxed max-w-sm">
              Personal portfolio of Mohd Arsh. Android application development, Termux workflow automation, and custom software engineering.
            </p>
            <div className="text-[11px] text-zinc-600">
              HOSTED AT: {PROFILE.websiteUrl.replace('https://', '')}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[#ff0033] font-bold block mb-2">// SECTORS</span>
              <ul className="space-y-1.5 text-zinc-400">
                <li><a href="#projects" className="hover:text-white transition-colors">Archive</a></li>
                <li><a href="#terminal" className="hover:text-white transition-colors">Terminal</a></li>
                <li><a href="#toolkit" className="hover:text-white transition-colors">Toolkit</a></li>
                <li><a href="#playground" className="hover:text-white transition-colors">2D Lab</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Profile</a></li>
              </ul>
            </div>
            <div>
              <span className="text-[#ff0033] font-bold block mb-2">// CONNECT</span>
              <ul className="space-y-1.5 text-zinc-400">
                <li><a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href={`mailto:${PROFILE.email}`} className="hover:text-white transition-colors">Email Inbox</a></li>
                <li><a href="#hire-me" className="hover:text-white transition-colors">Hire Portal</a></li>
              </ul>
            </div>
          </div>

          {/* Return to top */}
          <div className="md:col-span-3 flex md:flex-col justify-between items-end">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 bg-zinc-950 hover:bg-[#ff0033] text-zinc-400 hover:text-white border border-zinc-850 hover:border-[#ff0033] transition-colors cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <div className="text-right text-[11px] text-zinc-600 mt-4">
              <span>(C) {new Date().getFullYear()} MOHD ARSH</span>
              <div className="text-zinc-700">ALL RIGHTS RESERVED</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
