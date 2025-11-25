import React from 'react';
import { AppScreen } from '../types';
import { FileText, Layers, BookOpen, Briefcase, BarChart2, MessageCircle, Calendar, Video, Clock, ChevronLeft, Zap, GraduationCap } from 'lucide-react';

interface FeaturesProps {
  onNavigate: (screen: AppScreen) => void;
  onBack?: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onNavigate, onBack }) => {
  const features = [
    { id: 'notes', label: 'Notes', icon: FileText, color: 'bg-orange-500', action: () => onNavigate(AppScreen.NOTES) },
    { id: 'practice', label: 'Practice', icon: BookOpen, color: 'bg-emerald-500', action: () => onNavigate(AppScreen.STUDY_HUB) },
    { id: 'pyqs', label: 'PYQs', icon: Layers, color: 'bg-blue-500', action: () => onNavigate(AppScreen.STUDY_HUB) }, 
    { id: 'mcq', label: 'MCQs', icon: Zap, color: 'bg-purple-500', action: () => onNavigate(AppScreen.STUDY_HUB) }, 
    { id: 'sqp', label: 'SQP', icon: FileText, color: 'bg-pink-500', action: () => onNavigate(AppScreen.STUDY_HUB) }, 
    { id: 'flashcards', label: 'Flashcards', icon: Layers, color: 'bg-yellow-500', action: () => onNavigate(AppScreen.FLASHCARDS) },
    { id: 'career', label: 'Career Guide', icon: Briefcase, color: 'bg-teal-500', action: () => alert('Career Guide coming soon!') },
    { id: 'progress', label: 'Progress', icon: BarChart2, color: 'bg-indigo-500', action: () => onNavigate(AppScreen.PROGRESS) },
    { id: 'askai', label: 'Ask AI', icon: MessageCircle, color: 'bg-primary-600', action: () => onNavigate(AppScreen.AI_ASSISTANT) },
    { id: 'planner', label: 'Study Planner', icon: Calendar, color: 'bg-cyan-500', action: () => onNavigate(AppScreen.STUDY_PLANNER) },
    { id: 'video', label: 'Videos', icon: Video, color: 'bg-red-500', action: () => alert('Animated Videos coming soon!') },
    { id: 'timetable', label: 'Time Table', icon: Clock, color: 'bg-lime-500', action: () => onNavigate(AppScreen.STUDY_PLANNER) },
  ];

  return (
    <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50">
      <div className="flex items-center gap-3 mb-8">
        {onBack && (
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <ChevronLeft size={24} />
            </button>
        )}
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">All Features</h2>
      </div>

      <div className="grid grid-cols-3 gap-x-4 gap-y-8">
        {features.map((feature) => (
            <button 
            key={feature.id}
            onClick={feature.action}
            className="flex flex-col items-center gap-3 group"
            >
            <div className={`w-16 h-16 ${feature.color} rounded-2xl shadow-lg shadow-slate-200 text-white flex items-center justify-center transition-transform active:scale-90 group-hover:-translate-y-1`}>
                <feature.icon size={28} />
            </div>
            <span className="text-[11px] font-bold text-slate-600 text-center leading-tight max-w-[80px]">{feature.label}</span>
            </button>
        ))}
      </div>

      <div className="mt-auto pt-8 flex flex-col items-center">
        <div className="w-16 h-1 bg-slate-200 rounded-full mb-4"></div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
            <GraduationCap size={14} /> 
            Isus Education
        </p>
      </div>
    </div>
  );
};

export default Features;