import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import SystemInitialization from './SystemInitialization';
import SystemVisualization from './SystemVisualization';

const Hero = () => {
  return (
    <section id="about" className="relative w-full flex flex-col items-start justify-center min-h-[80vh] pt-12">
      <SectionHeader id="01" title="IDENTITY" />
      
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mt-8">
        {/* LEFT COLUMN: Identity & Init */}
        <div className="flex flex-col relative z-10 w-full">
          <SystemInitialization />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="mb-2 font-mono text-[#00ADD8] tracking-widest text-xs">HASSAN KHAN</div>
            <div className="mb-6 font-mono text-[#6E737D] tracking-wider text-sm">Backend & Systems Developer</div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#EDEDED] mb-6 leading-[1.15] font-sans">
              Building Scalable Systems & <br className="hidden md:block" />
              High-Performance Backends.
            </h1>
            
            <p className="text-[#6E737D] max-w-lg mb-10 text-base leading-relaxed font-sans">
              I build backend systems, developer tools and distributed applications with a focus on performance, reliability and clean architecture.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            {/* Primary CTA */}
            <a 
              href="https://drive.google.com/drive/folders/1AM7hbKpgnRILRU9rrylsw-efN-24JPTe?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-[#222222] bg-[#0E0E11] text-[#EDEDED] font-mono text-xs md:text-sm flex items-center gap-2 group cursor-pointer interactive-node transition-all hover:border-[#00ADD8] hover:text-[#00ADD8] hover:shadow-[0_0_10px_rgba(0,173,216,0.2)] active:scale-95"
            >
              [ VIEW RESUME ↗ ]
            </a>
            
            {/* Secondary CTAs */}
            <a 
              href={import.meta.env.VITE_GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-[#222222] bg-transparent text-[#6E737D] font-mono text-xs md:text-sm flex items-center gap-2 group cursor-pointer transition-all hover:border-[#00ADD8] hover:text-[#00ADD8] hover:shadow-[0_0_10px_rgba(0,173,216,0.1)] active:scale-95"
            >
              [ GITHUB ↗ ]
            </a>
            <a 
              href={import.meta.env.VITE_LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-[#222222] bg-transparent text-[#6E737D] font-mono text-xs md:text-sm flex items-center gap-2 group cursor-pointer transition-all hover:border-[#00ADD8] hover:text-[#00ADD8] hover:shadow-[0_0_10px_rgba(0,173,216,0.1)] active:scale-95"
            >
              [ LINKEDIN ↗ ]
            </a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: System Visualization */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center lg:justify-end border border-[#222222] bg-[#0E0E11] relative overflow-hidden opacity-30 lg:opacity-70"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(34,34,34,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(34,34,34,0.3)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>
          <div className="absolute top-2 left-2 font-mono text-[10px] text-[#6E737D] tracking-widest z-10 pointer-events-none">
            SYSTEM_MAP
          </div>
          <SystemVisualization />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
