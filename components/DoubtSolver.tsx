import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Send, X, ChevronLeft, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGeminiChat } from '../services/geminiService';
import { GenerateContentResponse } from "@google/genai";

interface DoubtSolverProps {
  onBack: () => void;
}

const DoubtSolver: React.FC<DoubtSolverProps> = ({ onBack }) => {
  const [mode, setMode] = useState<'CAMERA' | 'TEXT'>('TEXT');
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);
  
  // Simulate Camera Stream
  const videoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (mode === 'CAMERA') {
        // In a real app, we would request permissions here.
        // For this demo, we just show a placeholder UI.
    }
  }, [mode]);

  const handleSolve = async () => {
    if (!input.trim() && mode === 'TEXT') return;
    
    setIsAnalyzing(true);
    
    try {
        const chat = getGeminiChat("You are an expert tutor. Solve the student's doubt clearly, step-by-step. Use Markdown.");
        if (chat) {
            const prompt = mode === 'CAMERA' 
                ? "Simulating an image analysis: The user has uploaded an image of a math problem: 'Integrate x^2 dx'. Please solve it." 
                : input;
            
            const result = await chat.sendMessage({ message: prompt });
            setSolution(result.text || "Could not solve doubt.");
        }
    } catch (e) {
        setSolution("Error connecting to AI Tutor.");
    } finally {
        setIsAnalyzing(false);
    }
  };

  const handleCapture = () => {
      // Simulate capturing an image
      setMode('TEXT'); // Switch back to view result
      setInput("Analyzing captured image..."); 
      handleSolve();
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 z-10">
        <button onClick={onBack} className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
            <ChevronLeft size={24} />
        </button>
        <h2 className="font-bold text-sm uppercase tracking-widest flex items-center gap-2">
            <Zap size={16} className="text-yellow-400 fill-yellow-400" />
            AI Doubt Solver
        </h2>
        <div className="w-10"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
          {mode === 'CAMERA' ? (
              <div className="flex-1 bg-black relative flex flex-col items-center justify-center">
                  <p className="text-slate-400 text-xs mb-4">Point camera at the question</p>
                  <div className="w-64 h-64 border-2 border-primary-500 rounded-3xl relative">
                      <div className="absolute inset-0 bg-primary-500/10 animate-pulse"></div>
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-primary-500 -mt-1 -ml-1"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-primary-500 -mt-1 -mr-1"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-primary-500 -mb-1 -ml-1"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-primary-500 -mb-1 -mr-1"></div>
                  </div>
                  
                  <div className="absolute bottom-10 flex items-center justify-center w-full gap-8">
                      <button onClick={() => setMode('TEXT')} className="p-4 bg-white/10 rounded-full">
                          <X size={24} />
                      </button>
                      <button onClick={handleCapture} className="w-20 h-20 bg-white rounded-full border-4 border-slate-300 flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                          <div className="w-16 h-16 bg-white border-2 border-slate-900 rounded-full"></div>
                      </button>
                      <button className="p-4 bg-white/10 rounded-full">
                          <ImageIcon size={24} />
                      </button>
                  </div>
              </div>
          ) : (
             <div className="flex-1 flex flex-col bg-slate-50 rounded-t-[2rem] mt-4 text-slate-900 overflow-hidden">
                 <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                     {!solution ? (
                         <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60">
                             <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-2">
                                 <Sparkles size={40} />
                             </div>
                             <h3 className="text-xl font-bold">What are you stuck on?</h3>
                             <p className="text-sm max-w-xs">Type your question below or use the camera to scan a problem.</p>
                             <button onClick={() => setMode('CAMERA')} className="flex items-center gap-2 bg-slate-200 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-300 transition-colors">
                                 <Camera size={18} /> Open Camera
                             </button>
                         </div>
                     ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-4">
                                 <p className="font-bold text-sm text-slate-500 uppercase tracking-wide mb-2">Your Question</p>
                                 <p className="text-slate-800">{input}</p>
                             </div>
                             <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 relative overflow-hidden">
                                  <div className="flex items-center gap-2 mb-4 text-primary-700 font-bold uppercase tracking-wide text-xs">
                                      <Sparkles size={14} /> AI Solution
                                  </div>
                                  <div className="prose prose-sm prose-slate max-w-none">
                                     <div dangerouslySetInnerHTML={{ __html: solution.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                                  </div>
                             </div>
                             <button onClick={() => {setSolution(null); setInput('')}} className="w-full mt-6 py-4 text-slate-500 font-bold text-sm hover:text-slate-800">Ask Another Question</button>
                        </div>
                     )}
                 </div>

                 <div className="p-4 bg-white border-t border-slate-100">
                     <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-[2rem]">
                         <button onClick={() => setMode('CAMERA')} className="p-3 text-slate-500 hover:bg-white hover:shadow-sm rounded-full transition-all">
                             <Camera size={20} />
                         </button>
                         <input 
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your doubt here..."
                            className="flex-1 bg-transparent outline-none text-sm font-medium px-2"
                            onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
                         />
                         <button 
                            onClick={handleSolve}
                            disabled={!input.trim() || isAnalyzing}
                            className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 transition-all shadow-md active:scale-95"
                         >
                             {isAnalyzing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={18} />}
                         </button>
                     </div>
                 </div>
             </div>
          )}
      </div>
    </div>
  );
};

export default DoubtSolver;