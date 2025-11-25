import React, { useEffect, useState } from 'react';
import { UserPreferences, AppScreen } from '../types';
import { FileText, BookOpen, Quote, Star, Send, Camera, Flame, ChevronRight, Zap, Target, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardProps {
  user: UserPreferences;
  onNavigate: (screen: AppScreen) => void;
  onOpenSidebar: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, onOpenSidebar }) => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning');
    else if (hours < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const fakeReviews = [
    { name: "Sarah K.", text: "This app literally saved my chemistry grades!", rating: 5 },
    { name: "Rahul M.", text: "The AI explanation is better than my professor.", rating: 5 },
    { name: "Anita D.", text: "Flashcards are so addictive. Love it.", rating: 5 },
    { name: "John Doe", text: "Finally a distraction free study app.", rating: 4 },
  ];

  return (
    <div className="bg-slate-50 min-h-full pb-32">
      {/* 1. Header with Streak & Menu */}
      <header className="px-6 pt-8 pb-2 flex justify-between items-center bg-white sticky top-0 z-20 border-b border-slate-50 shadow-sm/50">
        <div className="flex items-center gap-4">
           <button onClick={onOpenSidebar} className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-600">
              <Menu size={24} />
           </button>
           <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">{greeting}</p>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{user.name.split(' ')[0]}</h1>
           </div>
        </div>
        <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
           <Flame size={16} className="fill-orange-500 text-orange-500 animate-pulse" />
           <span className="text-xs font-bold text-orange-700">3 Day Streak</span>
        </div>
      </header>

      {/* 2. Hero Action: Doubt Solver */}
      <div className="px-6 mt-6">
        <button 
           onClick={() => onNavigate(AppScreen.DOUBT_SOLVER)}
           className="w-full bg-slate-900 rounded-3xl p-1 relative overflow-hidden group shadow-xl shadow-slate-200 active:scale-[0.98] transition-all"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-primary-600 opacity-20 group-hover:opacity-30 transition-opacity"></div>
           <div className="bg-slate-900 rounded-[1.3rem] p-5 flex items-center justify-between relative z-10 border border-slate-800">
              <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                      <Zap size={18} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-400 font-bold text-xs uppercase tracking-widest">New Feature</span>
                  </div>
                  <h3 className="text-white font-bold text-xl">Snap & Solve</h3>
                  <p className="text-slate-400 text-xs mt-1">Stuck? Scan any question for an instant answer.</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                  <Camera size={24} />
              </div>
           </div>
        </button>
      </div>

      {/* 3. Daily Wisdom Banner */}
      <div className="px-6 mt-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-200 relative overflow-hidden">
             <Quote className="absolute top-4 right-4 text-white/20" size={48} />
             <p className="text-blue-50 text-[10px] font-bold uppercase tracking-widest mb-3">Daily Wisdom</p>
             <p className="text-lg font-medium italic leading-relaxed relative z-10 max-w-[90%]">
                "Success is the sum of small efforts, repeated day in and day out."
             </p>
             <p className="text-blue-200 text-xs font-bold mt-2">— Robert Collier</p>
          </div>
      </div>

      {/* 4. Core Actions Cards */}
      <div className="px-6 grid grid-cols-2 gap-4 mt-6">
        <button 
          onClick={() => onNavigate(AppScreen.NOTES)}
          className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4 active:scale-95 transition-transform group hover:border-orange-200 relative overflow-hidden"
        >
           <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors"></div>
           <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center shadow-md relative z-10">
             <FileText size={20} />
           </div>
           <div className="text-left relative z-10">
             <h3 className="font-bold text-slate-800 text-base">My Notes</h3>
             <p className="text-[10px] text-slate-400 font-medium mt-0.5">Revise & Summarize</p>
           </div>
        </button>
        
        <button 
          onClick={() => onNavigate(AppScreen.STUDY_HUB)}
          className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4 active:scale-95 transition-transform group hover:border-emerald-200 relative overflow-hidden"
        >
           <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition-colors"></div>
           <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-md relative z-10">
             <BookOpen size={20} />
           </div>
           <div className="text-left relative z-10">
             <h3 className="font-bold text-slate-800 text-base">Practice Hub</h3>
             <p className="text-[10px] text-slate-400 font-medium mt-0.5">PYQs & MCQs</p>
           </div>
        </button>
      </div>

      {/* 5. Daily Goal Progress */}
      <div className="px-6 mt-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                          <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                          <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="126" strokeDashoffset="40" className="text-primary-600" />
                      </svg>
                      <Target size={16} className="absolute text-primary-600" />
                  </div>
                  <div>
                      <h4 className="font-bold text-slate-900 text-sm">Daily Goal</h4>
                      <p className="text-xs text-slate-500">65% Completed</p>
                  </div>
              </div>
              <button onClick={() => onNavigate(AppScreen.STUDY_PLANNER)} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors">
                  <ChevronRight size={20} className="text-slate-400" />
              </button>
          </div>
      </div>

      {/* 6. Social Proof */}
      <div className="mt-8">
        <h3 className="px-6 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Community Love</h3>
        <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
           {fakeReviews.map((review, i) => (
             <div key={i} className="shrink-0 w-60 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex gap-1 mb-2">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} size={12} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-600 text-xs italic mb-2 line-clamp-2">"{review.text}"</p>
                <p className="text-slate-900 text-[10px] font-bold">{review.name}</p>
             </div>
           ))}
        </div>
      </div>

      {/* 7. Telegram */}
      <div className="px-6 mt-8 mb-6">
        <button 
          onClick={() => window.open('https://telegram.org', '_blank')}
          className="w-full bg-[#24A1DE] hover:bg-[#2090C8] text-white py-4 rounded-2xl shadow-lg shadow-blue-200/50 flex items-center justify-center gap-3 font-bold transition-all active:scale-95"
        >
           <Send size={20} />
           <span>Join Telegram Group</span>
        </button>
      </div>

    </div>
  );
};

export default Dashboard;