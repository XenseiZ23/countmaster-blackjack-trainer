import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert, Sparkles, Play, ShieldCheck, HelpCircle } from 'lucide-react';
import { AcademyLogo } from '../components/AcademyLogo';
import { useLanguage } from '../lib/LanguageContext';

export default function About() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col justify-between overflow-x-hidden transform-gpu relative">
      {/* Classic Casino Green Felt Backdrop */}
      <div className="absolute inset-0 z-0 bg-[#143d26] overflow-hidden">
        {/* Felt Texture pattern */}
        <div className="absolute inset-0 opacity-25 bg-[url('https://www.transparenttextures.com/patterns/felt.png')] mix-blend-overlay pointer-events-none" />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 w-full px-5 py-3 sm:px-8 border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Link 
            to="/"
            className="group inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] uppercase tracking-widest font-extrabold text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all shadow-md"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>{t('common.backToHome')}</span>
          </Link>

          <div className="flex items-center gap-6">
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
          <h1 className="text-4xl sm:text-5xl font-sport font-[800] italic tracking-tight text-white uppercase text-stroke-black-md">
            {t('about.title')}
          </h1>
          <p className="text-neutral-400 font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t('about.desc')}
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
              <h2 className="text-lg font-sport font-[800] italic tracking-tight uppercase text-white">{t('about.theAppTitle')}</h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              {t('about.theAppDesc')}
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
              <h2 className="text-lg font-sport font-[800] italic tracking-tight uppercase text-white">{t('about.termsTitle')}</h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              {t('about.termsDesc')}
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
                  <ShieldAlert size={20} className="text-emerald-400" /> {t('about.responsiblePractice')}
                </h2>
                <p className="text-xs text-neutral-400">{t('about.responsibleSubtitle')}</p>
              </div>
            </div>

            <div className="space-y-4 text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
              <p>
                {t('about.responsibleP1')}
              </p>
              <p>
                {t('about.responsibleP2')}
              </p>
              <p>
                {t('about.responsibleP3')}
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
            <span>{t('about.launchPractice')}</span>
            <Play size={16} fill="currentColor" />
          </Link>
        </div>

      </main>

      {/* Bottom-Left Language Switcher (Outside, resting flush on top of the footer) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-0 pb-0 flex justify-start items-center select-none">
        <div className="flex items-center gap-2 border-b-2 border-transparent pb-1.5 translate-y-[2px]">
          <button
            onClick={() => setLanguage('en')}
            className={`w-5 h-5 flex items-center justify-center text-xs sm:text-sm transition-all duration-300 hover:scale-125 active:scale-95 cursor-pointer outline-none ${language === 'en' ? 'opacity-100 scale-110 filter drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 'opacity-40 hover:opacity-100'}`}
            title="English"
          >
            🇺🇸
          </button>
          <button
            onClick={() => setLanguage('es')}
            className={`w-5 h-5 flex items-center justify-center text-xs sm:text-sm transition-all duration-300 hover:scale-125 active:scale-95 cursor-pointer outline-none ${language === 'es' ? 'opacity-100 scale-110 filter drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 'opacity-40 hover:opacity-100'}`}
            title="Español"
          >
            🇪🇸
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="relative z-10 w-full bg-black/80 border-t border-white/5 py-4 px-5 sm:px-8 flex flex-col items-center justify-center gap-3 text-[10px] tracking-wider select-none shrink-0">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-neutral-500 font-medium text-center">
          <span>© 2026 <span className="text-neutral-400 font-semibold tracking-widest">{t('home.title')} {t('home.trainer')}</span>. {t('common.allRights')}.</span>
          <span className="text-white/10 hidden sm:inline">|</span>
          <span className="text-neutral-500 tracking-widest text-[9px]">{t('common.version')}</span>
        </div>
        
        <div className="text-center text-[9px] text-neutral-600 tracking-widest leading-relaxed max-w-xl font-light">
          {t('common.noRisk')}
        </div>
      </footer>
    </div>
  );
}
