import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Cpu, Zap, Brain, Shield, Globe, Rocket, Award, Layers, Settings, Activity, User, Hand, Terminal, Database, Server, Code2, Mic, MessageSquare } from 'lucide-react';

const ProjectConcept: React.FC = () => {
  return (
    <div className="bg-robot-dark/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-robot-blue/20 to-robot-purple/20 mix-blend-overlay" />
        <img 
          src="https://picsum.photos/seed/robotics/1200/400" 
          alt="Robotics Concept" 
          className="w-full h-full object-cover opacity-40 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="px-3 py-1 rounded-full bg-robot-blue/20 border border-robot-blue/30 text-robot-blue text-[10px] font-mono uppercase tracking-widest">
              Project Brief v1.0
            </div>
            <div className="px-3 py-1 rounded-full bg-robot-purple/20 border border-robot-purple/30 text-robot-purple text-[10px] font-mono uppercase tracking-widest">
              Confidential
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tighter"
          >
            MERINOVA <span className="text-robot-blue">WEBTECH</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-mono text-sm mt-2 uppercase tracking-[0.2em]"
          >
            Future Intelligence AI Robot System
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="p-12 space-y-16 max-w-5xl mx-auto">
        
        {/* Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3 text-robot-blue mb-2">
              <Globe className="w-5 h-5" />
              <h2 className="font-mono font-bold uppercase tracking-widest">Project Overview</h2>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              <span className="text-white font-bold">Merinova Future Intelligence Robot</span> is an advanced AI-powered robotic system designed to bridge the gap between digital intelligence and physical action.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Brain className="w-4 h-4" />, text: "Thinking System" },
                { icon: <Zap className="w-4 h-4" />, text: "Physical Movement" },
                { icon: <Globe className="w-4 h-4" />, text: "Cloud Intelligence" },
                { icon: <Activity className="w-4 h-4" />, text: "Real-time Interaction" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-400">
                  <span className="text-robot-blue">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-robot-blue/5 border border-robot-blue/20 flex flex-col justify-center items-center text-center">
            <Award className="w-12 h-12 text-robot-blue mb-4" />
            <h3 className="text-white font-bold mb-2">Mission Goal</h3>
            <p className="text-xs text-gray-400 font-mono leading-relaxed">
              To act as a smart assistant robot capable of communication, learning, and decision-making in education, safety, and services.
            </p>
          </div>
        </section>

        {/* Core Idea */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-robot-purple">
            <Zap className="w-5 h-5" />
            <h2 className="font-mono font-bold uppercase tracking-widest">Core Idea</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Voice Interaction", desc: "Talk with humans naturally using advanced NLP." },
              { title: "Command Processing", desc: "Understand and execute complex voice commands." },
              { title: "Vision Intelligence", desc: "Recognize faces, objects, and environmental hazards." },
              { title: "Physical Action", desc: "Move and interact with the physical environment safely." },
              { title: "Adaptive Learning", desc: "Learn from every interaction to improve over time." },
              { title: "Safety First", desc: "Prioritize human safety in all decision-making loops." }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-robot-purple/30 transition-colors group">
                <h4 className="text-white font-bold mb-2 group-hover:text-robot-purple transition-colors">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Robot Engine */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-robot-green">
            <Cpu className="w-5 h-5" />
            <h2 className="font-mono font-bold uppercase tracking-widest">AI Robot Engine</h2>
          </div>
          <div className="space-y-4">
            {[
              { 
                layer: "Perception Layer", 
                icon: <Settings className="w-4 h-4" />,
                details: "Camera (Vision), Microphone (Speech), Sensors (Distance, Temp)"
              },
              { 
                layer: "Cognitive Layer", 
                icon: <Brain className="w-4 h-4" />,
                details: "NLP, LLM Brain, Decision Algorithms, Context Memory"
              },
              { 
                layer: "Planning Layer", 
                icon: <Layers className="w-4 h-4" />,
                details: "Task Scheduling, Behavior Selection, Priority-based Actions"
              },
              { 
                layer: "Action Layer", 
                icon: <Rocket className="w-4 h-4" />,
                details: "Motor Control, Movement Algorithms, Gesture Systems"
              }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-robot-green/10 border border-robot-green/20 flex items-center justify-center text-robot-green shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{item.layer}</h4>
                  <p className="text-sm text-gray-400 font-mono">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Visual Design & Sketch Description */}
        <section className="space-y-12">
          <div className="flex items-center gap-3 text-robot-purple">
            <Activity className="w-5 h-5" />
            <h2 className="font-mono font-bold uppercase tracking-widest">Visual Design & Sketch Description</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                <div>
                  <h3 className="text-white font-bold mb-2 uppercase text-sm tracking-wider">Overall Silhouette</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    A sleek, semi-humanoid silhouette standing approximately 150cm tall. The design prioritizes fluid, organic curves over sharp angles, creating a non-threatening and approachable presence suitable for assistant roles.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2 uppercase text-sm tracking-wider">Armor & Shell</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Segmented matte polymer plates in <span className="text-white font-bold">Pure White</span>. The plates are designed with precision gaps that reveal the <span className="text-gray-500 font-bold">Graphite</span> internal skeletal structure and <span className="text-robot-blue font-bold">Neon Cyan</span> fiber-optic cabling.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2 uppercase text-sm tracking-wider">The "Merinova Core"</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    A central, recessed circular chamber in the chest housing the primary AI processing unit. It emits a steady, rhythmic blue pulse, synchronized with the robot's "thinking" cycles.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { 
                  view: "Front View", 
                  desc: "Humanoid proportions with a focus on the glowing visor and chest core. Arms are relaxed, showing the 5-finger dexterity." 
                },
                { 
                  view: "Side View", 
                  desc: "Reveals the 'S-curve' of the spine, designed for balance. Visible cooling vents along the back of the legs and neck." 
                },
                { 
                  view: "Back View", 
                  desc: "Features the modular battery housing and the illuminated 'Spine' LED strip that indicates system health." 
                }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-robot-blue/5 border border-robot-blue/10">
                  <div className="text-[10px] font-mono text-robot-blue uppercase font-bold mb-1">{item.view}</div>
                  <p className="text-xs text-gray-400 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Design Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Head", detail: "Dome-shaped, visor eyes" },
              { label: "Joints", detail: "Exposed graphite servos" },
              { label: "Hands", detail: "5-finger tactile sensors" },
              { label: "Feet", detail: "Anti-slip rubberized base" }
            ].map((item, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">{item.label}</div>
                <div className="text-xs font-bold text-white">{item.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3D Design Concept */}
        <section className="space-y-12">
          <div className="flex items-center gap-3 text-robot-blue">
            <Layers className="w-5 h-5" />
            <h2 className="font-mono font-bold uppercase tracking-widest">3D Design Blueprint</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-robot-blue" />
                  Head (AI Core Unit)
                </h3>
                <ul className="space-y-2 text-sm text-gray-400 font-mono">
                  <li>• Oval + smooth futuristic dome</li>
                  <li>• Two circular LED smart eyes</li>
                  <li>• Expression colors: Blue (Normal), Green (Safe), Red (Alert)</li>
                  <li>• Hidden microphone grid</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-robot-blue" />
                  Torso (Main Brain)
                </h3>
                <ul className="space-y-2 text-sm text-gray-400 font-mono">
                  <li>• Transparent center chest panel</li>
                  <li>• Glowing "AI core cube" inside</li>
                  <li>• Pulsing light shows AI activity</li>
                  <li>• Hidden high-quality speaker system</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Hand className="w-4 h-4 text-robot-blue" />
                  Arms & Hands
                </h3>
                <ul className="space-y-2 text-sm text-gray-400 font-mono">
                  <li>• 3-segment robotic arms</li>
                  <li>• Smooth white + dark graphite joints</li>
                  <li>• 5-finger hand with soft rubber tips</li>
                  <li>• LED strips along arm edges</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-robot-blue" />
                  Legs & Movement
                </h3>
                <ul className="space-y-2 text-sm text-gray-400 font-mono">
                  <li>• Bipedal humanoid legs</li>
                  <li>• Shock-absorbing knee joints</li>
                  <li>• Soft rubber foot base for stability</li>
                  <li>• Silent movement system</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Special External Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: "Shoulder AI Pods", 
                desc: "Small circular modules on shoulders containing secondary environment sensors and 360° proximity detection.",
                icon: <Cpu className="w-4 h-4" />
              },
              { 
                title: "Head Sensor Ring", 
                desc: "Thin glowing ring around the head used for LIDAR scanning, object detection, and real-time environment mapping.",
                icon: <Globe className="w-4 h-4" />
              },
              { 
                title: "Back Power Core", 
                desc: "Removable high-density battery module with integrated cooling vents and a vertical energy level indicator.",
                icon: <Zap className="w-4 h-4" />
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10">
                <div className="flex items-center gap-3 mb-3 text-robot-blue">
                  {feature.icon}
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider">{feature.title}</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Color Palette */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-center text-white font-bold mb-8 uppercase tracking-widest">Branding & Color Theme</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Pure White", hex: "#FFFFFF", desc: "Clean AI Look", class: "bg-white" },
                { name: "Deep Blue", hex: "#0047AB", desc: "Trust & Intel", class: "bg-[#0047AB]" },
                { name: "Graphite", hex: "#2F2F2F", desc: "Tech Structure", class: "bg-[#2F2F2F]" },
                { name: "Neon Cyan", hex: "#00FFFF", desc: "Future Intel", class: "bg-[#00FFFF]" }
              ].map((color, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className={`w-16 h-16 rounded-2xl shadow-lg ${color.class}`} />
                  <div className="text-center">
                    <div className="text-xs font-bold text-white">{color.name}</div>
                    <div className="text-[10px] font-mono text-gray-500">{color.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hardware & Tech */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-robot-blue">
              <Settings className="w-5 h-5" />
              <h2 className="font-mono font-bold uppercase tracking-widest">Hardware Design</h2>
            </div>
            <ul className="space-y-3">
              {['Camera Module (Vision)', 'Microphones (Voice Detection)', 'Speaker (Voice Output)', 'Servo Motors (Movement)', 'Raspberry Pi / AI Chip', 'Battery System', 'WiFi / Bluetooth Module'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-robot-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-robot-purple">
              <Zap className="w-5 h-5" />
              <h2 className="font-mono font-bold uppercase tracking-widest">Software Stack</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'NLP Models', 'Firebase', 'Cloud DB'].map((tech, i) => (
                <span key={i} className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400 uppercase">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* AI Engine & Intelligence */}
        <section className="space-y-12">
          <div className="flex items-center gap-3 text-robot-green">
            <Brain className="w-5 h-5" />
            <h2 className="font-mono font-bold uppercase tracking-widest">AI Engine & Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                <h3 className="text-white font-bold uppercase text-sm tracking-wider">The "Cloud Brain" Logic</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Merinova utilizes a hybrid AI architecture. While basic motor functions are handled locally, all high-level reasoning, natural language processing, and visual recognition are processed in the cloud using state-of-the-art LLMs like <span className="text-robot-blue font-bold">Gemini</span> and <span className="text-robot-green font-bold">ChatGPT</span>.
                </p>
                
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-4">
                  <div className="text-[10px] font-mono text-robot-green uppercase font-bold">ChatGPT Integration (Node.js)</div>
                  <div className="font-mono text-[9px] text-gray-400 overflow-x-auto">
                    <pre>
{`const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: message }]
});`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded bg-robot-blue/20 text-robot-blue">
                      <Zap className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Real-Time NLP</div>
                      <div className="text-[10px] text-gray-500">Low-latency speech-to-text and intent analysis.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded bg-robot-purple/20 text-robot-purple">
                      <Shield className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Safety Guardrails</div>
                      <div className="text-[10px] text-gray-500">Built-in ethical constraints and safety-first decision making.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Terminal className="w-4 h-4 text-robot-green" />
                  System Instructions
                </h3>
                <div className="font-mono text-[10px] text-robot-green/80 space-y-2">
                  <p>{"{"}</p>
                  <p className="pl-4">"role": "system",</p>
                  <p className="pl-4">"content": "You are Merinova AI Robot."</p>
                  <p className="pl-4">"- Help students with educational tasks"</p>
                  <p className="pl-4">"- Prioritize human safety at all times"</p>
                  <p className="pl-4">"- Speak clearly and maintain a friendly tone"</p>
                  <p className="pl-4">"- Support multi-language (Amharic/English)"</p>
                  <p>{"}"}</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-robot-green/5 border border-robot-green/10 space-y-4">
                <h3 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  <Mic className="w-4 h-4 text-robot-green" />
                  Voice Control System
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                    <div className="text-[9px] text-gray-500 uppercase mb-1">Input</div>
                    <div className="text-[10px] text-white font-mono">SpeechRecognition API</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                    <div className="text-[9px] text-gray-500 uppercase mb-1">Output</div>
                    <div className="text-[10px] text-white font-mono">pyttsx3 / Web Speech</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full Developer Architecture */}
        <section className="space-y-12">
          <div className="flex items-center gap-3 text-robot-blue">
            <Server className="w-5 h-5" />
            <h2 className="font-mono font-bold uppercase tracking-widest">Full Developer Architecture</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* System Flow */}
            <div className="space-y-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-robot-blue" />
                System Flow
              </h3>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 font-mono text-[10px] space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="px-4 py-2 rounded bg-robot-blue/10 border border-robot-blue/30 text-robot-blue w-full text-center">Mobile App / Dashboard</div>
                  <div className="h-4 w-px bg-robot-blue/30" />
                  <div className="px-4 py-2 rounded bg-robot-purple/10 border border-robot-purple/30 text-robot-purple w-full text-center">Backend API (Node.js)</div>
                  <div className="h-4 w-px bg-robot-purple/30" />
                  <div className="px-4 py-2 rounded bg-robot-green/10 border border-robot-green/30 text-robot-green w-full text-center">AI Engine (Chat + Vision)</div>
                  <div className="h-4 w-px bg-robot-green/30" />
                  <div className="px-4 py-2 rounded bg-white/5 border border-white/10 text-white w-full text-center">Robot Hardware (Raspberry Pi)</div>
                </div>
              </div>
            </div>

            {/* Folder Structure */}
            <div className="space-y-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Database className="w-4 h-4 text-robot-blue" />
                Project Structure
              </h3>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 font-mono text-[10px] text-gray-400">
                <pre className="leading-relaxed">
{`merinova-backend/
├── server.js
├── routes/
│   ├── robot.js
│   ├── user.js
│   └── trip.js
├── models/
│   ├── User.js
│   └── RobotLog.js
├── controllers/
│   └── robotController.js
└── config/
    └── db.js`}
                </pre>
              </div>
            </div>
          </div>

          {/* Code Snippets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                  <Code2 className="w-3 h-3" />
                  server.js (Node.js)
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 font-mono text-[10px] text-robot-blue overflow-x-auto">
                <pre>
{`const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/robot/command", (req, res) => {
  const { command } = req.body;
  // AI Logic Here
  res.json({ action: "Executing " + command });
});

app.listen(3000);`}
                </pre>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                  <Terminal className="w-3 h-3" />
                  robot_control.py (Python)
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 font-mono text-[10px] text-robot-green overflow-x-auto">
                <pre>
{`import requests

def send_command(cmd):
    url = "http://api.merinova.tech/command"
    res = requests.post(url, json={"command": cmd})
    print(f"Robot: {res.json()['action']}")

send_command("move_forward")`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Smart AI Learning System */}
        <section className="space-y-12">
          <div className="flex items-center gap-3 text-robot-purple">
            <Award className="w-5 h-5" />
            <h2 className="font-mono font-bold uppercase tracking-widest">Smart AI Learning System</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "AI Study Assistant",
                desc: "Personalized tutor that explains complex subjects in Amharic, Oromo, or English. Summarizes lessons and answers student queries 24/7.",
                icon: <Brain className="w-5 h-5" />
              },
              {
                title: "Smart Attendance",
                desc: "Automated attendance tracking using face detection and session activity monitoring. Detects 'away' status and marks partial attendance.",
                icon: <Activity className="w-5 h-5" />
              },
              {
                title: "Live Learning Core",
                desc: "Integrated live session platform with real-time interaction, group chat, and teacher-moderated marks management.",
                icon: <Globe className="w-5 h-5" />
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="text-robot-purple">{feature.icon}</div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-robot-purple/10 to-transparent border border-white/10">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2 uppercase text-sm tracking-widest">
              <Rocket className="w-4 h-4 text-robot-purple" />
              Startup Roadmap (Phase 1)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: "01", label: "Auth & Roles", detail: "Admin, Teacher, Student" },
                { step: "02", label: "AI Chatbot", detail: "Multilingual Tutor" },
                { step: "03", label: "Live Sessions", detail: "WebRTC + Attendance" },
                { step: "04", label: "Marks & Reports", detail: "Automated Analytics" }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-robot-purple font-mono font-bold text-lg mb-1">{item.step}</div>
                  <div className="text-xs font-bold text-white mb-1">{item.label}</div>
                  <div className="text-[10px] text-gray-500">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Database Architecture */}
        <section className="space-y-12">
          <div className="flex items-center gap-3 text-robot-blue">
            <Database className="w-5 h-5" />
            <h2 className="font-mono font-bold uppercase tracking-widest">Database Architecture (MongoDB)</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <h3 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  <User className="w-4 h-4 text-robot-blue" />
                  Users Collection
                </h3>
                <div className="font-mono text-[10px] text-gray-400 bg-black/20 p-4 rounded-xl border border-white/5">
                  <pre>
{`{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique)",
  "role": "admin | teacher | student",
  "department": "String",
  "photoUrl": "String",
  "createdAt": "Date"
}`}
                  </pre>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <h3 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-4 h-4 text-robot-green" />
                  Attendance Collection
                </h3>
                <div className="font-mono text-[10px] text-gray-400 bg-black/20 p-4 rounded-xl border border-white/5">
                  <pre>
{`{
  "_id": "ObjectId",
  "classId": "ObjectId",
  "studentId": "ObjectId",
  "status": "present | absent | partial",
  "joinTime": "Date",
  "leaveTime": "Date",
  "duration": "Number"
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <h3 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-robot-purple" />
                  Marks Collection
                </h3>
                <div className="font-mono text-[10px] text-gray-400 bg-black/20 p-4 rounded-xl border border-white/5">
                  <pre>
{`{
  "_id": "ObjectId",
  "classId": "ObjectId",
  "studentId": "ObjectId",
  "teacherId": "ObjectId",
  "assessment": "String",
  "score": "Number",
  "maxScore": "Number",
  "date": "Date"
}`}
                  </pre>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <h3 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-robot-blue" />
                  Messages Collection
                </h3>
                <div className="font-mono text-[10px] text-gray-400 bg-black/20 p-4 rounded-xl border border-white/5">
                  <pre>
{`{
  "_id": "ObjectId",
  "classId": "ObjectId",
  "senderId": "ObjectId",
  "content": "String",
  "timestamp": "Date"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real World Applications */}
        <section className="p-8 rounded-3xl bg-gradient-to-br from-robot-blue/10 to-robot-purple/10 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Real-World Applications</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: <BookOpen />, label: "Education" },
              { icon: <Activity />, label: "Healthcare" },
              { icon: <Globe />, label: "Home Assistant" },
              { icon: <Shield />, label: "Security" },
              { icon: <Rocket />, label: "Navigation" }
            ].map((app, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-black/20 border border-white/5 text-center">
                <div className="text-robot-blue">{app.icon}</div>
                <div className="text-[10px] font-mono text-gray-400 uppercase">{app.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Innovation Strength */}
        <section className="space-y-6 text-center py-12">
          <h2 className="text-3xl font-bold text-white tracking-tighter">Why It's Unique</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Designed for African/Ethiopian environment",
              "Low-cost hardware optimization",
              "Multilingual (Amharic, English, Oromo)",
              "Focus on Education + Safety",
              "Cloud-fused Intelligence"
            ].map((strength, i) => (
              <div key={i} className="px-6 py-3 rounded-full bg-robot-blue/10 border border-robot-blue/20 text-robot-blue text-xs font-mono">
                {strength}
              </div>
            ))}
          </div>
        </section>

        {/* Footer Statement */}
        <footer className="pt-12 border-t border-white/10 text-center space-y-4">
          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto italic">
            "Merinova Future Intelligence Robot represents the next generation of smart AI systems, combining machine learning, robotics, and human interaction into a single intelligent platform."
          </p>
          <div className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em]">
            © 2026 Merinova WebTech | Merikeb Gashu
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProjectConcept;
