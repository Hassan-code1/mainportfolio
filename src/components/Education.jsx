import React, { useEffect, useRef } from 'react';
import "./componentStyles/Education.css";
import Collegelogo from "./assets-comp/iiitk-logo.png";
import Schoollogo from "./assets-comp/school-logo.jpg";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggerText from './utils/StaggerText';

gsap.registerPlugin(ScrollTrigger);

const EDU_DATA = [
  {
    id: 1,
    school: "Indian Institute of Information Technology Kota",
    logo: Collegelogo,
    location: "Kota, Rajasthan, India",
    time: "Aug 2024 - May 2028",
    grade: "CGPA: 8.4"
  },
  {
    id: 2,
    school: "Shri Maheshwari Sr. Sec. School",
    logo: Schoollogo,
    location: "Jodhpur, Rajasthan, India",
    time: "June 2019 - May 2023",
    grade: "Percentage: 92%"
  }
];

const Education = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        '.edu-header',
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline Line
      gsap.fromTo(
        '.timeline-line',
        { height: 0 },
        {
          height: '100%', duration: 1.5, ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline Nodes & Cards
      gsap.fromTo(
        '.timeline-node, .timeline-content',
        { opacity: 0, x: (i, el) => el.classList.contains('timeline-left') ? -50 : 50 },
        {
          opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id='education' className='py-32 relative z-10' ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="edu-header text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gradient mb-2">
            <StaggerText text="Education" />
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] font-mono">Academic Background & Qualifications</p>
        </div>

        <div className="timeline-container relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--border-subtle)] -translate-x-1/2 rounded-full overflow-hidden">
            <div className="timeline-line absolute top-0 w-full bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)]" />
          </div>

          <div className="space-y-16">
            {EDU_DATA.map((edu, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={edu.id} className="relative flex items-center flex-col md:flex-row justify-between w-full">
                  {/* Node */}
                  <div className="timeline-node absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[var(--bg-primary)] border-4 border-[var(--accent-primary)] shadow-[0_0_15px_var(--accent-primary)] -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] animate-ping" />
                  </div>

                  {/* Desktop Layout - Left Side (Empty if Odd) */}
                  <div className={`hidden md:block md:w-[45%] ${isEven ? 'order-1' : 'order-3'}`} />

                  {/* Content Card */}
                  <div className={`timeline-content pl-12 pr-4 md:px-0 w-full md:w-[45%] ${isEven ? 'order-3 timeline-right' : 'order-1 timeline-left md:text-right'} group`}>
                    <div className={`glass-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent-primary)] relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" />
                      
                      <div className={`flex items-center gap-4 mb-4 ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                        <img src={edu.logo} alt="Logo" className="w-12 h-12 object-contain rounded bg-white p-1" />
                        <div className={!isEven ? 'md:text-right' : ''}>
                          <span className="font-mono text-sm text-emerald-500 block">{edu.time}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-1 font-clash">{edu.school}</h3>
                      <p className="text-[var(--text-secondary)] mb-4">{edu.location}</p>
                      
                      {edu.grade && (
                        <div className={`inline-block px-4 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-mono text-sm`}>
                          {edu.grade}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
