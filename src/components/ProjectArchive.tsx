import React, { useState, useEffect } from 'react';
import { FolderGit2, ExternalLink, Github, ChevronRight, X, Shield, Cpu, Layers, RefreshCw, CheckCircle2 } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import { ProjectCategory, ProjectItem } from '../types';

export const ProjectArchive: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [isLoadingGh, setIsLoadingGh] = useState<boolean>(false);
  const [ghError, setGhError] = useState<string | null>(null);
  const [showLiveGhTab, setShowLiveGhTab] = useState<boolean>(false);

  // Optional live GitHub public repositories fetcher
  const fetchLiveGithubRepos = async () => {
    setIsLoadingGh(true);
    setGhError(null);
    try {
      const res = await fetch('https://api.github.com/users/CartonIQ/repos?sort=updated&per_page=10');
      if (!res.ok) {
        throw new Error(`GitHub API returned status ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setGithubRepos(data);
        setShowLiveGhTab(true);
      }
    } catch (err: any) {
      setGhError(err.message || 'Unable to reach GitHub API');
    } finally {
      setIsLoadingGh(false);
    }
  };

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-zinc-900 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff0033] mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>EXPERIENCE 03 // TECHNICAL DOSSIER & ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            PROJECT ARCHIVE
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {(['all', 'android', 'tools', 'web'] as ProjectCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShowLiveGhTab(false);
              }}
              className={`px-3 py-1.5 transition-colors cursor-pointer uppercase ${
                selectedCategory === cat && !showLiveGhTab
                  ? 'bg-[#ff0033] text-white font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat === 'all' ? 'All Dossiers' : cat}
            </button>
          ))}

          {/* GitHub Live sync button */}
          <button
            onClick={fetchLiveGithubRepos}
            disabled={isLoadingGh}
            className={`flex items-center gap-1.5 px-3 py-1.5 border transition-colors cursor-pointer ${
              showLiveGhTab
                ? 'bg-[#ff0033] text-white border-[#ff0033]'
                : 'bg-zinc-950 text-zinc-400 hover:text-white border-zinc-800'
            }`}
            title="Fetch live public repositories from https://github.com/CartonIQ"
          >
            <RefreshCw className={`w-3 h-3 ${isLoadingGh ? 'animate-spin text-[#ff0033]' : ''}`} />
            <span>GITHUB API</span>
          </button>
        </div>
      </div>

      {/* Live GitHub status notification if requested */}
      {ghError && (
        <div className="mb-6 p-3 bg-red-950/40 border border-red-900 text-xs font-mono text-red-300 flex items-center justify-between">
          <span>Notice: GitHub API rate limited or unreachable. Showing curated case files.</span>
          <button onClick={() => setGhError(null)} className="text-red-400 hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Live GitHub view if toggled */}
      {showLiveGhTab && githubRepos.length > 0 && (
        <div className="mb-8 p-4 bg-zinc-950 border border-zinc-800">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
            <span className="text-xs font-mono text-green-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              LIVE DATA FROM https://github.com/CartonIQ ({githubRepos.length} Repositories)
            </span>
            <button
              onClick={() => setShowLiveGhTab(false)}
              className="text-xs font-mono text-zinc-500 hover:text-white"
            >
              Back to curated dossiers [x]
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {githubRepos.map(repo => (
              <div key={repo.id} className="p-4 bg-black border border-zinc-800 hover:border-[#ff0033] transition-colors">
                <div className="flex items-start justify-between">
                  <h4 className="font-mono text-sm font-bold text-white">{repo.name}</h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-[#ff0033]"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-xs text-zinc-400 mt-2 font-sans line-clamp-2">
                  {repo.description || 'Public repository under CartonIQ namespace.'}
                </p>
                <div className="mt-3 flex items-center gap-3 text-[11px] font-mono text-zinc-500">
                  {repo.language && (
                    <span className="text-[#ff0033]">● {repo.language}</span>
                  )}
                  <span>Stars: {repo.stargazers_count}</span>
                  <span>Forks: {repo.forks_count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Case Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-black border border-zinc-800 hover:border-[#ff0033] transition-all duration-300 flex flex-col justify-between tech-bracket relative"
          >
            {/* Top Dossier Bar */}
            <div className="p-4 sm:p-5 border-b border-zinc-900 bg-zinc-950/60 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#ff0033] font-bold">{project.code}</span>
                <span className="text-zinc-600">//</span>
                <span className="text-zinc-400 uppercase text-[11px]">{project.category}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 border ${
                project.status === 'Production'
                  ? 'border-green-800/80 bg-green-950/40 text-green-300'
                  : project.status === 'Active'
                  ? 'border-red-900/80 bg-red-950/40 text-red-300'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400'
              }`}>
                {project.status}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-[#ff0033] transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[#ff0033] mt-1 mb-3">
                  {project.tagline}
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-zinc-950 border border-zinc-850 text-zinc-400 font-mono text-[10px]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 text-zinc-600 font-mono text-[10px]">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="flex items-center gap-1.5 text-zinc-300 hover:text-[#ff0033] font-bold transition-colors cursor-pointer"
                >
                  <span>INSPECT CASE FILE</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-white transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors"
                    title="Source Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case File Inspection Modal */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="bg-black border border-zinc-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl tech-bracket"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-[#ff0033] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dossier Header */}
            <div className="flex items-center gap-3 font-mono text-xs text-zinc-500 mb-2">
              <span className="text-[#ff0033] font-bold">CASE FILE // {activeModalProject.code}</span>
              <span>•</span>
              <span className="text-zinc-400">{activeModalProject.category.toUpperCase()}</span>
              <span>•</span>
              <span className="text-green-400">{activeModalProject.status}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
              {activeModalProject.title}
            </h3>
            <p className="text-sm font-mono text-[#ff0033] mt-1 mb-4">
              {activeModalProject.tagline}
            </p>

            <div className="space-y-6 text-sm text-zinc-300 font-sans border-t border-zinc-900 pt-4">
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2">
                  // DEEP TECHNICAL DOSSIER
                </h4>
                <p className="leading-relaxed text-zinc-400">
                  {activeModalProject.longDescription}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2">
                  // VERIFIED CAPABILITIES & FEATURES
                </h4>
                <ul className="space-y-2 font-mono text-xs text-zinc-300">
                  {activeModalProject.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#ff0033] font-bold">›</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture & Engineering */}
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2">
                  // ARCHITECTURE SPECIFICATION
                </h4>
                <ul className="space-y-1.5 font-mono text-xs text-zinc-400">
                  {activeModalProject.architecture.map((arch, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-zinc-600">•</span>
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Matrix */}
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2">
                  // STACK & TOOLING
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <a
                  href={activeModalProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#ff0033] hover:bg-[#d9002c] text-white font-bold transition-all shadow-[0_0_15px_rgba(255,0,51,0.4)]"
                >
                  <Github className="w-4 h-4" />
                  <span>VIEW ON GITHUB</span>
                </a>

                {activeModalProject.demoUrl && (
                  <a
                    href={activeModalProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LAUNCH DEMO</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
