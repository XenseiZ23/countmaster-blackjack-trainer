import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ShieldAlert, Award, Sparkles, Play } from 'lucide-react';
import { AcademyLogo } from '../components/AcademyLogo';

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col justify-between overflow-x-hidden transform-gpu relative">
      {/* Classic Casino Green Felt Backdrop */}
      <div className="absolute inset-0 z-0 bg-[#143d26] overflow-hidden">
        {/* Felt Texture pattern */}
        <div className="absolute inset-0 opacity-25 bg-[url('https://www.transparenttextures.com/patterns/felt.png')] mix-blend-overlay pointer-events-none" />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 w-full px-5 py-6 sm:px-8 border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Link 
            to="/"
            className="group inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] uppercase tracking-widest font-extrabold text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all shadow-md"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center select-none group/brand cursor-default">
            <AcademyLogo size="sm" />
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="overflow-hidden flex items-center whitespace-nowrap"
            >
              <span className="text-white/15 select-none font-light py-1 text-sm sm:text-base mx-3">|</span>
              <span className="text-sm font-sport font-[800] italic tracking-tight text-white uppercase leading-none">
                CARD COUNTING <span className="text-emerald-600">ACADEMY</span>
              </span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 py-10 sm:py-16 md:py-20 flex flex-col gap-12 sm:gap-16">
        
        {/* Display Title with elegant animations */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-block px-3 py-1 bg-emerald-950/20 border border-emerald-900/30 rounded-full mb-3">
            <span className="text-[10px] md:text-xs text-emerald-300 font-extrabold uppercase tracking-[0.2em] flex items-center gap-2">
              <Award size={12} /> Technical Training Blueprint
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-sport font-[800] italic tracking-tight text-white uppercase">
            About the Trainer
          </h1>
          <p className="text-neutral-400 font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A state-of-the-art simulator designed for professional memory retention training. Hone card counting speed, true count calculation, and structural blackjack analysis without financial risk.
          </p>
        </motion.div>

        {/* Info Grid - Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: What is Card Counting Trainer */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-neutral-800/40 backdrop-blur-sm border border-white/5 rounded-[1.5rem] p-6 sm:p-8 flex flex-col gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <AcademyLogo size="sm" />
              <h2 className="text-lg font-sport font-[800] italic tracking-tight uppercase text-white">The Application</h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              This trainer simulates real-world high-stakes blackjack action minus any gambling aspect. By automating multiple computer players, managing custom dealer dealing rates, and requiring active mathematical verification of the shoe state, the software serves as a modern gymnasium for card counters of all skill levels.
            </p>
          </motion.div>

          {/* Card 2: Training Objectives */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-800/40 backdrop-blur-sm border border-white/5 rounded-[1.5rem] p-6 sm:p-8 flex flex-col gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 shadow-inner">
                <BookOpen size={20} className="text-blue-400" />
              </div>
              <h2 className="text-lg font-sport font-[800] italic tracking-tight uppercase text-white">Training Goals</h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Develop elite reflex speeds to maintain the count during fast-paced dealing intervals. In **Infinite Mode**, practitioners build raw endurance. In **Advanced Mode**, they must combine count tracking with card penetration analysis (True Count) representing genuine multi-deck environments.
            </p>
          </motion.div>
        </div>

        {/* Card counting interactive chart panel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-800/40 backdrop-blur-sm border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col gap-6 text-center md:text-left relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-sport font-[800] italic tracking-tight uppercase text-white">The Card Counting Strategy</h2>
                <p className="text-xs text-neutral-400">The global industry standard system for mathematical card estimation.</p>
              </div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                Additive Formula
              </div>
            </div>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Under card counting systems, every drawn card is categorized into one of three numerical values. Keeping a sum totaling these values provides the absolute statistical advantage over the table.
            </p>

            {/* Strategy Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-emerald-950/30 border border-emerald-900/40 rounded-2xl p-5 text-center transition-all hover:bg-emerald-950/45">
                <div className="text-3xl font-black text-emerald-300 mb-2">+1</div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">Low Cards</div>
                <div className="text-[10px] text-neutral-400 font-mono">2, 3, 4, 5, 6</div>
                <p className="text-[9px] text-neutral-500 mt-2 font-medium">Increases advantage when deleted</p>
              </div>

              <div className="bg-neutral-900/40 border border-neutral-700/30 rounded-2xl p-5 text-center transition-all hover:bg-neutral-950/40">
                <div className="text-3xl font-black text-white/55 mb-2">0</div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">Middle Cards</div>
                <div className="text-[10px] text-neutral-400 font-mono">7, 8, 9</div>
                <p className="text-[9px] text-neutral-500 mt-2 font-medium">Has zero impact on math margins</p>
              </div>

              <div className="bg-red-900/15 border border-red-500/30 rounded-2xl p-5 text-center transition-all hover:bg-red-950/25">
                <div className="text-3xl font-black text-red-500 mb-2">-1</div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">High Cards</div>
                <div className="text-[10px] text-neutral-400 font-mono">10, J, Q, K, A</div>
                <p className="text-[9px] text-neutral-500 mt-2 font-medium">Decreases advantage when deleted</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tactical Pro Tips */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-neutral-800/40 backdrop-blur-sm border border-white/5 rounded-[1.5rem] p-6 sm:p-8 flex flex-col gap-6"
        >
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row border-b border-white/5 pb-4">
            <div className="w-12 h-12 bg-emerald-950/20 border border-emerald-900/30 rounded-2xl flex items-center justify-center">
              <Sparkles size={22} className="text-emerald-300" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">Tactical Training Tips</h3>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">Boost your cognition and reflexes with these professional training guidelines.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-400 leading-relaxed">
            <div className="space-y-1">
              <div className="font-bold text-white uppercase text-[10px] tracking-wider text-emerald-300">1. Adjust dealing speed</div>
              <p>Start with the "Slow" setting to smoothly reinforce mental addition, then dial it up to "Intermediate" or "Fast" as your reaction times sharpen.</p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white uppercase text-[10px] tracking-wider text-emerald-300">2. Track the discard tray</div>
              <p>In Advanced Mode, observe card penetration in the discard tray to convert your running count to True Count. Knowing remaining decks is key to success!</p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white uppercase text-[10px] tracking-wider text-emerald-300">3. Execute basic strategy</div>
              <p>Counting cards is only effective when paired with flawless action. Play each hand logically in accordance with standard blackjack basic strategy rules.</p>
            </div>
          </div>
        </motion.div>

        {/* Play Now CTA */}
        <div className="flex flex-col items-center gap-4 pt-6">
          <Link
            to="/"
            className="group relative px-12 py-5 rounded-2xl bg-gradient-to-br from-[#124d3a] to-[#0d3b2c] hover:from-[#175b45] hover:to-[#124d3a] text-emerald-100 border border-emerald-700/20 font-black uppercase italic tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-3"
          >
            <span>Launch Practice</span>
            <Play size={16} fill="currentColor" />
          </Link>
          <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-bold flex items-center gap-1.5 leading-none">
            <ShieldAlert size={10} className="text-emerald-500/50" /> Training Simulation only • Play Wisely
          </p>
        </div>

      </main>

      {/* Footer Info */}
      <footer className="relative z-10 w-full bg-black/80 border-t border-white/5 py-8 px-4 sm:px-8 flex flex-col items-center justify-center gap-3.5 text-[10px] tracking-wider select-none shrink-0">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-neutral-500 font-medium text-center">
          <span>© 2026 <span className="text-neutral-400 font-semibold tracking-widest">BLACKJACK CARD COUNTER TRAINER</span>. ALL RIGHTS RESERVED.</span>
          <span className="text-white/10 hidden sm:inline">|</span>
          <span className="text-neutral-500 tracking-widest text-[9px]">VERSION 1.2.0</span>
        </div>
        
        <div className="text-center text-[9px] text-neutral-600 tracking-widest leading-relaxed max-w-xl font-light">
          NO RISK <span className="text-white/10 px-1">|</span> NO DEPOSIT <span className="text-white/10 px-1">|</span> PURE COGNITIVE REFLEX PRACTICE
        </div>
      </footer>
    </div>
  );
}
