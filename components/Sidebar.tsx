import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppScreen } from '../types';
import { X, LayoutDashboard, BarChart2, Clock, BookOpen, Book, Calendar, PieChart, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: AppScreen) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, onLogout }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', screen: AppScreen.DASHBOARD },
    { icon: BarChart2, label: 'Progress Report', screen: AppScreen.PROGRESS },
    { icon: Clock, label: 'Study Timer', screen: AppScreen.STUDY_TIMER },
    { icon: BookOpen, label: 'My Courses', screen: AppScreen.MY_COURSES },
    { icon: Book, label: 'Class 10 Syllabus', screen: AppScreen.SYLLABUS },
    { icon: Calendar, label: 'Calendar', screen: AppScreen.CALENDAR },
    { icon: PieChart, label: 'Statistics', screen: AppScreen.PROGRESS }, // Reusing progress for stats
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 w-[280px] h-full bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-primary-600 text-white">
              <div>
                <h2 className="text-xl font-bold tracking-tight">isus</h2>
                <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Study Helper</p>
              </div>
              <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    onNavigate(item.screen);
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-600 font-bold text-sm hover:bg-primary-50 hover:text-primary-700 transition-all active:scale-[0.98]"
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100">
               <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors"
               >
                 <LogOut size={18} /> Logout
               </button>
               <p className="text-center text-[10px] text-slate-300 font-bold mt-4 uppercase tracking-widest">Version 2.0.1</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;