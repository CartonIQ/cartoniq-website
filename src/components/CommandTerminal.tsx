import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, CornerDownLeft, Sparkles, Check, Trash2, Maximize2, Minimize2 } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { PROJECTS_DATA } from '../data/projects';
import { TerminalEntry } from '../types';

interface CommandTerminalProps {
  onSelectProject?: (projectId: string) => void;
  onNavigateToHire?: () => void;
}

export const CommandTerminal: React.FC<CommandTerminalProps> = ({ onSelectProject, onNavigateToHire }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialWelcome = `CARTONIQ DEV TERMINAL [Version 2.6.4-android-lab]
(c) 2026 Mohd Arsh // CARTONIQ. All rights reserved.
Type 'help' to inspect available system commands.`;

  useEffect(() => {
    // Initial welcome entry
    setHistory([
      {
        id: 'init-1',
        command: 'system.init',
        output: initialWelcome,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const cmdLower = trimmed.toLowerCase();
    setCommandList(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const timestamp = new Date().toLocaleTimeString();
    let outputContent: React.ReactNode = '';
    let isErr = false;

    switch (cmdLower) {
      case 'help':
        outputContent = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-[#ff0033] font-bold">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-1 text-xs">
              <div><span className="text-white font-mono font-bold">help</span> - Display list of available commands</div>
              <div><span className="text-white font-mono font-bold">about</span> - Read Mohd Arsh profile & philosophy</div>
              <div><span className="text-white font-mono font-bold">projects</span> - Query indexed technical case files</div>
              <div><span className="text-white font-mono font-bold">skills</span> - Inspect Android, Termux & dev stack</div>
              <div><span className="text-white font-mono font-bold">contact</span> - Business inquiry & hiring channel</div>
              <div><span className="text-white font-mono font-bold">github</span> - Public repositories & profile link</div>
              <div><span className="text-white font-mono font-bold">status</span> - Simulated system health diagnostics</div>
              <div><span className="text-white font-mono font-bold">clear</span> - Flush terminal output buffer</div>
            </div>
          </div>
        );
        break;

      case 'about':
        outputContent = (
          <div className="space-y-2 text-zinc-300">
            <p className="text-white font-bold text-sm">DEVELOPER: {PROFILE.developer} (CARTONIQ)</p>
            <p className="text-[#ff0033]">{PROFILE.role} // {PROFILE.tagline}</p>
            <p className="text-zinc-400 leading-relaxed text-xs">{PROFILE.bio}</p>
            <div className="border-l-2 border-[#ff0033] pl-3 py-1 text-xs text-zinc-300 italic">
              Mission: "{PROFILE.mission}"
            </div>
          </div>
        );
        break;

      case 'projects':
        outputContent = (
          <div className="space-y-2">
            <p className="text-[#ff0033] font-bold">INDEXED CASE FILES ({PROJECTS_DATA.length}):</p>
            <div className="space-y-2 mt-1">
              {PROJECTS_DATA.map(p => (
                <div key={p.id} className="p-2 bg-zinc-900/80 border border-zinc-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[#ff0033] font-mono font-bold mr-2">[{p.code}]</span>
                    <span className="text-white font-semibold">{p.title}</span>
                    <p className="text-zinc-400 text-[11px]">{p.tagline}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 bg-black border border-zinc-800 text-zinc-400">
                      {p.category.toUpperCase()}
                    </span>
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#ff0033] hover:underline"
                    >
                      Repo →
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-500">Scroll to the Technical Archive section for complete case files.</p>
          </div>
        );
        break;

      case 'skills':
        outputContent = (
          <div className="space-y-2 text-zinc-300">
            <p className="text-[#ff0033] font-bold">DEVELOPER TOOLKIT MATRIX:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {PROFILE.technologies.map(t => (
                <div key={t.name} className="p-2 bg-zinc-900 border border-zinc-800">
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-[10px] text-zinc-500">{t.category}</div>
                  <span className="inline-block mt-1 text-[9px] px-1 bg-black text-[#ff0033] border border-zinc-800">
                    {t.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'contact':
        outputContent = (
          <div className="space-y-2 text-zinc-300">
            <p className="text-[#ff0033] font-bold">DIRECT HIRING & INQUIRY CHANNEL:</p>
            <p className="text-white">Business Email: <a href={`mailto:${PROFILE.email}`} className="text-[#ff0033] underline">{PROFILE.email}</a></p>
            <p className="text-zinc-400 text-xs">For Android applications, tooling, or custom development inquiries.</p>
            {onNavigateToHire && (
              <button
                onClick={onNavigateToHire}
                className="mt-2 px-3 py-1.5 bg-[#ff0033] text-white text-xs font-bold font-mono hover:bg-[#d9002c] transition-colors cursor-pointer"
              >
                OPEN HIRE ME PORTAL →
              </button>
            )}
          </div>
        );
        break;

      case 'github':
        outputContent = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-white font-bold">CARTONIQ GITHUB:</p>
            <p className="text-zinc-400 text-xs">Explore public source code, android repos, and experiments.</p>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff0033] underline text-xs font-mono inline-block mt-1"
            >
              {PROFILE.githubUrl} →
            </a>
          </div>
        );
        break;

      case 'status':
        outputContent = (
          <div className="space-y-1 text-xs text-zinc-300 font-mono">
            <div className="text-green-400 font-bold">DIAGNOSTIC TELEMETRY: ALL SYSTEMS NOMINAL</div>
            <div>STATUS: ONLINE & OPEN FOR PROJECT CONTRACTS</div>
            <div>ENVIRONMENT: VITE + REACT + TAILWIND (0 3D RUNTIME IMPACT)</div>
            <div>ACCESSIBILITY: FULL KEYBOARD + REDUCED MOTION CAPABLE</div>
            <div>REPOSITORY: CartonIQ/cartoniq-website</div>
          </div>
        );
        break;

      case 'whoami':
        outputContent = (
          <div className="text-xs text-zinc-300 font-mono">
            <p>user@cartoniq-guest (session authenticated as explorer)</p>
            <p className="text-zinc-500">Connected to: https://cartoniq.runs-at.dev</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        isErr = true;
        outputContent = (
          <div className="text-xs text-zinc-400 space-y-1">
            <p className="text-[#ff0033]">Command not recognized: '{trimmed}'</p>
            <p className="text-zinc-500">Type <span className="text-white font-bold">help</span> to view all safe available system commands.</p>
          </div>
        );
        break;
    }

    setHistory(prev => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        output: outputContent,
        timestamp,
        isError: isErr
      }
    ]);

    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandList[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandList.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandList[nextIndex]);
      }
    }
  };

  const quickCommands = ['help', 'about', 'projects', 'skills', 'contact', 'status', 'clear'];

  return (
    <section id="terminal" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-zinc-900 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff0033] mb-2">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>EXPERIENCE 02 // DEVELOPER COMMAND CENTER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            SYSTEM TERMINAL
          </h2>
        </div>
        <div className="text-xs font-mono text-zinc-500 max-w-md">
          <span className="text-zinc-400">Interactive portfolio shell.</span> Predefined commands simulate developer diagnostics and provide direct command-line navigation.
        </div>
      </div>

      {/* Terminal Window */}
      <div 
        className={`bg-black border border-zinc-800 rounded-none overflow-hidden shadow-2xl transition-all duration-300 ${
          isExpanded ? 'min-h-[600px]' : 'min-h-[440px]'
        } flex flex-col tech-bracket`}
      >
        {/* Terminal Title Bar */}
        <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-800 flex items-center justify-between font-mono text-xs select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#ff0033] border border-red-900" />
            <div className="w-3 h-3 bg-zinc-800 border border-zinc-700" />
            <div className="w-3 h-3 bg-zinc-800 border border-zinc-700" />
            <span className="ml-2 text-zinc-300 font-bold hidden sm:inline">cartoniq@android-lab: ~</span>
          </div>

          <div className="text-zinc-500 text-[11px] flex items-center gap-3">
            <span className="hidden md:inline">EMULATOR [SAFE ENVIRONMENT]</span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-zinc-400 hover:text-white p-1"
              title={isExpanded ? "Restore" : "Expand"}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setHistory([])}
              className="text-zinc-400 hover:text-[#ff0033] p-1"
              title="Clear Terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Command Chips for Fast Mobile Navigation */}
        <div className="bg-zinc-950/60 border-b border-zinc-900 px-4 py-2 flex items-center gap-2 overflow-x-auto text-[11px] font-mono scrollbar-none">
          <span className="text-zinc-500 shrink-0">QUICK CMDS:</span>
          {quickCommands.map(cmd => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 bg-zinc-900 hover:bg-[#ff0033] text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#ff0033] transition-colors shrink-0 cursor-pointer"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Screen / Output Buffer */}
        <div 
          className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm space-y-4 max-h-[460px] cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry) => (
            <div key={entry.id} className="space-y-1">
              <div className="flex items-center gap-2 text-zinc-400 text-xs">
                <span className="text-[#ff0033] font-bold">cartoniq@lab</span>
                <span className="text-zinc-600">:</span>
                <span className="text-zinc-400">~$</span>
                <span className="text-white font-semibold">{entry.command}</span>
                <span className="text-[10px] text-zinc-600 ml-auto">{entry.timestamp}</span>
              </div>
              <div className="pl-4 border-l border-zinc-900 py-1">
                {entry.output}
              </div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Field */}
        <form onSubmit={handleSubmit} className="bg-zinc-950 border-t border-zinc-800 p-3 sm:p-4 flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#ff0033] font-bold shrink-0">
            <span>cartoniq@lab:~$</span>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-zinc-700"
            autoComplete="off"
            spellCheck="false"
          />

          <button
            type="submit"
            className="px-3 py-1.5 bg-zinc-900 hover:bg-[#ff0033] text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#ff0033] font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>EXEC</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Safety Notice */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-zinc-600">
        <span>* Simulated browser environment. Arbitrary shell commands are disabled for safety.</span>
        <span className="text-[#ff0033]">READY_STATUS: PASS</span>
      </div>
    </section>
  );
};
