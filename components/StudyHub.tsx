import React, { useState, useEffect } from 'react';
import { Question, QuestionType, StudyHubFilter, AppScreen } from '../types';
import { ArrowLeft, Clock, CheckCircle, XCircle, BrainCircuit, Calendar, Sparkles, ChevronLeft, Filter, Tag, BookOpen, FileText, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_QUESTIONS as questions, SUBJECTS } from '../constants';
import { generatePracticeQuestions } from '../services/geminiService';

interface StudyHubProps {
  onBack: () => void;
  onAskAI: (query: string) => void;
  initialFilter?: StudyHubFilter;
  onNavigate: (screen: AppScreen) => void;
}

const StudyHub: React.FC<StudyHubProps> = ({ onBack, onAskAI, initialFilter, onNavigate }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Filter States
  const [activeCategory, setActiveCategory] = useState<'PYQ' | 'MCQ' | 'NOTES' | 'AI_PRACTICE' | null>(null);
  const [activeSubject, setActiveSubject] = useState<string | 'ALL'>('ALL');
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  // AI Practice State
  const [aiQuestions, setAiQuestions] = useState<Question[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Initialize filters from props if provided
  useEffect(() => {
    if (initialFilter) {
        if (initialFilter.subject) setActiveSubject(initialFilter.subject);
        if (initialFilter.chapter) setActiveChapter(initialFilter.chapter);
        if (initialFilter.type) setActiveCategory(initialFilter.type);
    }
  }, [initialFilter]);

  // Handle Note selection
  useEffect(() => {
    if (activeCategory === 'NOTES') {
        // Redirect to Revision Notes screen
        onNavigate(AppScreen.REVISION_NOTES);
    }
  }, [activeCategory, onNavigate]);

  // Fetch AI Questions when entering AI Practice Mode
  useEffect(() => {
      if (activeCategory === 'AI_PRACTICE' && aiQuestions.length === 0 && !isLoadingAI) {
          fetchAiQuestions();
      }
  }, [activeCategory]);

  const fetchAiQuestions = async () => {
      setIsLoadingAI(true);
      const sub = activeSubject === 'ALL' ? 'Science' : activeSubject; // Default to Science if ALL
      const generated = await generatePracticeQuestions(sub, activeChapter || undefined);
      
      const formattedQuestions: Question[] = generated.map((q: any, i: number) => ({
          id: `ai-${Date.now()}-${i}`,
          text: q.text,
          type: QuestionType.MCQ,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          subject: sub,
          chapter: activeChapter || 'General',
          year: 2024,
          isPYQ: false,
          difficulty: 'Medium',
          tags: ['AI Generated']
      }));
      
      setAiQuestions(formattedQuestions);
      setIsLoadingAI(false);
  };

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
      // In a real app, update stats here via a prop callback
    }
  };

  const handleAskAboutExplanation = () => {
      if (selectedQuestion) {
          onAskAI(`Can you explain the answer to this question in more detail?\n\nQuestion: "${selectedQuestion.text}"\n\nExplanation provided: "${selectedQuestion.explanation}"\n\nI need more help understanding why this is the correct answer.`);
      }
  }

  // Filter Logic for Questions
  let displayQuestions: Question[] = [];

  if (activeCategory === 'AI_PRACTICE') {
      displayQuestions = aiQuestions;
  } else {
      displayQuestions = questions.filter(q => {
          // Category Logic
          let categoryMatch = true;
          if (activeCategory === 'PYQ') categoryMatch = !!q.isPYQ;
          else if (activeCategory === 'MCQ') categoryMatch = q.type === QuestionType.MCQ && !q.isPYQ; 
          
          const subjectMatch = activeSubject === 'ALL' || q.subject === activeSubject;
          const chapterMatch = activeChapter ? q.chapter === activeChapter : true;
          return categoryMatch && subjectMatch && chapterMatch;
      });
  }

  const clearFilters = () => {
      setActiveSubject('ALL');
      setActiveChapter(null);
      setActiveCategory(null);
      setAiQuestions([]);
  }

  // Main Category Selection View
  if (!activeCategory && !selectedQuestion) {
      return (
        <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50 overflow-y-auto no-scrollbar">
           <div className="flex items-center gap-3 mb-8">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Study Section</h2>
            </div>
            
            <p className="text-sm text-slate-500 font-medium mb-6">Select a category to start learning:</p>

            <div className="space-y-4">
                <button 
                    onClick={() => setActiveCategory('PYQ')}
                    className="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:border-blue-200 active:scale-[0.98] transition-all group"
                >
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <BookOpen size={28} />
                    </div>
                    <div className="text-left flex-1">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700">PYQ Bank</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Past 10 Years Papers</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-full text-slate-300">
                        <ChevronLeft size={20} className="rotate-180" />
                    </div>
                </button>

                <button 
                    onClick={() => setActiveCategory('MCQ')}
                    className="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:border-purple-200 active:scale-[0.98] transition-all group"
                >
                    <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <CheckSquare size={28} />
                    </div>
                    <div className="text-left flex-1">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-purple-700">Mock Tests</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Competency Based Qs</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-full text-slate-300">
                        <ChevronLeft size={20} className="rotate-180" />
                    </div>
                </button>

                <button 
                    onClick={() => setActiveCategory('AI_PRACTICE')}
                    className="w-full bg-slate-900 p-6 rounded-3xl shadow-xl shadow-slate-200 border border-slate-900 flex items-center gap-5 active:scale-[0.98] transition-all group"
                >
                    <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform backdrop-blur-sm">
                        <Sparkles size={28} />
                    </div>
                    <div className="text-left flex-1">
                        <h3 className="text-lg font-bold text-white">AI Unlimited</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Infinite Generated Qs</p>
                    </div>
                    <div className="bg-white/10 p-2 rounded-full text-white/50">
                        <ChevronLeft size={20} className="rotate-180" />
                    </div>
                </button>

                <button 
                    onClick={() => setActiveCategory('NOTES')}
                    className="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:border-emerald-200 active:scale-[0.98] transition-all group"
                >
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <FileText size={28} />
                    </div>
                    <div className="text-left flex-1">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700">Notes</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">AI Animated Revision</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-full text-slate-300">
                        <ChevronLeft size={20} className="rotate-180" />
                    </div>
                </button>
            </div>
        </div>
      );
  }

  // Question List View (PYQ / MCQ)
  if (!selectedQuestion) {
    return (
      <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50">
        <div className="flex items-center gap-3 mb-6">
            <button onClick={clearFilters} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <ChevronLeft size={24} />
            </button>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {activeCategory === 'PYQ' ? 'Previous Year Qs' : activeCategory === 'MCQ' ? 'Practice MCQs' : 'AI Unlimited'}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                  {activeChapter ? `Chapter: ${activeChapter}` : 'Select a question to solve'}
              </p>
            </div>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
            <button 
                onClick={() => setActiveSubject('ALL')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border ${activeSubject === 'ALL' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}
            >
                All Subjects
            </button>
            {SUBJECTS.map(sub => (
                <button 
                    key={sub}
                    onClick={() => setActiveSubject(sub)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border ${activeSubject === sub ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-500 border-slate-200'}`}
                >
                    {sub}
                </button>
            ))}
        </div>

        {activeCategory === 'AI_PRACTICE' && isLoadingAI && (
             <div className="flex flex-col items-center justify-center py-20">
                 <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                 <p className="text-sm font-bold text-slate-500">Generating fresh questions...</p>
             </div>
        )}

        <div className="space-y-4 overflow-y-auto no-scrollbar pb-10 flex-1">
          {!isLoadingAI && displayQuestions.length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                      <Filter size={24} />
                  </div>
                  <p className="font-medium text-sm">No questions found.</p>
                  <p className="text-xs mt-1">Try changing filters or subject.</p>
                  <button onClick={clearFilters} className="mt-4 text-primary-600 font-bold text-xs">Clear Filters</button>
              </div>
          ) : (
            displayQuestions.map((q) => (
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
                <h3 className="text-slate-800 font-bold text-sm mb-1.5 group-hover:text-primary-600 transition-colors flex items-center gap-2">
                    {q.subject}
                    {q.chapter && <span className="text-[10px] text-slate-400 font-normal bg-slate-50 px-1.5 py-0.5 rounded flex items-center gap-1"><Tag size={8} /> {q.chapter}</span>}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{q.text}</p>
                </motion.div>
            ))
          )}
        </div>
        
        {activeCategory === 'AI_PRACTICE' && !isLoadingAI && displayQuestions.length > 0 && (
             <button onClick={fetchAiQuestions} className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold text-sm mt-4 shadow-lg mb-4">
                 Generate More
             </button>
        )}
      </div>
    );
  }

  // Question Detail / Solve View
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
            <span>{selectedQuestion.chapter || 'General'}</span>
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