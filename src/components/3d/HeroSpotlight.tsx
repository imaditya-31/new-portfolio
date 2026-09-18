import React, { useEffect, useRef } from 'react';

interface HeroSpotlightProps {
  className?: string;
  children?: React.ReactNode;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({ className = '', children }) => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.opacity = '1';
          spotlightRef.current.style.background = `radial-gradient(650px circle at ${e.clientX}px ${e.clientY}px, rgba(6, 182, 212, 0.08), rgba(99, 102, 241, 0.04) 40%, transparent 70%)`;
        }
      });
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Background Adaptive Micro-Dot Matrix & Atmospheric Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_75%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle Precision Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Dynamic Cursor Spotlight Beam - Zero React re-renders, 120fps GPU accelerated */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ease-out hidden md:block opacity-0"
      />

      {/* Ambient static glow for mobile & initial paint */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none opacity-50 dark:opacity-100" />
      <div className="absolute top-1/2 -right-20 w-[450px] h-[450px] bg-gradient-to-tl from-purple-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none opacity-40 dark:opacity-75" />

      {children}
    </div>
  );
};

export default HeroSpotlight;
