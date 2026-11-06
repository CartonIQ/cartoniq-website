import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, Cpu, Briefcase, Github, Shield, Sparkles } from 'lucide-react';
import { PROFILE } from '../data/profile';

interface SiteHeaderProps {
  reducedMotion: boolean;
  onToggleMotion: () => void;
  onOpenTerminalModal?: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ reducedMotion, onToggleMotion }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledRatio = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrolledRatio)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Clock
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { label: '// ARCHIVE', href: '#projects' },
    { label: '// TERMINAL', href: '#terminal' },
    { label: '// TOOLKIT', href: '#toolkit' },
    { label: '// 2D LAB', href: '#playground' },
    { label: '// ABOUT', href: '#about' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-950 z-50">
        <div 
          className="h-full bg-[#ff0033] shadow-[0_0_8px_#ff0033] transition-all duration-150 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-2xl'
            : 'bg-transparent border-b border-zinc-900/40 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Logo & Identity */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-[#ff0033]"
            aria-label="CARTONIQ Home"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-[#ff0033] transition-colors">
              <span className="font-display font-black text-white text-base sm:text-lg">C</span>
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#ff0033]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black tracking-tighter text-lg sm:text-xl text-white group-hover:text-[#ff0033] transition-colors">
                CARTONIQ
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase -mt-1 hidden xs:block">
                MOHD ARSH // DEV
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-zinc-400 hover:text-white transition-colors relative py-1 focus:outline-none focus:text-[#ff0033] hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#ff0033] after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Status & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* System Status Pill */}
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff0033] animate-pulse" />
              <span>ONLINE</span>
              <span className="text-zinc-700">|</span>
              <span className="text-zinc-500">{timeStr}</span>
            </div>

            {/* Reduced motion toggle */}
            <button
              onClick={onToggleMotion}
              className={`p-2 border text-xs font-mono transition-colors cursor-pointer ${
                reducedMotion
                  ? 'bg-[#ff0033]/20 border-[#ff0033] text-[#ff0033]'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700'
              }`}
              title={reducedMotion ? 'Reduced motion enabled' : 'Toggle reduced motion'}
              aria-label="Toggle reduced motion"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            {/* GitHub Link */}
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
            </a>

            {/* Hire Me CTA Button */}
            <a
              href="#hire-me"
              className="flex items-center gap-2 px-4 py-2 bg-[#ff0033] hover:bg-[#d9002c] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,0,51,0.4)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>HIRE ME</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="#hire-me"
              className="px-3 py-1.5 bg-[#ff0033] text-white font-mono text-xs font-bold uppercase tracking-wider sm:hidden"
            >
              HIRE
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-zinc-950 border border-zinc-800 text-white hover:border-[#ff0033] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff0033]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden flex flex-col justify-between p-6 pt-24 font-mono">
          <div className="space-y-6">
            <div className="text-[11px] text-[#ff0033] tracking-widest border-b border-zinc-900 pb-2">
              NAVIGATION_SYSTEM // SECTORS
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-xl font-display font-bold text-zinc-300 hover:text-white hover:text-[#ff0033] transition-colors py-2 border-b border-zinc-900/60"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <a
                href="#hire-me"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#ff0033] text-white font-mono font-bold text-sm uppercase tracking-wider"
              >
                <Briefcase className="w-4 h-4" />
                <span>HIRE MOHD ARSH</span>
              </a>

              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-sm"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB: CartonIQ</span>
              </a>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-4 flex items-center justify-between text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff0033]" />
              <span>SYS ONLINE</span>
            </div>
            <button
              onClick={onToggleMotion}
              className="text-zinc-400 hover:text-[#ff0033] text-xs underline"
            >
              {reducedMotion ? 'Enable Motion' : 'Reduce Motion'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
