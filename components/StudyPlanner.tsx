import React, { useState, useEffect } from 'react';
import { StudyTask, UserPreferences } from '../types';
import { generateStudyPlan } from '../services/geminiService';
import { ChevronLeft, Calendar, Plus, Trash2, CheckCircle, Circle, Sparkles, Clock, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StudyPlannerProps {
  user: UserPreferences;
  onBack: () => void;
}

const StudyPlanner: React.FC<StudyPlannerProps> = ({ user, onBack }) => {
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState('');

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('isus_study_plan');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('isus_study_plan', JSON.stringify(tasks));
  }, [tasks]);

  const handleGeneratePlan = async () => {
    setLoading(true);
    const generatedTasks = await generateStudyPlan(user.goal);
    if (generatedTasks.length > 0) {
        setTasks(generatedTasks);
    } else {
        alert("Could not generate plan. Please try again.");
    }
    setLoading(false);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = () => {
    if (!newTaskInput.trim()) return;
    const newTask: StudyTask = {
      id: Date.now().toString(),
      text: newTaskInput,
      time: 'Anytime',
      subject: 'Custom',
      completed: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskInput('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const progress = tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;

  return (
    <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Study Planner</h2>
      </div>

      {/* Header Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-50 rounded-full -mr-8 -mt-8 blur-2xl"></div>
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Today's Progress</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-1">{progress}%</h3>
                </div>
                <div className="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center">
                    <Calendar size={20} />
                </div>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-cyan-500 rounded-full"
                />
            </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <button 
            onClick={handleGeneratePlan}
            disabled={loading}
            className="flex-1 bg-slate-900 text-white py-3 rounded-2xl font-bold text-sm shadow-lg shadow-slate-200 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
            {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <Sparkles size={16} />
            )}
            {loading ? 'Planning...' : 'AI Auto-Plan'}
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 mb-4 shadow-sm focus-within:ring-2 focus-within:ring-cyan-100">
            <input 
                type="text" 
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                placeholder="Add a new task..."
                className="flex-1 px-3 py-2 outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
            />
            <button onClick={addTask} className="p-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors">
                <Plus size={18} />
            </button>
        </div>

        <AnimatePresence>
            {tasks.map((task) => (
                <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`bg-white p-4 rounded-2xl border transition-all flex items-center gap-4 group ${task.completed ? 'border-slate-100 opacity-60' : 'border-slate-100 shadow-sm'}`}
                >
                    <button onClick={() => toggleTask(task.id)} className={`shrink-0 transition-colors ${task.completed ? 'text-emerald-500' : 'text-slate-300 hover:text-cyan-500'}`}>
                        {task.completed ? <CheckCircle size={24} className="fill-emerald-50" /> : <Circle size={24} />}
                    </button>
                    <div className="flex-1">
                        <h4 className={`font-bold text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.text}</h4>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                                <Clock size={10} /> {task.time}
                            </span>
                             <span className="text-[10px] font-bold text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded uppercase tracking-wide">
                                {task.subject}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => deleteTask(task.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={16} />
                    </button>
                </motion.div>
            ))}
        </AnimatePresence>

        {tasks.length === 0 && !loading && (
            <div className="text-center py-12 text-slate-400">
                <Calendar size={48} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm font-medium">No tasks yet.</p>
                <p className="text-xs">Use AI to generate a plan or add manually.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlanner;