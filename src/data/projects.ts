import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'peys-app',
    title: 'Peys App (BBPS Ecosystem)',
    tagline: 'Enterprise Bharat Bill Payment System (BBPS) Platform',
    company: 'SP Transaction Hub Technologies',
    category: 'fintech',
    status: 'In Development',
    description:
      'A comprehensive Flutter application delivering seamless BBPS workflows across dozens of categories: electricity, gas, water, fastag, loan repayments, and mobile recharge. Features a dynamic JSON-driven schema engine for auto-rendering custom biller input fields, live bill fetching, instant validation, wallet balance deduction, and payment gateway settlement.',
    technologies: [
      'Flutter',
      'Dart',
      'BLoC',
      'Clean Architecture',
      'BBPS Protocols',
      'REST APIs',
      'Firebase',
      'Google Cloud'
    ],
    features: [
      'Dynamic form generator with regex validation tailored to 100+ billers',
      'Real-time bill fetch, plan exploration, and automated bill validation',
      'Dual payment mechanism supporting in-app wallet ledger & external gateways',
      'End-to-end transaction receipts, status polling, and dispute tracking'
    ],
    metrics: ['100+ Dynamic Biller Schemas', 'Sub-second Bill Fetching', 'Dual Gateway & Wallet Architecture'],
    architecture: 'Feature-first Clean Architecture with BLoC State Management & Repository Pattern',
    accentColor: '#06B6D4',
    featured: true
  },
  {
    id: 'pr-fin-hub',
    title: 'PR Fin Hub (Digital Lending)',
    tagline: 'Scalable Fintech Lending & Credit Line Platform',
    company: 'SP Transaction Hub Technologies',
    category: 'fintech',
    status: 'In Development',
    description:
      'Architected from scratch using BLoC and strict Clean Architecture, PR Fin Hub is an enterprise digital loan application and management engine. It handles end-to-end customer loan lifecycles from instant KYC verification, Aadhaar/PAN validation, and income document uploads to loan disbursement status and automated repayment schedules.',
    technologies: [
      'Flutter',
      'Dart',
      'BLoC / Cubit',
      'Clean Architecture',
      'Dependency Injection',
      'Secure Storage',
      'Dio',
      'GCP'
    ],
    features: [
      'Multi-stage loan onboarding workflow with biometric authentication & guarded routing',
      'Encrypted document upload pipeline for bank statements & identity proofs',
      'Reusable atomic UI component library built for cross-platform scalability',
      'Secure local credential storage using platform hardware keystores'
    ],
    metrics: ['Zero-Trust Secure Storage', 'Modular Component Architecture', '100% Guarded Deep-link Navigation'],
    architecture: 'Clean Architecture with Dependency Injection (GetIt) & BLoC state machines',
    accentColor: '#6366F1',
    featured: true
  },
  {
    id: 'aathifrupay',
    title: 'AathifRupay Fintech App',
    tagline: 'Rural Banking, AEPS & Merchant Financial Services Hub',
    company: 'Webplat Technologies',
    category: 'store',
    status: 'Live on Play Store',
    description:
      'A mission-critical financial application empowering rural merchants and agents to process biometric banking: Aadhaar Enabled Payment System (AEPS), Direct Money Transfer (DMT), settlements, micro-ATM operations, wallet top-ups, and utility bookings. Spearheaded stability engineering that drastically slashed production crash rates.',
    technologies: [
      'Flutter',
      'Dart',
      'AEPS & DMT',
      'Native Android',
      'Java SDK Bridge',
      'Firebase Crashlytics',
      'Google Play Console'
    ],
    features: [
      'Bridged custom Java-based payment SDK and hardware biometric scanner with Flutter',
      'High-security wallet transfers, merchant payouts, and instant IMPS/NEFT settlements',
      'Flavored multi-brand build variants supporting white-label enterprise clients',
      'Diagnostic profiling that brought crash numbers from ~20,000 down to under 500'
    ],
    metrics: ['20,000 → <500 Production Crashes', '99.7% Crash-Free Sessions', 'Cross-Device Biometric Integration'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.webplat.aathifrupay',
    architecture: 'Multi-layer Flutter engine with native Java MethodChannels for payment hardware',
    accentColor: '#10B981',
    featured: true
  },
  {
    id: 'wowpe-app',
    title: 'WowPe Payments App',
    tagline: 'Live Merchant Payments & Engagement Engine',
    company: 'Webplat Technologies',
    category: 'store',
    status: 'Live on App Store & Play Store',
    description:
      'High-traffic B2B & B2C payment application live on both Google Play and the Apple App Store. Resolved over 50 deep architectural UI and transaction state bugs. Designed and owned the complete notification architecture with custom alert sounds, promotional image caching, and channel-based priority dispatching.',
    technologies: [
      'Flutter',
      'Dart',
      'Firebase Cloud Messaging',
      'Custom Audio Channels',
      'App Store Connect',
      'Play Console'
    ],
    features: [
      'Stabilized critical checkout journeys and eliminated UI jank on low-end devices',
      'Custom push notification engine supporting dynamic audio cues & rich banners',
      'Multi-flavor configuration for distinct enterprise client deployments',
      'End-to-end store release management and version compliance on iOS and Android'
    ],
    metrics: ['50+ Critical Production Bugs Resolved', 'Dual Store Live Releases', '100% Notification Delivery Rate'],
    playStoreUrl: 'https://play.google.com/store',
    appStoreUrl: 'https://apps.apple.com',
    architecture: 'Reactive Flutter state architecture with background notification service workers',
    accentColor: '#EC4899',
    featured: true
  },
  {
    id: 's3lifestyle',
    title: 'S3LifeStyle Society App',
    tagline: 'Smart Vehicle Parking & Residential Community Management',
    company: 'Techriigour IT Solutions',
    category: 'store',
    status: 'Live on App Store & Play Store',
    description:
      'A residential society automation application replacing manual paperwork with automated QR vehicle stickers, parking authorization, violation penalties, real-time security alerts, and resident-management messaging.',
    technologies: [
      'Flutter',
      'Dart',
      'Firebase Firestore',
      'Firebase Auth',
      'REST APIs',
      'QR Code Scanning'
    ],
    features: [
      'Instant vehicle-to-resident lookup by vehicle number or QR sticker code',
      'Role-based permissions dividing resident requests, security scans, and admin audit reports',
      'Automated penalty assignment for unauthorized parking with photo proof uploads',
      'Firebase push alerts notifying residents when visitors arrive or vehicles are cited'
    ],
    metrics: ['Live on App Store & Google Play', 'Paperless Society Enforcement', 'Sub-second QR Lookup'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.techriigour.slifestyle&hl=en_IN',
    appStoreUrl: 'https://apps.apple.com',
    architecture: 'MVC architecture pattern with GetX reactive state management',
    accentColor: '#3B82F6',
    featured: true
  },
  {
    id: 'portfolio-v2',
    title: 'Interactive 3D Portfolio',
    tagline: 'Immersive Engineering Showcase & 3D Interactive Device',
    category: 'cross-platform',
    status: 'Production',
    description:
      'An ultra-modern, high-performance portfolio engineered with React 19, TypeScript, Three.js, React Three Fiber, Framer Motion, and Tailwind CSS. Features an interactive 3D smartphone model with real-time mouse tilt, cursor spotlight beams, and high-contrast Bento Grid layouts.',
    technologies: [
      'React 19',
      'TypeScript',
      'Three.js',
      'React Three Fiber',
      'Framer Motion',
      'Tailwind CSS',
      'Vite'
    ],
    features: [
      'Interactive 3D smartphone rendering real fintech app screens with physics tilt',
      'Cursor spotlight effect with ambient specular reflection across frosted glass surfaces',
      'Bento Grid skills matrix and interactive career timeline with metric highlights',
      'Zero-lag 60fps rendering, sub-second initial load, and accessible WCAG AAA contrast'
    ],
    metrics: ['100 Lighthouse Performance', '60fps GPU-Accelerated 3D', 'Sub-second Vite HMR'],
    githubUrl: 'https://github.com/imaditya-31/new-portfolio',
    demoUrl: 'https://imaditya-31-portfolio.vercel.app',
    architecture: 'Component-driven Vite application with React Three Fiber 3D viewport',
    accentColor: '#8B5CF6',
    featured: false
  }
];
