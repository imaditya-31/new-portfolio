import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Printer,
  FileText,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Button from './Button';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeSheet, setActiveSheet] = useState<1 | 2>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'visible';
    window.print();
    setTimeout(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      }
    }, 500);
  };

  const scrollToPage = (pageNumber: 1 | 2) => {
    setActiveSheet(pageNumber);
    const element = document.getElementById(`resume-page-${pageNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="resume-modal-portal fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="resume-modal-backdrop fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer z-0"
          />

          {/* Modal Sheet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 25 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="resume-modal-sheet relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-100 dark:bg-[#070A10] border border-slate-200 dark:border-white/[0.12] rounded-3xl shadow-2xl p-3 sm:p-6 md:p-8 z-10 text-slate-900 dark:text-slate-100 no-scrollbar"
          >
            {/* Sticky Action Toolbar Header */}
            <div className="resume-modal-toolbar sticky -top-3 -mx-3 -mt-3 sm:-top-6 sm:-mx-6 sm:-mt-6 md:-top-8 md:-mx-8 md:-mt-8 p-3.5 sm:px-8 bg-white/95 dark:bg-[#0E131F]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3 z-30 mb-6 rounded-t-3xl shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shadow-sm">
                  <FileText size={17} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">
                      Verified Curriculum Vitae
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                      2 Pages
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Aditya Vishwakarma</div>
                </div>
              </div>

              {/* Page Navigator Quick Pills */}
              <div className="resume-screen-only hidden md:flex items-center gap-1 bg-slate-100 dark:bg-white/[0.04] p-1 rounded-full border border-slate-200 dark:border-white/[0.08]">
                <button
                  onClick={() => scrollToPage(1)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                    activeSheet === 1
                      ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  Page 1 (Summary &amp; Exp)
                </button>
                <button
                  onClick={() => scrollToPage(2)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                    activeSheet === 2
                      ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  Page 2 (Projects &amp; Edu)
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-xs font-mono font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/[0.1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  title="Print or Save as exact 2-Page PDF"
                >
                  <Printer size={13} />
                  <span>Print / Save PDF</span>
                </button>

                <a
                  href="/assets/resume.pdf"
                  download="Aditya_Vishwakarma_Resume.pdf"
                  className="inline-flex"
                >
                  <Button variant="primary" size="sm" icon={<Download size={13} />}>
                    Download Original PDF
                  </Button>
                </a>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  aria-label="Close modal"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* PRINTABLE RESUME CONTAINER (STRICT 2-PAGE ENGINE) */}
            <div id="printable-resume-container" className="space-y-6 print:space-y-0">
              {/* ========================================================================= */}
              {/* PAGE 1: Header, Summary, Skills, Work Experience, Projects (First 3)      */}
              {/* ========================================================================= */}
              <div
                id="resume-page-1"
                className="resume-sheet resume-sheet-page-1 bg-white dark:bg-[#0C101C] rounded-2xl border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 md:p-10 shadow-sm dark:shadow-2xl relative mb-6 print:mb-0 print:border-none print:shadow-none print:p-0"
              >
                {/* Page indicator in screen view */}
                <div className="resume-screen-only absolute top-4 right-6 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                  PAGE 1 OF 2
                </div>

                {/* Header */}
                <div className="text-center pb-4 border-b border-slate-900 dark:border-white/20 print:border-slate-900">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white print:text-black uppercase">
                    ADITYA VISHWAKARMA
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-300 print:text-slate-800 mt-2 font-normal">
                    <a
                      href="mailto:adityavishwakarma355@gmail.com"
                      className="hover:text-cyan-600 dark:hover:text-cyan-400 print:text-black underline underline-offset-2"
                    >
                      adityavishwakarma355@gmail.com
                    </a>
                    <span className="text-slate-400 print:text-slate-500">|</span>
                    <a
                      href="tel:+919657312456"
                      className="hover:text-cyan-600 dark:hover:text-cyan-400 print:text-black underline underline-offset-2"
                    >
                      +91 9657312456
                    </a>
                    <span className="text-slate-400 print:text-slate-500">|</span>
                    <a
                      href="https://www.linkedin.com/in/aditya-vishwakarma-0903a01b5"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-cyan-600 dark:hover:text-cyan-400 print:text-black underline underline-offset-2 font-medium"
                    >
                      LinkedIn
                    </a>
                    <span className="text-slate-400 print:text-slate-500">|</span>
                    <a
                      href="https://github.com/imaditya-31"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-cyan-600 dark:hover:text-cyan-400 print:text-black underline underline-offset-2 font-medium"
                    >
                      GitHub
                    </a>
                    <span className="text-slate-400 print:text-slate-500">|</span>
                    <span className="print:text-black">Pune, Maharashtra, India</span>
                  </div>
                </div>

                {/* PROFESSIONAL SUMMARY */}
                <div className="resume-section mt-4 print:mt-3">
                  <div className="resume-heading border-b border-slate-900 dark:border-white/20 pb-0.5 mb-2">
                    <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black">
                      PROFESSIONAL SUMMARY
                    </h2>
                  </div>
                  <p className="text-xs sm:text-[12px] text-slate-700 dark:text-slate-300 print:text-black leading-relaxed text-justify">
                    Flutter Developer with 2+ years of experience building and maintaining production mobile applications across fintech, BBPS, digital lending, B2B, and B2C domains. Strong expertise in Flutter, Dart, BLoC, Cubit, GetX, Clean Architecture, REST APIs, Firebase, payment integrations, and Android/iOS deployments. Experienced in production debugging, crash resolution, native Android integration, and end-to-end application development and release management.
                  </p>
                </div>

                {/* TECHNICAL SKILLS */}
                <div className="resume-section mt-4 print:mt-3">
                  <div className="resume-heading border-b border-slate-900 dark:border-white/20 pb-0.5 mb-2">
                    <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black">
                      TECHNICAL SKILLS
                    </h2>
                  </div>
                  <ul className="space-y-1 text-xs sm:text-[11.5px] text-slate-700 dark:text-slate-300 print:text-black leading-snug">
                    <li className="flex items-start">
                      <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white print:text-black">Languages &amp; Frameworks:</strong> Flutter, Dart, Java, Kotlin, Android, iOS
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white print:text-black">State Management &amp; Architecture:</strong> GetX, BLoC, Cubit, MVC, Clean Architecture, Dependency Injection
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white print:text-black">Backend, API, &amp; Cloud:</strong> REST APIs, WebSockets, Dio, Firebase (Auth, Cloud Messaging), Google Cloud Platform
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white print:text-black">Fintech:</strong> AEPS, BBPS, DMT, QR Codes, Payment Gateway Integration, Travel bookings, Wallet Flows, Native SDK Integration.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white print:text-black">Development &amp; Release:</strong> Git Version Control (Git, GitHub, GitLab, Bitbucket), Android Studio, Xcode, Firebase Crashlytics, Google Play Console, App Store Connect, Postman, Swagger, Jira
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white print:text-black">Additional:</strong> React, JavaScript, Node.js, MySQL, MongoDB Atlas, Figma
                      </div>
                    </li>
                  </ul>
                </div>

                {/* WORK EXPERIENCE */}
                <div className="resume-section mt-4 print:mt-3">
                  <div className="resume-heading border-b border-slate-900 dark:border-white/20 pb-0.5 mb-2.5">
                    <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black">
                      WORK EXPERIENCE
                    </h2>
                  </div>

                  {/* Job 1 */}
                  <div className="resume-entry mb-3 print:mb-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <div className="text-xs sm:text-[12px] font-bold text-slate-900 dark:text-white print:text-black">
                        MOBILE APP DEVELOPER <span className="font-normal text-slate-600 dark:text-slate-400 print:text-black">| SP TRANSACTION HUB TECHNOLOGIES PVT. LTD.</span>
                      </div>
                      <div className="text-xs sm:text-[11.5px] font-medium text-slate-600 dark:text-slate-400 print:text-black whitespace-nowrap">
                        Apr 2026 – Present
                      </div>
                    </div>
                    <ul className="space-y-0.5 text-xs sm:text-[11.5px] text-slate-700 dark:text-slate-300 print:text-black leading-snug">
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Responsible for end-to-end development of two Flutter apps: a BBPS payment application and a digital lending application.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Lead application architecture, project configuration, feature development, REST API integration, debugging, testing support, and release preparation.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Develop BBPS workflows covering biller discovery, dynamic forms, plan retrieval, bill validation, wallet and gateway payments, and transaction tracking.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Architect the lending application using BLoC, clean architecture, dependency injection, secure storage, reusable components, and guarded routing.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Configure Firebase, Google Cloud, Android and iOS environments, signing credentials, Google Play Console, and App Store Connect.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div className="resume-entry mb-3 print:mb-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <div className="text-xs sm:text-[12px] font-bold text-slate-900 dark:text-white print:text-black">
                        FLUTTER DEVELOPER <span className="font-normal text-slate-600 dark:text-slate-400 print:text-black">| WEBPLAT TECHNOLOGIES PVT. LTD.</span>
                      </div>
                      <div className="text-xs sm:text-[11.5px] font-medium text-slate-600 dark:text-slate-400 print:text-black whitespace-nowrap">
                        Nov 2025 – Apr 2026
                      </div>
                    </div>
                    <ul className="space-y-0.5 text-xs sm:text-[11.5px] text-slate-700 dark:text-slate-300 print:text-black leading-snug">
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Developed and maintained more than five production Flutter applications across B2B, B2C, and payment-based domains.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Systematically debugged and resolved 200+ issues across UI, business logic, REST APIs, Gradle, and native Android layers.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Developed notifications, payment, transaction, and reporting modules for multiple client configurations using flavors.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Monitored crashes and ANRs using Firebase Crashlytics and Google Play Console and implemented stability and performance improvements.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Integrated a Java-based custom payment gateway SDK and supported Android and iOS production releases.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Job 3 */}
                  <div className="resume-entry mb-3 print:mb-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <div className="text-xs sm:text-[12px] font-bold text-slate-900 dark:text-white print:text-black">
                        SOFTWARE ENGINEER <span className="font-normal text-slate-600 dark:text-slate-400 print:text-black">| TECHRIIGOUR IT SOLUTIONS PVT. LTD.</span>
                      </div>
                      <div className="text-xs sm:text-[11.5px] font-medium text-slate-600 dark:text-slate-400 print:text-black whitespace-nowrap">
                        Jun 2024 – Nov 2025
                      </div>
                    </div>
                    <ul className="space-y-0.5 text-xs sm:text-[11.5px] text-slate-700 dark:text-slate-300 print:text-black leading-snug">
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Promoted from Intern to Software Engineer based on consistent performance and ownership.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Built and maintained production Flutter applications following the MVC architecture pattern using GetX state management, REST APIs, and Firebase services.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Implemented authentication, push notifications, and real-time chat features using Firebase services.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Contributed to core application modules and supported production releases by systematically debugging and resolving post-deployment issues and performance bottlenecks.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* PROJECTS (Part 1 on Page 1) */}
                <div className="resume-section mt-4 print:mt-3">
                  <div className="resume-heading border-b border-slate-900 dark:border-white/20 pb-0.5 mb-2.5">
                    <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black">
                      PROJECTS
                    </h2>
                  </div>

                  {/* Project 1 */}
                  <div className="resume-entry mb-2.5 print:mb-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-0.5">
                      <div className="text-xs sm:text-[12px] font-bold text-slate-900 dark:text-white print:text-black">
                        PEYS APP <span className="font-normal text-slate-600 dark:text-slate-400 print:text-black">| SP TRANSACTION HUB TECHNOLOGIES PVT LTD</span>
                      </div>
                      <div className="text-xs sm:text-[11px] font-medium text-slate-600 dark:text-slate-400 print:text-black italic">
                        In Development
                      </div>
                    </div>
                    <ul className="space-y-0.5 text-xs sm:text-[11.5px] text-slate-700 dark:text-slate-300 print:text-black leading-snug">
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Developing a complete Flutter-based BBPS application covering biller selection, service-specific dynamic forms, plan discovery, bill fetching, validation, payments, wallet handling, and transaction tracking.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Responsible for Flutter architecture, API integration, Firebase and cloud configuration, Android and iOS setup, reusable components, testing support, and deployment preparation.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Project 2 */}
                  <div className="resume-entry mb-2.5 print:mb-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-0.5">
                      <div className="text-xs sm:text-[12px] font-bold text-slate-900 dark:text-white print:text-black">
                        PR FIN HUB APP <span className="font-normal text-slate-600 dark:text-slate-400 print:text-black">| SP TRANSACTION HUB TECHNOLOGIES PVT LTD</span>
                      </div>
                      <div className="text-xs sm:text-[11px] font-medium text-slate-600 dark:text-slate-400 print:text-black italic">
                        In Development
                      </div>
                    </div>
                    <ul className="space-y-0.5 text-xs sm:text-[11.5px] text-slate-700 dark:text-slate-300 print:text-black leading-snug">
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Architecting and developing a scalable Flutter lending application using BLoC, clean architecture, dependency injection, secure storage, structured networking, and guarded routing.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Building a reusable foundation for authentication, onboarding, application workflows, document handling, permissions, themes, common components, and environment configuration.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Project 3 */}
                  <div className="resume-entry mb-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-0.5">
                      <div className="text-xs sm:text-[12px] font-bold text-slate-900 dark:text-white print:text-black">
                        WOWPE APP <span className="font-normal text-slate-600 dark:text-slate-400 print:text-black">| WEBPLAT TECHNOLOGIES PVT LTD</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs sm:text-[11px] font-medium text-slate-600 dark:text-slate-400 print:text-black">
                        <span>App Store &amp; Play Store</span>
                        <a
                          href="https://play.google.com/store"
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-600 dark:text-cyan-400 print:text-black underline font-medium hover:text-cyan-700 inline-flex items-center gap-0.5"
                        >
                          Link
                          <ExternalLink size={10} className="resume-screen-only" />
                        </a>
                      </div>
                    </div>
                    <ul className="space-y-0.5 text-xs sm:text-[11.5px] text-slate-700 dark:text-slate-300 print:text-black leading-snug">
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Resolved 50+ production issues related to UI and logical flows and stabilized critical user journeys in a live Flutter application.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Owned and developed the complete notifications flow, supporting promotional images, dynamic sounds, channels, and multiple client configurations.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Document Sheet Break Divider (Screen Mode Only) */}
              <div className="resume-screen-only flex items-center justify-center my-4">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/80 dark:bg-white/[0.06] border border-slate-300 dark:border-white/[0.1] text-xs font-mono text-slate-600 dark:text-slate-300">
                  <span>Page 1 of 2 Complete</span>
                  <span className="text-slate-400">•</span>
                  <span>Page 2 Below</span>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* PAGE 2: Projects (Continued: AathifRupay, S3Lifestyle, Portfolio) & Edu    */}
              {/* ========================================================================= */}
              <div
                id="resume-page-2"
                className="resume-sheet resume-sheet-page-2 bg-white dark:bg-[#0C101C] rounded-2xl border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 md:p-10 shadow-sm dark:shadow-2xl relative print:border-none print:shadow-none print:p-0"
              >
                {/* Page indicator in screen view */}
                <div className="resume-screen-only absolute top-4 right-6 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                  PAGE 2 OF 2
                </div>

                {/* PROJECTS (Continuation on Page 2) */}
                <div className="resume-section">
                  {/* Project 4 */}
                  <div className="resume-entry mb-3.5 print:mb-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-0.5">
                      <div className="text-xs sm:text-[12px] font-bold text-slate-900 dark:text-white print:text-black">
                        AATHIFRUPAY APP <span className="font-normal text-slate-600 dark:text-slate-400 print:text-black">| WEBPLAT TECHNOLOGIES PVT LTD</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs sm:text-[11px] font-medium text-slate-600 dark:text-slate-400 print:text-black">
                        <span>Play Store</span>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.webplat.aathifrupay"
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-600 dark:text-cyan-400 print:text-black underline font-medium hover:text-cyan-700 inline-flex items-center gap-0.5"
                        >
                          Link
                          <ExternalLink size={10} className="resume-screen-only" />
                        </a>
                      </div>
                    </div>
                    <ul className="space-y-0.5 text-xs sm:text-[11.5px] text-slate-700 dark:text-slate-300 print:text-black leading-snug">
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Contributed to the development of a live fintech application enabling merchants to process rural financial transactions like, DMT, AEPS, settlements, Wallet top-up, loans, credit cards, BBPS, and bus, train, and flight bookings.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Diagnosed and resolved production crash issues, reducing reported crash incidents from approximately 20,000 to under 500 and significantly improving application stability across devices.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Project 5 */}
                  <div className="resume-entry mb-3.5 print:mb-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-0.5">
                      <div className="text-xs sm:text-[12px] font-bold text-slate-900 dark:text-white print:text-black">
                        S3LIFESTYLE APP <span className="font-normal text-slate-600 dark:text-slate-400 print:text-black">| TECHRIIGOUR IT SOLUTIONS PVT LTD</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs sm:text-[11px] font-medium text-slate-600 dark:text-slate-400 print:text-black">
                        <span>App Store &amp; Play Store</span>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.techriigour.slifestyle&hl=en_IN"
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-600 dark:text-cyan-400 print:text-black underline font-medium hover:text-cyan-700 inline-flex items-center gap-0.5"
                        >
                          Link
                          <ExternalLink size={10} className="resume-screen-only" />
                        </a>
                      </div>
                    </div>
                    <ul className="space-y-0.5 text-xs sm:text-[11.5px] text-slate-700 dark:text-slate-300 print:text-black leading-snug">
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Developed a vehicle sticker and parking management application for a housing society, enabling smooth enforcement of society parking rules in place of manual paperwork.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Built role-based access for management and residents, including sticker issuance and deactivation, vehicle-to-owner lookup by sticker number, and admin-only reporting on sticker data along with penalty for parking-rule violations for residents and visitors.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Integrated REST APIs and Firebase modules for authentication, notifications, and real-time updates, and supported production releases through UI and performance improvements.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Project 6 */}
                  <div className="resume-entry mb-4 print:mb-3.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-0.5">
                      <div className="text-xs sm:text-[12px] font-bold text-slate-900 dark:text-white print:text-black">
                        PORTFOLIO WEBSITE <span className="font-normal text-slate-600 dark:text-slate-400 print:text-black">| React, Tailwind CSS</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs sm:text-[11px] font-medium text-slate-600 dark:text-slate-400 print:text-black">
                        <span>Vercel &amp; GitHub</span>
                        <a
                          href="https://github.com/imaditya-31/new-portfolio"
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-600 dark:text-cyan-400 print:text-black underline font-medium hover:text-cyan-700 inline-flex items-center gap-0.5"
                        >
                          Link
                          <ExternalLink size={10} className="resume-screen-only" />
                        </a>
                      </div>
                    </div>
                    <ul className="space-y-0.5 text-xs sm:text-[11.5px] text-slate-700 dark:text-slate-300 print:text-black leading-snug">
                      <li className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <span>Built a responsive and modern personal portfolio website showcasing skills and projects. Used React for component-based architecture and Tailwind CSS for clean and professional styling.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* EDUCATION */}
                <div className="resume-section mt-5 print:mt-4">
                  <div className="resume-heading border-b border-slate-900 dark:border-white/20 pb-0.5 mb-3">
                    <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black">
                      EDUCATION
                    </h2>
                  </div>

                  {/* Degree 1 */}
                  <div className="resume-entry mb-3 print:mb-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <div className="text-xs sm:text-[12px] font-bold text-slate-900 dark:text-white print:text-black">
                          Master of Computer Science: <span className="font-normal font-mono text-slate-800 dark:text-slate-200 print:text-black">CGPA: 9.00</span>
                        </div>
                      </div>
                      <div className="text-xs sm:text-[11.5px] font-medium text-slate-600 dark:text-slate-400 print:text-black font-mono">
                        2025
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between pl-4 text-xs sm:text-[11px] text-slate-600 dark:text-slate-400 print:text-black mt-0.5">
                      <span>Pratibha College of Commerce &amp; Computer Studies, Chinchwad -19</span>
                      <span>Pune, Maharashtra</span>
                    </div>
                  </div>

                  {/* Degree 2 */}
                  <div className="resume-entry">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start">
                        <span className="mr-2 text-slate-900 dark:text-white print:text-black font-bold">•</span>
                        <div className="text-xs sm:text-[12px] font-bold text-slate-900 dark:text-white print:text-black">
                          Bachelor of Computer Science: <span className="font-normal font-mono text-slate-800 dark:text-slate-200 print:text-black">CGPA: 9.18</span>
                        </div>
                      </div>
                      <div className="text-xs sm:text-[11.5px] font-medium text-slate-600 dark:text-slate-400 print:text-black font-mono">
                        2023
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between pl-4 text-xs sm:text-[11px] text-slate-600 dark:text-slate-400 print:text-black mt-0.5">
                      <span>Pratibha College of Commerce &amp; Computer Studies, Chinchwad -19</span>
                      <span>Pune, Maharashtra</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ResumeModal;

