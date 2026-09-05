import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import SkillStackGame from './SkillStackGame';

const dependencies = [
  {
    category: "CORE",
    skills: [
      { name: "C++", uses: "Huffman Compression CLI", related: ["Algorithms"] },
      { name: "Go", uses: "Distributed Code Execution Engine", related: ["Docker", "Redis", "PostgreSQL"] },
      { name: "TypeScript", uses: "Workspace SaaS Engine", related: ["React", "Node"] },
      { name: "JavaScript", uses: "Various Modules", related: ["React", "HTML/CSS"] },
      { name: "Python", uses: "Data Scripts", related: ["SQL"] }
    ]
  },
  {
    category: "DATA",
    skills: [
      { name: "PostgreSQL", uses: "Workspace, Judger Engine", related: ["Go", "Prisma"] },
      { name: "Redis", uses: "Distributed Code Execution Engine", related: ["Go", "Docker"] },
      { name: "MongoDB", uses: "Legacy Projects", related: ["Node"] },
      { name: "Prisma", uses: "Workspace SaaS Engine", related: ["PostgreSQL", "TypeScript"] },
      { name: "SQL", uses: "General Data Layers", related: ["PostgreSQL"] }
    ]
  },
  {
    category: "INFRA",
    skills: [
      { name: "Docker", uses: "Distributed Code Execution Engine", related: ["Go", "Linux"] },
      { name: "Nginx", uses: "Load Balancing", related: ["Linux", "Docker"] },
      { name: "Linux", uses: "Deployment Servers", related: ["Docker", "Git"] },
      { name: "Git", uses: "Version Control", related: ["All Projects"] }
    ]
  },
  {
    category: "FRONTEND",
    skills: [
      { name: "React", uses: "Workspace SaaS Engine, Portfolio", related: ["Tailwind CSS", "Framer Motion"] },
      { name: "Next.js", uses: "SSR Projects", related: ["React"] },
      { name: "Tailwind CSS", uses: "Portfolio", related: ["React"] },
      { name: "Framer Motion", uses: "Portfolio Animation", related: ["React"] },
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
              className="w-full py-4 border border-[#00ADD8] bg-[#0E0E11] text-[#00ADD8] font-mono text-sm hover:shadow-[0_0_15px_rgba(0,173,216,0.3)] transition-all flex items-center justify-center gap-2 group"
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
                  className="font-mono text-xs text-[#DC2626] hover:text-white transition-colors"
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
