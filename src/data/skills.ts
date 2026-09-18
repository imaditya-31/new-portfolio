import { SkillGroup, MetricStat } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    id: 'mobile-core',
    title: 'Mobile & Core Frameworks',
    subtitle: 'Cross-platform engineering & native platform bridges',
    iconName: 'Smartphone',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    skills: [
      { name: 'Flutter', level: 'Core', highlight: true },
      { name: 'Dart', level: 'Core', highlight: true },
      { name: 'Android (Native)', level: 'Advanced', highlight: true },
      { name: 'Kotlin', level: 'Advanced' },
      { name: 'Java', level: 'Advanced' },
      { name: 'iOS Integration', level: 'Advanced' },
      { name: 'MethodChannels', level: 'Advanced' }
    ]
  },
  {
    id: 'state-architecture',
    title: 'Architecture & State Management',
    subtitle: 'Scalable, testable, decoupled enterprise patterns',
    iconName: 'Layers',
    gradient: 'from-indigo-500/20 to-purple-500/20',
    skills: [
      { name: 'BLoC Pattern', level: 'Core', highlight: true },
      { name: 'Cubit', level: 'Core', highlight: true },
      { name: 'Clean Architecture', level: 'Core', highlight: true },
      { name: 'Dependency Injection (GetIt)', level: 'Advanced', highlight: true },
      { name: 'GetX', level: 'Advanced' },
      { name: 'MVC Pattern', level: 'Advanced' },
      { name: 'Repository Pattern', level: 'Core' }
    ]
  },
  {
    id: 'fintech-specialization',
    title: 'Fintech & Payment Systems',
    subtitle: 'High-security financial workflows & banking protocols',
    iconName: 'CreditCard',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    skills: [
      { name: 'BBPS (Bharat Bill Pay)', level: 'Core', highlight: true },
      { name: 'Digital Lending Workflows', level: 'Core', highlight: true },
      { name: 'AEPS (Aadhaar Banking)', level: 'Advanced', highlight: true },
      { name: 'DMT (Direct Money Transfer)', level: 'Advanced' },
      { name: 'Payment Gateway SDKs', level: 'Core', highlight: true },
      { name: 'Wallet & Settlement Flows', level: 'Advanced' },
      { name: 'Dynamic Form Schema Engines', level: 'Core', highlight: true },
      { name: 'QR Code Ecosystems', level: 'Advanced' }
    ]
  },
  {
    id: 'cloud-apis',
    title: 'Backend, Cloud & Networking',
    subtitle: 'High-throughput APIs, streaming, and telemetry',
    iconName: 'Cloud',
    gradient: 'from-amber-500/20 to-orange-500/20',
    skills: [
      { name: 'RESTful APIs & Dio', level: 'Core', highlight: true },
      { name: 'Firebase Authentication', level: 'Core' },
      { name: 'Firebase Cloud Messaging (FCM)', level: 'Core', highlight: true },
      { name: 'WebSockets & Real-time', level: 'Advanced' },
      { name: 'Google Cloud Platform (GCP)', level: 'Advanced' },
      { name: 'Postman & Swagger Specs', level: 'Core' },
      { name: 'MongoDB Atlas & MySQL', level: 'Experienced' }
    ]
  },
  {
    id: 'release-diagnostics',
    title: 'Release & Crash Diagnostics',
    subtitle: 'Production telemetry, stability & multi-flavor releases',
    iconName: 'ShieldCheck',
    gradient: 'from-rose-500/20 to-red-500/20',
    skills: [
      { name: 'Firebase Crashlytics', level: 'Core', highlight: true },
      { name: 'Google Play Console', level: 'Core', highlight: true },
      { name: 'Apple App Store Connect', level: 'Core', highlight: true },
      { name: 'Build Flavors & Environments', level: 'Core', highlight: true },
      { name: 'ANR & Memory Profiling', level: 'Advanced', highlight: true },
      { name: 'Android Studio & Xcode', level: 'Core' },
      { name: 'Git (GitHub, GitLab, Bitbucket)', level: 'Core' }
    ]
  },
  {
    id: 'web-additional',
    title: 'Design & Modern Web',
    subtitle: 'UI/UX prototyping and complementary full-stack skills',
    iconName: 'Palette',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    skills: [
      { name: 'Figma UI/UX Prototyping', level: 'Advanced', highlight: true },
      { name: 'React & TypeScript', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'JavaScript / Node.js', level: 'Experienced' },
      { name: 'Jira & Agile Workflows', level: 'Core' }
    ]
  }
];

export const metricsData: MetricStat[] = [
  {
    label: 'Crash Incidents Slashed',
    value: '20K → <500',
    description: 'Drastically improved application stability & retention on AathifRupay',
    highlight: true
  },
  {
    label: 'Live Store Deployments',
    value: '5+',
    suffix: 'Apps',
    description: 'Shipped to Google Play Store & Apple App Store in production',
    highlight: true
  },
  {
    label: 'Production Experience',
    value: '2+',
    suffix: 'Years',
    description: 'Engineering across Fintech, Lending, B2B & B2C platforms',
    highlight: true
  },
  {
    label: 'Master of Computer Science',
    value: '9.00',
    suffix: 'CGPA',
    description: 'Top-tier academic excellence in Advanced Computer Science',
    highlight: false
  }
];
