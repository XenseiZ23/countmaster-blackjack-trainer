import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert, Sparkles, Sliders, Play, Brain, Compass, Users } from 'lucide-react';
import { AcademyLogo } from '../components/AcademyLogo';
import { useLanguage } from '../lib/LanguageContext';

export default function Casino() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = language === 'es' ? 'Simulación de Casino - Próximamente' : 'Casino Simulation - Coming Soon';
  }, [language]);

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col justify-between overflow-x-hidden transform-gpu relative">
      {/* Classic Casino Green Felt Backdrop */}
      <div className="absolute inset-0 z-0 bg-[#143d26] overflow-hidden brightness-75">
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
            <span>{t('casino.back')}</span>
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
                  CASINO <span className="text-amber-400">SIMULATION</span>
                </span>
              </motion.div>
            </div>
          </div>
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
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sport font-[800] italic tracking-tight uppercase leading-none text-white select-none text-depth-sport">
            {t('casino.coming')} <span className="text-amber-400">{t('casino.soon')}</span>
          </h1>
          
          <p className="text-neutral-300 font-medium text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {t('casino.desc')}
          </p>
        </motion.div>

        {/* Comparison Module: Trainer vs Casino */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {/* Trainer Card */}
          <div className="p-6 sm:p-8 bg-neutral-900/60 border border-white/5 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-emerald-400">{t('casino.trainerModeTitle')}</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {t('casino.trainerModeDesc')}
            </p>
          </div>

          {/* Casino Card */}
          <div className="p-6 sm:p-8 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-amber-400">{t('casino.casinoModeTitle')}</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {t('casino.casinoModeDesc')}
            </p>
          </div>
        </motion.div>

        {/* Feature Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
          
          {/* Planned Roadmap columns */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-neutral-800/40 border border-white/5 rounded-2xl space-y-3 shrink-0"
          >
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">{t('casino.road1Title')}</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {t('casino.road1Desc')}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-neutral-800/40 border border-white/5 rounded-2xl space-y-3 shrink-0"
          >
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">{t('casino.road2Title')}</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {t('casino.road2Desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-neutral-800/40 border border-white/5 rounded-2xl space-y-3 shrink-0"
          >
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">{t('casino.road3Title')}</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {t('casino.road3Desc')}
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
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">{t('casino.alertTitle')}</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {t('casino.alertDesc')}
            </p>
          </div>
        </motion.div>

        {/* Call to action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/trainer"
            className="w-full sm:w-auto py-4 px-8 bg-gradient-to-br from-[#124d3a] to-[#0d3b2c] hover:from-[#175b45] hover:to-[#124d3a] text-emerald-100 border border-emerald-700/20 rounded-2xl font-black text-xs uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-95 text-center flex items-center justify-center gap-2 shadow-lg"
          >
            {t('casino.ctaTrainer')} <Play fill="currentColor" size={12} />
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto py-4 px-8 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-colors text-center"
          >
            {t('casino.ctaBack')}
          </Link>
        </div>

      </main>

      {/* Footer Info */}
      <footer className="relative z-10 w-full bg-black/80 border-t border-white/5 py-4 px-5 sm:px-8 flex flex-col items-center justify-center gap-3 text-[10px] tracking-wider select-none shrink-0">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-neutral-500 font-medium text-center">
          <span>© 2026 <span className="text-neutral-400 font-semibold tracking-widest">{t('home.title')} {t('home.trainer')}</span>. {t('common.allRights')}.</span>
          <span className="text-white/10 hidden sm:inline">|</span>
          <span className="text-neutral-500 tracking-widest text-[9px]">{t('common.version')}</span>
        </div>
        
        <div className="text-center text-[9px] text-neutral-600 tracking-widest leading-relaxed max-w-xl font-light">
          BETA ROADMAP <span className="text-white/10 px-1">|</span> STAGE-1 DESIGN REVIEW APPROVED
        </div>
      </footer>
    </div>
  );
}
