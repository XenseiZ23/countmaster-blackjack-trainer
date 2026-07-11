
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext';

interface DiscardTrayProps {
  cardsInDiscard: number;
  deckCount: number;
  isPaused: boolean;
}

export const DiscardTray: React.FC<DiscardTrayProps> = ({ cardsInDiscard, deckCount, isPaused }) => {
  const { language } = useLanguage();
  if (isPaused) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-20 sm:top-28 left-4 sm:left-12 z-10 flex flex-col items-center gap-2 scale-75 sm:scale-110 origin-top-left group cursor-help transition-opacity"
    >
      <div className="relative w-20 h-24 bg-white/10 border border-white/30 rounded-t-sm shadow-2xl overflow-hidden perspective-1000">
        <div className="absolute inset-0 bg-neutral-900/60" />
        <div className="absolute bottom-0 inset-x-0 h-2 bg-neutral-900 border-t border-white/10" />

        <motion.div 
          className="absolute bottom-1 inset-x-0.5 bg-neutral-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] origin-bottom"
          style={{ 
            borderRadius: '1px 1px 0 0',
            boxShadow: '0 -1px 0 rgba(0,0,0,0.1), 0 -2px 0 rgba(255,255,255,1), 0 -3px 0 rgba(0,0,0,0.1), 0 -4px 0 rgba(255,255,255,1)'
          }}
          initial={{ height: 0 }}
          animate={{ height: `${( cardsInDiscard / (deckCount * 52) ) * 85}%` }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(0deg,#fff,#fff_1px,#ccc_1px,#ccc_2px)]" />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
      </div>
      
      <div className="flex flex-col items-center opacity-40 group-hover:opacity-100 transition-opacity">
        <span className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">
          {language === 'es' ? 'Descarte' : 'Discard'}
        </span>
        <span className="text-[9px] font-bold text-white/50 tabular-nums">
          {cardsInDiscard} {language === 'es' ? 'cartas' : 'cards'}
        </span>
      </div>
    </motion.div>
  );
};
