import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  theme: string;
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [speed, setSpeed] = useState(150);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fullText = 'Learn, Build, Innovate...!!';

  useEffect(() => {
    const typing = () => {
      if (!isDeleting && index < fullText.length) {
        setDisplayText(fullText.substring(0, index + 1));
        setIndex(index + 1);
        setSpeed(150);
      } else if (isDeleting && index > 0) {
        setDisplayText(fullText.substring(0, index - 1));
        setIndex(index - 1);
        setSpeed(50);
      } else if (!isDeleting && index === fullText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
      }
    };

    const timer = setTimeout(typing, speed);
    return () => clearTimeout(timer);
  }, [index, isDeleting]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Height of fixed header
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white dark:bg-gray-800 shadow-md py-2'
        : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a
          href="#home"
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fade-in-out"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap">
            {displayText}
            <span className="border-r-2 border-blue-500 animate-blink ml-1" />
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['home', 'about', 'skills', 'projects', 'resume', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="nav-link capitalize text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item);
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3">
              {['home', 'about', 'skills', 'projects', 'resume', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="nav-link capitalize text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item);
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;



// import React, { useState, useEffect } from 'react';
// import { Menu, X } from 'lucide-react';

// interface HeaderProps {
//   theme: string;
// }

// const Header: React.FC<HeaderProps> = ({ theme }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Smooth scroll to section with offset
//   const scrollToSection = (sectionId: string) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       const offset = 80; // Height of fixed header
//       const elementPosition = section.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//       });
//       setIsMenuOpen(false);
//     }
//   };

//   return (
//     <header
//       className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
//         ? 'bg-white dark:bg-gray-800 shadow-md py-2'
//         : 'bg-transparent py-4'
//         }`}
//     >
//       <div className="container mx-auto px-4 flex justify-between items-center">
//         <a
//           href="#home"
//           className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fade-in-out"
//           onClick={(e) => {
//             e.preventDefault();
//             scrollToSection('home');
//           }}
//         >
//           learn, build, innovate.
//         </a>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-8">
//           {['home', 'about', 'skills', 'projects', 'resume', 'contact'].map((item) => (
//             <a
//               key={item}
//               href={`#${item}`}
//               className="nav-link capitalize text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
//               onClick={(e) => {
//                 e.preventDefault();
//                 scrollToSection(item);
//               }}
//             >
//               {item}
//             </a>
//           ))}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
//           onClick={toggleMenu}
//           aria-label="Toggle Menu"
//         >
//           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
//           <div className="container mx-auto px-4 py-2">
//             <nav className="flex flex-col space-y-3">
//               {['home', 'about', 'skills', 'projects', 'resume', 'contact'].map((item) => (
//                 <a
//                   key={item}
//                   href={`#${item}`}
//                   className="nav-link capitalize text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     scrollToSection(item);
//                   }}
//                 >
//                   {item}
//                 </a>
//               ))}
//             </nav>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;