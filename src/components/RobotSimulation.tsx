import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RobotData {
  id: string;
  status: string;
  battery: number;
  task: string;
  lastSync: string;
  temperature?: number;
}

interface RobotSimulationProps {
  fleet: RobotData[];
}

const RobotSimulation: React.FC<RobotSimulationProps> = ({ fleet }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const robotsRef = useRef<Map<string, THREE.Group>>(new Map());

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x3b82f6, 2);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(20, 20, 0x3b82f6, 0x111111);
    scene.add(gridHelper);

    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update robot animations based on status
      robotsRef.current.forEach((group, id) => {
        const robotData = fleet.find(r => r.id === id);
        if (!robotData) return;

        // Temperature-based lighting/color shift
        const temp = robotData.temperature || 35;
        const isOverheating = temp > 60;
        const coreColor = isOverheating ? 0xff4400 : (temp > 50 ? 0xffaa00 : 0x00ffff);
        
        group.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry.type === 'BoxGeometry' && child.scale.x < 0.3) {
              // This is likely the AI Core or Visor
              (child.material as THREE.MeshBasicMaterial).color.setHex(coreColor);
            }
          }
        });

        if (robotData.status === 'Active') {
          // Simple walking bobbing effect
          group.position.y = Math.sin(Date.now() * 0.005) * 0.1 + 0.75;
          group.rotation.y += 0.01;
        } else if (robotData?.status === 'Charging') {
          // Pulsing scale effect
          const s = 1 + Math.sin(Date.now() * 0.002) * 0.05;
          group.scale.set(s, s, s);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Sync fleet with 3D objects
  useEffect(() => {
    if (!sceneRef.current) return;

    fleet.forEach((robot, index) => {
      if (!robotsRef.current.has(robot.id)) {
        // Create new robot 3D model
        const group = new THREE.Group();
        
        // Body
        const bodyGeo = new THREE.BoxGeometry(0.6, 0.8, 0.4);
        const bodyMat = new THREE.MeshPhongMaterial({ color: 0xffffff }); // Pure White
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        group.add(body);

        // AI Core Cube (Glowing center)
        const coreGeo = new THREE.BoxGeometry(0.2, 0.2, 0.1);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // Neon Cyan
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.set(0, 0.1, 0.16);
        group.add(core);

        // Head
        const headGeo = new THREE.SphereGeometry(0.25, 32, 32);
        const headMat = new THREE.MeshPhongMaterial({ color: 0xffffff }); // Pure White
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 0.65;
        group.add(head);

        // Eyes (Visor)
        const visorGeo = new THREE.CapsuleGeometry(0.15, 0.05, 4, 8);
        const visorMat = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // Neon Cyan
        const visor = new THREE.Mesh(visorGeo, visorMat);
        visor.rotation.z = Math.PI / 2;
        visor.position.set(0, 0.65, 0.2);
        group.add(visor);

        // Legs
        const legGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6);
        const legMat = new THREE.MeshPhongMaterial({ color: 0x2f2f2f }); // Graphite
        
        const legL = new THREE.Mesh(legGeo, legMat);
        legL.position.set(-0.2, -0.7, 0);
        group.add(legL);

        const legR = new THREE.Mesh(legGeo, legMat);
        legR.position.set(0.2, -0.7, 0);
        group.add(legR);

        // Joints (Deep Blue accents)
        const jointGeo = new THREE.SphereGeometry(0.1, 16, 16);
        const jointMat = new THREE.MeshPhongMaterial({ color: 0x0047ab }); // Deep Blue
        
        const shoulderL = new THREE.Mesh(jointGeo, jointMat);
        shoulderL.position.set(-0.35, 0.3, 0);
        group.add(shoulderL);

        const shoulderR = new THREE.Mesh(jointGeo, jointMat);
        shoulderR.position.set(0.35, 0.3, 0);
        group.add(shoulderR);

        // Position robot in grid
        group.position.set((index - 1) * 3, 0.75, 0);
        
        sceneRef.current.add(group);
        robotsRef.current.set(robot.id, group);
      }
    });

    // Cleanup removed robots
    robotsRef.current.forEach((group, id) => {
      if (!fleet.find(r => r.id === id)) {
        sceneRef.current?.remove(group);
        robotsRef.current.delete(id);
      }
    });
  }, [fleet]);

  return (
    <div ref={mountRef} className="w-full h-full min-h-[300px] rounded-xl overflow-hidden border border-white/10 bg-black/20" />
  );
};

export default RobotSimulation;
