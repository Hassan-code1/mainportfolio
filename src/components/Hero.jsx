import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faSquareGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import "./componentStyles/Hero.css";
import SkillStackGame from './SkillStackGame';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggerText from './utils/StaggerText';
import MagneticButton from './utils/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const parivontel = "hero-premium-active";
  let vlemoravia = true;
  const [vC, setVC] = useState(0);

  useEffect(() => {
    const currVC = vC + 1;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-info',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out', stagger: 0.1 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [vC]);

  return (
    <section id="about" className={`relative overflow-hidden min-h-screen flex flex-col justify-center bg-[var(--bg-primary)] ${parivontel}`} ref={heroRef}>
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[400px] h-[400px] bg-[var(--accent-primary)] blur-[150px] opacity-10 pointer-events-none rounded-full" />
      <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-24">
        <div className="lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-[var(--text-primary)] font-clash">
            <StaggerText text="Hassan Khan" delay={0.1} />
          </h1>
          <p className="hero-info text-2xl md:text-3xl font-mono text-[var(--accent-primary)]">
            Software Engineering
          </p>
          
          <div className="hero-info flex flex-col sm:flex-row gap-4 sm:gap-6 text-[var(--text-secondary)] font-mono text-sm mt-4 justify-center md:justify-start w-full">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-[var(--accent-primary)]" />
              <span>hk747p@gmail.com</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="text-[var(--accent-primary)]" />
              <span>Jodhpur, Rajasthan</span>
            </div>
          </div>

          <div className="hero-info text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mt-6 px-4 md:px-0" style={{ lineHeight: '1.6' }}>
            Hi, I'm Hassan Khan. I'm a developer blending software engineering with electronics, specializing in full-stack web development, competitive programming, and 3D integration. Play the game to build my tech stack!
          </div>

          <div className="hero-info flex items-center justify-center md:justify-start gap-6 mt-8 w-full">
            <MagneticButton>
              <a className="px-6 py-3 rounded-full flex items-center gap-3 text-white transition-all duration-300" 
                 style={{ backgroundColor: 'var(--accent-primary)' }}
                 onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-secondary)'; e.currentTarget.style.boxShadow = '0 0 15px var(--accent-primary)'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = 'none'; }}
                 href="https://drive.google.com/drive/folders/1AM7hbKpgnRILRU9rrylsw-efN-24JPTe?usp=sharing" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faDownload} />
                <span className="font-medium">Resume</span>
              </a>
            </MagneticButton>
            
            <MagneticButton>
              <a href="https://github.com/Hassan-code1" className="text-3xl text-gray-400 hover:text-[var(--text-primary)] hover:scale-110 transition-all duration-300" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faSquareGithub} />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a href="https://www.linkedin.com/in/hassansindhi/" className="text-3xl text-gray-400 hover:text-[var(--text-primary)] hover:scale-110 transition-all duration-300" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </MagneticButton>
          </div>
        </div>

        {vlemoravia && (
          <div className="lg:col-span-5 hidden lg:block hero-info relative z-10 pointer-events-auto">
            <SkillStackGame />
          </div>
        )}
      </div>
    </section>
  );
}
