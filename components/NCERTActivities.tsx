import React, { useState } from 'react';
import { ChevronLeft, FlaskConical, Microscope, FileText, CheckCircle, Zap } from 'lucide-react';
import { MOCK_ACTIVITIES } from '../constants';
import { Activity } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface NCERTActivitiesProps {
  onBack: () => void;
}

const NCERTActivities: React.FC<NCERTActivitiesProps> = ({ onBack }) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  if (selectedActivity) {
    return (
        <div className="h-full flex flex-col bg-white">
            <div className="flex items-center gap-3 p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
                <button onClick={() => setSelectedActivity(null)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors text-slate-500">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex-1">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{selectedActivity.subject} • {selectedActivity.chapter}</h2>
                    <h1 className="text-sm font-bold text-slate-900 leading-tight">{selectedActivity.title}</h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pb-24 no-scrollbar space-y-6">
                {/* Aim */}
                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold uppercase text-xs tracking-wide">
                        <Zap size={16} className="fill-blue-500" /> Aim
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">{selectedActivity.aim}</p>
                </div>

                {/* Materials */}
                <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                        <FlaskConical size={16} /> Materials Required
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedActivity.materials.map((mat, i) => (
                            <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
                                {mat}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Procedure */}
                <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                        <FileText size={16} /> Procedure
                    </h3>
                    <div className="space-y-4 relative">
                        <div className="absolute top-2 bottom-2 left-3 w-0.5 bg-slate-100"></div>
                        {selectedActivity.procedure.map((step, i) => (
                            <div key={i} className="relative pl-8">
                                <div className="absolute left-0 top-0 w-6 h-6 bg-white border-2 border-primary-500 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-600">
                                    {i + 1}
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Conclusion */}
                 <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2 text-emerald-700 font-bold uppercase text-xs tracking-wide">
                        <CheckCircle size={16} className="fill-emerald-500 text-white" /> Conclusion
                    </div>
                    <p className="text-emerald-900 text-sm font-medium leading-relaxed">{selectedActivity.conclusion}</p>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50 overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">NCERT Activities</h2>
      </div>

      <div className="space-y-4">
        {MOCK_ACTIVITIES.map((activity) => (
            <motion.button 
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedActivity(activity)}
                className="w-full bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 text-left group hover:shadow-md transition-all active:scale-[0.99]"
            >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Microscope size={24} />
                </div>
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">{activity.subject}</span>
                    <h3 className="font-bold text-slate-800 text-sm mb-1 leading-snug">{activity.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{activity.aim}</p>
                </div>
            </motion.button>
        ))}
      </div>
    </div>
  );
};

export default NCERTActivities;