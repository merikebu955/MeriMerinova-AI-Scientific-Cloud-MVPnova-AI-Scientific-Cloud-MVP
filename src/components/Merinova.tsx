import { motion } from 'motion/react';
import { CheckCircle2, Cpu, Zap, Shield, Target, Brain, Activity, Globe, Github, Play, Languages, Heart, User } from 'lucide-react';

export default function Merinova() {
  const capabilities = [
    "Vision + Language (VLA Transformer)",
    "Reinforcement Learning Locomotion",
    "Autonomous AI Decision Making",
    "Gait Learning AI & Simulation Control"
  ];

  return (
    <section id="merinova" className="py-24 bg-robot-gray relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-robot-blue/30 bg-robot-blue/5 text-robot-blue text-xs font-mono mb-6">
              <Target className="w-3 h-3" />
              <span>CURRENT MISSION</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter uppercase">
              BUILDING <span className="text-robot-blue">MERINOVA</span> <br />
              <span className="text-robot-purple text-3xl md:text-4xl">WEBTECH SYSTEMS</span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Merinova is a fully autonomous humanoid robot platform designed to bridge the gap 
              between digital intelligence and physical action.
            </p>

            <div className="space-y-4 mb-10">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex items-center gap-3 text-lg font-mono">
                  <CheckCircle2 className="w-6 h-6 text-robot-blue shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <Brain className="w-6 h-6 text-robot-blue mb-2" />
                <h4 className="font-mono text-sm font-bold">AI BRAIN</h4>
                <p className="text-xs text-gray-500">VLA + LLM Integration</p>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <Activity className="w-6 h-6 text-robot-blue mb-2" />
                <h4 className="font-mono text-sm font-bold">WALKING</h4>
                <p className="text-xs text-gray-500">RL Locomotion</p>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <Globe className="w-6 h-6 text-robot-blue mb-2" />
                <h4 className="font-mono text-sm font-bold">SIMULATION</h4>
                <p className="text-xs text-gray-500">ROS + Gazebo</p>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] sm:col-span-3">
                <Languages className="w-6 h-6 text-robot-blue mb-2" />
                <h4 className="font-mono text-sm font-bold uppercase tracking-widest">Multilingual Intelligence (MMI)</h4>
                <p className="text-xs text-gray-500">Native support for Amharic, English, Oromo, and Tigrinya.</p>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] sm:col-span-3">
                <User className="w-6 h-6 text-robot-blue mb-2" />
                <h4 className="font-mono text-sm font-bold uppercase tracking-widest">FIPES Architecture</h4>
                <p className="text-xs text-gray-500">Face Identity + Personality + Emotion System with contextual memory.</p>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#dashboard"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-robot-blue text-robot-dark font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)]"
              >
                <Play className="w-5 h-5 fill-current" /> View Live Demo
              </motion.a>
              
              <motion.a
                href="https://github.com/merikebu"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white/10 hover:bg-white/5 font-bold rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Github className="w-5 h-5" /> Contribute on GitHub
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Merinova Robot Representation */}
            <div className="aspect-square rounded-3xl border border-white/10 relative overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/tech/800/800" 
                alt="Merinova Humanoid Robot"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-robot-dark via-transparent to-transparent opacity-60" />
              
              {/* Floating UI elements */}
              <div className="absolute top-8 left-8 p-4 bg-robot-dark/80 backdrop-blur rounded-xl border border-white/10 font-mono text-xs">
                <div className="text-robot-blue mb-1">STATUS: ACTIVE</div>
                <div className="text-gray-500">VLA_CORE: LOADED</div>
              </div>
              
              <div className="absolute bottom-8 right-8 p-4 bg-robot-dark/80 backdrop-blur rounded-xl border border-white/10 font-mono text-xs">
                <div className="text-robot-blue mb-1">POWER: 98%</div>
                <div className="text-gray-500">TEMP: 34°C</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
