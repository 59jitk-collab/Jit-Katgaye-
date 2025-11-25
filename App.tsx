import React, { useState, useEffect } from 'react';
import { AppScreen, UserPreferences, StudyHubFilter } from './types';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import StudyHub from './components/StudyHub';
import AIAssistant from './components/AIAssistant';
import Flashcards from './components/Flashcards';
import Notes from './components/Notes';
import Profile from './components/Profile';
import Progress from './components/Progress';
import StudyPlanner from './components/StudyPlanner';
import Features from './components/Features';
import RevisionNotes from './components/RevisionNotes';
import DoubtSolver from './components/DoubtSolver';
import Sidebar from './components/Sidebar';
import StudyTimer from './components/StudyTimer';
import Syllabus from './components/Syllabus';
import CalendarView from './components/CalendarView';
import NCERTActivities from './components/NCERTActivities';
import { LayoutGrid, Book, Bot, Home, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [user, setUser] = useState<UserPreferences | null>(null);
  const [partialUser, setPartialUser] = useState<Partial<UserPreferences>>({});
  const [aiContextQuery, setAiContextQuery] = useState<string>('');
  const [studyFilter, setStudyFilter] = useState<StudyHubFilter | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Stats State
  // In a real app, this would be loaded from a backend or local storage
  const [userStats, setUserStats] = useState({
      questionsSolved: 142,
      accuracy: 82,
      streak: 3
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      const savedUser = localStorage.getItem('isus_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setCurrentScreen(AppScreen.DASHBOARD);
      } else {
        setCurrentScreen(AppScreen.LOGIN);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = (userData: Partial<UserPreferences>) => {
    setPartialUser(userData);
    setCurrentScreen(AppScreen.ONBOARDING);
  };

  const handleOnboardingComplete = (prefs: UserPreferences) => {
    setUser(prefs);
    localStorage.setItem('isus_user', JSON.stringify(prefs));
    setCurrentScreen(AppScreen.DASHBOARD);
  };

  const handleLogout = () => {
    localStorage.removeItem('isus_user');
    setUser(null);
    setPartialUser({});
    setCurrentScreen(AppScreen.LOGIN);
  };

  const handleAskAI = (query: string) => {
    setAiContextQuery(query);
    setCurrentScreen(AppScreen.AI_ASSISTANT);
  };

  const handleTakeChapterTest = (subject: string, chapter: string) => {
      // Navigate to StudyHub filtered by subject, chapter and type MCQ
      setStudyFilter({ subject, chapter, type: 'MCQ' });
      setCurrentScreen(AppScreen.STUDY_HUB);
  };
  
  // Callback when a question is answered correctly/incorrectly
  const handleProgressUpdate = (isCorrect: boolean) => {
      setUserStats(prev => ({
          ...prev,
          questionsSolved: prev.questionsSolved + 1,
          accuracy: isCorrect 
            ? Math.round(((prev.accuracy * prev.questionsSolved) + 100) / (prev.questionsSolved + 1))
            : Math.round(((prev.accuracy * prev.questionsSolved) + 0) / (prev.questionsSolved + 1))
      }));
  };

  // Reset filter when leaving StudyHub usually, but here we keep it simple.
  // We can reset it when navigating to dashboard.
  const navigateTo = (screen: AppScreen) => {
      if (screen !== AppScreen.STUDY_HUB) {
          setStudyFilter(undefined);
      }
      setCurrentScreen(screen);
  }

  const renderScreen = () => {
    if (!user && currentScreen !== AppScreen.LOGIN && currentScreen !== AppScreen.ONBOARDING && !showSplash) {
        return <LoginScreen onLogin={handleLoginSuccess} />;
    }

    switch (currentScreen) {
      case AppScreen.LOGIN:
        return <LoginScreen onLogin={handleLoginSuccess} />;
      case AppScreen.ONBOARDING:
        return <Onboarding initialUser={partialUser} onComplete={handleOnboardingComplete} />;
      case AppScreen.DASHBOARD:
        return user ? <Dashboard user={user} onNavigate={navigateTo} onOpenSidebar={() => setIsSidebarOpen(true)} /> : null;
      case AppScreen.FEATURES:
        return <Features onNavigate={navigateTo} onBack={() => navigateTo(AppScreen.DASHBOARD)} />;
      case AppScreen.STUDY_HUB:
        return <StudyHub onBack={() => navigateTo(AppScreen.DASHBOARD)} onAskAI={handleAskAI} initialFilter={studyFilter} onNavigate={navigateTo} />;
      case AppScreen.AI_ASSISTANT:
        return user ? <AIAssistant user={user} initialQuery={aiContextQuery} onClearInitialQuery={() => setAiContextQuery('')} onBack={() => navigateTo(AppScreen.DASHBOARD)} /> : null;
      case AppScreen.FLASHCARDS:
        return <Flashcards onBack={() => navigateTo(AppScreen.DASHBOARD)} />;
      case AppScreen.NOTES:
        return <Notes onBack={() => navigateTo(AppScreen.DASHBOARD)} />;
      case AppScreen.PROFILE:
        return user ? <Profile user={user} onLogout={handleLogout} onBack={() => navigateTo(AppScreen.DASHBOARD)} /> : null;
      case AppScreen.PROGRESS:
        return <Progress onBack={() => navigateTo(AppScreen.DASHBOARD)} />;
      case AppScreen.STUDY_PLANNER:
        return user ? <StudyPlanner user={user} onBack={() => navigateTo(AppScreen.DASHBOARD)} /> : null;
      case AppScreen.REVISION_NOTES:
        return <RevisionNotes onBack={() => navigateTo(AppScreen.STUDY_HUB)} onTakeTest={handleTakeChapterTest} />;
      case AppScreen.DOUBT_SOLVER:
        return <DoubtSolver onBack={() => navigateTo(AppScreen.DASHBOARD)} />;
      case AppScreen.NCERT_ACTIVITIES:
        return <NCERTActivities onBack={() => navigateTo(AppScreen.FEATURES)} />;
      
      // Sidebar Screens
      case AppScreen.STUDY_TIMER:
        return <StudyTimer onBack={() => navigateTo(AppScreen.DASHBOARD)} />;
      case AppScreen.SYLLABUS:
        return <Syllabus onBack={() => navigateTo(AppScreen.DASHBOARD)} />;
      case AppScreen.CALENDAR:
        return <CalendarView onBack={() => navigateTo(AppScreen.DASHBOARD)} />;
      case AppScreen.MY_COURSES:
        return <div className="p-8 text-center text-slate-500 h-full flex items-center justify-center">My Courses Coming Soon...</div>; // Placeholder
      case AppScreen.STATISTICS:
         return <Progress onBack={() => navigateTo(AppScreen.DASHBOARD)} />;

      default:
        return null;
    }
  };

  const showNav = !showSplash && 
                  user !== null && 
                  currentScreen !== AppScreen.LOGIN && 
                  currentScreen !== AppScreen.ONBOARDING;

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex flex-col items-center">
      {showSplash && <SplashScreen />}
      
      {/* Sidebar Overlay */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={navigateTo} 
        onLogout={handleLogout}
      />

      <div className="w-full max-w-md bg-white sm:shadow-2xl h-[100dvh] flex flex-col relative overflow-hidden sm:border-x sm:border-slate-200">
        <main className="flex-1 overflow-y-auto no-scrollbar bg-slate-50">
          {renderScreen()}
        </main>

        {showNav && (
          <nav className="bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-between items-center shrink-0 z-40 pb-8 md:pb-4 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.02)]">
             <button 
                onClick={() => navigateTo(AppScreen.DASHBOARD)}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${currentScreen === AppScreen.DASHBOARD ? 'text-primary-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <Home size={24} strokeWidth={currentScreen === AppScreen.DASHBOARD ? 2.5 : 2} />
               <span className="text-[10px] font-bold tracking-wide">Home</span>
             </button>

             <button 
                onClick={() => navigateTo(AppScreen.FEATURES)}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${currentScreen === AppScreen.FEATURES || currentScreen === AppScreen.REVISION_NOTES || currentScreen === AppScreen.DOUBT_SOLVER ? 'text-primary-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <LayoutGrid size={24} strokeWidth={currentScreen === AppScreen.FEATURES ? 2.5 : 2} />
               <span className="text-[10px] font-bold tracking-wide">Toolkit</span>
             </button>

             <div className="relative -top-8 group">
               <button 
                  onClick={() => navigateTo(AppScreen.AI_ASSISTANT)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/30 transition-all duration-300 hover:scale-110 active:scale-95 ${
                      currentScreen === AppScreen.AI_ASSISTANT 
                      ? 'bg-primary-700 text-white rotate-3' 
                      : 'bg-primary-600 text-white'
                  }`}
               >
                 <Bot size={28} />
               </button>
             </div>

             <button 
                onClick={() => navigateTo(AppScreen.STUDY_HUB)}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${currentScreen === AppScreen.STUDY_HUB ? 'text-primary-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <Book size={24} strokeWidth={currentScreen === AppScreen.STUDY_HUB ? 2.5 : 2} />
               <span className="text-[10px] font-bold tracking-wide">Study</span>
             </button>

             <button 
                onClick={() => navigateTo(AppScreen.PROFILE)}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${currentScreen === AppScreen.PROFILE ? 'text-primary-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <UserIcon size={24} strokeWidth={currentScreen === AppScreen.PROFILE ? 2.5 : 2} />
               <span className="text-[10px] font-bold tracking-wide">Profile</span>
             </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default App;