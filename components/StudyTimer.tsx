import React, { useState, useEffect } from 'react';
import { ChevronLeft, Play, Pause, RotateCcw, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const StudyTimer: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound or alert
      alert(mode === 'FOCUS' ? "Focus Session Complete! Take a break." : "Break over! Back to work.");
      if (mode === 'FOCUS') {
          setMode('BREAK');
          setTimeLeft(5 * 60);
      } else {
          setMode('FOCUS');
          setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'FOCUS' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Study Timer</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-64 h-64 rounded-full border-8 border-slate-200 flex items-center justify-center relative shadow-xl shadow-slate-200">
             {isActive && (
                 <div className="absolute inset-0 border-8 border-primary-500 rounded-full animate-spin border-t-transparent" style={{ animationDuration: '3s' }}></div>
             )}
             <div className="text-center">
                 <p className="text-5xl font-bold text-slate-800 tabular-nums tracking-tighter">{formatTime(timeLeft)}</p>
                 <p className="text-sm font-bold text-primary-500 uppercase tracking-widest mt-2">{mode}</p>
             </div>
          </div>

          <div className="flex gap-6 mt-12">
              <button onClick={toggleTimer} className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95">
                  {isActive ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" />}
              </button>
              <button onClick={resetTimer} className="w-16 h-16 bg-white text-slate-400 border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm hover:bg-slate-50 active:scale-95 transition-transform">
                  <RotateCcw size={24} />
              </button>
          </div>

          <div className="mt-10 flex gap-4">
              <button onClick={() => { setMode('FOCUS'); setTimeLeft(25 * 60); setIsActive(false); }} className={`px-4 py-2 rounded-full font-bold text-xs ${mode === 'FOCUS' ? 'bg-primary-100 text-primary-700' : 'bg-transparent text-slate-400'}`}>Pomodoro (25m)</button>
              <button onClick={() => { setMode('BREAK'); setTimeLeft(5 * 60); setIsActive(false); }} className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1 ${mode === 'BREAK' ? 'bg-primary-100 text-primary-700' : 'bg-transparent text-slate-400'}`}><Coffee size={14}/> Break (5m)</button>
          </div>
      </div>
    </div>
  );
};

export default StudyTimer;