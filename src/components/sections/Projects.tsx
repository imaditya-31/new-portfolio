import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import { Project, ProjectCategory } from '../../types';
import { FolderGit2, ExternalLink, Github, ChevronRight, ShieldCheck, Layers } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
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

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <Badge variant="cyan" dot className="mb-3">
            <FolderGit2 size={12} className="mr-1" />
            Engineering Portfolio
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Production Applications &{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
              Systems
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Production Flutter architectures deployed across fintech, digital lending, communities, and store releases.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex-wrap justify-center gap-1">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectTab"
                      className="absolute inset-0 rounded-full bg-cyan-500/20 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
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
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-3xl bg-[#0D1117]/80 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl p-6 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(6,182,212,0.12)] hover:-translate-y-1"
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="cyan" dot>
                      {project.status}
                    </Badge>
                    {project.company && (
                      <span className="text-[11px] font-mono text-slate-400 truncate max-w-[150px]">
                        {project.company}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400/90 mt-1 mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Highlights / Metric pill */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2 mb-4">
                      <ShieldCheck size={14} className="text-cyan-400 flex-shrink-0" />
                      <span className="text-[11px] font-mono text-slate-200 truncate">
                        {project.metrics[0]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Tech stack & actions */}
                <div>
                  <div className="flex flex-wrap gap-1.5 my-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-lg bg-white/[0.04] text-slate-300 text-[10px] font-mono border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-slate-400 text-[10px] font-mono">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors group-hover:underline"
                    >
                      Architecture &amp; Specs
                      <ChevronRight size={14} />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.playStoreUrl && (
                        <a
                          href={project.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white/[0.05] hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-white/[0.08] transition-colors"
                          aria-label="Google Play Store"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
                          aria-label="GitHub Repository"
                        >
                          <Github size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
