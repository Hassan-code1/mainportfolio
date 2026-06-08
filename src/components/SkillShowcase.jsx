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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(mongoRef.current, {
        y: -15, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
      gsap.to(tailwindRef.current, {
        y: 15, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5
      });
      gsap.to(reactRef.current, {
        y: -20, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1
      });
      gsap.to(nodeRef.current, {
        y: 10, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full max-w-[500px] mx-auto p-8 relative">
      <div className="grid grid-cols-2 gap-x-8 gap-y-16 relative h-[400px]">
        <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-[45%]">
          <div className="bg-[#27272A] border border-white/10 text-[#EDEDED] text-xs font-medium px-4 py-1.5 rounded-full mb-6 shadow-lg backdrop-blur-sm">
            MongoDB
          </div>
          <img ref={mongoRef} src={MongoLogo} alt="MongoDB" className="w-16 h-16 object-contain" />
        </div>
        <div className="flex flex-col items-center justify-center absolute top-12 right-0 w-[45%]">
          <div className="bg-[#27272A] border border-white/10 text-[#EDEDED] text-xs font-medium px-4 py-1.5 rounded-full mb-6 shadow-lg backdrop-blur-sm">
            NodeJS
          </div>
          <img ref={nodeRef} src={NodeLogo} alt="NodeJS" className="w-16 h-16 object-contain" />
        </div>
        <div className="flex flex-col items-center justify-center absolute bottom-12 left-0 w-[45%]">
          <img ref={reactRef} src={ReactLogo} alt="ReactJS" className="w-16 h-16 object-contain mb-6" />
          <div className="bg-[#27272A] border border-white/10 text-[#EDEDED] text-xs font-medium px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            ReactJS
          </div>
        </div>
        <div className="flex flex-col items-center justify-center absolute bottom-0 right-0 w-[45%]">
          <img ref={tailwindRef} src={TailwindLogo} alt="Tailwind CSS" className="w-16 h-16 object-contain mb-6" />
          <div className="bg-[#27272A] border border-white/10 text-[#EDEDED] text-xs font-medium px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            Tailwind CSS
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageWindow;

