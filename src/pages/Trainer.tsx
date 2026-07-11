import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, GameStatus, Hand, GameStats, GameMode } from '../types';
import { createDeck, calculateHandScore, isBlackjack, getBasicStrategyAction } from '../lib/blackjack';
import { GameHeader } from '../components/GameHeader';
import { DiscardTray } from '../components/DiscardTray';
import { SettingsOverlay } from '../components/SettingsOverlay';
import { HandView } from '../components/HandView';
import { DealerHandView } from '../components/DealerHandView';
import { GameOverlays } from '../components/GameOverlays';
import SupercellSplash from '../components/SupercellSplash';
import { useLanguage } from '../lib/LanguageContext';

export default function Trainer() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.title = language === 'es' ? 'Contador de Cartas de Blackjack' : 'Blackjack Card Counter';
  }, [language]);

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
      setFeedback({ show: true, correct: false, message: language === 'es' ? `Incorrecto. El conteo corriente es ${runningCount}.` : `Incorrect. The running count is ${runningCount}.` });
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

  const handleBackClick = () => {
    if (status !== 'setup') {
      setIsPaused(true);
      setShowExitConfirm(true);
    } else {
      navigate('/');
    }
  };

  if (status === 'setup' || showSettings) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
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
        {showSplash && (
          <SupercellSplash onComplete={() => setShowSplash(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col overflow-hidden transform-gpu animate-fadeIn">
      <GameHeader
        stats={stats}
        totalRounds={stats.totalRounds}
        speed={speed}
        playerCount={playerCount}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        setShowSettings={setShowSettings}
        onBackClick={handleBackClick}
      />

      {/* Main Table */}
      <main className="flex-1 relative flex flex-col items-center justify-between p-2 sm:p-4 pb-12 sm:pb-4 overflow-hidden isolate">
        {/* Table Felt with Elegant Ambient Glowing Orbs */}
        <div className={`absolute inset-0 z-0 bg-[linear-gradient(to_right,_#062213_0%,_#0c4226_20%,_#14532d_40%,_#166534_50%,_#14532d_60%,_#0c4226_80%,_#062213_100%)] overflow-hidden transition-all duration-300 ${isPaused ? 'brightness-[0.18]' : 'brightness-100'}`}>
          {/* Organic Ambient Glowing Orbs on the Live Table */}
          <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] max-w-[650px] rounded-full bg-emerald-500/[0.10] blur-[120px] pointer-events-none animate-[pulse_9s_ease-in-out_infinite]" />
          <div className="absolute bottom-[10%] -right-[10%] w-[50vw] h-[50vw] max-w-[550px] rounded-full bg-emerald-600/[0.08] blur-[110px] pointer-events-none animate-[pulse_11s_ease-in-out_infinite_1.5s]" />

          {/* Felt Texture pattern */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/felt.png')] mix-blend-overlay pointer-events-none" />
          
          {/* Detailed SVG Table markings spanning edge-to-edge across the bottom */}
          <div className={`absolute bottom-0 left-0 right-0 h-[70vh] pointer-events-none transition-all duration-300 ${isPaused ? 'opacity-10' : 'opacity-100'}`}>
            <svg 
              className="w-full h-full opacity-[0.38] mix-blend-screen"
              viewBox="0 0 1000 450"
              preserveAspectRatio="xMidYMax slice"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Paths for text-on-path alignment */}
              <path id="dealer-limit-arc" d="M 0,30 Q 500,340 1000,30" fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="1.8" />
              <path id="payout-text-arc" d="M 80,100 Q 500,360 920,100" fill="none" />
              <path id="rules-text-arc" d="M 140,140 Q 500,380 860,140" fill="none" />
              <path id="insurance-band" d="M 180,170 Q 500,400 820,170" fill="none" stroke="rgba(245,158,11,0.38)" strokeWidth="18" strokeLinecap="round" />
              <path id="insurance-text-arc" d="M 180,172 Q 500,402 820,172" fill="none" />
              <path id="inner-gold-arc" d="M 230,210 Q 500,420 770,210" fill="none" stroke="rgba(245,158,11,0.32)" strokeWidth="1.5" strokeDasharray="6,4" />

              {/* Text on Paths */}
              <text className="font-sans font-black tracking-[0.3em] uppercase text-[15px] fill-amber-400">
                <textPath href="#payout-text-arc" startOffset="50%" textAnchor="middle">
                  {t('trainer.payoutLabel')}
                </textPath>
              </text>

              <text className="font-sans font-bold tracking-[0.18em] uppercase text-[9px] fill-white/70">
                <textPath href="#rules-text-arc" startOffset="50%" textAnchor="middle">
                  {t('trainer.dealerRule')}
                </textPath>
              </text>

              <text className="font-sans font-extrabold tracking-[0.25em] uppercase text-[10px] fill-neutral-900">
                <textPath href="#insurance-text-arc" startOffset="50%" textAnchor="middle">
                  {t('trainer.insuranceLabel')}
                </textPath>
              </text>

              {/* Player Card Boxes Placeholders to ground the players' seats */}
              <g opacity="0.25">
                {/* Dealer Placement Box */}
                <rect x="460" y="20" width="80" height="110" rx="6" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,3" fill="none" />
                
                {/* Player Betting Circles/Boxes distributed in an arc */}
                <g stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none">
                  {/* Seat 1 */}
                  <circle cx="180" cy="300" r="32" />
                  <rect x="145" y="240" width="70" height="95" rx="6" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  
                  {/* Seat 2 */}
                  <circle cx="340" cy="350" r="32" />
                  <rect x="305" y="290" width="70" height="95" rx="6" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  
                  {/* Seat 3 (Center) */}
                  <circle cx="500" cy="370" r="32" />
                  <rect x="465" y="310" width="70" height="95" rx="6" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  
                  {/* Seat 4 */}
                  <circle cx="660" cy="350" r="32" />
                  <rect x="625" y="290" width="70" height="95" rx="6" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  
                  {/* Seat 5 */}
                  <circle cx="820" cy="300" r="32" />
                  <rect x="785" y="240" width="70" height="95" rx="6" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                </g>
              </g>
            </svg>
          </div>
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

      {/* Bottom-Left Language Switcher (Outside, resting flush on top of the footer) */}
      <div className="relative z-20 w-full px-4 sm:px-6 pt-0 pb-0 flex justify-start items-center select-none shrink-0">
        <div className="flex items-center gap-2 border-b-2 border-transparent pb-1 translate-y-[1px]">
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
      <footer className="py-2.5 px-4 bg-black/60 border-t border-white/5 text-[10px] uppercase tracking-wider text-neutral-500 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <span>{t('trainer.systemTitle')}</span>
            <span className="text-[#10b981]">2-6 (+1)</span>
            <span className="text-neutral-400">7-9 (0)</span>
            <span className="text-red-500">10-A (-1)</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 select-none font-bold">
          <span className="text-[9px] text-neutral-500 font-medium font-sans">
            {t('trainer.systemMode')} <span className="text-white/20 px-1">|</span> <span className={gameMode === 'advanced' ? 'text-emerald-400 font-black' : 'text-neutral-300 font-black'}>{gameMode.toUpperCase()}</span>
          </span>
        </div>
      </footer>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="max-w-md w-full bg-neutral-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center gap-6">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
              <ArrowLeft size={32} className="stroke-[2.5]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold uppercase tracking-wider text-white">{t('trainer.exitTitle')}</h3>
              <p className="text-sm text-neutral-400">
                {t('trainer.exitDesc')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  setIsPaused(false);
                }}
                className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-xs uppercase tracking-widest transition-colors text-white"
              >
                {t('trainer.exitNo')}
              </button>
              <button
                onClick={() => {
                  navigate('/');
                }}
                className="flex-1 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-colors shadow-lg shadow-red-950/50"
              >
                {t('trainer.exitYes')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
