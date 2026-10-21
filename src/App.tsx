/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { OpeningSequence } from './components/OpeningSequence';
import { SiteHeader } from './components/SiteHeader';
import { KineticHero } from './components/KineticHero';
import { CommandTerminal } from './components/CommandTerminal';
import { ProjectArchive } from './components/ProjectArchive';
import { ToolkitSection } from './components/ToolkitSection';
import { Playground2D } from './components/Playground2D';
import { AboutSection } from './components/AboutSection';
import { HireMeSection } from './components/HireMeSection';
import { CinematicFinale } from './components/CinematicFinale';
import { useReducedMotion } from './hooks/useReducedMotion';

export default function App() {
  const { reducedMotion, toggleMotion } = useReducedMotion();
  const [showOpening, setShowOpening] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('cartoniq_intro_seen') !== 'true';
  });

  const handleOpeningComplete = () => {
    setShowOpening(false);
    sessionStorage.setItem('cartoniq_intro_seen', 'true');
  };

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenTerminal = () => {
    const el = document.getElementById('terminal');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigateToHire = () => {
    const el = document.getElementById('hire-me');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-[#ff0033] selection:text-white font-sans overflow-x-hidden relative">
      {/* Ambient Scanline Grid Layer */}
      <div className="fixed inset-0 bg-dots opacity-20 pointer-events-none z-0" />

      {/* Opening Kinetic Experience (dominating CARTONIQ typography) */}
      {showOpening && (
        <OpeningSequence
          onComplete={handleOpeningComplete}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Global Navigation HUD */}
      <SiteHeader
        reducedMotion={reducedMotion}
        onToggleMotion={toggleMotion}
      />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* Experience 1: Kinetic Identity */}
        <KineticHero
          reducedMotion={reducedMotion}
          onExploreProjects={handleExploreProjects}
          onOpenTerminal={handleOpenTerminal}
        />

        {/* Experience 2: Developer Command Center */}
        <CommandTerminal
          onNavigateToHire={handleNavigateToHire}
        />

        {/* Experience 3: Interactive Project Archive & Dossiers */}
        <ProjectArchive />

        {/* Toolkit Matrix & Specifications */}
        <ToolkitSection />

        {/* Experience 4: 2D Kinetic Creative Coding Lab */}
        <Playground2D
          reducedMotion={reducedMotion}
        />

        {/* Developer About & Genuine Profile */}
        <AboutSection />

        {/* Experience 5: Hire Me / Client Project System */}
        <HireMeSection />
      </main>

      {/* Experience 6: Cinematic Finale & Technical Footer */}
      <CinematicFinale
        reducedMotion={reducedMotion}
        onLaunchTerminal={handleOpenTerminal}
      />
    </div>
  );
}
