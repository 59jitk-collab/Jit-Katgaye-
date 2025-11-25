import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPreferences } from '../types';
import { User, Chrome } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (userPartial: Partial<UserPreferences>) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin({
        name: 'Alex Student', // Simulated Google Account Name
        email: 'alex.student@gmail.com',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Student&background=0D8ABC&color=fff',
        isGuest: false,
      });
    }, 1500);
  };

  const handleGuestLogin = () => {
    onLogin({
      name: '',
      isGuest: true,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[60%] bg-white rounded-b-[3rem] shadow-sm -z-10" />
      <div className="absolute top-20 right-[-10%] w-64 h-64 bg-primary-100/50 rounded-full blur-3xl" />
      <div className="absolute top-40 left-[-10%] w-48 h-48 bg-blue-100/30 rounded-full blur-3xl" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-sm flex flex-col items-center text-center"
      >
        <div className="mb-10 relative">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-primary-500/30">
            isus
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-md">
            <SparkleIcon />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Welcome Back</h1>
        <p className="text-slate-500 text-base mb-10 max-w-[260px] leading-relaxed">Your intelligent companion for self-study excellence.</p>

        <div className="w-full space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-700 font-bold py-4 px-4 rounded-2xl shadow-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98] relative overflow-hidden group"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-slate-200 border-t-primary-600 rounded-full animate-spin" />
            ) : (
              <>
                <Chrome size={20} className="text-slate-900" />
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-xs text-slate-400 font-bold uppercase tracking-widest">Or</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <button
            onClick={handleGuestLogin}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-4 rounded-2xl shadow-lg shadow-slate-200 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <User size={20} />
            <span>Continue as Guest</span>
          </button>
        </div>

        <p className="text-[10px] text-slate-400 mt-8 font-medium">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
};

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.39 9.61L22 12L14.39 14.39L12 22L9.61 14.39L2 12L9.61 9.61L12 2Z" fill="currentColor"/>
  </svg>
);

export default LoginScreen;