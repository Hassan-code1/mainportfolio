import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FileText, Code2, Github, Mail } from 'lucide-react';

const DOCK_ITEMS = [
  { id: 'resume', label: 'GET_RESUME', icon: FileText, href: import.meta.env.VITE_RESUME_URL, external: true },
  { id: 'leetcode', label: 'LEETCODE', icon: Code2, href: import.meta.env.VITE_LEETCODE_URL, external: true },
  { id: 'github', label: 'GITHUB_NODE', icon: Github, href: import.meta.env.VITE_GITHUB_URL, external: true },
  { id: 'email', label: 'EMAIL_NODE', icon: Mail, href: `mailto:${import.meta.env.VITE_EMAIL}`, external: false }
];

function DockIcon({ item, mouseX, isMobile, maxScale }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false); // Mobile tap state

  // Mouse distance from the icon's center
  // Mouse distance from the icon's center (desktop only)
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate width based on distance and maxScale
  const widthSync = useTransform(distance, [-150, 0, 150], [48, 48 * maxScale, 48]);
  // Spring to make the scale smooth
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  

  // Icon scale derived from the width
  const iconScale = useTransform(width, [48, 48 * maxScale], [1, maxScale]);

  // On mobile, force static sizes (44px base, slightly smaller on active)
  // On mobile, use static dimensions (44px) to preserve rock-solid touch ergonomics
  const finalWidth = isMobile ? 44 : width;
  const finalScale = isMobile ? (isActive ? 0.95 : 1) : 1; // scale inner icon slightly on mobile tap
  const finalIconScale = isMobile ? 1 : iconScale;

  const Icon = item.icon;

  const handlePointerDown = () => {
    if (isMobile) setIsActive(true);
  };

  const handlePointerUp = () => {
    if (isMobile) setIsActive(false);
  };

  return (
    <div className="relative flex flex-row items-center">
      {/* Tooltip */}
      <AnimatePresence>
        {(isHovered || (isMobile && isActive)) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#16161A] border border-[#222222] rounded shadow-lg pointer-events-none whitespace-nowrap z-50"
          >
            <span className="font-mono text-[10px] text-[#EDEDED]">
              {item.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock Item Wrapper for scaling */}
      <motion.div style={{ width: finalWidth, height: finalWidth }} className="flex items-end justify-center">
        {/* Dock Item Button */}
        <motion.a
          ref={ref}
          href={item.href}
          target={item.external ? "_blank" : "_self"}
          rel={item.external ? "noopener noreferrer" : undefined}
          style={{ width: finalWidth, height: finalWidth, scale: finalScale }}
          whileTap={{ scale: 0.92 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          aria-label={`Open ${item.label}`}
          className="bg-[#0E0E11] border border-[#222222] rounded-xl flex items-center justify-center text-[#6E737D] transition-colors focus-visible:outline-none focus-visible:border-[#00ADD8] focus-visible:text-[#00ADD8] hover:border-[#00ADD8] hover:text-[#00ADD8] hover:shadow-[0_0_15px_rgba(0,173,216,0.15)] relative overflow-hidden group cursor-pointer select-none"
        >
          {/* Subtle hover gradient sheen */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:250%_250%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          
          {/* Icon */}
          <motion.div style={{ scale: finalIconScale }} className="pointer-events-none flex items-center justify-center">
            <Icon size={20} strokeWidth={1.5} className="z-10" />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Active Indicator Dot */}
      <div className={`transition-colors rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 mt-2 pointer-events-none ${isHovered ? 'bg-[#00ADD8]' : 'bg-transparent'}`}></div>
    </div>
  );
}

const ActionDock = () => {
  const mouseX = useMotionValue(Infinity);
  const [isMobile, setIsMobile] = useState(false);
  const [maxScale, setMaxScale] = useState(1.5);

  const dockItems = useMemo(() => [
    {
      id: 'resume',
      label: 'GET_RESUME',
      icon: FileText,
      href: import.meta.env.VITE_RESUME_URL || "https://drive.google.com/drive/folders/1AM7hbKpgnRILRU9rrylsw-efN-24JPTe?usp=sharing",
      external: true
    },
    {
      id: 'leetcode',
      label: 'LEETCODE',
      icon: Code2,
      href: import.meta.env.VITE_LEETCODE_URL || "https://leetcode.com/u/uKmlMzaX5j/",
      external: true
    },
    {
      id: 'github',
      label: 'GITHUB_NODE',
      icon: Github,
      href: import.meta.env.VITE_GITHUB_URL || "https://github.com/Hassan-code1",
      external: true
    },
    {
      id: 'email',
      label: 'EMAIL_NODE',
      icon: Mail,
      href: `mailto:${import.meta.env.VITE_EMAIL || "hk747p@gmail.com"}`,
      external: false
    }
  ], []);

  useEffect(() => {
    const checkViewport = () => {
      // Check both width and pointer capability
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isMobileView = window.innerWidth < 768 || !hasFinePointer;
      setIsMobile(isMobileView);

      // Dynamically adjust desktop max magnification based on screen width
      if (!isMobileView) {
        if (window.innerWidth > 1440) setMaxScale(1.6);
        else if (window.innerWidth > 1024) setMaxScale(1.45);
        else setMaxScale(1.3);
      }
    };
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return (
    <div className="fixed left-1/2 bottom-6 -translate-x-1/2 z-50 pointer-events-none pb-[env(safe-area-inset-bottom)]">
      <div 
        className="pointer-events-auto flex flex-row items-end gap-3 px-3 py-2 bg-[#050505]/80 backdrop-blur-md border border-[#222222] rounded-2xl shadow-2xl"
        onMouseMove={(e) => {
          if (!isMobile) mouseX.set(e.pageX);
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {dockItems.map((item) => (
          <DockIcon key={item.id} item={item} mouseX={mouseX} isMobile={isMobile} maxScale={maxScale} />
        ))}
      </div>
    </div>
  );
};

export default ActionDock;
