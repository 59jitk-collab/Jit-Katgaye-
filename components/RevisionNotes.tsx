import React, { useState } from 'react';
import { MOCK_CHAPTER_NOTES, SUBJECTS } from '../constants';
import { ChapterNote } from '../types';
import { ChevronLeft, Book, Clock, ChevronRight, PlayCircle, ClipboardList, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateSimpleNotes } from '../services/geminiService';

interface RevisionNotesProps {
  onBack: () => void;
  onTakeTest?: (subject: string, chapter: string) => void;
}

const RevisionNotes: React.FC<RevisionNotesProps> = ({ onBack, onTakeTest }) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<ChapterNote | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Group notes by subject for listing
  const notesBySubject = MOCK_CHAPTER_NOTES.reduce((acc, note) => {
    if (!acc[note.subject]) acc[note.subject] = [];
    acc[note.subject].push(note);
    return acc;
  }, {} as Record<string, ChapterNote[]>);

  const handleSelectNote = async (note: ChapterNote) => {
    setSelectedNote(note);
    setIsGenerating(true);
    setGeneratedContent(null);

    // Call AI Service
    const aiContent = await generateSimpleNotes(note.subject, note.chapterName);
    
    setIsGenerating(false);
    setGeneratedContent(aiContent);
  };

  const handleStartTest = () => {
    if (selectedNote && onTakeTest) {
        onTakeTest(selectedNote.subject, selectedNote.chapterName);
    }
  };

  // Render Note Content (AI Generated)
  if (selectedNote) {
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <button onClick={() => { setSelectedNote(null); setGeneratedContent(null); }} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors text-slate-500">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{selectedNote.subject}</h2>
            <h1 className="text-lg font-bold text-slate-900 leading-tight line-clamp-1">{selectedNote.chapterName}</h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md whitespace-nowrap">
             <Clock size={12} /> Easy Read
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 pb-28 no-scrollbar">
           
           {isGenerating ? (
             <div className="flex flex-col items-center justify-center h-full space-y-6">
                <div className="relative">
                   <div className="w-20 h-20 bg-primary-100 rounded-full animate-ping absolute opacity-75"></div>
                   <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white relative z-10 shadow-xl">
                      <Sparkles size={40} className="animate-pulse" />
                   </div>
                </div>
                <div className="text-center">
                   <h3 className="text-xl font-bold text-slate-800 mb-2">Creating Magic Notes...</h3>
                   <p className="text-slate-500 text-sm">Simplifying complex concepts for you.</p>
                </div>
             </div>
           ) : (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="prose prose-slate prose-headings:font-bold prose-h1:text-2xl prose-h2:text-lg prose-h2:text-primary-700 prose-p:text-slate-600 prose-li:text-slate-600 max-w-none"
             >
                {/* Simulated animation by rendering AI content */}
                {generatedContent && generatedContent.split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) return <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} key={idx} className="mb-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">{line.replace('# ', '')}</motion.h1>;
                  if (line.startsWith('## ')) return <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} key={idx} className="mt-8 mb-3 border-b border-primary-100 pb-1 flex items-center gap-2"><Zap size={20} className="fill-yellow-400 text-yellow-500"/>{line.replace('## ', '')}</motion.h2>;
                  if (line.startsWith('- ')) return <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} key={idx} className="ml-4 marker:text-primary-500 mb-2">{line.replace('- ', '')}</motion.li>;
                  if (line.startsWith('**Key')) return <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: idx * 0.05 }} key={idx} className="bg-amber-50 border border-amber-200 p-4 rounded-xl my-4 text-amber-900 font-medium shadow-sm">{line.replace(/\*\*/g, '')}</motion.div>
                  if (line.trim().length === 0) return <br key={idx} />;
                  return <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} key={idx} className="mb-2 leading-relaxed">{line.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/<b/g, '<span class="font-bold text-slate-800"').replace(/\/b>/g, '/span>')}</motion.p>;
                })}
             </motion.div>
           )}
        </div>

        {/* Bottom Action Bar */}
        {!isGenerating && (
            <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 p-4 pb-8 flex justify-center backdrop-blur-md bg-white/90">
                <button 
                    onClick={handleStartTest}
                    className="w-full max-w-sm bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-200 flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98]"
                >
                    <ClipboardList size={20} />
                    Take Chapter Test
                </button>
            </div>
        )}
      </div>
    );
  }

  // Render Subject/Chapter List
  return (
    <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50 overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Revision Notes</h2>
      </div>

      {!selectedSubject ? (
        // Subject Selection Grid
        <div className="grid grid-cols-1 gap-4">
          <p className="text-sm text-slate-500 mb-2 font-medium">Select a subject for AI notes:</p>
          {SUBJECTS.map((subject) => {
            const count = notesBySubject[subject]?.length || 0;
            return (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-primary-200 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                    <Book size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800">{subject}</h3>
                    <p className="text-xs text-slate-400 font-medium">{count} Chapters Available</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <ChevronRight size={18} />
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        // Chapter List
        <div>
          <button 
             onClick={() => setSelectedSubject(null)}
             className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1 hover:text-primary-600"
          >
            <ChevronLeft size={14} /> Back to Subjects
          </button>
          
          <h3 className="text-xl font-bold text-slate-900 mb-6">{selectedSubject}</h3>

          <div className="space-y-3">
            {notesBySubject[selectedSubject]?.map((note) => (
              <motion.button
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelectNote(note)}
                className="w-full bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all active:scale-[0.99]"
              >
                 <div className="text-left">
                    <h4 className="font-bold text-slate-800 mb-1 group-hover:text-primary-600 transition-colors">{note.chapterName}</h4>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] bg-slate-50 text-slate-500 px-2 py-1 rounded-md font-bold flex items-center gap-1">
                          <Sparkles size={10} className="text-purple-500" /> AI Animated
                       </span>
                    </div>
                 </div>
                 <div className="bg-primary-50 text-primary-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle size={20} />
                 </div>
              </motion.button>
            )) || (
              <div className="text-center py-10 text-slate-400">
                <Book size={48} className="mx-auto mb-3 opacity-20" />
                <p>No chapters available yet.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RevisionNotes;