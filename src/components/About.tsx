import React, { useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, Book, Gamepad2, Compass } from 'lucide-react';

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">About Me</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div
          ref={aboutRef}
          className="flex flex-col md:flex-row gap-8 opacity-0 translate-y-10 transition-all duration-1000"
        >
          <div className="md:w-1/2">
            <p className="text-lg mb-6 leading-relaxed">
              Hello! I'm Aditya Vishwakarma, a passionate Flutter Developer and Computer Science graduate from Savitribai Phule Pune University.
              I specialize in creating beautiful, responsive mobile applications that provide exceptional user experiences.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              My journey in technology started during my college years at Pratibha College of Commerce & Computer Studies,
              where I developed a strong foundation in computer science fundamentals and discovered my passion for mobile app development.
            </p>
            <p className="text-lg leading-relaxed">
              I'm constantly learning and exploring new technologies to enhance my skills. I believe in writing clean, maintainable code and
              creating applications that not only look great but also perform efficiently.
            </p>
          </div>

          <div className="md:w-1/2">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <div className="flex items-start mb-4">
                <GraduationCap className="mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-medium">Pratibha College of Commerce & Computer Studies</h4>
                  <p className="text-gray-600 dark:text-gray-400">Master's of Computer Science</p>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-500 w-60">
                    <span>2023 - 2025</span>
                    <span>CGPA: 8.8</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <GraduationCap className="mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-medium">Pratibha College of Commerce & Computer Studies</h4>
                  <p className="text-gray-600 dark:text-gray-400">Bachelor's of Computer Science</p>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-500 w-60">
                    <span>2020 - 2023</span>
                    <span>CGPA: 9.2</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Hobbies & Interests</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <Book className="mr-2 text-blue-600 dark:text-blue-400" size={20} />
                  <span>Reading</span>
                </div>
                <div className="flex items-center">
                  <Gamepad2 className="mr-2 text-blue-600 dark:text-blue-400" size={20} />
                  <span>Mobile Games</span>
                </div>
                <div className="flex items-center">
                  <Compass className="mr-2 text-blue-600 dark:text-blue-400" size={20} />
                  <span>Exploring New Tech</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="mr-2 text-blue-600 dark:text-blue-400" size={20} />
                  <span>App Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;