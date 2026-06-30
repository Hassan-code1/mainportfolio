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
    <footer className="footer bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] !px-6 !py-6 transition-colors duration-300">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[var(--text-secondary)] font-mono text-sm">
          &copy; {new Date().getFullYear()} Hassan. All rights reserved.
        </p>
        <ViewCounter />
      </div>
    </footer>
  );
}

export default Footer;
