import React from 'react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import {Menu, X} from "lucide-react";
import TrueFocus from './utils/TrueFocus';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const LogoRef = useRef(null);

    useEffect(()=>{
        gsap.fromTo(LogoRef.current,
            {
                opacity: 0.5,
            },{
                duration:1,
                ease:"power1.in",
                opacity:1,
            }
        )
    },[])

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
        console.log(isMenuOpen, document.querySelector('.nav-links')?.className);
    }

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <a ref={LogoRef} href="/">
          <TrueFocus className="true-focus" sentence="Hassan Khan" manualMode={false} blurAmount={2} borderColor="rgb(82,39,255" glowColor="rgba(0, 255, 0, 0.6)" pauseBetweenAnimations={1.5} />
        </a>
      </div>
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <a
          href="#about"
          className="nav-link"
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          About
        </a>
        <a
          href="#projects"
          className="nav-link"
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          Projects
        </a>
        <a
          href="#education"
          className="nav-link"
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          Education
        </a>
        <a
          href="#contact"
          className="nav-link"
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          Contact
        </a>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <X size={28} /> : <Menu size={28}/>}
      </div>
    </div>
    // </div>
  );
}

export default Navbar
