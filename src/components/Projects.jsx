import React from 'react'
import "./componentStyles/Projects.css"
import SampleProject from "./assets-comp/sample-project.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import {useRef, useEffect} from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShinyText from './utils/ShinyText';

const Projects = () => {
  const projectRef = useRef([]);
  projectRef.current = [];

  const addToRefs = (el) => {
    if (el && !projectRef.current.includes(el)) {
      projectRef.current.push(el);
    }
  };

  useEffect(() => {
    projectRef.current.forEach((el) => {
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
    <div id='projects' className='projects-section-container'>
      <div ref={addToRefs} className="projects-section-title">
        <ShinyText text="Projects" className='projects-section-heading'  disabled={false} speed={3} />
        {/* <p className='projects-section-heading'>Projects</p> */}
        <a className='projects-section-viewmore' href="">view more</a>
      </div>
      <div ref={addToRefs} className="projects-container">
        <div className="project">
          <div className="project-img-container">
            <img className='project-img' src={SampleProject} alt="" />
          </div>
          <div className="project-description">
            <p className="project-title">Sample Project</p>
            <p ref={addToRefs} className="project-about">This a Project sample it will be reused to create other projects. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut corrupti labore omnis sit iusto repellendus. Labore est unde deserunt aspernatur libero, fugit non ipsam in, sapiente nemo distinctio, nobis optio.</p>
            <div className="project-techstack">
              <p ref={addToRefs} className='project-tech'>HTML</p>
              <p ref={addToRefs} className='project-tech'>CSS</p>
              <p ref={addToRefs} className='project-tech'>Javascript</p>
            </div>
            <p ref={addToRefs} className="project-features">Key Features :</p>
            <ul ref={addToRefs} className='project-feature-list'>
              <li className='project-feature' >Lorem, ipsum dolor.</li>
              <li className='project-feature' >Lorem ipsum dolor sit.</li>
              <li className='project-feature' >Lorem ipsum dolor sit amet.</li>
            </ul>
            <div ref={addToRefs} className="project-redirect-section">
              <a className='project-redirect-link' href=""><FontAwesomeIcon icon={faUpRightFromSquare} style={{color: "#000000",}} />  Live</a>
              <a className='project-redirect-link' href=""><FontAwesomeIcon icon={faUpRightFromSquare} style={{color: "#000000",}} />  Repo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
