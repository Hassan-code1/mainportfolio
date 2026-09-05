import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const EducationNode = ({ id, type, title, subtitle, years, status, statusColor, progressBar }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center md:justify-start w-full md:w-1/2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative border p-6 font-mono text-sm transition-all duration-300 w-full ${
          isHovered 
            ? 'bg-[#0E0E11] border-[#00ADD8] shadow-[0_0_15px_rgba(0,173,216,0.15)]' 
            : 'bg-[#050505] border-[#222222]'
        }`}
      >
        {/* Corner accents */}
        <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors ${isHovered ? 'border-[#00ADD8]' : 'border-[#444]'}`}></div>
        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors ${isHovered ? 'border-[#00ADD8]' : 'border-[#444]'}`}></div>

        <div className="flex justify-between items-start mb-4 border-b border-[#222222] pb-2">
          <span className="text-[#6E737D] text-xs">{id} / {type}</span>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <h3 className={`text-xl font-bold transition-colors ${isHovered ? 'text-[#00ADD8]' : 'text-[#EDEDED]'}`}>
            {title}
          </h3>
          <span className="text-[#659AD2]">{subtitle}</span>
          <span className="text-[#6E737D]">{years}</span>
        </div>

        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[#222222]">
          <div className="flex justify-between text-xs">
            <span className="text-[#6E737D]">STATUS:</span>
            <span className={statusColor}>{status}</span>
          </div>
          
          {/* Progress bar simulation */}
          <div className="w-full text-[10px] sm:text-xs text-[#00ADD8] overflow-hidden whitespace-nowrap opacity-80">
            <span className={`${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
              CURRENT NODE<br />
              {progressBar}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Education = () => {
  return (
    <section id="education" className="w-full flex flex-col gap-6">
      <SectionHeader id="03" title="EDUCATION_NODES" />
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <EducationNode 
          id="NODE_01" 
          type="HIGHER_EDUCATION" 
          title="IIIT Kota" 
          subtitle="B.Tech — Electronics & Comm." 
          years="2024 → 2028" 
          status="ACTIVE" 
          statusColor="text-[#47A248]" 
          progressBar="██████████████░░░░ ~2028" 
        />
        <EducationNode 
          id="NODE_02" 
          type="SECONDARY_EDUCATION" 
          title="Shri. Maheshwari Sr. Sec. School" 
          subtitle="9th - 12th" 
          years="2019 → 2023" 
          status="COMPLETED" 
          statusColor="text-[#00ADD8]" 
          progressBar="██████████████████ ~2023" 
        />
      </div>
    </section>
  );
};

export default Education;
