
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Clover } from 'lucide-react';
import { FeedbackPanel } from './FeedbackPanel';
import { GameStatus, Card } from '../types';

interface GameOverlaysProps {
  status: GameStatus;
  isPaused: boolean;
  setIsPaused: (val: boolean) => void;
  startRound: () => void;
  resetGame: (status?: GameStatus) => void;
  setShowSettings: (val: boolean) => void;
  runningCount: number;
  deck: Card[];
  feedback: { show: boolean, correct: boolean, message: string };
  userCountInput: string;
  setUserCountInput: (val: string | ((prev: string) => string)) => void;
  verifyCount: (e?: React.KeyboardEvent | React.MouseEvent) => void;
  continueAfterError: () => void;
}

export const GameOverlays: React.FC<GameOverlaysProps> = ({
  status,
  isPaused,
  setIsPaused,
  startRound,
  resetGame,
  setShowSettings,
  runningCount,
  deck,
  feedback,
  userCountInput,
  setUserCountInput,
  verifyCount,
  continueAfterError
}) => {
  return (
    <AnimatePresence>
      {isPaused && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
           <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-8 max-w-md px-6"
           >
             <div className="text-center space-y-4">
               <h2 className="text-4xl sm:text-7xl font-black italic uppercase tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Pause</h2>
               <p className="text-neutral-400 font-medium text-xs sm:text-sm tracking-wide leading-relaxed">Training session paused. Table data hidden to maintain count integrity.</p>
             </div>

             <button 
              onClick={() => setIsPaused(false)}
              className="group relative px-12 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase italic tracking-wider transition-opacity duration-300 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(16,185,129,0.3)]"
             >
               <div className="flex items-center gap-4">
                 <span>Resume</span>
                 <Play size={18} fill="currentColor" />
               </div>
               <div className="absolute inset-0 rounded-2xl border-2 border-white/40 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-opacity duration-300" />
             </button>
           </motion.div>
        </motion.div>
      )}

      {status === 'idle' && !isPaused && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
        >
          <button 
            onClick={startRound}
            className="group relative px-12 py-5 bg-emerald-600 hover:bg-emerald-500 rounded-2xl shadow-2xl transition-opacity hover:scale-105 active:scale-95 flex flex-col items-center gap-2"
          >
            <Play fill="currentColor" size={48} className="text-white" />
            <span className="font-bold text-xl uppercase tracking-widest">Start Hand</span>
          </button>
        </motion.div>
      )}

      {status === 'shoe_depleted' && !isPaused && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
        >
          <div className="max-w-md w-full bg-neutral-900 border border-white/10 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-8 text-center">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20">
              <Clover size={40} className="text-emerald-500 fill-emerald-500/20" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">End of Shoe</h2>
              <p className="text-neutral-400 text-sm font-medium leading-relaxed italic">
                You've reached the deck penetration cut card. Not enough cards to guarantee a full hand without affecting true count integrity.
              </p>
              <div className="grid grid-cols-2 gap-3 w-full bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Running Count</p>
                  <p className="text-2xl font-mono font-bold text-white leading-none">{runningCount >= 0 ? `+${runningCount}` : runningCount}</p>
                </div>
                <div className="text-center border-l border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">True Count</p>
                  <p className="text-2xl font-mono font-bold text-emerald-400 leading-none">
                    {(runningCount / Math.max(0.25, deck.length / 52)).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full">
              <button 
                onClick={() => resetGame('idle')}
                className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black text-xs uppercase tracking-widest transition-opacity shadow-xl shadow-emerald-900/20 active:scale-95"
              >
                New Shoe (Same Settings)
              </button>
              
              <button 
                onClick={() => setShowSettings(true)}
                className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-opacity active:scale-95 text-neutral-400"
              >
                Change Settings
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {status === 'checking_count' && !isPaused && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
        >
          <FeedbackPanel
            show={feedback.show}
            correct={feedback.correct}
            message={feedback.message}
            runningCount={runningCount}
            userCountInput={userCountInput}
            setUserCountInput={setUserCountInput}
            verifyCount={verifyCount}
            continueAfterError={continueAfterError}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
