import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Sparkles, ShieldCheck, Smartphone, Flame } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import InteractivePhoneMockup from '../3d/InteractivePhoneMockup';

interface HeroProps {
  onResumeClick: () => void;
  isDocked?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onResumeClick, isDocked = false }) => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & Authority */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Engineer Identity Bar with Real Photo & Shared Layout */}
            <div className="min-h-[52px] mb-6 flex items-center">
              <AnimatePresence>
                {!isDocked && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center gap-3.5 p-1.5 pr-4 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-xl shadow-sm"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1.5px] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                        <img
                          src="/assets/photo.jpg"
                          alt="Aditya Vishwakarma"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#07090E]" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        Aditya Vishwakarma
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        Mobile App Engineer • Pune, India
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12] mb-6">
              Building{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
                High-Performance
              </span>{' '}
              Mobile Apps with Flutter.
            </h1>

            {/* Narrative Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-6">
              Specialized in production mobile applications across{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">BBPS utility payments</strong>,{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">digital lending</strong>, and{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">biometric banking</strong>.{' '}
              Experienced in building scalable apps with BLoC, Clean Architecture, and reducing production crashes from{' '}
              <span className="inline-flex items-center font-mono font-bold text-xs sm:text-sm px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300">
                20,000 → &lt;500
              </span>.
            </p>

            {/* Availability Notice */}
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-semibold mb-6">
              <span>Open to New Projects, Collaborations &amp; Freelance Contracts</span>
            </div>

            {/* Credibility Chips */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              <Badge variant="cyan">
                <Smartphone size={13} className="mr-1" />
                10+ Store Deployments
              </Badge>
              <Badge variant="indigo">
                <ShieldCheck size={13} className="mr-1" />
                BLoC &amp; Clean Architecture
              </Badge>
              <Badge variant="purple">
                <Flame size={13} className="mr-1" />
                2+ Years Production Impact
              </Badge>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToProjects}
                icon={<ArrowRight size={16} />}
              >
                Explore Live Apps
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToContact}
              >
                Let's Talk
              </Button>
              <div className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onResumeClick}
                  icon={<Download size={15} />}
                  className="w-full"
                >
                  Interactive Resume
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Mobile Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Specular Backdrop Rings */}
            <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none -z-10" />
            <div className="absolute w-64 h-64 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none -z-10" />
            
            {/* Interactive 3D Perspective Phone Showcase */}
            <div className="w-full flex justify-center">
              <InteractivePhoneMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
