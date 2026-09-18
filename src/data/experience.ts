import { ExperienceItem } from '../types';

export const experiences: ExperienceItem[] = [
  {
    id: 'sp-transaction-hub',
    role: 'Mobile App Developer',
    company: 'SP Transaction Hub Technologies Pvt. Ltd.',
    period: 'Apr 2026 – Present',
    location: 'Pune, Maharashtra, India',
    isCurrent: true,
    type: 'Full-time',
    description: [
      'Leading end-to-end development of two flagship Flutter applications: a next-gen BBPS payment platform and an enterprise digital lending application.',
      'Spearheading application architecture, project configuration, feature engineering, RESTful API integration, automated testing, and production release cycles.',
      'Engineering complete Bharat Bill Payment System (BBPS) workflows: biller discovery, service-specific dynamic form rendering, plan discovery, bill validation, wallet and gateway checkouts, and transaction lifecycle tracking.',
      'Architecting the digital lending application using BLoC state management and Clean Architecture principles with dependency injection, secure storage, reusable component libraries, and guarded routing.',
      'Managing Firebase, Google Cloud Platform, Android & iOS environments, code signing credentials, Google Play Console, and Apple App Store Connect.'
    ],
    technologies: [
      'Flutter',
      'Dart',
      'BLoC',
      'Clean Architecture',
      'BBPS',
      'Digital Lending',
      'REST APIs',
      'Firebase',
      'Google Cloud',
      'Dependency Injection',
      'Play Console',
      'App Store Connect'
    ],
    keyWins: [
      'Architected 2 enterprise fintech apps from scratch using BLoC & Clean Architecture',
      'Engineered dynamic form rendering engine for 100+ BBPS utility billers',
      'Configured automated signing and release pipelines for Android & iOS'
    ]
  },
  {
    id: 'webplat-technologies',
    role: 'Flutter Developer',
    company: 'Webplat Technologies Pvt. Ltd.',
    period: 'Nov 2025 – Apr 2026',
    location: 'Pune, Maharashtra, India',
    type: 'Full-time',
    description: [
      'Engineered and maintained over 5 production Flutter applications across B2B, B2C, and fintech payment domains.',
      'Systematically diagnosed and eliminated 200+ production issues across UI, state management, REST APIs, Gradle build scripts, and native Android layers.',
      'Built multi-tenant notification, payment, transaction, and reporting engines using Flutter flavors for custom client builds.',
      'Integrated a custom Java-based payment gateway SDK into the Flutter engine and coordinated dual-platform store deployments.',
      'Proactively monitored crash rates and ANRs via Firebase Crashlytics and Google Play Console to enforce stability standards.'
    ],
    technologies: [
      'Flutter',
      'Dart',
      'Native Android',
      'Java SDK',
      'Flavors',
      'Firebase Crashlytics',
      'ANR Optimization',
      'Gradle',
      'REST APIs',
      'Play Store Releases'
    ],
    keyWins: [
      'Slashed production crash incidents from ~20,000 to <500 on AathifRupay app',
      'Delivered custom notification engine with dynamic sounds and multi-channel routing',
      'Bridged proprietary Java payment SDK with high-throughput native MethodChannels'
    ]
  },
  {
    id: 'techriigour-it-solutions',
    role: 'Software Engineer',
    company: 'Techriigour IT Solutions Pvt. Ltd.',
    period: 'Jun 2024 – Nov 2025',
    location: 'Pune, Maharashtra, India',
    type: 'Full-time',
    description: [
      'Promoted from Intern to full-time Software Engineer in recognition of strong architectural ownership and rapid feature delivery.',
      'Developed and scaled commercial Flutter applications using GetX state management, MVC architecture, REST APIs, and Firebase backend services.',
      'Engineered real-time chat, authentication, and push notification modules for cross-platform mobile users.',
      'Collaborated in agile sprint cycles, resolving post-deployment bottlenecks and tuning UI rendering performance for smooth 60fps interaction.'
    ],
    technologies: [
      'Flutter',
      'Dart',
      'GetX',
      'MVC Architecture',
      'Firebase Firestore',
      'Firebase Auth',
      'FCM Push Notifications',
      'REST APIs',
      'Agile / Jira'
    ],
    keyWins: [
      'Earned promotion to Software Engineer within 6 months through high-impact contributions',
      'Implemented real-time chat and vehicle parking enforcement modules in S3LifeStyle app',
      'Shipped production updates to both Apple App Store and Google Play Store'
    ]
  }
];
