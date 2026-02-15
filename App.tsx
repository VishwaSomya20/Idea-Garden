
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Volume2, VolumeX, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import IdeaPanel from './components/IdeaPanel';
import Garden from './components/Garden';
import FlowerModal from './components/FlowerModal';
import { Idea } from './types';

const STORAGE_KEY = 'idea_garden_save_v9';
const BLOOM_SOUND_URL = 'https://assets.mixkit.co/sfx/preview/mixkit-fantasy-magic-sparkle-3011.mp3';

const App: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const bloomSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Entry delay for a calm book-opening feel
    const timer = setTimeout(() => setIsLoaded(true), 2500);

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setIdeas(parsed.map((i: Idea) => ({ ...i, isNew: false })));
        if (parsed.length > 0 && window.innerWidth < 768) {
          setIsPanelExpanded(false);
        }
      } catch (e) {
        console.error("Failed to load ideas", e);
      }
    }
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
  }, [ideas]);

  const handleBloom = useCallback((data: { title: string; description: string; flowerType: string; flowerImage?: string }) => {
    const newIdea: Idea = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      description: data.description,
      date: new Date().toLocaleDateString(),
      x: 22 + Math.random() * 56,
      y: 22 + Math.random() * 56,
      flowerType: data.flowerType,
      flowerImage: data.flowerImage,
      scale: 1.1 + Math.random() * 0.25,
      isNew: true,
    };

    setIdeas(prev => [...prev, newIdea]);
    
    // Play bloom sound
    if (!isMuted && bloomSoundRef.current) {
      bloomSoundRef.current.currentTime = 0;
      bloomSoundRef.current.play().catch(e => console.warn("Audio play blocked", e));
    }
    
    // Duration matches the marble + pop animation
    setTimeout(() => {
      setIdeas(prev => prev.map(i => i.id === newIdea.id ? { ...i, isNew: false } : i));
    }, 3500);

    setTimeout(() => setIsPanelExpanded(false), 1200);
  }, [isMuted]);

  return (
    <div className="h-screen w-full bg-[#ffffff] flex flex-col md:flex-row overflow-hidden relative font-comic select-none">
      {/* Hidden audio for bloom sound */}
      <audio ref={bloomSoundRef} src={BLOOM_SOUND_URL} preload="auto" />

      {/* Ambient background colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute bottom-[-5%] left-[-5%] w-[60%] h-[60%] bg-[#90be6d] rounded-full blur-[180px] opacity-15" />
        <div className="absolute top-[-5%] right-[-5%] w-[50%] h-[50%] bg-[#277da1] rounded-full blur-[150px] opacity-10" />
      </div>

      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 bg-[#90be6d] rounded-2xl animate-pulse" />
              <h2 className="text-[#4d908e] font-bold text-xl tracking-[0.3em] uppercase">Opening the Garden...</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative flex-1 flex flex-col md:flex-row h-full z-10 overflow-hidden">
        
        <AnimatePresence>
          {!isPanelExpanded && isLoaded && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0, x: 50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.8, opacity: 0, x: 50 }}
              onClick={() => setIsPanelExpanded(true)}
              className="fixed top-8 right-8 z-[60] px-8 py-4 bg-[#277da1] text-white rounded-full shadow-2xl flex items-center gap-3 hover:bg-[#43aa8b] transition-all border-2 border-white font-bold text-base group active:scale-95"
            >
              <Plus size={24} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
              <span>Plant an Idea</span>
            </motion.button>
          )}
        </AnimatePresence>

        <div className={`
          absolute md:relative z-50 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isPanelExpanded 
            ? 'inset-0 flex items-center justify-center bg-white/40 backdrop-blur-md md:bg-transparent md:backdrop-blur-none md:w-[500px] md:inset-auto md:h-full md:p-12 md:border-r md:border-gray-50' 
            : 'pointer-events-none opacity-0 translate-x-[-150px] md:w-0 md:p-0'
          }
        `}>
          <motion.div
            layout
            initial={{ opacity: 0, x: -30 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-full max-w-sm pointer-events-auto"
          >
             <IdeaPanel onBloom={handleBloom} onMinimize={() => setIsPanelExpanded(false)} showClose={ideas.length > 0} />
          </motion.div>
        </div>

        <motion.section 
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={isLoaded ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.9, rotate: 2 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
          className={`
            flex-1 h-full items-center justify-center p-8 md:p-24 overflow-visible relative flex transition-all duration-1000
            ${isPanelExpanded && window.innerWidth < 768 ? 'opacity-20 blur-md scale-95' : 'opacity-100 blur-0 scale-100'}
          `}
        >
          <Garden ideas={ideas} onFlowerClick={setSelectedIdea} />
        </motion.section>
      </main>

      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-5 shadow-xl rounded-full border-2 border-white transition-all hover:scale-110 active:scale-95 group ${isMuted ? 'bg-white text-gray-400' : 'bg-[#43aa8b] text-white'}`}
        >
          {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} className="animate-pulse" />}
        </button>
      </div>

      <FlowerModal idea={selectedIdea} onClose={() => setSelectedIdea(null)} />

      {!isMuted && (
        <audio
          autoPlay
          loop
          src="https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3"
          className="hidden"
        />
      )}
    </div>
  );
};

export default App;
