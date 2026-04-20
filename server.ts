import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "merinova_secret_key";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- MIDDLEWARES ---

  const verifyToken = (req: any, res: any, next: any) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };

  const allowRoles = (...roles: string[]) => {
    return (req: any, res: any, next: any) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied: insufficient permission" });
      }
      next();
    };
  };

  // --- MERINOVA RESEARCH CLOUD API ---

  // 🧠 Scientific AI Assistant
  app.post("/api/research/ai", async (req, res) => {
    const { message } = req.body;
    try {
      const prompt = `
        You are Merinova Scientific Research Assistant. 
        Expert in Molecular Dynamics, Electron Structure, and High Performance Computing.
        Knowledge base: Quantum ESPRESSO, LAMMPS, GROMACS.
        
        Guidelines:
        - Provide high-fidelity scientific advice.
        - Help users debug simulation input files.
        - Suggest optimal cluster parameters for GPU clusters.
        - INTERACTIVE PROTOCOL: If you recommend a specific configuration, use the format [APPLY: VALUE].
          - Engines: [APPLY: Quantum ESPRESSO], [APPLY: LAMMPS], [APPLY: GROMACS]
          - vCPU Scaling: [APPLY: 8], [APPLY: 16], [APPLY: 32], [APPLY: 64]
          - Precision: [APPLY: Single], [APPLY: Double]
        - Support English and Amharic.

        User Query: "${message}"
      `;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });

      res.json({ reply: result.text || "Scientific core standby. Please rephrase." });
    } catch (error) {
      res.status(500).json({ error: "Research Brain link failure" });
    }
  });

  // ⚛️ Simulation Engine (HPC Job Runner Mock)
  app.post("/api/research/simulate", (req, res) => {
    const { type, name, params } = req.body;
    console.log(`[HPC] New Job Submission: ${type} - ${name}`);

    // Simulate Job Queue
    const jobId = `job-${Math.floor(Math.random() * 1000000)}`;
    
    let result = {};
    if (type === "Quantum ESPRESSO") {
      result = {
          status: "Completed",
          energy: -12.45892301,
          band_gap: "1.23 eV",
          fermi_energy: "6.42 eV",
          message: "SCF calculation converged successfully."
      };
    } else if (type === "LAMMPS") {
      result = {
          status: "Completed",
          temperature: "300.0 K",
          pressure: "1.012 bar",
          total_energy: "-42.503 kcal/mol",
          message: "Molecular dynamics trajectory saved to cloud storage."
      };
    } else if (type === "GROMACS") {
      result = {
          status: "Completed",
          rmsd: "0.24 nm",
          radius_gyration: "1.82 nm",
          stability: "Protein complex stable",
          message: "Production MD complete. 50ns sampled."
      };
    } else {
      return res.status(400).json({ error: "Unknown scientific engine type" });
    }

    // Return job metadata + simulated results
    res.json({
      jobId,
      timestamp: new Date().toISOString(),
      engine: type,
      projectName: name,
      ...result
    });
  });

  // --- MERINOVA CLOUD CORE API ---

  // 🧠 Cloud AI Brain
  app.post("/api/cloud/chat", async (req, res) => {
    const { message, memory, robotState } = req.body;
    
    try {
      const prompt = `
        You are Merinova Cloud AI Brain (MAIOS).
        Control robots safely and assist the user (Merikeb Gashu).
        You are also an expert Education Assistant and Scientific Research Advisor.

        Capabilities:
        - ROBOT CONTROL: Handle commands to walk, stop, and charge.
        - SCIENTIFIC RESEARCH: Advise on Quantum ESPRESSO, LAMMPS, and GROMACS simulations.
        - LEARNING MODE: Provide lesson-style explanations about Web Tech, Robotics, and AI.
        - QUIZ SYSTEM: If the user asks for a "quiz", generate a technical question with multiple choice options (A, B, C).
        - MULTILINGUAL: Support English, Amharic, and Afaan Oromo natively.

        JSON Response Format (Respond ONLY in JSON):
        {
          "response": "Your verbal response",
          "command": {
            "type": "WALK" | "STOP" | "CHARGE" | "NONE",
            "target": "MN-01" | "MN-02" | "MN-03" | "ALL"
          },
          "learning": {
            "mode": "chat" | "lesson" | "quiz",
            "topic": "string",
            "quiz": { "question": "string", "options": ["A) ..", "B) ..", "C) .."], "answer": "A" | "B" | "C" }
          }
        }

        System Context:
        History: ${JSON.stringify(memory)}
        Robots: ${JSON.stringify(robotState)}
        Language: Detect from message (support English/Amharic/Oromo).

        User Message: "${message}"
      `;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      
      const text = result.text || "{}";
      const data = JSON.parse(text);
      res.json(data);
    } catch (error) {
      console.error("Cloud Brain Error:", error);
      res.status(500).json({ error: "Cloud Brain processing failed" });
    }
  });

  // 🧠 Navigation & Pathfinding System (A* Implementation)
  const GRID_SIZE = 10;
  const OBSTACLES = [
    { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 },
    { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 },
    { x: 4, y: 4 }, { x: 4, y: 5 }
  ];

  const WAYPOINTS: Record<string, { x: number, y: number }> = {
    "Charging Dock": { x: 0, y: 0 },
    "Hallway A": { x: 9, y: 1 },
    "Sector B": { x: 1, y: 9 },
    "Command Center": { x: 5, y: 5 },
    "Storage Bay": { x: 8, y: 8 }
  };

  interface Point { x: number; y: number; }
  interface Node extends Point {
    g: number; h: number; f: number;
    parent?: Node;
  }

  function getDistance(a: Point, b: Point) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  function findPath(start: Point, end: Point): Point[] {
    const openSet: Node[] = [{ ...start, g: 0, h: getDistance(start, end), f: getDistance(start, end) }];
    const closedSet: Set<string> = new Set();

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift()!;
      
      if (current.x === end.x && current.y === end.y) {
        const path: Point[] = [];
        let temp: Node | undefined = current;
        while (temp) {
          path.push({ x: temp.x, y: temp.y });
          temp = temp.parent;
        }
        return path.reverse();
      }

      closedSet.add(`${current.x},${current.y}`);

      const neighbors = [
        { x: current.x + 1, y: current.y }, { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 }, { x: current.x, y: current.y - 1 }
      ];

      for (const neighbor of neighbors) {
        if (neighbor.x < 0 || neighbor.x >= GRID_SIZE || neighbor.y < 0 || neighbor.y >= GRID_SIZE) continue;
        if (OBSTACLES.some(o => o.x === neighbor.x && o.y === neighbor.y)) continue;
        if (closedSet.has(`${neighbor.x},${neighbor.y}`)) continue;

        const g = current.g + 1;
        const h = getDistance(neighbor, end);
        const f = g + h;

        const existing = openSet.find(o => o.x === neighbor.x && o.y === neighbor.y);
        if (existing && g >= existing.g) continue;

        if (!existing) {
          openSet.push({ ...neighbor, g, h, f, parent: current });
        } else {
          existing.g = g;
          existing.f = f;
          existing.parent = current;
        }
      }
    }
    return [];
  }

  // 🤖 Robot Fleet Status Simulation
  const robotFleetStatus = [
    { 
      id: "MN-01", 
      status: "Active", 
      task: "Patrolling Hallway A", 
      taskId: "init-1", 
      battery: 85, 
      temperature: 38, 
      startTime: Date.now(), 
      estimatedDuration: 60000,
      x: 0, y: 1,
      path: findPath({ x: 0, y: 1 }, WAYPOINTS["Hallway A"])
    },
    { 
      id: "MN-02", 
      status: "Charging", 
      task: "Recharging", 
      taskId: "init-2", 
      battery: 12, 
      temperature: 42, 
      startTime: Date.now(), 
      estimatedDuration: 120000,
      x: 0, y: 0,
      path: []
    },
    { 
      id: "MN-03", 
      status: "Idle", 
      task: "Waiting for Command", 
      taskId: "", 
      battery: 94, 
      temperature: 35, 
      startTime: Date.now(), 
      estimatedDuration: 0,
      x: 5, y: 5,
      path: []
    },
  ];

  // 📋 Task Queue System
  interface QueuedTask {
    id: string;
    name: string;
    duration: number;
    priority: number; // 1 (High) to 5 (Low)
    targetRobotId?: string;
    dependencies?: string[]; // IDs of tasks that must be completed first
    targetWaypoint?: string;
  }
  const taskQueue: QueuedTask[] = [];
  const completedTaskIds: string[] = ["init-1", "init-2"]; // Track finished tasks

  app.post("/api/robot/queue-task", verifyToken, allowRoles("teacher", "admin"), (req, res) => {
    const { name, duration, priority, targetRobotId, dependencies, targetWaypoint } = req.body;
    const newTask: QueuedTask = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      duration: duration || 60000,
      priority: priority || 3,
      targetRobotId,
      dependencies: dependencies || [],
      targetWaypoint
    };
    taskQueue.push(newTask);
    taskQueue.sort((a, b) => a.priority - b.priority);
    res.json({ message: "Task queued successfully", task: newTask });
  });

  app.get("/api/robot/queue", verifyToken, (req, res) => {
    res.json({ queue: taskQueue, completed: completedTaskIds });
  });

  // Periodically update robot status to simulate real-world activity
  setInterval(() => {
    const now = Date.now();
    robotFleetStatus.forEach(robot => {
      // 🚀 Movement Logic: Move along path if one exists
      if (robot.path && robot.path.length > 0) {
        const nextPoint = robot.path.shift()!;
        robot.x = nextPoint.x;
        robot.y = nextPoint.y;
        console.log(`[NAV] ${robot.id} moved to (${robot.x}, ${robot.y}). Path remaining: ${robot.path.length}`);
      }

      // Check for Task Completion
      if (robot.status !== "Idle" && robot.estimatedDuration > 0) {
        const elapsed = now - robot.startTime;
        if (elapsed >= robot.estimatedDuration) {
          console.log(`[ROBOT] ${robot.id} completed task: ${robot.task} (${robot.taskId})`);
          if (robot.taskId) completedTaskIds.push(robot.taskId);
          
          if (robot.task === "Returning to Dock") {
            // Arrived at dock, start actual recharging
            robot.task = "Recharging";
            robot.status = "Charging";
            const batteryNeeded = 100 - robot.battery;
            robot.estimatedDuration = Math.ceil(batteryNeeded / 5) * 5000;
            robot.startTime = now;
            console.log(`[ROBOT] ${robot.id} arrived at dock. Starting recharge.`);
          } else {
            robot.status = "Idle";
            robot.task = "Waiting for Command";
            robot.taskId = "";
            robot.estimatedDuration = 0;
            robot.startTime = now;
          }
        }
      }

      // Update Temperature and Battery
      if (robot.status === "Active" || (robot.path && robot.path.length > 0)) {
        const isThrottled = robot.temperature > 50;
        const tempIncrease = isThrottled ? 0.3 : 1.2;
        const batteryDrain = isThrottled ? 0.8 : (Math.floor(Math.random() * 2) + 1.5);

        robot.temperature = Math.min(100, robot.temperature + tempIncrease);
        robot.battery = Math.max(0, robot.battery - batteryDrain);
        
        if (robot.temperature > 70) {
          robot.status = "Error";
          robot.task = "Overheating shutdown";
          robot.taskId = "err-" + robot.id;
          robot.estimatedDuration = 60000;
          robot.startTime = now;
          robot.path = []; // Stop navigation
        } else if (robot.battery < 15 && robot.status !== "Charging") {
          robot.status = "Active";
          robot.task = "Returning to Dock";
          robot.taskId = "docking-" + robot.id;
          robot.path = findPath({ x: robot.x, y: robot.y }, WAYPOINTS["Charging Dock"]);
          robot.estimatedDuration = (robot.path.length * 5000) + 5000; // Time to travel + buffer
          robot.startTime = now;
        }
      } else if (robot.status === "Charging") {
        robot.temperature = Math.max(30, robot.temperature - 1.5);
        robot.battery = Math.min(100, robot.battery + (Math.floor(Math.random() * 3) + 4));
        if (robot.battery === 100) {
          robot.status = "Idle";
          robot.task = "Waiting for Command";
          robot.taskId = "";
          robot.estimatedDuration = 0;
          robot.startTime = now;
        }
      } else if (robot.status === "Idle" || robot.status === "Error") {
        const cooldownRate = robot.status === "Error" ? 2.0 : 0.5;
        robot.temperature = Math.max(30, robot.temperature - cooldownRate);
        
        if (robot.status === "Error" && robot.temperature < 45) {
          robot.status = "Idle";
          robot.task = "Waiting for Command";
          robot.taskId = "";
          robot.estimatedDuration = 0;
          robot.startTime = now;
        }

        if (robot.status === "Idle") {
          const taskIndex = taskQueue.findIndex(t => {
            const isTargeted = !t.targetRobotId || t.targetRobotId === robot.id;
            const depsMet = !t.dependencies || t.dependencies.every(depId => completedTaskIds.includes(depId));
            return isTargeted && depsMet;
          });

          if (taskIndex !== -1) {
            const task = taskQueue.splice(taskIndex, 1)[0];
            robot.status = "Active";
            robot.task = task.name;
            robot.taskId = task.id;
            
            // Navigate to target waypoint or random one
            const targetWpName = task.targetWaypoint || Object.keys(WAYPOINTS)[Math.floor(Math.random() * Object.keys(WAYPOINTS).length)];
            const targetPos = WAYPOINTS[targetWpName];
            robot.path = findPath({ x: robot.x, y: robot.y }, targetPos);
            
            robot.estimatedDuration = Math.max(task.duration, robot.path.length * 5000);
            robot.startTime = now;
            console.log(`[SCHEDULER] ${robot.id} heading to ${targetWpName} for "${task.name}"`);
          } else if (Math.random() > 0.95) {
            const tasks = [
              { name: "Self-Diagnostic Scan", duration: 30000, waypoint: "Command Center" },
              { name: "Patrolling Hallway A", duration: 120000, waypoint: "Hallway A" },
              { name: "Cleaning Sector B", duration: 180000, waypoint: "Sector B" },
              { name: "Resource Management Sweep", duration: 120000, waypoint: "Storage Bay" }
            ];
            const selected = tasks[Math.floor(Math.random() * tasks.length)];
            robot.status = "Active";
            robot.task = selected.name;
            robot.taskId = "auto-" + Math.random().toString(36).substr(2, 5);
            
            const targetPos = WAYPOINTS[selected.waypoint];
            robot.path = findPath({ x: robot.x, y: robot.y }, targetPos);
            
            robot.estimatedDuration = Math.max(selected.duration, robot.path.length * 5000);
            robot.startTime = now;
            console.log(`[AUTONOMOUS] ${robot.id} started ${selected.name} at ${selected.waypoint}`);
          }
        }
      }
    });
  }, 5000);

  // 📊 Robot Status API
  app.get("/api/robot/status", (req, res) => {
    res.json({
      fleet: robotFleetStatus,
      timestamp: new Date().toISOString(),
      systemHealth: "Optimal"
    });
  });

  // 🤖 Robot Command System
  app.post("/api/cloud/command", (req, res) => {
    const { robotId, command } = req.body;
    console.log(`[CLOUD] Sending command to Robot ${robotId}: ${command}`);
    
    // Simulate robot execution
    let action = "idle";
    const cmd = command.toLowerCase();
    if (cmd.includes("walk") || cmd.includes("move")) action = "walking forward 🦿";
    if (cmd.includes("stop") || cmd.includes("halt")) action = "stopped 🛑";
    if (cmd.includes("grab")) action = "hand closing 🤏";

    res.json({ 
      robotId, 
      action,
      status: "success",
      timestamp: new Date().toISOString()
    });
  });

  // 📡 Direct Robot Control API
  app.post("/api/robot/command", (req, res) => {
    const { command } = req.body;
    console.log(`[ROBOT] Received direct command: ${command}`);

    let action = "Unknown command";
    const cmd = command.toLowerCase();

    if (cmd === "move" || cmd === "walk") {
      action = "Moving forward 🚀";
    } else if (cmd === "stop" || cmd === "halt") {
      action = "Stopping robot 🛑";
    } else if (cmd === "turn left") {
      action = "Turning left ↪️";
    } else if (cmd === "turn right") {
      action = "Turning right ↩️";
    }

    res.json({ 
      action,
      status: "executed",
      timestamp: new Date().toISOString()
    });
  });

  // 💾 Cloud Memory System
  const cloudMemory: Record<string, any> = {};
  app.post("/api/cloud/memory/save", (req, res) => {
    const { userId, key, value } = req.body;
    if (!cloudMemory[userId]) cloudMemory[userId] = {};
    cloudMemory[userId][key] = value;
    res.json({ status: "saved" });
  });

  app.get("/api/cloud/memory/:userId", (req, res) => {
    res.json(cloudMemory[req.params.userId] || {});
  });

  // 👁️ Vision + SLAM Processor (Simulated)
  app.post("/api/cloud/vision", (req, res) => {
    res.json({
      objects: ["Person", "Robot Arm", "Obstacle"],
      map: { x: 10, y: 20, orientation: 90 },
      status: "processed"
    });
  });

  // 🔐 Authentication System (Simulated)
  const users: any[] = [
    { id: '1', username: 'admin', password: bcrypt.hashSync('password', 10), name: 'System Admin', role: 'admin', department: 'Core' }
  ];

  app.post("/api/auth/signup", async (req, res) => {
    const { name, username, email, department, password, role } = req.body;
    
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const allowedRoles = ["student", "teacher"];
    const finalRole = allowedRoles.includes(role) ? role : "student";
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { 
      id: String(users.length + 1),
      name, 
      username, 
      email, 
      department, 
      password: hashedPassword, 
      role: finalRole 
    };
    users.push(newUser);
    
    console.log(`[AUTH] New user registered: ${username} (${finalRole})`);
    
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Registration successful", token, user: { id: newUser.id, name, username, role: finalRole } });
  });

  app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && await bcrypt.compare(password, user.password)) {
      console.log(`[AUTH] User logged in: ${username}`);
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
      res.json({ 
        message: "Login successful", 
        token,
        user: { id: user.id, name: user.name, username: user.username, role: user.role, department: user.department } 
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  // 📝 Teacher Mark System (Simulated)
  const marks: any[] = [];

  app.post("/api/marks/add", verifyToken, allowRoles("teacher", "admin"), (req: any, res) => {
    const { studentId, subject, score, total, comment } = req.body;
    const newMark = {
      id: String(marks.length + 1),
      studentId,
      teacherId: req.user.id,
      subject,
      score,
      total,
      comment,
      createdAt: new Date().toISOString()
    };
    marks.push(newMark);
    res.json({ message: "Mark added successfully", mark: newMark });
  });

  app.get("/api/marks/my-marks", verifyToken, allowRoles("student"), (req: any, res) => {
    const studentMarks = marks.filter(m => m.studentId === req.user.id);
    res.json(studentMarks);
  });

  app.get("/api/marks/teacher-marks", verifyToken, allowRoles("teacher", "admin"), (req: any, res) => {
    const teacherMarks = marks.filter(m => m.teacherId === req.user.id);
    res.json(teacherMarks);
  });

  app.get("/api/marks/all", verifyToken, allowRoles("admin"), (req, res) => {
    res.json(marks);
  });

  app.put("/api/marks/update/:id", verifyToken, allowRoles("teacher", "admin"), (req: any, res) => {
    const index = marks.findIndex(m => m.id === req.params.id);
    if (index !== -1) {
      marks[index] = { ...marks[index], ...req.body, updatedAt: new Date().toISOString() };
      res.json({ message: "Mark updated", mark: marks[index] });
    } else {
      res.status(404).json({ message: "Mark not found" });
    }
  });

  app.delete("/api/marks/:id", verifyToken, allowRoles("teacher", "admin"), (req, res) => {
    const index = marks.findIndex(m => m.id === req.params.id);
    if (index !== -1) {
      marks.splice(index, 1);
      res.json({ message: "Mark deleted" });
    } else {
      res.status(404).json({ message: "Mark not found" });
    }
  });

  // 🎥 Live Session System (Simulated)
  const liveSessions: any[] = [];
  const sessionLogs: any[] = [];

  app.post("/api/live/create", verifyToken, allowRoles("teacher", "admin"), (req: any, res) => {
    const { title, subject } = req.body;
    const session = {
      id: String(liveSessions.length + 1),
      title,
      subject,
      teacherId: req.user.id,
      startTime: new Date().toISOString(),
      isActive: true
    };
    liveSessions.push(session);
    console.log(`[LIVE] Session created: ${title} by ${req.user.id}`);
    res.json({ message: "Live session created", session });
  });

  app.post("/api/live/join/:sessionId", verifyToken, (req: any, res) => {
    const log = {
      id: String(sessionLogs.length + 1),
      sessionId: req.params.sessionId,
      userId: req.user.id,
      joinTime: new Date().toISOString()
    };
    sessionLogs.push(log);
    console.log(`[LIVE] User ${req.user.id} joined session ${req.params.sessionId}`);
    res.json({ message: "Joined session", log });
  });

  app.post("/api/live/leave/:logId", verifyToken, (req: any, res) => {
    const index = sessionLogs.findIndex(l => l.id === req.params.logId);
    if (index !== -1) {
      const log = sessionLogs[index];
      log.leaveTime = new Date().toISOString();
      const diff = new Date(log.leaveTime).getTime() - new Date(log.joinTime).getTime();
      log.durationMinutes = Math.floor(diff / 60000);
      console.log(`[LIVE] User ${req.user.id} left session. Duration: ${log.durationMinutes}m`);
      res.json({ message: "Left session", duration: log.durationMinutes });
    } else {
      res.status(404).json({ message: "Session log not found" });
    }
  });

  app.get("/api/live/my-sessions", verifyToken, (req: any, res) => {
    const myLogs = sessionLogs.filter(l => l.userId === req.user.id).map(log => {
      const session = liveSessions.find(s => s.id === log.sessionId);
      return { ...log, session };
    });
    res.json(myLogs);
  });

  app.get("/api/live/active", verifyToken, (req, res) => {
    res.json(liveSessions.filter(s => s.isActive));
  });

  // 🤖 AI Chatbot API (Gemini Powered)
  app.post("/api/ai/chat", verifyToken, async (req: any, res) => {
    const { message } = req.body;
    const userRole = req.user.role;

    try {
      const prompt = `
        You are Merinova AI Education Assistant.
        User Role: ${userRole}

        Rules:
        - Respond in Amharic if the user uses Amharic.
        - Respond in Afaan Oromo if the user uses Afaan Oromo.
        - Respond in English if the user uses English.
        - If the user is a student, explain topics simply and provide study tips.
        - If the user is a teacher, provide teaching support and lesson planning ideas.
        - Be polite, educational, and culturally relevant to Ethiopia.
        
        User Message: ${message}
      `;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });

      res.json({ reply: result.text || "I'm sorry, I couldn't process that." });
    } catch (error) {
      console.error("AI Chat Error:", error);
      res.status(500).json({ error: "AI processing failed" });
    }
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Merinova Cloud Core running on http://localhost:${PORT}`);
  });
}

startServer();
