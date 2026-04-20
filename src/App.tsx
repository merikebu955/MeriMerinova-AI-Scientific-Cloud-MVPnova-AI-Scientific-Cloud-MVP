/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Linkedin, Youtube, Github, Twitter, ExternalLink, User as UserIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Focus from './components/Focus';
import Merinova from './components/Merinova';
import LocomotionSystem from './components/LocomotionSystem';
import VLASystem from './components/VLASystem';
import Dashboard from './components/Dashboard';
import Vision from './components/Vision';
import Auth from './components/Auth';
import MarksSystem from './components/MarksSystem';
import LiveSessions from './components/LiveSessions';
import AIChatbot from './components/AIChatbot';

import ResearchLanding from './components/ResearchLanding';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [inDashboard, setInDashboard] = useState(false);

  // Check for saved session
  useEffect(() => {
    const savedUser = localStorage.getItem('merinova_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setInDashboard(true);
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('merinova_user', JSON.stringify(userData));
    setShowAuth(false);
    setInDashboard(true);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('merinova_user');
    localStorage.removeItem('merinova_token');
    setInDashboard(false);
  };

  if (!inDashboard && !user) {
    return (
      <>
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
          onLoginClick={() => setShowAuth(true)} 
        />
        {showAuth && <Auth onLogin={handleLogin} onCancel={() => setShowAuth(false)} />}
        <ResearchLanding onStart={() => setShowAuth(true)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-robot-dark selection:bg-robot-blue selection:text-robot-dark">
      <Navbar user={user} onLogout={handleLogout} onLoginClick={() => setShowAuth(true)} />
      
      {showAuth && !user && <Auth onLogin={handleLogin} onCancel={() => setShowAuth(false)} />}

      <main>
        {inDashboard ? (
          <div className="pt-20 pb-12">
            <Dashboard />
          </div>
        ) : (
          <>
            <Hero />
            <section id="about" className="py-24 border-y border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter">
                      THE <span className="text-robot-blue">ENGINEER</span> BEHIND THE MACHINE
                    </h2>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-full border-2 border-robot-blue overflow-hidden">
                        <img 
                          src="https://picsum.photos/seed/merikeb/200/200" 
                          alt="Merikeb Gashu" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Merikeb Gashu</h3>
                        <p className="text-robot-blue font-mono text-xs uppercase tracking-widest">AI & Robotics Engineer</p>
                      </div>
                    </div>
                    <p className="text-xl text-gray-400 leading-relaxed mb-6">
                      Merikeb Gashu is an ambitious and innovative technology builder focused on developing 
                      next-generation humanoid AI systems. As the founder of <span className="text-robot-blue font-bold">Merinova WebTech</span>, 
                      he is bridging the gap between digital intelligence and physical action.
                    </p>
                    <p className="text-lg text-gray-500 leading-relaxed mb-8">
                      With a strong passion for artificial intelligence, robotics, and full-stack development, 
                      Merikeb is building systems inspired by cutting-edge technologies.
                    </p>

                    <div className="flex gap-4 mb-10">
                      {[
                        { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/merikebu", label: "LinkedIn" },
                        { icon: <Youtube size={20} />, href: "https://youtube.com/@merikebu", label: "YouTube" },
                        { icon: <Github size={20} />, href: "https://github.com/merikebu", label: "GitHub" },
                      ].map((social) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, color: "#00f2ff" }}
                          className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all"
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                    <img 
                      src="https://picsum.photos/seed/merikeb/800/800" 
                      alt="Merikeb Gashu" 
                      className="object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </section>
            <Focus />
            <Merinova />
            <LocomotionSystem />
            <VLASystem />
            <Vision />
          </>
        )}
      </main>
      <AIChatbot user={user} />
    </div>
  );
}
