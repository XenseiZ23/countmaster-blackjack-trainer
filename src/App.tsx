import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Settings, CheckCircle2, XCircle, SkipForward, Users, Gauge, Trophy, Plus, Minus, Zap, Database, Pause, Clover } from 'lucide-react';
import { Card, GameStatus, Hand, GameStats, GameMode } from './types';
import { createDeck, calculateHandScore, isBlackjack, getBasicStrategyAction } from './lib/blackjack';
import { PlayingCard } from './components/PlayingCard';


export default function App() {
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

  const initDeck = useCallback(() => {
    const newDeck = createDeck(deckCount);
    setDeck(newDeck);
    deckRef.current = newDeck;
    setCardsInDiscard(0);
  }, [deckCount]);

  useEffect(() => {
    initDeck();
  }, [initDeck]);

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
      setStatus('shoe_depleted');
      return;
    }

    // Add previous round's cards to discard tray using refs to ensure latest values are used
    const previousCardsCount = dealerHandRef.current.cards.length + playerHandsRef.current.reduce((acc, h) => acc + h.cards.length, 0);
    if (previousCardsCount > 0) {
      setCardsInDiscard(prev => prev + previousCardsCount);
    }

    // Check if we have enough cards for another round (Safe threshold: roughly 7 cards per participant)
    // This allows for more playing time while still preventing mid-hand depletion.
    const safeThreshold = Math.max(25, (playerCount + 1) * 8);
    if (gameMode === 'advanced' && deckRef.current.length < safeThreshold) {
      setStatus('shoe_depleted');
      return;
    }

    const currentRoundId = ++roundIdRef.current;
    setStatus('dealing');
    
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
          setStatus('shoe_depleted');
        }
        return null;
      }
      
      const newDeck = [...deckRef.current];
      const popped = newDeck.pop();
      if (!popped) {
        if (gameMode === 'advanced') {
          setStatus('shoe_depleted');
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
    setStatus('playing');

    // Player Turns (Automated): Right to left
    for (let i = playerCount - 1; i >= 0; i--) {
      let playerInTurn = true;
      while (playerInTurn) {
        if (roundIdRef.current !== currentRoundId) return;
        const hand = currentHands[i];
        const dealerUpCard = currentDealer.cards[0];
        
        if (hand && dealerUpCard && hand.score < 21 && getBasicStrategyAction(hand.score, dealerUpCard.rank) === 'H') {
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
    // Slow (2500ms) -> x0.5 (~1250ms wait)
    // Intermediate (850ms) -> x1.5 (~1275ms wait)
    const dynamicMultiplier = 2.0 - (speed / 1650);
    const waitTime = speed * Math.max(0.4, dynamicMultiplier);
    
    await wait(waitTime);
    if (roundIdRef.current !== currentRoundId) return;
    setStatus('checking_count');
  }, [deckCount, gameMode, initDeck, playerCount, speed, status]);

  const startRound = useCallback(() => {
    if (statusRef.current === 'idle') {
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
      startRound();
    } else {
      setFeedback({ show: true, correct: false, message: `Incorrect. The running count is ${runningCount}.` });
    }
  };

  const continueAfterError = useCallback(() => {
    setUserCountInput('');
    setFeedback({ show: false, correct: false, message: '' });
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
    setStatus(targetStatus);
    setFeedback({ show: false, correct: false, message: '' });
    setStats({ correctGuesses: 0, totalRounds: 0, accuracy: 0 });
    setCardsInDiscard(0);
    setIsPaused(false);
  };

    // Speed levels definition
    const speedLevels = [
      { name: 'Slow', value: 2500, pos: 0, intensity: 'Basic', color: 'text-emerald-400' },
      { name: 'Intermediate', value: 850, pos: 50, intensity: 'Standard', color: 'text-blue-400' },
      { name: 'Fast', value: 400, pos: 100, intensity: 'Expert Level', color: 'text-red-400' },
    ];

    // Helper to map slider value (0-100) to speed (ms)
    // Symmetrical mapping: 0-50 (Slow to Intermediate), 50-100 (Intermediate to Fast)
    const mapSliderToSpeed = (val: number) => {
      if (val <= 50) {
        // Map 0 -> 2500, 50 -> 850
        return 2500 - (val / 50) * 1650;
      } else {
        // Map 50 -> 850, 100 -> 400
        return 850 - ((val - 50) / 50) * 450;
      }
    };

    // Helper to map speed (ms) to slider value (0-100)
    const mapSpeedToSlider = (s: number) => {
      if (s >= 2500) return 0;
      if (s >= 850) return ((2500 - s) / 1650) * 50;
      if (s >= 400) return 50 + ((850 - s) / 450) * 50;
      return 100;
    };

    const currentLevel = speed >= 1600 ? speedLevels[0] : speed > 600 ? speedLevels[1] : speedLevels[2];

    if (status === 'setup' || showSettings) {
      return (
        <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000000_100%)] overflow-auto">
          <style dangerouslySetInnerHTML={{ __html: `
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 14px;
            width: 14px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            border: 2px solid #10b981;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            margin-top: -6px;
          }
          input[type=range]::-moz-range-thumb {
            height: 14px;
            width: 14px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            border: 2px solid #10b981;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
          }
          input[type=range]::-webkit-slider-runnable-track {
            height: 2px;
            background: rgba(255,255,255,0.1);
            border-radius: 1px;
          }
          input[type=range]::-moz-range-track {
            height: 2px;
            background: rgba(255,255,255,0.1);
            border-radius: 1px;
          }
          /* Hide number input arrows */
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
          /* Custom scrollbar hiding */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-neutral-800/40 backdrop-blur-sm border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-12 shadow-2xl flex flex-col gap-6 sm:gap-12"
        >
          {/* Header - Perfectly Centered */}
          <div className="text-center space-y-4 relative">
            {showSettings && (
              <button 
                onClick={() => {
                  if (status === 'setup') {
                    resetGame('idle');
                  }
                  setShowSettings(false);
                }}
                className="absolute -top-6 -right-6 p-4 text-neutral-500 hover:text-white transition-colors"
                title="Close Settings"
              >
                <XCircle size={32} />
              </button>
            )}
            
            <div className="flex items-center justify-center gap-6 text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-600 mb-4">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">About</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Support</a>
              <a href="https://github.com/XenseiZ23/countmaster-blackjack-trainer" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Feedback</a>
            </div>
            
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 max-w-sm mx-auto">
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest leading-relaxed">
                Training & Practice Software
              </p>
              <p className="text-[10px] text-neutral-500 font-medium leading-relaxed mt-1">
                This application does not allow real betting or money. It is exclusively for card counting technical practice.
              </p>
            </div>

            <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent uppercase italic">
              Settings
            </h1>
            <p className="text-neutral-400 font-medium max-w-sm mx-auto">
              {showSettings ? 'Modify your current table settings.' : 'Adjust your table parameters for professional training.'}
            </p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Game Mode Selection */}
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 uppercase tracking-widest text-[10px] font-bold">
                <Zap size={14} /> Training Mode
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'standard', name: 'Standard', desc: 'Infinite' },
                  { id: 'advanced', name: 'Advanced', desc: 'Calculator' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setGameMode(mode.id as GameMode)}
                    className={`p-4 rounded-2xl border transition-opacity flex flex-col items-center gap-1 ${gameMode === mode.id ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl shadow-emerald-500/20 scale-105' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'}`}
                  >
                    <span className="font-bold text-sm">{mode.name}</span>
                    <span className="text-[9px] uppercase tracking-tighter opacity-60 font-black">{mode.desc}</span>
                  </button>
                ))}
              </div>
            </div>
 
            {/* Deck Selection (Only for Advanced) */}
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 uppercase tracking-widest text-[10px] font-bold">
                <Database size={14} /> Number of Decks
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 4, 6, 8].map(count => (
                  <button
                    key={count}
                    onClick={() => {
                      setDeckCount(count);
                      setGameMode('advanced');
                    }}
                    className={`py-4 rounded-xl border transition-opacity font-bold text-xs ${deckCount === count && gameMode === 'advanced' ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl' : 'bg-white/5 border-white/10 text-neutral-500 hover:bg-white/10'}`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Player Selection - Symmetrical spacing */}
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 uppercase tracking-widest text-[10px] font-bold">
                <Users size={14} /> Players at Table
              </div>
              <div className="grid grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    onClick={() => setPlayerCount(num)}
                    className={`py-4 rounded-2xl border transition-opacity font-bold text-sm ${playerCount === num ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl shadow-emerald-500/20 scale-105' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
 
            {/* Speed Presets - Symmetrical spacing */}
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 uppercase tracking-widest text-[10px] font-bold">
                <Gauge size={14} /> Dealing Speed
              </div>
              <div className="grid grid-cols-3 gap-3">
                {speedLevels.map(s => {
                  const isActive = Math.abs(speed - s.value) < 10;
                  return (
                    <button
                      key={s.value}
                      onClick={() => setSpeed(s.value)}
                      className={`py-4 rounded-2xl border text-[10px] uppercase font-black transition-opacity ${isActive ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl scale-105' : 'bg-white/5 border-white/10 text-neutral-500 hover:bg-white/10'}`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
 
          {/* Custom Speed Slider - Re-engineered for perfect symmetry and alignment */}
          <div className="space-y-12 pt-10 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 px-8 py-6 rounded-[2rem] border border-white/5 gap-6">
              <div className="space-y-1 text-center md:text-left">
                <div className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-500">Dealing Pace</div>
                <div className="text-3xl font-bold font-mono text-emerald-400 tabular-nums">
                  {(speed / 1000).toFixed(2)}<span className="text-xs text-neutral-500 px-2 font-sans italic">sec</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-500">Intensity</div>
                <div className={`text-base font-bold uppercase tracking-wider transition-opacity duration-300 ${currentLevel.color}`}>
                  {currentLevel.intensity}
                </div>
              </div>
            </div>
            
            <div className="relative pt-6">
              {/* Markers Background Layer - Aligned to Thumb Centers */}
              <div className="absolute top-0 left-[7px] right-[7px] h-full pointer-events-none">
                {speedLevels.map(level => {
                  const isNear = Math.abs(speed - level.value) < 10;
                  return (
                    <React.Fragment key={level.value}>
                      {/* Top Dot */}
                      <div 
                        className="absolute top-0 flex flex-col items-center -translate-x-1/2 transition-opacity duration-300" 
                        style={{ left: `${level.pos}%` }}
                      >
                        <div className={`w-3 h-3 rounded-full transition-opacity duration-300 ${isNear ? 'bg-emerald-400 scale-125 shadow-[0_0_15px_rgba(52,211,153,0.8)]' : 'bg-white/10'}`} />
                      </div>
                      
                      {/* Name Label */}
                      <div 
                        className="absolute top-12 -translate-x-1/2 flex flex-col items-center transition-opacity duration-300"
                        style={{ left: `${level.pos}%` }}
                      >
                        <span className={`text-[11px] uppercase tracking-[0.3em] font-black transition-colors duration-300 whitespace-nowrap ${
                          isNear ? level.color : 'text-neutral-700'
                        }`}>
                          {level.name}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={mapSpeedToSlider(speed)}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  const rawDelay = mapSliderToSpeed(val);
                  let finalDelay = rawDelay;
                  const snapThreshold = 5;
                  for (const s of speedLevels) {
                    const presetSliderPos = mapSpeedToSlider(s.value);
                    if (Math.abs(val - presetSliderPos) < snapThreshold) {
                      finalDelay = s.value;
                      break;
                    }
                  }
                  setSpeed(Math.round(finalDelay));
                }}
                className="relative z-10 w-full cursor-pointer h-2 bg-transparent appearance-none transition-opacity mb-20 outline-none"
              />
            </div>
          </div>
 
          <div className="pt-2 flex flex-col gap-4">
            <button 
              onClick={() => {
                resetGame('idle');
                setShowSettings(false);
              }}
              className="w-full py-6 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 rounded-[2rem] text-xl font-black uppercase tracking-wider shadow-2xl shadow-emerald-900/40 transition-opacity hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
            >
              {status === 'setup' ? 'Start Training' : 'Apply & Return'} <Play fill="currentColor" size={24} />
            </button>
 
            {showSettings && (
              <button 
                onClick={() => {
                  resetGame('setup');
                  setShowSettings(false);
                }}
                className="w-full py-4 text-neutral-500 hover:text-red-400 transition-colors uppercase tracking-[0.2em] font-bold text-xs flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} /> Exit & Reset Game
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col overflow-hidden transform-gpu">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-black/40 backdrop-blur-sm border-b border-white/10 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
            <Clover size={24} className="text-emerald-500 fill-emerald-500/20" />
          </div>
          <div>
            <h1 className="text-sm font-medium tracking-tight">CountMaster Blackjack Trainer</h1>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-400/80">
              <Trophy size={10} /> Accuracy: {stats.accuracy}% ({stats.correctGuesses}/{stats.totalRounds})
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 px-4 py-1.5 rounded-xl bg-white/5 border border-white/5 mr-2">
            <div className="flex flex-col items-center">
              <span className="text-[7px] text-neutral-500 uppercase font-black tracking-widest leading-none mb-1">Round</span>
              <span className="text-[11px] font-mono font-bold text-emerald-400 leading-none">{stats.totalRounds + 1}</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-[7px] text-neutral-500 uppercase font-black tracking-widest leading-none mb-1">Pace</span>
              <span className="text-[11px] font-mono font-bold text-white leading-none">{speed}ms</span>
            </div>
          </div>
          
          <div className="hidden sm:flex flex-col items-end mr-4">
            <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Players</span>
            <span className="text-sm font-bold">{playerCount}</span>
          </div>

          <button 
            onClick={() => setIsPaused(!isPaused)}
            className={`p-2 rounded-full transition-opacity duration-300 ${isPaused ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'hover:bg-white/10 text-white'}`}
          >
            {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} />}
          </button>
          
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

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
          <div className="relative z-10 flex flex-col items-center mt-6 sm:mt-8 scale-[0.75] sm:scale-95 md:scale-100">
            <div className="flex gap-1 sm:gap-2 md:gap-4 min-h-[90px] sm:min-h-[140px] md:min-h-[160px] justify-center px-4 overflow-visible">
              {dealerHand.cards.map((card, i) => (
                <PlayingCard key={`${card.id}-${i}`} card={card} index={i} />
              ))}
            </div>
          </div>

          {/* Players Container */}
          <div className="relative z-10 w-full flex flex-wrap justify-center items-end gap-x-4 sm:gap-x-12 md:gap-x-24 gap-y-4 sm:gap-y-16 max-w-7xl px-2 sm:px-6 lg:px-8 pb-20 sm:pb-12 pt-4 sm:pt-12">
            {playerHands.map((hand, idx) => {
              // Dynamic scale logic: more players = smaller scale on mobile
              const scaleClass = playerCount > 3 ? "scale-[0.55] sm:scale-90" : "scale-[0.7] sm:scale-100";
              
              // Compress card spacing if hand has many cards to prevent overflow with neighbors
              const currentCardCount = hand.cards.length;
              const spacingMultiplier = currentCardCount > 5 ? 0.5 : (currentCardCount > 4 ? 0.7 : (currentCardCount > 3 ? 0.85 : 1));
              const mobileSpacing = 16 * spacingMultiplier;
              const desktopSpacing = CARD_SPACING * spacingMultiplier;
              
              return (
                <div key={idx} className={`flex flex-col items-center gap-2 sm:gap-4 shrink-0 transition-opacity duration-300 origin-bottom ${scaleClass}`}>
                  <div 
                    className="relative min-w-[60px] sm:min-w-[80px] md:min-w-[100px] h-[100px] sm:h-[140px] md:h-[160px] flex justify-center"
                    style={{ width: `${Math.max(60, 50 + (hand.cards.length - 1) * (isMobile ? mobileSpacing : desktopSpacing))}px` }}
                  >
                    {hand.cards.map((card, i) => (
                      <div 
                        key={`${card.id}-${idx}-${i}`} 
                        className="absolute top-0 transition-opacity duration-300" 
                        style={{ 
                          left: `${i * (isMobile ? mobileSpacing : desktopSpacing)}px`, 
                          zIndex: i,
                          transform: `rotate(${(i - (hand.cards.length - 1) / 2) * 2}deg)`
                        }}
                      >
                        <PlayingCard card={card} index={i} />
                      </div>
                    ))}
                  </div>
                  <div className="h-4" /> {/* Spacer instead of score */}
                </div>
              );
            })}
          </div>

          {/* Discard Tray - Visible in both modes to show deck penetration and progress */}
          {!isPaused && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-20 sm:top-28 left-4 sm:left-12 z-10 flex flex-col items-center gap-2 scale-75 sm:scale-110 origin-top-left group cursor-help transition-opacity"
            >
              {/* Discard Tray Container - Transparent Plastic/Acrylic look */}
              <div className="relative w-20 h-24 bg-white/10 border border-white/30 rounded-t-sm shadow-2xl overflow-hidden perspective-1000">
                {/* Back side of the tray */}
                <div className="absolute inset-0 bg-neutral-900/60" />
                
                {/* Bottom Base */}
                <div className="absolute bottom-0 inset-x-0 h-2 bg-neutral-900 border-t border-white/10" />

                {/* The Stack of Used Cards */}
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
                  {/* Card patterns side view */}
                  <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(0deg,#fff,#fff_1px,#ccc_1px,#ccc_2px)]" />
                  
                </motion.div>

                {/* Front "Glass" reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
              </div>
              
              <div className="flex flex-col items-center opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Discard</span>
                <span className="text-[9px] font-bold text-white/50 tabular-nums">{cardsInDiscard} cards</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Game Stats removed from floating position to avoid overlap */}



        {/* Overlays */}
        <AnimatePresence>
          {isPaused && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
               <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-8 max-w-md px-6"
               >
                 <div className="text-center space-y-4">
                   <h2 className="text-4xl sm:text-7xl font-black italic uppercase tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Pause</h2>
                   <p className="text-neutral-400 font-medium text-xs sm:text-sm tracking-wide leading-relaxed">Training session paused. Table data hidden to maintain count integrity.</p>
                 </div>

                 <button 
                  onClick={() => setIsPaused(false)}
                  className="group relative px-12 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase italic tracking-wider transition-opacity duration-300 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(16,185,129,0.3)]"
                 >
                   <div className="flex items-center gap-4">
                     <span>Resume</span>
                     <Play size={18} fill="currentColor" />
                   </div>
                   <div className="absolute inset-0 rounded-2xl border-2 border-white/40 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-opacity duration-300" />
                 </button>
               </motion.div>
            </motion.div>
          )}

          {status === 'idle' && !isPaused && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
            >
              <button 
                onClick={startRound}
                className="group relative px-12 py-5 bg-emerald-600 hover:bg-emerald-500 rounded-2xl shadow-2xl transition-opacity hover:scale-105 active:scale-95 flex flex-col items-center gap-2"
              >
                <Play fill="currentColor" size={48} className="text-white" />
                <span className="font-bold text-xl uppercase tracking-widest">Start Hand</span>
              </button>
            </motion.div>
          )}

          {status === 'shoe_depleted' && !isPaused && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            >
              <div className="max-w-md w-full bg-neutral-900 border border-white/10 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-8 text-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20">
                  <Clover size={40} className="text-emerald-500 fill-emerald-500/20" />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">End of Shoe</h2>
                  <p className="text-neutral-400 text-sm font-medium leading-relaxed italic">
                    You've reached the deck penetration cut card. Not enough cards to guarantee a full hand without affecting true count integrity.
                  </p>
                  <div className="grid grid-cols-2 gap-3 w-full bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Running Count</p>
                      <p className="text-2xl font-mono font-bold text-white leading-none">{runningCount >= 0 ? `+${runningCount}` : runningCount}</p>
                    </div>
                    <div className="text-center border-l border-white/10">
                      <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">True Count</p>
                      <p className="text-2xl font-mono font-bold text-emerald-400 leading-none">
                        {(runningCount / Math.max(0.25, deck.length / 52)).toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 w-full">
                  <button 
                    onClick={() => resetGame('idle')}
                    className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black text-xs uppercase tracking-widest transition-opacity shadow-xl shadow-emerald-900/20 active:scale-95"
                  >
                    New Shoe (Same Settings)
                  </button>
                  
                  <button 
                    onClick={() => setShowSettings(true)}
                    className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-opacity active:scale-95 text-neutral-400"
                  >
                    Change Settings
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {status === 'checking_count' && !isPaused && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
            >
              <div className="max-w-sm w-full bg-neutral-900 border border-white/10 p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col gap-4 sm:gap-6">
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 uppercase tracking-tight">RUNNING COUNT</h2>
                  <p className="text-neutral-400 text-[10px] sm:text-sm">Keep counting hand by hand.</p>
                </div>

                {!feedback.show ? (
                  <>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button 
                        onClick={() => setUserCountInput(prev => (parseInt(prev || "0") - 1).toString())}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-white transition-opacity active:scale-95 shrink-0"
                      >
                        <Minus size={20} className="sm:w-6 sm:h-6" strokeWidth={3} />
                      </button>
                      
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={userCountInput}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '' || val === '-' || /^-?\d*$/.test(val)) {
                              setUserCountInput(val);
                            }
                          }}
                          onKeyDown={(e) => e.key === 'Enter' && verifyCount(e)}
                          autoFocus
                          className="w-full bg-white/5 border border-white/20 rounded-xl sm:rounded-2xl py-3 sm:py-5 text-center text-3xl sm:text-5xl font-mono focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
                          placeholder=""
                        />
                      </div>

                      <button 
                        onClick={() => setUserCountInput(prev => (parseInt(prev || "0") + 1).toString())}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-white transition-opacity active:scale-95 shrink-0"
                      >
                        <Plus size={20} className="sm:w-6 sm:h-6" strokeWidth={3} />
                      </button>
                    </div>

                    <button 
                      onClick={(e) => verifyCount(e)}
                      className="w-full py-4 sm:py-5 bg-emerald-600 hover:bg-emerald-500 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-opacity shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
                    >
                      Verify Count
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4 sm:gap-6 animate-in fade-in zoom-in duration-300">
                    {/* No feedback shown for correct guesses, only failure logic remains */}
                    <>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.2)]">
                        <XCircle size={36} className="text-red-500 sm:w-12 sm:h-12" />
                      </div>
                      <div className="text-center">
                        <p className="text-2xl sm:text-3xl font-black text-red-500 uppercase tracking-tighter italic">FAILED</p>
                        <p className="text-neutral-400 text-xs sm:text-sm mt-2 font-medium">
                          The running count is <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">{runningCount}</span>
                        </p>
                      </div>
                      <button 
                        onClick={continueAfterError}
                        className="w-full py-4 sm:py-5 bg-gradient-to-r from-neutral-800 to-neutral-700 hover:from-neutral-700 hover:to-neutral-600 border border-white/5 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] flex items-center justify-center transition-opacity hover:scale-[1.02] active:scale-95 shadow-xl"
                      >
                        Continue Training
                      </button>
                    </>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Settings Sidebar Removed - Using Full Screen Overlay Instead */}
        </AnimatePresence>
        {/* Training Disclaimer Footer - Moved slightly or smaller */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 w-full text-center pointer-events-none px-4">
          <p className="text-[6px] sm:text-[8px] uppercase tracking-[0.3em] font-medium text-white/10 select-none">
            Training Software • No Real Money
          </p>
        </div>
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
