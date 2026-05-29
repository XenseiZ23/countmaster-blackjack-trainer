import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Sparkles, BookOpen, ChevronRight, GraduationCap, ShieldAlert, Coins } from 'lucide-react';
import { FluorescentCards } from '../components/FluorescentCards';
import trainerBannerImage from '../assets/images/trainer_banner_1779997659022.png';
import casinoBannerImage from '../assets/images/casino_banner_1779997683634.png';

export default function Home() {
  useEffect(() => {
    document.title = 'CountMaster - Ultimate Blackjack Practice Platform';
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', roughness: 0.5, damping: 25 }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col justify-between overflow-x-hidden transform-gpu relative">
      {/* Dark Felt Texture Backdrop */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#043e30_0%,_#171717_100%)] opacity-95">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
        {/* Decorative felt border */}
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[140vw] h-[90vw] border-[10px] border-white/5 rounded-[100%] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 p-4 sm:p-6 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <FluorescentCards size="sm" />
          <div>
            <span className="text-sm sm:text-base font-black uppercase tracking-widest text-white leading-none">CountMaster</span>
            <p className="text-[9px] uppercase tracking-[0.2em] text-emerald-400 font-bold leading-none mt-1">BLACKJACK ACADEMY</p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold text-neutral-400 select-none">
          <Link 
            to="/about" 
            className="hover:text-emerald-400 hover:tracking-[0.28em] transition-all duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
          >
            About
          </Link>
          <span className="text-white/10 select-none font-light">/</span>
          <a 
            href="https://github.com/XenseiZ23/countmaster-blackjack-trainer" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-emerald-400 hover:tracking-[0.28em] transition-all duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
          >
            GitHub
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 py-8 sm:py-12 md:py-16 flex flex-col justify-center items-center gap-10 md:gap-14">
        
        {/* Display Title with elegant animations */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 max-w-3xl"
        >
          {/* Subtle decorative banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-2">
            <Sparkles size={12} className="text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-[9px] sm:text-[10px] text-emerald-300 font-extrabold uppercase tracking-[0.25em]">
              Professional Free Trainer
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
            <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">COUNT</span>
            <span className="text-emerald-400">MASTER</span>
          </h1>
          
          <p className="text-neutral-400 font-medium text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Hone card counting speed, test your math conversions, and build rock-solid strategy reflexes using memory simulator tools built for mathematical edge.
          </p>
        </motion.div>

        {/* Scalable Multi-Mode Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 sm:gap-8 w-full max-w-4xl"
        >
          {/* Card 1: Count Trainer Page Link */}
          <motion.div 
            variants={itemVariants}
            className="group relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 hover:border-emerald-500/20 bg-neutral-950 shadow-2xl hover:shadow-emerald-950/20 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between min-h-[220px]"
          >
            {/* Background Image with Zoom & Dark Gradient Fade */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={trainerBannerImage}
                alt="Count Trainer Backdrop" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none opacity-40 group-hover:opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent pointer-events-none md:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none md:hidden block" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 p-6 sm:p-8 md:p-10 flex-grow flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
                    <GraduationCap size={20} className="fill-emerald-400/10" />
                  </div>
                  <div>
                    <span className="text-[9px] tracking-[0.2em] font-black uppercase text-emerald-400 leading-none block">STABLE SYSTEM</span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[8px] font-extrabold uppercase tracking-widest text-emerald-300 mt-1 inline-block">
                      HI-LO ACTIVE
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black uppercase italic tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                    Count Trainer
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed">
                    Fast-paced card counting drills focused on running count accuracy, deck estimation conversions, and custom table speed calibration.
                  </p>
                </div>

                {/* Bullets */}
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-neutral-400 font-medium select-none">
                  <li className="flex items-center gap-1"><ChevronRight size={12} className="text-emerald-500" /> Running & True Counts</li>
                  <li className="flex items-center gap-1"><ChevronRight size={12} className="text-emerald-500" /> Standard & Shoe Modes</li>
                  <li className="flex items-center gap-1"><ChevronRight size={12} className="text-emerald-500" /> Custom Seat Bots</li>
                </ul>
              </div>

              <div className="shrink-0">
                <Link
                  to="/trainer"
                  className="inline-flex py-3.5 px-8 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-950/20 transition-all group-hover:scale-[1.03] active:scale-95 items-center gap-2 border border-emerald-400/20"
                >
                  Launch Trainer <Play fill="currentColor" size={12} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Casino Simulation Placeholder Page Link */}
          <motion.div 
            variants={itemVariants}
            className="group relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 bg-neutral-950 shadow-xl transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between min-h-[220px]"
          >
            {/* Background Image with Zoom & Dark Gradient Fade */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={casinoBannerImage}
                alt="Casino Simulation Backdrop" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none opacity-20 filter grayscale group-hover:grayscale-0 group-hover:opacity-30"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent pointer-events-none md:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none md:hidden block" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 p-6 sm:p-8 md:p-10 flex-grow flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-500">
                    <Coins size={20} className="fill-yellow-500/10" />
                  </div>
                  <div>
                    <span className="text-[9px] tracking-[0.2em] font-black uppercase text-yellow-500 leading-none block">ROADMAP</span>
                    <span className="px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded text-[8px] font-extrabold uppercase tracking-widest text-yellow-500 mt-1 inline-block animate-pulse">
                      COMING SOON
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black uppercase italic tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                    Casino Simulation
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-relaxed">
                    Interactive real-world table mode with manual gameplay, custom bets, split gestures, and virtual bankroll analytics.
                  </p>
                </div>

                {/* Bullets */}
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-neutral-500 font-medium select-none">
                  <li className="flex items-center gap-1"><ChevronRight size={12} className="text-neutral-700" /> Manual Play Decisions</li>
                  <li className="flex items-center gap-1"><ChevronRight size={12} className="text-neutral-700" /> Betting Systems</li>
                  <li className="flex items-center gap-1"><ChevronRight size={12} className="text-neutral-700" /> Bankroll Tracking</li>
                </ul>
              </div>

              <div className="shrink-0">
                <Link
                  to="/casino"
                  className="inline-flex py-3.5 px-8 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all group-hover:scale-[1.03] active:scale-95 items-center gap-2"
                >
                  Coming Soon <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </main>

      {/* Footer Disclaimer */}
      <footer className="relative z-10 p-5 sm:p-6 bg-black/60 border-t border-white/5 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium select-none flex flex-col sm:flex-row justify-between items-center shrink-0 gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
          <span>© 2026 COUNTMASTER PROJECT. ALL RIGHTS RESERVED.</span>
          <span className="hidden sm:inline text-white/5">|</span>
          <div className="flex gap-4">
            <span>VER. 1.2.0</span>
            <span className="text-emerald-500/80 font-bold">HI-LO COMPLIANT</span>
          </div>
        </div>
        <div className="text-center sm:text-right text-[8px] sm:text-[9px] text-neutral-600 tracking-wider max-w-lg leading-relaxed uppercase">
          EDUCATIONAL SIMULATOR • NO CURRENCY CONVERSIONS • ACCURATE MATHEMATICAL TRAINING WITHOUT REAL MONEY
        </div>
      </footer>
    </div>
  );
}
