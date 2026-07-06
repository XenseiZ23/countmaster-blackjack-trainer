
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, Play, RotateCcw, Zap, Database, Users, Gauge, LifeBuoy, MessageSquare, Send, CheckCircle, ArrowLeft, Star } from 'lucide-react';
import { GameMode, GameStatus } from '../types';

interface SettingsOverlayProps {
  showSettings: boolean;
  status: GameStatus;
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  deckCount: number;
  setDeckCount: (count: number) => void;
  playerCount: number;
  setPlayerCount: (count: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  setShowSettings: (val: boolean) => void;
  resetGame: (status?: GameStatus) => void;
}

export const SettingsOverlay: React.FC<SettingsOverlayProps> = ({
  showSettings,
  status,
  gameMode,
  setGameMode,
  deckCount,
  setDeckCount,
  playerCount,
  setPlayerCount,
  speed,
  setSpeed,
  setShowSettings,
  resetGame
}) => {
  const speedLevels = [
    { name: 'Slow', value: 2500, pos: 0, intensity: 'Basic', color: 'text-emerald-400 font-bold' },
    { name: 'Intermediate', value: 850, pos: 50, intensity: 'Standard', color: 'text-amber-400 font-bold' },
    { name: 'Fast', value: 400, pos: 100, intensity: 'Expert Level', color: 'text-rose-400 font-bold' },
  ];

  const mapSliderToSpeed = (val: number) => {
    if (val <= 50) return 2500 - (val / 50) * 1650;
    return 850 - ((val - 50) / 50) * 450;
  };

  const mapSpeedToSlider = (s: number) => {
    if (s >= 2500) return 0;
    if (s >= 850) return ((2500 - s) / 1650) * 50;
    if (s >= 400) return 50 + ((850 - s) / 450) * 50;
    return 100;
  };

  const currentLevel = speed >= 1600 ? speedLevels[0] : speed > 600 ? speedLevels[1] : speedLevels[2];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 overflow-auto relative">
      <style dangerouslySetInnerHTML={{ __html: `
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 14px; width: 14px; border-radius: 50%; background: #ffffff; cursor: pointer; border: 2px solid #52525b; box-shadow: 0 0 10px rgba(0,0,0,0.5); margin-top: -6px; }
        input[type=range]::-moz-range-thumb { height: 14px; width: 14px; border-radius: 50%; background: #ffffff; cursor: pointer; border: 2px solid #52525b; box-shadow: 0 0 10px rgba(0,0,0,0.5); }
        input[type=range]::-webkit-slider-runnable-track { height: 2px; background: rgba(255,255,255,0.1); border-radius: 1px; }
        input[type=range]::-moz-range-track { height: 2px; background: rgba(255,255,255,0.1); border-radius: 1px; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-neutral-800/40 backdrop-blur-sm border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-12 shadow-2xl flex flex-col gap-6 sm:gap-12"
      >
        <div className="text-center space-y-4 relative">
          {/* Top navigation row: Menu / Back on Left, and Close button on Right */}
          <div className="flex items-center justify-between w-full select-none pb-2">
            {status === 'setup' ? (
              <Link 
                to="/" 
                className="text-neutral-400 hover:text-neutral-200 transition-colors flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-widest"
                title="Back to Main Menu"
              >
                <ArrowLeft size={14} className="stroke-[3.5]" />
                <span>Menu</span>
              </Link>
            ) : (
              <div /> // Spacer if not setup
            )}

            {showSettings && (
              <button 
                onClick={() => {
                  if (status === 'setup') resetGame('idle');
                  setShowSettings(false);
                }}
                className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-widest"
                title="Close Settings"
              >
                <span>Close</span>
                <XCircle size={18} />
              </button>
            )}
          </div>
          
          <div className="p-3 rounded-2xl bg-neutral-950/40 border border-neutral-800/60 max-w-sm mx-auto select-none">
            <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest leading-relaxed">Training & Practice Software</p>
            <p className="text-[10px] text-neutral-500 font-medium leading-relaxed mt-1">This application does not allow real betting or money. It is exclusively for card counting technical practice.</p>
          </div>

          <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent uppercase italic">
            Settings
          </h1>
          <p className="text-neutral-400 text-sm font-medium max-w-md mx-auto leading-relaxed">
            {showSettings ? 'Modify your current table settings.' : 'Adjust your table parameters for professional training.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fadeIn">
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold"><Zap size={14} /> Training Mode</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'standard', name: 'Standard', desc: 'Infinite', activeStyle: 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950/40 scale-[1.03]' },
                { id: 'advanced', name: 'Advanced', desc: 'Calculator', activeStyle: 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-950/40 scale-[1.03]' }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setGameMode(mode.id as GameMode)}
                  className={`h-14 rounded-xl border transition-all flex flex-col items-center justify-center gap-0.5 ${gameMode === mode.id ? mode.activeStyle : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:border-white/20 hover:text-neutral-200'}`}
                >
                  <span className="font-bold text-xs leading-tight">{mode.name}</span>
                  <span className="text-[7px] uppercase tracking-tighter opacity-70 font-black leading-tight">{mode.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold"><Database size={14} /> Number of Decks</div>
            <div className="grid grid-cols-4 gap-2">
              {[2, 4, 6, 8].map(count => (
                <button
                  key={count}
                  onClick={() => { setDeckCount(count); setGameMode('advanced'); }}
                  className={`h-14 rounded-xl border transition-all flex items-center justify-center font-bold text-xs ${deckCount === count && gameMode === 'advanced' ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-950/40 scale-[1.03]' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-neutral-200'}`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold"><Users size={14} /> Players at Table</div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => setPlayerCount(num)}
                  className={`h-14 rounded-xl border transition-all flex items-center justify-center font-bold text-xs ${playerCount === num ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950/40 scale-[1.03]' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-neutral-200'}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-2 text-neutral-400 uppercase tracking-widest text-[10px] font-bold"><Gauge size={14} /> Dealing Speed</div>
            <div className="grid grid-cols-3 gap-2">
              {speedLevels.map(s => {
                const isActive = Math.abs(speed - s.value) < 10;
                const speedActiveStyle = s.value === 2500 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950/40 scale-[1.03]' : s.value === 850 ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-950/40 scale-[1.03]' : 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-lg shadow-rose-950/40 scale-[1.03]';
                return (
                  <button
                    key={s.value}
                    onClick={() => setSpeed(s.value)}
                    className={`h-14 rounded-xl border transition-all flex items-center justify-center text-[9px] uppercase font-black ${isActive ? speedActiveStyle : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:border-white/20 hover:text-neutral-200'}`}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-12 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 px-8 py-6 rounded-[2rem] border border-white/5 gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-500">Dealing Pace</div>
              <div className="text-3xl font-bold font-mono text-white tabular-nums">
                {(speed / 1000).toFixed(2)}<span className="text-xs text-neutral-500 px-2 font-sans italic">sec</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-500">Intensity</div>
              <div className={`text-base font-bold uppercase tracking-wider transition-opacity duration-300 ${currentLevel.color}`}>{currentLevel.intensity}</div>
            </div>
          </div>
          
          <div className="relative pt-6">
            <div className="absolute top-0 left-[7px] right-[7px] h-full pointer-events-none">
              {speedLevels.map(level => {
                const isNear = Math.abs(speed - level.value) < 10;
                return (
                  <React.Fragment key={level.value}>
                    <div className="absolute top-0 flex flex-col items-center -translate-x-1/2" style={{ left: `${level.pos}%` }}>
                      <div className={`w-3 h-3 rounded-full transition-opacity ${isNear ? 'bg-neutral-300 scale-125 border border-white ring-2 ring-neutral-800/40' : 'bg-white/10'}`} />
                    </div>
                    <div className="absolute top-12 -translate-x-1/2 flex flex-col items-center" style={{ left: `${level.pos}%` }}>
                      <span className={`text-[11px] uppercase tracking-[0.3em] font-black whitespace-nowrap ${isNear ? level.color : 'text-neutral-700'}`}>{level.name}</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            
            <input 
              type="range" min="0" max="100" value={mapSpeedToSlider(speed)}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                let finalDelay = mapSliderToSpeed(val);
                for (const s of speedLevels) {
                  if (Math.abs(val - mapSpeedToSlider(s.value)) < 5) { finalDelay = s.value; break; }
                }
                setSpeed(Math.round(finalDelay));
              }}
              className="relative z-10 w-full cursor-pointer h-2 bg-transparent appearance-none outline-none mb-20"
            />
          </div>
        </div>

         <div className="pt-2 flex flex-col gap-4">
          <button 
            onClick={() => { resetGame('idle'); setShowSettings(false); }}
            className="w-full py-6 bg-gradient-to-br from-[#2a2a2a] to-[#141414] hover:from-[#3a3a3a] hover:to-[#222222] border border-white/15 rounded-[2rem] text-xl font-black uppercase tracking-wider shadow-2xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-4 text-white"
          >
            {status === 'setup' ? 'Start Training' : 'Apply & Return'} <Play fill="currentColor" size={24} />
          </button>

          {showSettings && (
            <button 
              onClick={() => { resetGame('setup'); setShowSettings(false); }}
              className="w-full py-4 text-neutral-400 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold text-xs flex items-center justify-center gap-2"
            >
              <RotateCcw size={14} /> Exit & Reset Game
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
