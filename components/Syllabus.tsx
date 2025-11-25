import React from 'react';
import { ChevronLeft, Book } from 'lucide-react';
import { SUBJECTS } from '../constants';

const Syllabus: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50 overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Class 10 Syllabus</h2>
      </div>

      <div className="space-y-4">
        {SUBJECTS.map((subject) => (
            <div key={subject} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
                        <Book size={20} />
                    </div>
                    <h3 className="font-bold text-slate-800">{subject}</h3>
                </div>
                <ul className="space-y-2 ml-4 border-l-2 border-slate-100 pl-4">
                    <li className="text-sm text-slate-600">Chapter 1: Basics & Introduction</li>
                    <li className="text-sm text-slate-600">Chapter 2: Advanced Concepts</li>
                    <li className="text-sm text-slate-600">Chapter 3: Practical Applications</li>
                    <li className="text-sm text-slate-600">Chapter 4: Final Assessment</li>
                </ul>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Syllabus;