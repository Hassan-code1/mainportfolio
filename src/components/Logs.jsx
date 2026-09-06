import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from './SectionHeader';

const logs = [
  { id: 1, type: "SYS_INIT", date: "2024-2028", message: "DEPENDENCY_INJECTED: B.Tech in Electronics & Communication Engineering [IIIT Kota]" },
  { id: 2, type: "INFO", date: "2025-09-01", message: "Initiated Software Engineering journey. Core modules loaded." },
  { id: 3, type: "INFO", date: "2026-06-10", message: "C++ Huffman Compression Web API & load balancer minimized payload by 45%." },
  { id: 4, type: "ERR", date: "2026-06-30", message: "Authentication system failure [RESOLVED]: Patched JWT token expiration bug." },
  { id: 5, type: "INFO", date: "2026-07-19", message: "Analyzed QueueCure project architecture and optimized Postgres indexing." },
  { id: 6, type: "INFO", date: "2026-08-27", message: "Implemented React Polling Orchestrator for real-time state sync." },
  { id: 7, type: "WARN", date: "2026-08-28", message: "High latency detected in worker nodes. Scaling up instance count." },
  { id: 8, type: "INFO", date: "2026-08-30", message: "Successfully verified Codzer (Distributed Code Execution Engine) in Go." },
];

const Logs = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  return (
    <section id="logs" className="w-full flex flex-col h-[400px]">
      <SectionHeader id="06" title="LIVE_SERVER_LOGS" />
      
      <div 
        ref={containerRef}
        className="flex-1 bg-[#050505] border border-[#222222] p-4 font-mono text-sm overflow-y-auto terminal-scrollbar relative"
      >
        <div className="flex flex-col gap-2">
          {isInView && logs.map((log, idx) => (
            <LogLine key={log.id} log={log} index={idx} />
          ))}
          {isInView && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: logs.length * 0.15 }}
              className="w-2 h-4 bg-[#47A248] mt-2"
            />
          )}
        </div>
      </div>
    </section>
  );
};

const LogLine = ({ log, index }) => {
  
  const getTypeColor = (type) => {
    switch(type) {
      case 'INFO': return 'text-[#47A248]';
      case 'WARN': return 'text-[#D97706]';
      case 'ERR': return 'text-[#DC2626]';
      case 'SYS_INIT': return 'text-[#00ADD8] font-bold';
      default: return 'text-[#6E737D]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.3 }}
      className="flex gap-3 leading-relaxed"
    >
      <span className={getTypeColor(log.type)}>[{log.type}]</span>
      <span className="text-[#659AD2] shrink-0">{log.date}:</span>
      <span className="text-[#6E737D] break-words">{log.message}</span>
    </motion.div>
  );
};

export default Logs;
