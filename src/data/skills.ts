import { SkillGroup, MetricStat } from '../types';

export const skillCategories = [
  {
    id: 'languages-frameworks',
    index: '01',
    title: 'Languages & Frameworks',
    subtitle: 'Core mobile runtimes, compiled languages & native SDKs',
    icon: 'Code2',
    accent: 'cyan',
    skills: ['Flutter', 'Dart', 'Java', 'Kotlin', 'Android', 'iOS']
  },
  {
    id: 'state-architecture',
    index: '02',
    title: 'State Management & Architecture',
    subtitle: 'Predictable reactive state machines, modular layering & clean architecture',
    icon: 'Cpu',
    accent: 'indigo',
    skills: ['GetX', 'BLoC', 'Cubit', 'MVC', 'Clean Architecture', 'Dependency Injection']
  },
  {
    id: 'backend-api-cloud',
    index: '03',
    title: 'Backend, API, & Cloud',
    subtitle: 'High-throughput APIs, streaming channels & cloud infrastructure',
    icon: 'Cloud',
    accent: 'blue',
    skills: ['REST APIs', 'WebSockets', 'Dio', 'Firebase (Auth, Cloud Messaging)', 'Google Cloud Platform']
  },
  {
    id: 'fintech',
    index: '04',
    title: 'Fintech Specialization',
    subtitle: 'Banking protocols, payment gateways, biometric terminals & transaction flows',
    icon: 'CreditCard',
    accent: 'emerald',
    skills: [
      'AEPS',
      'BBPS',
      'DMT',
      'QR Codes',
      'Payment Gateway Integration',
      'Travel bookings',
      'Wallet Flows',
      'Native SDK Integration'
    ]
  },
  {
    id: 'development-release',
    index: '05',
    title: 'Development & Release',
    subtitle: 'Version control, IDE toolchains, store publishing & telemetry diagnostics',
    icon: 'GitBranch',
    accent: 'rose',
    skills: [
      'Git Version Control (Git, GitHub, GitLab, Bitbucket)',
      'Android Studio',
      'Xcode',
      'Firebase Crashlytics',
      'Google Play Console',
      'App Store Connect',
      'Postman',
      'Swagger',
      'Jira'
    ]
  },
  {
    id: 'additional',
    index: '06',
    title: 'Additional Technologies',
    subtitle: 'Complementary web development, databases & product design prototyping',
    icon: 'Layers',
    accent: 'purple',
    skills: ['React', 'JavaScript', 'Node.js', 'MySQL', 'MongoDB Atlas', 'Figma']
  }
];

// Backwards compatibility export
export const skillGroups = skillCategories.map((cat) => ({
  id: cat.id,
  title: cat.title,
  subtitle: cat.subtitle,
  iconName: cat.icon,
  gradient: 'from-cyan-500/20 to-blue-500/20',
  skills: cat.skills.map((s) => ({ name: s, level: 'Core' as const, highlight: true }))
}));

export const metricsData: MetricStat[] = [
  {
    label: 'Crash Incidents Slashed',
    value: '20K → <500',
    description: 'Drastically improved application stability & retention on AathifRupay',
    highlight: true
  },
  {
    label: 'Live Store Deployments',
    value: '10+',
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
