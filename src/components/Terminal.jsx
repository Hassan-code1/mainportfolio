import React, { useState, useRef, useEffect } from 'react';
import SkillStackGame from './SkillStackGame';
import SectionHeader from './SectionHeader';

const Terminal = () => {
  const [showGame, setShowGame] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'TERMINAL_SESSION initialized.' },
    { type: 'system', text: "Type 'help' to list available commands." }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isProcessing]);

  const simulateFetch = async (target, linkText, url) => {
    setIsProcessing(true);
    setHistory(prev => [...prev, { type: 'system', text: `[INFO] Resolving route to ${target}...` }]);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    setHistory(prev => [...prev, { type: 'system', text: `[OK] Connection established.` }]);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    setHistory(prev => [...prev, { 
      type: 'link', 
      text: `[ OPEN ${linkText} ]`,
      url: url
    }]);
    setIsProcessing(false);
    
    // Auto-open in new tab after a brief delay
    setTimeout(() => {
      window.open(url, '_blank');
    }, 500);
  };

  const scrollToSection = async (id, name) => {
    setIsProcessing(true);
    setHistory(prev => [...prev, { type: 'system', text: `[INFO] Locating module: ${name}...` }]);
    
    await new Promise(resolve => setTimeout(resolve, 400));
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setHistory(prev => [...prev, { type: 'system', text: `[OK] Navigated to ${name}.` }]);
    } else {
      setHistory(prev => [...prev, { type: 'system', text: `[ERR] Module ${name} not found in DOM.` }]);
    }
    setIsProcessing(false);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Enter' && input.trim() && !isProcessing) {
      const cmd = input.trim();
      setInput('');
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
      
      setHistory(prev => [...prev, { type: 'user', text: `root@hassan:~$ ${cmd}` }]);
      
      const normalizedCmd = cmd.toLowerCase().trim();
      
      switch(normalizedCmd) {
        case 'help':
          setHistory(prev => [...prev, 
            { type: 'system', text: 'AVAILABLE COMMANDS:' },
            { type: 'system', text: '  help            list commands' },
            { type: 'system', text: '  about           display profile' },
            { type: 'system', text: '  resume          open resume' },
            { type: 'system', text: '  github          open GitHub' },
            { type: 'system', text: '  linkedin        open LinkedIn' },
            { type: 'system', text: '  leetcode        open LeetCode' },
            { type: 'system', text: '  projects        inspect projects' },
            { type: 'system', text: '  skills          inspect dependency graph' },
            { type: 'system', text: '  education       inspect education' },
            { type: 'system', text: '  contact         open contact' },
            { type: 'system', text: '  clear           clear terminal' },
            { type: 'system', text: '  play skillstack launch game' }
          ]);
          break;
        case 'about':
          setHistory(prev => [...prev, 
            { type: 'system', text: 'Hassan Khan | Backend & Systems Developer' },
            { type: 'system', text: 'Specializing in high-performance backends, distributed systems, and clean architecture.' }
          ]);
          break;
        case 'resume':
        case 'get resume':
          await simulateFetch('Resume', 'RESUME', import.meta.env.VITE_RESUME_URL);
          break;
        case 'github':
        case 'get github':
          await simulateFetch('GitHub', 'GITHUB', import.meta.env.VITE_GITHUB_URL);
          break;
        case 'linkedin':
        case 'get linkedin':
          await simulateFetch('LinkedIn', 'LINKEDIN', import.meta.env.VITE_LINKEDIN_URL);
          break;
        case 'leetcode':
        case 'get leetcode':
          await simulateFetch('LeetCode', 'LEETCODE', import.meta.env.VITE_LEETCODE_URL);
          break;
        case 'projects':
          await scrollToSection('projects', 'ARCHITECTURE_NODES');
          break;
        case 'skills':
          await scrollToSection('skills', 'SYSTEM_DEPENDENCIES');
          break;
        case 'education':
          await scrollToSection('education', 'LIVE_SERVER_LOGS');
          break;
        case 'contact':
          await scrollToSection('contact', 'CONTACT_NODE');
          break;
        case 'clear':
          setHistory([]);
          break;
        case 'play skillstack':
          setHistory(prev => [...prev, { type: 'system', text: 'Initiating Skill Stack sequence...' }]);
          setTimeout(() => setShowGame(true), 600);
          break;
        default:
          setHistory(prev => [...prev, { type: 'system', text: `[ERR] command not found: ${cmd}` }, { type: 'system', text: "Type 'help' to list available commands." }]);
      }
    }
  };

  return (
    <section id="terminal" className="w-full flex flex-col h-[500px] md:h-[600px]">
      <SectionHeader id="02" title="TERMINAL_SESSION" />
      
      <div 
        className="flex-1 bg-[#0E0E11] border border-[#222222] p-3 md:p-4 font-mono text-[13px] md:text-sm flex flex-col relative group overflow-hidden cursor-text shadow-xl shadow-[#050505]/50"
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        {showGame && (
          <div className="absolute inset-0 z-20 bg-[#050505] flex flex-col">
            <button 
              onClick={() => setShowGame(false)}
              className="absolute top-2 right-2 z-50 px-2 py-1 border border-[#222222] text-[#6E737D] hover:text-[#DC2626] hover:border-[#DC2626] transition-colors bg-[#050505] text-[10px]"
            >
              [ EXIT_GAME ]
            </button>
            <div className="flex-1 w-full flex items-center justify-center p-4">
              <SkillStackGame />
            </div>
          </div>
        )}

        <div className="absolute top-2 right-4 text-[10px] text-[#6E737D] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="hidden md:inline">● ● ●</span> TERMINAL / SESSION
        </div>

        <div ref={scrollRef} className="flex-1 overflow-x-hidden overflow-y-auto terminal-scrollbar mb-2 flex flex-col gap-1 pr-2">
          {history.map((line, i) => (
            <div key={i} className="mb-1 break-words">
              {line.type === 'user' && <span className="text-[#EDEDED]">{line.text}</span>}
              {line.type === 'system' && <span className="text-[#6E737D] whitespace-pre-wrap">{line.text}</span>}
              {line.type === 'link' && (
                <a 
                  href={line.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block mt-2 px-4 py-2 border border-[#222222] bg-[#050505] text-[#00ADD8] hover:bg-[#00ADD8] hover:text-[#050505] transition-colors"
                >
                  {line.text}
                </a>
              )}
            </div>
          ))}
          {isProcessing && (
            <div className="text-[#47A248] animate-pulse">_</div>
          )}
        </div>
        
        <div className="flex gap-2 items-center text-[#EDEDED] border-t border-[#222222] pt-3 mt-1">
          <span className="text-[#00ADD8] whitespace-nowrap">root@hassan:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            className="flex-1 bg-transparent border-none outline-none text-[16px] md:text-sm font-mono focus:ring-0 disabled:opacity-50 min-w-0"
            autoComplete="off"
            spellCheck="false"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="Terminal Input"
            placeholder={isProcessing ? "PROCESSING..." : ""}
          />
        </div>
      </div>
    </section>
  );
};

export default Terminal;
