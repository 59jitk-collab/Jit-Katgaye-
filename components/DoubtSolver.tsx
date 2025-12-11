import React, { useState, useRef, useEffect } from 'react';
import { Camera, Image as ImageIcon, Send, X, ChevronLeft, Sparkles, Zap, RefreshCw, Check } from 'lucide-react';
import { solveDoubt } from '../services/geminiService';

interface DoubtSolverProps {
  onBack: () => void;
}

const DoubtSolver: React.FC<DoubtSolverProps> = ({ onBack }) => {
  const [mode, setMode] = useState<'CAMERA' | 'TEXT' | 'RESULT'>('TEXT');
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (mode === 'CAMERA') {
        startCamera();
    } else {
        stopCamera();
    }
    return () => {
        stopCamera();
    };
  }, [mode]);

  const startCamera = async () => {
      setCameraError(null);
      try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
              video: { facingMode: 'environment' } 
          });
          streamRef.current = stream;
          if (videoRef.current) {
              videoRef.current.srcObject = stream;
          }
      } catch (err) {
          console.error("Camera Error:", err);
          setCameraError("Could not access camera. Please allow permissions.");
      }
  };

  const stopCamera = () => {
      if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
      }
  };

  const handleCapture = () => {
      if (videoRef.current && canvasRef.current) {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          const context = canvas.getContext('2d');
          if (context) {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageData = canvas.toDataURL('image/jpeg', 0.8);
              setCapturedImage(imageData);
              stopCamera();
              setMode('RESULT');
              // Automatically trigger solve for UX flow or let user confirm
              setInput("Analyze this question");
          }
      }
  };

  const handleSolve = async () => {
    if ((!input.trim() && !capturedImage)) return;
    
    setIsAnalyzing(true);
    setMode('RESULT');
    setSolution(null); // Clear previous solution
    
    try {
        // Pass both text and image (if available) to the service
        const result = await solveDoubt(input, capturedImage || undefined);
        setSolution(result);
    } catch (e) {
        setSolution("## Error\nCould not connect to AI Tutor. Please try again.");
    } finally {
        setIsAnalyzing(false);
    }
  };

  const reset = () => {
      setMode('TEXT');
      setInput('');
      setCapturedImage(null);
      setSolution(null);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white relative overflow-hidden">
      {/* Hidden Canvas for Capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="flex items-center justify-between p-4 z-10 bg-gradient-to-b from-black/50 to-transparent">
        <button onClick={onBack} className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
            <ChevronLeft size={24} />
        </button>
        <h2 className="font-bold text-sm uppercase tracking-widest flex items-center gap-2">
            <Zap size={16} className="text-yellow-400 fill-yellow-400" />
            AI Doubt Solver
        </h2>
        <div className="w-10"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
          
          {/* CAMERA MODE */}
          {mode === 'CAMERA' && (
              <div className="absolute inset-0 bg-black flex flex-col">
                  {cameraError ? (
                      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                          <p className="text-red-400 mb-4">{cameraError}</p>
                          <button onClick={() => setMode('TEXT')} className="px-4 py-2 bg-white/10 rounded-lg">Go Back</button>
                      </div>
                  ) : (
                      <>
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            className="flex-1 w-full h-full object-cover"
                        />
                        {/* Overlay Guide */}
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                             <div className="w-64 h-64 border-2 border-white/50 rounded-2xl relative">
                                 <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-yellow-400 -mt-1 -ml-1 rounded-tl-lg"></div>
                                 <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-yellow-400 -mt-1 -mr-1 rounded-tr-lg"></div>
                                 <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-yellow-400 -mb-1 -ml-1 rounded-bl-lg"></div>
                                 <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-yellow-400 -mb-1 -mr-1 rounded-br-lg"></div>
                             </div>
                        </div>

                        {/* Camera Controls */}
                        <div className="absolute bottom-0 w-full p-8 pb-12 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center gap-10">
                            <button onClick={() => setMode('TEXT')} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                <X size={24} />
                            </button>
                            <button 
                                onClick={handleCapture} 
                                className="w-20 h-20 bg-white rounded-full border-4 border-slate-300 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                            >
                                <div className="w-16 h-16 bg-white border-4 border-slate-900 rounded-full"></div>
                            </button>
                            <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors opacity-50 cursor-not-allowed">
                                <ImageIcon size={24} />
                            </button>
                        </div>
                      </>
                  )}
              </div>
          )}

          {/* TEXT / RESULT MODE */}
          {mode !== 'CAMERA' && (
             <div className="flex-1 flex flex-col bg-slate-50 rounded-t-[2rem] mt-4 text-slate-900 overflow-hidden relative shadow-2xl">
                 <div className="flex-1 overflow-y-auto p-6 no-scrollbar pb-32">
                     
                     {/* Empty State */}
                     {!solution && !capturedImage && !isAnalyzing && (
                         <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60 mt-10">
                             <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-2 shadow-inner">
                                 <Sparkles size={48} />
                             </div>
                             <h3 className="text-xl font-bold">Stuck on a problem?</h3>
                             <p className="text-sm max-w-xs leading-relaxed text-slate-500">
                                 Snap a photo or type your question below.<br/>Isus will break it down step-by-step.
                             </p>
                             <button 
                                onClick={() => setMode('CAMERA')} 
                                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-300 active:scale-95"
                             >
                                 <Camera size={20} /> Open Camera
                             </button>
                         </div>
                     )}

                     {/* Captured Image Preview */}
                     {capturedImage && (
                         <div className="relative w-full h-48 bg-black rounded-2xl overflow-hidden mb-6 shadow-md shrink-0 group">
                             <img src={capturedImage} alt="Captured" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                             <button 
                                onClick={() => { setCapturedImage(null); setSolution(null); }}
                                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                             >
                                 <X size={16} />
                             </button>
                         </div>
                     )}

                     {/* Analyzing State */}
                     {isAnalyzing && (
                         <div className="flex flex-col items-center justify-center py-10 space-y-4">
                             <div className="relative">
                                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                                <Sparkles size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-600 animate-pulse" />
                             </div>
                             <p className="text-sm font-bold text-slate-500 animate-pulse">Analyzing problem...</p>
                         </div>
                     )}

                     {/* Solution Output */}
                     {solution && !isAnalyzing && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 mb-6">
                                  <div className="flex items-center gap-2 mb-4 text-emerald-600 font-bold uppercase tracking-wide text-xs">
                                      <Check size={16} /> Step-by-Step Solution
                                  </div>
                                  <div className="prose prose-sm prose-slate max-w-none prose-headings:font-bold prose-p:text-slate-600 prose-strong:text-slate-900">
                                     <div dangerouslySetInnerHTML={{ __html: solution.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                                  </div>
                             </div>
                             
                             <div className="flex gap-3">
                                 <button onClick={reset} className="flex-1 py-4 text-slate-500 font-bold text-xs bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                                     <RefreshCw size={14} /> Solve Another
                                 </button>
                             </div>
                        </div>
                     )}
                 </div>

                 {/* Input Area */}
                 <div className="absolute bottom-0 w-full p-4 bg-white border-t border-slate-100 z-20">
                     <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-[2rem] shadow-inner focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                         <button 
                            onClick={() => setMode('CAMERA')} 
                            className={`p-3 rounded-full transition-all ${capturedImage ? 'text-primary-600 bg-primary-100' : 'text-slate-500 hover:bg-white hover:shadow-sm'}`}
                            title="Take Photo"
                        >
                             <Camera size={20} />
                         </button>
                         <input 
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={capturedImage ? "Add context (optional)..." : "Type your question..."}
                            className="flex-1 bg-transparent outline-none text-sm font-medium px-2 text-slate-800 placeholder:text-slate-400"
                            onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
                            disabled={isAnalyzing}
                         />
                         <button 
                            onClick={handleSolve}
                            disabled={(!input.trim() && !capturedImage) || isAnalyzing}
                            className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 transition-all shadow-md active:scale-95 disabled:active:scale-100 flex items-center justify-center"
                         >
                             {isAnalyzing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={18} />}
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
