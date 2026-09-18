import React, { useState, useEffect } from 'react';
import HeroSpotlight from './components/3d/HeroSpotlight';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import MetricsBar from './components/sections/MetricsBar';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import SkillsBento from './components/sections/SkillsBento';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import ResumeModal from './components/ui/ResumeModal';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isDockedInNavbar, setIsDockedInNavbar] = useState(false);

  useEffect(() => {
    // Check initial preference, default to dark for cyber aesthetic
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setIsDockedInNavbar(window.scrollY > 125);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#07090E] text-slate-900 dark:text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-700 dark:selection:text-cyan-300 font-sans">
      <HeroSpotlight>
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onResumeClick={() => setIsResumeOpen(true)}
          isDocked={isDockedInNavbar}
        />
        <main className="relative z-10">
          <Hero
            onResumeClick={() => setIsResumeOpen(true)}
            isDocked={isDockedInNavbar}
          />
          <MetricsBar />
          <Experience />
          <Projects />
          <SkillsBento />
          <Education />
          <Contact />
        </main>
        <Footer />
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </HeroSpotlight>
    </div>
  );
};

export default App;
