import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { Project } from '../../types';
import Badge from './Badge';
import Button from './Button';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0D1117] border border-white/[0.12] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 custom-scrollbar text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="pr-12">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="cyan" dot>{project.status}</Badge>
              {project.company && (
                <span className="text-xs font-mono text-slate-400">
                  @ {project.company}
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-cyan-400 font-medium text-sm sm:text-base mt-1">
              {project.tagline}
            </p>
          </div>

          {/* Metrics Highlight */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-cyan-500/[0.06] border border-cyan-500/20 flex items-center gap-2.5"
                >
                  <ShieldCheck size={18} className="text-cyan-400 flex-shrink-0" />
                  <span className="text-xs font-mono font-medium text-slate-200">
                    {metric}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="my-6">
            <h4 className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-2">
              Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architecture Spotlight */}
          {project.architecture && (
            <div className="my-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-2">
                <Cpu size={16} />
                <span>Architecture Pattern</span>
              </div>
              <p className="text-sm text-slate-200 font-medium">
                {project.architecture}
              </p>
            </div>
          )}

          {/* Key Engineering Features */}
          {project.features && (
            <div className="my-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-mono text-slate-400 mb-3">
                <Layers size={14} />
                <span>Core Engineering Features</span>
              </div>
              <ul className="space-y-2.5">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="my-6">
            <h4 className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-3">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* External Action Links */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
            {project.playStoreUrl && (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="md" icon={<ExternalLink size={16} />}>
                  Google Play Store
                </Button>
              </a>
            )}
            {project.appStoreUrl && (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="md" icon={<ExternalLink size={16} />}>
                  Apple App Store
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="md" icon={<Github size={16} />}>
                  View Repository
                </Button>
              </a>
            )}
            {project.demoUrl && !project.playStoreUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="md" icon={<ExternalLink size={16} />}>
                  Live Demo
                </Button>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
