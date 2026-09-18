import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50 dark:bg-[#07090E] text-slate-500 dark:text-slate-400 font-sans overflow-hidden">
      {/* Top Footer Navigation, Socials & Identity */}
      <div className="max-w-7xl mx-auto pt-14 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
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
            Building reliable, high-performance mobile applications with Flutter, BLoC, and clean architecture.
          </p>
        </div>

        {/* Social Network Links */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/imaditya-31"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-sm transition-all hover:scale-105 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label="GitHub Profile"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/aditya-vishwakarma-0903a01b5"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 shadow-sm transition-all hover:scale-105 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://x.com/V_aditya___"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm transition-all hover:scale-105 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label="X / Twitter Profile"
          >
            <Twitter size={16} />
          </a>
          <a
            href="mailto:adityaa.inwork@gmail.com"
            className="w-10 h-10 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-sm transition-all hover:scale-105 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label="Email Aditya"
          >
            <Mail size={16} />
          </a>
        </div>

        {/* Copyright, Last Updated & Back to top */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span>© {new Date().getFullYear()} Aditya Vishwakarma</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Last updated: September 2026
            </span>
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-slate-200/80 dark:bg-white/[0.06] hover:bg-cyan-500/20 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-300/80 dark:border-white/[0.08] transition-all cursor-pointer inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 flex-shrink-0"
            aria-label="Back to top"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      {/* Monumental 80% Width "LET'S CONNECT" Directly Integrated Inside Footer Canvas */}
      <div className="relative w-full pb-0 select-none">
        <button
          onClick={scrollToContact}
          className="group w-full block text-center cursor-pointer focus-visible:outline-none relative pb-0 pt-2 sm:pt-4"
          aria-label="Click to connect with Aditya"
        >
          {/* Subtle Natural Baseline Horizon Shadow (Only at bottom floor, never bleeding into the upper section) */}
          <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-slate-900/10 via-slate-900/5 to-transparent dark:from-black dark:via-black/60 dark:to-transparent pointer-events-none z-0" />

          {/* Monumental Screen Width Text Container */}
          <div className="relative z-10 w-full flex justify-center items-end px-2 sm:px-4 pb-0 leading-none">
            <span
              className="font-['Bebas_Neue','Anton',Impact,sans-serif] text-[15.5vw] sm:text-[16vw] md:text-[16.5vw] lg:text-[17vw] leading-none tracking-[0.02em] uppercase whitespace-nowrap inline-block scale-y-[1.18] origin-bottom transition-[color,background-color] duration-300 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-700/75 via-[35%] to-transparent dark:from-white dark:via-slate-200/80 dark:via-[35%] dark:to-transparent [mask-image:linear-gradient(to_bottom,black_25%,black_48%,transparent_96%)] [-webkit-mask-image:linear-gradient(to_bottom,black_25%,black_48%,transparent_96%)] group-hover:from-black group-hover:via-slate-800/80 group-hover:to-transparent dark:group-hover:from-white dark:group-hover:via-slate-100/90 dark:group-hover:to-transparent"
            >
              Let's Connect
            </span>
          </div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
