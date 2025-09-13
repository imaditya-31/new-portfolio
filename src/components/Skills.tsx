import React, { useEffect, useRef } from 'react';
import {
  SiFlutter, SiReact, SiC, SiPython, SiPhp, SiHtml5, SiCss3, SiJavascript,
  SiNodedotjs, SiMysql, SiMongodb, SiFirebase, SiGit, SiGithub, SiFigma,
  SiXampp, SiPostman
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { FaMicrosoft } from 'react-icons/fa';
import { Check } from 'lucide-react';

interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
}

const skillIconMap: Record<string, React.ReactNode> = {
  Flutter: <SiFlutter />,
  React: <SiReact />,
  C: <SiC />,
  Java: <DiJava />,
  Python: <SiPython />,
  PHP: <SiPhp />,
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,
  JavaScript: <SiJavascript />,
  NodeJS: <SiNodedotjs />,
  MySQL: <SiMysql />,
  MongoDB: <SiMongodb />,
  Firebase: <SiFirebase />,
  Git: <SiGit />,
  GitHub: <SiGithub />,
  Figma: <SiFigma />,
  Xampp: <SiXampp />,
  Postman: <SiPostman />,
  MSO: <FaMicrosoft />
};

const getColorClass = (color: string) => {
  const colors: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    green: 'text-green-600 dark:text-green-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    red: 'text-red-600 dark:text-red-400',
    teal: 'text-teal-600 dark:text-teal-400'
  };
  return colors[color] || 'text-gray-600';
};

const Skills: React.FC = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frameworks',
      skills: ['Flutter', 'React'],
      color: 'blue'
    },
    {
      title: 'Programming Languages',
      skills: ['C', 'Java', 'Python', 'PHP'],
      color: 'purple'
    },
    {
      title: 'Web Technologies',
      skills: ['HTML', 'CSS', 'JavaScript', 'NodeJS'],
      color: 'green'
    },
    {
      title: 'Databases',
      skills: ['MySQL', 'MongoDB', 'Firebase'],
      color: 'yellow'
    },
    {
      title: 'Version Control Systems',
      skills: ['Git', 'GitHub'],
      color: 'red'
    },
    {
      title: 'Others',
      skills: ['Figma', 'Xampp', 'Postman', 'MSO'],
      color: 'teal'
    }
  ];

  useEffect(() => {
    const currentRef = skillsRef.current;

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

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">My Skills</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div
          ref={skillsRef}
          className="opacity-0 translate-y-10 transition-all duration-1000"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className={`text-xl font-semibold mb-4 ${getColorClass(category.color)}`}>
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <span className="mr-3 text-xl text-current">
                        {skillIconMap[skill] || <Check size={20} />}
                      </span>
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
