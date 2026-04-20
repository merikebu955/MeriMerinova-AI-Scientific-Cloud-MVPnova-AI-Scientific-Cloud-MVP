import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, Briefcase, Camera, ArrowRight, LogIn, UserPlus, X } from 'lucide-react';

interface AuthProps {
  onLogin: (user: any) => void;
  onCancel?: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onCancel }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    department: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('merinova_token', data.token);
        localStorage.setItem('merinova_user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-robot-dark/95 backdrop-blur-xl p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white/[0.02] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Close Button */}
        {onCancel && (
          <button 
            onClick={onCancel}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all z-20"
          >
            <X size={18} />
          </button>
        )}

        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-robot-blue/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-robot-purple/10 rounded-full blur-3xl" />

        <div className="text-center mb-8 relative">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="inline-flex p-3 rounded-2xl bg-robot-blue/10 border border-robot-blue/20 mb-4"
          >
            {isLogin ? <LogIn className="text-robot-blue w-6 h-6" /> : <UserPlus className="text-robot-blue w-6 h-6" />}
          </motion.div>
          <h2 className="text-2xl font-bold text-white tracking-tight uppercase">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500 text-sm mt-2 font-mono uppercase tracking-widest">
            {isLogin ? 'MAIOS System Access' : 'Join Merinova Intelligence'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="signup-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-robot-blue/50 focus:ring-1 focus:ring-robot-blue/50 outline-none transition-all font-mono text-sm"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required={!isLogin}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-robot-blue/50 focus:ring-1 focus:ring-robot-blue/50 outline-none transition-all font-mono text-sm"
                  />
                </div>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    required={!isLogin}
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-robot-blue/50 focus:ring-1 focus:ring-robot-blue/50 outline-none transition-all font-mono text-sm"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleInputChange}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-robot-blue/50 focus:ring-1 focus:ring-robot-blue/50 outline-none transition-all font-mono text-sm"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-robot-blue/50 focus:ring-1 focus:ring-robot-blue/50 outline-none transition-all font-mono text-sm"
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-xs font-mono text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full py-4 bg-robot-blue text-robot-dark rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-robot-dark/30 border-t-robot-dark rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? 'Initiate Access' : 'Create Identity'}
                <ArrowRight size={16} />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center relative">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-500 hover:text-robot-blue transition-colors text-xs font-mono uppercase tracking-wider"
          >
            {isLogin ? "Don't have an identity? Create one" : "Already have an identity? Access system"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
