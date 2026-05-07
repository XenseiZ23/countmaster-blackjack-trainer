
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  value: number[];
  countValue: number;
  isRevealed: boolean;
}

export interface Hand {
  cards: Card[];
  score: number;
  isBusted: boolean;
  isBlackjack: boolean;
  playerId: number;
}

export type GameStatus = 'setup' | 'idle' | 'dealing' | 'playing' | 'checking_count' | 'round_end' | 'shoe_depleted';
export type GameMode = 'standard' | 'advanced';

export interface GameStats {
  correctGuesses: number;
  totalRounds: number;
  accuracy: number;
}

export interface GameState {
  deck: Card[];
  playerHands: Hand[];
  dealerHand: Hand;
  runningCount: number;
  status: GameStatus;
  speed: number;
  playerCount: number;
  stats: GameStats;
}
