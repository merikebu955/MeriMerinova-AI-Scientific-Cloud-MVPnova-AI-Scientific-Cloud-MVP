import { motion } from 'motion/react';
import { Bot, ArrowRight, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-robot-blue/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-robot-blue/30 bg-robot-blue/5 text-robot-blue text-xs font-mono mb-8">
            <Zap className="w-3 h-3" />
            <span>SYSTEMS ONLINE // VERSION 2.0</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold mb-2 tracking-tighter">
            MERINOVA <span className="text-robot-blue">WEBTECH</span>
          </h1>
          
          <div className="flex flex-col items-center mb-8">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              className="h-px bg-gradient-to-r from-transparent via-robot-blue to-transparent mb-4"
            />
            <div className="text-robot-purple font-mono text-sm uppercase tracking-[0.5em] font-bold">
              Build • Learn • Evolve
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
            Future Intelligence Begins Here. Building robots that 
            <span className="text-white font-medium italic"> think and learn</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#merinova"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-robot-blue text-robot-dark font-bold rounded-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)]"
            >
              Explore Merinova <Bot className="w-5 h-5" />
            </motion.a>
            
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/10 hover:bg-white/5 font-bold rounded-lg flex items-center gap-2 transition-all"
            >
              Learn More <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>

        {/* Decorative Grid */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-robot-dark to-transparent" />
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gray-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
