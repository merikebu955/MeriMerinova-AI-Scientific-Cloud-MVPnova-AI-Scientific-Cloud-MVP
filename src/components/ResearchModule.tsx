import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Atom, Beaker, Shield, Zap, Play, Square, Save, Database, Activity, Terminal as TerminalIcon, Cpu, ChevronRight, Binary, MessageSquare, Send, Sparkles, Loader2, X } from 'lucide-react';

interface SimulationState {
  id: string;
  name: string;
  type: 'Quantum ESPRESSO' | 'LAMMPS' | 'GROMACS';
  status: 'Idle' | 'Running' | 'Completed' | 'Failed';
  progress: number;
  logs: string[];
  startTime: number;
  nodes: number;
  cpu: number;
  ram: number;
  results?: any;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export default function ResearchModule() {
  const [activeSims, setActiveSims] = useState<SimulationState[]>([]);
  const [history, setHistory] = useState<SimulationState[]>([
    { 
      id: 'sim-8821', 
      name: 'Silicon SCF', 
      type: 'Quantum ESPRESSO', 
      status: 'Completed', 
      progress: 100, 
      logs: ['Calculation complete. Converged in 12 iterations.', 'Final energy: -12.45 eV'],
      startTime: Date.now() - 3600000,
      nodes: 4,
      cpu: 0,
      ram: 0
    },
    { 
      id: 'sim-9902', 
      name: 'Water Box MD', 
      type: 'GROMACS', 
      status: 'Completed', 
      progress: 100, 
      logs: ['MD step 500000/500000 reached. Output saved.', 'RMSD: 0.24 nm'],
      startTime: Date.now() - 7200000,
      nodes: 8,
      cpu: 0,
      ram: 0
    },
  ]);

  const [simName, setSimName] = useState('');
  const [simType, setSimType] = useState<'Quantum ESPRESSO' | 'LAMMPS' | 'GROMACS'>('Quantum ESPRESSO');
  const [vcpuCount, setVcpuCount] = useState(32);
  const [precision, setPrecision] = useState<'Single' | 'Double'>('Single');
  
  // AI Chat State
  const [showAi, setShowAi] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', text: "Scientific core online. How can I assist with your HPC workloads today?", sender: 'ai' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const startSimulation = async () => {
    if (!simName) return;
    
    const tempId = `PENDING-${Math.random().toString(36).substr(2, 9)}`;
    const initialSim: SimulationState = {
      id: tempId,
      name: simName,
      type: simType,
      status: 'Running',
      progress: 0,
      logs: [`Initiating ${simType} link...`, 'Bridging to AWS EKS clusters...', 'Requesting 32 vCPUs...'],
      startTime: Date.now(),
      nodes: Math.floor(Math.random() * 4) + 2,
      cpu: 0,
      ram: 0
    };
    
    setActiveSims(prev => [initialSim, ...prev]);
    setSimName('');

    try {
      const response = await fetch('/api/research/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: simType, 
          name: initialSim.name, 
          config: { vcpuCount, precision } 
        })
      });
      
      const data = await response.json();
      const realId = data.jobId;

      // Update simulation with real ID from backend
      setActiveSims(prev => prev.map(s => s.id === tempId ? { ...s, id: realId } : s));
      
      let currentProgress = 0;
      const sciLogs = [
        'Diagonalizing Hamiltonian matrix...',
        'Updating exchange-correlation potential...',
        'Converging SCF density...',
        'Applying periodic boundary conditions...',
        'Solving Poisson equation...',
        'Fourier transforming basis set...',
        'Computing stress-strain tensor...',
        'Equilibrating temperature bath...',
        'Correcting velocity vectors...',
        'Applying Ewald summation...'
      ];

      const interval = setInterval(() => {
        currentProgress += Math.random() * 3 + 1; // Slower, more granular
        
        setActiveSims(prev => {
          const sim = prev.find(s => s.id === realId);
          if (!sim) {
            clearInterval(interval);
            return prev;
          }

          if (currentProgress >= 100) {
            clearInterval(interval);
            const completedSim = { 
              ...sim, 
              progress: 100, 
              status: 'Completed' as const, 
              logs: [...sim.logs, 'Finalizing data packets...', 'Nodes synchronized.', data.message || 'Simulation completed successfully.'],
              cpu: 0,
              ram: 0
            };
            setHistory(h => [completedSim, ...h]);
            return prev.map(s => s.id === realId ? completedSim : s);
          }

          // Randomize "Failed" state (rare)
          const shouldFail = currentProgress > 40 && Math.random() < 0.003;
          if (shouldFail) {
            clearInterval(interval);
            const failedSim = {
              ...sim,
              status: 'Failed' as const,
              logs: [...sim.logs, 'CRITICAL ERROR: GPU Kernel Panic.', 'Memory overflow on node node-eks-v4-99.', 'Process terminated by watchdog.'],
              cpu: 0,
              ram: 0
            };
            setHistory(h => [failedSim, ...h]);
            return prev.map(s => s.id === realId ? failedSim : s);
          }

          // Stream high-frequency "scientific" logs
          const newLogs = [...sim.logs];
          if (Math.random() > 0.6) {
            newLogs.push(sciLogs[Math.floor(Math.random() * sciLogs.length)]);
          }

          // Generate state-based logs
          if (currentProgress > 15 && sim.progress <= 15) newLogs.push('Allocating distributed GPU memory (A100 clusters)...');
          if (currentProgress > 30 && sim.progress <= 30) {
            const engineLog = sim.type === 'Quantum ESPRESSO' ? 'Initializing plane-wave basis set (cut-off: 40 Ry)...' :
                              sim.type === 'LAMMPS' ? 'Building neighbor lists (binning algorithm)...' :
                              'Computing topology constraints for solvent shell...';
            newLogs.push(engineLog);
          }
          if (currentProgress > 50 && sim.progress <= 50) {
            const engineLog = sim.type === 'Quantum ESPRESSO' ? 'Running SCF iterations (Mixing factor: 0.7)...' :
                              sim.type === 'LAMMPS' ? 'Integrating equations of motion (Verlet scheme)...' :
                              'Equilibrating NPT ensemble...';
            newLogs.push(engineLog);
          }
          if (currentProgress > 75 && sim.progress <= 75) newLogs.push('Verifying thermodynamic stability parameters...');
          if (currentProgress > 90 && sim.progress <= 90) newLogs.push('Generating HDF5 trajectory output(s)...');

          // Realistic fluctuating stats
          const cpu = sim.status === 'Running' ? Math.floor(70 + Math.random() * 25) : 0;
          const ram = sim.status === 'Running' ? Math.floor(40 + Math.random() * 30) : 0;

          return prev.map(s => s.id === realId ? { ...s, progress: Math.min(100, currentProgress), logs: newLogs.slice(-50), cpu, ram } : s);
        });
      }, 800);

    } catch (err) {
      console.error("Simulation Link Error:", err);
      setActiveSims(prev => prev.filter(s => s.id !== tempId));
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isAiLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), text, sender: 'user' };
    setChatMessages(prev => [...prev, userMsg]);
    setIsAiLoading(true);
    setShowAi(true);

    try {
      const res = await fetch('/api/research/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), text: data.reply, sender: 'ai' };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = { id: (Date.now() + 1).toString(), text: "Research Link Error: Cloud Brain unavailable.", sender: 'ai' };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = aiInput;
    setAiInput('');
    await sendMessage(text);
  };

  const debugSimWithAi = (sim: SimulationState) => {
    const lastLogs = sim.logs.slice(-5).join('\n');
    const prompt = `I need debugging help with my ${sim.type} simulation named "${sim.name}" (Status: ${sim.status}). 
Current progress: ${Math.round(sim.progress)}%.
Latest logs:
${lastLogs}

Please analyze these logs and provide optimization or troubleshooting advice.`;
    sendMessage(prompt);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="relative min-h-[600px]">
      {/* Floating AI Toggle */}
      <button 
        onClick={() => setShowAi(!showAi)}
        className="fixed bottom-24 right-10 z-[60] w-14 h-14 bg-robot-blue text-robot-dark rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <Sparkles size={24} />
        <span className="absolute right-16 bg-robot-dark border border-white/10 px-3 py-1 rounded text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          RESEARCH ASSISTANT
        </span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Controls & History */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5 text-robot-blue" />
              <h3 className="font-mono font-bold uppercase text-sm">New Simulation</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2">Project Name</label>
                <input 
                  type="text"
                  value={simName}
                  onChange={(e) => setSimName(e.target.value)}
                  placeholder="e.g. Si-Diamond-001"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white outline-none focus:border-robot-blue/50"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2">Engine Selection</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'Quantum ESPRESSO', icon: <Atom size={14} /> },
                    { id: 'LAMMPS', icon: <Binary size={14} /> },
                    { id: 'GROMACS', icon: <Beaker size={14} /> }
                  ].map(engine => (
                    <button
                      key={engine.id}
                      onClick={() => setSimType(engine.id as any)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border font-mono text-xs text-left transition-all ${
                        simType === engine.id 
                          ? 'bg-robot-blue/20 border-robot-blue/50 text-robot-blue shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {engine.icon}
                      {engine.id}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2">Computational Resources</label>
                <div className="grid grid-cols-4 gap-2">
                  {[8, 16, 32, 64].map(v => (
                    <button
                      key={v}
                      onClick={() => setVcpuCount(v)}
                      className={`py-2 rounded-lg border font-mono text-[10px] transition-all ${
                        vcpuCount === v 
                          ? 'bg-robot-blue/20 border-robot-blue/50 text-robot-blue' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {v} vCPU
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2">Numeric Precision</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Single', 'Double'].map(p => (
                    <button
                      key={p}
                      onClick={() => setPrecision(p as any)}
                      className={`py-2 rounded-lg border font-mono text-[10px] transition-all ${
                        precision === p 
                          ? 'bg-robot-blue/20 border-robot-blue/50 text-robot-blue' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startSimulation}
                disabled={!simName}
                className="w-full py-4 bg-robot-blue text-black rounded-xl font-bold font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              >
                <Play size={16} />
                Launch Cluster
              </motion.button>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-5 h-5 text-robot-purple" />
              <h3 className="font-mono font-bold uppercase text-sm">Simulation History</h3>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {history.map(sim => (
                <div key={sim.id} className="p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-white/20 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[10px] font-mono font-bold text-white group-hover:text-robot-blue">{sim.name}</div>
                    <div className={`text-[9px] font-mono ${sim.status === 'Completed' ? 'text-robot-green' : sim.status === 'Running' ? 'text-robot-blue' : 'text-red-500'}`}>
                      {sim.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[9px] font-mono text-gray-500 uppercase">{sim.type}</div>
                    <div className="text-[8px] font-mono text-gray-600 tracking-tighter">{sim.id}</div>
                  </div>
                  {(sim.status === 'Running' || sim.status === 'Completed') && (
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${sim.status === 'Running' ? 'bg-robot-blue animate-pulse' : 'bg-robot-green'}`} 
                        style={{ width: `${sim.progress}%` }} 
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Monitor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="min-h-[500px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-6 relative flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-mono font-bold uppercase text-sm flex items-center gap-2">
                <Activity size={16} className="text-robot-blue" />
                Live HPC Cluster Monitor
              </h3>
              {activeSims.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-robot-blue animate-pulse" />
                  <span className="text-[10px] font-mono text-robot-blue bg-robot-blue/10 px-2 py-1 rounded uppercase tracking-widest">
                    {activeSims.length} Active Nodes
                  </span>
                </div>
              )}
            </div>

            <AnimatePresence mode="popLayout">
              {activeSims.length === 0 ? (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-12"
                >
                  <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 animate-pulse text-gray-700">
                    <TerminalIcon size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">HPC Monitor Standby</h3>
                  <p className="text-gray-500 max-w-sm font-mono text-xs uppercase tracking-widest">Launch a simulation to begin real-time data streaming and cluster telemetry.</p>
                </motion.div>
              ) : (
                <div className="space-y-8 pb-4 h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                  {activeSims.map(sim => (
                    <motion.div 
                      key={sim.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      layout
                      className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-robot-blue/10 flex items-center justify-center">
                            {sim.type === 'Quantum ESPRESSO' ? <Atom size={16} className="text-robot-blue" /> : 
                             sim.type === 'LAMMPS' ? <Binary size={16} className="text-robot-blue" /> : 
                             <Beaker size={16} className="text-robot-blue" />}
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">{sim.type}</div>
                            <div className="text-xs font-mono font-bold text-white uppercase">{sim.name}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => debugSimWithAi(sim)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all text-[10px] font-mono group"
                          >
                            <Sparkles size={12} className="group-hover:rotate-12 transition-transform" />
                            DEBUG WITH AI
                          </button>
                          <div className="text-right">
                            <div className="text-[10px] font-mono text-gray-500 uppercase">Status</div>
                            <div className={`text-[10px] font-mono font-bold tracking-widest ${
                              sim.status === 'Running' ? 'text-robot-blue' :
                              sim.status === 'Completed' ? 'text-robot-green' : 'text-red-500'
                            }`}>
                              {sim.status.toUpperCase()}
                            </div>
                          </div>
                          <button 
                            onClick={() => setActiveSims(prev => prev.filter(s => s.id !== sim.id))}
                            className={`p-2 rounded-lg transition-colors ${
                              sim.status === 'Running' 
                                ? 'bg-red-500/10 hover:bg-red-500/20 text-red-500' 
                                : 'bg-white/10 hover:bg-white/20 text-white'
                            }`}
                            title={sim.status === 'Running' ? 'Abort' : 'Dismiss'}
                          >
                            {sim.status === 'Running' ? <Square size={14} fill="currentColor" /> : <X size={14} />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Progress and Stats */}
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-end mb-2">
                              <label className="text-[10px] font-mono text-gray-500 uppercase">Calculation Progress</label>
                              <span className="text-xs font-mono text-robot-blue font-bold">{Math.round(sim.progress)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${sim.progress}%` }}
                                className={`h-full shadow-[0_0_10px_rgba(59,130,246,0.3)] ${
                                  sim.status === 'Running' ? 'bg-robot-blue' :
                                  sim.status === 'Completed' ? 'bg-robot-green' : 'bg-red-500'
                                }`}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                              <div className="text-[8px] font-mono text-gray-600 uppercase">CPU Load</div>
                              <div className="text-[10px] font-mono text-white">{sim.cpu}%</div>
                            </div>
                            <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                              <div className="text-[8px] font-mono text-gray-600 uppercase">RAM Usage</div>
                              <div className="text-[10px] font-mono text-white">{sim.ram}%</div>
                            </div>
                            <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                                <div className="text-[8px] font-mono text-gray-600 uppercase">Nodes</div>
                                <div className="text-[10px] font-mono text-white">{sim.nodes}</div>
                            </div>
                          </div>
                        </div>

                        {/* Logs Terminal */}
                        <div className="p-4 rounded-xl border border-white/10 bg-black/40 font-mono text-[10px] h-[100px] flex flex-col overflow-hidden">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 flex items-center gap-2">
                              <TerminalIcon size={12} />
                              JOB_LOG
                            </span>
                            <span className="text-[8px] text-robot-blue animate-pulse">{sim.id}</span>
                          </div>
                          <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar flex flex-col-reverse">
                            <div className="animate-pulse text-robot-blue select-none">_</div>
                            {[...sim.logs].reverse().map((log, i) => (
                              <div key={`${sim.id}-log-${i}`} className="flex gap-2">
                                <span className="text-gray-700">[{sim.logs.length - 1 - i}]</span>
                                <span className={`${
                                  sim.status === 'Failed' && i === 0 ? 'text-red-400' : 
                                  sim.status === 'Completed' && i === 0 ? 'text-robot-green' : 
                                  'text-gray-400'
                                } break-all`}>{log}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
              <h4 className="font-mono font-bold uppercase text-xs mb-4 flex items-center gap-2">
                <Shield size={14} className="text-robot-green" />
                Computational Integrity
              </h4>
              <div className="text-xs text-gray-500 leading-relaxed font-mono italic">
                "Merinova AI employs Error-Correcting Code (ECC) Memory and isolated cloud instances to ensure that high-fidelity simulations are immune to bit-flips."
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
              <h4 className="font-mono font-bold uppercase text-xs mb-4 flex items-center gap-2">
                <Activity size={14} className="text-robot-blue" />
                Node Equilibrium
              </h4>
              <div className="grid grid-cols-4 gap-1 h-12 items-end">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className={`flex-1 rounded-sm ${Math.random() > 0.3 ? 'bg-robot-blue/20' : 'bg-robot-blue/60'}`} style={{ height: `${20 + Math.random() * 80}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Side Drawer */}
      <AnimatePresence>
        {showAi && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-robot-dark/95 backdrop-blur-3xl border-l border-white/10 z-[100] shadow-2xl flex flex-col"
          >
            <div className="p-6 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Sparkles className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-tight">Research Assistant</h3>
                  <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Scientific AI V4.2</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAi(false)}
                className="p-2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[90%] p-4 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                  }`}>
                    {msg.text.split('[APPLY:').map((chunk, i) => {
                      if (i === 0) return chunk;
                      const parts = chunk.split(']');
                      if (parts.length < 2) return chunk;
                      const actionValue = parts[0].trim();
                      const rest = parts.slice(1).join(']');
                      
                      return (
                        <React.Fragment key={i}>
                          <div className="mt-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col gap-2">
                             <div className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2">
                               <Sparkles size={10} /> Artificial Insight Detected
                             </div>
                             <div className="text-xs text-blue-100 italic">
                               Suggesting {actionValue} configuration
                             </div>
                             <button
                               onClick={() => {
                                 if (['Quantum ESPRESSO', 'LAMMPS', 'GROMACS'].includes(actionValue)) {
                                   setSimType(actionValue as any);
                                 } else if (['8', '16', '32', '64'].includes(actionValue)) {
                                   setVcpuCount(parseInt(actionValue));
                                 } else if (['Single', 'Double'].includes(actionValue)) {
                                   setPrecision(actionValue as any);
                                 }
                               }}
                               className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-mono font-bold transition-colors uppercase tracking-widest"
                             >
                               Apply Protocol
                             </button>
                          </div>
                          {rest}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-3">
                    <Loader2 size={16} className="text-blue-400 animate-spin" />
                    <span className="text-[10px] font-mono text-gray-500 uppercase">Analyzing parameters...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleAiAsk} className="p-6 border-t border-white/10 bg-black/20">
              <div className="relative">
                <input 
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask a scientific question..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-6 pr-14 text-sm outline-none focus:border-blue-500/50 transition-all font-mono"
                />
                <button 
                  type="submit"
                  disabled={!aiInput.trim() || isAiLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
