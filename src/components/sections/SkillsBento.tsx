import React from 'react';
import { motion } from 'framer-motion';
import { skillGroups } from '../../data/skills';
import {
  Smartphone,
  Layers,
  CreditCard,
  Cloud,
  ShieldCheck,
  Palette,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import Badge from '../ui/Badge';

export const SkillsBento: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone size={20} className="text-cyan-600 dark:text-cyan-400" />;
      case 'Layers':
        return <Layers size={20} className="text-indigo-600 dark:text-indigo-400" />;
      case 'CreditCard':
        return <CreditCard size={20} className="text-emerald-600 dark:text-emerald-400" />;
      case 'Cloud':
        return <Cloud size={20} className="text-amber-600 dark:text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck size={20} className="text-rose-600 dark:text-rose-400" />;
      case 'Palette':
        return <Palette size={20} className="text-purple-600 dark:text-purple-400" />;
      default:
        return <Sparkles size={20} className="text-cyan-600 dark:text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50/60 dark:bg-[#05070A]/50">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="emerald" dot className="mb-3">
            <Sparkles size={12} className="mr-1" />
            Core Competencies
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical Stack &amp;{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">
              Architecture
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Full-cycle mobile systems engineering: from native platform layers to enterprise state machines and cloud telemetry.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-6 rounded-3xl bg-white dark:bg-[#0D1117]/80 border border-slate-200/80 dark:border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between group shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_0_25px_rgba(6,182,212,0.1)]"
            >
              <div>
                {/* Header with Icon */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] group-hover:scale-110 transition-transform">
                    {getIcon(group.iconName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      {group.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {group.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all ${
                        skill.highlight
                          ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 shadow-sm'
                          : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.08]'
                      }`}
                    >
                      {skill.highlight && (
                        <CheckCircle2 size={12} className="text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                      )}
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="mt-6 pt-3 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span>Production Verified</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-medium">● 60 FPS Optimized</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsBento;
