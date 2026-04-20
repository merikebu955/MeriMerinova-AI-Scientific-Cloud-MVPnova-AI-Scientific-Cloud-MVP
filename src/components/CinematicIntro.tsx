import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Cpu, Brain, Eye, Zap, Bot, X, Play, Heart, User } from 'lucide-react';

export default function CinematicIntro() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [welcomeIndex, setWelcomeIndex] = useState(0);

  const welcomes = ["BUILD", "LEARN", "EVOLVE"];
  const understands = [
    { lang: "🇬🇧", text: "I understand you" },
    { lang: "🇪🇹", text: "እኔ እረዳሃለሁ" },
    { lang: "🇪🇹", text: "Ani si hubadha" },
    { lang: "🇪🇷", text: "ኣነ እርዳእካ" }
  ];

  useEffect(() => {
    if (isPlaying && currentScene === 0) {
      const interval = setInterval(() => {
        setWelcomeIndex((prev) => (prev + 1) % welcomes.length);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentScene]);

  useEffect(() => {
    if (isPlaying) {
      const timers = [
        setTimeout(() => setCurrentScene(1), 2000),
        setTimeout(() => setCurrentScene(2), 4000),
        setTimeout(() => setCurrentScene(3), 6000),
        setTimeout(() => setCurrentScene(4), 8000),
        setTimeout(() => setCurrentScene(5), 10000),
        setTimeout(() => {
          setIsPlaying(false);
          setCurrentScene(0);
        }, 13000)
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isPlaying]);

  const scenes = [
    // Scene 1: Future Awakens
    <motion.div 
      key="scene1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 border-2 border-dashed border-robot-blue rounded-full opacity-20"
        />
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-4 h-4 bg-robot-blue rounded-full shadow-[0_0_30px_#00f2ff]" />
        </motion.div>
      </div>
      <motion.div className="mt-12 text-center">
        <AnimatePresence mode="wait">
          <motion.h2 
            key={welcomeIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-4xl font-mono font-bold text-robot-blue tracking-widest"
          >
            {welcomes[welcomeIndex]}
          </motion.h2>
        </AnimatePresence>
        <motion.h1 
          initial={{ letterSpacing: "1em", opacity: 0 }}
          animate={{ letterSpacing: "0.2em", opacity: 1 }}
          className="mt-4 text-6xl font-mono font-bold text-white tracking-[0.2em] glitch-text"
        >
          MERINOVA <span className="text-robot-blue">WEBTECH</span>
        </motion.h1>
      </motion.div>
    </motion.div>,

    // Scene 2: AI Identity
    <motion.div 
      key="scene2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotateY: [0, 180, 360]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="text-robot-blue mb-8"
      >
        <Cpu size={120} />
      </motion.div>
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-mono font-bold text-white uppercase tracking-widest"
      >
        INTELLIGENCE BEYOND MACHINES
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-robot-purple font-mono text-sm tracking-[0.5em] uppercase font-bold"
      >
        Build • Learn • Evolve
      </motion.p>
    </motion.div>,

    // Scene 3: FIPES Reveal
    <motion.div 
      key="scene_fipes"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-robot-blue mb-8"
      >
        <User size={120} />
      </motion.div>
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-mono font-bold text-white uppercase tracking-widest text-center"
      >
        FIPES: IDENTITY & <br /> EMOTION INTELLIGENCE
      </motion.h2>
    </motion.div>,

    // Scene 4: Technology Reveal (Multilingual)
    <motion.div 
      key="scene4_multi"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <div className="space-y-6 text-center">
        {understands.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <span className="text-2xl">{item.lang}</span>
            <span className="text-3xl font-mono text-white">{item.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>,

    // Scene 4: Creator Identity
    <motion.div 
      key="scene4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <div className="relative w-64 h-64 mb-8 rounded-2xl overflow-hidden border-2 border-robot-blue/30 shadow-[0_0_50px_rgba(0,242,255,0.2)]">
        <img 
          src="https://picsum.photos/seed/engineer/800/800" 
          alt="Merikeb Gashu" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-robot-blue/10 mix-blend-overlay" />
      </div>
      <motion.div className="text-center">
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-5xl font-bold mb-2 tracking-tighter"
        >
          MERIKEB <span className="text-robot-blue">GASHU</span>
        </motion.h2>
        <motion.p 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-gray-500 font-mono uppercase tracking-[0.3em]"
        >
          AI & Robotics Engineer
        </motion.p>
      </motion.div>
    </motion.div>,

    // Scene 5: Final Impact
    <motion.div 
      key="scene5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full"
    >
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          filter: ["brightness(1)", "brightness(2)", "brightness(1)"]
        }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-robot-blue mb-12"
      >
        <Bot size={160} />
      </motion.div>
      <motion.h2 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-6xl font-bold text-white tracking-tighter text-center uppercase"
      >
        Where intelligence <br />
        <span className="text-robot-blue">becomes evolution</span> 🤖🧬
      </motion.h2>
    </motion.div>
  ];

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-mono font-bold uppercase">Brand Assets</h3>
          <p className="text-sm text-gray-500 font-mono">Cinematic Intro Preview (8-10s)</p>
        </div>
        <button 
          onClick={() => setIsPlaying(true)}
          className="flex items-center gap-2 px-6 py-3 bg-robot-blue text-robot-dark font-bold rounded-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,242,255,0.3)]"
        >
          <Play size={20} fill="currentColor" /> PLAY INTRO
        </button>
      </div>

      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8"
          >
            <button 
              onClick={() => setIsPlaying(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <div className="w-full max-w-5xl aspect-video bg-robot-dark/50 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50 opacity-20" />
              
              <AnimatePresence mode="wait">
                {scenes[currentScene]}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className={`h-1 w-12 rounded-full transition-colors duration-500 ${i === currentScene ? 'bg-robot-blue' : 'bg-white/10'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
