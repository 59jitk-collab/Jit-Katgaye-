import React, { useState } from 'react';
import { MOCK_FLASHCARDS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Check, X, RotateCw, ChevronLeft } from 'lucide-react';

interface FlashcardsProps {
    onBack?: () => void;
}

const Flashcards: React.FC<FlashcardsProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentCard = MOCK_FLASHCARDS[currentIndex];

  const handleSwipe = (dir: number) => {
    setDirection(dir);
    setTimeout(() => {
      if (currentIndex < MOCK_FLASHCARDS.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
        setDirection(0);
      } else {
        setCurrentIndex(MOCK_FLASHCARDS.length); 
      }
    }, 200);
  };

  const resetDeck = () => {
      setCurrentIndex(0);
      setIsFlipped(false);
      setDirection(0);
  }

  if (currentIndex >= MOCK_FLASHCARDS.length) {
      return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-50">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-md"
              >
                  <Check size={40} strokeWidth={3} />
              </motion.div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Session Complete!</h2>
              <p className="text-slate-500 mb-8 max-w-xs leading-relaxed">You've successfully reviewed all cards in this deck.</p>
              <button 
                onClick={resetDeck}
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-slate-200 active:scale-95 transition-transform hover:bg-slate-800"
            >
                <RefreshCw size={20} /> Review Again
              </button>
          </div>
      )
  }

  return (
    <div className="h-full flex flex-col items-center relative pt-6 px-4 bg-slate-50">
      <div className="w-full flex justify-between items-center mb-8 px-2">
         <div className="flex items-center gap-3">
             {onBack && (
                 <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                    <ChevronLeft size={24} />
                 </button>
             )}
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Flashcards</h2>
         </div>
        <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
          {currentIndex + 1} / {MOCK_FLASHCARDS.length}
        </span>
      </div>

      <div className="relative w-full max-w-xs aspect-[3/4.2] my-auto">
        <AnimatePresence>
            <motion.div
                key={currentCard.id}
                className="absolute inset-0 w-full h-full perspective-1000 cursor-pointer"
                initial={{ scale: 0.95, opacity: 0, x: 0 }}
                animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    x: direction * 200, 
                    rotate: direction * 15 
                }}
                exit={{ x: direction * 500, opacity: 0, rotate: direction * 45 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div 
                    className="w-full h-full relative preserve-3d transition-transform duration-500"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border-2 border-white flex flex-col items-center justify-center p-8 text-center group">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8 bg-slate-50 px-3 py-1 rounded-full">Term</span>
                        <h3 className="text-3xl font-bold text-slate-800 leading-tight">{currentCard.front}</h3>
                        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-slate-300">
                             <span className="text-[10px] uppercase tracking-wider font-bold group-hover:text-primary-400 transition-colors">Tap to flip</span>
                             <RotateCw size={16} />
                        </div>
                    </div>

                    {/* Back */}
                    <div 
                        className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-800 to-slate-950 rounded-[2.5rem] shadow-2xl shadow-slate-400/50 flex flex-col items-center justify-center p-8 text-center text-white border-2 border-slate-700"
                        style={{ transform: "rotateY(180deg)" }}
                    >
                         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8 bg-white/10 px-3 py-1 rounded-full">Definition</span>
                        <p className="text-xl font-medium leading-relaxed opacity-90">{currentCard.back}</p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 pb-12 pt-8">
        <button 
            onClick={() => handleSwipe(-1)}
            className="w-16 h-16 rounded-full bg-white text-rose-500 shadow-xl shadow-rose-100 border-2 border-rose-50 flex items-center justify-center hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all"
        >
            <X size={28} strokeWidth={3} />
        </button>
        <button 
            onClick={() => handleSwipe(1)}
            className="w-16 h-16 rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-200 border-4 border-emerald-100 flex items-center justify-center hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all"
        >
            <Check size={28} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default Flashcards;