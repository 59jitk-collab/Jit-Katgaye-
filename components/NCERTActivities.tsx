import React, { useState, useEffect } from 'react';
import { ChevronLeft, FlaskConical, Microscope, FileText, CheckCircle, Zap, Move, Rotate3d, PlayCircle, Flame } from 'lucide-react';
import { MOCK_ACTIVITIES } from '../constants';
import { Activity } from '../types';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface NCERTActivitiesProps {
  onBack: () => void;
}

// --- Visualizer Components ---

const ChemistryBurnVisualizer: React.FC = () => {
    const [isBurning, setIsBurning] = useState(false);
    
    const burn = () => {
        setIsBurning(true);
        setTimeout(() => setIsBurning(false), 4000);
    };

    return (
        <div className="w-full h-64 bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col items-center justify-end pb-8 border border-slate-700 shadow-inner">
             <div className="absolute top-4 left-4 bg-white/10 px-3 py-1 rounded-full text-[10px] text-white font-bold backdrop-blur-sm">Interactive Lab</div>
             
             {/* Bunsen Burner */}
             <div className="relative z-10 flex flex-col items-center">
                 {/* Flame */}
                 <motion.div 
                    animate={{ 
                        scaleY: [1, 1.2, 1], 
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ repeat: Infinity, duration: 0.2 }}
                    className="w-8 h-24 bg-gradient-to-t from-blue-600 via-blue-400 to-transparent rounded-t-full origin-bottom blur-sm -mb-2"
                 />
                 <div className="w-12 h-20 bg-slate-600 rounded-t-lg border-x-4 border-slate-500 relative"></div>
                 <div className="w-24 h-4 bg-slate-700 rounded-full"></div>
             </div>

             {/* Tongs & Ribbon */}
             <motion.div 
                animate={isBurning ? { y: 20, rotate: 5 } : { y: 0, rotate: 0 }}
                className="absolute top-10 right-20 w-48 h-8 flex items-center origin-right cursor-pointer group"
                onClick={burn}
             >
                 {/* Hand/Tongs */}
                 <div className="w-32 h-2 bg-slate-400 rotate-12 absolute right-0 rounded-full"></div>
                 <div className="w-32 h-2 bg-slate-400 -rotate-12 absolute right-0 rounded-full"></div>
                 
                 {/* Magnesium Ribbon */}
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 w-20 h-1 bg-slate-300 rounded-full group-hover:bg-white transition-colors"></div>
                 
                 {/* Burning Effect */}
                 {isBurning && (
                     <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 5, 2], opacity: [1, 0.8, 0] }}
                        transition={{ duration: 1.5 }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full blur-md shadow-[0_0_50px_20px_rgba(255,255,255,0.8)] z-20"
                     />
                 )}
                 
                 {/* Ash Dropping */}
                 {isBurning && (
                      <motion.div 
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: 150, opacity: 0 }}
                        transition={{ delay: 1, duration: 2 }}
                        className="absolute left-4 top-4 w-4 h-4 bg-white rounded-full blur-sm"
                      />
                 )}
             </motion.div>
             
             {/* Watch Glass */}
             <div className="absolute bottom-4 left-20 w-24 h-4 bg-white/20 rounded-b-full border-b-2 border-white/40 flex items-center justify-center overflow-hidden">
                  {isBurning && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                        className="w-12 h-2 bg-white rounded-full blur-sm mt-2"
                      />
                  )}
             </div>

             {!isBurning && (
                 <button onClick={burn} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-xs shadow-lg flex items-center gap-2 animate-bounce z-30">
                     <Flame size={14} className="fill-orange-500 text-orange-500"/> Tap to Burn
                 </button>
             )}
        </div>
    );
}

const ChemistryBubbleVisualizer: React.FC = () => {
    const [isReacting, setIsReacting] = useState(false);

    return (
        <div className="w-full h-64 bg-cyan-900/20 rounded-2xl relative overflow-hidden flex items-center justify-center border border-cyan-100">
             <div className="absolute top-4 left-4 bg-white/80 px-3 py-1 rounded-full text-[10px] text-cyan-900 font-bold backdrop-blur-sm">Reaction Chamber</div>

             {/* Test Tube */}
             <div className="w-24 h-48 border-4 border-white/50 border-t-0 rounded-b-full relative overflow-hidden bg-white/5 backdrop-blur-sm">
                 {/* Acid Liquid */}
                 <div className="absolute bottom-0 w-full h-3/4 bg-cyan-400/20"></div>
                 
                 {/* Zinc Granules */}
                 <div className="absolute bottom-4 left-4 w-4 h-4 bg-slate-400 rounded-full shadow-inner"></div>
                 <div className="absolute bottom-3 right-6 w-5 h-5 bg-slate-400 rounded-full shadow-inner"></div>
                 <div className="absolute bottom-6 left-8 w-3 h-3 bg-slate-400 rounded-full shadow-inner"></div>

                 {/* Bubbles */}
                 {isReacting && (
                     <>
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: -150, opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1 + Math.random(), delay: Math.random() }}
                                className="absolute bottom-4 left-1/2 w-3 h-3 bg-white/80 rounded-full blur-[1px]"
                                style={{ marginLeft: (Math.random() * 40 - 20) + 'px' }}
                            />
                        ))}
                     </>
                 )}
             </div>

             <button 
                onClick={() => setIsReacting(!isReacting)} 
                className={`absolute bottom-6 right-6 px-4 py-2 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center gap-2 ${isReacting ? 'bg-red-50 text-red-600' : 'bg-white text-cyan-700'}`}
             >
                 {isReacting ? 'Stop Reaction' : 'Add Zinc'}
                 <FlaskConical size={14} />
             </button>
        </div>
    )
}

const Biology3DPlantVisualizer: React.FC = () => {
    const [rotation, setRotation] = useState(0);
    const controls = useAnimation();

    const handlePan = (event: any, info: any) => {
        setRotation(rotation + info.delta.x);
    };

    return (
        <div className="w-full h-64 bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl relative overflow-hidden flex items-center justify-center border border-emerald-100 cursor-grab active:cursor-grabbing touch-none">
             <div className="absolute top-4 left-4 bg-white/80 px-3 py-1 rounded-full text-[10px] text-emerald-900 font-bold backdrop-blur-sm z-10 flex items-center gap-1">
                 <Rotate3d size={12} /> Drag to Rotate 3D
             </div>
             
             {/* 3D Scene Container */}
             <div className="perspective-1000 w-full h-full flex items-center justify-center">
                 <motion.div 
                    className="w-32 h-40 relative preserve-3d"
                    style={{ rotateY: rotation, transformStyle: 'preserve-3d' }}
                    onPan={handlePan}
                 >
                     {/* Plant Pot */}
                     <div className="absolute bottom-0 w-24 h-24 bg-orange-700 rounded-b-lg left-4" style={{ transform: 'translateZ(20px)' }}></div>
                     <div className="absolute bottom-0 w-24 h-24 bg-orange-800 rounded-b-lg left-4" style={{ transform: 'rotateY(90deg) translateZ(12px) translateX(-12px)', width: '24px' }}></div>
                     <div className="absolute bottom-0 w-24 h-24 bg-orange-600 rounded-b-lg left-4" style={{ transform: 'translateZ(-20px)' }}></div>
                     <div className="absolute bottom-0 w-24 h-24 bg-orange-800 rounded-b-lg left-4" style={{ transform: 'rotateY(-90deg) translateZ(84px) translateX(12px)', width: '24px' }}></div>

                     {/* Plant Stem */}
                     <div className="absolute bottom-24 left-14 w-4 h-32 bg-green-700" style={{ transform: 'translateZ(0px)' }}></div>
                     
                     {/* Leaf 1 */}
                     <div className="absolute bottom-40 left-16 w-20 h-10 bg-green-500 rounded-tr-3xl rounded-bl-3xl origin-bottom-left" style={{ transform: 'rotate(-20deg) translateZ(5px)' }}></div>
                     
                     {/* Leaf 2 */}
                     <div className="absolute bottom-32 left-12 w-20 h-10 bg-green-600 rounded-tl-3xl rounded-br-3xl origin-bottom-right" style={{ transform: 'rotate(190deg) translateZ(-5px)' }}></div>
                     
                     {/* Bell Jar (Glass) */}
                     <div className="absolute -bottom-4 -left-4 w-40 h-64 bg-blue-100/30 rounded-t-full border-2 border-white/40 shadow-xl backdrop-blur-[1px]" style={{ transform: 'translateZ(40px)' }}>
                         <div className="absolute top-2 left-10 w-10 h-4 bg-white/40 rounded-full blur-md"></div>
                     </div>
                 </motion.div>
             </div>

             <div className="absolute bottom-4 w-full flex justify-center pointer-events-none">
                 <div className="bg-black/5 p-2 rounded-full animate-pulse">
                     <Move size={20} className="text-emerald-700 opacity-50" />
                 </div>
             </div>
        </div>
    )
}


const ActivityVisualizer: React.FC<{ activity: Activity }> = ({ activity }) => {
    switch (activity.visualType) {
        case 'CHEMISTRY_BURN':
            return <ChemistryBurnVisualizer />;
        case 'CHEMISTRY_BUBBLE':
            return <ChemistryBubbleVisualizer />;
        case 'BIOLOGY_3D_PLANT':
            return <Biology3DPlantVisualizer />;
        default:
            return null;
    }
};


// --- Main Component ---

const NCERTActivities: React.FC<NCERTActivitiesProps> = ({ onBack }) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  if (selectedActivity) {
    return (
        <div className="h-full flex flex-col bg-white">
            <div className="flex items-center gap-3 p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
                <button onClick={() => setSelectedActivity(null)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors text-slate-500">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex-1">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{selectedActivity.subject} • {selectedActivity.chapter}</h2>
                    <h1 className="text-sm font-bold text-slate-900 leading-tight">{selectedActivity.title}</h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pb-24 no-scrollbar space-y-6">
                
                {/* Dynamic Visualizer */}
                {selectedActivity.visualType && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <ActivityVisualizer activity={selectedActivity} />
                    </motion.div>
                )}

                {/* Aim */}
                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold uppercase text-xs tracking-wide">
                        <Zap size={16} className="fill-blue-500" /> Aim
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">{selectedActivity.aim}</p>
                </div>

                {/* Materials */}
                <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                        <FlaskConical size={16} /> Materials Required
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedActivity.materials.map((mat, i) => (
                            <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
                                {mat}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Procedure */}
                <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                        <FileText size={16} /> Procedure
                    </h3>
                    <div className="space-y-4 relative">
                        <div className="absolute top-2 bottom-2 left-3 w-0.5 bg-slate-100"></div>
                        {selectedActivity.procedure.map((step, i) => (
                            <div key={i} className="relative pl-8">
                                <div className="absolute left-0 top-0 w-6 h-6 bg-white border-2 border-primary-500 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-600">
                                    {i + 1}
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Conclusion */}
                 <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2 text-emerald-700 font-bold uppercase text-xs tracking-wide">
                        <CheckCircle size={16} className="fill-emerald-500 text-white" /> Conclusion
                    </div>
                    <p className="text-emerald-900 text-sm font-medium leading-relaxed">{selectedActivity.conclusion}</p>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50 overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">NCERT Activities</h2>
      </div>

      <div className="space-y-4">
        {MOCK_ACTIVITIES.map((activity) => (
            <motion.button 
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedActivity(activity)}
                className="w-full bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 text-left group hover:shadow-md transition-all active:scale-[0.99]"
            >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${activity.visualType ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-indigo-50 text-indigo-600'}`}>
                    {activity.visualType === 'BIOLOGY_3D_PLANT' ? <Rotate3d size={24} /> : (activity.visualType ? <FlaskConical size={24} /> : <Microscope size={24} />)}
                </div>
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">{activity.subject}</span>
                    <h3 className="font-bold text-slate-800 text-sm mb-1 leading-snug">{activity.title}</h3>
                    <div className="flex items-center gap-2">
                        <p className="text-xs text-slate-500 line-clamp-1">{activity.aim}</p>
                        {activity.visualType && (
                             <span className="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded flex items-center gap-0.5 whitespace-nowrap">
                                 <PlayCircle size={10} /> 3D Lab
                             </span>
                        )}
                    </div>
                </div>
            </motion.button>
        ))}
      </div>
    </div>
  );
};

export default NCERTActivities;