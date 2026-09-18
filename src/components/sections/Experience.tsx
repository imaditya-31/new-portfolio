import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../../data/experience';
import { Briefcase, Calendar, MapPin, CheckCircle, Sparkles, Building2 } from 'lucide-react';
import Badge from '../ui/Badge';

export const Experience: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState(experiences[0].id);

  const selectedExp = experiences.find((e) => e.id === selectedExpId) || experiences[0];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="indigo" dot className="mb-3">
            <Briefcase size={12} className="mr-1" />
            Career Trajectory
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Work Experience &{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Impact
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            A track record of engineering scalable cross-platform systems, resolving critical bottlenecks, and delivering store-ready fintech apps.
          </p>
        </div>

        {/* Experience Layout: Dual Pane Desktop & Stack Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Company Selector Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {experiences.map((exp) => {
              const isSelected = selectedExpId === exp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedExpId(exp.id)}
                  className={`relative p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer border ${
                    isSelected
                      ? 'bg-white/[0.07] border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)]'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      {exp.period}
                    </span>
                    {exp.isCurrent && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <Building2 size={13} className="text-slate-500" />
                    <span className="truncate">{exp.company}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Card with Key Wins & Tech Badges */}
          <motion.div
            key={selectedExp.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#0D1117]/90 border border-white/[0.1] backdrop-blur-xl shadow-2xl relative"
          >
            {/* Header Details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  {selectedExp.role}
                  <span className="text-cyan-400 font-mono text-sm font-normal">
                    @ {selectedExp.company}
                  </span>
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-cyan-400" />
                    {selectedExp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-indigo-400" />
                    {selectedExp.location}
                  </span>
                  <Badge variant="cyan" size="sm">
                    {selectedExp.type}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Key Accomplishments (Key Wins) */}
            {selectedExp.keyWins && (
              <div className="my-6 p-4 rounded-2xl bg-cyan-500/[0.05] border border-cyan-500/20">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 font-semibold">
                  <Sparkles size={14} />
                  <span>Key Production Wins</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {selectedExp.keyWins.map((win, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{win}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Responsibilities List */}
            <div className="my-6">
              <h4 className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-3 font-semibold">
                Responsibilities & Architecture
              </h4>
              <ul className="space-y-3">
                {selectedExp.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Applied */}
            <div className="pt-6 border-t border-white/[0.08]">
              <h4 className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-3 font-semibold">
                Technologies & Tools Deployed
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedExp.technologies.map((tech) => (
                  <Badge key={tech} variant="default">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
