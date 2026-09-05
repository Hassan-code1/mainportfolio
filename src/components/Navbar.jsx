import React, { useState, useEffect } from 'react';

const navItems = [
  { id: 'about', label: 'IDENTITY', short: 'ABOUT' },
  { id: 'terminal', label: 'SESSION', short: 'TERM' },
  { id: 'education', label: 'NODES', short: 'EDU' },
  { id: 'projects', label: 'WORK', short: 'WORK' },
  { id: 'skills', label: 'DEPENDENCIES', short: 'STACK' },
  { id: 'logs', label: 'LOGS', short: 'LOGS' },
  { id: 'contact', label: 'CONTACT', short: 'PING' },
];

const BOOT_TIME = new Date('2026-09-04T00:00:00Z').getTime();

const Navbar = () => {
  const [uptime, setUptime] = useState(() => Math.floor((Date.now() - BOOT_TIME) / 1000));
  const [activeSection, setActiveSection] = useState('01_IDENTITY');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Real uptime calculation
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - BOOT_TIME) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sections = [
      { id: 'about', name: '01_IDENTITY' },
      { id: 'terminal', name: '02_TERMINAL_SESSION' },
      { id: 'education', name: '03_EDUCATION_NODES' },
      { id: 'projects', name: '04_ARCHITECTURE_NODES' },
      { id: 'skills', name: '05_SYSTEM_DEPENDENCIES' },
      { id: 'logs', name: '06_LIVE_SERVER_LOGS' },
      { id: 'contact', name: '07_CONTACT_NODE' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.id === entry.target.id);
            if (section) setActiveSection(section.name);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const formatUptime = (seconds) => {
    const y = Math.floor(seconds / (86400 * 365));
    const d = Math.floor((seconds % (86400 * 365)) / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    if (y > 0) {
      return `${y}Y ${d}D ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${d}D ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505] border-b border-[#222222] px-6 py-3 font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#6E737D]">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#47A248] animate-pulse"></span>
          <span className="text-[#47A248] font-bold tracking-tight">SYS.ONLINE</span>
        </div>
        
        {/* CENTER (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 border border-[#222222] px-4 py-1.5 bg-[#0E0E11] transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-[#00ADD8]">NODE:</span>
            <span className="text-[#EDEDED]">PORTFOLIO</span>
          </div>
          <div className="w-px h-3 bg-[#222222]"></div>
          <div className="flex items-center gap-2">
            <span className="text-[#659AD2]">LATENCY:</span>
            <span className="text-[#EDEDED]">SESSION</span>
          </div>
          <div className="w-px h-3 bg-[#222222]"></div>
          <div className="flex items-center gap-2">
            <span className="text-[#6E737D]">UPTIME:</span>
            <span className="text-[#EDEDED] w-[90px]">{formatUptime(uptime)}</span>
          </div>
          <div className="w-px h-3 bg-[#222222]"></div>
          <div className="flex items-center gap-2 min-w-[180px]">
            <span className="text-[#6E737D]">MODULE:</span>
            <span className="text-[#EDEDED]">{activeSection}</span>
          </div>
        </div>

        {/* RIGHT (Desktop) */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item, i) => (
            <button 
              key={item.id} 
              onClick={() => scrollTo(item.id)}
              className="text-[#6E737D] hover:text-[#00ADD8] transition-colors cursor-crosshair group"
            >
              <span className="opacity-50 mr-1 group-hover:opacity-100 transition-opacity">[{String(i + 1).padStart(2, '0')}]</span>
              {item.short}
            </button>
          ))}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#EDEDED] border border-[#222222] px-3 py-1 hover:border-[#00ADD8] hover:text-[#00ADD8] transition-colors"
          >
            [ MENU ]
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0E0E11] border-b border-[#222222] flex flex-col p-4 gap-4 shadow-xl">
          <div className="flex flex-col gap-2 border-b border-[#222222] pb-4">
            <div className="flex justify-between"><span>NODE:</span><span className="text-[#EDEDED]">PORTFOLIO</span></div>
            <div className="flex justify-between"><span>UPTIME:</span><span className="text-[#EDEDED]">{formatUptime(uptime)}</span></div>
            <div className="flex justify-between"><span>MODULE:</span><span className="text-[#EDEDED] truncate max-w-[200px] text-right">{activeSection}</span></div>
          </div>
          <div className="flex flex-col gap-4 pt-2">
            {navItems.map((item, i) => (
              <button 
                key={item.id} 
                onClick={() => scrollTo(item.id)}
                className="text-left text-[#EDEDED] hover:text-[#00ADD8] transition-colors"
              >
                <span className="text-[#6E737D] mr-2">[{String(i + 1).padStart(2, '0')}]</span> {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
