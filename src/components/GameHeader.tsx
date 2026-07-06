
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Play, Pause, Settings, ArrowLeft } from 'lucide-react';
import { GameStats } from '../types';
import { AcademyLogo } from './AcademyLogo';

interface GameHeaderProps {
  stats: GameStats;
  totalRounds: number;
  speed: number;
  playerCount: number;
  isPaused: boolean;
  setIsPaused: (val: boolean) => void;
  setShowSettings: (val: boolean) => void;
  onBackClick?: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  stats,
  totalRounds,
  speed,
  playerCount,
  isPaused,
  setIsPaused,
  setShowSettings,
  onBackClick
}) => {
  return (
    <header className="px-3 py-2.5 sm:p-4 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-b-white/10 z-10 shrink-0">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Explicit, high-contrast back navigation option */}
        <Link 
          to="/" 
          onClick={(e) => {
            if (onBackClick) {
              e.preventDefault();
              onBackClick();
            }
          }}
          className="p-2 sm:px-3 sm:py-1.5 bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 hover:border-emerald-900/30 rounded-xl flex items-center justify-center gap-1.5 text-neutral-300 hover:text-emerald-300 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-95 shadow-md"
          aria-label="Back"
        >
          <ArrowLeft size={14} className="stroke-[2.5]" />
          <span className="hidden md:inline">Back</span>
        </Link>

        <div className="w-px h-6 bg-white/10 md:block hidden" />

        <Link 
          to="/" 
          onClick={(e) => {
            if (onBackClick) {
              e.preventDefault();
              onBackClick();
            }
          }}
          className="flex items-center select-none group hover:opacity-90 transition-opacity"
        >
          <AcademyLogo size="sm" />
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="overflow-hidden flex items-center whitespace-nowrap"
          >
            <span className="text-white/15 select-none font-light py-1 text-sm mx-3 hidden sm:inline">|</span>
            <div className="ml-1.5 sm:ml-0 flex flex-col justify-center">
              {/* Desktop Header */}
              <h1 className="text-sm font-sport font-[800] italic tracking-tight text-white uppercase leading-none hidden sm:block">
                Card <span className="text-emerald-400">Counter</span>
              </h1>
              <div className="hidden sm:flex items-center gap-2 text-[9px] uppercase tracking-widest text-emerald-300 mt-1">
                <Trophy size={10} /> Accuracy: {stats.accuracy}% ({stats.correctGuesses}/{stats.totalRounds})
              </div>

              {/* Mobile Compact Accuracy Badge */}
              <div className="flex sm:hidden items-center gap-1 text-[9px] font-black uppercase tracking-wider text-emerald-400 px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 shadow-sm leading-none">
                <Trophy size={9} className="text-emerald-400" /> {stats.accuracy}%
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 py-1.5 rounded-xl bg-neutral-900/90 border border-white/10 shadow-inner mr-0.5 sm:mr-2">
          <div className="flex flex-col items-center justify-center text-center min-w-[24px] sm:min-w-[28px]">
            <span className="text-[6.5px] sm:text-[7px] text-neutral-400 uppercase font-black tracking-widest mb-0.5">Round</span>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-white leading-none">{totalRounds + 1}</span>
          </div>
          <div className="w-px h-5 bg-white/10" />
          <div className="flex flex-col items-center justify-center text-center min-w-[28px] sm:min-w-[32px]">
            <span className="text-[6.5px] sm:text-[7px] text-neutral-400 uppercase font-black tracking-widest mb-0.5">Pace</span>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-white leading-none">{speed}ms</span>
          </div>
          <div className="w-px h-5 bg-white/10 hidden sm:block" />
          <div className="hidden sm:flex flex-col items-center justify-center text-center min-w-[28px]">
            <span className="text-[7px] text-neutral-400 uppercase font-black tracking-widest mb-0.5">Players</span>
            <span className="text-[11px] font-mono font-bold text-white leading-none">{playerCount}</span>
          </div>
        </div>

        <button 
          onClick={() => setIsPaused(!isPaused)}
          className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-center shadow-md ${isPaused ? 'bg-white/15 border-white/30 text-white scale-105' : 'bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300 hover:text-white'}`}
          title={isPaused ? "Resume Game" : "Pause Game"}
        >
          {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} />}
        </button>
        
        <button 
          onClick={() => setShowSettings(true)}
          className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-neutral-300 hover:text-white transition-all shadow-md animate-none"
          title="Trainer Settings"
        >
          <Settings size={16} />
        </button>
      </div>
    </header>
  );
};
