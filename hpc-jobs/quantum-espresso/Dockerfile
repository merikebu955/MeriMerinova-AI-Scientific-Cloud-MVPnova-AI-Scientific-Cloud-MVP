# Dockerfile for Quantum ESPRESSO Node
FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    quantum-espresso \
    mpich \
    libmpich-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /simulation
COPY . .

CMD ["mpirun", "-np", "4", "pw.x", "-in", "input.in"]
