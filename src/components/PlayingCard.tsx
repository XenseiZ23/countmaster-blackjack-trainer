
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../types';

interface PlayingCardProps {
  card: Card;
  index: number;
}

const suitSymbols = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠',
};

const suitColors = {
  hearts: 'text-red-600',
  diamonds: 'text-red-500',
  clubs: 'text-gray-900',
  spades: 'text-gray-900',
};

export const PlayingCard = React.memo(({ card, index }: PlayingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -200, x: 100, rotate: 15 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        x: 0, 
        rotate: 0,
      }}
      transition={{ 
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
      className="relative w-20 h-30 sm:w-24 sm:h-36 md:w-28 md:h-40 rounded-lg shadow-xl cursor-default"
      id={`card-${card.id}`}
    >
      <AnimatePresence mode="wait">
        {!card.isRevealed ? (
          <motion.div
            key="back"
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -90 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-blue-900 rounded-lg border-4 border-white flex items-center justify-center overflow-hidden"
          >
            {/* Casino card back pattern */}
            <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:10px_10px]" />
            <div className="absolute inset-4 border-2 border-white/30 rounded" />
          </motion.div>
        ) : (
          <motion.div
            key="front"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-white rounded-lg border border-gray-300 p-1 sm:p-2 flex flex-col justify-between overflow-hidden"
          >
            <div className={`flex flex-col items-center self-start ${suitColors[card.suit]}`}>
              <span className="text-sm sm:text-xl font-bold leading-none">{card.rank}</span>
              <span className="text-sm sm:text-lg leading-none">{suitSymbols[card.suit]}</span>
            </div>
            
            <div className={`text-2xl sm:text-4xl self-center ${suitColors[card.suit]}`}>
              {suitSymbols[card.suit]}
            </div>
            
            <div className={`flex flex-col items-center self-end rotate-180 ${suitColors[card.suit]}`}>
              <span className="text-sm sm:text-xl font-bold leading-none">{card.rank}</span>
              <span className="text-sm sm:text-lg leading-none">{suitSymbols[card.suit]}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
