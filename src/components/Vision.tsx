import { motion } from 'motion/react';
import { Globe, Heart, Github, Linkedin, Youtube, Mail } from 'lucide-react';

export default function Vision() {
  return (
    <section id="vision" className="py-24 bg-robot-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Globe className="w-16 h-16 text-robot-blue mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
            THE <span className="text-robot-blue">VISION</span>
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light italic">
            "To contribute to the future of intelligent machines and robotics in Africa and globally, 
            creating systems that can assist, learn, and evolve alongside humans."
          </p>
        </motion.div>
      </div>

      <footer className="mt-32 border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <div className="text-left">
              <div className="font-mono font-bold text-2xl tracking-tighter mb-1">MERINOVA <span className="text-robot-blue">WEBTECH</span></div>
              <p className="text-robot-purple font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Build • Learn • Evolve</p>
            </div>
            
            <div className="flex gap-6">
              <a href="https://github.com/merikebu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-robot-blue transition-colors"><Github /></a>
              <a href="https://linkedin.com/in/merikebu/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-robot-blue transition-colors"><Linkedin /></a>
              <a href="https://www.youtube.com/@merikebu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-robot-blue transition-colors"><Youtube /></a>
              <a href="mailto:merikeb.gashu@gmail.com" className="text-gray-400 hover:text-robot-blue transition-colors"><Mail /></a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs font-mono uppercase tracking-widest">
            <p>© 2026 MERINOVA WEBTECH. ALL RIGHTS RESERVED.</p>
            <p className="flex items-center gap-1">
              EVOLVING WITH <Heart className="w-3 h-3 text-robot-purple" /> FOR HUMANITY
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
