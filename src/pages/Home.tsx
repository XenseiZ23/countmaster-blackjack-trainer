import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, GameStatus, Hand, GameStats, GameMode } from '../types';
import { createDeck, calculateHandScore, isBlackjack, getBasicStrategyAction } from '../lib/blackjack';
import { GameHeader } from '../components/GameHeader';
import { DiscardTray } from '../components/DiscardTray';
import { SettingsOverlay } from '../components/SettingsOverlay';
import { HandView } from '../components/HandView';
import { DealerHandView } from '../components/DealerHandView';
import { GameOverlays } from '../components/GameOverlays';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.title = 'CountMaster Blackjack Trainer';
  }, []);

  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHands, setPlayerHands] = useState<Hand[]>([]);
  const [dealerHand, setDealerHand] = useState<Hand>({ cards: [], score: 0, isBusted: false, isBlackjack: false, playerId: -1 });
  const [runningCount, setRunningCount] = useState(0);
  const [status, setStatus] = useState<GameStatus>('setup');
  const [speed, setSpeed] = useState(2500); // ms delay
  const [playerCount, setPlayerCount] = useState(1);
  const [userCountInput, setUserCountInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{ show: boolean, correct: boolean, message: string }>({ show: false, correct: false, message: '' });
  const [showSettings, setShowSettings] = useState(false);
  const [stats, setStats] = useState<GameStats>({ correctGuesses: 0, totalRounds: 0, accuracy: 0 });
  const [gameMode, setGameMode] = useState<GameMode>('standard');
  const [deckCount, setDeckCount] = useState(6);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsInDiscard, setCardsInDiscard] = useState(0);
  
  // Refs to track state for timeouts and avoid dependency loops
  const deckRef = useRef<Card[]>([]);
  const currentRunningCount = useRef(0);
  const roundIdRef = useRef(0);
  const isPausedRef = useRef(false);
  const playerHandsRef = useRef<Hand[]>([]);
  const dealerHandRef = useRef<Hand>({ cards: [], score: 0, isBusted: false, isBlackjack: false, playerId: -1 });
  const statusRef = useRef<GameStatus>('setup');

  // Keep refs in sync
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    playerHandsRef.current = playerHands;
  }, [playerHands]);

  useEffect(() => {
    dealerHandRef.current = dealerHand;
  }, [dealerHand]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const safeSetStatus = useCallback((newStatus: GameStatus) => {
    setStatus(newStatus);
    statusRef.current = newStatus;
  }, []);

  const initDeck = useCallback(() => {
    const newDeck = createDeck(deckCount);
    setDeck(newDeck);
    deckRef.current = newDeck;
    setCardsInDiscard(0);
  }, [deckCount]);

  // When deck count changes, reset to idle to prevent inconsistent state
  useEffect(() => {
    initDeck();
    if (statusRef.current !== 'setup') {
      resetGame('idle');
    }
  }, [deckCount, initDeck]);

  // Constant for card width/spacing
  const CARD_SPACING = 35;

  const wait = (ms: number) => new Promise(resolve => {
    let remaining = ms;
    const startTime = Date.now();
    
    const checkPause = () => {
      if (isPausedRef.current) {
        // If pause happened, we adjust remaining time for when we resume
        setTimeout(checkPause, 100);
      } else {
        const elapsed = Date.now() - startTime;
        const actualRemaining = Math.max(0, ms - elapsed);
        setTimeout(resolve, actualRemaining);
      }
    };
    checkPause();
  });

  const playRound = useCallback(async () => {
    // Use ref check to avoid stale closure issues during rapid status transitions
    if (statusRef.current === 'dealing' || statusRef.current === 'playing' || statusRef.current === 'shoe_depleted') return;
    
    // Check if we have enough cards for another round (estimate 8 cards per participant for 5-player safety)
    const minRequired = Math.max(25, (playerCount + 1) * 8);
    if (gameMode === 'advanced' && deckRef.current.length < minRequired) {
      safeSetStatus('shoe_depleted');
      return;
    }

    // Add previous round's cards to discard tray using refs to ensure latest values are used
    const previousCardsCount = dealerHandRef.current.cards.length + playerHandsRef.current.reduce((acc, h) => acc + h.cards.length, 0);
    if (previousCardsCount > 0) {
      setCardsInDiscard(prev => prev + previousCardsCount);
    }

    const currentRoundId = ++roundIdRef.current;
    safeSetStatus('dealing');
    
    // Local state tracking to avoid race conditions
    const currentHands: Hand[] = Array.from({ length: playerCount }, (_, i) => ({
      cards: [],
      score: 0,
      isBusted: false,
      isBlackjack: false,
      playerId: i
    }));
    
    const currentDealer: Hand = { 
      cards: [], 
      score: 0, 
      isBusted: false, 
      isBlackjack: false, 
      playerId: -1 
    };

    setPlayerHands(currentHands);
    setDealerHand(currentDealer);
    setFeedback({ show: false, correct: false, message: '' });

    const localDeal = async (targetId: number, reveal: boolean = true) => {
      // Cancellation check inside localDeal
      if (roundIdRef.current !== currentRoundId) return null;

      // Reshuffle logic for standard mode
      if (gameMode === 'standard' && (deckRef.current.length === 0 || deckRef.current.length < (deckCount * 52 * 0.2))) {
        initDeck();
      }
      
      // Safety check: if deck is empty despite reshuffle or in advanced mode
      if (deckRef.current.length === 0) {
        if (gameMode === 'advanced') {
          safeSetStatus('shoe_depleted');
        }
        return null;
      }
      
      const newDeck = [...deckRef.current];
      const popped = newDeck.pop();
      if (!popped) {
        if (gameMode === 'advanced') {
          safeSetStatus('shoe_depleted');
        }
        return null;
      }
      
      const card = { ...popped };
      card.isRevealed = reveal;
      deckRef.current = newDeck;
      setDeck(newDeck);

      if (reveal) {
        currentRunningCount.current += card.countValue;
        setRunningCount(currentRunningCount.current);
      }

      if (targetId === -1) {
        currentDealer.cards = [...currentDealer.cards, card]; // Immutable array update
        currentDealer.score = calculateHandScore(currentDealer.cards);
        currentDealer.isBusted = currentDealer.score > 21;
        currentDealer.isBlackjack = isBlackjack(currentDealer.cards);
        setDealerHand({ ...currentDealer });
      } else {
        const hand = currentHands[targetId];
        if (hand) {
          hand.cards = [...hand.cards, card]; // Immutable array update
          hand.score = calculateHandScore(hand.cards);
          hand.isBusted = hand.score > 21;
          hand.isBlackjack = isBlackjack(hand.cards);
          setPlayerHands([...currentHands]);
        }
      }
      return card;
    };

    // Initial Deal: Right to left
    for (let round = 0; round < 2; round++) {
      for (let i = playerCount - 1; i >= 0; i--) {
        if (roundIdRef.current !== currentRoundId) return;
        await wait(speed / 2.5); // Tighter timing for fluidity
        if (roundIdRef.current !== currentRoundId) return;
        const card = await localDeal(i);
        if (!card) return;
      }
      if (roundIdRef.current !== currentRoundId) return;
      await wait(speed / 2.5); // Tighter timing for fluidity
      if (roundIdRef.current !== currentRoundId) return;
      const card = await localDeal(-1, round === 0);
      if (!card) return;
    }

    if (roundIdRef.current !== currentRoundId) return;
    safeSetStatus('playing');

    // Player Turns (Automated): Right to left
    for (let i = playerCount - 1; i >= 0; i--) {
      let playerInTurn = true;
      while (playerInTurn) {
        if (roundIdRef.current !== currentRoundId) return;
        const hand = currentHands[i];
        const dealerUpCard = currentDealer.cards[0];
        
        if (hand && !hand.isBusted && dealerUpCard && hand.score < 21 && getBasicStrategyAction(hand.score, dealerUpCard.rank) === 'H') {
          await wait(speed / 1.5); // Snappier hit speed
          if (roundIdRef.current !== currentRoundId) return;
          const card = await localDeal(i);
          if (!card) return;
        } else {
          // If busted in advanced mode, clear cards after a short delay and add to discard tray
          if (hand && hand.isBusted && gameMode === 'advanced') {
            await wait(speed);
            if (roundIdRef.current !== currentRoundId) return;
            setCardsInDiscard(prev => prev + hand.cards.length);
            hand.cards = [];
            setPlayerHands([...currentHands]);
          }
          playerInTurn = false;
        }
      }
    }

    // Dealer Turn
    if (roundIdRef.current !== currentRoundId) return;
    await wait(speed / 1.5);
    
    // Reveal Hole Card
    if (roundIdRef.current !== currentRoundId) return;
    if (currentDealer.cards.length >= 2 && !currentDealer.cards[1].isRevealed) {
      const holeCard = { ...currentDealer.cards[1], isRevealed: true };
      const newDealerCards = [currentDealer.cards[0], holeCard, ...currentDealer.cards.slice(2)];
      
      currentDealer.cards = newDealerCards;
      currentDealer.score = calculateHandScore(newDealerCards);
      currentDealer.isBusted = currentDealer.score > 21;
      currentDealer.isBlackjack = isBlackjack(newDealerCards);
      
      currentRunningCount.current += holeCard.countValue;
      setRunningCount(currentRunningCount.current);
      setDealerHand({ ...currentDealer });
    }
    
    if (roundIdRef.current !== currentRoundId) return;
    await wait(speed / 2); // Faster sequence

    while (currentDealer.score < 17) {
      if (roundIdRef.current !== currentRoundId) return;
      const card = await localDeal(-1);
      if (!card) return;
      if (roundIdRef.current !== currentRoundId) return;
      await wait(speed / 1.5);
    }

    if (roundIdRef.current !== currentRoundId) return;
    
    // Dynamic wait time: higher speed game = higher multiplier to allow more time to think.
    const dynamicMultiplier = 2.0 - (speed / 1650);
    const waitTime = speed * Math.max(0.4, dynamicMultiplier);
    
    await wait(waitTime);
    if (roundIdRef.current !== currentRoundId) return;
    safeSetStatus('checking_count');
  }, [deckCount, gameMode, initDeck, playerCount, speed, safeSetStatus]);

  const startRound = useCallback(() => {
    if (statusRef.current === 'idle' || statusRef.current === 'checking_count') {
      playRound();
    }
  }, [playRound]);

  const verifyCount = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Prevent double-verification if feedback is already showing
    if (feedback.show) return;

    const input = parseInt(userCountInput);
    if (isNaN(input)) return;
    const isCorrect = input === runningCount;
    
    setStats(prev => {
      const newTotal = prev.totalRounds + 1;
      const newCorrect = isCorrect ? prev.correctGuesses + 1 : prev.correctGuesses;
      return {
        correctGuesses: newCorrect,
        totalRounds: newTotal,
        accuracy: Math.round((newCorrect / newTotal) * 100)
      };
    });

    if (isCorrect) {
      setUserCountInput('');
      setFeedback({ show: false, correct: false, message: '' });
      // Start next round directly without flickering to 'idle'
      startRound();
    } else {
      setFeedback({ show: true, correct: false, message: `Incorrect. The running count is ${runningCount}.` });
    }
  };

  const continueAfterError = useCallback(() => {
    setUserCountInput('');
    setFeedback({ show: false, correct: false, message: '' });
    // Start next round directly without flickering to 'idle'
    startRound();
  }, [startRound]);

  // Keyboard support for continuing after error
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && feedback.show) {
        continueAfterError();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [feedback.show, continueAfterError]);

  const resetGame = (targetStatus: GameStatus = 'setup') => {
    roundIdRef.current++; // Cancel current round loop
    setRunningCount(0);
    currentRunningCount.current = 0;
    
    // Explicitly re-init deck to ensure it's fresh for the new state
    const newDeck = createDeck(deckCount);
    setDeck(newDeck);
    deckRef.current = newDeck;
    
    setPlayerHands([]);
    setDealerHand({ cards: [], score: 0, isBusted: false, isBlackjack: false, playerId: -1 });
    safeSetStatus(targetStatus);
    setFeedback({ show: false, correct: false, message: '' });
    setStats({ correctGuesses: 0, totalRounds: 0, accuracy: 0 });
    setCardsInDiscard(0);
    setIsPaused(false);
  };

  if (status === 'setup' || showSettings) {
    return (
      <SettingsOverlay
        showSettings={showSettings}
        status={status}
        gameMode={gameMode}
        setGameMode={setGameMode}
        deckCount={deckCount}
        setDeckCount={setDeckCount}
        playerCount={playerCount}
        setPlayerCount={setPlayerCount}
        speed={speed}
        setSpeed={setSpeed}
        setShowSettings={setShowSettings}
        resetGame={resetGame}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col overflow-hidden transform-gpu">
      <GameHeader
        stats={stats}
        totalRounds={stats.totalRounds}
        speed={speed}
        playerCount={playerCount}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        setShowSettings={setShowSettings}
      />

      {/* Main Table */}
      <main className="flex-1 relative flex flex-col items-center justify-between p-2 sm:p-4 pb-12 sm:pb-4 overflow-hidden isolate">
        {/* Table Felt (Background remains visible but potentially darker/blurred) */}
        <div className={`absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#065f46_0%,_#064e3b_100%)] transition-opacity duration-300 ${isPaused ? 'brightness-[0.2]' : 'brightness-100'}`}>
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
          {/* Table markings */}
          <div className={`absolute -top-1/4 left-1/2 -translate-x-1/2 w-[120vw] h-[80vw] border-[12px] border-white/10 rounded-[100%] pointer-events-none transition-opacity duration-300 ${isPaused ? 'opacity-20' : 'opacity-100'}`} />
        </div>

        {/* Content Blur Wrapper */}
        <div className={`flex-1 w-full flex flex-col items-center justify-between py-2 sm:py-6 transition-opacity duration-300 ${isPaused ? 'blur-md scale-[0.99] pointer-events-none opacity-20 select-none' : 'blur-0 scale-100 opacity-100'}`}>
          {/* Dealer Hand */}
          <DealerHandView hand={dealerHand} />

          {/* Players Container */}
          <div className="relative z-10 w-full flex flex-wrap justify-center items-end gap-x-4 sm:gap-x-12 md:gap-x-24 gap-y-4 sm:gap-y-16 max-w-7xl px-2 sm:px-6 lg:px-8 pb-20 sm:pb-12 pt-4 sm:pt-12">
            {playerHands.map((hand, idx) => (
              <HandView 
                key={idx}
                hand={hand}
                isMobile={isMobile}
                scaleClass={playerCount > 3 ? "scale-[0.55] sm:scale-90" : "scale-[0.7] sm:scale-100"}
                cardSpacing={CARD_SPACING}
              />
            ))}
          </div>

          {/* Discard Tray - Visible in both modes to show deck penetration and progress */}
          <DiscardTray 
            cardsInDiscard={cardsInDiscard}
            deckCount={deckCount}
            isPaused={isPaused}
          />
        </div>

        <GameOverlays 
          status={status}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          startRound={startRound}
          resetGame={resetGame}
          setShowSettings={setShowSettings}
          runningCount={runningCount}
          deck={deck}
          feedback={feedback}
          userCountInput={userCountInput}
          setUserCountInput={setUserCountInput}
          verifyCount={verifyCount}
          continueAfterError={continueAfterError}
        />
      </main>

      {/* Footer Info */}
      <footer className="p-3 bg-black/60 border-t border-white/5 text-[10px] uppercase tracking-wider text-neutral-500 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <span>HI-LO SYSTEM</span>
            <span className="text-emerald-500">2-6 (+1)</span>
            <span className="text-neutral-400">7-9 (0)</span>
            <span className="text-red-500">10-A (-1)</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {gameMode === 'advanced' ? (
            <div className="px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 font-black text-[8px]">ADVANCED</div>
          ) : (
            <div className="px-2 py-0.5 rounded border border-blue-500/30 text-blue-400 font-black text-[8px]">BASIC</div>
          )}
        </div>
      </footer>
    </div>
  );
}
