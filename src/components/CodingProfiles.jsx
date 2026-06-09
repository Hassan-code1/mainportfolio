import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import StaggerText from './utils/StaggerText';
import './componentStyles/CodingProfiles.css';

gsap.registerPlugin(ScrollTrigger);

export default function CodingProfiles() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cp-header',
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: window.innerWidth < 768 ? 'top 95%' : 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.cp-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cp-grid',
            start: window.innerWidth < 768 ? 'top 95%' : 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="coding-profiles" className="cp-section py-16 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="cp-header text-center md:text-left mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2">
            <StaggerText text="Competitive Programming" />
          </h2>
          <p className="mt-4 text-[#6366F1] font-mono text-sm md:text-base">Metrics · Rankings · Achievements</p>
        </div>

        <div className="cp-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          <div className="cp-card">
            <div className="cp-card-header">
              <span className="cp-platform-name">LeetCode</span>
              <a href="https://leetcode.com/u/uKmlMzaX5j/" target="_blank" rel="noopener noreferrer" className="cp-link-btn">
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
            </div>
            <div className="cp-iframe-wrapper">
              <iframe
                src="https://leetcard.jacoblin.cool/uKmlMzaX5j?theme=dark&font=Nunito&ext=contest"
                title="LeetCode Profile"
                scrolling="no"
              />
            </div>
          </div>

          <div className="cp-card">
            <div className="cp-card-header">
              <span className="cp-platform-name">CodeChef</span>
              <a href="https://www.codechef.com/users/breezy_wolf_22" target="_blank" rel="noopener noreferrer" className="cp-link-btn">
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
            </div>
            <div className="cp-stats-grid">
              <div className="cp-stat-box">
                <span className="cp-stat-label">Handle</span>
                <span className="cp-stat-value cp-cc-accent">breezy_wolf_22</span>
              </div>
              <div className="cp-stat-box">
                <span className="cp-stat-label">Stars</span>
                <span className="cp-stat-value cp-cc-accent">2-Star</span>
              </div>
              <div className="cp-stat-box">
                <span className="cp-stat-label">CP Rating</span>
                <span className="cp-stat-value">1443</span>
              </div>
              <div className="cp-stat-box">
                <span className="cp-stat-label">DSA Rating</span>
                <span className="cp-stat-value">1622</span>
              </div>
            </div>
          </div>

          <div className="cp-card">
            <div className="cp-card-header">
              <span className="cp-platform-name">Codeforces</span>
              <a href="https://codeforces.com/profile/2024kuec2011" target="_blank" rel="noopener noreferrer" className="cp-link-btn">
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
            </div>
            <div className="cp-stats-grid">
              <div className="cp-stat-box">
                <span className="cp-stat-label">Handle</span>
                <span className="cp-stat-value cp-cf-accent">2024kuec2011</span>
              </div>
              <div className="cp-stat-box">
                <span className="cp-stat-label">Rank</span>
                <span className="cp-stat-value cp-cf-accent">Newbie</span>
              </div>
              <div className="cp-stat-box">
                <span className="cp-stat-label">Current Rating</span>
                <span className="cp-stat-value">1088</span>
              </div>
              <div className="cp-stat-box">
                <span className="cp-stat-label">Max Rating</span>
                <span className="cp-stat-value">1088</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
