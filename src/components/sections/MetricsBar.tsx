import React from 'react';
import { motion } from 'framer-motion';
import { metricsData } from '../../data/skills';
import { ShieldCheck, Smartphone, Clock, Award } from 'lucide-react';

export const MetricsBar: React.FC = () => {
  const icons = [
    <ShieldCheck size={22} className="text-cyan-600 dark:text-cyan-400" />,
    <Smartphone size={22} className="text-indigo-600 dark:text-indigo-400" />,
    <Clock size={22} className="text-emerald-600 dark:text-emerald-400" />,
    <Award size={22} className="text-purple-600 dark:text-purple-400" />
  ];

  return (
    <section className="relative py-12 border-y border-slate-200/80 dark:border-white/[0.08] bg-slate-100/50 dark:bg-[#07090E]/70 backdrop-blur-md">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white dark:bg-[#0D121D]/80 border border-slate-200/90 dark:border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.04)] dark:shadow-none hover:border-cyan-500/40 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Background ambient hover glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all duration-500 pointer-events-none" />

              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] group-hover:scale-105 transition-transform duration-300">
                  {icons[index % icons.length]}
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight flex items-baseline gap-1">
                    {metric.value}
                    {metric.suffix && (
                      <span className="text-sm font-sans font-medium text-slate-500 dark:text-slate-400">
                        {metric.suffix}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans mt-2">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsBar;
