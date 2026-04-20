import { motion } from 'motion/react';
import { Activity, Cpu, Zap, Shield, Target, Brain, Code2, Layers, Database, Terminal, ChevronRight, Settings } from 'lucide-react';

export default function LocomotionSystem() {
  const codeSnippets = [
    {
      title: "Reward Function",
      lang: "python",
      code: `def reward_function(state, action):
    reward = 0
    # forward movement
    reward += 2.0 * state.forward_velocity
    # balance reward
    reward -= 3.0 * abs(state.tilt)
    # energy penalty
    reward -= 0.01 * sum(action**2)
    # falling penalty
    if state.is_fallen:
        reward -= 100
    return reward`
    },
    {
      title: "Policy Network",
      lang: "python",
      code: `class PolicyNetwork(nn.Module):
    def __init__(self, state_dim, action_dim):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(state_dim, 256),
            nn.ReLU(),
            nn.Linear(256, 256),
            nn.ReLU(),
            nn.Linear(256, action_dim),
            nn.Tanh()
        )
    def forward(self, state):
        return self.net(state)`
    },
    {
      title: "PID Controller",
      lang: "python",
      code: `class PIDController:
    def compute(self, error, dt):
        self.integral += error * dt
        derivative = (error - self.prev_error) / dt
        output = (
            self.kp * error +
            self.ki * self.integral +
            self.kd * derivative
        )
        self.prev_error = error
        return output`
    }
  ];

  return (
    <section id="locomotion" className="py-24 bg-robot-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-robot-blue/30 bg-robot-blue/5 text-robot-blue text-xs font-mono mb-6">
            <Activity className="w-3 h-3" />
            <span>LOCOMOTION SYSTEM // RL + CONTROL THEORY</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
            AUTONOMOUS <span className="text-robot-blue">WALKING</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between Reinforcement Learning and classical Control Theory 
            to achieve robust, adaptive humanoid movement.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-20 items-center">
          {[
            { icon: <Database />, label: "SENSORS", sub: "IMU, Encoders" },
            { icon: <Zap />, label: "ESTIMATOR", sub: "State Filter" },
            { icon: <Brain />, label: "RL POLICY", sub: "Neural Net" },
            { icon: <Settings />, label: "CONTROLLER", sub: "PID / Torque" },
            { icon: <Cpu />, label: "JOINTS", sub: "Actuators" }
          ].map((step, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-full p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center group hover:border-robot-blue/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-robot-blue/10 flex items-center justify-center text-robot-blue mb-4 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <div className="font-mono text-sm font-bold mb-1">{step.label}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{step.sub}</div>
              </motion.div>
              {i < 4 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-robot-blue/30">
                  <ChevronRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Code Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {codeSnippets.map((snippet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center gap-2 mb-4 px-4 py-2 rounded-t-xl bg-white/5 border-x border-t border-white/10">
                <Code2 size={14} className="text-robot-blue" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">{snippet.title}</span>
              </div>
              <div className="flex-1 p-6 rounded-b-xl border border-white/10 bg-robot-dark/50 font-mono text-[11px] leading-relaxed overflow-x-auto">
                <pre className="text-gray-400">
                  <code className="text-robot-blue/80">
                    {snippet.code}
                  </code>
                </pre>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real-World Stack Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden"
        >
          <div className="p-8 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="text-robot-blue" />
              <h3 className="text-xl font-bold font-mono">REAL-WORLD ROBOTICS STACK</h3>
            </div>
            <p className="text-sm text-gray-500 font-mono">Production-grade technologies for humanoid locomotion.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.01]">
                  <th className="px-8 py-4 text-robot-blue font-bold">LAYER</th>
                  <th className="px-8 py-4 text-robot-blue font-bold">TECHNOLOGY</th>
                  <th className="px-8 py-4 text-robot-blue font-bold">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { layer: "BRAIN", tech: "PyTorch / TensorFlow", desc: "Deep Learning framework for policy training." },
                  { layer: "ALGORITHM", tech: "PPO / SAC / TD3", desc: "State-of-the-art Reinforcement Learning." },
                  { layer: "SIMULATION", tech: "MuJoCo / Isaac Gym", desc: "Physics engines for high-speed training." },
                  { layer: "HARDWARE", tech: "ROS2 / C++", desc: "Real-time communication and motor control." },
                  { layer: "SENSORS", tech: "IMU, LiDAR, Encoders", desc: "Proprioceptive and exteroceptive feedback." }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-4 font-bold text-white">{row.layer}</td>
                    <td className="px-8 py-4 text-robot-purple">{row.tech}</td>
                    <td className="px-8 py-4 text-gray-500">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Upgrade CTA */}
        <div className="mt-20 text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block p-1 rounded-2xl bg-gradient-to-r from-robot-blue to-robot-purple"
          >
            <div className="px-8 py-6 rounded-xl bg-robot-dark flex flex-col items-center gap-4">
              <div className="text-robot-blue font-mono text-sm font-bold uppercase tracking-[0.2em]">Next Evolution</div>
              <h4 className="text-2xl font-bold">Upgrade to Full Humanoid Walking System?</h4>
              <p className="text-gray-500 text-sm max-w-md">
                Unlock complete PPO algorithm code, MuJoCo simulation environments, and Boston Dynamics style control pipelines.
              </p>
              <button className="mt-2 px-8 py-3 bg-robot-blue text-robot-dark font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,163,255,0.4)] transition-all">
                INITIALIZE UPGRADE
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
