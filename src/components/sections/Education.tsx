import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';
import Badge from '../ui/Badge';

export const Education: React.FC = () => {
  const educationItems = [
    {
      degree: 'Master of Computer Science (MCS)',
      institution: 'Pratibha College of Commerce & Computer Studies',
      location: 'Chinchwad, Pune, Maharashtra',
      period: '2023 – 2025',
      cgpa: '9.00',
      description:
        'Advanced post-graduate studies focused on Enterprise Software Engineering, Distributed Systems, Cloud Architecture, and Algorithm Optimization.'
    },
    {
      degree: 'Bachelor of Computer Science (BCS)',
      institution: 'Pratibha College of Commerce & Computer Studies',
      location: 'Chinchwad, Pune, Maharashtra',
      period: '2020 – 2023',
      cgpa: '9.18',
      description:
        'Comprehensive foundation in Object-Oriented Programming, Data Structures & Algorithms, Database Management Systems, and Mobile/Web Computing.'
    }
  ];

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="purple" dot className="mb-3">
            <GraduationCap size={12} className="mr-1" />
            Academic Foundations
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Education &{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Credentials
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Rigorous computer science scholarship with consistent top-tier 9.0+ CGPA academic performance.
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {educationItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-8 rounded-3xl bg-[#0D1117]/80 border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono text-purple-400 flex items-center gap-1">
                    <Calendar size={13} />
                    {item.period}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 font-mono text-xs font-bold">
                    <Award size={13} className="text-purple-400" />
                    <span>CGPA: {item.cgpa}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {item.degree}
                </h3>
                <div className="text-sm font-semibold text-slate-300 mt-2">
                  {item.institution}
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 font-mono mt-1 mb-4">
                  <MapPin size={12} className="text-slate-500" />
                  <span>{item.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Distinction Honors</span>
                <span className="text-emerald-400">● Completed</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
