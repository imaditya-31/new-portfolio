import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  CreditCard,
  Bell,
  Sparkles,
  ChevronRight,
  Wifi,
  Battery,
  Fingerprint,
  ArrowUpRight,
  Receipt,
  Building2,
  CheckCircle2,
  Smartphone
} from 'lucide-react';

export const InteractivePhoneMockup: React.FC = () => {
  const [activeApp, setActiveApp] = useState<'peys' | 'prfin' | 'aathif' | 'wowpe'>('peys');
  const [islandExpanded, setIslandExpanded] = useState(false);

  // Mouse tilt tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 150,
    damping: 20
  });

  // Glare effect coordinates
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), {
    stiffness: 200,
    damping: 25
  });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), {
    stiffness: 200,
    damping: 25
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] mx-auto py-6 flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* Outer Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Satellite Chip 1: Top Left */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 -left-6 z-30 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-[#0D1117]/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_8px_30px_rgba(6,182,212,0.2)] text-xs font-mono text-cyan-600 dark:text-cyan-300 pointer-events-none"
      >
        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
        <span className="font-semibold">BLoC &amp; Clean Architecture</span>
      </motion.div>

      {/* Floating Satellite Chip 2: Bottom Right */}
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-2 -right-6 z-30 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-[#0D1117]/90 backdrop-blur-xl border border-emerald-500/30 shadow-[0_8px_30px_rgba(16,185,129,0.2)] text-xs font-mono text-emerald-600 dark:text-emerald-300 pointer-events-none"
      >
        <ShieldCheck size={16} className="text-emerald-500" />
        <span>20K → &lt;500 Crashes</span>
      </motion.div>

      {/* 3D Tilting Phone Frame */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-[310px] sm:w-[330px] h-[640px] sm:h-[660px] rounded-[52px] p-[10px] bg-gradient-to-b from-[#2E364A] via-[#1A202C] to-[#0D111A] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.15)] border border-slate-600/40 ring-1 ring-white/10"
      >
        {/* Antenna Lines on Frame */}
        <div className="absolute -left-[1px] top-28 w-[3px] h-3 bg-slate-500/50 rounded-r" />
        <div className="absolute -left-[1px] top-40 w-[3px] h-10 bg-slate-500/50 rounded-r" />
        <div className="absolute -left-[1px] top-54 w-[3px] h-10 bg-slate-500/50 rounded-r" />
        <div className="absolute -right-[1px] top-36 w-[3px] h-14 bg-slate-500/50 rounded-l" />

        {/* Screen Inner Bezel */}
        <div className="relative w-full h-full rounded-[44px] bg-[#07090E] overflow-hidden border border-white/[0.08] flex flex-col justify-between shadow-inner">
          {/* Reactive Glass Glare Sheen */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-40 opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent"
            style={{
              transform: 'rotate(-25deg) translateY(-20%)',
              left: glareX,
              top: glareY
            }}
          />

          {/* Top Status Bar & Dynamic Island */}
          <div className="relative z-30 pt-3 px-6 pb-2">
            <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
              <span className="font-semibold text-white">9:41</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Wifi size={12} />
                <span className="text-[10px] font-bold">5G</span>
                <Battery size={13} className="text-emerald-400" />
              </div>
            </div>

            {/* Interactive Dynamic Island */}
            <div className="flex justify-center mt-1">
              <motion.div
                onClick={() => setIslandExpanded(!islandExpanded)}
                animate={{
                  width: islandExpanded ? '240px' : '90px',
                  height: islandExpanded ? '34px' : '20px'
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="bg-black border border-white/10 rounded-full px-2.5 flex items-center justify-between cursor-pointer shadow-lg hover:border-cyan-500/40"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  {islandExpanded && (
                    <span className="text-[10px] font-mono text-cyan-300 truncate">
                      Flutter 60 FPS • Active
                    </span>
                  )}
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A1F2C] border border-white/20" />
              </motion.div>
            </div>
          </div>

          {/* Screen Content Area (Interactive App Carousel) */}
          <div className="relative z-20 flex-1 px-4 py-2 flex flex-col justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              {activeApp === 'peys' && (
                <motion.div
                  key="peys"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  {/* App Header */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                        SP Transaction Hub
                      </div>
                      <h4 className="text-lg font-extrabold text-white">Peys BBPS App</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                      Bharat BillPay
                    </span>
                  </div>

                  {/* Main Utility Bill Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-xl relative overflow-hidden">
                    <div className="flex justify-between items-start text-xs opacity-90">
                      <span>Electricity • MSEDCL</span>
                      <Receipt size={14} />
                    </div>
                    <div className="text-2xl font-bold font-mono my-2 tracking-tight">
                      ₹ 1,249.00
                    </div>
                    <div className="flex justify-between items-center text-[10px] pt-2 border-t border-white/20">
                      <span>Consumer No: 02847192</span>
                      <span className="px-2 py-0.5 rounded-full bg-black/30 font-semibold text-emerald-300">
                        Due in 3 Days
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Biller Form Chips */}
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase mb-1.5 flex justify-between">
                      <span>Dynamic Biller Categories</span>
                      <span className="text-cyan-400">100+ Billers</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                      {['Fastag', 'Water', 'DTH', 'Gas'].map((cat, i) => (
                        <div
                          key={i}
                          className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-cyan-500/10 transition-colors cursor-pointer"
                        >
                          <div className="font-semibold text-slate-200">{cat}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Architecture spec pill */}
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-300">
                    <span>Schema Engine:</span>
                    <span className="text-cyan-400 font-bold">Dynamic JSON Form</span>
                  </div>
                </motion.div>
              )}

              {activeApp === 'prfin' && (
                <motion.div
                  key="prfin"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider">
                        Digital Lending
                      </div>
                      <h4 className="text-lg font-extrabold text-white">PR Fin Hub</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-mono text-indigo-300">
                      BLoC State
                    </span>
                  </div>

                  {/* Credit Line Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white shadow-xl">
                    <div className="text-xs opacity-80 uppercase tracking-wider">Approved Credit Line</div>
                    <div className="text-2xl font-bold font-mono my-1 tracking-tight">₹ 2,50,000</div>
                    <div className="flex justify-between items-center text-[10px] mt-2 pt-2 border-t border-white/20">
                      <span>Zero-Trust Storage</span>
                      <span className="font-semibold text-emerald-300">Instant Disbursal</span>
                    </div>
                  </div>

                  {/* Onboarding Checklist */}
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] space-y-2">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">
                      Clean Arch Loan Pipeline
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-200">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-emerald-400" />
                        KYC Verification
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400">Passed</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-200">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-emerald-400" />
                        Guarded Deep-Linking
                      </span>
                      <span className="font-mono text-[10px] text-cyan-400">Active</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeApp === 'aathif' && (
                <motion.div
                  key="aathif"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                        Webplat Technologies
                      </div>
                      <h4 className="text-lg font-extrabold text-white">AathifRupay Hub</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                      Play Store Live
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-xl">
                    <div className="flex justify-between text-xs opacity-90">
                      <span>Merchant Terminal</span>
                      <Fingerprint size={16} />
                    </div>
                    <div className="text-2xl font-bold font-mono my-2 tracking-tight">₹ 48,250.80</div>
                    <div className="flex justify-between text-[10px] pt-1 border-t border-white/20">
                      <span>AEPS &amp; DMT Enabled</span>
                      <span className="text-emerald-200 font-semibold">99.8% Uptime</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                    <div className="text-xs font-semibold text-emerald-300">
                      Crashlytics Optimization
                    </div>
                    <span className="font-mono text-xs font-bold text-white bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
                      20K → &lt;500
                    </span>
                  </div>
                </motion.div>
              )}

              {activeApp === 'wowpe' && (
                <motion.div
                  key="wowpe"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[10px] font-mono text-pink-400 uppercase font-bold tracking-wider">
                        Webplat Technologies
                      </div>
                      <h4 className="text-lg font-extrabold text-white">WowPe Pay</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-[10px] font-mono text-pink-300">
                      App Store &amp; Play
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 text-white shadow-xl">
                    <div className="flex justify-between text-xs opacity-90">
                      <span>FCM Audio Engine</span>
                      <Bell size={14} />
                    </div>
                    <div className="text-xl font-bold font-mono my-2 tracking-tight">
                      100% Delivery
                    </div>
                    <div className="text-[10px] opacity-80">
                      Dynamic sound cues &amp; multi-channel flavors
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 space-y-1">
                    <div className="font-semibold text-white">50+ Bugs Resolved</div>
                    <div className="text-[10px] text-slate-400">
                      Stabilized checkout flows &amp; eliminated low-end device UI jank.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* App Switcher Tabs at Bottom of Phone */}
            <div className="pt-2 border-t border-white/[0.08]">
              <div className="text-[9px] font-mono text-slate-400 text-center uppercase tracking-wider mb-2">
                Tap to Switch Flutter App:
              </div>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { id: 'peys', label: 'Peys' },
                  { id: 'prfin', label: 'PR Fin' },
                  { id: 'aathif', label: 'Aathif' },
                  { id: 'wowpe', label: 'WowPe' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveApp(tab.id as any)}
                    className={`py-1.5 rounded-lg text-[10px] font-mono font-semibold transition-all cursor-pointer ${
                      activeApp === tab.id
                        ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.6)] font-bold'
                        : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="py-2 flex justify-center">
            <div className="w-32 h-1 bg-white/40 rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractivePhoneMockup;
