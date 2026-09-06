import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import SkillStackGame from './SkillStackGame';

const dependencies = [
  {
    category: "CORE",
    skills: [
      { name: "C++", uses: "Text Compression Engine (Huffman)", related: ["Algorithms", "Bit-level I/O"] },
      { name: "Go", uses: "Codzer Execution Engine", related: ["Docker", "PostgreSQL", "Go Channels"] },
      { name: "Node.js", uses: "Text Compression API, Queue Cure, Workspace", related: ["Express.js", "JavaScript", "TypeScript"] },
      { name: "Express.js", uses: "Text Compression API, Queue Cure Backend", related: ["Node.js", "REST APIs", "Socket.io"] },
      { name: "TypeScript", uses: "Queue Cure, Codzer, Workspace", related: ["React", "Node.js"] },
      { name: "JavaScript", uses: "Various Modules", related: ["React", "HTML/CSS"] },
      { name: "Python", uses: "Codzer Submissions, Data Scripts", related: ["Docker", "SQL"] }
    ]
  },
  {
    category: "DATA",
    skills: [
      { name: "PostgreSQL", uses: "Codzer, Queue Cure, Workspace", related: ["Prisma", "Go", "SQL"] },
      { name: "Prisma", uses: "Queue Cure, Workspace SaaS", related: ["PostgreSQL", "TypeScript"] },
      { name: "Redis", uses: "Distributed Execution & Caching", related: ["Go", "Docker"] },
      { name: "MongoDB", uses: "Legacy Projects", related: ["Node.js"] },
      { name: "SQL", uses: "Atomic Transactions, Queries", related: ["PostgreSQL"] }
    ]
  },
  {
    category: "INFRA",
    skills: [
      { name: "Docker", uses: "Codzer Sandbox, Nginx Load Balancer", related: ["Moby SDK", "Go", "Linux"] },
      { name: "Nginx", uses: "Text Compression Load Balancer", related: ["Docker", "Linux", "HTTPS Proxy"] },
      { name: "Socket.io", uses: "Queue Cure Real-Time Sync", related: ["WebSockets", "Node.js", "React"] },
      { name: "Linux", uses: "Deployment Servers", related: ["Docker", "Git"] },
      { name: "Git", uses: "Version Control", related: ["All Projects"] }
    ]
  },
  {
    category: "FRONTEND",
    skills: [
      { name: "React", uses: "Queue Cure, Text Compressor, Portfolio", related: ["Tailwind CSS", "GSAP", "TypeScript"] },
      { name: "GSAP", uses: "Text Compression Binary Tree Visualizer", related: ["React", "Animation"] },
      { name: "Tailwind CSS", uses: "Portfolio UI", related: ["React"] },
      { name: "Framer Motion", uses: "Portfolio Animation", related: ["React"] },
      { name: "Next.js", uses: "SSR Projects", related: ["React"] },
      { name: "Three.js", uses: "Visualizations", related: ["JavaScript"] }
    ]
  }
];

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [showGame, setShowGame] = useState(false);

  return (
    <section id="skills" className="w-full flex flex-col gap-6">
      <SectionHeader id="05" title="SYSTEM_DEPENDENCIES" />

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* DEPENDENCY GRAPH VISUALIZATION */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 relative">
          
          {/* Main Pipeline: CORE -> DATA -> INFRA */}
          <div className="flex-1 flex flex-col gap-6 relative">
            <div className="absolute left-6 top-10 bottom-10 w-px bg-[#222222] hidden md:block"></div>
            {dependencies.slice(0, 3).map((group, gIdx) => (
              <motion.div 
                key={group.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gIdx * 0.15 }}
                className="relative z-10 bg-[#050505] border border-[#222222] p-6 group/box interactive-node"
              >
                <div className="font-mono text-xs text-[#659AD2] mb-4">
                  {'//'} {group.category}_LAYER
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(skill => (
                    <div 
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`px-3 py-1 font-mono text-xs border transition-all cursor-crosshair ${
                        hoveredSkill?.name === skill.name 
                          ? 'border-[#00ADD8] bg-[#0E0E11] text-[#00ADD8] shadow-[0_0_10px_rgba(0,173,216,0.2)]'
                          : 'border-[#222222] bg-[#0A0A0C] text-[#EDEDED] hover:border-[#444]'
                      }`}
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Separate Branch: FRONTEND */}
          <div className="md:w-[350px] flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#050505] border border-[#222222] p-6 interactive-node flex-1"
            >
              <div className="font-mono text-xs text-[#00ADD8] mb-4">
                {'//'} FRONTEND_BRANCH
              </div>
              <div className="flex flex-col gap-2">
                {dependencies[3].skills.map(skill => (
                  <div 
                    key={skill.name}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`px-3 py-2 font-mono text-xs border transition-all cursor-crosshair flex justify-between ${
                      hoveredSkill?.name === skill.name 
                        ? 'border-[#00ADD8] bg-[#0E0E11] text-[#00ADD8]'
                        : 'border-[#222222] bg-[#0A0A0C] text-[#EDEDED]'
                    }`}
                  >
                    <span>{skill.name}</span>
                    <span className="opacity-50">{'<UI />'}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ACTION BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowGame(true)}
              // className="w-full py-4 border border-[#00ADD8] bg-[#0E0E11] text-[#00ADD8] font-mono text-sm hover:shadow-[0_0_15px_rgba(0,173,216,0.3)] transition-all flex items-center justify-center gap-2 group"
              className="w-full py-4 border border-[#00ADD8] bg-[#0E0E11] text-[#00ADD8] font-mono text-sm hover:shadow-[0_0_15px_rgba(0,173,216,0.3)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              [ PLAY SKILLSTACK <span className="group-hover:translate-x-1 transition-transform">→</span> ]
            </motion.button>
          </div>
        </div>
      </div>

      {/* FIXED TOOLTIP FOR HOVER STATE */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: -60 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#0E0E11] border border-[#00ADD8] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-mono pointer-events-none"
          >
            <div className="text-[#00ADD8] text-sm font-bold mb-2">TARGET: {hoveredSkill.name}</div>
            <div className="text-xs text-[#6E737D] mb-1">
              <span className="text-[#EDEDED]">USED_IN:</span> {hoveredSkill.uses}
            </div>
            <div className="text-xs text-[#6E737D]">
              <span className="text-[#EDEDED]">RELATED_NODES:</span> {hoveredSkill.related.join(', ')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SKILLSTACK GAME MODAL */}
      <AnimatePresence>
        {showGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowGame(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#050505] border border-[#222222] p-1 shadow-2xl"
            >
              <div className="flex justify-between border-b border-[#222222] p-3 mb-4 bg-[#0A0A0C]">
                <span className="font-mono text-xs text-[#659AD2]">SKILLSTACK_ENGINE.exe</span>
                <button 
                  onClick={() => setShowGame(false)}
                  // className="font-mono text-xs text-[#DC2626] hover:text-white transition-colors"
                  className="font-mono text-xs text-[#DC2626] hover:text-white transition-colors cursor-pointer"
                >
                  [ X ]
                </button>
              </div>
              <div className="p-4">
                <SkillStackGame />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
