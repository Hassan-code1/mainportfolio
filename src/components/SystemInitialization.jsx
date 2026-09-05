import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const SystemInitialization = () => {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="font-mono text-[#6E737D] mb-12 flex flex-col gap-1.5 border-l border-[#222222] pl-6 ml-2 text-sm bg-[#0E0E11] py-4 pr-4 border border-[#222222] w-fit shadow-md shadow-[#050505]/50"
    >
      <motion.div variants={item}>{'>'} System initializing...</motion.div>
      <motion.div variants={item}>{'>'} Identity: Hassan Khan</motion.div>
      <motion.div variants={item}>{'>'} Focus: Backend & Systems</motion.div>
      <motion.div variants={item}>
        {'>'} Core: C++, Javascript, Docker
        <motion.span 
          initial={{ opacity: 0 }} 
          animate={{ opacity: [0, 1, 1, 0] }} 
          transition={{ repeat: Infinity, duration: 1, times: [0, 0.2, 0.8, 1], ease: "linear" }}
          className="text-[#47A248] ml-2 inline-block w-[8px] h-[14px] bg-[#47A248] align-middle"
        />
      </motion.div>
    </motion.div>
  );
};

export default SystemInitialization;
