import React, { useState } from 'react';
import { Question, QuestionType } from '../types';
import { ArrowLeft, Clock, CheckCircle, XCircle, BrainCircuit, Calendar, Sparkles, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_QUESTIONS as questions } from '../constants';

interface StudyHubProps {
  onBack: () => void;
  onAskAI: (query: string) => void;
}

const StudyHub: React.FC<StudyHubProps> = ({ onBack, onAskAI }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filterType, setFilterType] = useState<'ALL' | QuestionType>('ALL');

  const handleSelectQuestion = (q: Question) => {
    setSelectedQuestion(q);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleOptionClick = (index: number) => {
    if (!isSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const handleAskAboutExplanation = () => {
      if (selectedQuestion) {
          onAskAI(`Can you explain the answer to this question in more detail?\n\nQuestion: "${selectedQuestion.text}"\n\nExplanation provided: "${selectedQuestion.explanation}"\n\nI need more help understanding why this is the correct answer.`);
      }
  }

  const filteredQuestions = filterType === 'ALL' ? questions : questions.filter(q => q.type === filterType);

  // List View
  if (!selectedQuestion) {
    return (
      <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50">
        <div className="flex items-center gap-3 mb-8">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <ChevronLeft size={24} />
            </button>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Study Hub</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">Master your subjects</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 text-slate-400">
                <BrainCircuit size={20} />
            </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
            <button 
                onClick={() => setFilterType('ALL')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterType === 'ALL' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-100'}`}
            >
                All
            </button>
            <button 
                onClick={() => setFilterType(QuestionType.MCQ)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterType === QuestionType.MCQ ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-100'}`}
            >
                MCQs
            </button>
             <button 
                onClick={() => setFilterType(QuestionType.CBQ)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterType === QuestionType.CBQ ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-100'}`}
            >
                Case Studies
            </button>
        </div>

        <div className="space-y-4 overflow-y-auto no-scrollbar pb-10">
          {filteredQuestions.map((q) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => handleSelectQuestion(q)}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 cursor-pointer active:scale-[0.98] transition-all hover:shadow-md group"
            >
              <div className="flex justify-between items-center mb-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide ${
                  q.type === QuestionType.CBQ ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
                }`}>
                  {q.type}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold bg-slate-50 px-2 py-1 rounded-full">
                   <Calendar size={10} /> {q.year}
                </div>
              </div>
              <h3 className="text-slate-800 font-bold text-sm mb-1.5 group-hover:text-primary-600 transition-colors">{q.subject}</h3>
              <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{q.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Detail/Quiz View
  return (
    <div className="h-full flex flex-col relative bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-slate-50 pt-6">
        <button onClick={() => setSelectedQuestion(null)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors text-slate-500">
           <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">{selectedQuestion.subject}</h2>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-0.5">
            <span>{selectedQuestion.type}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>{selectedQuestion.year}</span>
          </div>
        </div>
        <div className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold border border-slate-100 shadow-sm">
          <Clock size={14} /> 02:00
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-32 no-scrollbar">
        <div className="mb-8">
          <p className="text-lg text-slate-800 font-medium leading-relaxed">
            {selectedQuestion.text}
          </p>
        </div>

        <div className="space-y-3">
          {selectedQuestion.options?.map((opt, idx) => {
            let styles = "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300";
            let indicator = <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs text-slate-400 font-bold mr-4 transition-all group-hover:border-slate-400 group-hover:text-slate-500">{String.fromCharCode(65 + idx)}</div>;
            
            if (isSubmitted) {
               if (idx === selectedQuestion.correctAnswer) {
                 styles = "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm ring-1 ring-emerald-500/20";
                 indicator = <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white mr-4 shadow-sm"><CheckCircle size={14} /></div>;
               } else if (selectedOption === idx) {
                 styles = "bg-rose-50 border-rose-500 text-rose-800 shadow-sm ring-1 ring-rose-500/20";
                 indicator = <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-white mr-4 shadow-sm"><XCircle size={14} /></div>;
               } else {
                 styles = "opacity-50 bg-slate-50 border-slate-100";
               }
            } else if (selectedOption === idx) {
              styles = "bg-primary-50 border-primary-500 text-primary-900 shadow-md ring-1 ring-primary-500/20";
              indicator = <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center text-xs text-white font-bold mr-4 shadow-sm transition-transform scale-110">{String.fromCharCode(65 + idx)}</div>;
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isSubmitted}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center group ${styles}`}
              >
                {indicator}
                <span className="flex-1 text-sm font-medium leading-normal">{opt}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 space-y-4"
            >
                <div className="bg-indigo-50/80 backdrop-blur-sm p-6 rounded-2xl border border-indigo-100 overflow-hidden">
                    <div className="flex items-center gap-2 mb-3 text-indigo-700">
                        <BrainCircuit size={18} />
                        <h4 className="font-bold text-sm uppercase tracking-wide">Explanation</h4>
                    </div>
                    <p className="text-indigo-900 text-sm leading-relaxed opacity-90">
                        {selectedQuestion.explanation}
                    </p>
                </div>

                <button 
                    onClick={handleAskAboutExplanation}
                    className="w-full bg-white border border-primary-100 text-primary-700 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-primary-50 transition-colors"
                >
                    <Sparkles size={16} />
                    Ask AI to explain further
                </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-100 p-5 pb-8 z-10">
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null || isSubmitted}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-base shadow-xl shadow-slate-200 disabled:opacity-50 disabled:shadow-none transition-all active:scale-98 hover:bg-slate-800"
        >
          {isSubmitted ? 'Next Question' : 'Check Answer'}
        </button>
      </div>
    </div>
  );
};

export default StudyHub;