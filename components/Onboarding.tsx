import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPreferences } from '../types';
import { ChevronRight } from 'lucide-react';

interface OnboardingProps {
  initialUser: Partial<UserPreferences>;
  onComplete: (prefs: UserPreferences) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ initialUser, onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(initialUser.name || '');
  const [goal, setGoal] = useState('');

  useEffect(() => {
    if (initialUser.name && initialUser.name.length > 0) {
      setStep(2);
    }
  }, [initialUser.name]);

  const handleNext = () => {
    if (step === 2) {
      onComplete({
        name,
        email: initialUser.email,
        avatar: initialUser.avatar,
        isGuest: !!initialUser.isGuest,
        subjects: [],
        goal,
      });
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 min-h-[400px] flex flex-col relative overflow-hidden border border-slate-100"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50">
            <motion.div 
              className="h-full bg-primary-600"
              initial={{ width: '0%' }}
              animate={{ width: step === 1 ? '50%' : '100%' }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex-1 flex flex-col justify-center mt-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                key="step1"
              >
                <span className="text-primary-600 font-bold tracking-wide text-[10px] uppercase mb-3 block bg-primary-50 w-fit px-2 py-1 rounded-md">Step 1 of 2</span>
                <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Your Identity</h2>
                <p className="text-slate-500 mb-10 leading-relaxed font-medium">How should Isus address you during your study sessions?</p>
                
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Display Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-50 outline-none transition-all font-bold text-lg placeholder:text-slate-300 placeholder:font-normal text-slate-800"
                    placeholder="e.g. Alex"
                    autoFocus
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                key="step2"
              >
                <span className="text-primary-600 font-bold tracking-wide text-[10px] uppercase mb-3 block bg-primary-50 w-fit px-2 py-1 rounded-md">Step 2 of 2</span>
                <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Your Objective</h2>
                <p className="text-slate-500 mb-10 leading-relaxed font-medium">Defining a clear goal helps Isus tailor your roadmap.</p>
                
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Current Goal</label>
                  <textarea 
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-50 outline-none transition-all min-h-[140px] resize-none text-base font-medium placeholder:text-slate-300 placeholder:font-normal text-slate-800 leading-relaxed"
                    placeholder="e.g., I want to master Calculus before the final exams in May..."
                    autoFocus
                  />
                </div>
              </motion.div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={(step === 1 && !name) || (step === 2 && !goal)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all active:scale-95"
            >
              {step === 2 ? 'Complete Setup' : 'Next Step'} <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;