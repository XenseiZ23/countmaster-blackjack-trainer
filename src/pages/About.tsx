import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert, Sparkles, Play, ShieldCheck, HelpCircle } from 'lucide-react';
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
          <h1 className="text-4xl sm:text-5xl font-sport font-[800] italic tracking-tight text-white uppercase">
            About the Trainer
          </h1>
          <p className="text-neutral-400 font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Understand the application, our terms of usage, and the core principles of responsible training.
          </p>
        </motion.div>

        {/* Info Grid - Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: The Application */}
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
              This trainer is a state-of-the-art mental gym built to simulate blackjack action in real-time. By managing computer players, simulating deck penetration, and requiring mathematical feedback of the count, the software is purely a cognitive training system. There is no gambling, no real money wagering, and no deposit mechanics.
            </p>
          </motion.div>

          {/* Card 2: Terms and Conditions */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-800/40 backdrop-blur-sm border border-white/5 rounded-[1.5rem] p-6 sm:p-8 flex flex-col gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-inner">
                <ShieldCheck size={20} className="text-emerald-400" />
              </div>
              <h2 className="text-lg font-sport font-[800] italic tracking-tight uppercase text-white">Terms of Use</h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              By using this trainer, you agree that it is provided strictly for educational, cognitive, and analytical purposes. You assume full personal responsibility for how you utilize these mathematical concepts. We do not endorse, facilitate, or promote real-money gaming or casino betting.
            </p>
          </motion.div>
        </div>

        {/* Responsible Play & Continuous Practice Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-800/40 backdrop-blur-sm border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-950/25 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col gap-6 text-center md:text-left relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-sport font-[800] italic tracking-tight uppercase text-white flex items-center gap-2 justify-center md:justify-start">
                  <ShieldAlert size={20} className="text-emerald-400" /> Responsible Practice
                </h2>
                <p className="text-xs text-neutral-400">Card counting is a mental discipline, not a shortcut to wealth.</p>
              </div>
            </div>

            <div className="space-y-4 text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
              <p>
                Card counting is a mathematical concept based on tracking the ratio of high-to-low cards left in the dealer's shoe. While this simulator is an exceptional aid to sharpen your focus, speed, and accuracy, <strong className="text-white font-semibold">success in real-world scenarios requires extensive practice, continuous discipline, and high personal responsibility.</strong>
              </p>
              <p>
                Having theoretical knowledge is not enough. Maintaining focus under loud, high-pressure environments requires hundreds of hours of manual training. More importantly, statistical variance means no mathematical strategy guarantees short-term positive outcomes. 
              </p>
              <p>
                We urge all practitioners to treat card counting solely as an intellectual and cognitive exercise. Never wager money you cannot afford to lose, play responsibly, and respect local regulations and casino policies at all times.
              </p>
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
