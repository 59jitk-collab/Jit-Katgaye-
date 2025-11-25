import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, TrendingUp, Book, Clock, Target, Calendar } from 'lucide-react';

interface ProgressProps {
  onBack: () => void;
}

const Progress: React.FC<ProgressProps> = ({ onBack }) => {
  // Realistic mock data
  const weeklyActivity = [40, 70, 35, 90, 60, 20, 85]; // Percentages
  const subjects = [
    { name: 'Physics', progress: 75, color: 'bg-blue-500' },
    { name: 'Chemistry', progress: 45, color: 'bg-emerald-500' },
    { name: 'Maths', progress: 90, color: 'bg-purple-500' },
    { name: 'Biology', progress: 60, color: 'bg-rose-500' },
  ];

  return (
    <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50 overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Your Progress</h2>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6">
        <div className="flex justify-between items-end mb-6">
            <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Weekly Activity</p>
                <h3 className="text-3xl font-bold text-slate-900">12.5 hrs</h3>
            </div>
            <div className="text-emerald-500 font-bold text-sm flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={16} /> +15%
            </div>
        </div>
        
        {/* Bar Chart */}
        <div className="h-32 flex items-end justify-between gap-2">
            {weeklyActivity.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`w-full rounded-t-lg opacity-80 ${height > 80 ? 'bg-primary-600' : 'bg-primary-200'}`}
                    />
                    <span className="text-[10px] text-slate-400 font-bold">{['M','T','W','T','F','S','S'][i]}</span>
                </div>
            ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
             <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-3">
                 <Target size={20} />
             </div>
             <p className="text-2xl font-bold text-slate-800">82%</p>
             <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Accuracy</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
             <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-3">
                 <Book size={20} />
             </div>
             <p className="text-2xl font-bold text-slate-800">142</p>
             <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Q's Solved</p>
          </div>
      </div>

      {/* Subject Mastery */}
      <h3 className="text-lg font-bold text-slate-900 mb-4">Subject Mastery</h3>
      <div className="space-y-4">
          {subjects.map((sub) => (
              <div key={sub.name} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-700 text-sm">{sub.name}</span>
                      <span className="font-bold text-slate-900 text-sm">{sub.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${sub.progress}%` }}
                        className={`h-full rounded-full ${sub.color}`}
                      />
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export default Progress;