
import React from 'react';
import { Hand } from '../types';
import { PlayingCard } from './PlayingCard';

interface DealerHandViewProps {
  hand: Hand;
}

export const DealerHandView = ({ hand }: DealerHandViewProps) => {
  return (
    <div className="relative z-10 flex flex-col items-center mt-6 sm:mt-8 scale-[0.75] sm:scale-95 md:scale-100">
      <div className="flex gap-1 sm:gap-2 md:gap-4 min-h-[90px] sm:min-h-[140px] md:min-h-[160px] justify-center px-4 overflow-visible">
        {hand.cards.map((card, i) => (
          <PlayingCard key={`${card.id}-${i}`} card={card} index={i} />
        ))}
      </div>
    </div>
  );
};
