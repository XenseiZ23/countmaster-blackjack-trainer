
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Play, Pause, Settings, ArrowLeft } from 'lucide-react';
import { GameStats } from '../types';
import { FluorescentCards } from './FluorescentCards';

interface GameHeaderProps {
  stats: GameStats;
  totalRounds: number;
  speed: number;
  playerCount: number;
  isPaused: boolean;
  setIsPaused: (val: boolean) => void;
  setShowSettings: (val: boolean) => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  stats,
  totalRounds,
  speed,
  playerCount,
  isPaused,
  setIsPaused,
  setShowSettings
}) => {
  return (
    <header className="p-4 flex justify-between items-center bg-black/40 backdrop-blur-sm border-b border-b-white/10 z-10 shrink-0">
      <div className="flex items-center gap-3">
        {/* Explicit, high-contrast back navigation option */}
        <Link 
          to="/" 
          className="p-2.5 sm:px-3 sm:py-1.5 bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 hover:border-emerald-500/30 rounded-xl flex items-center justify-center gap-1.5 text-neutral-300 hover:text-emerald-400 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-95 shadow-md"
          aria-label="Back to Portal Hub"
        >
          <ArrowLeft size={14} className="stroke-[2.5]" />
          <span className="hidden md:inline">Hub</span>
        </Link>

        <div className="w-px h-6 bg-white/10 md:block hidden" />

        <Link to="/" className="flex items-center gap-3 group hover:opacity-90 transition-opacity">
          <FluorescentCards size="sm" />
          <div>
            <h1 className="text-sm font-black uppercase tracking-wider text-white">CountMaster</h1>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-400">
              <Trophy size={10} /> Accuracy: {stats.accuracy}% ({stats.correctGuesses}/{stats.totalRounds})
            </div>
          </div>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-6 px-4 py-1.5 rounded-xl bg-white/5 border border-white/5 mr-2">
          <div className="flex flex-col items-center">
            <span className="text-[7px] text-neutral-500 uppercase font-black tracking-widest leading-none mb-1">Round</span>
            <span className="text-[11px] font-mono font-bold text-emerald-400 leading-none">{totalRounds + 1}</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[7px] text-neutral-500 uppercase font-black tracking-widest leading-none mb-1">Pace</span>
            <span className="text-[11px] font-mono font-bold text-white leading-none">{speed}ms</span>
          </div>
        </div>
        
        <div className="hidden sm:flex flex-col items-end mr-4">
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Players</span>
          <span className="text-sm font-bold">{playerCount}</span>
        </div>

        <button 
          onClick={() => setIsPaused(!isPaused)}
          className={`p-2 rounded-full transition-opacity duration-300 ${isPaused ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'hover:bg-white/10 text-white'}`}
        >
          {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} />}
        </button>
        
        <button 
          onClick={() => setShowSettings(true)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};
