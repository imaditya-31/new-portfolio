import React, { useEffect, useState } from 'react';

interface HeroSpotlightProps {
  className?: string;
  children?: React.ReactNode;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({ className = '', children }) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isHovered) setIsHovered(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Background Adaptive Precision Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Dynamic Cursor Spotlight Beam */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500 ease-out hidden md:block"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.08), rgba(99, 102, 241, 0.04) 40%, transparent 70%)`
        }}
      />

      {/* Ambient static glow for mobile & initial paint */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none opacity-50 dark:opacity-100" />
      <div className="absolute top-1/2 -right-20 w-[450px] h-[450px] bg-gradient-to-tl from-purple-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none opacity-40 dark:opacity-75" />

      {children}
    </div>
  );
};

export default HeroSpotlight;
