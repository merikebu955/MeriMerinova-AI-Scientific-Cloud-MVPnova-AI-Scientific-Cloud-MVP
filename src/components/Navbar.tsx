import { motion } from 'motion/react';
import { Cpu, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  user: any;
  onLogout: () => void;
  onLoginClick: () => void;
}

export default function Navbar({ user, onLogout, onLoginClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Focus', href: '#focus' },
    { name: 'Merinova', href: '#merinova' },
    { name: 'Locomotion', href: '#locomotion' },
    { name: 'VLA', href: '#vla' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Live', href: '#live' },
    { name: 'Marks', href: '#marks' },
    { name: 'Vision', href: '#vision' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-robot-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Cpu className="w-8 h-8 text-robot-blue" />
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-robot-blue/20 blur-lg rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-lg tracking-tighter leading-none">MERINOVA</span>
              <span className="font-mono text-[10px] text-robot-blue tracking-[0.2em] font-light">AI CLOUD</span>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-robot-blue px-3 py-2 rounded-md text-sm font-mono transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-white leading-none">{user.name}</span>
                  <span className="text-[9px] font-mono text-robot-blue uppercase tracking-tighter">{user.role}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/50 transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-robot-blue text-robot-dark font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
              >
                <LogIn size={16} />
                Access System
              </button>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-robot-dark border-b border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-robot-blue block px-3 py-2 rounded-md text-base font-mono"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 pb-2 border-t border-white/10">
              {user ? (
                <div className="flex items-center justify-between px-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">{user.name}</span>
                    <span className="text-[10px] font-mono text-robot-blue uppercase">{user.role}</span>
                  </div>
                  <button onClick={onLogout} className="text-red-400 text-xs font-mono uppercase">Logout</button>
                </div>
              ) : (
                <button 
                  onClick={() => { onLoginClick(); setIsOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-robot-blue text-robot-dark font-bold text-xs uppercase tracking-widest"
                >
                  <LogIn size={16} />
                  Access System
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
