import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope} from '@fortawesome/free-regular-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faDownload} from '@fortawesome/free-solid-svg-icons'
import { faSquareGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import "./componentStyles/Hero.css"
import SkillShowcase from './SkillShowcase';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export default function Hero() {
  const heroRef = useRef(null);
  useEffect(()=>{
    gsap.fromTo(heroRef.current,
      {opacity:0, y:50},
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease:"power2.out",
        scrollTrigger:{
          trigger: heroRef.current,
          start: 'top 80%',
          toggleActions:'play'
        },
      }
    );
  }, []);
  return (
    <section id='about' className='hero'>
      <div className="about" ref={heroRef}>
        <h1 className='hero-heading'>Hassan Khan</h1>
        <p className='hero-title'>Software Engineering</p>
        <div className="location-mail">
          <div className="mail">
            <p> <FontAwesomeIcon icon={faEnvelope} style={{color: "#707070", marginRight:"4px"}} /> hk747p@gmail.com</p>
          </div>
          <div className="location">
            <p><FontAwesomeIcon icon={faLocationDot} style={{color: "#707070", marginRight:"6px"}} />Jodhpur, Rajasthan</p>
          </div>
        </div>
        <div className="about-descr">
          I'm building Full Stack skills with experience in JavaScript, React, Node.js, and MongoDB.
          Alongside, I'm a problem solver with a strong grasp of Data Structures, 
          Algorithms, and Competitive Programming, active on LeetCode, Codeforces, and CodeChef.
        </div>
        <div className="hero-links">
          <a className="resume-link">
            <FontAwesomeIcon icon={faDownload} style={{color: "#09090b", fontSize:"14px"}} />
            <a href='https://github.com/Hassan-code1' >Resume</a>
          </a>
          <a href="https://github.com/Hassan-code1" className='social-links'>
            <FontAwesomeIcon icon={faSquareGithub} style={{color: "rgb(255,255,255)",}} />
          </a>
          <a href="https://www.linkedin.com/in/hassansindhi/" className='social-links'>
            <FontAwesomeIcon icon={faLinkedin} style={{color: "rgb(255,255,255)",}} />
          </a>
        </div>
      </div>
      <SkillShowcase />
    </section>
  );
}
