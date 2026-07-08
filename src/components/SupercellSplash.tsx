import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupercellSplashProps {
  onComplete: () => void;
}

export default function SupercellSplash({ onComplete }: SupercellSplashProps) {
  const [startReveal, setStartReveal] = useState(false);

  useEffect(() => {
    // 1. Synthesize the premium casino slot machine reel & coin drop audio
    const playCasinoMachineAudio = () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const now = ctx.currentTime;

        // Classic Rhythmic Slot Machine Reel/Coin Cascade (ascending arpeggio)
        const notes = [
          523.25,  // C5
          659.25,  // E5
          783.99,  // G5
          1046.50, // C6
          1318.51, // E6
          1567.98, // G6
          2093.00, // C7
          2637.02, // E7
        ];

        notes.forEach((freq, idx) => {
          const delay = idx * 0.07; // Fast rhythmic succession
          
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gainNode = ctx.createGain();

          osc1.type = 'triangle';
          osc1.frequency.setValueAtTime(freq, now + delay);
          
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(freq * 2, now + delay); // First harmonic

          gainNode.gain.setValueAtTime(0, now + delay);
          gainNode.gain.linearRampToValueAtTime(0.08, now + delay + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.15);

          osc1.connect(gainNode);
          osc2.connect(gainNode);
          gainNode.connect(ctx.destination);

          osc1.start(now + delay);
          osc1.stop(now + delay + 0.2);
          osc2.start(now + delay);
          osc2.stop(now + delay + 0.2);
        });

        // Continuous sparkling "jackpot" vibrato alarm in the background
        const alarmDuration = 0.8;
        const alarmOsc = ctx.createOscillator();
        const alarmLfo = ctx.createOscillator();
        const alarmLfoGain = ctx.createGain();
        const alarmGain = ctx.createGain();

        alarmOsc.type = 'square';
        alarmOsc.frequency.setValueAtTime(880, now + 0.15); // A5

        alarmLfo.frequency.setValueAtTime(15, now);
        alarmLfoGain.gain.setValueAtTime(120, now);

        alarmGain.gain.setValueAtTime(0, now + 0.15);
        alarmGain.gain.linearRampToValueAtTime(0.02, now + 0.2);
        alarmGain.gain.exponentialRampToValueAtTime(0.001, now + alarmDuration);

        alarmLfo.connect(alarmLfoGain);
        alarmLfoGain.connect(alarmOsc.frequency);
        
        alarmOsc.connect(alarmGain);
        alarmGain.connect(ctx.destination);

        alarmLfo.start(now);
        alarmOsc.start(now + 0.15);
        
        alarmLfo.stop(now + alarmDuration);
        alarmOsc.stop(now + alarmDuration);

        // Metallic Coin Drop Clatter
        const coinTimes = [0.12, 0.25, 0.38, 0.50, 0.62];
        const bufferSize = ctx.sampleRate * 0.08;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        coinTimes.forEach((time) => {
          const noiseSource = ctx.createBufferSource();
          noiseSource.buffer = noiseBuffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(2500, now + time);
          filter.Q.setValueAtTime(12.0, now + time);

          const coinGain = ctx.createGain();
          coinGain.gain.setValueAtTime(0, now + time);
          coinGain.gain.linearRampToValueAtTime(0.04, now + time + 0.005);
          coinGain.gain.exponentialRampToValueAtTime(0.001, now + time + 0.05);

          noiseSource.connect(filter);
          filter.connect(coinGain);
          coinGain.connect(ctx.destination);

          noiseSource.start(now + time);
          noiseSource.stop(now + time + 0.08);
        });

        // Low warm "casino environment" bass swell
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(110, now);
        subOsc.frequency.exponentialRampToValueAtTime(55, now + 0.8);

        subGain.gain.setValueAtTime(0, now);
        subGain.gain.linearRampToValueAtTime(0.12, now + 0.1);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(now);
        subOsc.stop(now + 0.9);

      } catch (e) {
        console.warn('AudioContext failed:', e);
      }
    };

    playCasinoMachineAudio();

    // Trigger the organic liquid sweep reveal slightly after mount
    const timer = setTimeout(() => {
      setStartReveal(true);
    }, 400); // Give a bit of time to enjoy the beautiful shuffle

    // Call onComplete when transition finishes completely
    const endTimer = setTimeout(() => {
      onComplete();
    }, 1600);

    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  // Ultra-fluid custom ease curve for organic liquid acceleration & sliding deceleration
  const premiumFluidEase = [0.25, 1, 0.35, 1];

  // Define playing cards that will shuffle elegantly across the center of the screen
  const cardsToShuffle = [
    { id: 1, suit: "♠", value: "A", color: "text-neutral-900", rotate: -15, delay: 0.02 },
    { id: 2, suit: "♥", value: "K", color: "text-red-600", rotate: -5, delay: 0.08 },
    { id: 3, suit: "♣", value: "Q", color: "text-neutral-900", rotate: 5, delay: 0.14 },
    { id: 4, suit: "♦", value: "J", color: "text-red-600", rotate: 15, delay: 0.20 },
  ];

  return (
    <div
      id="modern-liquid-silk-transition"
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none select-none touch-none bg-transparent"
    >
      {/* 
        LAYER 1: DUAL-LAYERED GOOEY LIQUID PORTAL MASK (Vaporous Sky-Blue Liquid)
        This implements a true SVG metaball/gooey filter.
        The sky-blue liquid covers the screen with a circular aperture in the center.
        Upon activation, the aperture expands like thick, viscous fluid, breaking off
        organic droplets that stretch and snap away.
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        
        {/* --- Wave Curtain 1 (Deepest Obsidian Black / Dark Forest) --- */}
        <motion.div
          className="absolute inset-y-0 left-0 w-[125vw] h-full pointer-events-none origin-left"
          initial={{ x: "0%" }}
          animate={startReveal ? { x: "-105%" } : { x: "0%" }}
          transition={{ duration: 1.15, ease: premiumFluidEase, delay: 0.16 }}
        >
          <svg className="w-full h-full" viewBox="0 0 125 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            {/* Elegant organic wave curve on the rightmost boundary */}
            <path 
              d="M 0,0 L 100,0 C 112,18 123,38 108,55 C 96,72 118,88 102,100 L 0,100 Z" 
              fill="#010402" 
            />
          </svg>
        </motion.div>

        {/* --- Wave Curtain 2 (Elegant Dark Forest Green) --- */}
        <motion.div
          className="absolute inset-y-0 left-0 w-[125vw] h-full pointer-events-none origin-left"
          initial={{ x: "0%" }}
          animate={startReveal ? { x: "-105%" } : { x: "0%" }}
          transition={{ duration: 1.05, ease: premiumFluidEase, delay: 0.08 }}
        >
          <svg className="w-full h-full" viewBox="0 0 125 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M 0,0 L 100,0 C 114,16 125,35 110,52 C 98,70 120,85 104,100 L 0,100 Z" 
              fill="#062213" 
            />
          </svg>
        </motion.div>

        {/* --- Wave Curtain 3 (Lighter Premium Casino Green - Leads the wave) --- */}
        <motion.div
          className="absolute inset-y-0 left-0 w-[125vw] h-full pointer-events-none origin-left"
          initial={{ x: "0%" }}
          animate={startReveal ? { x: "-105%" } : { x: "0%" }}
          transition={{ duration: 0.95, ease: premiumFluidEase, delay: 0 }}
        >
          <svg className="w-full h-full" viewBox="0 0 125 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M 0,0 L 100,0 C 116,14 127,32 112,49 C 100,68 122,82 106,100 L 0,100 Z" 
              fill="#0c4226" 
            />
          </svg>
        </motion.div>
      </div>

      {/* 
        LAYER 2: SHUFFLING CARDS (Cartas barajandose)
        Elegant fan of playing cards that hover and shuffle dynamically in the center of the screen,
        then fly out to the left in sequence as the liquid waves slide back.
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
        <AnimatePresence>
          {!startReveal && (
            <div className="relative w-80 h-96 flex items-center justify-center">
              {cardsToShuffle.map((card, idx) => (
                <motion.div
                  key={card.id}
                  className="absolute w-32 h-44 bg-white rounded-xl border border-neutral-200 shadow-2xl flex flex-col justify-between p-3 select-none"
                  style={{ originX: 0.5, originY: 0.9 }}
                  initial={{ 
                    scale: 0.4, 
                    x: 0, 
                    y: -350,
                    rotate: 0, 
                    opacity: 0 
                  }}
                  animate={{ 
                    scale: 1, 
                    x: card.rotate * 3, // dynamic spread
                    y: Math.abs(card.rotate) * 0.4,
                    rotate: card.rotate,
                    opacity: 1,
                    // Soft organic breathing floating motion
                    translateY: [0, -10, 0]
                  }}
                  exit={{ 
                    x: 800, // Speed slide out to the right, opposite of the waves clearing to the left
                    y: -40,
                    rotate: 45,
                    scale: 0.75,
                    opacity: 0,
                    transition: { duration: 0.45, ease: "easeIn", delay: idx * 0.03 }
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 220, damping: 15, delay: card.delay },
                    x: { type: "spring", stiffness: 180, damping: 16, delay: card.delay },
                    rotate: { type: "spring", stiffness: 180, damping: 16, delay: card.delay },
                    opacity: { duration: 0.2, delay: card.delay },
                    translateY: { repeat: Infinity, duration: 3.2 + idx * 0.4, ease: "easeInOut" }
                  }}
                >
                  {/* Top-Left Rank/Suit */}
                  <div className={`flex flex-col items-center leading-none ${card.color}`}>
                    <span className="text-xl font-bold font-serif">{card.value}</span>
                    <span className="text-sm">{card.suit}</span>
                  </div>

                  {/* Centered Large Suit Badge */}
                  <div className={`text-4xl self-center ${card.color} drop-shadow-sm`}>
                    {card.suit}
                  </div>

                  {/* Bottom-Right Rank/Suit (Inverted) */}
                  <div className={`flex flex-col items-center leading-none rotate-180 self-end ${card.color}`}>
                    <span className="text-xl font-bold font-serif">{card.value}</span>
                    <span className="text-sm">{card.suit}</span>
                  </div>
                </motion.div>
              ))}

              {/* Shuffling glow aura */}
              <motion.div 
                className="absolute w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 
        LAYER 3: LIGHT REFLECTION & GLOW SWEEP
        High-velocity diagonal light scan that flashes parallel to the wave retraction
      */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent skew-x-12 z-30 pointer-events-none"
        initial={{ x: "-110%" }}
        animate={startReveal ? { x: "190%" } : { x: "-110%" }}
        transition={{ duration: 0.9, ease: "easeInOut", delay: 0.05 }}
      />

      {/* Luxury ambient table white shimmer */}
      <motion.div
        className="absolute inset-0 bg-white mix-blend-screen z-40 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={startReveal ? { opacity: [0, 0.45, 0] } : { opacity: 0 }}
        transition={{ delay: 0.08, duration: 0.45, ease: "easeOut" }}
      />
    </div>
  );
}
