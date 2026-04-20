# 🚀 Merinova AI — Scientific Cloud MVP

Merinova AI is an high-performance computing (HPC) and artificial intelligence research platform designed to make complex scientific simulations as accessible as a chat interface.

## 🧠 Core Features
- **AI Research Assistant**: A localized scientific brain powered by LLMs (GPT-4/Gemini) to explain physics and generate simulation inputs.
- **HPC Simulation Engine**: Native integration for Quantum ESPRESSO, LAMMPS, and GROMACS.
- **Distributed Job System**: Cloud-native job queue built for Kubernetes and AWS.
- **Real-time SaaS Dashboard**: A futuristic monitoring interface for simulation progress and system telemetry.

## 🏗️ Architecture
- **Frontend**: React 18, Tailwind CSS, Framer Motion (Vite).
- **Backend**: Node.js/Express with integrated AI and simulation controllers.
- **Compute**: Kubernetes (K8s) for containerized HPC workloads.
- **Infrastructure**: Terraform/EKS for scalable cloud deployment.

## 🚀 Getting Started

### 1. Local Development
```bash
# Install dependencies
npm install

# Start the full-stack system
npm run dev
```

### 2. Docker Execution
```bash
docker build -t merinova/api .
docker run -p 3000:3000 merinova/api
```

### 3. Kubernetes Deployment
```bash
kubectl apply -f k8s/
```

## 🌍 Vision
To democratize scientific research by providing an intuitive, AI-powered layer over the world's most powerful computational engines.

---
© 2026 Merinova AI | Merikeb Gashu
