import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Calculator, Play, TrendingUp, AlertTriangle, HelpCircle } from 'lucide-react';
import { AcademyLogo } from '../components/AcademyLogo';
import { useLanguage } from '../lib/LanguageContext';

export default function HowToCount() {
  const { t, language, setLanguage } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

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
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 py-10 sm:py-16 md:py-20 flex flex-col gap-10">
        
        {/* Display Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-sport font-[800] italic tracking-tight text-white uppercase text-stroke-black-md">
            {t('howToCount.title')}
          </h1>
          <p className="text-neutral-400 font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t('howToCount.desc')}
          </p>
        </motion.div>

        {/* Content Modules */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 sm:space-y-12"
        >
          {/* Card 1: Overview and Hi-Lo System */}
          <motion.div 
            variants={itemVariants}
            className="bg-neutral-800/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-inner">
                <Calculator size={18} className="text-emerald-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-sport font-[800] italic tracking-tight uppercase text-white">{t('howToCount.hiloStrategyTitle')}</h2>
            </div>
            
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              {t('howToCount.hiloStrategyDesc')}
            </p>

            {/* Visual Value Assignment */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-5 text-center">
                <div className="text-2xl font-black text-emerald-400 mb-1">+1</div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">{t('howToCount.lowCards')}</div>
                <div className="text-[11px] text-neutral-400 font-mono mb-2">2, 3, 4, 5, 6</div>
                <p className="text-[10px] text-neutral-500 leading-normal">{t('howToCount.lowCardsDesc')}</p>
              </div>

              <div className="bg-neutral-900/35 border border-neutral-700/25 rounded-xl p-5 text-center">
                <div className="text-2xl font-black text-neutral-400 mb-1">0</div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">{t('howToCount.middleCards')}</div>
                <div className="text-[11px] text-neutral-400 font-mono mb-2">7, 8, 9</div>
                <p className="text-[10px] text-neutral-500 leading-normal">{t('howToCount.middleCardsDesc')}</p>
              </div>

              <div className="bg-red-950/15 border border-red-500/20 rounded-xl p-5 text-center">
                <div className="text-2xl font-black text-red-400 mb-1">-1</div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">{t('howToCount.highCards')}</div>
                <div className="text-[11px] text-neutral-400 font-mono mb-2">10, J, Q, K, A</div>
                <p className="text-[10px] text-neutral-500 leading-normal">{t('howToCount.highCardsDesc')}</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: The Running Count */}
          <motion.div 
            variants={itemVariants}
            className="bg-neutral-800/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-inner">
                <TrendingUp size={18} className="text-emerald-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-sport font-[800] italic tracking-tight uppercase text-white">{t('howToCount.runningCountTitle')}</h2>
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              {t('howToCount.runningCountDesc')}
            </p>
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5 space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">{t('howToCount.exampleSequence')}</span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-neutral-400">{t('howToCount.freshShoe')} <strong className="text-white">0</strong></span>
                <span className="text-neutral-500">→</span>
                <span className="px-2.5 py-1 bg-emerald-950/20 border border-emerald-900/30 rounded text-emerald-300">5 <span className="text-[10px] font-bold">(+1)</span></span>
                <span className="text-neutral-500">→</span>
                <span className="px-2.5 py-1 bg-emerald-950/20 border border-emerald-900/30 rounded text-emerald-300">2 <span className="text-[10px] font-bold">(+1)</span></span>
                <span className="text-neutral-500">→</span>
                <span className="px-2.5 py-1 bg-neutral-900/45 border border-neutral-700/20 rounded text-neutral-300">8 <span className="text-[10px] font-bold">(0)</span></span>
                <span className="text-neutral-500">→</span>
                <span className="px-2.5 py-1 bg-red-950/20 border border-red-900/30 rounded text-red-350">Ace <span className="text-[10px] font-bold">(-1)</span></span>
                <span className="text-neutral-500">→</span>
                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-neutral-400">{t('howToCount.runningCountLabel')} <strong className="text-emerald-400">+1</strong></span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-normal">
                {t('howToCount.runningCountFootnote')}
              </p>
            </div>
          </motion.div>

          {/* Card 3: The True Count */}
          <motion.div 
            variants={itemVariants}
            className="bg-neutral-800/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-inner">
                <HelpCircle size={18} className="text-emerald-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-sport font-[800] italic tracking-tight uppercase text-white">{t('howToCount.trueCountTitle')}</h2>
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              {t('howToCount.trueCountDesc')}
            </p>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              {t('howToCount.trueCountDesc2')}
            </p>

            <div className="py-4 px-6 rounded-xl bg-neutral-950/50 border border-neutral-800 text-center space-y-1">
              <div className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide">
                True Count = Running Count / Decks Remaining
              </div>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{t('howToCount.formulaLabel')}</p>
            </div>

            {/* Multi-deck comparison scenario */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">{t('howToCount.scenarioATitle')}</span>
                <p className="text-xs text-neutral-300">
                  {t('howToCount.scenarioAText')}
                </p>
                <div className="font-mono text-xs text-emerald-400 font-bold">
                  True Count = +8 / 4 = <span className="text-white bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">+2</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">{t('howToCount.scenarioBTitle')}</span>
                <p className="text-xs text-neutral-300">
                  {t('howToCount.scenarioBText')}
                </p>
                <div className="font-mono text-xs text-emerald-400 font-bold">
                  True Count = +8 / 1 = <span className="text-white bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">+8</span>
                </div>
              </div>
            </div>
            <p className="text-neutral-400 text-xs leading-normal">
              {t('howToCount.scenarioFootnote')}
            </p>
          </motion.div>

          {/* Card 4: Betting Strategy */}
          <motion.div 
            variants={itemVariants}
            className="bg-neutral-800/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-inner">
                <AlertTriangle size={18} className="text-emerald-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-sport font-[800] italic tracking-tight uppercase text-white">{t('howToCount.strategyTitle')}</h2>
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              {t('howToCount.strategyDesc')}
            </p>
            <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-400 leading-normal">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  {t('howToCount.strategyBullet1')}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  {t('howToCount.strategyBullet2')}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  {t('howToCount.strategyBullet3')}
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Play Now CTA */}
        <div className="flex flex-col items-center gap-4 pt-6">
          <Link
            to="/trainer"
            className="group relative px-12 py-5 rounded-2xl bg-gradient-to-br from-[#124d3a] to-[#0d3b2c] hover:from-[#175b45] hover:to-[#124d3a] text-emerald-100 border border-emerald-700/20 font-black uppercase italic tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-3"
          >
            <span>{t('howToCount.startTraining')}</span>
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
