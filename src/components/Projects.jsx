import React, { useRef, useEffect, useState } from 'react';
import "./componentStyles/Projects.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggerText from './utils/StaggerText';


import SampleProject from "./assets-comp/sample-project.jpeg";
import DailyTasks from "./assets-comp/dailytasks.png"
import TextLogo from "./assets-comp/text-compressor.jpeg";
import QueueLogo from "./assets-comp/QueuCure-cover.png"

gsap.registerPlugin(ScrollTrigger);

const PROJECT_DATA = [
  {
    id: 1,
    title: "Text Compressor",
    desc: "A full-stack compression tool combining a high-performance C++ Huffman engine with a dynamically load-balanced Node.js backend. It features a React interface that interactively maps out the data compression process.",
    img: TextLogo,
    tech: ["React", "Node", "MongoDB", "Tailwind", "Cpp", "Nginx", "Docker"],
    live: "https://text-compressor-frontend.vercel.app/",
    repo: "https://github.com/Hassan-code1/text_compressor_backend"
  },
  {
    id: 2,
    title: "QueueCure",
    desc: "Designed and built a production-grade clinic queue system with real-time communication, database transactions, concurrency protection, and predictive wait-time analytics.",
    img: QueueLogo,
    tech: ["Express", "PostgreSQL", "TypeScript", "PrismaORM", "Socket.io"],
    live: "#",
    repo: "#"
  },
  {
    id: 3,
    title: "Daily Tasks",
    desc: "Interactive tool to set daily tasks and see your consistency",
    img: DailyTasks,
    tech: ["Node", "React", "MongoDB", "Express"],
    live: "https://daily-tasks-five-green.vercel.app/",
    repo: "https://github.com/Hassan-code1/daily-tasks-personal-backend"
  }
];

const getTagColor = (tag) => {
  const t = tag.toLowerCase();
  if (t.includes('react') || t.includes('typescript') || t.includes('tailwind') || t.includes('docker')) return 'tech-tag-blue';
  if (t.includes('node') || t.includes('mongo') || t.includes('express') || t.includes('nginx')) return 'tech-tag-green';
  if (t.includes('sql') || t.includes('prisma')) return 'tech-tag-purple';
  if (t.includes('socket')) return 'tech-tag-orange';
  return 'tech-tag-default';
};

const Projects = () => {
  const sectionRef = useRef(null);
  const [activeId, setActiveId] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-header',
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.project-accordion-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-gallery',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id='projects' className='py-16 md:py-32 relative z-10' ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="projects-header flex justify-between items-end mb-8 md:mb-16">
          <div className="text-center md:text-left w-full md:w-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient mb-2">
              <StaggerText text="Featured Work" />
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] font-mono">Selected projects and experiments</p>
          </div>
          <a className='text-[var(--accent-secondary)] font-mono hover:text-[var(--accent-primary)] transition-colors hidden md:block cursor-none' href="#">
            View All Archive →
          </a>
        </div>

        {/* Desktop & Mobile Gallery Wrapper */}
        <div className="projects-gallery flex flex-row lg:flex-row gap-4 h-[600px] w-full overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory pb-4 md:pb-0 hide-scrollbar" style={{ scrollBehavior: 'smooth' }}>
          {PROJECT_DATA.map((proj) => (
            <div
              key={proj.id}
              className={`project-accordion-item group relative rounded-3xl overflow-hidden cursor-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-none w-[85vw] md:w-auto md:flex-1 snap-center glass-panel hover:-translate-y-1 hover:border-[var(--accent-primary)] hover:shadow-[0_0_20px_var(--accent-primary)] ${
                activeId === proj.id ? 'lg:flex-grow-[4]' : 'lg:flex-grow-[1]'
              }`}
              onMouseEnter={() => setActiveId(proj.id)}
            >
              <div className="absolute inset-0 bg-black/5 z-10 transition-opacity duration-500 group-hover:bg-black/0" />
              <img 
                src={proj.img} 
                alt={proj.title} 
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${
                  activeId === proj.id ? 'scale-105 opacity-100 grayscale-0' : 'scale-105 opacity-100 grayscale-0 md:scale-100 md:opacity-60 md:grayscale'
                }`}
              />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 bg-gradient-to-t from-bg-surface via-bg-surface/90 to-transparent flex flex-col justify-end h-full">
                {/* On mobile, content is always visible. On desktop, visibility depends on activeId. */}
                <div className={`transition-all duration-500 transform ${activeId === proj.id ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-100 md:translate-y-8 md:opacity-0'}`}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tech.slice(0, 4).map((t, idx) => (
                      <span key={idx} className={`px-3 py-1 backdrop-blur-md rounded-full text-[10px] md:text-xs font-mono border ${getTagColor(t)}`}>
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 4 && <span className="px-3 py-1 tech-tag-default backdrop-blur-md rounded-full text-[10px] md:text-xs font-mono border">+{proj.tech.length - 4}</span>}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-[var(--text-primary)] mb-2 font-clash">{proj.title}</h3>
                  <p className="text-sm md:text-base text-[var(--text-secondary)] mb-6 max-w-xl line-clamp-2 md:line-clamp-3 leading-relaxed">{proj.desc}</p>
                  
                  <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                    <a href={proj.live} className="flex items-center gap-2 bg-[var(--accent-primary)] text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full hover:bg-[var(--accent-secondary)] hover:shadow-[0_0_15px_var(--accent-secondary)] transition-all text-sm font-medium cursor-none flex-1 justify-center whitespace-nowrap">
                      <FontAwesomeIcon icon={faUpRightFromSquare} /> Live Site
                    </a>
                    <a href={proj.repo} className="flex items-center gap-2 bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-subtle)] px-4 py-2 md:px-5 md:py-2.5 rounded-full hover:bg-[var(--border-subtle)] transition-colors text-sm font-medium cursor-none flex-1 justify-center whitespace-nowrap">
                      <FontAwesomeIcon icon={faCodeBranch} /> Source Code
                    </a>
                  </div>
                </div>
                
                {/* Vertical title for collapsed state (Desktop) */}
                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 hidden lg:block transition-all duration-500 w-[500px] text-center ${activeId === proj.id ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <h3 className="text-2xl font-bold text-[var(--text-secondary)] tracking-widest uppercase font-clash whitespace-nowrap">{proj.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <a className='text-[var(--accent-secondary)] font-mono hover:text-[var(--accent-primary)] transition-colors block md:hidden mt-8 text-center cursor-none' href="#">
          View All Archive →
        </a>
      </div>
    </div>
  );
};

export default Projects;
