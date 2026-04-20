import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Users, Clock, Play, LogOut, Calendar, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Session {
  id: string;
  title: string;
  subject: string;
  teacherId: string;
  startTime: string;
  isActive: boolean;
}

interface SessionLog {
  id: string;
  sessionId: string;
  userId: string;
  joinTime: string;
  leaveTime?: string;
  durationMinutes?: number;
  session?: Session;
}

interface LiveSessionsProps {
  user: any;
}

const LiveSessions: React.FC<LiveSessionsProps> = ({ user }) => {
  const [activeSessions, setActiveSessions] = useState<Session[]>([]);
  const [currentLog, setCurrentLog] = useState<SessionLog | null>(null);
  const [history, setHistory] = useState<SessionLog[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newSession, setNewSession] = useState({ title: '', subject: '' });
  const [isLoading, setIsLoading] = useState(false);

  const fetchActiveSessions = async () => {
    const token = localStorage.getItem('merinova_token');
    try {
      const res = await fetch('/api/live/active', {
        headers: { 'Authorization': token || '' }
      });
      const data = await res.json();
      setActiveSessions(data);
    } catch (err) {
      console.error("Failed to fetch active sessions:", err);
    }
  };

  const fetchHistory = async () => {
    const token = localStorage.getItem('merinova_token');
    try {
      const res = await fetch('/api/live/my-sessions', {
        headers: { 'Authorization': token || '' }
      });
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchActiveSessions();
      fetchHistory();
      const interval = setInterval(fetchActiveSessions, 10000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('merinova_token');
    try {
      const res = await fetch('/api/live/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify(newSession)
      });
      if (res.ok) {
        setIsCreating(false);
        setNewSession({ title: '', subject: '' });
        fetchActiveSessions();
      }
    } catch (err) {
      console.error("Failed to create session:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = async (sessionId: string) => {
    const token = localStorage.getItem('merinova_token');
    try {
      const res = await fetch(`/api/live/join/${sessionId}`, {
        method: 'POST',
        headers: { 'Authorization': token || '' }
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentLog(data.log);
      }
    } catch (err) {
      console.error("Failed to join session:", err);
    }
  };

  const handleLeave = async () => {
    if (!currentLog) return;
    const token = localStorage.getItem('merinova_token');
    try {
      const res = await fetch(`/api/live/leave/${currentLog.id}`, {
        method: 'POST',
        headers: { 'Authorization': token || '' }
      });
      if (res.ok) {
        setCurrentLog(null);
        fetchHistory();
      }
    } catch (err) {
      console.error("Failed to leave session:", err);
    }
  };

  if (!user) return null;

  return (
    <section id="live" className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter flex items-center gap-4">
              <Video className="text-robot-green w-8 h-8 md:w-12 md:h-12" />
              LIVE <span className="text-robot-green">SESSIONS</span>
            </h2>
            <p className="text-gray-500 font-mono text-sm mt-2 uppercase tracking-widest">
              Real-time Learning & Attendance Tracking
            </p>
          </div>

          {(user.role === 'teacher' || user.role === 'admin') && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-6 py-3 bg-robot-green text-robot-dark rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all"
            >
              <Play size={16} />
              Start Live Class
            </motion.button>
          )}
        </div>

        {isCreating && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-8 rounded-3xl bg-white/[0.02] border border-robot-green/30 backdrop-blur-xl"
          >
            <form onSubmit={handleCreateSession} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-2">Session Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Introduction to Robotics"
                  value={newSession.title}
                  onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-700 focus:border-robot-green/50 outline-none transition-all font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-2">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engineering"
                  value={newSession.subject}
                  onChange={(e) => setNewSession({ ...newSession, subject: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-700 focus:border-robot-green/50 outline-none transition-all font-mono text-sm"
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-6 py-3 text-gray-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-robot-green text-robot-dark rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Initializing...' : 'Go Live Now'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {currentLog && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 p-8 rounded-3xl bg-robot-green/10 border border-robot-green/50 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-robot-green/20 flex items-center justify-center relative">
                <Video className="text-robot-green w-8 h-8" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-robot-dark"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Currently in Session</h3>
                <p className="text-robot-green font-mono text-xs uppercase tracking-widest mt-1">Join Time: {new Date(currentLog.joinTime).toLocaleTimeString()}</p>
              </div>
            </div>
            <button 
              onClick={handleLeave}
              className="flex items-center gap-2 px-8 py-4 bg-red-500/20 border border-red-500/50 text-red-500 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-red-500 hover:text-white transition-all"
            >
              <LogOut size={18} />
              Leave Session
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Active Sessions */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <Users size={16} className="text-robot-blue" />
              Active Classrooms
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeSessions.length > 0 ? (
                activeSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-robot-green/30 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-xl bg-robot-green/10 text-robot-green">
                        <BookOpen size={20} />
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-robot-green/20 text-robot-green text-[9px] font-bold uppercase tracking-widest">
                        <motion.div 
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-1.5 h-1.5 bg-robot-green rounded-full"
                        />
                        Live
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">{session.title}</h4>
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-6">{session.subject}</p>
                    
                    <button 
                      disabled={!!currentLog}
                      onClick={() => handleJoin(session.id)}
                      className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-robot-green hover:text-robot-dark hover:border-robot-green transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {currentLog?.sessionId === session.id ? 'Already Joined' : 'Join Classroom'}
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center border border-dashed border-white/5 rounded-2xl">
                  <p className="text-gray-600 font-mono text-xs uppercase tracking-widest">No active sessions at the moment</p>
                </div>
              )}
            </div>
          </div>

          {/* Attendance History */}
          <div className="space-y-6">
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <Clock size={16} className="text-robot-purple" />
              Your Attendance
            </h3>
            
            <div className="space-y-4">
              {history.length > 0 ? (
                history.map((log) => (
                  <div key={log.id} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between group hover:bg-white/[0.03] transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${log.durationMinutes && log.durationMinutes > 40 ? 'bg-robot-green/10 text-robot-green' : 'bg-robot-purple/10 text-robot-purple'}`}>
                        {log.durationMinutes && log.durationMinutes > 40 ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-none mb-1">{log.session?.title || 'Unknown Session'}</h4>
                        <p className="text-[10px] font-mono text-gray-600 uppercase">
                          {new Date(log.joinTime).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">
                        {log.durationMinutes || 0}<span className="text-[10px] text-gray-600 font-normal ml-1">min</span>
                      </div>
                      <div className={`text-[9px] font-mono uppercase font-bold ${log.durationMinutes && log.durationMinutes > 40 ? 'text-robot-green' : 'text-robot-purple'}`}>
                        {log.durationMinutes && log.durationMinutes > 40 ? 'Present' : 'Partial'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 font-mono text-[10px] uppercase py-8">No session history found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveSessions;
