import React, { useEffect } from 'react';
import "./componentStyles/Skills.css";

import ReactLogo from "./assets-comp/react-logo.png";
import HtmlLogo from "./assets-comp/html-logo.png";
import CssLogo from "./assets-comp/css-logo.png";
import JsLogo from "./assets-comp/js-logo.png";
import TailwindLogo from "./assets-comp/tailwind-logo.png";
import ExpressLogo from "./assets-comp/express-logo.png";
import NodeLogo from "./assets-comp/node-logo.png";
import SqlLogo from "./assets-comp/sql-logo.png";
import MongoLogo from "./assets-comp/mongo-logo.png";
import CppLogo from "./assets-comp/c++-logo.png";
import CLogo from "./assets-comp/c-logo.png";
import PythonLogo from "./assets-comp/python-logo.png";
import Git from "./assets-comp/git-logo.png";
import Github from "./assets-comp/github-logo.png";
import Netlify from "./assets-comp/netlify.png";
import Vercel from "./assets-comp/vercel.jpeg";
import Vscode from "./assets-comp/vscode-logo.png";
import Leetcode from "./assets-comp/leetcode-logo.png";
import Codechef from "./assets-comp/codechef-logo.png";
import Codeforces from  "./assets-comp/codeforces-logo.png";

import gsap from "gsap";
import {useRef} from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShinyText from './utils/ShinyText';
import ScrollStack, { ScrollStackItem } from './utils/ScrollStack';

const skillSections = [
  {
    title: "Front End",
    className: "skillnorm-frontend",
    skills: [
      { name: "React", logo: ReactLogo },
      { name: "HTML", logo: HtmlLogo },
      { name: "CSS", logo: CssLogo },
      { name: "Javascript", logo: JsLogo },
      { name: "Tailwind", logo: TailwindLogo },
    ],
  },
  {
    title: "Backend",
    className: "skillnorm-backend",
    skills: [
      { name: "Express", logo: ExpressLogo },
      { name: "Node JS", logo: NodeLogo },
    ],
  },
  {
    title: "DataBases",
    className: "skillnorm-database",
    skills: [
      { name: "SQL", logo: SqlLogo },
      { name: "Mongo", logo: MongoLogo },
    ],
  },
  {
    title: "DSA and Competetive Programming",
    className: "skillnorm-dsa",
    skills: [
      { name: "C++", logo: CppLogo },
      { name: "C", logo: CLogo },
      { name: "Javascript", logo: JsLogo },
      { name: "Python", logo: PythonLogo },
    ],
  },
  {
    title: "Tools & Platforms",
    className: "skillnorm-tools",
    skills: [
      { name: "Git", logo: Git },
      { name: "Github", logo: Github },
      { name: "Vs Code", logo: Vscode },
      { name: "Netlify", logo: Netlify },
      { name: "Vercel", logo: Vercel },
      // { name: "Leetcode", logo: Leetcode },
      // { name: "Codechef", logo: Codeforces },
      // { name: "CodeChef", logo: Codechef },
    ],
  },
];

const Skills = () => {
  const skillRef = useRef([]);
  skillRef.current = [];

  const addToRefs = (el) => {
    if (el && !skillRef.current.includes(el)) {
      skillRef.current.push(el);
    }
  };

  useEffect(() => {
    skillRef.current.forEach((el) => {
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
    <div className="skillnorm-container">
      <ShinyText
        text="My Skills"
        className="skillnorm-title"
        disabled={false}
        speed={3}
      />
      <p ref={addToRefs} className="skillnorm-para">
        Tools and Technologies I have worked with throughout my experience and
        projects
      </p>
        {skillSections.map((section) => (
          <div className={section.className} key={section.title}>
            <h3 ref={addToRefs} className="skillnorm-heading">
              {section.title}
            </h3>
            <div className="skillnormals">
              {section.skills.map((skill) => (
                <div ref={addToRefs} className="skillnormal" key={skill.name}>
                  <img
                    className="skillnormal-img"
                    src={skill.logo}
                    alt={skill.name.toLowerCase()}
                  />
                  <p className="skillnormal-text">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Skills;

