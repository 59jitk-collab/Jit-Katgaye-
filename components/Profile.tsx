import React from 'react';
import { UserPreferences } from '../types';
import { LogOut, User, Target, Award, Settings, Bell, Shield, ChevronRight, ChevronLeft } from 'lucide-react';

interface ProfileProps {
  user: UserPreferences;
  onLogout: () => void;
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onBack }) => {
  return (
    <div className="pb-32 pt-6 px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-50 min-h-full">
      {/* Header with Back Button */}
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ChevronLeft size={24} />
        </button>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center -mt-4">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl shadow-slate-200 overflow-hidden mb-6 relative bg-slate-100 ring-4 ring-slate-50">
           {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-slate-300">
               <User size={56} />
             </div>
           )}
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{user.name || 'Guest User'}</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">{user.email || 'No linked account'}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center group transition-transform hover:-translate-y-1">
           <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
             <Award size={24} />
           </div>
           <span className="text-3xl font-bold text-slate-800 tracking-tight">3</span>
           <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Current Level</span>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center group transition-transform hover:-translate-y-1">
           <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
             <Target size={24} />
           </div>
           <span className="text-3xl font-bold text-slate-800 tracking-tight">85%</span>
           <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Consistency</span>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Focus & Goals</h3>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
             <div className="flex items-start gap-4">
                <div className="p-2 bg-primary-50 text-primary-600 rounded-xl mt-1 shrink-0">
                    <Target size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Current Objective</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">"{user.goal}"</p>
                </div>
             </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Preferences</h3>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 divide-y divide-slate-50 overflow-hidden">
            <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-50 rounded-xl text-slate-500 group-hover:text-primary-600 group-hover:bg-primary-50 transition-colors">
                  <Bell size={20} />
                </div>
                <span className="text-slate-700 font-bold text-sm">Notifications</span>
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-xs text-slate-400 font-medium">On</span>
                 <ChevronRight size={16} className="text-slate-300" />
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-50 rounded-xl text-slate-500 group-hover:text-primary-600 group-hover:bg-primary-50 transition-colors">
                   <Shield size={20} />
                </div>
                <span className="text-slate-700 font-bold text-sm">Privacy & Security</span>
              </div>
              <ChevronRight size={16} className="text-slate-300" />
            </button>
            <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-50 rounded-xl text-slate-500 group-hover:text-primary-600 group-hover:bg-primary-50 transition-colors">
                  <Settings size={20} />
                </div>
                <span className="text-slate-700 font-bold text-sm">General Settings</span>
              </div>
               <ChevronRight size={16} className="text-slate-300" />
            </button>
          </div>
        </div>
      </div>

      <button 
        onClick={onLogout}
        className="w-full bg-white border border-slate-200 text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-200 mb-8"
      >
        <LogOut size={18} />
        Log Out
      </button>
      
      <div className="text-center pb-8">
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Isus v1.2.0 • Powered by Gemini</p>
      </div>
    </div>
  );
};
export default Profile;