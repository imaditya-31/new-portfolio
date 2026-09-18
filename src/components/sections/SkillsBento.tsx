import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Cpu,
  CreditCard,
  Cloud,
  GitBranch,
  Layers,
  Sparkles,
  CheckCircle2,
  Fingerprint,
  Receipt,
  ArrowLeftRight,
  QrCode,
  Plane,
  Wallet,
  Blocks,
  Workflow,
  LayoutGrid,
  Network
} from 'lucide-react';
import {
  SiFlutter,
  SiDart,
  SiKotlin,
  SiAndroid,
  SiApple,
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiMysql,
  SiMongodb,
  SiFigma,
  SiFirebase,
  SiGooglecloud,
  SiPostman,
  SiSwagger,
  SiJira,
  SiGit,
  SiAndroidstudio,
  SiXcode,
  SiGoogleplay,
  SiAppstore,
  SiSocketdotio,
  SiGetx
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { skillCategories } from '../../data/skills';

// Custom high-fidelity brand SVGs for technologies without simple-icon entries
const BlocIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2.5L3.5 7.5V16.5L12 21.5L20.5 16.5V7.5L12 2.5Z" fill="#02569B" fillOpacity="0.25" stroke="#00D2B4" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M12 2.5L20.5 7.5L12 12.5L3.5 7.5L12 2.5Z" fill="#00D2B4" fillOpacity="0.35" stroke="#00D2B4" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M12 12.5V21.5" stroke="#00D2B4" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 12.5L20.5 7.5" stroke="#00D2B4" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 12.5L3.5 7.5" stroke="#00D2B4" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CubitIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 3L4 7.6V16.4L12 21L20 16.4V7.6L12 3Z" stroke="#29B6F6" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3.2" fill="#29B6F6" />
  </svg>
);

const CleanArchIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="9" stroke="#06B6D4" strokeWidth="1.6" strokeDasharray="3 2" />
    <circle cx="12" cy="12" r="6" stroke="#06B6D4" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="2.8" fill="#06B6D4" />
  </svg>
);

const DioIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="4" width="18" height="16" rx="4" stroke="#0175C2" strokeWidth="1.8" />
    <path d="M7 12H17M13 8L17 12L13 16" stroke="#0175C2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SkillsBento: React.FC = () => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'languages-frameworks':
        return <Code2 size={18} className="text-cyan-600 dark:text-cyan-400" />;
      case 'state-architecture':
        return <Cpu size={18} className="text-indigo-600 dark:text-indigo-400" />;
      case 'backend-api-cloud':
        return <Cloud size={18} className="text-blue-600 dark:text-blue-400" />;
      case 'fintech':
        return <CreditCard size={18} className="text-emerald-600 dark:text-emerald-400" />;
      case 'development-release':
        return <GitBranch size={18} className="text-rose-600 dark:text-rose-400" />;
      case 'additional':
        return <Layers size={18} className="text-purple-600 dark:text-purple-400" />;
      default:
        return <Sparkles size={18} className="text-cyan-600 dark:text-cyan-400" />;
    }
  };

  const getAccentBorder = (id: string) => {
    switch (id) {
      case 'languages-frameworks':
        return 'group-hover:border-cyan-500/40';
      case 'state-architecture':
        return 'group-hover:border-indigo-500/40';
      case 'backend-api-cloud':
        return 'group-hover:border-blue-500/40';
      case 'fintech':
        return 'group-hover:border-emerald-500/40';
      case 'development-release':
        return 'group-hover:border-rose-500/40';
      case 'additional':
        return 'group-hover:border-purple-500/40';
      default:
        return 'group-hover:border-cyan-500/40';
    }
  };

  // Maps each technology skill string to its official brand logo / high-fidelity icon
  const getTechLogo = (skill: string) => {
    switch (skill) {
      // Languages & Frameworks
      case 'Flutter':
        return <SiFlutter className="text-[#02569B] dark:text-[#54C5F8]" size={16} />;
      case 'Dart':
        return <SiDart className="text-[#0175C2] dark:text-[#00B4AB]" size={15} />;
      case 'Java':
        return <FaJava className="text-[#ED8B00] dark:text-[#FFA826]" size={16} />;
      case 'Kotlin':
        return <SiKotlin className="text-[#7F52FF] dark:text-[#A97BFF]" size={15} />;
      case 'Android':
        return <SiAndroid className="text-[#3DDC84]" size={16} />;
      case 'iOS':
        return <SiApple className="text-slate-900 dark:text-white" size={16} />;

      // State Management & Architecture
      case 'GetX':
        return <SiGetx className="text-[#8B5CF6] dark:text-[#A78BFA]" size={16} />;
      case 'BLoC':
        return <BlocIcon />;
      case 'Cubit':
        return <CubitIcon />;
      case 'MVC':
        return <LayoutGrid className="text-indigo-500 dark:text-indigo-400" size={15} />;
      case 'Clean Architecture':
        return <CleanArchIcon />;
      case 'Dependency Injection':
        return <Workflow className="text-pink-500 dark:text-pink-400" size={15} />;

      // Backend, API, & Cloud
      case 'REST APIs':
        return <Network className="text-sky-500 dark:text-sky-400" size={15} />;
      case 'WebSockets':
        return <SiSocketdotio className="text-slate-900 dark:text-slate-200" size={15} />;
      case 'Dio':
        return <DioIcon />;
      case 'Firebase (Auth, Cloud Messaging)':
        return <SiFirebase className="text-[#FFCA28]" size={16} />;
      case 'Google Cloud Platform':
        return <SiGooglecloud className="text-[#4285F4]" size={16} />;

      // Fintech
      case 'AEPS':
        return <Fingerprint className="text-emerald-600 dark:text-emerald-400" size={16} />;
      case 'BBPS':
        return <Receipt className="text-blue-600 dark:text-blue-400" size={16} />;
      case 'DMT':
        return <ArrowLeftRight className="text-violet-600 dark:text-violet-400" size={15} />;
      case 'QR Codes':
        return <QrCode className="text-cyan-600 dark:text-cyan-400" size={15} />;
      case 'Payment Gateway Integration':
        return <CreditCard className="text-amber-600 dark:text-amber-400" size={15} />;
      case 'Travel bookings':
        return <Plane className="text-rose-500 dark:text-rose-400" size={15} />;
      case 'Wallet Flows':
        return <Wallet className="text-emerald-600 dark:text-emerald-400" size={15} />;
      case 'Native SDK Integration':
        return <Blocks className="text-indigo-600 dark:text-indigo-400" size={15} />;

      // Development & Release
      case 'Git Version Control (Git, GitHub, GitLab, Bitbucket)':
        return <SiGit className="text-[#F05032]" size={16} />;
      case 'Android Studio':
        return <SiAndroidstudio className="text-[#3DDC84]" size={16} />;
      case 'Xcode':
        return <SiXcode className="text-[#1575F9]" size={16} />;
      case 'Firebase Crashlytics':
        return <SiFirebase className="text-[#FFA000]" size={16} />;
      case 'Google Play Console':
        return <SiGoogleplay className="text-[#0086F8]" size={15} />;
      case 'App Store Connect':
        return <SiAppstore className="text-[#0D96F6]" size={15} />;
      case 'Postman':
        return <SiPostman className="text-[#FF6C37]" size={16} />;
      case 'Swagger':
        return <SiSwagger className="text-[#85EA2D]" size={16} />;
      case 'Jira':
        return <SiJira className="text-[#0052CC] dark:text-[#2684FF]" size={15} />;

      // Additional
      case 'React':
        return <SiReact className="text-[#61DAFB]" size={16} />;
      case 'JavaScript':
        return <SiJavascript className="text-[#F7DF1E] bg-slate-900 rounded-[2px]" size={15} />;
      case 'Node.js':
        return <SiNodedotjs className="text-[#5FA04E]" size={16} />;
      case 'MySQL':
        return <SiMysql className="text-[#4479A1] dark:text-[#00758F]" size={16} />;
      case 'MongoDB Atlas':
        return <SiMongodb className="text-[#47A248]" size={16} />;
      case 'Figma':
        return <SiFigma className="text-[#F24E1E]" size={15} />;

      default:
        return <Sparkles className="text-cyan-500" size={15} />;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-[#07090E]/80 border-t border-slate-200/80 dark:border-white/[0.06]">
      <div className="container-custom relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-sm">
            <Sparkles size={13} className="text-cyan-600 dark:text-cyan-400" />
            <span>03 // Technical Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical Skills &amp; Capabilities
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
            Production-proven technologies, state architectures, fintech protocols, and developer toolchains.
          </p>
        </div>

        {/* Master Technical Capabilities Matrix (Executive Ledger Layout) */}
        <div className="rounded-3xl bg-white/80 dark:bg-[#0D121D]/75 backdrop-blur-xl border border-slate-200/90 dark:border-white/[0.08] shadow-sm divide-y divide-slate-200/80 dark:divide-white/[0.07] overflow-hidden">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8 hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors group ${getAccentBorder(category.id)}`}
            >
              {/* Left Column: Category Metadata (32% width on desktop) */}
              <div className="lg:w-[32%] flex-shrink-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                    {getCategoryIcon(category.id)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold block">
                      Category {category.index}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      {category.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-sm">
                  {category.subtitle}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-white/[0.06]">
                    {category.skills.length} Technologies
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Skill Tokens with Authentic Logos (68% width on desktop) */}
              <div className="lg:w-[68%] flex-1">
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.03, y: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-100/90 dark:bg-white/[0.04] text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-white/[0.08] hover:border-slate-400/50 dark:hover:border-white/20 hover:bg-slate-200/60 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white transition-all duration-200 shadow-sm cursor-default flex items-center gap-2.5 select-none"
                    >
                      <span className="flex-shrink-0 flex items-center justify-center w-5 h-5">
                        {getTechLogo(skill)}
                      </span>
                      <span className="font-mono">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Capabilities Summary Footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-slate-100/60 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] text-xs font-mono text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-500" />
            <span>Clean Architecture &amp; BLoC Standard Across Production Apps</span>
          </div>
          <span className="text-slate-500">
            6 Specialized Domains • 38 Production Technologies &amp; Protocols
          </span>
        </div>
      </div>
    </section>
  );
};

export default SkillsBento;
