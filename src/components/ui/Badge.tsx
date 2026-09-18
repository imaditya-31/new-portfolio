import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cyan' | 'indigo' | 'emerald' | 'purple' | 'outline';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  dot = false,
  children,
  ...props
}) => {
  const variantStyles = {
    default:
      'bg-slate-100 text-slate-700 border-slate-200/90 dark:bg-white/[0.06] dark:text-slate-300 dark:border-white/[0.1] hover:border-slate-300 dark:hover:border-white/20',
    cyan: 'bg-cyan-500/[0.08] text-cyan-700 border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/30 dark:shadow-[0_0_12px_rgba(6,182,212,0.15)]',
    indigo:
      'bg-indigo-500/[0.08] text-indigo-700 border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/30 dark:shadow-[0_0_12px_rgba(99,102,241,0.15)]',
    emerald:
      'bg-emerald-500/[0.08] text-emerald-700 border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30 dark:shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    purple:
      'bg-purple-500/[0.08] text-purple-700 border-purple-500/25 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30 dark:shadow-[0_0_12px_rgba(168,85,247,0.15)]',
    outline:
      'bg-transparent text-slate-600 border-slate-300/80 hover:text-slate-900 dark:text-slate-400 dark:border-slate-700/60 dark:hover:text-slate-200'
  };

  const dotColors = {
    default: 'bg-slate-500 dark:bg-slate-400',
    cyan: 'bg-cyan-500 dark:bg-cyan-400',
    indigo: 'bg-indigo-500 dark:bg-indigo-400',
    emerald: 'bg-emerald-500 dark:bg-emerald-400',
    purple: 'bg-purple-500 dark:bg-purple-400',
    outline: 'bg-slate-400 dark:bg-slate-500'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border transition-all duration-200',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
};

export default Badge;
