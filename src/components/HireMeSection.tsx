import React, { useState } from 'react';
import { Mail, Copy, Check, Send, AlertCircle, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { InquiryFormState } from '../types';

export const HireMeSection: React.FC = () => {
  const [form, setForm] = useState<InquiryFormState>({
    clientName: '',
    email: '',
    category: 'Android application development',
    description: '',
    budget: '',
    deadline: ''
  });

  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedInquiry, setCopiedInquiry] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const categories = [
    'Android application development',
    'Website development',
    'UI/UX design',
    'Developer tools and utilities',
    'Other custom software projects'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const generateInquiryText = () => {
    return `PROJECT INQUIRY FOR CARTONIQ (Mohd Arsh)
-----------------------------------------------
Client / Company : ${form.clientName || 'Not specified'}
Contact Email    : ${form.email || 'Not specified'}
Project Category : ${form.category}
Estimated Budget : ${form.budget || 'Flexible / To be discussed'}
Target Deadline  : ${form.deadline || 'Flexible'}

PROJECT SCOPE & REQUIREMENTS:
${form.description}
-----------------------------------------------
Sent via CartonIQ Portfolio (https://cartoniq.runs-at.dev)`;
  };

  const handleCopyInquiry = () => {
    if (!form.clientName || !form.email || !form.description) {
      setValidationError('Please enter your name, email, and project description first.');
      return;
    }
    setValidationError(null);
    const text = generateInquiryText();
    navigator.clipboard.writeText(text);
    setCopiedInquiry(true);
    setActionNotice('Inquiry text copied to clipboard! You can paste this directly into any email client to send to cartoniq.business@gmail.com.');
    setTimeout(() => setCopiedInquiry(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setActionNotice(null);

    // Validation
    if (!form.clientName.trim()) {
      setValidationError('Please provide your name or organization.');
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      setValidationError('Please provide a valid email address.');
      return;
    }
    if (!form.description.trim() || form.description.trim().length < 15) {
      setValidationError('Please provide a brief description of your project (at least 15 characters).');
      return;
    }

    const subject = encodeURIComponent(`[Project Inquiry] ${form.category} - ${form.clientName}`);
    const body = encodeURIComponent(generateInquiryText());

    // Honest workflow: open mailto draft
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;

    setActionNotice(
      `Your email client has been triggered to compose an email to ${PROFILE.email}. If your browser did not automatically open your email app, please use the 'Copy Inquiry Summary' button below and email cartoniq.business@gmail.com manually.`
    );
  };

  return (
    <section id="hire-me" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-zinc-900 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff0033] mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>EXPERIENCE 05 // CLIENT PROJECT SYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            HIRE MOHD ARSH
          </h2>
        </div>
        <div className="text-xs font-mono text-zinc-500 max-w-md">
          Available for contract development, native Android apps, developer utilities, and software design. Direct business channel.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Direct Info & Guidelines */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-zinc-950 border border-zinc-800 tech-bracket">
            <h3 className="font-mono text-xs font-bold text-[#ff0033] uppercase tracking-wider mb-2">
              // DIRECT BUSINESS CHANNEL
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-4">
              Prefer writing an email directly? Reach Mohd Arsh directly at the verified business address.
            </p>

            <div className="p-3 bg-black border border-zinc-800 flex items-center justify-between font-mono text-xs text-white">
              <span className="truncate mr-2 text-[#ff0033]">{PROFILE.email}</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 hover:bg-[#ff0033] text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copy business email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>

          {/* Project Capabilities */}
          <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
            <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              // WHAT I BUILD & DELIVER
            </h3>
            <ul className="space-y-3 font-mono text-xs text-zinc-400">
              <li className="flex items-start gap-2.5">
                <span className="text-[#ff0033] font-bold">›</span>
                <div>
                  <strong className="text-white">Android Apps (Native Kotlin/Java):</strong> Clean MVVM architecture, background workers, room databases, and offline-first durability.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#ff0033] font-bold">›</span>
                <div>
                  <strong className="text-white">Developer Tools & Automation:</strong> Bash/Linux scripts, Termux mobile workflows, APK inspection, and build pipelines.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#ff0033] font-bold">›</span>
                <div>
                  <strong className="text-white">Web & Hybrid Utilities:</strong> High-performance modern web apps (React/Vite/Tailwind) and Capacitor wraps.
                </div>
              </li>
            </ul>
          </div>

          {/* Honest Promise */}
          <div className="p-4 bg-black border border-zinc-900 font-mono text-xs text-zinc-500">
            <span className="text-zinc-400 font-bold block mb-1">HONEST WORKFLOW GUARANTEE:</span>
            No fake chatbots or fabricated "sent to server" confirmations. Submitting generates an email draft directly to Mohd Arsh's inbox with clear parameters.
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-black border border-zinc-800 tech-bracket space-y-5">
            <div className="border-b border-zinc-900 pb-3 flex items-center justify-between font-mono text-xs">
              <span className="text-white font-bold">// INQUIRY SPECIFICATION FORM</span>
              <span className="text-[#ff0033]">REQ_FIELDS: *</span>
            </div>

            {/* Client Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  Your Name / Organization <span className="text-[#ff0033]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  placeholder="e.g. Alex Mercer / TechCorp"
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 focus:border-[#ff0033] text-white text-xs sm:text-sm font-mono focus:outline-none placeholder:text-zinc-700"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  Contact Email <span className="text-[#ff0033]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. alex@example.com"
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 focus:border-[#ff0033] text-white text-xs sm:text-sm font-mono focus:outline-none placeholder:text-zinc-700"
                />
              </div>
            </div>

            {/* Project Category */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                Project Category <span className="text-[#ff0033]">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 focus:border-[#ff0033] text-white text-xs sm:text-sm font-mono focus:outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-black text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                Project Scope & Details <span className="text-[#ff0033]">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Briefly describe what you would like Mohd Arsh to build, key features, target platform, or technical requirements..."
                className="w-full p-3 bg-zinc-950 border border-zinc-800 focus:border-[#ff0033] text-white text-xs sm:text-sm font-sans focus:outline-none placeholder:text-zinc-700"
              />
            </div>

            {/* Optional Budget & Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  Estimated Budget (Optional)
                </label>
                <input
                  type="text"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  placeholder="e.g. $500 - $1,500 / Negotiable"
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 focus:border-[#ff0033] text-white text-xs sm:text-sm font-mono focus:outline-none placeholder:text-zinc-700"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  Target Deadline (Optional)
                </label>
                <input
                  type="text"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  placeholder="e.g. 2-4 weeks / Flexible"
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 focus:border-[#ff0033] text-white text-xs sm:text-sm font-mono focus:outline-none placeholder:text-zinc-700"
                />
              </div>
            </div>

            {/* Validation Error */}
            {validationError && (
              <div className="p-3 bg-red-950/50 border border-[#ff0033] text-xs font-mono text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#ff0033] shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Action Notice */}
            {actionNotice && (
              <div className="p-3 bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 space-y-1">
                <div className="flex items-center gap-2 text-green-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ACTION DISPATCHED</span>
                </div>
                <p className="leading-relaxed">{actionNotice}</p>
              </div>
            )}

            {/* Form Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 font-mono text-xs">
              <button
                type="submit"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#ff0033] hover:bg-[#d9002c] text-white font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,0,51,0.5)] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>LAUNCH EMAIL INQUIRY</span>
              </button>

              <button
                type="button"
                onClick={handleCopyInquiry}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                title="Copy formatted inquiry to clipboard"
              >
                {copiedInquiry ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedInquiry ? 'COPIED TO CLIPBOARD' : 'COPY SUMMARY'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
