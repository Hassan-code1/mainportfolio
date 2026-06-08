import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, Home, Code, FolderGit2, Mail } from "lucide-react";
import TrueFocus from './utils/TrueFocus';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('about');
    const LogoRef = useRef(null);

    useEffect(()=>{
        gsap.fromTo(LogoRef.current,
            { opacity: 0.5 },
            { duration: 1, ease: "power1.in", opacity: 1 }
        );

        // Simple scroll spy to update active tab on mobile
        const handleScroll = () => {
          const sections = ['about', 'skills', 'projects', 'contact'];
          const scrollPos = window.scrollY + window.innerHeight / 2;
          
          for (const section of sections) {
            const el = document.getElementById(section);
            if (el && el.offsetTop <= scrollPos && (el.offsetTop + el.offsetHeight) > scrollPos) {
              setActiveTab(section);
              break;
            }
          }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },[])

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    return (
      <>
        {/* Desktop Navbar */}
        <div className="navbar hidden md:flex">
          <div className="navbar-logo">
            <a ref={LogoRef} href="#about">
              <TrueFocus className="true-focus" sentence="Hassan Khan" manualMode={false} blurAmount={2} borderColor="rgb(82,39,255)" glowColor="rgba(0, 255, 0, 0.6)" pauseBetweenAnimations={1.5} />
            </a>
          </div>
          <div className="nav-links flex">
            <a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#projects" className="nav-link" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#skills" className="nav-link" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        </div>

        {/* Mobile App-Style Bottom Navbar */}
        <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#050507]/85 backdrop-blur-xl border-t border-white/10 pb-safe">
          <div className="flex justify-around items-center px-2 py-3">
            <a href="#about" onClick={() => setActiveTab('about')} className={`flex flex-col items-center gap-1 transition-all duration-300 w-16 ${activeTab === 'about' ? 'text-[#6366F1] -translate-y-1' : 'text-gray-500 hover:text-gray-300'}`}>
              <Home size={22} className={activeTab === 'about' ? 'drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : ''} />
              <span className="font-mono text-[10px] font-medium">Hero</span>
              {activeTab === 'about' && <div className="absolute -bottom-2 w-1 h-1 bg-[#6366F1] rounded-full shadow-[0_0_8px_rgba(99,102,241,1)]" />}
            </a>
            
            <a href="#skills" onClick={() => setActiveTab('skills')} className={`flex flex-col items-center gap-1 transition-all duration-300 w-16 ${activeTab === 'skills' ? 'text-[#6366F1] -translate-y-1' : 'text-gray-500 hover:text-gray-300'}`}>
              <Code size={22} className={activeTab === 'skills' ? 'drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : ''} />
              <span className="font-mono text-[10px] font-medium">Skills</span>
              {activeTab === 'skills' && <div className="absolute -bottom-2 w-1 h-1 bg-[#6366F1] rounded-full shadow-[0_0_8px_rgba(99,102,241,1)]" />}
            </a>

            <a href="#projects" onClick={() => setActiveTab('projects')} className={`flex flex-col items-center gap-1 transition-all duration-300 w-16 ${activeTab === 'projects' ? 'text-[#6366F1] -translate-y-1' : 'text-gray-500 hover:text-gray-300'}`}>
              <FolderGit2 size={22} className={activeTab === 'projects' ? 'drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : ''} />
              <span className="font-mono text-[10px] font-medium">Work</span>
              {activeTab === 'projects' && <div className="absolute -bottom-2 w-1 h-1 bg-[#6366F1] rounded-full shadow-[0_0_8px_rgba(99,102,241,1)]" />}
            </a>

            <a href="#contact" onClick={() => setActiveTab('contact')} className={`flex flex-col items-center gap-1 transition-all duration-300 w-16 ${activeTab === 'contact' ? 'text-[#6366F1] -translate-y-1' : 'text-gray-500 hover:text-gray-300'}`}>
              <Mail size={22} className={activeTab === 'contact' ? 'drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : ''} />
              <span className="font-mono text-[10px] font-medium">Mail</span>
              {activeTab === 'contact' && <div className="absolute -bottom-2 w-1 h-1 bg-[#6366F1] rounded-full shadow-[0_0_8px_rgba(99,102,241,1)]" />}
            </a>
          </div>
        </div>
      </>
    );
}

export default Navbar;
