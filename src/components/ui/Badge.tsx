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
    default: 'bg-white/[0.06] text-slate-300 border-white/[0.1] hover:border-white/20',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25 shadow-[0_0_12px_rgba(6,182,212,0.15)]',
    indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/25 shadow-[0_0_12px_rgba(99,102,241,0.15)]',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/25 shadow-[0_0_12px_rgba(168,85,247,0.15)]',
    outline: 'bg-transparent text-slate-400 border-slate-700/60 hover:text-slate-200'
  };

  const dotColors = {
    default: 'bg-slate-400',
    cyan: 'bg-cyan-400',
    indigo: 'bg-indigo-400',
    emerald: 'bg-emerald-400 animate-pulse',
    purple: 'bg-purple-400',
    outline: 'bg-slate-500'
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
