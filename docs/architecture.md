# Merinova AI — Platform Architecture

## System Overview
Merinova AI is designed as a multi-layered scientific cloud platform. It decouples user interaction from heavy computational workloads.

### 1. Presentation Layer (Frontend)
- **Framework**: React 18 with Vite.
- **State Management**: React Hooks (useState/useEffect) and Context API.
- **Styling**: Tailwind CSS for responsive, futuristic UI.
- **Visualization**: Recharts for metrics, 3D WebGL (Three.js) for robot/molecular simulation.

### 2. Orchestration Layer (Backend)
- **Server**: Express (Node.js).
- **AI Brain**: Integrated Google Gemini API for real-time natural language research support.
- **Job Scheduler**: Custom internal queue that interfaces with Kubernetes API for job lifecycle management.
- **Authentication**: JWT-based secure sessions.

### 3. Compute Layer (HPC Nodes)
- **Infrastructure**: AWS Elastic Kubernetes Service (EKS).
- **Engines**: Containerized scientific software (Quantum ESPRESSO, LAMMPS, GROMACS).
- **Storage**: AWS S3 for simulation trajectory files and results.

## Data Flow
1. User submits a simulation request via the **Research Module**.
2. **Backend** validates parameters and selects the appropriate Docker image.
3. **K8s API** is triggered to spawn a specialized HPC Job pod.
4. **AI Assistant** monitors the job logs to provide real-time simplified status updates.
5. Upon completion, results are stored in **S3** and synced back to the **Dashboard**.

---
© 2026 Merinova AI Architecture Team
