# Merinova AI — API Documentation

## 1. Research API

### POST `/api/research/ai`
Interact with the Scientific AI Research Assistant.
- **Body**: `{ "message": "string" }`
- **Returns**: `{ "reply": "string" }`

### POST `/api/research/simulate`
Submit an HPC simulation job.
- **Body**: `{ "type": "Quantum ESPRESSO" | "LAMMPS" | "GROMACS", "name": "string", "params": object }`
- **Returns**: Job metadata and simulated initial status.

## 2. Infrastructure API

### GET `/api/robot/status`
Retrieve current telemetry from the robot fleet and cloud nodes.
- **Returns**: Fleet data, battery, and temperature metrics.

### POST `/api/robot/queue-task`
Queue a new autonomous or manual task for a robot.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "name": "string", "priority": number }`

## 3. Auth API

### POST `/api/auth/login`
Authenticate a user session.
- **Body**: `{ "username": "string", "password": "string" }`
- **Returns**: JWT Token and user profile.

---
*For full API specs, refer to the OpenAPI definition (coming soon).*
