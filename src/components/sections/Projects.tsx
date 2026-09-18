import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import { Project, ProjectCategory } from '../../types';
import {
  FolderGit2,
  ExternalLink,
  Github,
  ChevronRight,
  Zap,
  CreditCard,
  Fingerprint,
  Volume2,
  QrCode,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import Badge from '../ui/Badge';
import ProjectModal from '../ui/ProjectModal';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterTabs: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'fintech', label: 'Fintech & BBPS' },
    { id: 'store', label: 'Live on Stores' },
    { id: 'cross-platform', label: 'Cross-Platform & Web' }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const projectIcons: Record<string, { icon: React.ReactNode; bg: string; text: string; border: string }> = {
    'peys-app': {
      icon: <Zap size={20} />,
      bg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
      text: 'text-cyan-600 dark:text-cyan-400',
      border: 'border-cyan-500/25'
    },
    'pr-fin-hub': {
      icon: <CreditCard size={20} />,
      bg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-500/25'
    },
    'aathifrupay': {
      icon: <Fingerprint size={20} />,
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/25'
    },
    'wowpe-app': {
      icon: <Volume2 size={20} />,
      bg: 'bg-pink-500/10 dark:bg-pink-500/15',
      text: 'text-pink-600 dark:text-pink-400',
      border: 'border-pink-500/25'
    },
    's3lifestyle': {
      icon: <QrCode size={20} />,
      bg: 'bg-blue-500/10 dark:bg-blue-500/15',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-500/25'
    },
    'portfolio-v2': {
      icon: <Sparkles size={20} />,
      bg: 'bg-purple-500/10 dark:bg-purple-500/15',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-500/25'
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-sm">
            <FolderGit2 size={13} className="text-cyan-600 dark:text-cyan-400" />
            <span>02 // Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Mobile Applications
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Production Flutter applications built across fintech, digital lending, communities, and store releases.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] backdrop-blur-md flex-wrap justify-center gap-1">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-slate-900 dark:text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectTab"
                      className="absolute inset-0 rounded-full bg-cyan-500/15 border border-cyan-500/35 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => {
              const iconData = projectIcons[project.id] || {
                icon: <Zap size={20} />,
                bg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
                text: 'text-cyan-600 dark:text-cyan-400',
                border: 'border-cyan-500/25'
              };

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  className="group relative rounded-2xl bg-white dark:bg-[#0D121D]/75 border border-slate-200/80 dark:border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] hover:-translate-y-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <div>
                    {/* Top Row: Domain Icon & Clean Status Pill */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl ${iconData.bg} ${iconData.text} border ${iconData.border} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm`}>
                        {iconData.icon}
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge variant={project.category === 'fintech' ? 'cyan' : 'emerald'}>
                          {project.status}
                        </Badge>
                        {project.playStoreUrl && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                            Live Store
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Company */}
                    <div className="mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ChevronRight size={18} className="text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all flex-shrink-0 ml-1" />
                      </h3>
                      {project.company && (
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                          {project.company}
                        </p>
                      )}
                    </div>

                    {/* Clean Tagline Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mt-2 mb-4">
                      {project.tagline}
                    </p>

                    {/* Key Engineering Metric */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="mb-4 text-xs font-mono font-medium text-cyan-600 dark:text-cyan-300/90 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                        <span className="truncate">{project.metrics[0]}</span>
                      </div>
                    )}

                    {/* Tech Stack Pills (Clean, minimal tags) */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 self-center">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-5 pt-3.5 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 flex items-center gap-1 transition-colors">
                      View Architecture Specs →
                    </span>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {project.playStoreUrl && (
                        <a
                          href={project.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-emerald-50 dark:bg-white/[0.05] dark:hover:bg-emerald-500/20 text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 border border-slate-200 dark:border-white/[0.08] transition-all inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                          title="Open on Google Play"
                          aria-label="Google Play Store"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] transition-all inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                          title="View GitHub Repository"
                          aria-label="GitHub Repository"
                        >
                          <Github size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Modal for Deep-dive Specs */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};

export default Projects;
