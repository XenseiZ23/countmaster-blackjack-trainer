
import React from 'react';
import { Hand } from '../types';
import { PlayingCard } from './PlayingCard';

interface HandViewProps {
  hand: Hand;
  isMobile: boolean;
  scaleClass: string;
  cardSpacing: number;
}

export const HandView: React.FC<HandViewProps> = ({ hand, isMobile, scaleClass, cardSpacing }) => {
  const currentCardCount = hand.cards.length;
  // Compress card spacing if hand has many cards to prevent overflow with neighbors
  const spacingMultiplier = currentCardCount > 5 ? 0.5 : (currentCardCount > 4 ? 0.7 : (currentCardCount > 3 ? 0.85 : 1));
  const mobileSpacing = 16 * spacingMultiplier;
  const desktopSpacing = cardSpacing * spacingMultiplier;
  const actualSpacing = isMobile ? mobileSpacing : desktopSpacing;

  return (
    <div className={`flex flex-col items-center gap-2 sm:gap-4 shrink-0 transition-opacity duration-300 origin-bottom ${scaleClass}`}>
      <div 
        className="relative min-w-[60px] sm:min-w-[80px] md:min-w-[100px] h-[100px] sm:h-[140px] md:h-[160px] flex justify-center"
        style={{ width: `${Math.max(60, 50 + (hand.cards.length - 1) * actualSpacing)}px` }}
      >
        {hand.cards.map((card, i) => (
          <div 
            key={`${card.id}-${i}`} 
            className="absolute top-0 transition-opacity duration-300" 
            style={{ 
              left: `${i * actualSpacing}px`, 
              zIndex: i,
              transform: `rotate(${(i - (hand.cards.length - 1) / 2) * 2}deg)`
            }}
          >
            <PlayingCard card={card} index={i} />
          </div>
        ))}
      </div>
      <div className="h-4" /> {/* Spacer instead of score to maintain layout */}
    </div>
  );
};
