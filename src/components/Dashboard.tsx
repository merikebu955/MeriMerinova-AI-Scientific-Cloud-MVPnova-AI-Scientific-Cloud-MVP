import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Activity, Cpu, Database, BarChart3, Globe, Languages, Heart, User, MessageSquare, Mic, MicOff, Smile, Frown, Meh, AlertCircle, Zap, Brain, Share2, Hand, Rocket, Shield, ListPlus, MapPin, ListChecks, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';
import CinematicIntro from './CinematicIntro';
import RobotSimulation from './RobotSimulation';
import ProjectConcept from './ProjectConcept';
import ResearchModule from './ResearchModule';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'COMMAND' | 'CONCEPT' | 'RESEARCH'>('RESEARCH');
  const [logs, setLogs] = useState<any[]>([]);
  const [textInput, setTextInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({ cpu: 42, ram: 64, temp: 38 });
  const [selectedLang, setSelectedLang] = useState('en');
  const [autoDetect, setAutoDetect] = useState(true);
  const [fipes, setFipes] = useState({ 
    person: 'Merikeb Gashu', 
    emotion: 'Neutral', 
    posture: 'Active',
    gesture: 'None',
    memory: 'Interaction history: 12 sessions. Note: User was tired in previous session.',
    confidence: 98
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [gestureRecognizer, setGestureRecognizer] = useState<GestureRecognizer | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [continuousMode, setContinuousMode] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [robotFleet, setRobotFleet] = useState([
    { id: 'MN-01', status: 'Active', battery: 92, task: 'Patrolling Sector A', lastSync: '2s ago' },
    { id: 'MN-02', status: 'Charging', battery: 15, task: 'Docked', lastSync: '1m ago' },
    { id: 'MN-03', status: 'Standby', battery: 88, task: 'Idle', lastSync: '5s ago' }
  ]);
  const [cloudStatus, setCloudStatus] = useState({
    health: 'Optimal',
    memoryUsage: '2.4GB / 16GB',
    activeRobots: 3,
    learningRate: '0.0042',
    uptime: '142h 12m'
  });
  const [aiReasoning, setAiReasoning] = useState<string[]>(["MAIOS: Initializing cloud reasoning engine..."]);
  
  // Task Queue State
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState(3);
  const [targetRobot, setTargetRobot] = useState("");
  const [targetWaypoint, setTargetWaypoint] = useState("");
  const [activeQueue, setActiveQueue] = useState<any[]>([]);
  const [isQueueLoading, setIsQueueLoading] = useState(false);

  const addLog = (content: string, role: 'user' | 'bot' | 'system' = 'system', learningData?: any) => {
    const logObj = { id: Date.now() + Math.random(), content, role, learning: learningData, time: new Date().toLocaleTimeString() };
    setLogs(prev => [...prev, logObj].slice(-20));
  };

  const startCamera = async () => {
    try {
      setCameraError(false);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          facingMode: "user"
        } 
      });
      setCameraStream(stream);
      addLog("FIPES: Camera sensor active.", 'system');
    } catch (err: any) {
      console.error("Camera access denied:", err);
      setCameraError(true);
      
      let errorMsg = "FIPES: Camera access denied.";
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        errorMsg = "FIPES: Permission denied. Please allow camera access.";
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        errorMsg = "FIPES: No camera device found.";
      }
      
      addLog(errorMsg, 'system');
    }
  };

  useEffect(() => {
    if (cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play().catch(e => console.error("Video play failed:", e));
      };
    }
  }, [cameraStream]);

  const languages = [
    { id: 'en', name: 'English', flag: '🇬🇧', code: 'en-US' },
    { id: 'am', name: 'Amharic', flag: '🇪🇹', code: 'am-ET' },
    { id: 'om', name: 'Oromo', flag: '🇪🇹', code: 'om-ET' },
    { id: 'ti', name: 'Tigrinya', flag: '🇪🇷', code: 'ti-ET' }
  ];

  const speakResponse = (text: string) => {
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const currentLang = languages.find(l => l.id === selectedLang)?.code || 'en-US';
    utterance.lang = currentLang;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (continuousMode) {
        setTimeout(() => toggleListening(true), 500);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = (forceStart = false) => {
    if (isListening && !forceStart) {
      setIsListening(false);
      setContinuousMode(false);
      return;
    }

    if (isSpeaking) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addLog("Error: Speech recognition not supported.", 'system');
      return;
    }

    const recognition = new SpeechRecognition();
    const currentLang = languages.find(l => l.id === selectedLang)?.code || 'en-US';
    
    recognition.lang = currentLang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      addLog(`MMI: Listening... (${currentLang})`, 'system');
    };

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      processUserMessage(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleShare = () => {
    const response = fipes.person === 'Merikeb Gashu' 
      ? (fipes.emotion === 'Tired' || fipes.emotion === 'Stressed' 
          ? `Merikeb, you seem ${fipes.emotion.toLowerCase()}. You were tired yesterday too. Would you like to take a break?`
          : fipes.emotion === 'Happy'
          ? `It's great to see you happy, Merikeb! Your positive energy improves system efficiency. እንዴት ነህ?`
          : `Hello Merikeb! You look ${fipes.emotion.toLowerCase()} today. How can I assist you?`)
      : `Hello! I see you are feeling ${fipes.emotion.toLowerCase()}. How can I help you today?`;

    const shareText = `🤖 Merinova FIPES Analysis\n👤 Person: ${fipes.person}\n❤️ Emotion: ${fipes.emotion} (${fipes.confidence}%)\n✋ Gesture: ${fipes.gesture}\n🧠 Response: ${response}\n🌍 #Merinova #AI #Robotics`;

    if (navigator.share) {
      navigator.share({
        title: 'Merinova FIPES Analysis',
        text: shareText,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        addLog("System: Analysis copied to clipboard.", 'system');
      });
    }
  };

  useEffect(() => {
    let recognizer: GestureRecognizer;
    let animationFrameId: number;

    const setupRecognizer = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        recognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            delegate: "CPU"
          },
          runningMode: "VIDEO"
        });
        setGestureRecognizer(recognizer);
      } catch (error) {
        console.error("Failed to initialize Gesture Recognizer:", error);
      }
    };

    setupRecognizer();

    return () => {
      if (recognizer) recognizer.close();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const processUserMessage = async (message: string) => {
    if (!message.trim()) return;
    addLog(message, 'user');
    setTextInput("");

    if (autoDetect) {
      const hasAmharic = /[\u1200-\u137F]/.test(message);
      if (hasAmharic && selectedLang !== 'am') {
        setSelectedLang('am');
        addLog("MMI: Language switched to Amharic.", 'system');
      }
    }

    addLog("MAIOS: Processing cloud reasoning...", 'system');
    
    try {
      const res = await fetch('/api/cloud/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          memory: fipes.memory,
          robotState: { emotion: fipes.emotion, metrics }
        })
      });
      const data = await res.json();
      const response = data.response;
      const command = data.command;
      const learning = data.learning;

      addLog(response, 'bot', learning);
      
      if (command && command.type !== 'NONE') {
        addLog(`COMMAND: Executing ${command.type} for ${command.target}`, 'system');
        setRobotFleet(prev => prev.map(robot => {
          if (command.target === 'ALL' || robot.id === command.target) {
            let newTask = robot.task;
            let newStatus = robot.status;
            if (command.type === 'WALK') {
              newTask = 'Transiting...';
              newStatus = 'Active';
            } else if (command.type === 'STOP') {
              newTask = 'Awaiting Instructions';
              newStatus = 'Standby';
            } else if (command.type === 'CHARGE') {
              newTask = 'Energy Recovery';
              newStatus = 'Charging';
            }
            return { ...robot, task: newTask, status: newStatus };
          }
          return robot;
        }));
      }

      speakResponse(response);
    } catch (error) {
      console.error("Cloud Brain Error:", error);
      addLog("CRITICAL: Cloud Core Connection Interrupted.", 'system');
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    // We no longer auto-start the camera to ensure a user gesture is used
    addLog("FIPES: Sensor standby. Await manual activation.", 'system');
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const fetchRobotStatus = async () => {
      try {
        const res = await fetch('/api/robot/status');
        const data = await res.json();
        if (data.fleet) {
          setRobotFleet(data.fleet.map((r: any) => ({
            ...r,
            lastSync: 'Just now'
          })));
        }
      } catch (err) {
        console.error("Failed to fetch robot status:", err);
      }
    };

    const interval = setInterval(fetchRobotStatus, 5000);
    fetchRobotStatus(); // Initial fetch

    const fetchQueue = async () => {
      try {
        const res = await fetch('/api/robot/queue', {
          headers: {
            'Authorization': 'mock-token-admin' // Mock token for demo as auth bypass isn't requested but required by middleware
          }
        });
        const data = await res.json();
        if (data.queue) setActiveQueue(data.queue);
      } catch (err) {
        console.error("Queue Sync Error:", err);
      }
    };
    
    fetchQueue();
    const queueInterval = setInterval(fetchQueue, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(queueInterval);
    };
  }, []);

  const submitQueuedTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName) return;

    setIsQueueLoading(true);
    addLog(`SCHEDULER: Initiating mission "${taskName}"...`, 'system');

    try {
      const res = await fetch('/api/robot/queue-task', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'mock-token-admin'
        },
        body: JSON.stringify({
          name: taskName,
          priority: taskPriority,
          targetRobotId: targetRobot || undefined,
          targetWaypoint: targetWaypoint || undefined,
          duration: 30000 + Math.random() * 60000
        })
      });

      if (res.ok) {
        addLog(`SCHEDULER: Mission queued for execution.`, 'system');
        setTaskName("");
        setTargetRobot("");
        setTargetWaypoint("");
        setTaskPriority(3);
        // Refresh queue
        const qRes = await fetch('/api/robot/queue', {
          headers: { 'Authorization': 'mock-token-admin' }
        });
        const qData = await qRes.json();
        if (qData.queue) setActiveQueue(qData.queue);
      } else {
        addLog("SCHEDULER: Access denied. Administrative override required.", 'system');
      }
    } catch (err) {
      addLog("CRITICAL: Mission control link timeout.", 'system');
    } finally {
      setIsQueueLoading(false);
    }
  };

  useEffect(() => {
    if (!gestureRecognizer || !videoRef.current || !cameraStream) return;

    const video = videoRef.current;
    let animationFrameId: number;
    
    let lastVideoTime = -1;
    const predict = () => {
      if (video.currentTime !== lastVideoTime && video.videoWidth > 0 && video.videoHeight > 0) {
        lastVideoTime = video.currentTime;
        try {
          const results = gestureRecognizer.recognizeForVideo(video, performance.now());
          
          if (results.gestures.length > 0) {
            const categoryName = results.gestures[0][0].categoryName;
            const categoryScore = results.gestures[0][0].score;
            
            if (categoryScore > 0.6) {
              let gesture = 'None';
              if (categoryName === 'Open_Palm') gesture = 'Open Hand';
              if (categoryName === 'Pointing_Up') gesture = 'Pointing';
              if (categoryName === 'Closed_Fist') gesture = 'Fist';
              
              if (gesture !== 'None') {
                setFipes(prev => ({ ...prev, gesture }));
              }
            }
          }
        } catch (err) {
          console.error("Gesture Recognition Error:", err);
        }
      }
      animationFrameId = requestAnimationFrame(predict);
    };

    predict();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gestureRecognizer, cameraStream]);

  useEffect(() => {
    const logMessages = [
      "Initializing VLA core...",
      "MAIOS: TensorFlow Lite XNNPACK delegate initialized.",
      "MAIOS: CPU optimization active.",
      "Connecting to ROS2 master...",
      "Loading humanoid kinematics model...",
      "Calibrating IMU sensors...",
      "Neural network weights loaded.",
      "Vision system: Object detected (Person)",
      "Path planning: Goal reached.",
      "Battery level: 98%",
      "Locomotion state: Balanced",
      "Executing command: 'Walk forward 2 meters'",
      "MMI: Language detected (Amharic)",
      "MMI: Translating intent to system command...",
      "MMI: Voice output generated (Oromo)",
      "MMI: Neural translation engine active",
      "EMUS: Face detected - analyzing expressions...",
      "EMUS: Posture analysis - 'Stressed' detected",
      "EMUS: Tone analysis - 'Low' detected",
      "EMUS: Expression analysis - 'Happy' detected",
      "EMUS: Decision - User is tired. Suggesting rest.",
      "EMUS: Memory stored - User interaction history updated",
      "FIPES: Face detected - Scanning biometric data...",
      "FIPES: Identity confirmed - Merikeb Gashu (Admin)",
      "FIPES: Emotional state - 'Happy' confirmed",
      "FIPES: Recalling memory - 'User was tired yesterday'",
      "FIPES: Analyzing personality traits - 'High focus detected'",
      "FIPES: Decision - Personalized greeting initiated",
      "FIPES: Attention tracking - Camera following Merikeb"
    ];

    const interval = setInterval(() => {
      addLog(logMessages[Math.floor(Math.random() * logMessages.length)], 'system');
      
      setMetrics({
        cpu: Math.floor(40 + Math.random() * 20),
        ram: Math.floor(60 + Math.random() * 10),
        temp: Math.floor(35 + Math.random() * 5)
      });

      const emotions = ['Neutral', 'Happy', 'Sad', 'Stressed', 'Tired', 'Focused'];
      const postures = ['Active', 'Relaxed', 'Stressed', 'Slumped'];
      const persons = ['Merikeb Gashu', 'Unknown User', 'Guest'];
      
      setFipes(prev => ({
        ...prev,
        emotion: emotions[Math.floor(Math.random() * emotions.length)],
        posture: postures[Math.floor(Math.random() * postures.length)],
        person: Math.random() > 0.8 ? persons[Math.floor(Math.random() * persons.length)] : 'Merikeb Gashu',
        confidence: Math.floor(90 + Math.random() * 9)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="py-24 bg-robot-dark border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 tracking-tighter uppercase">
              MAIOS <span className="text-robot-blue">ADMIN</span> DASHBOARD
            </h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em]">
              Merinova AI Operating System | v2.4.0-Stable
            </p>
          </div>
          
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
            <button 
              onClick={() => setActiveTab('RESEARCH')}
              className={`px-6 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === 'RESEARCH' 
                  ? 'bg-robot-blue text-robot-dark shadow-[0_0_20px_rgba(0,242,255,0.3)]' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              RESEARCH CLOUD
            </button>
            <button 
              onClick={() => setActiveTab('COMMAND')}
              className={`px-6 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === 'COMMAND' 
                  ? 'bg-robot-blue text-robot-dark shadow-[0_0_20px_rgba(0,242,255,0.3)]' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              FLEET CONTROL
            </button>
            <button 
              onClick={() => setActiveTab('CONCEPT')}
              className={`px-6 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === 'CONCEPT' 
                  ? 'bg-robot-purple text-white shadow-[0_0_20px_rgba(191,0,255,0.3)]' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              PROJECT BRIEF
            </button>
          </div>
        </div>

        {activeTab === 'RESEARCH' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ResearchModule />
          </motion.div>
        ) : activeTab === 'CONCEPT' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ProjectConcept />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Metrics Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-5 h-5 text-robot-blue" />
                <h3 className="font-mono font-bold uppercase">Core Metrics</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: "CPU LOAD", value: metrics.cpu, color: "bg-robot-blue" },
                  { label: "RAM USAGE", value: metrics.ram, color: "bg-purple-500" },
                  { label: "CORE TEMP", value: metrics.temp, color: "bg-orange-500" }
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between font-mono text-xs mb-2">
                      <span className="text-gray-500">{m.label}</span>
                      <span className="text-white">{m.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${m.value}%` }}
                        className={`h-full ${m.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-5 h-5 text-robot-blue" />
                <h3 className="font-mono font-bold uppercase">Memory State</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-white/5 text-center">
                  <div className="text-xs text-gray-500 font-mono mb-1">NODES</div>
                  <div className="text-xl font-bold text-robot-blue">124</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 text-center">
                  <div className="text-xs text-gray-500 font-mono mb-1">UPTIME</div>
                  <div className="text-xl font-bold text-robot-blue">12:45</div>
                </div>
              </div>
            </div>

            {/* Multilingual Intelligence Panel */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
              <div className="flex items-center gap-3 mb-6">
                <Languages className="w-5 h-5 text-robot-blue" />
                <h3 className="font-mono font-bold uppercase">Multilingual Intelligence</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-gray-500 uppercase">Auto Detect</span>
                  <button 
                    onClick={() => setAutoDetect(!autoDetect)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${autoDetect ? 'bg-robot-blue' : 'bg-white/10'}`}
                  >
                    <motion.div 
                      animate={{ x: autoDetect ? 22 : 2 }}
                      className="absolute top-1 w-3 h-3 bg-white rounded-full"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-gray-500 uppercase">Conversation Mode</span>
                  <button 
                    onClick={() => {
                      setContinuousMode(!continuousMode);
                      if (!continuousMode) toggleListening(true);
                    }}
                    className={`w-10 h-5 rounded-full transition-colors relative ${continuousMode ? 'bg-robot-green' : 'bg-white/10'}`}
                  >
                    <motion.div 
                      animate={{ x: continuousMode ? 22 : 2 }}
                      className="absolute top-1 w-3 h-3 bg-white rounded-full"
                    />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLang(lang.id)}
                      className={`p-2 rounded-lg border font-mono text-xs flex items-center gap-2 transition-all ${
                        selectedLang === lang.id 
                          ? 'border-robot-blue bg-robot-blue/10 text-white' 
                          : 'border-white/5 bg-white/5 text-gray-500 hover:border-white/20'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-robot-blue/5 border border-robot-blue/20">
                  <div className="text-[10px] font-mono text-robot-blue uppercase mb-1">Active Engine</div>
                  <div className="text-xs font-mono text-white">MMI-V2-HYBRID</div>
                </div>
              </div>
            </div>

            {/* FIPES Panel */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-robot-blue" />
                <h3 className="font-mono font-bold uppercase">FIPES Intelligence</h3>
              </div>
              
              <div className="space-y-6">
                {/* Identity Header & Camera Feed */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-robot-blue/10 border border-robot-blue/20 overflow-hidden relative">
                    <div className="w-12 h-12 rounded-full border-2 border-robot-blue overflow-hidden bg-black relative flex items-center justify-center">
                      {!cameraStream && !cameraError ? (
                        <button 
                          onClick={startCamera}
                          className="absolute inset-0 flex items-center justify-center hover:bg-robot-blue/20 transition-colors group"
                          title="Activate Camera Sensors"
                        >
                          <Zap className="w-4 h-4 text-robot-blue animate-pulse group-hover:scale-125" />
                        </button>
                      ) : (
                        <video 
                          ref={videoRef}
                          className={`absolute inset-0 w-full h-full object-cover grayscale opacity-80 ${cameraError ? 'hidden' : 'block'}`}
                          muted
                          playsInline
                        />
                      )}
                      {cameraError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <AlertCircle className="w-6 h-6 text-red-500" />
                        </div>
                      )}
                      <div className="absolute inset-0 pointer-events-none border border-robot-blue/30 rounded-full" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-[10px] font-mono text-robot-purple uppercase tracking-widest">Live Sensor Feed</div>
                        {(!cameraStream || cameraError) && (
                          <button 
                            onClick={startCamera}
                            className="text-[10px] font-mono text-robot-blue hover:underline flex items-center gap-1 font-bold"
                          >
                            <Zap className="w-2 h-2" /> {cameraError ? 'RETRY PERMISSION' : 'ACTIVATE SENSORS'}
                          </button>
                        )}
                      </div>
                      <div className="text-sm font-mono font-bold text-white uppercase">{fipes.person}</div>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                  </div>

                  {cameraError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <div className="text-[10px] font-mono text-red-400 uppercase font-bold mb-1">Permission Tip</div>
                      <p className="text-[10px] font-mono text-gray-400 leading-tight mb-2">
                        If the prompt didn't appear, click the camera icon in your browser's address bar to allow access.
                      </p>
                      <p className="text-[10px] font-mono text-robot-blue leading-tight">
                        <span className="font-bold">Pro Tip:</span> If you're in a preview iframe, try opening the app in a <a href={window.location.href} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">new tab</a> to bypass restrictions.
                      </p>
                    </div>
                  )}

                  {/* Gesture Detection Badge */}
                  <div className="flex justify-between items-center px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">Hand Gesture</span>
                    <div className="flex items-center gap-2">
                      <motion.span 
                        key={fipes.gesture}
                        initial={{ scale: 1.2, color: '#3b82f6' }}
                        animate={{ scale: 1, color: '#fff' }}
                        className="text-xs font-mono font-bold uppercase"
                      >
                        {fipes.gesture}
                      </motion.span>
                      {fipes.gesture === 'Open Hand' && <Hand size={14} className="text-robot-blue" />}
                      {fipes.gesture === 'Pointing' && <Zap size={14} className="text-robot-blue" />}
                      {fipes.gesture === 'Fist' && <Cpu size={14} className="text-robot-blue" />}
                    </div>
                  </div>
                </div>

                {/* Visual Indicator */}
                <div className="flex justify-center py-2">
                  <div className="relative">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className={`w-20 h-20 rounded-full flex items-center justify-center border-2 shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-colors duration-500 ${
                        fipes.emotion === 'Happy' ? 'border-green-500 text-green-500 bg-green-500/10' :
                        fipes.emotion === 'Sad' ? 'border-blue-500 text-blue-500 bg-blue-500/10' :
                        fipes.emotion === 'Stressed' ? 'border-red-500 text-red-500 bg-red-500/10' :
                        fipes.emotion === 'Tired' ? 'border-orange-500 text-orange-500 bg-orange-500/10' :
                        fipes.emotion === 'Focused' ? 'border-purple-500 text-purple-500 bg-purple-500/10' :
                        'border-robot-blue text-robot-blue bg-robot-blue/10'
                      }`}
                    >
                      {fipes.emotion === 'Happy' && <Smile size={40} />}
                      {fipes.emotion === 'Sad' && <Frown size={40} />}
                      {fipes.emotion === 'Neutral' && <Meh size={40} />}
                      {fipes.emotion === 'Stressed' && <AlertCircle size={40} />}
                      {fipes.emotion === 'Tired' && <Zap size={40} />}
                      {fipes.emotion === 'Focused' && <Brain size={40} />}
                    </motion.div>
                    
                    <motion.div 
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 border border-robot-blue rounded-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between font-mono text-xs mb-2">
                      <span className="text-gray-500 uppercase">Emotion: {fipes.emotion}</span>
                      <span className="text-white">{fipes.confidence}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: `${fipes.confidence}%` }}
                        className={`h-full transition-colors duration-500 ${
                          fipes.emotion === 'Happy' ? 'bg-green-500' :
                          fipes.emotion === 'Sad' ? 'bg-blue-500' :
                          fipes.emotion === 'Stressed' ? 'bg-red-500' :
                          fipes.emotion === 'Tired' ? 'bg-orange-500' :
                          fipes.emotion === 'Focused' ? 'bg-purple-500' :
                          'bg-robot-blue'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Memory System */}
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-3 h-3 text-robot-blue" />
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Contextual Memory</span>
                    </div>
                    <p className="text-[10px] font-mono text-gray-500 leading-tight">
                      {fipes.memory}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-robot-blue/5 border border-robot-blue/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-robot-blue" />
                    <div className="flex items-center gap-2 mb-2 text-robot-blue">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-[10px] font-mono uppercase font-bold tracking-widest">FIPES Response</span>
                    </div>
                    <p className="text-xs font-mono text-gray-300 leading-relaxed italic">
                      {fipes.person === 'Merikeb Gashu' 
                        ? (fipes.emotion === 'Tired' || fipes.emotion === 'Stressed' 
                            ? `Merikeb, you seem ${fipes.emotion.toLowerCase()}. You were tired yesterday too. Would you like to take a break?`
                            : fipes.emotion === 'Happy'
                            ? `It's great to see you happy, Merikeb! Your positive energy improves system efficiency. እንዴት ነህ?`
                            : `Hello Merikeb! You look ${fipes.emotion.toLowerCase()} today. How can I assist you?`)
                        : `Hello! I see you are feeling ${fipes.emotion.toLowerCase()}. How can I help you today?`}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShare}
                    className="w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-mono text-xs text-gray-400 hover:text-white"
                  >
                    <Share2 size={14} />
                    SHARE ANALYSIS
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Voice Command Center */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-robot-green" />
                  <h3 className="font-mono font-bold uppercase">Voice Command Center</h3>
                </div>
                <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`} />
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-black/20 border border-white/5 min-h-[80px] flex items-center justify-center text-center">
                  {isListening ? (
                    <motion.div 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs font-mono text-robot-green"
                    >
                      Listening for commands... Try "Walk MN-01" or "Stop all robots"
                    </motion.div>
                  ) : (
                    <div className="text-xs font-mono text-gray-500">
                      Voice system standby. Click below to initiate.
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleListening()}
                  className={`w-full py-4 rounded-xl border flex items-center justify-center gap-3 font-mono font-bold transition-all ${
                    isListening 
                      ? 'border-red-500/50 bg-red-500/10 text-red-400' 
                      : 'border-robot-green/50 bg-robot-green/10 text-robot-green hover:bg-robot-green/20'
                  }`}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  {isListening ? 'TERMINATE LISTENING' : 'INITIATE VOICE CONTROL'}
                </motion.button>

                <div className="flex items-center gap-2 px-2">
                  <div className="text-[10px] font-mono text-gray-600 uppercase">Continuous Mode</div>
                  <button 
                    onClick={() => setContinuousMode(!continuousMode)}
                    className={`w-8 h-4 rounded-full transition-colors relative ${continuousMode ? 'bg-robot-green' : 'bg-white/10'}`}
                  >
                    <motion.div 
                      animate={{ x: continuousMode ? 18 : 2 }}
                      className="absolute top-0.5 w-3 h-3 bg-white rounded-full"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Terminal & Chat */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-[500px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-robot-blue" />
                  <h3 className="font-mono font-bold uppercase text-sm tracking-wider">MAIOS AI Terminal</h3>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 px-2 py-1 rounded bg-robot-blue/10 border border-robot-blue/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-robot-blue animate-pulse" />
                    <span className="text-[10px] font-mono text-robot-blue">SYNCED</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-fixed bg-cover relative">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-none" />
                
                <div className="relative z-10 space-y-4">
                  {logs.map((log) => (
                    <motion.div 
                      key={log.id}
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={`flex flex-col ${log.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      {log.role === 'system' ? (
                        <div className="w-full flex justify-center my-2">
                          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-gray-500 uppercase tracking-widest text-center">
                            {log.content}
                          </span>
                        </div>
                      ) : (
                        <div className={`max-w-[85%] group`}>
                          <div className={`flex items-center gap-2 mb-1 px-1 ${log.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">
                              {log.role === 'user' ? 'Operator' : 'MAIOS Brain'}
                            </span>
                            <span className="text-[9px] font-mono text-gray-700">{log.time}</span>
                          </div>
                          
                          <div className={`p-4 rounded-2xl font-mono text-sm leading-relaxed shadow-lg ${
                            log.role === 'user' 
                              ? 'bg-robot-blue/20 border border-robot-blue/30 text-robot-blue rounded-tr-none' 
                              : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                          }`}>
                            {log.content}

                            {log.learning?.quiz && (
                              <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                                <div className="text-xs font-bold text-robot-purple uppercase tracking-tighter">Diagnostic Assessment</div>
                                <div className="text-sm text-white">{log.learning.quiz.question}</div>
                                <div className="grid grid-cols-1 gap-2">
                                  {log.learning.quiz.options.map((opt: string) => (
                                    <button 
                                      key={opt}
                                      onClick={() => processUserMessage(`Answer: ${opt}`)}
                                      className="text-left px-3 py-2 rounded-lg bg-white/5 border border-white/5 hover:border-robot-blue/50 hover:bg-robot-blue/10 transition-all text-xs text-gray-400 hover:text-white"
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </div>

              <div className="p-4 bg-white/5 border-t border-white/10">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && processUserMessage(textInput)}
                      placeholder="Input direct brain-link command..."
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder:text-gray-600 outline-none focus:border-robot-blue/50 transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <button 
                        onClick={() => toggleListening()}
                        className={`p-2 rounded-lg transition-all ${isListening ? 'bg-red-500/20 text-red-400' : 'text-gray-500 hover:text-robot-blue'}`}
                      >
                        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                      </button>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => processUserMessage(textInput)}
                    className="p-3 bg-robot-blue text-black rounded-xl hover:bg-robot-blue/90 transition-all"
                  >
                    <Zap size={20} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* 3D Simulation Environment */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-robot-blue" />
                  <h3 className="font-mono font-bold uppercase text-sm">3D Simulation Environment</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-robot-blue uppercase">Real-time Telemetry</span>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <RobotSimulation fleet={robotFleet} />
              </div>
            </div>

            {/* Cloud Mission Scheduler */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <ListPlus className="w-5 h-5 text-robot-blue" />
                  <h3 className="font-mono font-bold uppercase text-sm">Cloud Mission Scheduler</h3>
                </div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                  {activeQueue.length} Pending Actions
                </div>
              </div>

              <form onSubmit={submitQueuedTask} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2">Mission Name</label>
                    <input 
                      type="text"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      placeholder="e.g. Biohazard Cleanup"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white outline-none focus:border-robot-blue/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2">Priority Tier</label>
                    <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
                      {[1, 2, 3, 4, 5].map(p => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setTaskPriority(p)}
                          className={`flex-1 py-2 rounded-lg font-mono text-[10px] transition-all ${
                            taskPriority === p 
                              ? (p === 1 ? 'bg-red-500 text-white' : p <= 3 ? 'bg-robot-blue text-robot-dark' : 'bg-gray-600 text-white')
                              : 'text-gray-500 hover:text-white'
                          }`}
                        >
                          P{p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2">Target Asset</label>
                    <select 
                      value={targetRobot}
                      onChange={(e) => setTargetRobot(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white outline-none focus:border-robot-blue/50 appearance-none cursor-pointer"
                    >
                      <option value="">Autonomous (Best Available)</option>
                      {robotFleet.map(robot => (
                        <option key={robot.id} value={robot.id}>{robot.id} - {robot.status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2">Waypoint Protocol</label>
                    <select 
                      value={targetWaypoint}
                      onChange={(e) => setTargetWaypoint(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white outline-none focus:border-robot-blue/50 appearance-none cursor-pointer"
                    >
                      <option value="">Dynamic Pathfinding</option>
                      <option value="Charging Dock">Central Charging Dock</option>
                      <option value="Hallway A">Main Hallway Alpha</option>
                      <option value="Sector B">Maintenance Sector Beta</option>
                      <option value="Command Center">Tactical Command Center</option>
                      <option value="Storage Bay">Automated Storage Bay</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={!taskName || isQueueLoading}
                    className="w-full py-4 bg-robot-blue text-robot-dark rounded-xl font-bold font-mono text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all disabled:opacity-50"
                  >
                    {isQueueLoading ? <Clock className="animate-spin" size={16} /> : <Rocket size={16} />}
                    Enforce Global Mission
                  </motion.button>
                </div>
              </form>

              {/* Active Queue Display */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="w-4 h-4 text-robot-purple" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">Priority Execution Pipeline</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <AnimatePresence mode="popLayout">
                    {activeQueue.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="col-span-full p-6 text-center border border-dashed border-white/10 rounded-2xl"
                      >
                        <span className="text-[10px] font-mono text-gray-600 uppercase">Strategic pipeline empty. Standby for allocation.</span>
                      </motion.div>
                    ) : (
                      activeQueue.map((task, i) => (
                        <motion.div 
                          key={task.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          layout
                          className={`p-4 rounded-xl border flex items-center justify-between ${
                            task.priority === 1 ? 'bg-red-500/10 border-red-500/30' : 
                            task.priority <= 3 ? 'bg-robot-blue/10 border-robot-blue/30' : 
                            'bg-white/5 border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              task.priority === 1 ? 'bg-red-500/20 text-red-500' : 
                              task.priority <= 3 ? 'bg-robot-blue/20 text-robot-blue' : 
                              'bg-gray-700 text-gray-400'
                            }`}>
                              <span className="text-xs font-bold font-mono">P{task.priority}</span>
                            </div>
                            <div>
                              <div className="text-xs font-mono font-bold text-white">{task.name}</div>
                              <div className="flex items-center gap-2 text-[8px] font-mono text-gray-500 uppercase">
                                <span className={task.targetRobotId ? 'text-robot-blue' : ''}>
                                  {task.targetRobotId || 'Autonomous'}
                                </span>
                                <span>•</span>
                                <span>{task.targetWaypoint || 'Dynamic'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                             <div className="text-[8px] font-mono text-gray-600">ID: {task.id.substring(0, 4)}</div>
                             <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Direct Command Interface */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-5 h-5 text-robot-purple" />
                <h3 className="font-mono font-bold uppercase text-sm">Direct Command Interface</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'MOVE', icon: <Rocket size={16} />, cmd: 'move', color: 'text-robot-blue border-robot-blue/30 bg-robot-blue/10' },
                  { label: 'STOP', icon: <Shield size={16} />, cmd: 'stop', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
                  { label: 'LEFT', icon: <Hand size={16} className="-rotate-90" />, cmd: 'turn left', color: 'text-robot-purple border-robot-purple/30 bg-robot-purple/10' },
                  { label: 'RIGHT', icon: <Hand size={16} className="rotate-90" />, cmd: 'turn right', color: 'text-robot-purple border-robot-purple/30 bg-robot-purple/10' }
                ].map((btn) => (
                  <motion.button
                    key={btn.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      addLog(`Direct command override: "${btn.cmd}"`, 'user');
                      try {
                        const res = await fetch('/api/robot/command', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ command: btn.cmd })
                        });
                        const data = await res.json();
                        addLog(`ROBOT: Operational adjustment - ${data.action}`, 'bot');
                      } catch (err) {
                        addLog("MMI: Direct override link failure.", 'system');
                      }
                    }}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-mono font-bold text-xs transition-all ${btn.color}`}
                  >
                    {btn.icon}
                    {btn.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Robot Fleet & Cloud Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-robot-blue" />
                    <h3 className="font-mono font-bold uppercase text-sm">Robot Fleet</h3>
                  </div>
                  <span className="text-[10px] font-mono text-robot-blue bg-robot-blue/10 px-2 py-1 rounded">3 ONLINE</span>
                </div>
                <div className="space-y-3">
                  {robotFleet.map(robot => (
                    <div key={robot.id} className="p-3 rounded-lg border border-white/5 bg-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-bold text-white">{robot.id}</div>
                        <div className="text-[10px] font-mono text-gray-500">{robot.task}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-[10px] font-mono ${robot.status === 'Active' ? 'text-green-500' : 'text-orange-500'}`}>{robot.status}</div>
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[10px] font-mono text-gray-400">{robot.battery}% BATTERY</span>
                          {robot.temperature && (
                            <span className={`text-[10px] font-mono ${robot.temperature > 50 ? 'text-red-400' : 'text-robot-blue'}`}>
                              {robot.temperature}°C
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-5 h-5 text-robot-purple" />
                  <h3 className="font-mono font-bold uppercase text-sm">Cloud Status</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">Health</div>
                    <div className="text-xs font-mono text-green-500 font-bold">{cloudStatus.health}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">Memory</div>
                    <div className="text-xs font-mono text-white font-bold">{cloudStatus.memoryUsage}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">L-Rate</div>
                    <div className="text-xs font-mono text-robot-blue font-bold">{cloudStatus.learningRate}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">Uptime</div>
                    <div className="text-xs font-mono text-white font-bold">{cloudStatus.uptime}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-robot-blue/10 border border-robot-blue/30 col-span-2 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-mono text-robot-blue uppercase font-bold tracking-wider">AI Optimization Engine</div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono text-robot-blue/80 uppercase">Optimal</span>
                        <div className="w-2 h-2 rounded-full bg-robot-blue animate-pulse" />
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-gray-300 mt-1">XNNPACK CPU Acceleration Active</div>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-robot-purple/5 border border-robot-purple/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-3 h-3 text-robot-purple" />
                    <span className="text-[10px] font-mono text-robot-purple uppercase tracking-widest">Self-Learning Loop</span>
                  </div>
                  <div className="space-y-1">
                    {aiReasoning.slice(-2).map((reason, i) => (
                      <div key={`${reason.substring(0, 20)}-${i}`} className="text-[10px] font-mono text-gray-500 leading-tight">
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

        <CinematicIntro />
      </div>
    </section>
  );
}
