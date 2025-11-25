import React, { useState, useEffect } from 'react';
import { Note } from '../types';
import { summarizeText } from '../services/geminiService';
import { Plus, Search, Trash2, Edit2, ChevronLeft, Save, X, FileText, Sparkles, Clock, Calendar, Filter, ArrowUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotesProps {
  onBack: () => void;
}

const Notes: React.FC<NotesProps> = ({ onBack }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Filter & Sort States
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'SUMMARY' | 'REMINDER' | 'TODAY'>('ALL');
  const [sortOrder, setSortOrder] = useState<'NEWEST' | 'OLDEST'>('NEWEST');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load notes from local storage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('isus_notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // Default note
      setNotes([{
        id: '1',
        title: 'Physics Formulas',
        content: 'Newton\'s Second Law: F = ma\nKinetic Energy: KE = 0.5 * mv^2',
        lastModified: Date.now(),
        tags: ['Physics', 'Important'],
        reminder: ''
      }]);
    }
  }, []);

  // Save notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('isus_notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = (title: string, content: string, summary?: string, reminder?: string) => {
    if (editingNote) {
      setNotes(notes.map(n => n.id === editingNote.id ? { ...n, title, content, summary, reminder, lastModified: Date.now() } : n));
      setEditingNote(null);
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title: title || 'Untitled Note',
        content,
        summary,
        reminder,
        lastModified: Date.now(),
        tags: []
      };
      setNotes([newNote, ...notes]);
      setIsCreating(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(n => n.id !== id));
      if (editingNote?.id === id) setEditingNote(null);
    }
  };

  const filteredNotes = notes
    .filter(n => {
      // Text Search
      const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            n.content.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Active Filter Logic
      if (activeFilter === 'SUMMARY') return !!n.summary;
      if (activeFilter === 'REMINDER') return !!n.reminder;
      if (activeFilter === 'TODAY') {
          const today = new Date();
          const d = new Date(n.lastModified);
          return d.getDate() === today.getDate() && 
                 d.getMonth() === today.getMonth() && 
                 d.getFullYear() === today.getFullYear();
      }

      return true;
    })
    .sort((a, b) => {
      return sortOrder === 'NEWEST' 
        ? b.lastModified - a.lastModified 
        : a.lastModified - b.lastModified;
    });

  // Editor View
  if (isCreating || editingNote) {
    return (
      <NoteEditor 
        initialNote={editingNote}
        onSave={handleSaveNote}
        onCancel={() => {
          setIsCreating(false);
          setEditingNote(null);
        }}
      />
    );
  }

  // List View
  return (
    <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <ChevronLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My Notes</h2>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-200 hover:bg-primary-700 transition-colors active:scale-95"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search your notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all text-sm font-medium placeholder:text-slate-400 shadow-sm"
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)} 
              className={`p-3 rounded-xl border transition-colors flex items-center justify-center shadow-sm ${isFilterOpen ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
            >
              <Filter size={20} />
            </button>
        </div>
        
        <AnimatePresence>
          {isFilterOpen && (
             <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
             >
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
                   {/* Sort Options */}
                   <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Sort Date</span>
                      <div className="flex gap-2">
                          <button onClick={() => setSortOrder('NEWEST')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${sortOrder === 'NEWEST' ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}>
                              <ArrowDown size={14} /> Newest First
                          </button>
                          <button onClick={() => setSortOrder('OLDEST')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${sortOrder === 'OLDEST' ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}>
                              <ArrowUp size={14} /> Oldest First
                          </button>
                      </div>
                   </div>
                   
                   {/* Filter Options */}
                   <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Filter Content</span>
                      <div className="flex flex-wrap gap-2">
                          <button onClick={() => setActiveFilter('ALL')} className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${activeFilter === 'ALL' ? 'bg-slate-800 border-slate-800 text-white' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}>
                              All Notes
                          </button>
                          <button onClick={() => setActiveFilter('TODAY')} className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${activeFilter === 'TODAY' ? 'bg-cyan-50 border-cyan-200 text-cyan-700' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}>
                              Today
                          </button>
                          <button onClick={() => setActiveFilter('SUMMARY')} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${activeFilter === 'SUMMARY' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}>
                              <Sparkles size={12} /> AI Summary
                          </button>
                          <button onClick={() => setActiveFilter('REMINDER')} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${activeFilter === 'REMINDER' ? 'bg-orange-50 border-orange-200 text-orange-700' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}>
                              <Clock size={12} /> Reminder
                          </button>
                      </div>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <FileText size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-medium">No notes found.</p>
            <p className="text-xs mt-1">Tap + to create one.</p>
          </div>
        ) : (
          filteredNotes.map(note => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setEditingNote(note)}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 active:scale-[0.99] transition-all cursor-pointer group hover:shadow-md relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-primary-600 transition-colors">{note.title}</h3>
                <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded-md font-medium">
                  {new Date(note.lastModified).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{note.content}</p>
              
              {/* Indicators */}
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-50">
                 {note.summary && (
                   <span className="flex items-center gap-1 text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                     <Sparkles size={10} /> AI Summary
                   </span>
                 )}
                 {note.reminder && (
                   <span className="flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                     <Clock size={10} /> {new Date(note.reminder).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                   </span>
                 )}
                 <div className="flex-1"></div>
                 <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }}
                    className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                 >
                   <Trash2 size={16} />
                 </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

const NoteEditor: React.FC<{ initialNote: Note | null; onSave: (t: string, c: string, s?: string, r?: string) => void; onCancel: () => void }> = ({ initialNote, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');
  const [summary, setSummary] = useState(initialNote?.summary || '');
  const [reminder, setReminder] = useState(initialNote?.reminder || '');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showReminderInput, setShowReminderInput] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const result = await summarizeText(content);
    setSummary(result);
    setIsSummarizing(false);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100">
        <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
          <X size={24} />
        </button>
        <div className="flex items-center gap-2">
           <button 
            onClick={() => setShowReminderInput(!showReminderInput)}
            className={`p-2 rounded-full transition-colors ${reminder ? 'text-orange-500 bg-orange-50' : 'text-slate-400 hover:bg-slate-100'}`}
           >
             <Clock size={20} />
           </button>
           <button onClick={() => onSave(title, content, summary, reminder)} className="p-2 hover:bg-primary-50 rounded-full text-primary-600">
             <Save size={24} />
           </button>
        </div>
      </div>

      {/* Reminder Input */}
      <AnimatePresence>
        {showReminderInput && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 py-2 bg-orange-50 border-b border-orange-100 overflow-hidden"
          >
             <div className="flex items-center gap-3 text-sm text-orange-800">
                <span className="font-bold whitespace-nowrap">Set Reminder:</span>
                <input 
                  type="datetime-local" 
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                  className="bg-white border border-orange-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300 w-full"
                />
                {reminder && (
                  <button onClick={() => setReminder('')} className="p-1 hover:bg-orange-200 rounded-full">
                    <X size={14} />
                  </button>
                )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Note Title" 
          className="text-3xl font-bold text-slate-900 placeholder:text-slate-300 border-none outline-none bg-transparent mb-4"
        />
        
        {/* AI Summary Section */}
        {summary && (
           <div className="mb-6 bg-purple-50 p-4 rounded-xl border border-purple-100 relative group">
              <div className="flex items-center gap-2 mb-2 text-purple-700 font-bold text-xs uppercase tracking-wide">
                <Sparkles size={14} /> AI Summary
              </div>
              <div className="prose prose-sm prose-purple text-purple-900 text-sm leading-relaxed">
                 <div dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br/>').replace(/\*/g, '•') }} />
              </div>
              <button 
                onClick={() => setSummary('')}
                className="absolute top-2 right-2 p-1 text-purple-300 hover:text-purple-600 rounded-full hover:bg-purple-100 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
           </div>
        )}

        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Start typing..." 
          className="flex-1 resize-none text-base text-slate-600 placeholder:text-slate-300 border-none outline-none bg-transparent leading-relaxed"
        />
      </div>

      {/* Floating Summarize Button */}
      {!summary && content.length > 20 && (
         <div className="absolute bottom-6 right-6">
            <button
              onClick={handleSummarize}
              disabled={isSummarizing}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl shadow-slate-300 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-70 font-bold text-sm"
            >
              {isSummarizing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Summarize
                </>
              )}
            </button>
         </div>
      )}
    </div>
  );
};

export default Notes;