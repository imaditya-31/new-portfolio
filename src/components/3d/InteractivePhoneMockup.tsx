import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type Variants
} from 'framer-motion';
import {
  Wifi,
  BatteryFull,
  Send,
  ScanLine,
  Receipt,
  Smartphone,
  Tv,
  Fuel,
  Droplets,
  Car,
  Zap,
  TrendingUp,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  Landmark,
  Building2,
  Gift,
  Coffee,
  Bell
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type AppId = 'peys' | 'prfin' | 'aathif' | 'wowpe';

interface AppMeta {
  id: AppId;
  name: string;
  theme: 'light' | 'dark';
  accent: string; // tailwind text/bg color token, e.g. "cyan"
  icon: React.ComponentType<{ size?: number; className?: string }>;
  islandMessage: string;
}

const APPS: AppMeta[] = [
  {
    id: 'peys',
    name: 'Peys',
    theme: 'light',
    accent: 'cyan',
    icon: Receipt,
    islandMessage: 'Payment successful · ₹1,249'
  },
  {
    id: 'prfin',
    name: 'PR Fin',
    theme: 'dark',
    accent: 'violet',
    icon: TrendingUp,
    islandMessage: 'EMI due in 3 days'
  },
  {
    id: 'aathif',
    name: 'AathifRupay',
    theme: 'light',
    accent: 'emerald',
    icon: Building2,
    islandMessage: 'Settlement received · ₹12,400'
  },
  {
    id: 'wowpe',
    name: 'WowPe',
    theme: 'light',
    accent: 'rose',
    icon: Gift,
    islandMessage: '₹1,500 received from Rahul'
  }
];

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function useIsCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setCoarse(mq.matches);
  }, []);
  return coarse;
}

/* ------------------------------------------------------------------ */
/*  Small presentational primitives                                   */
/* ------------------------------------------------------------------ */

const StatusPill: React.FC<{ tone: 'success' | 'pending' | 'neutral'; children: React.ReactNode }> = ({
  tone,
  children
}) => {
  const toneClasses =
    tone === 'success'
      ? 'text-emerald-600 bg-emerald-500/10'
      : tone === 'pending'
      ? 'text-amber-600 bg-amber-500/10'
      : 'text-slate-500 bg-slate-500/10';
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${toneClasses}`}>{children}</span>;
};

const TransactionRow: React.FC<{
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  amount: string;
  positive?: boolean;
  status?: string;
  iconWrapClass?: string;
}> = ({ icon: Icon, title, subtitle, amount, positive, status, iconWrapClass }) => (
  <div className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
    <div className="flex items-center gap-2.5 min-w-0">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconWrapClass ?? 'bg-slate-500/10'}`}>
        <Icon size={14} className="text-slate-600" />
      </div>
      <div className="min-w-0">
        <div className="text-[12.5px] font-medium text-slate-800 truncate">{title}</div>
        <div className="text-[10.5px] text-slate-400 truncate">{subtitle}</div>
      </div>
    </div>
    <div className="text-right shrink-0 pl-2">
      <div className={`text-[12.5px] font-semibold font-mono ${positive ? 'text-emerald-600' : 'text-slate-800'}`}>
        {positive ? '+' : ''}
        {amount}
      </div>
      {status && <StatusPill tone="success">{status}</StatusPill>}
    </div>
  </div>
);

const MiniBarChart: React.FC<{ values: number[]; accentClass: string; animate: boolean }> = ({
  values,
  accentClass,
  animate
}) => {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-1.5 h-10">
      {values.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={animate ? { duration: 0.6, delay: i * 0.05, ease: 'easeOut' } : { duration: 0 }}
          className={`w-2 rounded-sm ${i === values.length - 1 ? accentClass : 'bg-slate-200'}`}
        />
      ))}
    </div>
  );
};

const RadialGauge: React.FC<{ percent: number; accentClass: string; animate: boolean }> = ({
  percent,
  accentClass,
  animate
}) => {
  const radius = 46;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg viewBox="0 0 120 66" className="w-full h-auto overflow-visible">
      <path
        d="M 10 60 A 50 50 0 0 1 110 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        className="text-slate-100"
      />
      <motion.path
        d="M 10 60 A 50 50 0 0 1 110 60"
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        className={accentClass}
        stroke="currentColor"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: animate ? offset : offset }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/*  App screens                                                        */
/* ------------------------------------------------------------------ */

const PeysApp: React.FC<{ animateIn: boolean }> = ({ animateIn }) => {
  const [selectedBiller, setSelectedBiller] = useState('Electricity');
  const billers: { label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { label: 'Electricity', icon: Zap },
    { label: 'Mobile', icon: Smartphone },
    { label: 'DTH', icon: Tv },
    { label: 'Gas', icon: Fuel },
    { label: 'Water', icon: Droplets },
    { label: 'FASTag', icon: Car }
  ];

  return (
    <div className="h-full bg-[#F7F8FA] px-4 pt-14 pb-24 overflow-y-auto no-scrollbar select-none">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[11px] text-slate-400">Good morning</div>
          <div className="text-[15px] font-semibold text-slate-900">Aditya Sharma</div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-[11px] font-semibold">
          AS
        </div>
      </div>

      <div className="rounded-[22px] p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-[0_10px_30px_-10px_rgba(15,23,42,0.5)]">
        <div className="text-[10.5px] text-slate-300">Available balance</div>
        <div className="text-[26px] font-semibold font-mono mt-1 tracking-tight">₹24,580.50</div>
        <div className="flex gap-4 mt-4">
          {[
            { label: 'Pay Bills', icon: Receipt },
            { label: 'Recharge', icon: Smartphone },
            { label: 'Send', icon: Send },
            { label: 'Scan', icon: ScanLine }
          ].map((a) => (
            <button
              key={a.label}
              className="flex flex-col items-center gap-1.5 group"
              aria-label={a.label}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors"
              >
                <a.icon size={15} className="text-cyan-300" />
              </motion.div>
              <span className="text-[9.5px] text-slate-300">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-[12px] font-medium text-slate-700 mb-2">Pay your bills</div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {billers.map((b) => {
            const active = selectedBiller === b.label;
            return (
              <button
                key={b.label}
                onClick={() => setSelectedBiller(b.label)}
                className={`flex flex-col items-center gap-1 shrink-0 px-3 py-2 rounded-2xl border transition-colors ${
                  active ? 'bg-cyan-500 border-cyan-500' : 'bg-white border-slate-200'
                }`}
              >
                <b.icon size={15} className={active ? 'text-white' : 'text-slate-500'} />
                <span className={`text-[9.5px] font-medium ${active ? 'text-white' : 'text-slate-500'}`}>
                  {b.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 bg-white rounded-2xl border border-slate-100 p-3.5 divide-y divide-slate-100">
        <div className="text-[11px] font-medium text-slate-500 pb-2">Recent payments</div>
        <TransactionRow icon={Zap} title="Electricity" subtitle="MSEDCL" amount="₹1,249" status="Paid" iconWrapClass="bg-amber-500/10" />
        <TransactionRow icon={Smartphone} title="Mobile recharge" subtitle="Airtel" amount="₹599" status="Successful" iconWrapClass="bg-cyan-500/10" />
        <TransactionRow icon={Droplets} title="Water" subtitle="Municipal Corporation" amount="₹842" status="Paid" iconWrapClass="bg-blue-500/10" />
      </div>
    </div>
  );
};

const PrFinApp: React.FC<{ animateIn: boolean }> = ({ animateIn }) => {
  const timeline = [
    { label: 'Loan approved', done: true },
    { label: 'Disbursal completed', done: true },
    { label: 'Repayment scheduled', done: true, current: true },
    { label: 'Next EMI', done: false }
  ];

  return (
    <div className="h-full bg-[#0F0E17] px-4 pt-14 pb-24 overflow-y-auto no-scrollbar text-white select-none">
      <div className="text-[10.5px] text-violet-300/80 tracking-tight">Your credit line</div>

      <div className="mt-3 relative">
        <RadialGauge percent={30} accentClass="text-violet-400" animate={animateIn} />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <div className="text-[22px] font-semibold font-mono">₹2,50,000</div>
          <div className="text-[10px] text-slate-400">Available credit</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-4">
        <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-2.5">
          <div className="text-[10px] text-slate-400">Used</div>
          <div className="text-[14px] font-semibold font-mono mt-0.5">₹74,500</div>
        </div>
        <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-2.5">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Calendar size={10} /> Next repayment
          </div>
          <div className="text-[14px] font-semibold font-mono mt-0.5">₹8,250 · Sep 28</div>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-[11px] font-medium text-slate-300 mb-2.5">Loan activity</div>
        <div className="space-y-0">
          {timeline.map((t, i) => (
            <div key={t.label} className="flex gap-2.5">
              <div className="flex flex-col items-center">
                <div
                  className={`w-2 h-2 rounded-full mt-1 ${
                    t.done ? 'bg-violet-400' : 'bg-slate-600'
                  } ${t.current ? 'ring-4 ring-violet-400/20' : ''}`}
                />
                {i < timeline.length - 1 && <div className="w-px flex-1 bg-white/10 my-0.5" />}
              </div>
              <div className={`text-[12px] pb-3 ${t.done ? 'text-slate-100' : 'text-slate-500'}`}>{t.label}</div>
            </div>
          ))}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        className="w-full mt-1 py-2.5 rounded-full bg-violet-500 text-white text-[12px] font-medium flex items-center justify-center gap-1.5"
      >
        Apply for funding <ArrowRight size={13} />
      </motion.button>
    </div>
  );
};

const AathifRupayApp: React.FC<{ animateIn: boolean }> = ({ animateIn }) => {
  const metrics = [
    { label: 'Transactions', value: '1,248' },
    { label: 'Successful', value: '1,231' },
    { label: 'Pending', value: '12' },
    { label: 'Failed', value: '5' }
  ];
  const services: { label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { label: 'AEPS', icon: Landmark },
    { label: 'DMT', icon: ArrowUpRight },
    { label: 'Recharge', icon: Smartphone },
    { label: 'Bill Pay', icon: Receipt },
    { label: 'Settlement', icon: Building2 }
  ];

  return (
    <div className="h-full bg-[#F4F6F5] px-4 pt-14 pb-24 overflow-y-auto no-scrollbar select-none">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] text-slate-400">Good morning, Rahul</div>
          <div className="text-[10.5px] text-slate-400">Today&apos;s earnings</div>
          <div className="text-[22px] font-semibold font-mono text-slate-900 mt-0.5">₹48,250.80</div>
        </div>
        <span className="text-[10.5px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full">
          +12.8%
        </span>
      </div>

      <div className="mt-3 bg-white rounded-2xl border border-slate-100 p-3 flex items-end justify-between">
        <MiniBarChart values={[32, 40, 28, 55, 46, 60, 48]} accentClass="bg-emerald-500" animate={animateIn} />
        <div className="text-right">
          <div className="text-[9.5px] text-slate-400">Last 7 days</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 mt-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl bg-white border border-slate-100 py-2 px-1 text-center">
            <div className="text-[12px] font-semibold font-mono text-slate-800">{m.value}</div>
            <div className="text-[8.5px] text-slate-400 mt-0.5 leading-tight">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {services.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <s.icon size={14} className="text-emerald-600" />
              </div>
              <span className="text-[8.5px] text-slate-500">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 bg-white rounded-2xl border border-slate-100 p-3.5 divide-y divide-slate-100">
        <div className="text-[11px] font-medium text-slate-500 pb-2">Transaction feed</div>
        <TransactionRow icon={Landmark} title="AEPS withdrawal" subtitle="Biometric auth" amount="₹8,500" status="Success" iconWrapClass="bg-emerald-500/10" />
        <TransactionRow icon={ArrowUpRight} title="DMT transfer" subtitle="To 98XXXXXX21" amount="₹12,000" status="Success" iconWrapClass="bg-teal-500/10" />
        <TransactionRow icon={Smartphone} title="Mobile recharge" subtitle="Jio · Prepaid" amount="₹399" status="Success" iconWrapClass="bg-slate-500/10" />
      </div>
    </div>
  );
};

const WowPeApp: React.FC<{ animateIn: boolean }> = ({ animateIn }) => (
  <div className="h-full bg-gradient-to-b from-[#FFF1F2] to-[#FDF2F8] px-4 pt-14 pb-24 overflow-y-auto no-scrollbar select-none">
    <div className="flex items-center justify-between">
      <div className="text-[15px] font-semibold text-slate-900">Hey Aditya 👋</div>
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-rose-100">
        <Bell size={14} className="text-rose-500" />
      </div>
    </div>
    <div className="text-[10.5px] text-slate-400 mt-2">Wallet balance</div>
    <div className="text-[26px] font-semibold font-mono text-slate-900 tracking-tight">₹8,420</div>

    <motion.div
      initial={animateIn ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4 }}
      className="mt-4 rounded-2xl p-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-between overflow-hidden relative"
    >
      <div>
        <div className="text-[12px] font-medium">₹120 cashback unlocked</div>
        <div className="text-[9.5px] text-rose-100 mt-0.5">Use before it expires</div>
      </div>
      <motion.div
        animate={{ rotate: [0, 15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Gift size={20} className="text-white/90" />
      </motion.div>
    </motion.div>

    <div className="flex justify-between mt-4 px-1">
      {[
        { label: 'Send', icon: Send },
        { label: 'Scan', icon: ScanLine },
        { label: 'Recharge', icon: Smartphone },
        { label: 'Bills', icon: Receipt }
      ].map((a) => (
        <button key={a.label} className="flex flex-col items-center gap-1.5" aria-label={a.label}>
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-rose-100 flex items-center justify-center"
          >
            <a.icon size={15} className="text-rose-500" />
          </motion.div>
          <span className="text-[9.5px] text-slate-500">{a.label}</span>
        </button>
      ))}
    </div>

    <div className="mt-4 bg-white/70 backdrop-blur rounded-2xl border border-rose-100/60 p-3.5 divide-y divide-rose-100/60">
      <div className="text-[11px] font-medium text-slate-500 pb-2">Recent activity</div>
      <TransactionRow icon={ArrowDownLeft} title="Received from Rahul" subtitle="UPI transfer" amount="₹1,500" positive status="" iconWrapClass="bg-emerald-500/10" />
      <TransactionRow icon={Coffee} title="Coffee" subtitle="Third Wave Coffee" amount="₹240" iconWrapClass="bg-amber-500/10" />
      <TransactionRow icon={Smartphone} title="Mobile recharge" subtitle="Vi · Prepaid" amount="₹299" iconWrapClass="bg-slate-500/10" />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Dynamic Island (Interactive Spring Pill)                           */
/* ------------------------------------------------------------------ */

const DynamicIsland: React.FC<{ message: string }> = ({ message }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex justify-center">
      <motion.button
        aria-label={expanded ? 'Collapse status' : 'Expand status'}
        onClick={() => setExpanded((e) => !e)}
        animate={{
          width: expanded ? 214 : 96,
          height: expanded ? 32 : 24
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        className="bg-black text-white rounded-full flex items-center justify-between px-2.5 overflow-hidden shadow-md border border-white/[0.08] cursor-pointer"
      >
        {expanded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 }}
            className="flex items-center gap-1.5 w-full justify-between"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
              <span className="text-[10px] text-white font-medium truncate">{message}</span>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Front Camera Lens Dot */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#0a0f1d] ring-1 ring-white/10 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#1e293b]" />
            </div>
            {/* Ambient Pulse Dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse" />
          </>
        )}
      </motion.button>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  App Dock (Floating Frosted Switcher)                              */
/* ------------------------------------------------------------------ */

const AppDock: React.FC<{ activeApp: AppId; onSelect: (id: AppId) => void }> = ({ activeApp, onSelect }) => (
  <div className="px-2 py-1.5 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/[0.12] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
    <div className="grid grid-cols-4 gap-1 items-center">
      {APPS.map((app) => {
        const active = app.id === activeApp;
        return (
          <button
            key={app.id}
            onClick={() => onSelect(app.id)}
            aria-label={`Switch to ${app.name}`}
            className={`relative py-1.5 px-1 rounded-xl flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
              active ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {active && (
              <motion.div
                layoutId="dock-pill"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                className="absolute inset-0 rounded-xl bg-white/[0.14] border border-white/10"
              />
            )}
            <app.icon size={13} className={active ? 'text-cyan-400' : 'opacity-80'} />
            <span className="text-[9px] font-medium leading-none tracking-tight relative z-10 font-mono">
              {app.name}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

const slideVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 32 : -32, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -32 : 32, opacity: 0, scale: 0.98 })
};

export const InteractivePhoneMockup: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppId>('peys');
  const [direction, setDirection] = useState(1);
  const [hasEntered, setHasEntered] = useState(false);

  const reducedMotion = usePrefersReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();
  const tiltDisabled = reducedMotion || isCoarsePointer;

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 20 });
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, 80]), { stiffness: 200, damping: 25 });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, 60]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tiltDisabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const activeIndex = APPS.findIndex((a) => a.id === activeApp);
  const meta = APPS[activeIndex];

  const handleSelect = (id: AppId) => {
    const newIndex = APPS.findIndex((a) => a.id === id);
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveApp(id);
  };

  useEffect(() => {
    const t = setTimeout(() => setHasEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] mx-auto py-8 flex items-center justify-center select-none"
      style={{ perspective: 1400 }}
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(99,102,241,0.18),transparent_70%)] pointer-events-none -z-10" />

      {/* Real Flagship Smartphone Chassis (iPhone 16 Pro Titanium Profile) */}
      <motion.div
        style={tiltDisabled ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-[320px] sm:w-[346px] h-[650px] sm:h-[690px] rounded-[54px] sm:rounded-[56px] p-[8px] sm:p-[9px] bg-gradient-to-b from-[#565D6F] via-[#2A2E38] to-[#14161B] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.85),0_0_50px_rgba(6,182,212,0.12),inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.8)] ring-1 ring-white/20"
      >
        {/* Subtle Chamfer Highlight Ring */}
        <div className="absolute inset-[2px] rounded-[48px] sm:rounded-[50px] border border-white/[0.12] pointer-events-none" />

        {/* Physical Side Buttons */}
        {/* Action Button (Left) */}
        <div className="absolute -left-[4px] top-[120px] w-[4px] h-[26px] bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 rounded-l-sm shadow-[-2px_0_3px_rgba(0,0,0,0.7)]" />
        {/* Volume Up (Left) */}
        <div className="absolute -left-[4px] top-[158px] w-[4px] h-[48px] bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 rounded-l-sm shadow-[-2px_0_3px_rgba(0,0,0,0.7)]" />
        {/* Volume Down (Left) */}
        <div className="absolute -left-[4px] top-[216px] w-[4px] h-[48px] bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 rounded-l-sm shadow-[-2px_0_3px_rgba(0,0,0,0.7)]" />
        {/* Side / Power Button (Right) */}
        <div className="absolute -right-[4px] top-[175px] w-[4px] h-[72px] bg-gradient-to-l from-slate-400 via-slate-500 to-slate-600 rounded-r-sm shadow-[2px_0_3px_rgba(0,0,0,0.7)]" />
        {/* Camera Control Capacitive Surface (Right) */}
        <div className="absolute -right-[3.5px] top-[265px] w-[3.5px] h-[36px] bg-gradient-to-l from-slate-500 to-slate-700 rounded-r-sm opacity-90 shadow-[1px_0_2px_rgba(0,0,0,0.6)]" />

        {/* Antenna Insulation Bands */}
        <div className="absolute -left-[1px] top-24 w-[2px] h-[4px] bg-slate-600/80" />
        <div className="absolute -left-[1px] bottom-24 w-[2px] h-[4px] bg-slate-600/80" />
        <div className="absolute -right-[1px] top-24 w-[2px] h-[4px] bg-slate-600/80" />
        <div className="absolute -right-[1px] bottom-24 w-[2px] h-[4px] bg-slate-600/80" />

        {/* Inner OLED Bezel & Screen (True Edge-to-Edge) */}
        <div className="relative w-full h-full rounded-[46px] sm:rounded-[48px] p-[3px] bg-black overflow-hidden shadow-inner flex flex-col">
          {/* Earpiece Speaker Slot */}
          <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-12 h-[3px] bg-[#1a1a1a] rounded-full z-40 border border-white/5" />

          {/* Active Screen Display */}
          <div className="relative w-full h-full rounded-[43px] sm:rounded-[45px] overflow-hidden bg-black">
            {/* Specular glass glare sheen */}
            {!tiltDisabled && (
              <motion.div
                className="pointer-events-none absolute inset-0 z-40 opacity-[0.09] bg-gradient-to-tr from-transparent via-white to-transparent"
                style={{
                  left: glareX,
                  top: glareY,
                  transform: 'rotate(-20deg) translate(-40%,-40%)',
                  width: '160%',
                  height: '160%'
                }}
              />
            )}

            {/* Edge-to-Edge Floating Status Bar & Dynamic Island */}
            <div
              className={`absolute top-0 left-0 right-0 z-30 pt-3 px-6 pointer-events-none transition-colors duration-300 ${
                meta.theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              <div className="flex justify-between items-center text-[11px] font-semibold tracking-tight">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <Wifi size={11} />
                  <span className="text-[9.5px] font-bold font-mono">5G</span>
                  <BatteryFull size={13} />
                </div>
              </div>

              {/* Centered Dynamic Island */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 pointer-events-auto">
                <DynamicIsland message={meta.islandMessage} />
              </div>
            </div>

            {/* Edge-to-Edge App Viewport */}
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={activeApp}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0"
                >
                  {activeApp === 'peys' && <PeysApp animateIn={hasEntered} />}
                  {activeApp === 'prfin' && <PrFinApp animateIn={hasEntered} />}
                  {activeApp === 'aathif' && <AathifRupayApp animateIn={hasEntered} />}
                  {activeApp === 'wowpe' && <WowPeApp animateIn={hasEntered} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating Glass Dock (App Switcher) & Home Indicator */}
            <div className="absolute bottom-2.5 left-3 right-3 z-30 pointer-events-auto">
              <AppDock activeApp={activeApp} onSelect={handleSelect} />

              {/* iOS Home Gesture Indicator Bar */}
              <div className="pt-2 pb-0.5 flex justify-center">
                <div className="w-28 h-1 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default InteractivePhoneMockup;