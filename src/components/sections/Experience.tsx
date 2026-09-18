import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../../data/experience';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronDown, Sparkles, Building2, Terminal, ArrowUpRight } from 'lucide-react';
import Badge from '../ui/Badge';

export const Experience: React.FC = () => {
  // Allow multiple or active expanded state for a human interactive feel
  const [expandedId, setExpandedId] = useState<string>(experiences[0].id);

  const companyLogos: Record<string, { initials: string; gradient: string }> = {
    'sp-transaction-hub': {
      initials: 'SP',
      gradient: 'from-cyan-500 to-blue-600'
    },
    'webplat-technologies': {
      initials: 'WP',
      gradient: 'from-emerald-500 to-teal-700'
    },
    'techriigour-it-solutions': {
      initials: 'TR',
      gradient: 'from-indigo-500 to-purple-700'
    }
  };

  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <Badge variant="cyan" dot className="mb-4">
            <Briefcase size={12} className="mr-1" />
            Engineering Journey
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Work Experience &amp;{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
              Timeline
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
            From startup ownership to architecting enterprise BBPS &amp; digital lending systems. Click any role to explore deep architectural contributions.
          </p>
        </div>

        {/* Vertical Connected Spinal Timeline */}
        <div className="relative pl-6 sm:pl-10 md:pl-16 border-l-2 border-slate-800/80 space-y-12">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            const logo = companyLogos[exp.id] || { initials: 'FL', gradient: 'from-blue-500 to-cyan-500' };

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Glowing Node on Timeline Axis */}
                <div className="absolute -left-[31px] sm:-left-[47px] md:-left-[71px] top-6 flex items-center justify-center">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${logo.gradient} p-[1px] shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <div className="w-full h-full bg-[#07090E] rounded-[15px] flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-white">
                      {logo.initials}
                    </div>
                  </div>
                </div>

                {/* Main Card Container */}
                <div
                  onClick={() => setExpandedId(isExpanded ? '' : exp.id)}
                  className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 cursor-pointer border ${
                    isExpanded
                      ? 'bg-[#0D1117]/95 border-cyan-500/40 shadow-[0_15px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(6,182,212,0.1)]'
                      : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.15]'
                  }`}
                >
                  {/* Top Bar: Title, Company, Period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {exp.role}
                        </span>
                        {exp.isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Present
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-cyan-400 font-medium">
                        <Building2 size={14} className="text-slate-400" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-auto">
                      <div className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-white/[0.04] px-3 py-1.5 rounded-xl border border-white/[0.06]">
                        <Calendar size={13} className="text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      <button
                        className="p-1.5 rounded-lg text-slate-400 group-hover:text-white transition-colors"
                        aria-label="Expand details"
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyan-400' : ''}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Highlight Preview Pills */}
                  {exp.keyWins && exp.keyWins.length > 0 && (
                    <div className="my-3 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400 uppercase">Impact:</span>
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono font-medium">
                        ⚡ {exp.keyWins[0]}
                      </span>
                    </div>
                  )}

                  {/* Expandable Architectural Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-4 mt-4 border-t border-white/[0.08]"
                      >
                        {/* Key Production Wins Cards */}
                        {exp.keyWins && (
                          <div className="mb-5 p-4 rounded-2xl bg-cyan-500/[0.04] border border-cyan-500/20">
                            <div className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider mb-2.5 flex items-center gap-1.5">
                              <Sparkles size={13} />
                              <span>Key Production Wins &amp; Engineering Metrics</span>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              {exp.keyWins.map((win, i) => (
                                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                                  <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                                  <span>{win}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Responsibilities */}
                        <div className="mb-5">
                          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 font-semibold">
                            Core Engineering Responsibilities
                          </h4>
                          <ul className="space-y-2.5">
                            {exp.description.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-2" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack Pills */}
                        <div>
                          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                            Tech Stack &amp; Tools Deployed
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="default">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
