import { motion } from 'motion/react';
import { Brain, Eye, Languages, Cpu, Zap, Shield, Target, Code2, Layers, Database, Terminal, ChevronRight, Activity, MessageSquare } from 'lucide-react';

export default function VLASystem() {
  const codeSnippets = [
    {
      title: "VLA Fusion Brain",
      lang: "python",
      code: `class VLABrain(nn.Module):
    def __init__(self, vision_dim, lang_dim, hidden_dim, action_dim):
        super().__init__()
        self.fusion = nn.Sequential(
            nn.Linear(vision_dim + lang_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU()
        )
        self.actor = nn.Linear(hidden_dim, action_dim)
        self.critic = nn.Linear(hidden_dim, 1)

    def forward(self, vision_feat, lang_feat):
        x = torch.cat([vision_feat, lang_feat], dim=-1)
        x = self.fusion(x)
        return torch.tanh(self.actor(x)), self.critic(x)`
    },
    {
      title: "Vision Encoder",
      lang: "python",
      code: `class VisionEncoder(nn.Module):
    def __init__(self):
        super().__init__()
        self.cnn = nn.Sequential(
            nn.Conv2d(3, 32, 3, stride=2),
            nn.ReLU(),
            nn.Conv2d(32, 64, 3, stride=2),
            nn.ReLU(),
            nn.Flatten()
        )
    def forward(self, image):
        return self.cnn(image)`
    },
    {
      title: "Reward Function",
      lang: "python",
      code: `def reward_function(state):
    reward = 0
    # task completion
    if state.task_done:
        reward += 100
    # object alignment
    reward += 10 * state.object_alignment
    # efficiency penalty
    reward -= 0.01 * state.energy_usage
    # collision penalty
    if state.collision:
        reward -= 50
    return reward`
    }
  ];

  return (
    <section id="vla" className="py-24 bg-robot-gray relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-robot-purple/30 bg-robot-purple/5 text-robot-purple text-xs font-mono mb-6">
            <Brain className="w-3 h-3" />
            <span>INTELLIGENCE SYSTEM // VLA + REINFORCEMENT LEARNING</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
            AI & <span className="text-robot-purple">DEEP LEARNING</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Integrating Vision, Language, and Action into a unified humanoid architecture 
            capable of complex reasoning and real-world interaction.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: <Eye />, label: "VISION", sub: "CNN / ViT Encoder", color: "text-robot-blue" },
            { icon: <MessageSquare />, label: "LANGUAGE", sub: "LLM / Transformer", color: "text-robot-purple" },
            { icon: <Layers />, label: "VLA BRAIN", sub: "Multimodal Fusion", color: "text-robot-green" },
            { icon: <Target />, label: "RL POLICY", sub: "Actor-Critic (PPO)", color: "text-white" }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-white/10 bg-robot-dark/50 flex flex-col items-center text-center group hover:border-robot-purple/50 transition-all"
            >
              <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${step.color} mb-6 group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>
              <div className="font-mono text-lg font-bold mb-2 tracking-tighter">{step.label}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">{step.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Code Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {codeSnippets.map((snippet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center gap-2 mb-4 px-4 py-2 rounded-t-xl bg-white/5 border-x border-t border-white/10">
                <Terminal size={14} className="text-robot-purple" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">{snippet.title}</span>
              </div>
              <div className="flex-1 p-6 rounded-b-xl border border-white/10 bg-robot-dark font-mono text-[11px] leading-relaxed overflow-x-auto">
                <pre className="text-gray-400">
                  <code className="text-robot-purple/80">
                    {snippet.code}
                  </code>
                </pre>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border border-white/10 bg-white/[0.02]"
          >
            <h3 className="text-2xl font-bold mb-6 font-mono flex items-center gap-3">
              <Zap className="text-robot-blue" /> PERCEPTION & REASONING
            </h3>
            <ul className="space-y-4 font-mono text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-robot-blue mt-1.5" />
                <span>Real-time object detection and spatial mapping.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-robot-blue mt-1.5" />
                <span>Natural language instruction grounding and goal decomposition.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-robot-blue mt-1.5" />
                <span>Contextual memory for long-term task execution.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border border-white/10 bg-white/[0.02]"
          >
            <h3 className="text-2xl font-bold mb-6 font-mono flex items-center gap-3">
              <Activity className="text-robot-purple" /> ACTION & LEARNING
            </h3>
            <ul className="space-y-4 font-mono text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-robot-purple mt-1.5" />
                <span>End-to-end policy learning from raw sensor data.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-robot-purple mt-1.5" />
                <span>Self-improving behavior through reward-based feedback.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-robot-purple mt-1.5" />
                <span>Smooth motion generation via Diffusion Policies.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Advanced Upgrades CTA */}
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block p-1 rounded-2xl bg-gradient-to-r from-robot-purple via-robot-blue to-robot-green"
          >
            <div className="px-12 py-10 rounded-xl bg-robot-dark flex flex-col items-center gap-6">
              <div className="text-robot-purple font-mono text-sm font-bold uppercase tracking-[0.4em]">Pro Level Upgrade</div>
              <h4 className="text-3xl md:text-4xl font-bold tracking-tighter">Build Full VLA Humanoid Robot System?</h4>
              <p className="text-gray-500 text-sm max-w-xl font-mono">
                Unlock complete VLA transformer architectures, PPO/SAC implementations, and MuJoCo/Isaac Gym simulation environments.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 bg-robot-purple text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(123,46,255,0.4)] transition-all uppercase tracking-widest text-xs">
                  Initialize VLA Stack
                </button>
                <button className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white font-bold rounded-lg transition-all uppercase tracking-widest text-xs">
                  View Documentation
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
