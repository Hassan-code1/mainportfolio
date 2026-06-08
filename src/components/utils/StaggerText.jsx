import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function StaggerText({ text, className = '', delay = 0 }) {
  const textRef = useRef(null);

  useEffect(() => {
    const chars = textRef.current.querySelectorAll('.char');
    gsap.fromTo(
      chars,
      { opacity: 0, y: 20, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        delay: delay,
      }
    );
  }, [delay]);

  return (
    <span ref={textRef} className={`inline-block ${className}`} style={{ perspective: '400px' }}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="char inline-block origin-bottom"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
