import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import "./componentStyles/Footer.css";
import { trackView } from '../utils/counter';

const ViewCounter = () => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    const fetchViews = async () => {
      const count = await trackView();
      if (count !== null) {
        setViews(count);
      }
    };
    
    fetchViews();
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] font-mono ml-auto">
      <FontAwesomeIcon icon={faEye} />
      <span>{views ?? "..."} Views</span>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-[#050505] border-t border-[#222222] px-6 py-12 mt-12 font-mono text-xs text-[#6E737D]">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        <div className="flex flex-col gap-2">
          <div className="text-[#EDEDED] font-bold">HASSAN KHAN / SOFTWARE ENGINEER</div>
          <div className="flex flex-wrap gap-4 items-center mt-2 text-[10px]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#47A248] rounded-full animate-pulse"></span>
              SYS.STATUS: ONLINE
            </span>
            <span className="text-[#222222]">|</span>
            <span>BUILD: 2026</span>
            <span className="text-[#222222]">|</span>
            <span>LOCATION: INDIA</span>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="flex gap-4">
            <a href={import.meta.env.VITE_GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-[#00ADD8] transition-colors" aria-label="GitHub">
              [ GITHUB ]
            </a>
            <a href={import.meta.env.VITE_LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-[#00ADD8] transition-colors" aria-label="LinkedIn">
              [ LINKEDIN ]
            </a>
            <a href={import.meta.env.VITE_LEETCODE_URL} target="_blank" rel="noreferrer" className="hover:text-[#00ADD8] transition-colors" aria-label="LeetCode">
              [ LEETCODE ]
            </a>
          </div>
          <div className="text-[10px] opacity-50 flex items-center gap-4">
            <span>&copy; 2026 HASSAN KHAN</span>
            <ViewCounter />
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
