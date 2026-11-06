import React from 'react';
import { Cpu, Terminal, Shield, Code, Wrench, Layers, Workflow, CheckCircle } from 'lucide-react';
import { PROFILE } from '../data/profile';

export const ToolkitSection: React.FC = () => {
  return (
    <section id="toolkit" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-zinc-900 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff0033] mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>DEVELOPER SPECIFICATIONS // TOOLKIT & WORKFLOWS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            TECHNICAL TOOLKIT
          </h2>
        </div>
        <div className="text-xs font-mono text-zinc-500 max-w-md">
          Verified languages, SDKs, and developer environments actively utilized in Mohd Arsh's Android and utility engineering pipeline.
        </div>
      </div>

      {/* Grid of Technologies */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {PROFILE.technologies.map((tech) => (
          <div
            key={tech.name}
            className="p-4 sm:p-5 bg-black border border-zinc-800 hover:border-[#ff0033] transition-all duration-200 group flex flex-col justify-between tech-bracket"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                <span className="text-zinc-500 uppercase">{tech.category}</span>
                <span className="px-1.5 py-0.5 bg-zinc-950 text-[#ff0033] border border-zinc-800">
                  {tech.badge}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-[#ff0033] transition-colors">
                {tech.name}
              </h3>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>PROFICIENCY:</span>
              <span className="text-zinc-300 font-semibold">{tech.level}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow Pillars */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROFILE.workPrinciples.map((principle) => (
          <div
            key={principle.number}
            className="p-6 bg-zinc-950 border border-zinc-900 flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl font-black font-display text-[#ff0033] block mb-2">
                {principle.number}
              </span>
              <h4 className="text-base font-bold font-display text-white mb-2">
                {principle.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                {principle.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
