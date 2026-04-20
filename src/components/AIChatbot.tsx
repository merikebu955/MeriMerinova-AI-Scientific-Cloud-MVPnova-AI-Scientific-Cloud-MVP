import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Loader2, MessageSquare, X, Minimize2, Maximize2, Volume2, VolumeX } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatbotProps {
  user: any;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: `Hello ${user?.name || 'there'}! I am your Merinova AI Assistant. How can I help you with your studies today?`, sender: 'ai', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const speakResponse = (text: string) => {
    if (!window.speechSynthesis || !isSpeechEnabled) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Detect language (simple check)
    const hasAmharic = /[\u1200-\u137F]/.test(text);
    utterance.lang = hasAmharic ? 'am-ET' : selectedLang;
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('merinova_token');
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const aiMsg: Message = { id: (Date.now() + 1).toString(), text: data.reply, sender: 'ai', timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
      speakResponse(data.reply);
    } catch (err) {
      console.error("AI Chat Error:", err);
      const errorMsg: Message = { id: (Date.now() + 1).toString(), text: "I'm having trouble connecting to the cloud brain. Please try again later.", sender: 'ai', timestamp: new Date() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`bg-robot-dark/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300 ${isMinimized ? 'h-16 w-72' : 'h-[500px] w-[350px] md:w-[400px]'}`}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-robot-blue/10 to-robot-purple/10 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-robot-blue/20 flex items-center justify-center relative">
                  <Bot size={18} className="text-robot-blue" />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-2 h-2 bg-robot-green rounded-full border border-robot-dark"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">MAIOS Assistant</h3>
                  <p className="text-[10px] font-mono text-robot-blue uppercase tracking-widest mt-1">Cloud Intelligence</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                  className={`p-2 transition-colors ${isSpeechEnabled ? 'text-robot-blue' : 'text-gray-500'}`}
                  title={isSpeechEnabled ? "Disable Voice" : "Enable Voice"}
                >
                  {isSpeechEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </button>
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                        msg.sender === 'user' 
                          ? 'bg-robot-blue text-robot-dark font-medium rounded-tr-none' 
                          : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                      }`}>
                        {msg.text}
                        <div className={`text-[9px] mt-1 opacity-50 ${msg.sender === 'user' ? 'text-robot-dark' : 'text-gray-400'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                        <Loader2 size={14} className="text-robot-blue animate-spin" />
                        <span className="text-xs text-gray-500 font-mono italic">MAIOS is thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/20">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-gray-600 focus:border-robot-blue/50 outline-none transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-robot-blue text-robot-dark rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                  <p className="text-[9px] text-center text-gray-600 mt-2 uppercase tracking-widest font-mono">
                    Powered by Merinova Cloud AI
                  </p>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl relative transition-all duration-500 ${isOpen ? 'bg-white text-robot-dark rotate-90' : 'bg-robot-blue text-robot-dark'}`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-robot-blue/30 blur-xl rounded-full -z-10"
          />
        )}
      </motion.button>
    </div>
  );
};

export default AIChatbot;
