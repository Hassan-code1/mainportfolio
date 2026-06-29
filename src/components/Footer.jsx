import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import "./componentStyles/Footer.css";

const ViewCounter = () => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("portfolio-visited")) {
      fetch("https://api.countapi.xyz/get/hassankhan/portfolio")
        .then((res) => res.json())
        .then((data) => setViews(data.value))
        .catch(console.error);
      return;
    }

    fetch("https://api.countapi.xyz/hit/hassankhan/portfolio")
      .then((res) => res.json())
      .then((data) => {
        setViews(data.value);
        localStorage.setItem("portfolio-visited", "true");
      })
      .catch(console.error);
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
