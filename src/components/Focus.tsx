import { motion } from 'motion/react';
import { Brain, Eye, Settings, Globe, Activity, Layout, Languages, Heart, User } from 'lucide-react';

const focusAreas = [
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Humanoid Robotics",
    desc: "Developing next-generation humanoid AI systems with advanced kinematics."
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI & Deep Learning",
    desc: "Integrating VLA models and reinforcement learning for intelligent reasoning."
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Autonomous Walking",
    desc: "Building robust RL-based control systems for real-world locomotion."
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Computer Vision",
    desc: "Real-time object detection and spatial interpretation for robotics."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "ROS Simulation",
    desc: "High-fidelity Gazebo and ROS2 environments for autonomous testing."
  },
  {
    icon: <Languages className="w-6 h-6" />,
    title: "Multilingual Intelligence",
    desc: "Developing MMI systems supporting Amharic, English, Oromo, and Tigrinya."
  },
  {
    icon: <User className="w-6 h-6" />,
    title: "FIPES Intelligence",
    desc: "Face Identity + Personality + Emotion System for personalized humanoid interaction."
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Full-Stack AI",
    desc: "Unified dashboards and control systems for complex robotic architectures."
  }
];

export default function Focus() {
  return (
    <section id="focus" className="py-24 bg-robot-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">
            CORE <span className="text-robot-blue">FOCUS</span> AREAS
          </h2>
          <div className="h-1 w-20 bg-robot-blue mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {focusAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-robot-blue/10 flex items-center justify-center text-robot-blue mb-6 group-hover:scale-110 transition-transform">
                {area.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-mono">{area.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {area.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
