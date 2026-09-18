import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles, ShieldCheck, Smartphone, Flame } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import DeviceCanvas from '../3d/DeviceCanvas';

export const Hero: React.FC = () => {
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
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Sparkles size={14} className="text-cyan-400" />
              <span>Fintech & Cross-Platform Mobile Engineer</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
              Engineering{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 glow-text-cyan">
                High-Performance
              </span>{' '}
              Mobile Systems with Flutter.
            </h1>

            {/* Narrative Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              Specialized in production-grade mobile applications across{' '}
              <span className="text-cyan-300 font-semibold">BBPS utility payments</span>,{' '}
              <span className="text-indigo-300 font-semibold">digital lending</span>, and{' '}
              <span className="text-emerald-300 font-semibold">biometric banking</span>. 
              Proven expertise architecting scalable solutions with BLoC, Clean Architecture, and slashing production crashes from{' '}
              <span className="text-white font-mono bg-white/[0.08] px-1.5 py-0.5 rounded border border-white/10 font-bold">
                20,000 to &lt;500
              </span>.
            </p>

            {/* Credibility Chips */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              <Badge variant="cyan" dot>
                <Smartphone size={13} className="mr-1" />
                5+ Store Applications
              </Badge>
              <Badge variant="indigo" dot>
                <ShieldCheck size={13} className="mr-1" />
                BLoC & Clean Architecture
              </Badge>
              <Badge variant="emerald" dot>
                <Flame size={13} className="mr-1" />
                2+ Years Production Impact
              </Badge>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToProjects}
                icon={<ArrowRight size={18} />}
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
              <a
                href="/assets/resume.pdf"
                download="Aditya_Vishwakarma_Resume.pdf"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  icon={<Download size={16} />}
                  className="w-full"
                >
                  Download CV
                </Button>
              </a>
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
            
            {/* Interactive 3D Canvas */}
            <div className="w-full flex justify-center">
              <DeviceCanvas />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
