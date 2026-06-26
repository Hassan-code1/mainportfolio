import React, { useState, useEffect, useRef } from 'react';
import './componentStyles/SkillStackGame.css';

import NodeLogo from "./assets-comp/node-logo.png";
import GoLogo from "./assets-comp/golang-mascot.png";
import MongoLogo from "./assets-comp/mongo-logo.png";
import ReactLogo from "./assets-comp/react-logo.png";
import SqlLogo from "./assets-comp/sql-logo.png";
import TailwindLogo from "./assets-comp/tailwind-logo.png";
import DockerLogo from "./assets-comp/docker.png";



const SKILLS = [
  { id: 'node', name: 'Node.js', width: 70, color: 'bg-green-600', imgSrc: NodeLogo },
  { id: 'react', name: 'React', width: 60, color: 'bg-sky-500', imgSrc: ReactLogo },
  { id: 'mongo', name: 'Mongo DB', width: 50, color: 'bg-emerald-600', imgSrc: MongoLogo },
  { id: 'sql', name: 'Postgre SQL', width: 40, color: 'bg-indigo-600', imgSrc: SqlLogo },
  { id: 'golang', name: 'Go Lang', width: 30, color: 'bg-cyan-400', imgSrc: GoLogo },
  { id: 'tailwind', name: 'TailwindCss', width: 25, color: 'bg-teal-500', imgSrc: TailwindLogo },
  { id: 'docker', name: 'Docker', width: 25, color: 'bg-blue-600', imgSrc: DockerLogo }
];

const BLOCK_HEIGHT = 48; // px (h-12 is 48px)
const DROP_GAP = 90; // px height above stack for hovering

export default function SkillStackGame() {
  const [gameState, setGameState] = useState('start'); // start, playing, dropping, won, gameover
  const [placedBlocks, setPlacedBlocks] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [movingLeft, setMovingLeft] = useState(0);
  const [, setDropTick] = useState(0); // Used to force re-render during drop animation
  
  const directionRef = useRef(1);
  const dropYRef = useRef(0);
  const dropVRef = useRef(0);
  const failRotateRef = useRef(0);
  const failRotateVRef = useRef(0);
  const isFailRef = useRef(false);

  // Unified Animation Loop
  useEffect(() => {
    if (gameState === 'playing' || gameState === 'dropping') {
      let animationFrameId;
      
      const loop = () => {
        if (gameState === 'playing') {
          setMovingLeft((prev) => {
            const currentBlock = SKILLS[currentLevel];
            // Progressive Difficulty: speed increases with level. Starts slower than before.
            const speed = 0.6 + (currentLevel * 0.18);
            let nextPos = prev + (directionRef.current * speed);
            
            const maxLeft = 100 - currentBlock.width;
            
            // Bounce off walls
            if (nextPos >= maxLeft) {
              nextPos = maxLeft;
              directionRef.current = -1;
            } else if (nextPos <= 0) {
              nextPos = 0;
              directionRef.current = 1;
            }
            
            return nextPos;
          });
          // Update hover height for playing state
          dropYRef.current = (currentLevel * BLOCK_HEIGHT) + DROP_GAP;
        } 
        else if (gameState === 'dropping') {
          // Accelerate downwards (gravity)
          dropVRef.current += 1.8;
          dropYRef.current -= dropVRef.current;
          
          if (isFailRef.current) {
            failRotateRef.current += failRotateVRef.current;
            
            // If it falls off screen
            if (dropYRef.current < -150) {
              setGameState('gameover');
              return;
            }
          } else {
            // Target height to land on the stack
            const targetY = currentLevel * BLOCK_HEIGHT;
            if (dropYRef.current <= targetY) {
              dropYRef.current = targetY; // Snap to target
              
              // Place the block
              setPlacedBlocks(prev => [...prev, { ...SKILLS[currentLevel], x: movingLeft }]);
              
              if (currentLevel + 1 === SKILLS.length) {
                setGameState('won');
              } else {
                setCurrentLevel(prev => prev + 1);
                setGameState('playing');
              }
              return; // End drop loop frame
            }
          }
          // Force render for drop animation
          setDropTick(t => t + 1);
        }
        
        animationFrameId = requestAnimationFrame(loop);
      };
      
      animationFrameId = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [gameState, currentLevel, movingLeft]); // included movingLeft to ensure state closure consistency if needed

  // Handle clicking to drop the block
  const handleDrop = () => {
    if (gameState !== 'playing' || currentLevel >= SKILLS.length) return;
    
    const currentBlock = SKILLS[currentLevel];
    dropVRef.current = 0;
    failRotateRef.current = 0;
    
    if (currentLevel === 0) {
      // First block always lands perfectly centered
      const centeredX = (100 - currentBlock.width) / 2;
      setMovingLeft(centeredX);
      isFailRef.current = false;
    } else {
      // Calculate center of mass for collision
      const droppingCenter = movingLeft + (currentBlock.width / 2);
      
      const prevBlock = placedBlocks[currentLevel - 1];
      const prevLeft = prevBlock.x;
      const prevRight = prevBlock.x + prevBlock.width;
      
      // If the center of the dropping block is within the boundaries of the previous block
      if (droppingCenter >= prevLeft && droppingCenter <= prevRight) {
        isFailRef.current = false;
      } else {
        isFailRef.current = true;
        // Rotate away from the stack depending on which side it fell
        failRotateVRef.current = droppingCenter < (prevLeft + prevBlock.width / 2) ? -4 : 4;
      }
    }
    
    setGameState('dropping');
  };

  const startGame = () => {
    setGameState('playing');
    setPlacedBlocks([]);
    setCurrentLevel(0);
    setMovingLeft(0);
    directionRef.current = 1;
    dropYRef.current = DROP_GAP;
    failRotateRef.current = 0;
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="font-mono text-xs text-[var(--accent-primary)] uppercase tracking-widest font-bold">
          Level {currentLevel}/{SKILLS.length}
        </span>
        <span className="font-mono text-xs text-[var(--text-secondary)] uppercase">
          {gameState === 'playing' ? 'Tap to drop' : (gameState === 'dropping' ? 'Dropping...' : 'Standby')}
        </span>
      </div>
      
      {/* Game Container */}
      <div 
        className="relative w-full h-[500px] rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300 ssg-container"
        onClick={handleDrop}
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none ssg-grid" 
             style={{ backgroundSize: '24px 24px' }}>
        </div>

        {/* Placed Blocks */}
        {placedBlocks.map((block, i) => (
          <div 
            key={i} 
            className={`absolute h-12 ${block.color} flex items-center justify-center rounded-sm border-t border-white/20 border-b-4 border-black/30 shadow-lg`}
            style={{
              width: `${block.width}%`,
              left: `${block.x}%`,
              bottom: `${i * BLOCK_HEIGHT}px`,
            }}
          >
            <img src={block.imgSrc} alt={block.name} className="w-5 h-5 mr-2 object-contain filter drop-shadow-md" />
            <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">{block.name}</span>
          </div>
        ))}
        
        {/* Moving / Dropping Active Block */}
        {(gameState === 'playing' || gameState === 'dropping') && currentLevel < SKILLS.length && (
          <div 
            className={`absolute h-12 ${SKILLS[currentLevel].color} flex items-center justify-center rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] border-t border-white/30 border-b-4 border-black/30 z-10 transition-none`}
            style={{
              width: `${SKILLS[currentLevel].width}%`,
              left: `${movingLeft}%`,
              bottom: `${dropYRef.current}px`,
              transform: `rotate(${failRotateRef.current}deg)`,
              transformOrigin: 'center'
            }}
          >
            <img src={SKILLS[currentLevel].imgSrc} alt={SKILLS[currentLevel].name} className="w-5 h-5 mr-2 object-contain filter drop-shadow-md" />
            <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">{SKILLS[currentLevel].name}</span>
          </div>
        )}

        {/* Start Overlay */}
        {gameState === 'start' && (
          <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center z-20 transition-all ssg-overlay-start">
            <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
               <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
               </svg>
            </div>
            <h2 className="text-4xl font-bold mb-2 font-clash tracking-tight ssg-title-start">Skill Stack</h2>
            <p className="mb-8 font-mono text-sm text-center px-6 ssg-desc-start">
              Balance the center of mass to build my tech stack.
            </p>
            <button 
              onClick={(e) => { e.stopPropagation(); startGame(); }} 
              className="px-8 py-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] hover:scale-105 active:scale-95 text-white rounded-full font-bold transition-all shadow-lg shadow-[var(--accent-primary)]/30"
            >
              Start Game
            </button>
          </div>
        )}
        
        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center z-20 animate-in fade-in duration-300 ssg-overlay-fail">
            <h2 className="text-4xl font-bold mb-2 font-clash ssg-title-fail">Oops!</h2>
            <p className="mb-8 font-mono text-sm ssg-desc-fail">Stack fell at Level {currentLevel}</p>
            <button 
              onClick={(e) => { e.stopPropagation(); startGame(); }} 
              className="px-8 py-3 hover:scale-105 active:scale-95 rounded-full font-bold transition-all shadow-xl ssg-btn-fail"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Victory Overlay */}
        {gameState === 'won' && (
          <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center z-20 animate-in fade-in zoom-in duration-500 ssg-overlay-win">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-4xl font-bold mb-2 font-clash ssg-title-win">Full Stack!</h2>
            <p className="mb-8 font-mono text-sm ssg-desc-win">You built the complete stack.</p>
            <button 
              onClick={(e) => { e.stopPropagation(); startGame(); }} 
              className="px-8 py-3 hover:scale-105 active:scale-95 rounded-full font-bold transition-all shadow-xl ssg-btn-win"
            >
              Rebuild
            </button>
          </div>
        )}
      </div>
    </div>
  );
}