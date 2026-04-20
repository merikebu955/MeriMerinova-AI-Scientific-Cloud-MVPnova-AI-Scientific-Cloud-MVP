import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Plus, Trash2, Edit3, Save, X, Award, User, Book } from 'lucide-react';

interface Mark {
  id: string;
  studentId: string;
  teacherId: string;
  subject: string;
  score: number;
  total: number;
  comment: string;
  createdAt: string;
}

interface MarksSystemProps {
  user: any;
}

const MarksSystem: React.FC<MarksSystemProps> = ({ user }) => {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMark, setNewMark] = useState({
    studentId: '',
    subject: '',
    score: 0,
    total: 100,
    comment: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchMarks = async () => {
    if (!user) return;
    const token = localStorage.getItem('merinova_token');
    const endpoint = user.role === 'student' ? '/api/marks/my-marks' : '/api/marks/teacher-marks';
    
    try {
      const res = await fetch(endpoint, {
        headers: { 'Authorization': token || '' }
      });
      const data = await res.json();
      setMarks(data);
    } catch (err) {
      console.error("Failed to fetch marks:", err);
    }
  };

  useEffect(() => {
    fetchMarks();
  }, [user]);

  const handleAddMark = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('merinova_token');

    try {
      const res = await fetch('/api/marks/add', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify(newMark)
      });

      if (res.ok) {
        setIsAdding(false);
        setNewMark({ studentId: '', subject: '', score: 0, total: 100, comment: '' });
        fetchMarks();
      }
    } catch (err) {
      console.error("Failed to add mark:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMark = async (id: string) => {
    const token = localStorage.getItem('merinova_token');
    try {
      const res = await fetch(`/api/marks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token || '' }
      });
      if (res.ok) fetchMarks();
    } catch (err) {
      console.error("Failed to delete mark:", err);
    }
  };

  if (!user) return null;

  return (
    <section id="marks" className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter flex items-center gap-4">
              <Award className="text-robot-purple w-8 h-8 md:w-12 md:h-12" />
              ACADEMIC <span className="text-robot-purple">MARKS</span>
            </h2>
            <p className="text-gray-500 font-mono text-sm mt-2 uppercase tracking-widest">
              {user.role === 'student' ? 'Your Performance Records' : 'Student Assessment Management'}
            </p>
          </div>

          {(user.role === 'teacher' || user.role === 'admin') && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-6 py-3 bg-robot-purple text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-robot-dark transition-all"
            >
              <Plus size={16} />
              Add New Assessment
            </motion.button>
          )}
        </div>

        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-8 rounded-3xl bg-white/[0.02] border border-robot-purple/30 backdrop-blur-xl"
          >
            <form onSubmit={handleAddMark} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-2">Student ID</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2"
                    value={newMark.studentId}
                    onChange={(e) => setNewMark({ ...newMark, studentId: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-700 focus:border-robot-purple/50 outline-none transition-all font-mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-2">Subject</label>
                <div className="relative">
                  <Book className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quantum Physics"
                    value={newMark.subject}
                    onChange={(e) => setNewMark({ ...newMark, subject: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-700 focus:border-robot-purple/50 outline-none transition-all font-mono text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-2">Score</label>
                  <input
                    type="number"
                    required
                    value={newMark.score}
                    onChange={(e) => setNewMark({ ...newMark, score: parseInt(e.target.value) })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-robot-purple/50 outline-none transition-all font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-2">Total</label>
                  <input
                    type="number"
                    required
                    value={newMark.total}
                    onChange={(e) => setNewMark({ ...newMark, total: parseInt(e.target.value) })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-robot-purple/50 outline-none transition-all font-mono text-sm"
                  />
                </div>
              </div>
              <div className="md:col-span-2 lg:col-span-3 space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-2">Teacher Comments</label>
                <input
                  type="text"
                  placeholder="Provide feedback..."
                  value={newMark.comment}
                  onChange={(e) => setNewMark({ ...newMark, comment: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-700 focus:border-robot-purple/50 outline-none transition-all font-mono text-sm"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-3 text-gray-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-robot-purple text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-robot-dark transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Confirm Assessment'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marks.length > 0 ? (
            marks.map((mark) => (
              <motion.div
                key={mark.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-robot-purple/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-robot-purple/5 rounded-full blur-2xl group-hover:bg-robot-purple/10 transition-all" />
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-robot-purple transition-colors">{mark.subject}</h3>
                    <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                      {new Date(mark.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {mark.score}<span className="text-gray-600 text-sm font-normal">/{mark.total}</span>
                    </div>
                    <div className="text-[10px] font-mono text-robot-purple uppercase font-bold">
                      {Math.round((mark.score / mark.total) * 100)}%
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-4">
                  <p className="text-xs text-gray-400 italic leading-relaxed">
                    "{mark.comment || 'No feedback provided.'}"
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-robot-purple/20 flex items-center justify-center">
                      <User size={12} className="text-robot-purple" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
                      {user.role === 'student' ? 'Teacher ID: ' : 'Student ID: '}
                      {user.role === 'student' ? mark.teacherId : mark.studentId}
                    </span>
                  </div>
                  
                  {(user.role === 'teacher' || user.role === 'admin') && (
                    <button 
                      onClick={() => handleDeleteMark(mark.id)}
                      className="p-2 text-gray-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <BookOpen className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">No assessment records found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MarksSystem;
