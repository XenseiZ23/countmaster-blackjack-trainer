import React from 'react';
import { motion } from 'motion/react';
import { Clover, Play, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-4 sm:p-8 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000000_100%)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-neutral-800/40 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />
        
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-emerald-400 transition-colors mb-8 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Trainer</span>
        </Link>

        <div className="space-y-10 relative">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 mb-6">
              <Clover size={24} className="text-emerald-500 fill-emerald-500/20" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-white">About CountMaster</h1>
            <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em]">Advanced Card Counting Interface</p>
          </div>

          <div className="space-y-6 text-neutral-400 text-sm sm:text-base leading-relaxed font-medium">
            <p>
              <span className="text-white font-bold">CountMaster</span> is a professional-grade, free browser-based blackjack card counting trainer designed strictly for <span className="text-emerald-400">Hi-Lo system practice</span>.
            </p>
            <p>
              The project was created to provide an accessible, performance-oriented training experience that mimics the velocity and mechanics of a live casino environment without the need for downloads or registrations.
            </p>
            <p>
              Every element, from dealing speeds to shoes penetration, is engineered to help serious players develop the muscle memory and mental speed required for effective advantage play.
            </p>
            
            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-2 text-white">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="font-bold text-sm uppercase tracking-widest">Core Features</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider">
                <li className="flex items-center gap-2 text-neutral-300 bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="w-1 h-1 rounded-full bg-emerald-500" /> Fast Dealing Engine
                </li>
                <li className="flex items-center gap-2 text-neutral-300 bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="w-1 h-1 rounded-full bg-emerald-500" /> Multi-Player Setup
                </li>
                <li className="flex items-center gap-2 text-neutral-300 bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="w-1 h-1 rounded-full bg-emerald-500" /> Real Shoe Probability
                </li>
                <li className="flex items-center gap-2 text-neutral-300 bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="w-1 h-1 rounded-full bg-emerald-500" /> Symmetrical Table UI
                </li>
              </ul>
            </div>

            <p className="pt-8 border-t border-white/5">
              Developed and maintained by <span className="text-white font-bold underline decoration-emerald-500 decoration-2 underline-offset-4">XenseiZ23</span>.
            </p>
            
            <div className="bg-emerald-500/5 border border-emerald-500/10 p-8 rounded-3xl space-y-4 mt-8">
              <p className="text-white font-black text-sm uppercase tracking-[0.2em]">Support This Tool</p>
              <p className="text-xs leading-relaxed opacity-80 font-bold uppercase tracking-tight">
                If CountMaster has helped you improve your game and you want to support future optimizations, performance upgrades, and free access for the community, consider making a donation.
              </p>
              <button className="text-emerald-400 hover:text-emerald-300 transition-all text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 pt-2">
                Donate / Support Project <Play size={10} fill="currentColor" />
              </button>
            </div>

            <p className="text-[11px] italic opacity-40 text-center pt-8 border-t border-white/5">
              Disclaimer: This is a training tool. We do not encourage gambling. Practice responsibly.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
