import React from 'react';
import { UserPreferences } from '../types';
import { LogOut, User, Target, Award, Settings, Bell, Shield, ChevronRight, ChevronLeft, BookOpen, PenTool, School } from 'lucide-react';

interface ProfileProps {
  user: UserPreferences;
  onLogout: () => void;
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onBack }) => {
  const subjects = [
      { name: 'Mathematics', score: 85, color: 'bg-blue-500' },
      { name: 'Science', score: 92, color: 'bg-emerald-500' },
      { name: 'Social Science', score: 78, color: 'bg-orange-500' },
      { name: 'English', score: 88, color: 'bg-purple-500' }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto no-scrollbar pb-24">
      {/* Professional Header - ID Card Style */}
      <div className="bg-slate-900 text-white p-6 pt-10 rounded-b-[2.5rem] relative shadow-xl shadow-slate-200">
         <div className="flex items-center justify-between mb-8">
            <button onClick={onBack} className="p-2 -ml-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <ChevronLeft size={24} />
            </button>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">Student Profile</span>
            <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Settings size={20} />
            </button>
         </div>

         <div className="flex items-center gap-6 pb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-800 rounded-2xl overflow-hidden relative">
                    {user.avatar ? (
                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <User size={32} />
                        </div>
                    )}
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{user.name || 'Guest Student'}</h1>
                <div className="flex items-center gap-2 mt-1 opacity-80">
                    <School size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">Class 10 • CBSE</span>
                </div>
                <div className="mt-3 flex gap-2">
                    <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold border border-white/10">Roll: 240510</span>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold border border-emerald-500/20">Active</span>
                </div>
            </div>
         </div>
      </div>

      <div className="px-6 -mt-8">
          {/* Main Stats Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center mb-6">
              <div className="text-center flex-1 border-r border-slate-100">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Rank</p>
                  <p className="text-2xl font-bold text-slate-800">#42</p>
              </div>
              <div className="text-center flex-1 border-r border-slate-100">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">XP</p>
                  <p className="text-2xl font-bold text-slate-800">2.4k</p>
              </div>
              <div className="text-center flex-1">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Accuracy</p>
                  <p className="text-2xl font-bold text-slate-800">88%</p>
              </div>
          </div>

          {/* Subject Performance */}
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">Subject Performance</h3>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-5 mb-8">
              {subjects.map((sub) => (
                  <div key={sub.name}>
                      <div className="flex justify-between items-end mb-2">
                          <span className="text-sm font-bold text-slate-700">{sub.name}</span>
                          <span className="text-xs font-bold text-slate-900">{sub.score}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                          <div className={`h-full ${sub.color} rounded-full`} style={{ width: `${sub.score}%` }}></div>
                      </div>
                  </div>
              ))}
          </div>

          {/* Target Goal */}
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">Board Exam Goal</h3>
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-3xl shadow-lg text-white mb-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
             <div className="flex items-start gap-4 relative z-10">
                 <div className="bg-white/10 p-3 rounded-xl">
                     <Target size={24} className="text-white" />
                 </div>
                 <div>
                     <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">Target Statement</p>
                     <p className="font-medium text-sm leading-relaxed opacity-90">"{user.goal}"</p>
                 </div>
             </div>
          </div>
          
          <button 
            onClick={onLogout}
            className="w-full bg-white border-2 border-slate-100 text-slate-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-200"
          >
            <LogOut size={18} />
            Sign Out
          </button>
          
          <div className="text-center pt-8 pb-4">
             <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Isus • Class 10 Edition</p>
          </div>
      </div>
    </div>
  );
};
export default Profile;