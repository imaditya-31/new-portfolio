import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-[#05070A] py-14 px-4 sm:px-6 lg:px-8 text-slate-500 dark:text-slate-400 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identity & Status */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Aditya Vishwakarma
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
              Mobile App Engineer
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
            Architecting production-hardened Flutter applications with Clean Architecture, BLoC, and sub-second performance.
          </p>
        </div>

        {/* Social Network Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/imaditya-31"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-sm transition-all hover:scale-105"
            aria-label="GitHub Profile"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/aditya-vishwakarma-0903a01b5"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 shadow-sm transition-all hover:scale-105"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://x.com/V_aditya___"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm transition-all hover:scale-105"
            aria-label="X / Twitter Profile"
          >
            <Twitter size={18} />
          </a>
          <a
            href="mailto:adityavishwakarma355@gmail.com"
            className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-sm transition-all hover:scale-105"
            aria-label="Email Aditya"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Copyright & Back to top */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>© {new Date().getFullYear()} Aditya Vishwakarma</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] hover:bg-cyan-500/20 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-300/80 dark:border-white/[0.08] transition-all cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
