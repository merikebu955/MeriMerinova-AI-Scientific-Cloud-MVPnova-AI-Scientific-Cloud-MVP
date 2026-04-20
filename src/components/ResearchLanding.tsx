import { motion } from 'motion/react';
import { Beaker, Globe, Shield, Terminal, Zap, BookOpen, Code, Layers } from 'lucide-react';

interface ResearchLandingProps {
  onStart: () => void;
}

export default function ResearchLanding({ onStart }: ResearchLandingProps) {
  return (
    <div className="min-h-screen bg-[#0b1020] text-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-8">
              <Zap size={14} />
              <span>NEXT-GEN RESEARCH INFRASTRUCTURE</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter bg-gradient-to-r from-white via-white to-blue-500 bg-clip-text text-transparent">
              Cloud-Based Digital <br />Research Platform
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
              Merinova AI is a powerful research and development cloud platform designed for scientists, engineers, and developers. Run advanced simulations faster and smarter with dedicated computational power.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-3 transition-colors shadow-lg shadow-blue-500/20"
              >
                Create Free Account
                <Zap size={20} />
              </motion.button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-colors">
                View Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Scientific Computing Power</h2>
            <p className="text-gray-400">Integrated tools for high-fidelity molecular and materials research.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Quantum ESPRESSO',
                icon: <Zap className="text-blue-400" />,
                desc: 'Advanced electronic-structure calculations for materials science.',
                tags: ['DFT', 'Solid-State']
              },
              {
                title: 'LAMMPS',
                icon: <Beaker className="text-purple-400" />,
                desc: 'Molecular dynamics simulation for physics and chemistry research.',
                tags: ['MD', 'Large-Scale']
              },
              {
                title: 'GROMACS',
                icon: <Shield className="text-green-400" />,
                desc: 'High-performance molecular simulation for biomolecular systems.',
                tags: ['Cuda', 'Lipids']
              },
              {
                title: 'Cloud Clusters',
                icon: <Globe className="text-orange-400" />,
                desc: 'Run heavy simulations without local hardware limitations.',
                tags: ['HPC', 'Scalability']
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {feature.desc}
                </p>
                <div className="flex gap-2">
                  {feature.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-2 py-1 rounded bg-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Research Platform Details */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full" />
              <div className="relative bg-black/40 border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-[10px] font-mono text-gray-600 ml-4">maios-terminal --simulation-live</div>
                </div>
                <div className="space-y-2 font-mono text-xs text-blue-400 p-2">
                  <div className="flex gap-4"><span className="text-gray-600">0.01s</span> Loading MERINOVA V4.2 CORE...</div>
                  <div className="flex gap-4"><span className="text-gray-600">0.05s</span> Initializing GPU Cluster [A100-80GB] x 64...</div>
                  <div className="flex gap-4"><span className="text-gray-600">0.12s</span> Quantum ESPRESSO: ⚛ [Si] Potential detected.</div>
                  <div className="flex gap-4"><span className="text-gray-600">0.15s</span> Starting SCF calculation...</div>
                  <div className="flex gap-4 text-green-400 leading-tight">
                    Iteration 1: energy = -0.042 Ry <br />
                    Iteration 2: energy = -0.045 Ry <br />
                    Iteration 3: energy = -0.048 Ry <br />
                    System optimized. Result saved to cloud/sim-data-001.res
                  </div>
                  <div className="flex gap-4 text-white animate-pulse">|</div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold mb-8 tracking-tighter">Accelerated Discovery Pipeline</h2>
              <div className="space-y-8">
                {[
                  {
                    title: 'Automated Workflows',
                    desc: 'Chain multiple simulations together with our visual flowchart editor or via Python API.',
                    icon: <Layers size={24} className="text-blue-500" />
                  },
                  {
                    title: 'AI-Driven Analysis',
                    desc: 'Leverage MAIOS Brain to analyze simulation results and suggest parameter optimizations.',
                    icon: <Brain size={24} className="text-purple-500" />
                  },
                  {
                    title: 'Secure Collaboration',
                    desc: 'Manage research teams and datasets with university-grade security and access control.',
                    icon: <Shield size={24} className="text-green-500" />
                  }
                ].map(item => (
                  <div key={item.title} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-32 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter">Start Your Research Journey Today</h2>
          <p className="text-xl text-gray-400 mb-12">More science, less time. Build, simulate, and discover faster with Merinova AI Research Platform.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="px-12 py-5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-green-600/20"
          >
            Create Free Account
          </motion.button>
          <p className="mt-8 text-xs text-gray-600 font-mono uppercase tracking-[0.2em]">Academic and Enterprise plans available</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-[10px] font-mono uppercase tracking-widest">
        &copy; 2026 MERINOVA AI RESEARCH CLOUD. ALL RIGHTS RESERVED. <br />
        POWERED BY MAIOS CORE V4.2
      </footer>
    </div>
  );
}

function Brain({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"/>
    </svg>
  );
}
