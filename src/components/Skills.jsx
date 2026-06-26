import React, { useRef, useEffect } from "react";
import "./componentStyles/Skills3D.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StaggerText from "./utils/StaggerText";
import DomeGallery from "./DomeGallery";

import ReactLogo    from "./assets-comp/react-logo.png";
import HtmlLogo     from "./assets-comp/html-logo.png";
import CssLogo      from "./assets-comp/css-logo.png";
import JsLogo       from "./assets-comp/js-logo.png";
import TailwindLogo from "./assets-comp/tailwind-logo.png";
import ExpressLogo  from "./assets-comp/express-logo.png";
import NodeLogo     from "./assets-comp/node-logo.png";
import SqlLogo      from "./assets-comp/sql-logo.png";
import MongoLogo    from "./assets-comp/mongo-logo.png";
import CppLogo      from "./assets-comp/c++-logo.png";
import CLogo        from "./assets-comp/c-logo.png";
import PythonLogo   from "./assets-comp/python-logo.png";
import Git          from "./assets-comp/git-logo.png";
import Github       from "./assets-comp/github-logo.png";
import Netlify      from "./assets-comp/netlify.png";
import Vercel       from "./assets-comp/vercel.jpeg";
import Vscode       from "./assets-comp/vscode-logo.png";
import GoLogo       from "./assets-comp/golang-mascot.png"
gsap.registerPlugin(ScrollTrigger);

const ALL_SKILLS = [
  { name: "React", logo: ReactLogo, color: "#61DAFB" },
  { name: "HTML", logo: HtmlLogo, color: "#E34F26" },
  { name: "CSS", logo: CssLogo, color: "#1572B6" },
  { name: "JavaScript", logo: JsLogo, color: "#F7DF1E" },
  { name: "Tailwind", logo: TailwindLogo, color: "#06B6D4" },
  { name: "Express", logo: ExpressLogo, color: "#ffffff" },
  { name: "Node JS", logo: NodeLogo, color: "#339933" },
  { name: "SQL", logo: SqlLogo, color: "#4479A1" },
  { name: "MongoDB", logo: MongoLogo, color: "#47A248" },
  { name: "Go Lang", logo: GoLogo, color: "#00ADD8" },
  { name: "C++", logo: CppLogo, color: "#00599C" },
  { name: "C", logo: CLogo, color: "#A8B9CC" },
  { name: "Python", logo: PythonLogo, color: "#3776AB" },
  { name: "Git", logo: Git, color: "#F05032" },
  { name: "GitHub", logo: Github, color: "#ffffff" },
  { name: "Netlify", logo: Netlify, color: "#00C7B7" },
  { name: "Vercel", logo: Vercel, color: "#ffffff" },
  { name: "VS Code", logo: Vscode, color: "#007ACC" },

];

const domeImages = ALL_SKILLS.map(skill => ({ src: skill.logo, alt: skill.name }));
const MARQUEE_ITEMS = [...ALL_SKILLS, ...ALL_SKILLS, ...ALL_SKILLS];

const Skills = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-heading-container',
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: window.innerWidth < 768 ? 'top 95%' : 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      gsap.fromTo(
        '.dome-container',
        { opacity: 0 },
        {
          opacity: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: window.innerWidth < 768 ? 'top 95%' : 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="skills" ref={containerRef} className="py-16 md:py-32 relative z-10 overflow-hidden bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 md:px-6 mb-12 md:mb-16 skills-heading-container text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-2">
          <StaggerText text="Technical Skills" />
        </h2>
        <p className="mt-4 text-[var(--accent-primary)] font-mono text-sm md:text-base">Tools · Technologies · Expertise</p>
      </div>

      {/* Desktop 3D Dome */}
      <div className="dome-container hidden md:block w-full h-[600px] relative">
        <DomeGallery images={domeImages} 
          fit={0.5}
          minRadius={800}
          segments={26}
          dragDampening={1.8}
          grayscale={true}
          overlayBlurColor="var(--bg-primary)"
        />
      </div>

      {/* Mobile Vertical Marquee */}
      <div className="md:hidden w-full overflow-hidden h-[400px] relative mask-vertical">
        <div className="flex flex-col gap-4 animate-marquee-vertical py-4">
          {MARQUEE_ITEMS.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="skill-pill mx-auto w-48 glass-panel flex-shrink-0 flex items-center justify-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 border border-[var(--border-subtle)] shadow-[var(--shadow-diffused)]"
              style={{ backgroundColor: 'var(--bg-surface)' }}
            >
              <img src={skill.logo} alt={skill.name} className="w-8 h-8 object-contain" />
              <span className="font-mono text-[var(--text-primary)] text-sm font-semibold">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
