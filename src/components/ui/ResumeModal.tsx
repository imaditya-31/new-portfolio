import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, Mail, Phone, MapPin, ExternalLink, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 25 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-white/[0.15] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-6 sm:p-10 z-10 text-slate-800 dark:text-slate-100"
        >
          {/* Action Toolbar Header */}
          <div className="sticky -top-6 -mx-6 -mt-6 sm:-top-10 sm:-mx-10 sm:-mt-10 p-4 sm:px-10 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3 z-30 mb-8 rounded-t-3xl">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <FileText size={18} />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">
                  Interactive CV
                </span>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Aditya Vishwakarma</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-xs font-mono font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/[0.1] transition-colors cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer size={14} />
                <span>Print / Save PDF</span>
              </button>

              <a
                href="/assets/resume.pdf"
                download="Aditya_Vishwakarma_Resume.pdf"
                className="inline-flex"
              >
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Download size={14} />}
                >
                  Download Original PDF
                </Button>
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer ml-1"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* CODE GENERATED RESUME BODY */}
          <div id="printable-resume" className="space-y-8 print:text-black">
            {/* Resume Header */}
            <div className="border-b border-slate-200 dark:border-white/[0.1] pb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  ADITYA VISHWAKARMA
                </h2>
                <Badge variant="cyan" dot>Flutter &amp; Mobile Engineer</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 mt-3">
                <a href="mailto:adityavishwakarma355@gmail.com" className="hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1">
                  <Mail size={13} /> adityavishwakarma355@gmail.com
                </a>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <a href="tel:+919657312456" className="hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1">
                  <Phone size={13} /> +91 9657312456
                </a>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <MapPin size={13} /> Pune, Maharashtra, India
                </span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <a href="https://www.linkedin.com/in/aditya-vishwakarma-0903a01b5" target="_blank" rel="noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 underline">
                  LinkedIn
                </a>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <a href="https://github.com/imaditya-31" target="_blank" rel="noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 underline">
                  GitHub
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h3 className="text-xs uppercase font-mono tracking-widest text-cyan-600 dark:text-cyan-400 font-bold mb-2.5 flex items-center gap-1.5">
                <Sparkles size={13} /> PROFESSIONAL SUMMARY
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-white/[0.02] p-4 rounded-2xl border border-slate-200 dark:border-white/[0.06]">
                Flutter Developer with <strong>2+ years of experience</strong> building and maintaining production mobile applications across fintech, BBPS, digital lending, B2B, and B2C domains. Strong expertise in <strong>Flutter, Dart, BLoC, Cubit, GetX, Clean Architecture, REST APIs, Firebase</strong>, payment integrations, and Android/iOS deployments. Experienced in production debugging, crash resolution (reducing incidents from 20k to &lt;500), native Android integration, and end-to-end application development and release management.
              </p>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-xs uppercase font-mono tracking-widest text-cyan-600 dark:text-cyan-400 font-bold mb-3 flex items-center gap-1.5">
                <Sparkles size={13} /> TECHNICAL SKILLS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                  <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mb-1">Languages &amp; Frameworks:</div>
                  <div className="text-slate-600 dark:text-slate-400">Flutter, Dart, Java, Kotlin, Android Native, iOS Integration</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                  <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mb-1">State Management &amp; Architecture:</div>
                  <div className="text-slate-600 dark:text-slate-400">BLoC, Cubit, GetX, Clean Architecture, MVC, Dependency Injection</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                  <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mb-1">Fintech &amp; Payments:</div>
                  <div className="text-slate-600 dark:text-slate-400">AEPS, BBPS, DMT, QR Codes, Payment Gateway SDKs, Wallet Flows</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                  <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mb-1">Backend, Cloud &amp; Release:</div>
                  <div className="text-slate-600 dark:text-slate-400">REST APIs, Dio, WebSockets, Firebase (FCM, Crashlytics), Google Cloud, Play Console, App Store Connect</div>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div>
              <h3 className="text-xs uppercase font-mono tracking-widest text-cyan-600 dark:text-cyan-400 font-bold mb-4 flex items-center gap-1.5">
                <Sparkles size={13} /> WORK EXPERIENCE
              </h3>

              <div className="space-y-6">
                {/* Job 1 */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-base text-slate-900 dark:text-white">MOBILE APP DEVELOPER</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-medium"> | SP TRANSACTION HUB TECHNOLOGIES PVT. LTD.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Apr 2026 – Present</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside leading-relaxed">
                    <li>Responsible for end-to-end development of two Flutter apps: a BBPS payment application and a digital lending application.</li>
                    <li>Lead application architecture, project configuration, feature development, REST API integration, debugging, testing support, and release preparation.</li>
                    <li>Develop BBPS workflows covering biller discovery, dynamic forms, plan retrieval, bill validation, wallet and gateway payments, and transaction tracking.</li>
                    <li>Architect the lending application using BLoC, clean architecture, dependency injection, secure storage, reusable components, and guarded routing.</li>
                    <li>Configure Firebase, Google Cloud, Android and iOS environments, signing credentials, Google Play Console, and App Store Connect.</li>
                  </ul>
                </div>

                {/* Job 2 */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-base text-slate-900 dark:text-white">FLUTTER DEVELOPER</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-medium"> | WEBPLAT TECHNOLOGIES PVT. LTD.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Nov 2025 – Apr 2026</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside leading-relaxed">
                    <li>Developed and maintained more than five production Flutter applications across B2B, B2C, and payment-based domains.</li>
                    <li>Systematically debugged and resolved 200+ issues across UI, business logic, REST APIs, Gradle, and native Android layers.</li>
                    <li>Developed notifications, payment, transaction, and reporting modules for multiple client configurations using flavors.</li>
                    <li>Monitored crashes and ANRs using Firebase Crashlytics and Google Play Console and implemented stability improvements, reducing crashes from ~20,000 to &lt;500.</li>
                    <li>Integrated a Java-based custom payment gateway SDK and supported Android and iOS production releases.</li>
                  </ul>
                </div>

                {/* Job 3 */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-base text-slate-900 dark:text-white">SOFTWARE ENGINEER</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-medium"> | TECHRIIGOUR IT SOLUTIONS PVT. LTD.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Jun 2024 – Nov 2025</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside leading-relaxed">
                    <li>Promoted from Intern to Software Engineer based on consistent performance and ownership.</li>
                    <li>Built and maintained production Flutter applications following the MVC architecture pattern using GetX state management, REST APIs, and Firebase services.</li>
                    <li>Implemented authentication, push notifications, and real-time chat features using Firebase services.</li>
                    <li>Contributed to core application modules and supported production releases by systematically debugging and resolving post-deployment bottlenecks.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xs uppercase font-mono tracking-widest text-cyan-600 dark:text-cyan-400 font-bold mb-3 flex items-center gap-1.5">
                <Sparkles size={13} /> EDUCATION
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">Master of Computer Science (MCS)</div>
                    <div className="text-slate-500 dark:text-slate-400">Pratibha College of Commerce &amp; Computer Studies, Pune</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-cyan-600 dark:text-cyan-300 font-bold">CGPA: 9.00</div>
                    <div className="text-slate-500 dark:text-slate-400">2025</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">Bachelor of Computer Science (BCS)</div>
                    <div className="text-slate-500 dark:text-slate-400">Pratibha College of Commerce &amp; Computer Studies, Pune</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-cyan-600 dark:text-cyan-300 font-bold">CGPA: 9.18</div>
                    <div className="text-slate-500 dark:text-slate-400">2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
