import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, ChevronRight, ShieldAlert, MessageSquare, Send, Star, X, CheckCircle } from 'lucide-react';
import { AcademyLogo } from '../components/AcademyLogo';
import { useLanguage } from '../lib/LanguageContext';
import trainerBannerImage from '../assets/images/trainer_banner_v3_1783664329213.jpg';
import casinoBannerImage from '../assets/images/casino_banner_1779997683634.png';

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackCategory, setFeedbackCategory] = useState<string>('Suggestion');
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;

    setIsSubmitting(true);
    try {
      await fetch("https://formsubmit.co/ajax/erwin3467@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          category: feedbackCategory,
          rating: `${feedbackRating} / 5`,
          message: feedbackMessage,
          "_subject": `Blackjack Trainer Feedback: ${feedbackCategory} (${feedbackRating}/5 stars)`
        })
      });
      setIsFeedbackSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Fallback: still show the success screen so the user's flow isn't broken
      setIsFeedbackSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.title = language === 'es' 
      ? 'Entrenador de Conteo de Cartas de Blackjack - Práctica Gratis'
      : 'Blackjack Card Counter Trainer - Free Practice';
  }, [language]);

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
      {/* Classic Casino Green Felt Backdrop with Elegant Degradation */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,_#062213_0%,_#0c4226_20%,_#14532d_40%,_#166534_50%,_#14532d_60%,_#0c4226_80%,_#062213_100%)] overflow-hidden">
        {/* Felt Texture pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/felt.png')] mix-blend-overlay pointer-events-none" />
        
        {/* Elegant Blackjack Table Curves for Atmosphere spanning the entire bottom of the screen */}
        <div className="absolute bottom-0 left-0 right-0 h-[65vh] w-full pointer-events-none opacity-[0.38] select-none">
          <svg 
            className="w-full h-full"
            viewBox="0 0 1000 400"
            preserveAspectRatio="xMidYMax slice"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer thin yellow/gold line spanning edge to edge */}
            <path d="M 0,30 Q 500,340 1000,30" fill="none" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="1.8" />
            
            <path id="home-text-arc" d="M 80,100 Q 500,360 920,100" fill="none" />
            <text className="font-sans font-black tracking-[0.3em] uppercase text-[15px] fill-amber-400 opacity-75">
              <textPath href="#home-text-arc" startOffset="50%" textAnchor="middle">
                Blackjack Academy
              </textPath>
            </text>
            
            {/* The main thick Insurance/curved line - Gold/Yellow spanning edge to edge */}
            <path d="M 150,150 Q 500,390 850,150" fill="none" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="16" strokeLinecap="round" />
            
            {/* Inner dashed gold line spanning edge to edge */}
            <path d="M 220,190 Q 500,410 780,190" fill="none" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1.5" strokeDasharray="6,4" />
          </svg>
        </div>
      </div>

      {/* Header Bar */}
      <header className="relative z-10 w-full px-5 py-3 sm:px-8 border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-5 items-center justify-between">
          <div className="flex items-center select-none group/brand cursor-default">
            <AcademyLogo size="sm" />
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="overflow-hidden flex items-center whitespace-nowrap"
            >
              <span className="text-white/15 select-none font-light py-1 text-sm sm:text-base mx-3">|</span>
              <span className="text-sm sm:text-base font-sport font-[800] italic tracking-tight text-white group-hover/brand:text-neutral-100 transition-colors uppercase">
                BLACKJACK <span className="text-emerald-600">ACADEMY</span>
              </span>
            </motion.div>
          </div>
          
          <nav className="flex items-center justify-center flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 text-[10px] sm:text-[11px] uppercase tracking-widest font-extrabold text-neutral-400">
            <Link 
              to="/about" 
              className="hover:text-emerald-300 hover:scale-105 active:scale-95 transition-all duration-200 py-1"
            >
              {t('home.about')}
            </Link>
            <span className="text-white/10 select-none font-light">|</span>
            <Link 
              to="/how-to-count" 
              className="hover:text-emerald-300 hover:scale-105 active:scale-95 transition-all duration-200 py-1"
            >
              {t('home.howToCount')}
            </Link>
            <span className="text-white/10 select-none font-light">|</span>
            <button 
              onClick={() => setShowFeedbackModal(true)}
              className="hover:text-emerald-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer outline-none uppercase font-extrabold py-1"
            >
              {t('home.feedback')}
            </button>
            <span className="text-white/10 select-none font-light">|</span>
            <a 
              href="https://github.com/XenseiZ23/countmaster-blackjack-trainer" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-emerald-300 hover:scale-105 active:scale-95 transition-all duration-200 py-1"
            >
              {t('home.github')}
            </a>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-5 py-12 sm:py-16 md:py-24 flex flex-col justify-center items-center gap-12 md:gap-16">
        
        {/* Display Title with elegant animations */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-5 max-w-3xl flex flex-col items-center"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sport font-[800] italic tracking-tight uppercase leading-[0.95] select-none max-w-4xl px-2 text-depth-sport">
            <span className="text-white">BLACKJACK</span> <span className="text-neutral-400">CARD</span>
            <br />
            <span className="text-neutral-400">COUNTER</span> <span className="text-emerald-600">TRAINER</span>
          </h1>
          
          <p className="text-neutral-400 font-normal text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            {t('home.subtitle')}
          </p>
        </motion.div>

        {/* Scalable Multi-Mode Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8 md:gap-10 w-full max-w-4xl"
        >
          {/* Card 1: Count Trainer Page Link */}
          <motion.div 
            variants={itemVariants}
            className="group relative w-full rounded-3xl overflow-hidden border border-emerald-500/10 hover:border-emerald-500/30 bg-[#0d2a1b]/60 backdrop-blur-md shadow-xl transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between min-h-[220px]"
          >
            {/* Background Image with Zoom & Dark Gradient Fade */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={trainerBannerImage}
                alt="Count Trainer Backdrop" 
                className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-all duration-700 ease-out select-none opacity-70 filter grayscale group-hover:filter-none group-hover:opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d2a1b] via-[#0d2a1b]/95 to-transparent pointer-events-none md:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a1b] via-[#0d2a1b]/90 to-transparent pointer-events-none md:hidden block" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 p-7 sm:p-10 md:p-12 flex-grow flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
              <div className="space-y-4 max-w-xl text-center md:text-left">
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-sport font-[800] italic tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300 uppercase">
                    {t('home.countTrainerTitle')}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                    {t('home.countTrainerDesc')}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-1.5 text-[10px] text-neutral-500 font-bold select-none uppercase tracking-wider">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {t('home.bullet1')}</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {t('home.bullet2')}</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {t('home.bullet3')}</li>
                </ul>
              </div>

              <div className="shrink-0 flex justify-center w-full md:w-auto">
                <Link
                  to="/trainer"
                  className="w-full sm:w-auto text-center inline-flex justify-center py-4 px-8 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 hover:border-emerald-500/50 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 group-hover:scale-[1.03] active:scale-95 items-center gap-2 shadow-sm"
                >
                  {t('home.launchTrainer')} <Play fill="currentColor" size={10} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Casino Simulation Placeholder Page Link */}
          <motion.div 
            variants={itemVariants}
            className="group relative w-full rounded-3xl overflow-hidden border border-amber-500/10 hover:border-amber-500/30 bg-[#0d2a1b]/60 backdrop-blur-md shadow-xl transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between min-h-[220px]"
          >
            {/* Background Image with Zoom & Dark Gradient Fade */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={casinoBannerImage}
                alt="Casino Simulation Backdrop" 
                className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-all duration-700 ease-out select-none opacity-70 filter grayscale group-hover:filter-none group-hover:opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d2a1b] via-[#0d2a1b]/95 to-transparent pointer-events-none md:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a1b] via-[#0d2a1b]/90 to-transparent pointer-events-none md:hidden block" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 p-7 sm:p-10 md:p-12 flex-grow flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
              <div className="space-y-4 max-w-xl text-center md:text-left">
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-sport font-[800] italic tracking-tight text-white group-hover:text-amber-400 transition-colors duration-300 uppercase">
                    {t('home.casinoSimulationTitle')}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                    {t('home.casinoSimulationDesc')}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-1.5 text-[10px] text-neutral-500 font-bold select-none uppercase tracking-wider">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {t('home.bulletC1')}</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {t('home.bulletC2')}</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {t('home.bulletC3')}</li>
                </ul>
              </div>

              <div className="shrink-0 flex justify-center w-full md:w-auto">
                <Link
                  to="/casino"
                  className="w-full sm:w-auto text-center inline-flex justify-center py-4 px-8 bg-amber-500/5 hover:bg-amber-500/15 text-amber-300 hover:text-amber-200 border border-amber-500/20 hover:border-amber-500/40 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 group-hover:scale-[1.03] active:scale-95 items-center gap-2 shadow-sm"
                >
                  {t('home.comingSoon')} <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
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

      {/* Footer Disclaimer */}
      <footer className="relative z-10 w-full bg-black/80 border-t border-white/5 py-4 px-5 sm:px-8 flex flex-col items-center justify-center gap-3 text-[10px] tracking-wider select-none shrink-0">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-neutral-500 font-medium text-center">
          <span>© 2026 <span className="text-neutral-400 font-semibold tracking-widest">{t('home.title')} {t('home.trainer')}</span>. {t('common.allRights')}.</span>
          <span className="text-white/10 hidden sm:inline">|</span>
          <span className="text-neutral-500 tracking-widest text-[9px]">{t('common.version')}</span>
        </div>
        
        <div className="text-center text-[9px] text-neutral-600 tracking-widest leading-relaxed max-w-xl font-light">
          {t('common.educationalSimulator')}
        </div>
      </footer>



      {/* Feedback Modal Overlay */}
      <AnimatePresence>
        {showFeedbackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden transform-gpu">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowFeedbackModal(false);
                setIsFeedbackSubmitted(false);
                setFeedbackMessage('');
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-lg bg-neutral-900/90 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl flex flex-col gap-5 max-h-[88vh] sm:max-h-[92vh] overflow-hidden backdrop-blur-2xl"
            >
              {/* Subtle decorative glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 select-none relative z-10 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-inner shrink-0">
                    <MessageSquare size={18} className="text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-base sm:text-lg font-bold tracking-wider uppercase text-white leading-none">{t('feedback.title')}</h2>
                    <p className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold leading-none mt-1 sm:mt-1.5 font-sans">{t('feedback.subtitle')}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setIsFeedbackSubmitted(false);
                    setFeedbackMessage('');
                  }}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer outline-none shrink-0"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {!isFeedbackSubmitted ? (
                <form 
                  onSubmit={handleSubmitFeedback} 
                  className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 relative z-10 text-left scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                >
                  {/* Category */}
                  <div className="space-y-1.5 select-none shrink-0">
                    <span className="text-neutral-455 uppercase tracking-widest text-[9px] font-bold block text-neutral-400">{t('feedback.category')}</span>
                    <div className="grid grid-cols-2 gap-2">
                      {['Suggestion', 'Bug Report', 'Praise', 'Other'].map(cat => {
                        const translationKey = cat === 'Suggestion' ? 'feedback.suggestion' :
                                              cat === 'Bug Report' ? 'feedback.bugReport' :
                                              cat === 'Praise' ? 'feedback.praise' : 'feedback.other';
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setFeedbackCategory(cat)}
                            className={`py-2 text-center rounded-xl text-xs font-bold border transition-colors cursor-pointer outline-none ${feedbackCategory === cat ? 'bg-emerald-950/30 border-[#10b981]/50 text-emerald-300 font-medium' : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'}`}
                          >
                            {t(translationKey)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Rating selection */}
                  <div className="space-y-1.5 select-none shrink-0">
                    <span className="text-neutral-455 uppercase tracking-widest text-[9px] font-bold block text-neutral-400">{t('feedback.rateTitle')}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={(e) => { e.preventDefault(); setFeedbackRating(num); }}
                            className="p-1 outline-none transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                          >
                            <Star 
                              size={22} 
                              className={`transition-colors ${num <= feedbackRating ? 'text-amber-400 fill-amber-400' : 'text-neutral-605 hover:text-neutral-400 bg-transparent text-neutral-600'}`} 
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs text-neutral-450 font-bold px-1.5 uppercase tracking-widest font-mono text-neutral-500">({feedbackRating}/5)</span>
                    </div>
                  </div>

                  {/* Message message */}
                  <div className="space-y-1.5 flex-1 flex flex-col min-h-[100px]">
                    <span className="text-neutral-455 uppercase tracking-widest text-[9px] font-bold block text-neutral-400 shrink-0">{t('feedback.messageTitle')}</span>
                    <textarea
                      rows={3}
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      required
                      placeholder={t('feedback.placeholder')}
                      className="w-full flex-grow p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-500 focus:border-[#10b981]/45 focus:ring-1 focus:ring-[#10b981]/30 outline-none resize-none transition-colors"
                    />
                  </div>

                  {/* Actions buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2 shrink-0">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowFeedbackModal(false);
                        setIsFeedbackSubmitted(false);
                        setFeedbackMessage('');
                      }}
                      className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-neutral-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center select-none cursor-pointer outline-none"
                    >
                      {t('feedback.cancel')}
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 bg-gradient-to-br from-[#124d3a] to-[#0d3b2c] hover:from-[#175b45] hover:to-[#124d3a] text-[#a7f3d0] border border-emerald-700/20 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 select-none cursor-pointer outline-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>{language === 'es' ? 'Enviando...' : 'Sending...'}</span>
                      ) : (
                        <>
                          {t('feedback.submit')} <Send size={12} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex-1 flex flex-col justify-center items-center p-4 text-center space-y-4 animate-fadeIn relative z-10 shrink-0">
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shadow-inner">
                    <CheckCircle size={28} />
                  </div>
                  <div className="space-y-1.5 select-none">
                    <h4 className="font-bold text-sm text-white uppercase tracking-wider">{t('feedback.cataloged')}</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed max-w-sm mx-auto">
                      {t('feedback.successDesc')} <span className="text-emerald-305 font-bold font-mono px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">{t(`feedback.${feedbackCategory.toLowerCase().replace(' ', '')}`)}</span>.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row gap-2 w-full max-w-xs mx-auto select-none">
                    <button 
                      onClick={() => {
                        setIsFeedbackSubmitted(false);
                        setFeedbackMessage('');
                        setShowFeedbackModal(false);
                      }}
                      className="flex-1 py-3 bg-gradient-to-br from-[#2a2a2a] to-[#141414] hover:from-[#3a3a3a] hover:to-[#222222] text-white border border-white/15 font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer outline-none active:scale-[0.98]"
                    >
                      {t('feedback.close')}
                    </button>
                    <button 
                      onClick={() => {
                        setIsFeedbackSubmitted(false);
                        setFeedbackMessage('');
                      }}
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer outline-none"
                    >
                      {t('feedback.writeMore')}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
