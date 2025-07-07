import React, { useEffect, useRef } from 'react';
import "./componentStyles/Education.css";
import Collegelogo from "./assets-comp/iiitk-logo.png";
import Schoollogo from "./assets-comp/school-logo.jpg";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const eduRef = useRef([]);
  eduRef.current = [];

  const addToRefs = (el) => {
    if (el && !eduRef.current.includes(el)) {
      eduRef.current.push(el);
    }
  };

  useEffect(() => {
    eduRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play pause resume reset',
          },
        }
      );
    });
  }, []);

  return (
    <div id='education' className='education-container'>
      <h1 ref={addToRefs} className="education-title">Education</h1>
      <div className="edu-except-h1">
        <div className="education" ref={addToRefs}>
          <div className="edu-logo">
            <img className='edu-logo-img' src={Collegelogo} alt="IIITK logo" />
          </div>
          <div className="edu-about">
            <p className="edu-name">Indian Institute of Information Technology Kota</p>
            <p className='edu-location'>Kota, Rajasthan, India</p>
            <p className='edu-time'>Aug 2024-May 2028</p>
            <p className="edu-grade">CGPA-8.4</p>
          </div>
        </div>

        <div className="education" ref={addToRefs}>
          <div className="edu-logo">
            <img className='edu-logo-img' src={Schoollogo} alt="School logo" />
          </div>
          <div className="edu-about">
            <p className="edu-name">Shri Maheshwari Sr. Sec. School</p>
            <p className='edu-location'>Jodhpur, Rajasthan, India</p>
            <p className='edu-time'>June 2019-May 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;

