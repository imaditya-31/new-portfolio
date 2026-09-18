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
      <div className="container-custom relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-sm">
            <Briefcase size={13} className="text-cyan-600 dark:text-cyan-400" />
            <span>01 // Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
            Hands-on mobile development across fintech, BBPS, and digital lending. Click any role to explore key features and contributions.
          </p>
        </div>

        {/* Vertical Connected Spinal Timeline */}
        <div className="relative space-y-10 sm:space-y-12">
          {/* Mathematical Timeline Spine Line */}
          <div className="absolute top-6 bottom-6 left-5 sm:left-7 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-indigo-500/50 to-slate-200 dark:to-slate-800" />

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
                className="relative group pl-12 sm:pl-16"
              >
                {/* Glowing Node Perfectly Centered on Spinal Axis */}
                <div className="absolute left-5 sm:left-7 top-6 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${logo.gradient} p-[1px] shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <div className="w-full h-full bg-white dark:bg-[#07090E] rounded-[15px] flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-white shadow-sm">
                      {logo.initials}
                    </div>
                  </div>
                </div>

                {/* Main Card Container */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onClick={() => setExpandedId(isExpanded ? '' : exp.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setExpandedId(isExpanded ? '' : exp.id);
                    }
                  }}
                  className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                    isExpanded
                      ? 'bg-white dark:bg-[#0D121D]/95 border-cyan-500/40 shadow-xl dark:shadow-[0_15px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(6,182,212,0.1)]'
                      : 'bg-white/80 dark:bg-white/[0.02] border-slate-200/90 dark:border-white/[0.08] hover:bg-white dark:hover:bg-white/[0.04] shadow-sm dark:shadow-none'
                  }`}
                >
                  {/* Top Bar: Title, Company, Period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                          {exp.role}
                        </span>
                        {exp.isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                            Present
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 font-medium">
                        <Building2 size={14} className="text-slate-500" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-start sm:self-auto">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.04] px-3 py-1 rounded-full border border-slate-200 dark:border-white/[0.06]">
                        <Calendar size={12} className="text-cyan-600 dark:text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div
                        className="w-9 h-9 rounded-full bg-slate-100/80 dark:bg-white/[0.04] flex items-center justify-center text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors"
                        aria-hidden="true"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyan-400' : ''}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Highlight Preview Pills */}
                  {exp.keyWins && exp.keyWins.length > 0 && (
                    <div className="my-3 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Impact:</span>
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-semibold">
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
                        className="overflow-hidden pt-4 mt-4 border-t border-slate-200 dark:border-white/[0.08]"
                      >
                        {/* Key Production Wins Cards */}
                        {exp.keyWins && (
                          <div className="mb-5 p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 dark:bg-cyan-500/[0.04] dark:border-cyan-500/20">
                            <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase font-bold tracking-wider mb-2.5 flex items-center gap-1.5">
                              <Sparkles size={13} />
                              <span>Key Production Wins &amp; Engineering Metrics</span>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              {exp.keyWins.map((win, i) => (
                                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                                  <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                  <span>{win}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Responsibilities */}
                        <div className="mb-5">
                          <h4 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 font-semibold">
                            Core Engineering Responsibilities
                          </h4>
                          <ul className="space-y-2.5">
                            {exp.description.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 flex-shrink-0 mt-2" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack Pills */}
                        <div>
                          <h4 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-semibold">
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
