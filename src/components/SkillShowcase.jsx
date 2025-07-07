// import React, { use } from 'react'
import React, { useEffect, useRef } from 'react';
import './componentStyles/SkillShowcase.css';
import MongoLogo from "./assets-comp/mongo-logo.png";
import NodeLogo from "./assets-comp/node-logo.png";
import ReactLogo from "./assets-comp/react-logo.png";
import TailwindLogo from "./assets-comp/tailwind-logo.png";
import gsap from 'gsap';

const ImageWindow = () => {
  const mongoRef = useRef(null);
  const tailwindRef = useRef(null);
  const reactRef = useRef(null);
  const nodeRef = useRef(null);
  const mongotextRef = useRef(null);
  const reacttextRef = useRef(null);
  const tailwindtextRef = useRef(null);
  const nodetextRef = useRef(null);
  const tailwindContainerRef = useRef(null);
  const tl = gsap.timeline({repeat:-1});
  useEffect(() => {
    gsap.to(mongoRef.current, {
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
    gsap.to(mongotextRef.current, {
      x:-10,
      rotateZ: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "linear"
    });
    gsap.to(tailwindRef.current, {
      x: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
    gsap.to(tailwindtextRef.current,{
      y:-20,
      repeat:-1,
      duration:3,
      yoyo: true,
      ease:"easein"
    });
    gsap.to(tailwindContainerRef.current, {
      scale : 1.2,
      duration: 2,
      repeat: -1,
      yoyo:true,
      ease:"easein"
    });
    gsap.to(reactRef.current, {
      rotation: 360,
      duration: 5,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%"
    });
    gsap.to(reacttextRef.current, {
      rotateY: -30,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "linear"
    });
    gsap.to(nodeRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    tl.fromTo(nodetextRef.current,
      {y:-40},
      {y:10, rotateZ:-10, duration:1.4, ease:"power1.out"}
    )
    .fromTo(nodetextRef.current,
      {y:10, rotateZ:-10},
      {y:0, rotateZ:10, duration:0.5, ease:"easein"}
    )
    .fromTo(nodetextRef.current, 
      {y:0, rotateZ:10},
      {y:0, rotateZ:-10, duration:0.5, ease:"easein"}
    )
    .fromTo(nodetextRef.current,
      {y:0, rotateZ: -10},
      {y:-40, rotateZ: 10, duration:2, ease:"power1.in"}
    )
  });

  return (
    <div  className="skillshowcase-container">
      <div className="skill-grid">
        <div className="skill-item">
          <p ref={mongotextRef} className="skill-text">MongoDB</p>
          <div  className="img-container-skill">
            <img ref={mongoRef} src={MongoLogo} alt="MongoDB" className="skill-img" />
          </div>
        </div>
        <div className="skill-item">
          <p ref={nodetextRef} className="skill-text">NodeJS</p>
          <div ref={nodeRef} className="img-container-skill">
            <img src={NodeLogo} alt="NodeJS" className="skill-img" />
          </div>
        </div>
        <div className="skill-item">
          <div className="img-container-skill">
            <img ref={reactRef} src={ReactLogo} alt="ReactJS" className="skill-img" />
          </div>
          <p ref={reacttextRef} className="skill-text-bottom">ReactJS</p>
        </div>
        <div className="skill-item">
          <div className="skill-visual-container">
            <div ref={tailwindContainerRef} className='tailwind-background-container'></div>
            <div className="tailwind-container-skill">
              <img ref={tailwindRef} src={TailwindLogo} alt="Tailwind CSS" className="skill-img" />
            </div>
          </div>
          <p ref={tailwindtextRef} className="skill-text-bottom">Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
};

export default ImageWindow;

