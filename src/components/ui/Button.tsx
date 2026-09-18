import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'px-3.5 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3.5 text-base'
    };

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-medium shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] border border-white/20',
      secondary:
        'bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-slate-800 dark:text-white font-medium border border-slate-200 dark:border-white/[0.12] backdrop-blur-md',
      outline:
        'bg-transparent hover:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/40 hover:border-cyan-500 shadow-sm',
      ghost:
        'bg-transparent hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white',
      glow:
        'relative bg-white dark:bg-[#0D1117] text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 shadow-sm hover:border-cyan-500'
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none font-medium',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
