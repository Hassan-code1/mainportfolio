import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    // Check if the device has a coarse pointer (touch screen)
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsCoarsePointer(mediaQuery.matches);

    const handleMediaChange = (e) => {
      setIsCoarsePointer(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (isCoarsePointer) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const isInteractive = e.target.closest('a, button, input, textarea, select, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    // Enforce cursor-none globally while the custom cursor is active
    document.body.classList.add('hide-default-cursor');

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('hide-default-cursor');
    };
  }, [isCoarsePointer]);

  if (isCoarsePointer) {
    return null; // Do not render custom cursor on touch devices
  }

  return (
    <>
      {/* The main precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-[#EDEDED] pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          scale: isHovering ? 0 : 1,
          opacity: 1
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
      
      {/* The glowing architectural block/caret */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#222222] pointer-events-none z-[9998] bg-[#00ADD8]/0"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.2 : 1,
          backgroundColor: isHovering ? 'rgba(0, 173, 216, 0.1)' : 'rgba(0, 173, 216, 0)',
          borderColor: isHovering ? '#00ADD8' : '#222222',
          rotate: isHovering ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
      />
    </>
  );
};

export default CustomCursor;
