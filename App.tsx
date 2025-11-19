
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Globe, Activity, AlertTriangle, 
  LayoutGrid, Star, Camera, FileText, MessageCircleHeart, 
  Smile, Cpu, MapPin, TrendingUp, Briefcase, Zap, CheckCircle, Heart, Users, GraduationCap, Mic,
  Siren, Leaf, HeartHandshake, Plane, Pill, ShieldCheck
} from 'lucide-react';
import Globe3D from './components/Globe3D';
import GeminiAnalyzer from './components/GeminiAnalyzer';
import { getChatResponse } from './services/geminiService';
import { SLIDES } from './constants';
import { SlideType, SlideData } from './types';

// Icon Map
const IconMap: Record<string, React.ElementType> = {
  Activity, AlertTriangle, LayoutGrid, Star, Camera, FileText,
  MessageCircleHeart, Globe, Smile, Cpu, MapPin, TrendingUp,
  Briefcase, Zap, CheckCircle, Heart, Mic, Users, Plane
};

// --- Custom Animated Graphics Components ---

const PulseGraphic = () => (
  <div className="w-full h-full flex items-center justify-center bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl border border-slate-800">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
    <svg viewBox="0 0 500 200" className="w-full px-8 relative z-10">
      <motion.path
        d="M0 100 L100 100 L120 40 L140 160 L160 100 L200 100 L220 20 L240 180 L260 100 L500 100"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M0 100 L100 100 L120 40 L140 160 L160 100 L200 100 L220 20 L240 180 L260 100 L500 100"
        fill="none"
        stroke="#5eead4"
        strokeWidth="2"
        className="blur-sm"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
    <div className="absolute top-6 right-6 flex gap-2">
       <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
       <span className="text-xs font-mono text-teal-400">LIVE VITAL SIGNS</span>
    </div>
  </div>
);

const ScanningGraphic = () => (
  <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-3xl overflow-hidden relative shadow-xl border border-white">
     {/* Indoor Room Image - Living Room for broad context */}
     <img 
        src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80" 
        alt="Indoor Scanning Environment"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
     />
     <div className="absolute inset-0 bg-slate-900/30" />
     
     {/* Scanning Line */}
     <motion.div 
       className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)] z-10"
       animate={{ top: ["0%", "100%", "0%"] }}
       transition={{ duration: 4, ease: "linear", repeat: Infinity }}
     />

     {/* Detection Boxes - Indoor Specific */}
     <motion.div 
        className="absolute top-1/3 left-1/4 border-2 border-red-500 bg-red-500/40 p-2 rounded text-xs text-white font-bold backdrop-blur-sm shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0.2, 0.3, 0.7, 0.8] }}
     >
       ⚠️ DUST MITES DETECTED
     </motion.div>
     <motion.div 
        className="absolute bottom-1/4 right-1/3 border-2 border-yellow-400 bg-yellow-400/40 p-2 rounded text-xs text-white font-bold backdrop-blur-sm shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2, times: [0.2, 0.3, 0.7, 0.8] }}
     >
       ⚠️ HIGH HUMIDITY / MOLD
     </motion.div>
  </div>
);

const PrescriptionGraphic = () => (
  <div className="w-full h-full flex items-center justify-center bg-teal-50 rounded-3xl relative shadow-inner overflow-hidden">
     {/* Complex Doc (Background) */}
     <motion.div 
       className="absolute w-48 h-64 bg-white shadow-sm border border-slate-200 p-4 text-[6px] text-slate-400 overflow-hidden"
       animate={{ x: -120, rotate: -10, opacity: 0.5, scale: 0.9 }}
       transition={{ duration: 0.8 }}
     >
        <div className="space-y-2">
           <div className="w-full h-2 bg-slate-200 rounded" />
           <div className="w-3/4 h-2 bg-slate-200 rounded" />
           <div className="space-y-1 mt-4">
             {[...Array(10)].map((_,i) => <div key={i} className="w-full h-1 bg-slate-100" />)}
           </div>
        </div>
     </motion.div>

     {/* Simple Card (Foreground) */}
     <motion.div 
       className="absolute w-56 h-72 bg-white shadow-2xl border border-teal-100 rounded-2xl p-6 flex flex-col z-10"
       initial={{ x: 100, opacity: 0 }}
       animate={{ x: 40, opacity: 1, rotate: 5 }}
       transition={{ duration: 0.8, delay: 0.3 }}
     >
        <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-2">
           <div className="p-2 bg-teal-100 rounded-lg text-teal-600"><FileText size={16} /></div>
           <span className="font-bold text-slate-700">Rx Simplified</span>
        </div>
        <div className="space-y-3">
           <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span className="text-sm font-medium text-slate-600">Amoxicillin</span>
           </div>
           <div className="text-xs text-slate-400 pl-6">1 Tablet • After Food • 5 Days</div>
           
           <div className="flex items-center gap-2 mt-2">
              <CheckCircle size={16} className="text-green-500" />
              <span className="text-sm font-medium text-slate-600">Hydration</span>
           </div>
           <div className="text-xs text-slate-400 pl-6">3 Liters/Day</div>
        </div>
        <div className="mt-auto pt-4">
           <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-teal-500" />
           </div>
        </div>
     </motion.div>
  </div>
);

const TechStackGraphic = () => (
  <div className="w-full h-full flex items-center justify-center bg-slate-900 rounded-3xl relative shadow-2xl border border-slate-700 overflow-hidden">
     <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#38b2ac_0,transparent_70%)]" />
     
     {/* Central Node */}
     <div className="relative z-10">
        <motion.div 
          className="w-24 h-24 rounded-full bg-teal-500/20 border-2 border-teal-400 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.5)]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
           <Cpu className="text-teal-200 w-10 h-10" />
        </motion.div>
     </div>

     {/* Orbiting Nodes */}
     {[0, 1, 2, 3].map((i) => (
       <motion.div
         key={i}
         className="absolute"
         animate={{ rotate: 360 }}
         transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: -i * 5 }}
         style={{ width: '100%', height: '100%' }}
       >
          <motion.div 
            className="absolute top-1/4 left-1/2 w-12 h-12 -ml-6 rounded-xl bg-slate-800 border border-slate-600 flex items-center justify-center text-white shadow-lg"
            style={{ transformOrigin: '50% 150px' }} // Trick for orbiting
            animate={{ rotate: -360 }} // Counter rotate to keep upright
            transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: -i * 5 }}
          >
             {i === 0 ? <Activity size={20} /> : i === 1 ? <Globe size={20} /> : i === 2 ? <Zap size={20} /> : <Smile size={20} />}
          </motion.div>
       </motion.div>
     ))}
  </div>
);

const TravelGraphic = () => (
  <div className="w-full h-full flex items-center justify-center bg-blue-50 rounded-3xl relative shadow-xl border border-blue-100 overflow-hidden">
     {/* Map Background Effect */}
     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
     
     {/* Animated Planes */}
     <motion.div 
       className="absolute top-1/3 left-0"
       animate={{ x: [ -50, 400], y: [0, -50] }}
       transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
     >
        <Plane className="text-blue-300 w-8 h-8 rotate-[-15deg]" />
     </motion.div>
     <motion.div 
       className="absolute bottom-1/4 right-0"
       animate={{ x: [ 50, -400], y: [0, -20] }}
       transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 2 }}
     >
        <Plane className="text-blue-200 w-6 h-6 rotate-[195deg]" />
     </motion.div>

     {/* Central Pharma Shield Card */}
     <motion.div 
       className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl border border-blue-100 flex flex-col items-center gap-4 max-w-[200px]"
       initial={{ scale: 0.9, y: 10 }}
       animate={{ scale: 1, y: 0 }}
       transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
     >
        <div className="flex items-center gap-3">
           <div className="p-2.5 bg-green-100 rounded-xl text-green-600 shadow-inner">
              <Pill size={28} />
           </div>
           <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600 shadow-inner">
              <ShieldCheck size={28} />
           </div>
        </div>
        <div className="text-center space-y-1">
           <div className="font-bold text-slate-700 text-sm uppercase tracking-wide">Health Verified</div>
           <div className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">Partner: PharmaPlus</div>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
           <motion.div 
             className="bg-green-500 h-full rounded-full" 
             initial={{ width: "0%" }}
             animate={{ width: "100%" }}
             transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
           />
        </div>
     </motion.div>
  </div>
);

const SlideGraphic = ({ slide }: { slide: SlideData }) => {
  // Determine which custom graphic to show based on slide content
  if (slide.title.includes("Introduction")) return <PulseGraphic />;
  if (slide.title.includes("Invisible Threat") || slide.title.includes("Problem")) return <ScanningGraphic />;
  if (slide.title.includes("Prescription")) return <PrescriptionGraphic />;
  if (slide.title.includes("Travel Shield")) return <TravelGraphic />;
  if (slide.title.includes("Technology") || slide.title.includes("Competitive")) return <TechStackGraphic />;
  if (slide.title.includes("Future")) return <TechStackGraphic />; // Re-use cool tech graphic

  // Default Generic but polished graphic
  const Icon = IconMap[slide.icon || 'Activity'] || Activity;
  return (
    <div className="w-full aspect-square max-w-md bg-gradient-to-br from-white to-teal-50/50 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex items-center justify-center relative overflow-hidden border border-white/60 backdrop-blur-sm group">
       <div className="absolute inset-0 bg-[radial-gradient(#38b2ac_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]" />
       
       <motion.div
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ duration: 0.8 }}
         className="relative z-10 p-8 rounded-3xl bg-white/80 shadow-lg border border-white"
       >
         <Icon size={80} className="text-teal-500 drop-shadow-lg" strokeWidth={1.5} />
       </motion.div>
       
       {/* Floating abstract shapes */}
       <motion.div 
         className="absolute top-10 right-10 w-16 h-16 bg-teal-200/20 rounded-full blur-xl"
         animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
         transition={{ duration: 4, repeat: Infinity }}
       />
       <motion.div 
         className="absolute bottom-12 left-12 w-24 h-24 bg-cyan-200/20 rounded-full blur-xl"
         animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
         transition={{ duration: 5, repeat: Infinity, delay: 1 }}
       />
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = SLIDES[currentSlideIndex];
  const TotalSlides = SLIDES.length;

  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([
    {role: 'model', text: 'Hi! I am GeoSick AI. How are you feeling today?'}
  ]);
  const [isChatting, setIsChatting] = useState(false);

  const nextSlide = () => {
    if (currentSlideIndex < TotalSlides - 1) setCurrentSlideIndex(p => p + 1);
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(p => p - 1);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatting(true);
    
    // Format history for API
    const apiHistory = chatHistory.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
    }));

    const response = await getChatResponse(userMsg, apiHistory);
    setChatHistory(prev => [...prev, { role: 'model', text: response }]);
    setIsChatting(false);
  };

  // Animation Variants
  const pageVariants = {
    initial: { opacity: 0, filter: 'blur(10px)', scale: 0.98 },
    in: { opacity: 1, filter: 'blur(0px)', scale: 1 },
    out: { opacity: 0, filter: 'blur(10px)', scale: 1.02 }
  };

  const pageTransition = {
    type: "spring",
    stiffness: 50,
    damping: 20
  };

  const SlideIcon = IconMap[slide.icon || ''] || Activity;

  return (
    <div className={`w-screen h-screen overflow-hidden relative transition-colors duration-700 font-sans ${slide.isDark ? 'bg-[#020205] text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Persistent 3D Globe Background - Title Slide or Globe Slide */}
      <AnimatePresence>
        {(slide.isDark || slide.id === 10) && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <Globe3D darkMode={slide.isDark} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 z-50 flex gap-4 items-center">
        <button onClick={prevSlide} disabled={currentSlideIndex === 0} className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 disabled:opacity-0 transition border border-white/20 shadow-lg group">
          <ChevronLeft className={slide.isDark ? "text-white" : "text-slate-800"} />
        </button>
        <div className={`px-4 py-1.5 rounded-full backdrop-blur-md border ${slide.isDark ? "bg-white/5 border-white/10 text-white/80" : "bg-slate-200/50 border-slate-300/50 text-slate-600"} font-mono text-sm`}>
          {currentSlideIndex + 1} <span className="opacity-50">/</span> {TotalSlides}
        </div>
        <button onClick={nextSlide} disabled={currentSlideIndex === TotalSlides - 1} className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 disabled:opacity-0 transition border border-white/20 shadow-lg">
          <ChevronRight className={slide.isDark ? "text-white" : "text-slate-800"} />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full h-full flex flex-col p-6 md:p-12 lg:p-16 pointer-events-none">
        <div className="pointer-events-auto w-full h-full flex flex-col justify-center">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlideIndex}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full h-full flex items-center"
          >
            {/* TITLE SLIDE - Preserved Layout */}
            {slide.type === SlideType.TITLE && (
              <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center h-full">
                <div className="text-left space-y-8 z-20 flex flex-col justify-center">
                  
                  {/* University Header */}
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-3 mb-2"
                  >
                     <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md shadow-lg">
                       <GraduationCap className="text-teal-400 w-7 h-7" />
                     </div>
                     <h3 className="text-xl md:text-2xl font-heading font-bold text-white tracking-wider uppercase drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                       Malla Reddy University
                     </h3>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h1 className="text-8xl md:text-9xl font-heading font-extrabold tracking-tighter mb-2 leading-none">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-cyan-300 to-blue-500 drop-shadow-[0_0_40px_rgba(20,184,166,0.4)]">
                        {slide.title}
                      </span>
                    </h1>
                    
                    <div className="h-2 w-24 bg-gradient-to-r from-teal-400 to-blue-500 mt-8 mb-8 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.8)]" />
                    
                    <h2 className="text-3xl md:text-4xl font-light text-white leading-relaxed drop-shadow-md max-w-xl">
                      {slide.subtitle}
                    </h2>
                  </motion.div>
                  
                  {/* Team Member Box */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pt-4"
                  >
                    <div className="backdrop-blur-xl bg-slate-900/60 border border-teal-500/30 rounded-2xl p-6 shadow-2xl w-full max-w-md hover:bg-slate-900/70 transition-colors duration-500 group">
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-teal-500/20">
                        <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.2)]">
                           <Users size={18} />
                        </div>
                        <h3 className="text-teal-100 text-xs font-bold uppercase tracking-[0.25em] group-hover:text-teal-400 transition-colors">Project Team</h3>
                      </div>
                      <div className="space-y-2.5">
                        {slide.content?.map((member, i) => (
                          <div key={i} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300 font-mono text-sm">
                             <div className="w-1.5 h-1.5 rounded-full bg-teal-50 shadow-[0_0_8px_rgba(20,184,166,0.6)]"></div>
                             <span className="tracking-tight">{member}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="hidden md:block" /> 
              </div>
            )}

            {/* CONTENT SLIDES with Custom Graphics */}
            {(slide.type === SlideType.CONTENT_LEFT || slide.type === SlideType.CONTENT_RIGHT) && (
              <div className={`w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 ${slide.type === SlideType.CONTENT_RIGHT ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Text Block */}
                <div className="flex-1 space-y-8">
                  <div className="inline-flex items-center gap-3 p-3 pl-4 pr-6 rounded-2xl bg-white shadow-sm border border-slate-100 text-teal-600 mb-2">
                    <SlideIcon size={28} />
                    <span className="font-bold uppercase tracking-wider text-sm">{slide.type === SlideType.CONTENT_RIGHT ? 'Solution' : 'Overview'}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-5xl lg:text-6xl font-heading font-bold text-slate-800 leading-[1.1] tracking-tight">{slide.title}</h2>
                    {slide.subtitle && <p className="text-2xl text-teal-600 font-medium">{slide.subtitle}</p>}
                  </div>

                  <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                    {slide.content?.map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center mt-1 shrink-0 text-teal-600">
                           <CheckCircle size={14} />
                        </div>
                        <p>{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Graphic Block */}
                <div className="flex-1 flex justify-center w-full max-w-lg aspect-square">
                  <SlideGraphic slide={slide} />
                </div>
              </div>
            )}

            {/* CENTERED SLIDES */}
            {slide.type === SlideType.CENTERED && (
              <div className="w-full max-w-5xl mx-auto text-center space-y-10">
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="inline-flex p-6 rounded-[2rem] bg-gradient-to-tr from-teal-50 to-white shadow-xl border border-white text-teal-600 mb-4"
                >
                   <SlideIcon size={64} strokeWidth={1.5} />
                </motion.div>
                <h2 className="text-6xl font-heading font-bold text-slate-800 tracking-tight">{slide.title}</h2>
                <div className="grid gap-6 text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  {slide.content?.map((item, i) => (
                    <p key={i} className="bg-white/50 p-4 rounded-xl border border-transparent hover:border-teal-100 transition">{item}</p>
                  ))}
                </div>
              </div>
            )}

             {/* PROCESS */}
             {slide.type === SlideType.PROCESS && (
               <div className="w-full max-w-7xl mx-auto space-y-16">
                  <div className="text-center space-y-4">
                    <h2 className="text-5xl font-heading font-bold text-slate-800">{slide.title}</h2>
                    <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full" />
                  </div>
                  <div className={`grid grid-cols-1 ${slide.content?.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-8 relative`}>
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-10" />
                    
                    {slide.content?.map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="relative flex flex-col items-center text-center group"
                      >
                        <div className="w-24 h-24 rounded-3xl bg-white border-2 border-slate-100 flex items-center justify-center font-bold text-2xl mb-6 shadow-xl z-10 group-hover:scale-110 group-hover:border-teal-500 group-hover:shadow-teal-200 transition-all duration-500">
                          <span className="text-slate-300 group-hover:text-teal-600 transition-colors">0{i + 1}</span>
                        </div>
                        <h3 className="font-semibold text-lg text-slate-800 max-w-[200px] leading-tight">{item}</h3>
                      </motion.div>
                    ))}
                  </div>
               </div>
             )}

            {/* GRID SLIDES */}
            {slide.type === SlideType.GRID && (
              <div className="w-full max-w-6xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                   <div className="inline-block p-2 px-4 rounded-full bg-teal-50 text-teal-700 text-sm font-bold uppercase tracking-wider">Features</div>
                   <h2 className="text-5xl font-heading font-bold text-slate-800">{slide.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {slide.content?.map((item, i) => {
                    // Dynamic Icon Mapping for Grid Slides
                    const getGridIcon = (index: number) => {
                        // Slide 6: Core Capabilities
                        if (slide.id === 6) {
                            const icons = [Camera, Activity, FileText, Globe, Mic, MapPin];
                            return icons[index] || Zap;
                        }
                        // Slide 11: Community Impact
                        if (slide.id === 11) {
                            const icons = [Siren, Users, Leaf, HeartHandshake];
                            return icons[index] || Users;
                        }
                        // Slide 16: Business Model
                        if (slide.id === 16) {
                            const icons = [MessageCircleHeart, Zap, Briefcase, HeartHandshake];
                            return icons[index] || Briefcase;
                        }
                        // Fallback for other grid slides
                        const genericIcons = [Activity, Globe, Smile, Zap];
                        return genericIcons[index] || Zap;
                    };
                    const GridIcon = getGridIcon(i);

                    return (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group flex items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-teal-100 transition-all duration-300"
                    >
                      <div className="p-4 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-teal-500 group-hover:text-white transition-colors mr-5 duration-300">
                        <GridIcon size={24}/>
                      </div>
                      <span className="text-xl font-medium text-slate-700 group-hover:text-slate-900">{item}</span>
                    </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* DEMO: ANALYSIS */}
            {slide.type === SlideType.DEMO_ANALYSIS && (
              <div className="w-full max-w-5xl mx-auto space-y-8">
                 <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold text-slate-800">{slide.title}</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">{slide.subtitle}</p>
                 </div>
                 <GeminiAnalyzer />
              </div>
            )}

            {/* DEMO: CHAT */}
            {slide.type === SlideType.DEMO_CHAT && (
              <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mb-4">
                     <MessageCircleHeart size={32} />
                  </div>
                  <h2 className="text-5xl font-bold text-slate-800 leading-tight">{slide.title}</h2>
                  <p className="text-xl text-slate-600">{slide.subtitle}</p>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                       <CheckCircle size={20} className="text-teal-500"/> 
                       <span className="font-medium">Anxiety & Stress Monitoring</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                       <CheckCircle size={20} className="text-teal-500"/> 
                       <span className="font-medium">Personalized Wellness Tips</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 h-[600px] flex flex-col relative">
                   {/* Chat Header */}
                   <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-5 text-white flex items-center justify-between shadow-md z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><MessageCircleHeart size={20}/></div>
                        <div>
                          <div className="font-bold text-lg">GeoSick Assistant</div>
                          <div className="text-xs text-teal-100 flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/> Online</div>
                        </div>
                      </div>
                   </div>
                   {/* Chat Body */}
                   <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50 scroll-smooth">
                      {chatHistory.map((msg, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                           <div className={`max-w-[85%] p-4 rounded-2xl text-base leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'}`}>
                             {msg.text}
                           </div>
                        </motion.div>
                      ))}
                      {isChatting && (
                        <div className="flex items-center gap-2 text-slate-400 text-sm ml-2">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"/>
                            <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-75"/>
                            <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-150"/>
                          </div>
                        </div>
                      )}
                   </div>
                   {/* Chat Input */}
                   <div className="p-4 bg-white border-t border-slate-100 flex gap-3 items-center">
                     <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                        placeholder="Ask about your symptoms..."
                        className="flex-1 bg-slate-100 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                     />
                     <button onClick={handleChatSend} className="p-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition shadow-lg hover:shadow-teal-500/30">
                       <ChevronRight size={24} />
                     </button>
                   </div>
                </div>
              </div>
            )}

            {/* CLOSING */}
            {slide.type === SlideType.CLOSING && (
              <div className="w-full max-w-4xl mx-auto text-center space-y-10">
                <motion.div 
                   animate={{ scale: [1, 1.05, 1] }} 
                   transition={{ repeat: Infinity, duration: 3 }}
                   className="inline-block p-10 rounded-full bg-teal-50 text-teal-500 mb-4 shadow-lg border border-teal-100"
                >
                  <Heart size={80} fill="#14b8a6" className="text-teal-500" />
                </motion.div>
                <div>
                  <h2 className="text-7xl font-heading font-bold text-slate-800 tracking-tight mb-4">{slide.title}</h2>
                  <p className="text-3xl text-teal-600 font-light">{slide.subtitle}</p>
                </div>
                <div className="flex flex-col gap-3 pt-8">
                  {slide.content?.map((item, i) => (
                    <span key={i} className="text-xl font-mono text-slate-500 hover:text-teal-600 transition cursor-pointer">{item}</span>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
        </div>
      </main>
      
      {/* Subtle Background Watermark for non-dark slides */}
      {!slide.isDark && (
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-teal-50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />
      )}
    </div>
  );
};

export default App;
