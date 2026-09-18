import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileDown, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
  onResumeClick: () => void;
  isDocked?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  onResumeClick,
  isDocked = false
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Overview', href: '#home', id: 'home' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Simple active section detection
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none">
      <div
        className={`relative max-w-6xl mx-auto pointer-events-auto transition-[background-color,border-color,box-shadow,padding,border-radius] duration-300 ${
          mobileMenuOpen ? 'rounded-3xl' : 'rounded-full'
        } ${
          isScrolled
            ? 'bg-white/45 dark:bg-[#07090E]/45 backdrop-blur-3xl backdrop-saturate-[190%] border border-white/45 dark:border-white/[0.1] shadow-[0_12px_36px_-6px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.75),inset_0_-1px_1px_rgba(0,0,0,0.02)] dark:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-1px_1px_rgba(0,0,0,0.35)] py-2.5 px-4 sm:px-5'
            : 'bg-transparent border border-transparent shadow-none py-4 px-2 sm:px-4'
        }`}
      >
        {/* Specular Liquid Edge Light (Apple iOS 26 / VisionOS Rim Light) - only visible when scrolled */}
        <div
          className={`absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 dark:via-white/25 to-transparent pointer-events-none rounded-full transition-opacity duration-300 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Subtle Liquid Glass Caustic Gradient - only visible when scrolled */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent dark:from-white/[0.04] dark:via-transparent dark:to-transparent pointer-events-none transition-opacity duration-300 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="relative z-10 flex items-center justify-between">
          {/* Brand Identity Animated on Scroll - Exact Original Animation & Styling */}
          <div className="flex items-center min-w-[40px] sm:min-w-[210px] h-10">
            <AnimatePresence>
              {isDocked && (
                <motion.button
                  key="navbar-brand-identity"
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  onClick={() => scrollTo('home')}
                  className="group flex items-center gap-2.5 text-left cursor-pointer focus-visible:outline-none"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1.5px] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                      <img
                        src="/assets/photo.jpg"
                        alt="Aditya Vishwakarma"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#07090E]" />
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      Aditya Vishwakarma
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      Mobile App Engineer
                    </div>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation Links - Translucent Liquid Glass Segmented Track */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-slate-950 dark:text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-white/[0.05]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-white/80 dark:bg-white/[0.14] border border-white/70 dark:border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.85)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-xl"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center justify-end gap-2.5 min-w-[40px] sm:min-w-[210px]">
            {/* Theme Toggle Button - Translucent Liquid Glass Orb */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/40 dark:bg-white/[0.04] hover:bg-white/70 dark:hover:bg-white/[0.1] border border-white/40 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'light' ? <Moon size={15} className="text-slate-700" /> : <Sun size={15} className="text-amber-400" />}
            </button>

            {/* Interactive Liquid Glass Resume Button */}
            <div className="hidden sm:inline-flex">
              <button
                onClick={onResumeClick}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/45 dark:bg-white/[0.05] hover:bg-white/75 dark:hover:bg-white/[0.12] text-slate-900 dark:text-white border border-white/45 dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.18)] backdrop-blur-xl hover:scale-[1.04] active:scale-[0.97] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <FileDown size={13} className="text-cyan-600 dark:text-cyan-400" />
                <span>Resume</span>
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-white/40 dark:bg-white/[0.04] hover:bg-white/70 dark:hover:bg-white/[0.1] border border-white/40 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white shadow-sm backdrop-blur-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu - Liquid Glass Card */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden mt-2 border border-white/40 dark:border-white/[0.1] flex flex-col gap-1 overflow-hidden bg-white/55 dark:bg-[#07090E]/60 backdrop-blur-2xl backdrop-saturate-[180%] rounded-2xl p-3 shadow-[0_16px_40px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.18)]"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-white/70 dark:bg-white/[0.14] text-slate-950 dark:text-white font-semibold shadow-sm border border-white/50 dark:border-white/10'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/30 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 mt-1 border-t border-slate-200/50 dark:border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onResumeClick();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md hover:opacity-95 transition-all"
                >
                  <FileDown size={14} />
                  <span>View Interactive Resume</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
