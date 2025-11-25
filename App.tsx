import React, { useState, useEffect } from 'react';
import { AppScreen, UserPreferences } from './types';
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
import { LayoutGrid, Book, Bot, Home, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [user, setUser] = useState<UserPreferences | null>(null);
  const [partialUser, setPartialUser] = useState<Partial<UserPreferences>>({});
  const [aiContextQuery, setAiContextQuery] = useState<string>('');

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
        return user ? <Dashboard user={user} onNavigate={setCurrentScreen} /> : null;
      case AppScreen.FEATURES:
        return <Features onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      case AppScreen.STUDY_HUB:
        return <StudyHub onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} onAskAI={handleAskAI} />;
      case AppScreen.AI_ASSISTANT:
        return user ? <AIAssistant user={user} initialQuery={aiContextQuery} onClearInitialQuery={() => setAiContextQuery('')} onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} /> : null;
      case AppScreen.FLASHCARDS:
        return <Flashcards onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      case AppScreen.NOTES:
        return <Notes onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      case AppScreen.PROFILE:
        return user ? <Profile user={user} onLogout={handleLogout} onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} /> : null;
      case AppScreen.PROGRESS:
        return <Progress onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      case AppScreen.STUDY_PLANNER:
        return user ? <StudyPlanner user={user} onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} /> : null;
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
      
      <div className="w-full max-w-md bg-white sm:shadow-2xl h-[100dvh] flex flex-col relative overflow-hidden sm:border-x sm:border-slate-200">
        <main className="flex-1 overflow-y-auto no-scrollbar bg-slate-50">
          {renderScreen()}
        </main>

        {showNav && (
          <nav className="bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-between items-center shrink-0 z-40 pb-8 md:pb-4 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.02)]">
             <button 
                onClick={() => setCurrentScreen(AppScreen.DASHBOARD)}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${currentScreen === AppScreen.DASHBOARD ? 'text-primary-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <Home size={24} strokeWidth={currentScreen === AppScreen.DASHBOARD ? 2.5 : 2} />
               <span className="text-[10px] font-bold tracking-wide">Home</span>
             </button>

             <button 
                onClick={() => setCurrentScreen(AppScreen.FEATURES)}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${currentScreen === AppScreen.FEATURES ? 'text-primary-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <LayoutGrid size={24} strokeWidth={currentScreen === AppScreen.FEATURES ? 2.5 : 2} />
               <span className="text-[10px] font-bold tracking-wide">Features</span>
             </button>

             <div className="relative -top-8 group">
               <button 
                  onClick={() => setCurrentScreen(AppScreen.AI_ASSISTANT)}
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
                onClick={() => setCurrentScreen(AppScreen.STUDY_HUB)}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${currentScreen === AppScreen.STUDY_HUB ? 'text-primary-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <Book size={24} strokeWidth={currentScreen === AppScreen.STUDY_HUB ? 2.5 : 2} />
               <span className="text-[10px] font-bold tracking-wide">Study</span>
             </button>

             <button 
                onClick={() => setCurrentScreen(AppScreen.PROFILE)}
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