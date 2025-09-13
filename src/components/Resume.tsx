import React, { useEffect, useRef } from "react";
import { FileDown, BookOpen } from "lucide-react";

const Resume: React.FC = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      },
      { threshold: 0.1 }
    );

    if (resumeRef.current) {
      observer.observe(resumeRef.current);
    }

    // return () => {
    //   if (resumeRef.current) {
    //     observer.unobserve(resumeRef.current);
    //   }
    // };
  }, []);

  return (
    <section id="resume" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Resume</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div
          ref={resumeRef}
          className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 opacity-0 translate-y-10 transition-all duration-1000"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Download My Resume</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get a comprehensive overview of my skills, experience, and
              education.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/assets/resume.pdf"
                download
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <FileDown size={20} className="mr-2" />
                Download PDF
              </a>
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <BookOpen size={20} className="mr-2" />
                View Online
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h4 className="text-lg font-semibold mb-4">Resume Highlights</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>
                Results-driven Flutter Developer with 1+ years of hands-on
                experience in building cross-platform mobile applications using
                Flutter, Firebase, and RESTful APIs.
              </li>
              <li>
                Currently working as a Software Engineer at Techriigour IT
                Solutions, contributing to production apps, scalable solutions,
                and real-time features.
              </li>
              <li>
                Post Graduate in Computer Science from Pratibha College of
                Commerce & Computer Studies
              </li>
              <li>
                Experience in designing intuitive interfaces and visualizing
                user flows for end-to-end applications.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
