import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileDown, Sun, Moon, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
  onResumeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onResumeClick }) => {
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
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

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
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-[#07090E]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-lg dark:shadow-2xl py-3 px-5'
            : 'bg-transparent py-4 px-2'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Monogram & Live Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('home')}
              className="group flex items-center gap-2 text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <div className="w-full h-full bg-white dark:bg-[#07090E] rounded-[11px] flex items-center justify-center font-mono font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  AV
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  Aditya Vishwakarma
                  <Sparkles size={12} className="text-cyan-500 dark:text-cyan-400" />
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Mobile App Engineer
                </div>
              </div>
            </button>

            {/* Live Status Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>Open to High-Impact Opportunities</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.06] backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-slate-900 dark:text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-cyan-500/15 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200 cursor-pointer"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'light' ? <Moon size={17} className="text-slate-700" /> : <Sun size={17} className="text-amber-400" />}
            </button>

            {/* Interactive Code-Generated Resume Button */}
            <div className="hidden sm:inline-flex">
              <Button
                variant="glow"
                size="sm"
                onClick={onResumeClick}
                icon={<FileDown size={14} className="text-cyan-500 dark:text-cyan-400" />}
              >
                Resume
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 pt-3 border-t border-slate-200 dark:border-white/[0.08] flex flex-col gap-1 overflow-hidden bg-white/95 dark:bg-[#07090E]/95 rounded-xl p-3"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 mt-1 border-t border-white/[0.06] flex items-center justify-between px-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onResumeClick();
                  }}
                  className="w-full justify-center"
                  icon={<FileDown size={14} />}
                >
                  View Interactive Resume
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
