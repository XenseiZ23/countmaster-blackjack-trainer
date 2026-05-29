import React from 'react';

interface FluorescentCardsProps {
  size?: 'sm' | 'md' | 'lg';
}

export const FluorescentCards: React.FC<FluorescentCardsProps> = ({ size = 'md' }) => {
  // Significantly increased container & card sizes for high visibility and visual impact!
  const containerSizes = {
    sm: 'w-11 h-11 sm:w-12 sm:h-12',
    md: 'w-13 h-13 sm:w-15 sm:h-15',
    lg: 'w-20 h-20 sm:w-22 sm:h-22',
  };

  const cardSizes = {
    sm: 'w-7.5 h-10.5',
    md: 'w-9 h-13',
    lg: 'w-14 h-20',
  };

  return (
    <div className={`relative flex items-center justify-center ${containerSizes[size]} select-none shrink-0 group`}>
      {/* Radiant Emerald Glow Backdrop */}
      <div className="absolute inset-0 bg-emerald-500/25 blur-xl rounded-full scale-110 opacity-75 group-hover:scale-125 transition-transform duration-500" />
      
      {/* Background card with a Playful Star/Spade Sparkle (Tilted Left) */}
      <div 
        className={`absolute ${cardSizes[size]} bg-neutral-950 border border-emerald-500/30 rounded-md shadow-[0_0_8px_rgba(16,185,129,0.15)] transform -rotate-[16deg] -translate-x-[5px] -translate-y-[2px] flex items-center justify-center transition-all duration-500 group-hover:-rotate-[24deg] group-hover:-translate-x-[7px] overflow-hidden`}
      >
        <svg 
          viewBox="0 0 32 32" 
          className="w-[55%] h-[55%] text-emerald-500/30 transition-transform duration-500 group-hover:scale-105" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Subtle Dynamic Geometric Jester Star */}
          <path d="M16 2 L20 12 L30 16 L20 20 L16 30 L12 20 L2 16 L12 12 Z" fill="currentColor" fillOpacity="0.05" />
        </svg>
      </div>

      {/* Foreground Card with the Creative & Radiant Neon Joker Jester Face (Tilted Right) */}
      <div 
        className={`absolute ${cardSizes[size]} bg-neutral-900 border-[1.8px] border-emerald-400 rounded-md shadow-[0_0_15px_rgba(52,211,153,0.65)] transform rotate-[10deg] translate-x-[5px] translate-y-[2px] flex items-center justify-center z-10 transition-all duration-500 group-hover:rotate-[18deg] group-hover:translate-x-[7px] group-hover:scale-[1.03] p-1.5 overflow-hidden`}
      >
        {/* Sleek, Creative, Bold Jester/Joker Face Vector Icon */}
        <svg 
          viewBox="0 0 64 64" 
          className="w-[90%] h-[90%] text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.7)]" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* JESTER CROWN / TRICORN HAT */}
          {/* Left curved horn */}
          <path d="M12 28 C12 28 8 18 16 11 C21 15 24 22 24 28" fill="currentColor" fillOpacity="0.1" />
          
          {/* Center horn with curved peak */}
          <path d="M24 24 C26 15 30 7 32 7 C34 7 38 15 40 24" fill="currentColor" fillOpacity="0.1" />
          
          {/* Right curved horn */}
          <path d="M52 28 C52 28 56 18 48 11 C43 15 40 22 40 28" fill="currentColor" fillOpacity="0.1" />

          {/* Glowing baubles / bells on original horn tips */}
          <circle cx="16" cy="10" r="2" fill="currentColor" className="animate-pulse" />
          <circle cx="32" cy="6" r="2" fill="currentColor" className="animate-pulse" />
          <circle cx="48" cy="10" r="2" fill="currentColor" className="animate-pulse" />

          {/* Mask / Face Border */}
          <path d="M20 30 C20 42 24 48 32 48 C40 48 44 42 44 30" strokeWidth="2.5" />

          {/* Mischievous tilted eyes (joker star-cut accents above eyes) */}
          <path d="M22 32 L26 35 L23 38 L25 32" strokeWidth="2" strokeOpacity="0.7" />
          <path d="M42 32 L38 35 L41 38 L39 32" strokeWidth="2" strokeOpacity="0.7" />
          
          {/* Playful, stylized joker arched eye lines */}
          <path d="M21 34 C24 31 27 33 29 35" strokeWidth="3" />
          <path d="M43 34 C40 31 37 33 35 35" strokeWidth="3" />

          {/* Tiny stylized nose */}
          <path d="M31 38 L33 38" strokeWidth="3" />

          {/* Trademark wide, mischievous grin / smiling lips */}
          <path d="M23 41 C27 48 37 48 41 41" strokeWidth="3" fill="currentColor" fillOpacity="0.15" />
          <path d="M21 41.5 C22.5 41 23.5 42.5 23 44" strokeWidth="2" />
          <path d="M43 41.5 C41.5 41 40.5 42.5 41 44" strokeWidth="2" />

          {/* Pointed Collar with bells */}
          <path d="M18 47 L25 54 L32 48 L39 54 L46 47" strokeWidth="2" />
          <circle cx="25" cy="55.5" r="1.2" fill="currentColor" />
          <circle cx="39" cy="55.5" r="1.2" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};
