#!/bin/bash
# Merinova HPC Job Runner Script

echo "⚛️ Starting Quantum ESPRESSO simulation..."
date

mpirun -np 4 pw.x -in input.in > output.out

echo "✅ Simulation complete. Results saved to output.out."
date
