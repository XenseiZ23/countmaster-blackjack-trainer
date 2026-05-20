import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clover, ArrowLeft, BookOpen, ShieldAlert, Award, Terminal, Play } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col justify-between overflow-x-hidden transform-gpu relative">
      {/* Dark Felt Texture Backdrop */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#064e3b_0%,_#171717_100%)] opacity-95">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
        {/* Decorative table felt borders mimicking high-class blackjack felt borders */}
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[140vw] h-[90vw] border-[8px] border-white/5 rounded-[100%] pointer-events-none" />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 p-4 sm:p-6 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md">
        <Link 
          to="/"
          className="group flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs uppercase tracking-widest font-black text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all shadow-md"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Game</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
            <Clover size={18} className="text-emerald-500 fill-emerald-500/20" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">CountMaster Trainer</span>
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
          <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-3">
            <span className="text-[10px] md:text-xs text-emerald-400 font-extrabold uppercase tracking-[0.2em] flex items-center gap-2">
              <Award size={12} /> Technical Training Blueprint
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent uppercase italic">
            About CountMaster
          </h1>
          <p className="text-neutral-400 font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A state-of-the-art simulator designed for professional memory retention training. Hone card counting speed, true count calculation, and structural blackjack analysis without financial risk.
          </p>
        </motion.div>

        {/* Info Grid - Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: What is CountMaster */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-neutral-800/40 backdrop-blur-sm border border-white/5 rounded-[1.5rem] p-6 sm:p-8 flex flex-col gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-inner">
                <Clover size={20} className="text-emerald-400" />
              </div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-white">The Application</h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              CountMaster simulates real-world high-stakes blackjack action minus the gambling aspect. By automating multiple computer players, managing custom dealer dealing rates, and requiring active mathematical verification of the shoe state, the software serves as a modern gymnasium for card counters of all skill levels.
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
              <h2 className="text-lg font-bold uppercase tracking-tight text-white">Training Goals</h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Develop elite reflex speeds to maintain the count during fast-paced dealing intervals. In **Infinite Mode**, practitioners build raw endurance. In **Advanced Mode**, they must combine count tracking with card penetration analysis (True Count) representing genuine multi-deck environments.
            </p>
          </motion.div>
        </div>

        {/* Hi-Low counting interactive chart panel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-800/40 backdrop-blur-sm border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col gap-6 text-center md:text-left relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold uppercase tracking-tight text-white">The Hi-Lo Strategy</h2>
                <p className="text-xs text-neutral-400">The global industry standard system for mathematical card estimation.</p>
              </div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                Additive Formula
              </div>
            </div>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Under Hi-Lo systems, every drawn card is categorized into one of three numerical values. Keeping a sum totaling these values provides the absolute statistical advantage over the table.
            </p>

            {/* Strategy Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-emerald-900/15 border border-emerald-500/30 rounded-2xl p-5 text-center transition-all hover:bg-emerald-950/25">
                <div className="text-3xl font-black text-emerald-400 mb-2">+1</div>
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

        {/* Tech Stack Specs */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-neutral-800/40 backdrop-blur-sm border border-white/5 rounded-[1.5rem] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-12 h-12 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center">
              <Terminal size={22} className="text-neutral-400" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">Clean Tech Stack & Performance</h3>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">Built with React, Vite, Tailwind CSS, and Motion to achieve hardware-accelerated drawing fluidities.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white/5 border border-white/5 rounded text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest">React 19</span>
            <span className="px-3 py-1 bg-white/5 border border-white/5 rounded text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest">TSX</span>
            <span className="px-3 py-1 bg-white/5 border border-white/5 rounded text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Tailwind</span>
          </div>
        </motion.div>

        {/* Play Now CTA */}
        <div className="flex flex-col items-center gap-4 pt-6">
          <Link
            to="/"
            className="group relative px-12 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase italic tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(16,185,129,0.25)] flex items-center gap-3"
          >
            <span>Launch Practice</span>
            <Play size={16} fill="currentColor" />
          </Link>
          <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-bold flex items-center gap-1.5 leading-none">
            <ShieldAlert size={10} className="text-red-500/70" /> Training Simulation only • Play Wisely
          </p>
        </div>

      </main>

      {/* Footer Info */}
      <footer className="relative z-10 p-4 border-t border-white/5 bg-black/60 text-[10px] uppercase tracking-wider text-neutral-500 flex flex-col sm:flex-row gap-2 justify-between items-center shrink-0 text-center sm:text-left">
        <div>CountMaster Trainer • Pure Educational Cognitive Development</div>
        <div>NO CHIPS • NO DEPOSIT • NO RISK</div>
      </footer>
    </div>
  );
}
