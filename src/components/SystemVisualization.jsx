import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_NODES = [
  { id: 'CLIENT_APP', cx: 50, cy: 10, role: 'REACT_UI', status: 'ACTIVE', latency: 12 },
  { id: 'API_GATEWAY', cx: 50, cy: 35, role: 'GO_ROUTER', status: 'ACTIVE', latency: 8 },
  { id: 'TASK_QUEUE', cx: 75, cy: 55, role: 'RABBIT_MQ', status: 'ACTIVE', latency: 4 },
  { id: 'SANDBOX_01', cx: 90, cy: 80, role: 'DOCKER_ENV', status: 'ACTIVE', latency: 24 },
  { id: 'SANDBOX_02', cx: 60, cy: 80, role: 'DOCKER_ENV', status: 'STANDBY', latency: 0 },
  { id: 'PRIMARY_DB', cx: 25, cy: 60, role: 'POSTGRESQL', status: 'ACTIVE', latency: 15 },
];

const LINKS = [
  { source: 0, target: 1 },
  { source: 1, target: 2 },
  { source: 2, target: 3 },
  { source: 2, target: 4 },
  { source: 1, target: 5 },
  { source: 3, target: 5 }, // Sandbox 1 writes to DB
];

const SystemVisualization = forwardRef((props, ref) => {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [packets, setPackets] = useState([]);

  // 1. Dynamic Metrics: Fluctuate latency every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prevNodes => prevNodes.map(node => {
        if (node.status === 'STANDBY') return node;
        // Fluctuate latency by +/- 5ms
        const fluctuation = Math.floor(Math.random() * 11) - 5;
        let newLatency = node.latency + fluctuation;
        if (newLatency < 1) newLatency = 1;
        
        return { ...node, latency: newLatency };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // 2. Ambient Flow: Randomly trigger a packet if idle to keep it feeling alive
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        const randomLink = LINKS[Math.floor(Math.random() * LINKS.length)];
        triggerFlow(randomLink.source, randomLink.target);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // 3. Triggered Flow: Expose function to parent
  const triggerFlow = (sourceIdx, targetIdx) => {
    const id = Date.now() + Math.random();
    setPackets(prev => [...prev, { id, source: sourceIdx, target: targetIdx }]);
    // Remove packet after animation completes (1.5s)
    setTimeout(() => {
      setPackets(prev => prev.filter(p => p.id !== id));
    }, 1500);
  };

  useImperativeHandle(ref, () => ({
    triggerFlow
  }));

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center p-8 select-none">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full max-w-[400px] max-h-[400px] overflow-visible"
        style={{ filter: "drop-shadow(0px 0px 15px rgba(0, 173, 216, 0.05))" }}
      >
        <defs>
          <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#222222" strokeWidth="0.2" opacity="0.6" />
          </pattern>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ADD8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 4. Visual Polish: Glowing grid pattern */}
        <rect width="100" height="100" fill="url(#gridPattern)" rx="4" />
        <rect width="100" height="100" fill="url(#glowGrad)" pointerEvents="none" />

        {/* Links */}
        {LINKS.map((link, i) => {
          const sourceNode = nodes[link.source];
          const targetNode = nodes[link.target];
          const isHovered = hoveredNode === link.source || hoveredNode === link.target;
          
          return (
            <g key={`link-${i}`}>
              {/* Base line */}
              <line 
                x1={sourceNode.cx} 
                y1={sourceNode.cy} 
                x2={targetNode.cx} 
                y2={targetNode.cy} 
                stroke={isHovered ? "#00ADD8" : "#222222"}
                strokeWidth="0.5"
                className="transition-colors duration-300"
              />
            </g>
          );
        })}

        {/* Active Packets */}
        {packets.map((packet) => {
          const sourceNode = nodes[packet.source];
          const targetNode = nodes[packet.target];
          return (
            <motion.circle
              key={packet.id}
              r="1"
              fill="#47A248"
              initial={{ opacity: 0, cx: sourceNode.cx, cy: sourceNode.cy }}
              animate={{
                cx: targetNode.cx,
                cy: targetNode.cy,
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut"
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isHovered = hoveredNode === i;
          const isWarning = node.latency > 45; // Warning state threshold
          
          return (
            <g 
              key={`node-${i}`} 
              onMouseEnter={() => setHoveredNode(i)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-crosshair"
            >
              {/* Glow effect */}
              {(isHovered || isWarning) && (
                <circle 
                  cx={node.cx} 
                  cy={node.cy} 
                  r="4" 
                  fill={isWarning && !isHovered ? "#EAB308" : "#00ADD8"} 
                  opacity="0.2" 
                  className="animate-pulse"
                />
              )}
              {/* Outer ring */}
              <motion.circle 
                cx={node.cx} 
                cy={node.cy} 
                r={isHovered ? 2.5 : 2} 
                fill="#050505"
                stroke={isHovered ? "#00ADD8" : (isWarning ? "#EAB308" : (node.status === 'STANDBY' ? "#444" : "#6E737D"))}
                strokeWidth="0.5"
                className="transition-all duration-300"
              />
              {/* Inner core */}
              <circle 
                cx={node.cx} 
                cy={node.cy} 
                r="0.8" 
                fill={isHovered ? "#00ADD8" : (isWarning ? "#EAB308" : (node.status === 'STANDBY' ? "#444" : "#EDEDED"))}
                className="transition-colors duration-300"
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredNode !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-4 right-4 bg-[#0E0E11] border border-[#00ADD8] p-3 shadow-lg shadow-[#00ADD8]/10 pointer-events-none z-20 min-w-[160px]"
          >
            <div className="font-mono text-[10px] text-[#00ADD8] border-b border-[#222222] pb-1 mb-2 tracking-wider">
              {nodes[hoveredNode].id}
            </div>
            <div className="font-mono text-[10px] flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-[#6E737D]">STATUS:</span>
                <span className={nodes[hoveredNode].status === 'ACTIVE' ? 'text-[#47A248]' : 'text-[#DC2626]'}>
                  {nodes[hoveredNode].status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E737D]">ROLE:</span>
                <span className="text-[#EDEDED]">{nodes[hoveredNode].role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E737D]">LATENCY:</span>
                <span className={nodes[hoveredNode].latency > 45 ? "text-[#EAB308]" : "text-[#EDEDED]"}>
                  {nodes[hoveredNode].latency}ms
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

SystemVisualization.displayName = 'SystemVisualization';
export default SystemVisualization;
