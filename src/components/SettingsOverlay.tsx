
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
  const [activeTab, setActiveTab] = React.useState<'settings' | 'support' | 'feedback'>('settings');
  const [feedbackCategory, setFeedbackCategory] = React.useState<string>('Suggestion');
  const [feedbackRating, setFeedbackRating] = React.useState<number>(5);
  const [feedbackMessage, setFeedbackMessage] = React.useState<string>('');
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = React.useState<boolean>(false);

  const speedLevels = [
    { name: 'Slow', value: 2500, pos: 0, intensity: 'Basic', color: 'text-emerald-400' },
    { name: 'Intermediate', value: 850, pos: 50, intensity: 'Standard', color: 'text-blue-400' },
    { name: 'Fast', value: 400, pos: 100, intensity: 'Expert Level', color: 'text-red-400' },
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
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000000_100%)] overflow-auto">
      <style dangerouslySetInnerHTML={{ __html: `
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 14px; width: 14px; border-radius: 50%; background: #ffffff; cursor: pointer; border: 2px solid #10b981; box-shadow: 0 0 10px rgba(0,0,0,0.5); margin-top: -6px; }
        input[type=range]::-moz-range-thumb { height: 14px; width: 14px; border-radius: 50%; background: #ffffff; cursor: pointer; border: 2px solid #10b981; box-shadow: 0 0 10px rgba(0,0,0,0.5); }
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
          {showSettings && (
            <button 
              onClick={() => {
                if (status === 'setup') resetGame('idle');
                setShowSettings(false);
              }}
              className="absolute -top-6 -right-6 p-4 text-neutral-500 hover:text-white transition-colors"
              title="Close Settings"
            >
              <XCircle size={32} />
            </button>
          )}
          
          <div className="flex items-center justify-center gap-6 text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-4 select-none">
            <Link to="/about" className="text-neutral-500 hover:text-white transition-colors cursor-pointer">ABOUT</Link>
            <button 
              type="button"
              onClick={() => setActiveTab('support')} 
              className={`transition-colors cursor-pointer outline-none ${activeTab === 'support' ? 'text-emerald-400 font-extrabold' : 'text-neutral-500 hover:text-white'}`}
            >
              SUPPORT
            </button>
            <a href="https://github.com/XenseiZ23/countmaster-blackjack-trainer" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">GITHUB</a>
            <button 
              type="button"
              onClick={() => setActiveTab('feedback')} 
              className={`transition-colors cursor-pointer outline-none ${activeTab === 'feedback' ? 'text-emerald-400 font-extrabold' : 'text-neutral-500 hover:text-white'}`}
            >
              FEEDBACK
            </button>
          </div>
          
          <div className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 max-w-sm mx-auto">
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest leading-relaxed">Training & Practice Software</p>
            <p className="text-[10px] text-neutral-500 font-medium leading-relaxed mt-1">This application does not allow real betting or money. It is exclusively for card counting technical practice.</p>
          </div>

          <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent uppercase italic">
            {activeTab === 'settings' && 'Settings'}
            {activeTab === 'support' && 'Support Center'}
            {activeTab === 'feedback' && 'Developer Feedback'}
          </h1>
          <p className="text-neutral-400 text-sm font-medium max-w-md mx-auto leading-relaxed">
            {activeTab === 'settings' && (showSettings ? 'Modify your current table settings.' : 'Adjust your table parameters for professional training.')}
            {activeTab === 'support' && 'Find answers to common questions about card counting and training limits.'}
            {activeTab === 'feedback' && 'Help us improve the simulator. Log an issue, suggest improvements, or send praise.'}
          </p>
        </div>

        {activeTab === 'settings' && (
          <React.Fragment>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fadeIn">
              <div className="space-y-6">
                <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 uppercase tracking-widest text-[10px] font-bold"><Zap size={14} /> Training Mode</div>
                <div className="grid grid-cols-2 gap-2">
                  {[{ id: 'standard', name: 'Standard', desc: 'Infinite' }, { id: 'advanced', name: 'Advanced', desc: 'Calculator' }].map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setGameMode(mode.id as GameMode)}
                      className={`h-14 rounded-xl border transition-all flex flex-col items-center justify-center gap-0.5 ${gameMode === mode.id ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl shadow-emerald-500/20 scale-105' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'}`}
                    >
                      <span className="font-bold text-xs leading-tight">{mode.name}</span>
                      <span className="text-[7px] uppercase tracking-tighter opacity-60 font-black leading-tight">{mode.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 uppercase tracking-widest text-[10px] font-bold"><Database size={14} /> Number of Decks</div>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 4, 6, 8].map(count => (
                    <button
                      key={count}
                      onClick={() => { setDeckCount(count); setGameMode('advanced'); }}
                      className={`h-14 rounded-xl border transition-all flex items-center justify-center font-bold text-xs ${deckCount === count && gameMode === 'advanced' ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl scale-105' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'}`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 uppercase tracking-widest text-[10px] font-bold"><Users size={14} /> Players at Table</div>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      onClick={() => setPlayerCount(num)}
                      className={`h-14 rounded-xl border transition-all flex items-center justify-center font-bold text-xs ${playerCount === num ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl shadow-emerald-500/20 scale-105' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 uppercase tracking-widest text-[10px] font-bold"><Gauge size={14} /> Dealing Speed</div>
                <div className="grid grid-cols-3 gap-2">
                  {speedLevels.map(s => {
                    const isActive = Math.abs(speed - s.value) < 10;
                    return (
                      <button
                        key={s.value}
                        onClick={() => setSpeed(s.value)}
                        className={`h-14 rounded-xl border transition-all flex items-center justify-center text-[9px] uppercase font-black ${isActive ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl scale-105' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'}`}
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
                  <div className="text-3xl font-bold font-mono text-emerald-400 tabular-nums">
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
                          <div className={`w-3 h-3 rounded-full transition-opacity ${isNear ? 'bg-emerald-400 scale-125 shadow-[0_0_15px_rgba(52,211,153,0.8)]' : 'bg-white/10'}`} />
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
                className="w-full py-6 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 rounded-[2rem] text-xl font-black uppercase tracking-wider shadow-2xl shadow-emerald-900/40 transition-opacity hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
              >
                {status === 'setup' ? 'Start Training' : 'Apply & Return'} <Play fill="currentColor" size={24} />
              </button>

              {status === 'setup' && (
                <Link
                  to="/"
                  className="w-full py-4 text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10 rounded-[1.5rem] transition-all uppercase tracking-[0.2em] font-extrabold text-[10px] flex items-center justify-center gap-2 mt-2"
                >
                  <ArrowLeft size={14} className="stroke-[2.5]" /> Back to Main Menu
                </Link>
              )}

              {showSettings && (
                <button 
                  onClick={() => { resetGame('setup'); setShowSettings(false); }}
                  className="w-full py-4 text-neutral-500 hover:text-red-400 transition-colors uppercase tracking-[0.2em] font-bold text-xs flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} /> Exit & Reset Game
                </button>
              )}
            </div>
          </React.Fragment>
        )}

        {activeTab === 'support' && (
          <div className="space-y-6 text-left animate-fadeIn">
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 no-scrollbar border-b border-white/5 pb-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400">How do I track the running count?</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Each deal holds a specific weighting value: low cards from 2-6 add +1, high cards from 10-A subtract -1, and middle cards are neutral. Accumulate this arithmetic sum sequentially over the table hands.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400">What is the difference between modes?</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Standard Mode runs card-deals endlessly, while Advanced Mode operates with a set physical shoe size (up to 8 decks) showing card density penetration in the discard tray.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400">How does the shoe reset?</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">In Advanced Mode, when deck penetration limits are crossed, dealing will halt. Simply complete verification or click "Reset Game" to instantiate a fresh physical shoe.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-center space-y-2">
              <div className="flex justify-center text-emerald-400">
                <LifeBuoy size={24} />
              </div>
              <h4 className="font-bold text-sm text-white">Need Additional Strategy Help?</h4>
              <p className="text-[11px] text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Connect directly with our training team for diagnostic support at <span className="text-emerald-300 font-bold font-mono">support@countmaster.dev</span>
              </p>
            </div>

            <button 
              type="button"
              onClick={() => setActiveTab('settings')}
              className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-neutral-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={14} /> Back to Table Settings
            </button>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="space-y-6 text-left animate-fadeIn">
            {!isFeedbackSubmitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setIsFeedbackSubmitted(true); }} className="space-y-4">
                <div className="space-y-2">
                  <span className="text-emerald-400 uppercase tracking-widest text-[9px] font-bold block">Feedback Category</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 block">
                    {['Suggestion', 'Bug Report', 'Praise', 'Other'].map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFeedbackCategory(cat)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${feedbackCategory === cat ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400 font-medium' : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-emerald-400 uppercase tracking-widest text-[9px] font-bold block">Rate countmaster</span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFeedbackRating(num)}
                        className="p-1 outline-none"
                      >
                        <Star 
                          size={24} 
                          className={`transition-colors ${num <= feedbackRating ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'}`} 
                        />
                      </button>
                    ))}
                    <span className="text-xs text-neutral-500 font-bold px-2 uppercase tracking-widest">({feedbackRating} / 5 Rating)</span>
                  </div>
                </div>

                <div className="space-y-2 col-span-2">
                  <span className="text-emerald-400 uppercase tracking-widest text-[9px] font-bold block">Your Message</span>
                  <textarea
                    rows={4}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    required
                    placeholder="Tell us what you like or report unexpected behaviors..."
                    className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 outline-none resize-none transition-colors"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button 
                    type="button"
                    onClick={() => setActiveTab('settings')}
                    className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-neutral-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-colors shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2"
                  >
                    Submit Feedback <Send size={12} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-inner">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white uppercase tracking-wider">Feedback Sent Successfully!</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
                    We appreciate your input. Your report is classified in our systems under <span className="text-emerald-400 font-bold font-mono">{feedbackCategory}</span>.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 max-w-xs mx-auto">
                  <button 
                    onClick={() => {
                      setIsFeedbackSubmitted(false);
                      setFeedbackMessage('');
                      setActiveTab('settings');
                    }}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors"
                  >
                    Back to Settings
                  </button>
                  <button 
                    onClick={() => {
                      setIsFeedbackSubmitted(false);
                      setFeedbackMessage('');
                    }}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors"
                  >
                    Write More
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
