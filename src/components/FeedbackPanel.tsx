
import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, Plus, Minus, RotateCcw } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface FeedbackPanelProps {
  show: boolean;
  correct: boolean;
  message: string;
  runningCount: number;
  userCountInput: string;
  setUserCountInput: (val: string | ((prev: string) => string)) => void;
  verifyCount: (e?: React.KeyboardEvent | React.MouseEvent) => void;
  continueAfterError: () => void;
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  show,
  correct,
  message,
  runningCount,
  userCountInput,
  setUserCountInput,
  verifyCount,
  continueAfterError
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-sm w-full bg-neutral-900 border border-white/10 p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col gap-4 sm:gap-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 uppercase tracking-tight">{t('howToCount.runningCountLabel').toUpperCase().replace(':', '')}</h2>
        <p className="text-neutral-400 text-[10px] sm:text-sm">
          {language === 'es' ? 'Sigue contando mano por mano.' : 'Keep counting hand by hand.'}
        </p>
      </div>

      {!show ? (
        <>
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => setUserCountInput(prev => {
                const current = parseInt(prev || "0");
                return (current - 1).toString();
              })}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center text-[#10b981] hover:text-emerald-400 transition-all active:scale-95 shrink-0 shadow-md"
            >
              <Minus size={20} className="sm:w-6 sm:h-6" strokeWidth={3} />
            </button>
            
            <div className="relative flex-1">
              <input 
                type="text" 
                inputMode="numeric"
                pattern="^-?\d*$"
                value={userCountInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || val === '-' || /^-?\d*$/.test(val)) {
                    setUserCountInput(val);
                  }
                }}
                onKeyDown={(e) => e.key === 'Enter' && verifyCount(e)}
                autoFocus
                className="w-full bg-white/5 border border-[#10b981] rounded-xl sm:rounded-2xl py-3 sm:py-5 text-center text-3xl sm:text-5xl font-mono focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/50 transition-colors appearance-none text-white shadow-inner"
                placeholder=""
              />
            </div>

            <button 
              onClick={() => setUserCountInput(prev => {
                const current = parseInt(prev || "0");
                return (current + 1).toString();
              })}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center text-[#10b981] hover:text-emerald-400 transition-all active:scale-95 shrink-0 shadow-md"
            >
              <Plus size={20} className="sm:w-6 sm:h-6" strokeWidth={3} />
            </button>
          </div>

          <button 
            onClick={(e) => verifyCount(e)}
            className="w-full py-4 sm:py-5 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base uppercase tracking-wider transition-all shadow-lg active:scale-[0.98]"
          >
            {t('trainer.submitButton')}
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 sm:gap-6 animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center shadow-lg">
            <XCircle size={36} className="text-red-500 sm:w-12 sm:h-12" />
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-red-500 uppercase tracking-tighter italic">
              {language === 'es' ? 'FALLIDO' : 'FAILED'}
            </p>
            <p className="text-neutral-400 text-xs sm:text-sm mt-2 font-medium">
              {language === 'es' ? 'El conteo corriente es ' : 'The running count is '} <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">{runningCount}</span>
            </p>
          </div>
          <button 
            onClick={continueAfterError}
            className="w-full py-4 sm:py-5 bg-gradient-to-br from-[#2a2a2a] to-[#141414] hover:from-[#3a3a3a] hover:to-[#222222] border border-white/15 text-white rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] flex items-center justify-center transition-all hover:scale-[1.01] active:scale-95 shadow-xl"
          >
            <RotateCcw size={14} className="mr-2" /> {t('trainer.continueButton')}
          </button>
        </div>
      )}
    </div>
  );
};
