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
  Bell,
  CheckCircle2,
  Fingerprint,
  QrCode,
  ShieldCheck,
  CreditCard,
  Sparkles
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type AppId = 'peys' | 'prfin' | 'aathif' | 'wowpe';

interface AppMeta {
  id: AppId;
  name: string;
  theme: 'light' | 'dark';
  accent: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  islandMessage: string;
  islandTone: 'cyan' | 'violet' | 'emerald' | 'rose';
}

const APPS: AppMeta[] = [
  {
    id: 'peys',
    name: 'Peys',
    theme: 'dark',
    accent: 'cyan',
    icon: Receipt,
    islandMessage: 'Payment successful · ₹1,249',
    islandTone: 'cyan'
  },
  {
    id: 'prfin',
    name: 'PR Fin',
    theme: 'dark',
    accent: 'violet',
    icon: TrendingUp,
    islandMessage: 'Credit Line Active · ₹3,50,000',
    islandTone: 'violet'
  },
  {
    id: 'aathif',
    name: 'AathifRupay',
    theme: 'dark',
    accent: 'emerald',
    icon: Building2,
    islandMessage: 'Settlement received · ₹12,400',
    islandTone: 'emerald'
  },
  {
    id: 'wowpe',
    name: 'WowPe',
    theme: 'dark',
    accent: 'rose',
    icon: Gift,
    islandMessage: '₹250 Cashback ready to claim',
    islandTone: 'rose'
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

const StatusPill: React.FC<{ tone: 'success' | 'pending' | 'cyan' | 'neutral'; children: React.ReactNode }> = ({
  tone,
  children
}) => {
  const toneClasses =
    tone === 'success'
      ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30'
      : tone === 'cyan'
      ? 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30'
      : tone === 'pending'
      ? 'text-amber-400 bg-amber-500/15 border-amber-500/30'
      : 'text-slate-400 bg-white/[0.06] border-white/10';
  return (
    <span className={`text-[9.5px] font-mono font-medium px-2 py-0.5 rounded-full border ${toneClasses}`}>
      {children}
    </span>
  );
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
  <div className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
    <div className="flex items-center gap-2.5 min-w-0">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-white/10 ${iconWrapClass ?? 'bg-white/[0.06]'}`}>
        <Icon size={14} className="text-white/90" />
      </div>
      <div className="min-w-0">
        <div className="text-[12px] font-semibold text-slate-100 truncate">{title}</div>
        <div className="text-[10px] text-slate-400 truncate">{subtitle}</div>
      </div>
    </div>
    <div className="text-right shrink-0 pl-2">
      <div className={`text-[12px] font-semibold font-mono ${positive ? 'text-emerald-400' : 'text-slate-100'}`}>
        {positive ? '+' : ''}
        {amount}
      </div>
      {status && <div className="mt-0.5"><StatusPill tone={positive ? 'success' : 'cyan'}>{status}</StatusPill></div>}
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
          className={`w-2 rounded-t-sm ${i === values.length - 1 ? accentClass : 'bg-white/20'}`}
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
  const circumference = Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg viewBox="0 0 120 66" className="w-full h-auto overflow-visible">
      <path
        d="M 10 60 A 50 50 0 0 1 110 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        className="text-white/10"
      />
      <motion.path
        d="M 10 60 A 50 50 0 0 1 110 60"
        fill="none"
        strokeWidth="7"
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
/*  App Screens (iOS 26 Liquid Glass Architecture)                    */
/* ------------------------------------------------------------------ */

const PeysApp: React.FC<{ animateIn: boolean }> = () => {
  const [selectedBiller, setSelectedBiller] = useState('Electricity');
  const billers: { label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { label: 'Electricity', icon: Zap },
    { label: 'Mobile', icon: Smartphone },
    { label: 'FASTag', icon: Car },
    { label: 'DTH', icon: Tv },
    { label: 'Gas', icon: Fuel },
    { label: 'Water', icon: Droplets }
  ];

  return (
    <div className="h-full bg-gradient-to-b from-[#070D18] via-[#091122] to-[#060910] text-white px-3.5 pt-[56px] pb-24 overflow-y-auto no-scrollbar select-none">
      {/* App Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-cyan-400 font-medium tracking-wide uppercase">BBPS Powered</span>
            <CheckCircle2 size={11} className="text-cyan-400" />
          </div>
          <div className="text-[13.5px] font-bold text-white tracking-tight">Aditya Vishwakarma</div>
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px] shadow-[0_0_10px_rgba(6,182,212,0.4)] shrink-0">
          <img src="/assets/photo.jpg" alt="User" className="w-full h-full rounded-full object-cover" />
        </div>
      </div>

      {/* Liquid Glass Balance Hero Card */}
      <div className="relative rounded-2xl p-4 bg-gradient-to-br from-slate-900/95 via-[#0c1833]/90 to-[#071124]/95 border border-cyan-500/30 shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Total Active Balance</span>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            AEPS + BBPS
          </span>
        </div>
        <div className="text-[24px] font-bold font-mono text-white mt-1 tracking-tight">₹48,250.75</div>

        {/* Action Grid Pills */}
        <div className="grid grid-cols-4 gap-2 mt-3.5 pt-3 border-t border-white/[0.08]">
          {[
            { label: 'Pay Bills', icon: Receipt },
            { label: 'AEPS Cash', icon: Fingerprint },
            { label: 'Instant DMT', icon: ArrowUpRight },
            { label: 'Scan QR', icon: QrCode }
          ].map((a) => (
            <button
              key={a.label}
              className="flex flex-col items-center gap-1 group cursor-pointer focus:outline-none"
              aria-label={a.label}
            >
              <div className="w-8 h-8 rounded-xl bg-white/[0.08] hover:bg-cyan-500/20 border border-white/10 group-hover:border-cyan-500/40 flex items-center justify-center transition-all">
                <a.icon size={13} className="text-cyan-300" />
              </div>
              <span className="text-[9px] font-medium text-slate-300 group-hover:text-white transition-colors">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bill Payment Categories */}
      <div className="mt-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-300">Quick Utility Pay</span>
          <span className="text-[10px] font-mono text-cyan-400">View All ↗</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {billers.map((b) => {
            const active = selectedBiller === b.label;
            return (
              <button
                key={b.label}
                onClick={() => setSelectedBiller(b.label)}
                className={`flex flex-col items-center gap-1 shrink-0 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  active
                    ? 'bg-cyan-500/20 border-cyan-400/50 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
                }`}
              >
                <b.icon size={13} className={active ? 'text-cyan-300' : 'text-slate-400'} />
                <span className="text-[9px] font-medium">{b.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] p-3 backdrop-blur-xl shadow-md divide-y divide-white/[0.06]">
        <div className="text-[10.5px] font-semibold text-slate-400 pb-1.5 uppercase font-mono tracking-wider">
          Live Transaction Ledger
        </div>
        <TransactionRow icon={Zap} title="Electricity Bill" subtitle="MSEDCL · Mahavitaran" amount="₹1,249" status="Paid" iconWrapClass="bg-cyan-500/20" />
        <TransactionRow icon={Smartphone} title="Mobile Recharge" subtitle="Airtel Unlimited 5G" amount="₹599" status="Success" iconWrapClass="bg-blue-500/20" />
        <TransactionRow icon={Landmark} title="AEPS Cash Withdrawal" subtitle="SBI · Aadhaar Auth" amount="₹2,500" positive status="Settled" iconWrapClass="bg-emerald-500/20" />
      </div>
    </div>
  );
};

const PrFinApp: React.FC<{ animateIn: boolean }> = ({ animateIn }) => {
  const timeline = [
    { label: 'eKYC & Sanction Approved', done: true },
    { label: 'Disbursal Completed to Bank', done: true },
    { label: 'Auto-Debit EMI Active', done: true, current: true },
    { label: 'Final Settlement Scheduled', done: false }
  ];

  return (
    <div className="h-full bg-gradient-to-b from-[#0E0B19] via-[#120F24] to-[#090712] text-white px-3.5 pt-[56px] pb-24 overflow-y-auto no-scrollbar select-none">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] font-mono text-violet-300 uppercase tracking-wider">Institutional Credit</div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
          Tier-1 Prime
        </span>
      </div>

      {/* Radial Gauge Meter */}
      <div className="relative rounded-2xl p-3.5 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-violet-500/25 backdrop-blur-xl shadow-lg">
        <RadialGauge percent={70} accentClass="text-violet-400" animate={animateIn} />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
          <div className="text-[22px] font-bold font-mono text-white tracking-tight">₹3,50,000</div>
          <div className="text-[9.5px] font-mono text-slate-400">Available Credit Line</div>
        </div>
      </div>

      {/* Dual Metric Cards */}
      <div className="grid grid-cols-2 gap-2 mt-2.5">
        <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-2.5">
          <div className="text-[9.5px] text-slate-400 uppercase font-mono">Utilized Limit</div>
          <div className="text-[13.5px] font-bold font-mono text-violet-300 mt-0.5">₹1,50,000</div>
        </div>
        <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-2.5">
          <div className="text-[9.5px] text-slate-400 uppercase font-mono flex items-center gap-1">
            <Calendar size={10} /> Next Repayment
          </div>
          <div className="text-[13.5px] font-bold font-mono text-emerald-400 mt-0.5">₹12,450 · Oct 05</div>
        </div>
      </div>

      {/* Loan Disbursal Pipeline */}
      <div className="mt-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] p-3 backdrop-blur-xl">
        <div className="text-[10.5px] font-semibold text-slate-300 mb-2 font-mono uppercase tracking-wider">
          Disbursal Pipeline
        </div>
        <div className="space-y-0 pl-1">
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
              <div className={`text-[11px] pb-2.5 ${t.done ? 'text-slate-100 font-medium' : 'text-slate-500'}`}>
                {t.label}
              </div>
            </div>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full mt-1 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(124,58,237,0.3)] transition-all cursor-pointer"
        >
          Withdraw to Bank Account <ArrowRight size={12} />
        </motion.button>
      </div>
    </div>
  );
};

const AathifRupayApp: React.FC<{ animateIn: boolean }> = ({ animateIn }) => {
  const metrics = [
    { label: 'Transactions', value: '1,428' },
    { label: 'Success Rate', value: '99.4%' },
    { label: 'Pending', value: '08' },
    { label: 'Settled Vol', value: '₹82.5K' }
  ];
  const services: { label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { label: 'AEPS Cash', icon: Fingerprint },
    { label: 'Instant DMT', icon: ArrowUpRight },
    { label: 'Micro ATM', icon: Landmark },
    { label: 'QR Collect', icon: QrCode }
  ];

  return (
    <div className="h-full bg-gradient-to-b from-[#07130F] via-[#0A1813] to-[#040C09] text-white px-3.5 pt-[56px] pb-24 overflow-y-auto no-scrollbar select-none">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-[9.5px] font-mono text-emerald-400 uppercase tracking-wider">Merchant Terminal #4892</div>
          <div className="text-[20px] font-bold font-mono text-white mt-0.5">₹84,290.00</div>
        </div>
        <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full">
          +14.2% Today
        </span>
      </div>

      {/* 7-Day Sparkline Revenue Chart */}
      <div className="rounded-2xl bg-white/[0.04] border border-emerald-500/20 p-3 flex items-end justify-between backdrop-blur-xl shadow-md">
        <MiniBarChart values={[38, 45, 32, 60, 52, 75, 68]} accentClass="bg-emerald-400" animate={animateIn} />
        <div className="text-right">
          <div className="text-[9px] font-mono text-slate-400 uppercase">Weekly Volume</div>
          <div className="text-[11px] font-bold font-mono text-emerald-300">₹4.82 Lakhs</div>
        </div>
      </div>

      {/* 4 Performance Metric Badges */}
      <div className="grid grid-cols-4 gap-1.5 mt-2.5">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl bg-white/[0.04] border border-white/[0.08] py-2 px-1 text-center">
            <div className="text-[11.5px] font-bold font-mono text-white">{m.value}</div>
            <div className="text-[8px] text-slate-400 mt-0.5 leading-tight uppercase font-mono">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Core Terminal Services */}
      <div className="mt-2.5">
        <div className="grid grid-cols-4 gap-1.5">
          {services.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <s.icon size={13} className="text-emerald-300" />
              </div>
              <span className="text-[8.5px] font-medium text-slate-300">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Settlement Feed */}
      <div className="mt-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] p-3 backdrop-blur-xl shadow-md divide-y divide-white/[0.06]">
        <div className="text-[10px] font-semibold text-slate-400 pb-1.5 uppercase font-mono tracking-wider">
          Real-time Settlements
        </div>
        <TransactionRow icon={Landmark} title="AEPS Biometric Cashout" subtitle="Terminal Auto-credit" amount="₹8,500" positive status="Settled" iconWrapClass="bg-emerald-500/20" />
        <TransactionRow icon={ArrowUpRight} title="DMT Instant Transfer" subtitle="Beneficiary Account" amount="₹12,000" positive status="Settled" iconWrapClass="bg-teal-500/20" />
        <TransactionRow icon={Smartphone} title="Jio 5G Prepaid Plan" subtitle="Commercial Agent Comm" amount="₹399" positive status="Settled" iconWrapClass="bg-slate-500/20" />
      </div>
    </div>
  );
};

const WowPeApp: React.FC<{ animateIn: boolean }> = ({ animateIn }) => (
  <div className="h-full bg-gradient-to-b from-[#180A10] via-[#1A0C14] to-[#0F050A] text-white px-3.5 pt-[56px] pb-24 overflow-y-auto no-scrollbar select-none">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-[10px] font-mono text-rose-400 uppercase tracking-wider">Fast UPI Wallet</div>
        <div className="text-[14px] font-bold text-white">Hey Aditya 👋</div>
      </div>
      <div className="w-7 h-7 rounded-full bg-white/[0.08] border border-rose-500/30 flex items-center justify-center">
        <Bell size={13} className="text-rose-400" />
      </div>
    </div>

    <div className="mt-2.5 rounded-2xl p-3.5 bg-gradient-to-br from-rose-950/80 to-pink-950/80 border border-rose-500/30 backdrop-blur-xl shadow-md">
      <div className="text-[9.5px] font-mono text-rose-300/80 uppercase">Available UPI Balance</div>
      <div className="text-[24px] font-bold font-mono text-white mt-0.5 tracking-tight">₹18,420.50</div>
    </div>

    {/* Unlocked Reward Card */}
    <motion.div
      initial={animateIn ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="mt-2.5 rounded-2xl p-3 bg-gradient-to-r from-rose-600/90 to-pink-600/90 text-white flex items-center justify-between overflow-hidden shadow-lg border border-white/20"
    >
      <div>
        <div className="text-[11.5px] font-bold">₹250 Cashback Unlocked</div>
        <div className="text-[9px] text-rose-100 font-mono mt-0.5">Applies on upcoming Bus / Hotel Booking</div>
      </div>
      <motion.div
        animate={{ rotate: [0, 12, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
      >
        <Gift size={16} className="text-white" />
      </motion.div>
    </motion.div>

    {/* 4 UPI Actions */}
    <div className="grid grid-cols-4 gap-1.5 mt-2.5">
      {[
        { label: 'Pay Contacts', icon: Send },
        { label: 'Scan QR', icon: ScanLine },
        { label: 'Recharge', icon: Smartphone },
        { label: 'Utility Bills', icon: Receipt }
      ].map((a) => (
        <button key={a.label} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/[0.04] border border-white/[0.08]" aria-label={a.label}>
          <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center">
            <a.icon size={13} className="text-rose-300" />
          </div>
          <span className="text-[8.5px] font-medium text-slate-300">{a.label}</span>
        </button>
      ))}
    </div>

    {/* Recent Activity */}
    <div className="mt-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] p-3 backdrop-blur-xl shadow-md divide-y divide-white/[0.06]">
      <div className="text-[10px] font-semibold text-slate-400 pb-1.5 uppercase font-mono tracking-wider">
        Recent Activity
      </div>
      <TransactionRow icon={ArrowDownLeft} title="Received from Rahul" subtitle="UPI Transfer · Axis Bank" amount="₹2,500" positive status="Received" iconWrapClass="bg-emerald-500/20" />
      <TransactionRow icon={Coffee} title="Third Wave Coffee" subtitle="Merchant QR Payment" amount="₹240" status="Paid" iconWrapClass="bg-amber-500/20" />
      <TransactionRow icon={Smartphone} title="Vi Unlimited 5G Plan" subtitle="Prepaid Recharge" amount="₹299" status="Success" iconWrapClass="bg-slate-500/20" />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Dynamic Island (Interactive Spring Pill)                           */
/* ------------------------------------------------------------------ */

const DynamicIsland: React.FC<{ message: string; tone: 'cyan' | 'violet' | 'emerald' | 'rose' }> = ({
  message,
  tone
}) => {
  const [expanded, setExpanded] = useState(false);

  const dotColor =
    tone === 'cyan'
      ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
      : tone === 'violet'
      ? 'bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]'
      : tone === 'emerald'
      ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
      : 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]';

  return (
    <div className="flex justify-center">
      <motion.button
        aria-label={expanded ? 'Collapse dynamic island' : 'Expand dynamic island'}
        onClick={() => setExpanded((e) => !e)}
        animate={{
          width: expanded ? 210 : 92,
          height: expanded ? 30 : 22
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        className="bg-black text-white rounded-full flex items-center justify-between px-2.5 overflow-hidden shadow-md border border-white/[0.1] cursor-pointer focus:outline-none"
      >
        {expanded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.06 }}
            className="flex items-center gap-1.5 w-full justify-between"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className={`w-2 h-2 rounded-full ${dotColor} shrink-0`} />
              <span className="text-[9.5px] font-mono text-white font-medium truncate">{message}</span>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Front Camera Lens Aperture */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#080d1a] ring-1 ring-white/10 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#1e293b]" />
            </div>
            {/* Active Optical Ambient Dot */}
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
          </>
        )}
      </motion.button>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  iOS 26 Liquid Glass App Dock                                      */
/* ------------------------------------------------------------------ */

const AppDock: React.FC<{ activeApp: AppId; onSelect: (id: AppId) => void }> = ({ activeApp, onSelect }) => (
  <div className="px-1.5 py-1 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/[0.14] shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]">
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
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                className="absolute inset-0 rounded-xl bg-white/[0.16] border border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-md"
              />
            )}
            <app.icon size={13} className={active ? 'text-cyan-300' : 'opacity-70'} />
            <span className="text-[9px] font-semibold leading-none tracking-tight relative z-10 font-mono">
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
  enter: (direction: number) => ({ x: direction > 0 ? 30 : -30, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -30 : 30, opacity: 0, scale: 0.98 })
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

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 160, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 160, damping: 22 });
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
      className="relative w-full max-w-[380px] mx-auto py-4 sm:py-6 flex items-center justify-center select-none"
      style={{ perspective: 1400 }}
    >
      {/* Outer Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(6,182,212,0.14),transparent_75%)] pointer-events-none -z-10" />

      {/* Flagship Titanium Phone Chassis (Apple iPhone Pro Curved Profile) */}
      <motion.div
        style={tiltDisabled ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-[275px] min-[380px]:w-[295px] sm:w-[325px] h-[565px] min-[380px]:h-[605px] sm:h-[660px] rounded-[48px] sm:rounded-[52px] p-[8px] sm:p-[9px] bg-gradient-to-b from-[#4A5060] via-[#22252E] to-[#111317] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.85),0_0_40px_rgba(6,182,212,0.12),inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.8)] ring-1 ring-white/20"
      >
        {/* Subtle Chamfer Highlight Ring */}
        <div className="absolute inset-[2px] rounded-[46px] sm:rounded-[50px] border border-white/[0.14] pointer-events-none" />

        {/* Physical Side Buttons */}
        <div className="absolute -left-[4px] top-[110px] w-[4px] h-[24px] bg-gradient-to-r from-slate-400 to-slate-600 rounded-l-sm shadow-[-2px_0_3px_rgba(0,0,0,0.7)]" />
        <div className="absolute -left-[4px] top-[145px] w-[4px] h-[44px] bg-gradient-to-r from-slate-400 to-slate-600 rounded-l-sm shadow-[-2px_0_3px_rgba(0,0,0,0.7)]" />
        <div className="absolute -left-[4px] top-[198px] w-[4px] h-[44px] bg-gradient-to-r from-slate-400 to-slate-600 rounded-l-sm shadow-[-2px_0_3px_rgba(0,0,0,0.7)]" />
        <div className="absolute -right-[4px] top-[160px] w-[4px] h-[66px] bg-gradient-to-l from-slate-400 to-slate-600 rounded-r-sm shadow-[2px_0_3px_rgba(0,0,0,0.7)]" />
        <div className="absolute -right-[3.5px] top-[242px] w-[3.5px] h-[34px] bg-gradient-to-l from-slate-500 to-slate-700 rounded-r-sm opacity-90 shadow-[1px_0_2px_rgba(0,0,0,0.6)]" />

        {/* Antenna Insulation Bands */}
        <div className="absolute -left-[1px] top-20 w-[2px] h-[3px] bg-slate-600/80" />
        <div className="absolute -left-[1px] bottom-20 w-[2px] h-[3px] bg-slate-600/80" />
        <div className="absolute -right-[1px] top-20 w-[2px] h-[3px] bg-slate-600/80" />
        <div className="absolute -right-[1px] bottom-20 w-[2px] h-[3px] bg-slate-600/80" />

        {/* Inner OLED Bezel & Screen (Concentric Edge-to-Edge) */}
        <div className="relative w-full h-full rounded-[43px] sm:rounded-[46px] p-[2.5px] bg-black overflow-hidden shadow-inner flex flex-col">
          {/* Earpiece Speaker Slot */}
          <div className="absolute top-[2.5px] left-1/2 -translate-x-1/2 w-10 h-[2.5px] bg-[#1a1a1a] rounded-full z-40 border border-white/5" />

          {/* Active Screen Display */}
          <div className="relative w-full h-full rounded-[41px] sm:rounded-[44px] overflow-hidden bg-black flex flex-col">
            {/* Specular glass glare sheen */}
            {!tiltDisabled && (
              <motion.div
                className="pointer-events-none absolute inset-0 z-40 opacity-[0.08] bg-gradient-to-tr from-transparent via-white to-transparent"
                style={{
                  left: glareX,
                  top: glareY,
                  transform: 'rotate(-20deg) translate(-40%,-40%)',
                  width: '160%',
                  height: '160%'
                }}
              />
            )}

            {/* Status Bar Ambient Scrim (keeps clock & dynamic island legible during scroll) */}
            <div className="absolute top-0 left-0 right-0 h-14 z-20 pointer-events-none bg-gradient-to-b from-black/85 via-black/40 to-transparent" />

            {/* Edge-to-Edge Status Bar & Dynamic Island */}
            <div className="absolute top-0 left-0 right-0 z-30 pt-2.5 px-6 pointer-events-none text-white">
              <div className="flex justify-between items-center text-[10.5px] font-semibold tracking-tight">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <Wifi size={11} />
                  <span className="text-[9px] font-bold font-mono">5G</span>
                  <BatteryFull size={13} />
                </div>
              </div>

              {/* Centered Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-auto">
                <DynamicIsland message={meta.islandMessage} tone={meta.islandTone} />
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
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0"
                >
                  {activeApp === 'peys' && <PeysApp animateIn={hasEntered} />}
                  {activeApp === 'prfin' && <PrFinApp animateIn={hasEntered} />}
                  {activeApp === 'aathif' && <AathifRupayApp animateIn={hasEntered} />}
                  {activeApp === 'wowpe' && <WowPeApp animateIn={hasEntered} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating iOS 26 Liquid Glass Dock & Gesture Indicator */}
            <div className="absolute bottom-2 left-2.5 right-2.5 z-30 pointer-events-auto">
              <AppDock activeApp={activeApp} onSelect={handleSelect} />

              {/* iOS Home Gesture Indicator */}
              <div className="pt-1.5 pb-0.5 flex justify-center">
                <div className="w-24 h-[3px] bg-white/40 rounded-full" />
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