import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = heroRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);


  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden"
    >
      <div
        ref={heroRef}
        className="container mx-auto px-4 flex flex-col items-center text-center opacity-0 translate-y-10 transition-all duration-1000"
      >
        <div className="w-52 h-52 md:w-64 md:h-64 rounded-full border-4 border-blue-500 dark:border-blue-400 overflow-hidden mb-6">
          <img
            src="assets/photo.jpg"
            alt="Aditya Vishwakarma"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Aditya Vishwakarma
        </h1>
        <p className="text-xl md:text-3xl text-gray-600 dark:text-gray-400 mb-4">
          Passionate Cross-Platform Flutter Mobile App Developer
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Post Graduate | Mobile & Web Development | UI/UX Designer | IT & Tech Enthusiast
        </p>
        <div className="flex space-x-4">
          <a
            href="#contact"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact Me
          </a>
          <a
            href="#projects"
            className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Projects
          </a>
        </div>
      </div>
      <button
        onClick={scrollToAbout}
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce p-2"
        aria-label="Scroll to About section"
      >
        <ChevronDown size={30} className="text-blue-600 dark:text-blue-400" />
      </button>
    </section>
  );
};

export default Hero;