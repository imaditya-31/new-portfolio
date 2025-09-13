import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: 'Task Manager',
    description: 'A Flutter-based task management app with clean UI and local storage capabilities.',
    image: 'https://images.pexels.com/photos/5717479/pexels-photo-5717479.jpeg',
    category: 'flutter',
    technologies: ['Flutter', 'Dart', 'SQLite', 'Provider'],
    githubLink: 'https://github.com',
    demoLink: 'https://example.com'
  },
  {
    id: 2,
    title: 'Weather App',
    description: 'Real-time weather forecast application with beautiful UI and animations.',
    image: 'https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg',
    category: 'flutter',
    technologies: ['Flutter', 'Dart', 'REST API', 'BLoC'],
    githubLink: 'https://github.com'
  },
  {
    id: 3,
    title: 'E-Commerce App',
    description: 'Full-featured shopping app with product catalog, cart, and checkout functionality.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    category: 'flutter',
    technologies: ['Flutter', 'Firebase', 'Stripe', 'GetX'],
    githubLink: 'https://github.com',
    demoLink: 'https://example.com'
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Responsive personal portfolio website designed with modern UI principles.',
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg',
    category: 'web',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    githubLink: 'https://github.com',
    demoLink: 'https://example.com'
  },
  {
    id: 5,
    title: 'Fitness Tracker',
    description: 'Mobile app for tracking workouts, nutrition, and setting fitness goals.',
    image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg',
    category: 'flutter',
    technologies: ['Flutter', 'Firebase', 'Health Kit', 'Charts'],
    githubLink: 'https://github.com'
  },
  {
    id: 6,
    title: 'App UI Kit',
    description: 'Comprehensive UI component library for Flutter developers.',
    image: 'https://images.pexels.com/photos/5926389/pexels-photo-5926389.jpeg',
    category: 'design',
    technologies: ['Flutter', 'Dart', 'UI/UX', 'Figma'],
    githubLink: 'https://github.com',
    demoLink: 'https://example.com'
  }
];

export default projects;