
import React from 'react';
import { Clover, Trophy, Play, Pause, Settings } from 'lucide-react';
import { GameStats } from '../types';

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
    <header className="p-4 flex justify-between items-center bg-black/40 backdrop-blur-sm border-b border-white/10 z-10 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
          <Clover size={24} className="text-emerald-500 fill-emerald-500/20" />
        </div>
        <div>
          <h1 className="text-sm font-medium tracking-tight">CountMaster Blackjack Trainer</h1>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-400/80">
            <Trophy size={10} /> Accuracy: {stats.accuracy}% ({stats.correctGuesses}/{stats.totalRounds})
          </div>
        </div>
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
