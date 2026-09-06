import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';

const projects = [
  {
    id: 1,
    name: "Codzer (Distributed Code Execution Engine)",
    status: "STABLE",
    latency: "<500ms",
    stack: ["Go", "PostgreSQL", "Docker", "React", "TypeScript"],
    tags: ["GO", "BACKEND", "SYSTEMS"],
    description: "Distributed online code execution platform evaluating C++ and Python submissions in isolated Docker sandboxes via fixed worker pools, buffered Go channels, and Moby Docker Go SDK with strict CPU/RAM limits.",
    links: { repo: "https://github.com/Hassan-code1/Codzer" },
    type: "architectural"
  },
  {
    id: 2,
    name: "Text Compression Web App & Load Balancer",
    status: "LIVE",
    latency: "O(n log n)",
    stack: ["React.js", "Node.js", "C++", "Nginx", "Docker"],
    tags: ["C++", "SYSTEMS", "BACKEND", "FULLSTACK"],
    description: "High-performance text compression API and responsive web application using Node.js, Express, custom C++ bit-level Huffman algorithm, Dockerized Nginx load balancer, and GSAP binary tree visualizations.",
    links: { 
      demo: import.meta.env.VITE_COMPRESSOR_FRONTEND || "https://text-compressor-frontend.vercel.app",
      repos: [
        { label: "FRONTEND", url: "https://github.com/Hassan-code1/text_compressor_frontend" },
        { label: "BACKEND", url: "https://github.com/Hassan-code1/text_compressor_backend" },
        { label: "LOAD_BALANCER", url: "https://github.com/Hassan-code1/text_compressor_nginxAsLoadBalancer" }
      ]
    },
    type: "metric"
  },
  {
    id: 3,
    name: "Workspace SaaS Engine",
    status: "BETA",
    latency: "45ms",
    stack: ["React", "Node", "Postgres", "Prisma"],
    tags: ["FULLSTACK", "BACKEND"],
    description: "A collaborative workspace platform featuring real-time state synchronization and advanced role-based access control.",
    links: { repo: "https://github.com/Hassan-code1/NexusHub" },
    type: "standard"
  },
  {
    id: 4,
    name: "Queue Cure '26",
    status: "STABLE",
    latency: "<1s",
    stack: ["TypeScript", "React.js", "Node.js", "Express.js", "PostgreSQL", "Prisma", "Socket.io"],
    tags: ["FULLSTACK", "BACKEND"],
    description: "Real-time clinic queue management platform synchronizing receptionist dashboards and patient displays with sub-second latency, Inter-Call Delta dynamic wait prediction, and concurrency-safe Prisma transactions.",
    links: { repo: "https://github.com/Hassan-code1/queuecure" },
    type: "architectural"
  },
  {
    id: 5,
    name: "Daily Tasks Scheduling Website",
    status: "ARCHIVED",
    latency: "80ms",
    stack: ["React", "Node", "Postgres"],
    tags: ["FULLSTACK"],
    description: "A task scheduling web application focused on organizing daily tasks and managing personal productivity workflows.",
    links: { repo: `${import.meta.env.VITE_GITHUB_URL || "https://github.com/Hassan-code1"}/daily-tasks` },
    type: "architectural"
  }
];

const filters = ["ALL", "GO", "C++", "BACKEND", "SYSTEMS", "FULLSTACK"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = activeFilter === "ALL" 
    ? projects 
    : projects.filter(p => p.tags.includes(activeFilter));

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section id="projects" className="flex flex-col gap-6 w-full">
      <SectionHeader id="04" title="ARCHITECTURE_NODES" />
      
      {/* FILTER PANEL */}
      <div className="flex flex-wrap items-center gap-4 border-b border-[#222222] pb-4">
        <span className="text-[#6E737D] font-mono text-xs">FILTER:</span>
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-mono text-xs px-3 py-1 border transition-colors cursor-crosshair ${
                activeFilter === filter 
                  ? 'border-[#00ADD8] text-[#00ADD8] bg-[#0E0E11]' 
                  : 'border-[#222222] text-[#6E737D] hover:text-[#EDEDED] hover:border-[#444]'
              }`}
            >
              [ {filter} ]
            </button>
          ))}
        </div>
        <div className="ml-auto font-mono text-xs text-[#47A248]">
          {activeFilter !== "ALL" && `${filteredProjects.length} NODE(S) MATCHED`}
        </div>
      </div>

      {/* PROJECT GRID */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPage + activeFilter}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {paginatedProjects.map((project, idx) => {
              const isWide = (idx === 0 && paginatedProjects.length !== 2) || paginatedProjects.length === 1;
              return (
                <div 
                  key={project.id}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`group relative border interactive-node cursor-crosshair flex flex-col h-full ${
                    isWide ? 'lg:col-span-2' : ''
                  } ${
                    hoveredProject === project.id 
                      ? 'bg-[#0E0E11] border-[#00ADD8] shadow-[0_0_15px_rgba(0,173,216,0.1)]' 
                      : 'bg-[#050505] border-[#222222]'
                  } transition-all duration-300`}
                >
                  {/* Top Bar metrics */}
                  <div className="flex justify-between items-center border-b border-[#222222] p-4 font-mono text-xs">
                    <div className="flex gap-4">
                      <span className="text-[#6E737D]">NODE_{project.id.toString().padStart(2, '0')}</span>
                      <span className={`${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#47A248]'} transition-colors`}>
                        STAT: {project.status}
                      </span>
                    </div>
                  </div>

                  <div className={`flex flex-col flex-1 p-6 ${isWide ? 'md:flex-row gap-8' : ''}`}>
                    <div className="flex-1 flex flex-col">
                      <h3 className={`text-2xl font-bold mb-3 transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#EDEDED]'}`}>
                        {project.name}
                      </h3>
                      <p className="text-[#6E737D] mb-6">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map(tech => (
                          <span 
                            key={tech} 
                            className={`px-2 py-1 font-mono text-xs border transition-colors ${
                              hoveredProject === project.id 
                                ? 'border-[#00ADD8] text-[#00ADD8] bg-[#0E0E11]' 
                                : 'bg-[#050505] border-[#222222] text-[#EDEDED]'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* ARCHITECTURE VISUALIZATION for Project 01, 04, 05 */}
                    {project.type === 'architectural' && (
                      <div className="md:w-1/3 flex flex-col items-start justify-center font-mono text-xs text-[#6E737D] border-t md:border-t-0 md:border-l border-[#222222] pt-6 md:pt-0 pl-4 md:pl-8">
                        <div className="w-full flex flex-col gap-1">
                          <div className={`transition-colors font-bold ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#EDEDED]'}`}>
                            NODE_{project.id.toString().padStart(2, '0')}
                          </div>
                          <div className={`transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#6E737D]'}`}>
                            │
                          </div>
                          {project.id === 1 && (
                            <>
                              <div className="flex gap-2 items-center">
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#6E737D]'}`}>├──</span>
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#EDEDED]' : 'text-[#6E737D]'}`}>Go (API/Workers)</span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#6E737D]'}`}>├──</span>
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#EDEDED]' : 'text-[#6E737D]'}`}>Docker (Sandbox)</span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#6E737D]'}`}>├──</span>
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#EDEDED]' : 'text-[#6E737D]'}`}>Redis (Queue)</span>
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#EDEDED]' : 'text-[#6E737D]'}`}>Buffered Channels</span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#6E737D]'}`}>└──</span>
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#EDEDED]' : 'text-[#6E737D]'}`}>PostgreSQL (State)</span>
                              </div>
                            </>
                          )}
                          {project.id === 4 && (
                            <>
                              <div className="flex gap-2 items-center">
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#6E737D]'}`}>├──</span>
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#EDEDED]' : 'text-[#6E737D]'}`}>React & TypeScript</span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#6E737D]'}`}>├──</span>
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#EDEDED]' : 'text-[#6E737D]'}`}>Socket.io (Realtime)</span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#6E737D]'}`}>├──</span>
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#EDEDED]' : 'text-[#6E737D]'}`}>Prisma $transactions</span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#6E737D]'}`}>└──</span>
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#EDEDED]' : 'text-[#6E737D]'}`}>PostgreSQL (Clinic DB)</span>
                              </div>
                            </>
                          )}
                          {project.id === 5 && (
                            <>
                              <div className="flex gap-2 items-center">
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#6E737D]'}`}>├──</span>
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#EDEDED]' : 'text-[#6E737D]'}`}>React (UI)</span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#6E737D]'}`}>├──</span>
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#EDEDED]' : 'text-[#6E737D]'}`}>Node.js (API)</span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#6E737D]'}`}>└──</span>
                                <span className={`transition-colors ${hoveredProject === project.id ? 'text-[#EDEDED]' : 'text-[#6E737D]'}`}>PostgreSQL (DB)</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* METRIC VISUALIZATION for Project 02 */}
                    {project.type === 'metric' && (
                      <div className="flex flex-col items-start font-mono mt-auto pt-4 border-t border-[#222222]">
                        <span className="text-[#6E737D] text-xs">COMPRESSION</span>
                        <span className={`text-5xl font-bold transition-colors ${hoveredProject === project.id ? 'text-[#00ADD8]' : 'text-[#EDEDED]'}`}>
                          45%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ACTION LINKS */}
                  <div className="flex flex-wrap justify-end gap-3 border-t border-[#222222] p-4 font-mono text-xs mt-auto bg-[#0A0A0C]">
                    {project.links.repos ? (
                      project.links.repos.map(r => (
                        <a 
                          key={r.label} 
                          href={r.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#6E737D] hover:text-[#00ADD8] transition-colors z-10 flex items-center gap-1 cursor-pointer"
                        >
                          [ {r.label} ↗ ]
                        </a>
                      ))
                    ) : (
                      project.links.repo && (
                        <a 
                          href={project.links.repo} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#6E737D] hover:text-[#00ADD8] transition-colors z-10 flex items-center gap-1 cursor-pointer"
                        >
                          [ REPOSITORY ↗ ]
                        </a>
                      )
                    )}
                    {project.links.demo && (
                      <a 
                        href={project.links.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#6E737D] hover:text-[#00ADD8] transition-colors z-10 flex items-center gap-1 cursor-pointer"
                      >
                        [ LIVE DEMO ↗ ]
                      </a>
                    )}
                  </div>

                  {/* Corner brackets */}
                  <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors ${hoveredProject === project.id ? 'border-[#00ADD8]' : 'border-transparent'}`}></div>
                  <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors ${hoveredProject === project.id ? 'border-[#00ADD8]' : 'border-transparent'}`}></div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-4 font-mono text-xs border border-[#222222] bg-[#0A0A0C] py-3 max-w-full md:max-w-[400px] mx-auto w-full">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="text-[#6E737D] hover:text-[#00ADD8] disabled:opacity-30 disabled:hover:text-[#6E737D] transition-colors flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            <span>[ &larr; PREV ]</span>
          </button>
          
          <span className="text-[#EDEDED]">
            PAGE {currentPage.toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}
          </span>

          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="text-[#6E737D] hover:text-[#00ADD8] disabled:opacity-30 disabled:hover:text-[#6E737D] transition-colors flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            <span>[ NEXT &rarr; ]</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
