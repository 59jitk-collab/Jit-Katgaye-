import React from 'react';
import { AppScreen } from '../types';
import { FileText, Layers, BookOpen, BarChart2, MessageCircle, Calendar, Video, ChevronLeft, Zap, GraduationCap, Library, Camera, FlaskConical } from 'lucide-react';

interface FeaturesProps {
  onNavigate: (screen: AppScreen) => void;
  onBack?: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onNavigate, onBack }) => {
  const tools = [
    {
      category: 'NCERT Essentials',
      items: [
        { id: 'revision', label: 'Revision Notes', desc: 'Chapter-wise Summaries', icon: Library, color: 'bg-indigo-500', action: () => onNavigate(AppScreen.REVISION_NOTES) },
        { id: 'activities', label: 'NCERT Activities', desc: 'Lab Manual & Experiments', icon: FlaskConical, color: 'bg-pink-500', action: () => onNavigate(AppScreen.NCERT_ACTIVITIES) },
        { id: 'pyqs', label: 'PYQ Bank', desc: 'Past 10 Years Papers', icon: BookOpen, color: 'bg-blue-500', action: () => onNavigate(AppScreen.STUDY_HUB) }, 
      ]
    },
    {
      category: 'Smart Practice',
      items: [
        { id: 'doubts', label: 'Doubt Solver', desc: 'Snap & Solve', icon: Camera, color: 'bg-rose-500', action: () => onNavigate(AppScreen.DOUBT_SOLVER) },
        { id: 'mcq', label: 'Mock Tests', desc: 'Competency Based Qs', icon: Zap, color: 'bg-purple-500', action: () => onNavigate(AppScreen.STUDY_HUB) }, 
        { id: 'notes', label: 'My Notes', desc: 'AI Summarized', icon: FileText, color: 'bg-orange-500', action: () => onNavigate(AppScreen.NOTES) },
        { id: 'flashcards', label: 'Flashcards', desc: 'Active Recall', icon: Layers, color: 'bg-yellow-500', action: () => onNavigate(AppScreen.FLASHCARDS) },
      ]
    },
    {
      category: 'Planning',
      items: [
         { id: 'planner', label: 'Study Planner', desc: 'AI Schedule', icon: Calendar, color: 'bg-cyan-500', action: () => onNavigate(AppScreen.STUDY_PLANNER) },
         { id: 'progress', label: 'Progress Report', desc: 'Track Performance', icon: BarChart2, color: 'bg-emerald-500', action: () => onNavigate(AppScreen.PROGRESS) },
         { id: 'askai', label: 'AI Tutor', desc: 'Chat Assistant', icon: MessageCircle, color: 'bg-primary-600', action: () => onNavigate(AppScreen.AI_ASSISTANT) },
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50 overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-3 mb-6">
        {onBack && (
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <ChevronLeft size={24} />
            </button>
        )}
        <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Study Toolkit</h2>
            <p className="text-xs text-slate-500 font-medium">Class 10 Board Exam Edition</p>
        </div>
      </div>

      <div className="space-y-8">
        {tools.map((section, idx) => (
            <div key={idx}>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">{section.category}</h3>
                <div className="grid grid-cols-1 gap-3">
                    {section.items.map((tool) => (
                        <button 
                            key={tool.id}
                            onClick={tool.action}
                            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition-all hover:shadow-md hover:border-slate-200 active:scale-[0.99] group"
                        >
                            <div className={`w-12 h-12 ${tool.color} rounded-xl text-white flex items-center justify-center shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform`}>
                                <tool.icon size={22} />
                            </div>
                            <div className="text-left flex-1">
                                <h4 className="font-bold text-slate-800 text-sm group-hover:text-primary-700 transition-colors">{tool.label}</h4>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">{tool.desc}</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                <ChevronLeft size={16} className="rotate-180" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        ))}

        <div className="pt-4 flex flex-col items-center">
             <button onClick={() => alert("Coming soon!")} className="w-full bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-center gap-3 opacity-90">
                 <Video size={20} />
                 <span className="font-bold text-sm">Video Library (Coming Soon)</span>
             </button>
             <div className="mt-8 flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <GraduationCap size={14} /> Isus Education
             </div>
        </div>
      </div>
    </div>
  );
};

export default Features;