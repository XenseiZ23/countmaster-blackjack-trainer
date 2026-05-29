import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert, Sparkles, Sliders, Play, Brain, Compass, Users } from 'lucide-react';
import { FluorescentCards } from '../components/FluorescentCards';

export default function Casino() {
  useEffect(() => {
    document.title = 'Casino Simulation - Coming Soon';
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col justify-between overflow-x-hidden transform-gpu relative">
      {/* Dark Felt Texture Backdrop */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#052e25_0%,_#171717_100%)] opacity-95">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
        {/* Table markings */}
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[120vw] h-[85vw] border-[10px] border-white/5 rounded-[100%] pointer-events-none" />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 p-4 sm:p-6 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md">
        <Link 
          to="/"
          className="group flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs uppercase tracking-widest font-black text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all shadow-md"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Portal Hub</span>
        </Link>
        <div className="flex items-center gap-3">
          <FluorescentCards size="sm" />
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">CountMaster Casino</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 py-12 sm:py-20 flex flex-col gap-10 sm:gap-14">
        
        {/* Title & Coming Soon Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-2">
            <span className="text-[9px] sm:text-[10px] text-emerald-400 font-extrabold uppercase tracking-[0.25em] flex items-center gap-1.5 justify-center">
              <Sparkles size={12} className="animate-pulse" /> Active Roadmap Simulation Mode
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
            COMING <span className="text-emerald-400">SOON</span>
          </h1>
          
          <p className="text-neutral-400 font-medium text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            The interactive Casino Simulation mode is currently under active design and development. This mode will allow you to put your counting skills to the test in a realistic casino atmosphere in real-time.
          </p>
        </motion.div>

        {/* Feature Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
          
          {/* Planned Roadmap columns */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-neutral-800/40 border border-white/5 rounded-2xl space-y-3"
          >
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
              01
            </div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Manual Play Mechanics</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Play actual hands with split logic, double-down options, surrenders, and full live-dealer mechanics.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-neutral-800/40 border border-white/5 rounded-2xl space-y-3"
          >
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
              02
            </div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Betting Systems</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Introduce progressive wagering systems (Martingale, Kelly Criterion) to test with live counting dynamics.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-neutral-800/40 border border-white/5 rounded-2xl space-y-3"
          >
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
              03
            </div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Advantage Metrics</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Track multi-round variance charts, bankroll exhaustion alerts, stats telemetry, and custom simulator logs.
            </p>
          </motion.div>
        </div>

        {/* Informative alert panel */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-yellow-500/5 border border-yellow-500/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
            <ShieldAlert size={24} />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">Seamless Training Experience</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We test and polish every new update rigorously so your card counting sessions remain perfectly smooth, reliable, and completely uninterrupted.
            </p>
          </div>
        </motion.div>

        {/* Call to action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/trainer"
            className="w-full sm:w-auto py-4 px-8 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-95 text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20"
          >
            Go back to running-count trainer <Play fill="currentColor" size={12} />
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto py-4 px-8 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-colors text-center"
          >
            Back to Hub
          </Link>
        </div>

      </main>

      {/* Footer Info */}
      <footer className="p-4 bg-black/60 border-t border-white/5 text-[9px] uppercase tracking-wider text-neutral-500 flex justify-between items-center shrink-0">
        <div>BETA ROADMAP</div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping" />
          <span>STAGE-1 DESIGN REVIEW APPROVED</span>
        </div>
      </footer>
    </div>
  );
}
