
import { Card, Rank, Suit, Hand } from '../types';

const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const getCardCountValue = (rank: Rank): number => {
  if (['2', '3', '4', '5', '6'].includes(rank)) return 1;
  if (['7', '8', '9'].includes(rank)) return 0;
  return -1; // 10, J, Q, K, A
};

export const getCardNumericValues = (rank: Rank): number[] => {
  if (rank === 'A') return [1, 11];
  if (['J', 'Q', 'K', '10'].includes(rank)) return [10];
  return [parseInt(rank)];
};

export const createDeck = (numDecks: number = 6): Card[] => {
  const deck: Card[] = [];
  for (let d = 0; d < numDecks; d++) {
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        deck.push({
          id: `${d}-${suit}-${rank}`,
          suit,
          rank,
          value: getCardNumericValues(rank),
          countValue: getCardCountValue(rank),
          isRevealed: false,
        });
      }
    }
  }
  return shuffle(deck);
};

export const shuffle = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const calculateHandScore = (cards: Card[]): number => {
  let total = 0;
  let aces = 0;

  for (const card of cards) {
    if (card.rank === 'A') {
      aces++;
      total += 11;
    } else {
      total += card.value[0];
    }
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
};

export const isBlackjack = (cards: Card[]): boolean => {
  return cards.length === 2 && calculateHandScore(cards) === 21;
};

export const getBasicStrategyAction = (playerScore: number, dealerUpCardRank: Rank): 'H' | 'S' => {
  const dealerValue = getCardNumericValues(dealerUpCardRank)[0];
  
  // Very simplified basic strategy for trainer
  if (playerScore >= 17) return 'S';
  if (playerScore <= 11) return 'H';
  
  if (playerScore >= 13 && playerScore <= 16) {
    return dealerValue <= 6 ? 'S' : 'H';
  }
  
  if (playerScore === 12) {
    return (dealerValue >= 4 && dealerValue <= 6) ? 'S' : 'H';
  }
  
  return 'H';
};
