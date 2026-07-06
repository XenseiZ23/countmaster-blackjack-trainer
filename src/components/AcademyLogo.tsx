import React from 'react';

interface AcademyLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const AcademyLogo: React.FC<AcademyLogoProps> = ({ size = 'md' }) => {
  const textSizes = {
    sm: 'text-xl sm:text-2xl tracking-tighter',
    md: 'text-3xl sm:text-4xl tracking-tighter',
    lg: 'text-5xl sm:text-6xl tracking-tighter',
  };

  const currentClass = textSizes[size] || textSizes.md;

  return (
    <div className="relative select-none flex items-center justify-center shrink-0 group transition-transform duration-300">
      {/* Sleek, soft backlight glow behind the text */}
      <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/[0.04] blur-lg rounded-full transition-all duration-300 pointer-events-none" />
      
      {/* Typographic symbol like STAKE */}
      <div className={`font-sport font-[800] italic uppercase leading-none flex items-center ${currentClass}`}>
        <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:text-neutral-100">
          B
        </span>
        <span className="text-emerald-600 drop-shadow-[0_2px_4px_rgba(16,185,129,0.2)] transition-all duration-300 group-hover:text-emerald-500 ml-[-0.05em]">
          A
        </span>
      </div>
    </div>
  );
};
