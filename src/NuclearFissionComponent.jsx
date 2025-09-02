// NOTE: This component requires @react-three/fiber and @react-three/drei
// It will work in your project but won't preview here due to library limitations

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { View, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// Scientific constants based on research
const PHYSICS_CONSTANTS = {
  NEUTRONS_PER_FISSION: 2.43, // Average neutrons per U-235 fission
  FISSION_PROBABILITY: 0.841, // 84.1% probability of fission on collision
  NEUTRON_SPEED: 2.0, // Much faster for quick reaction
  FRAGMENT_SPEED: 1.0, // Fast fragment movement
  BOX_SIZE: 4,
  COLLISION_DISTANCE: 0.5, // Larger collision area
};

// Generate neutron count based on statistical distribution
const generateNeutronCount = () => {
  const rand = Math.random();
  // Based on actual U-235 fission neutron multiplicity distribution
  if (rand < 0.027) return 0;
  if (rand < 0.185) return 1;
  if (rand < 0.524) return 2;
  if (rand < 0.858) return 3;
  if (rand < 0.968) return 4;
  if (rand < 0.995) return 5;
  return 6;
};

// Particle class for neutrons, atoms, and fragments
class Particle {
  constructor(type, position, velocity, id) {
    this.type = type; // 'neutron', 'u235', 'fragment'
    this.position = new THREE.Vector3(...position);
    this.velocity = new THREE.Vector3(...velocity);
    this.id = id;
    this.active = true;
    this.age = 0;
  }

  update(deltaTime) {
    if (!this.active) return;
    
    this.age += deltaTime;
    this.position.add(this.velocity.clone().multiplyScalar(deltaTime));
    
    // Boundary collision with transparent box
    const boxSize = PHYSICS_CONSTANTS.BOX_SIZE / 2;
    if (Math.abs(this.position.x) > boxSize) {
      this.velocity.x *= -0.8; // Energy loss on bounce
      this.position.x = Math.sign(this.position.x) * boxSize;
    }
    if (Math.abs(this.position.y) > boxSize) {
      this.velocity.y *= -0.8;
      this.position.y = Math.sign(this.position.y) * boxSize;
    }
    if (Math.abs(this.position.z) > boxSize) {
      this.velocity.z *= -0.8;
      this.position.z = Math.sign(this.position.z) * boxSize;
    }
    
    // Remove old fragments to prevent clutter
    if (this.type === 'fragment' && this.age > 5) {
      this.active = false;
    }
  }
}

// U-235 Atom component (cluster of protons and neutrons like in diagram)
function U235Atom({ position, active }) {
  const groupRef = useRef();
  
  useFrame(() => {
    if (groupRef.current && active) {
      groupRef.current.position.copy(position);
    }
  });
  
  if (!active) return null;
  
  // Create positions for 235 nucleons (92 protons + 143 neutrons)
  // Simplified to ~20 visible particles in a cluster formation
  const nucleonPositions = [];
  const radius = 0.15;
  
  // Create a clustered sphere of nucleons
  for (let i = 0; i < 20; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.random() * radius;
    
    nucleonPositions.push([
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    ]);
  }
  
  return (
    <group ref={groupRef}>
      {nucleonPositions.map((pos, index) => (
        <mesh key={index} position={pos}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial 
            color={index % 2 === 0 ? '#ff4444' : '#ff6666'} // Red protons and neutrons
            emissive={index % 2 === 0 ? '#440000' : '#660000'}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      {/* Outer electron cloud effect */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial 
          color="#00ff00" 
          transparent 
          opacity={0.2}
          emissive="#004400"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}

function ParticleRenderer({ particle }) {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current && particle.active) {
      meshRef.current.position.copy(particle.position);
      
      // Add movement trail effect for neutrons
      if (particle.type === 'neutron') {
        const pulse = Math.sin(Date.now() * 0.02) * 0.1 + 1;
        meshRef.current.scale.setScalar(pulse);
      }
    }
  });
  
  if (!particle.active) return null;
  
  // Render U-235 atoms with special component
  if (particle.type === 'u235') {
    return <U235Atom position={particle.position} active={particle.active} />;
  }
  
  const getParticleProps = () => {
    switch (particle.type) {
      case 'neutron':
        return {
          geometry: [0.08, 12, 12],
          color: '#ffff00',
          emissive: '#888800',
        };
      case 'fragment':
        return {
          geometry: [0.12, 10, 10],
          color: '#ff4444',
          emissive: '#880000',
        };
      default:
        return {
          geometry: [0.05, 8, 8],
          color: '#ffffff',
          emissive: '#000000',
        };
    }
  };
  
  const props = getParticleProps();
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={props.geometry} />
      <meshStandardMaterial 
        color={props.color} 
        emissive={props.emissive}
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

function FissionSimulation({ maxFissions, currentFissions, isPlaying, onFissionOccurred }) {
  const [particles, setParticles] = useState([]);
  const nextId = useRef(0);
  
  // Initialize simulation with multiple U-235 atoms like in the diagram
  useEffect(() => {
    const initialParticles = [
      // One fast-moving neutron
      new Particle('neutron', [-1.8, -0.5, 0], [2.0, 0, 0], nextId.current++),
      
      // Multiple U-235 atoms scattered around (like in diagram)
      new Particle('u235', [1, 0.5, 0], [0, 0, 0], nextId.current++),
      new Particle('u235', [0.5, -1, 0.3], [0, 0, 0], nextId.current++),
      new Particle('u235', [-0.5, 1, -0.5], [0, 0, 0], nextId.current++),
      new Particle('u235', [1.5, -0.5, 0.8], [0, 0, 0], nextId.current++),
      new Particle('u235', [-1, -0.8, -0.3], [0, 0, 0], nextId.current++),
      new Particle('u235', [0.8, 1.2, -0.8], [0, 0, 0], nextId.current++),
      new Particle('u235', [-1.2, 0.8, 0.6], [0, 0, 0], nextId.current++),
    ];
    setParticles(initialParticles);
  }, []);
  
  // Much faster animation loop for quick chain reaction
  useFrame((state, deltaTime) => {
    if (!isPlaying) return;
    
    // Speed up the simulation
    const speedMultiplier = 1.5;
    const adjustedDelta = deltaTime * speedMultiplier;
    
    setParticles(prevParticles => {
      const activeParticles = prevParticles.filter(p => p.active);
      const newParticles = [];
      
      // Update all particles
      activeParticles.forEach(particle => {
        particle.update(adjustedDelta);
      });
      
      // Check for collisions between neutrons and U-235 atoms
      if (currentFissions < maxFissions) {
        const neutrons = activeParticles.filter(p => p.type === 'neutron');
        const u235Atoms = activeParticles.filter(p => p.type === 'u235');
        
        neutrons.forEach(neutron => {
          u235Atoms.forEach(atom => {
            const distance = neutron.position.distanceTo(atom.position);
            
            if (distance < PHYSICS_CONSTANTS.COLLISION_DISTANCE) {
              // Guaranteed fission for dramatic effect
              neutron.active = false;
              atom.active = false;
              
              // Create dramatic explosion of fragments
              const numFragments = 4; // More fragments for visual impact
              for (let i = 0; i < numFragments; i++) {
                const fragmentDir = new THREE.Vector3(
                  (Math.random() - 0.5) * 2,
                  (Math.random() - 0.5) * 2,
                  (Math.random() - 0.5) * 2
                ).normalize().multiplyScalar(PHYSICS_CONSTANTS.FRAGMENT_SPEED * (0.5 + Math.random()));
                
                newParticles.push(
                  new Particle('fragment', atom.position.toArray(), fragmentDir.toArray(), nextId.current++)
                );
              }
              
              // Generate 2-4 fast neutrons (more dramatic)
              const neutronCount = Math.floor(Math.random() * 3) + 2; // 2-4 neutrons
              
              for (let i = 0; i < neutronCount; i++) {
                // Random direction emission
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                
                const neutronVelocity = new THREE.Vector3(
                  Math.sin(phi) * Math.cos(theta),
                  Math.sin(phi) * Math.sin(theta),
                  Math.cos(phi)
                ).multiplyScalar(PHYSICS_CONSTANTS.NEUTRON_SPEED * (0.8 + Math.random() * 0.4));
                
                newParticles.push(
                  new Particle('neutron', atom.position.toArray(), neutronVelocity.toArray(), nextId.current++)
                );
              }
              
              onFissionOccurred();
            }
          });
        });
      }
      
      return [...activeParticles, ...newParticles];
    });
  });
  
  return (
    <>
      {particles.map(particle => (
        <ParticleRenderer key={particle.id} particle={particle} />
      ))}
      
      {/* Containment box with more visible borders */}
      <mesh>
        <boxGeometry args={[PHYSICS_CONSTANTS.BOX_SIZE, PHYSICS_CONSTANTS.BOX_SIZE, PHYSICS_CONSTANTS.BOX_SIZE]} />
        <meshStandardMaterial 
          color="#666666" 
          transparent 
          opacity={0.2} 
          wireframe={true}
        />
      </mesh>
      
      {/* Enhanced lighting for better visibility */}
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-3, -3, -3]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 3, -3]} intensity={1} color="#ffdddd" />
      
      {/* Status indicators */}
      {!isPlaying && (
        <Text
          position={[0, 2.2, 0]}
          fontSize={0.25}
          color="#ffff00"
          anchorX="center"
          anchorY="middle"
        >
          ⏸️ PAUSED - Press Play for Chain Reaction
        </Text>
      )}
      
      <Text
        position={[0, -2.3, 0]}
        fontSize={0.2}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        🟡 Neutrons: {particles.filter(p => p.active && p.type === 'neutron').length} | 
        🔴 U-235: {particles.filter(p => p.active && p.type === 'u235').length} | 
        💥 Fragments: {particles.filter(p => p.active && p.type === 'fragment').length}
      </Text>
    </>
  );
}

// Controls Component (render outside Canvas)
export function FissionControls({ maxFissions, currentFissions, isPlaying, onIncrementMax, onReset, onPlayPause }) {
  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 100,
      background: 'rgba(0,0,0,0.8)',
      padding: '15px',
      borderRadius: '10px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      minWidth: '200px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>U-235 Fission Control</h3>
      
      {/* Play/Pause Button */}
      <div style={{ marginBottom: '15px' }}>
        <button 
          onClick={onPlayPause}
          style={{
            padding: '12px 20px',
            backgroundColor: isPlaying ? '#FF9800' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Start Fission'}
        </button>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Fissions: {currentFissions}/{maxFissions}</strong>
        {currentFissions >= maxFissions && (
          <div style={{ fontSize: '11px', color: '#ffff00', marginTop: '4px' }}>
            ⚠️ Fission limit reached
          </div>
        )}
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <button 
          onClick={onIncrementMax}
          disabled={isPlaying}
          style={{
            padding: '8px 12px',
            marginRight: '5px',
            backgroundColor: isPlaying ? '#666' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            fontSize: '12px'
          }}
        >
          +1 Max Fission
        </button>
        <span style={{ fontSize: '12px' }}>Max: {maxFissions}</span>
      </div>
      
      <button 
        onClick={onReset}
        style={{
          padding: '8px 12px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          width: '100%'
        }}
      >
        Reset Simulation
      </button>
      
      <div style={{ marginTop: '10px', fontSize: '10px', color: '#ccc' }}>
        <div>🟡 Neutron | 🔴 U-235 Cluster | 💥 Fragment</div>
        <div>Chain Reaction Speed: FAST</div>
        <div>Fission Probability: 100%</div>
        <div>Avg Neutrons/Fission: 2-4</div>
      </div>
    </div>
  );
}

// Main 3D Component (render inside Canvas)
export default function NuclearFissionComponent({ maxFissions = 10, currentFissions = 0, isPlaying = false, onFissionOccurred }) {
  return (
    <>
      <FissionSimulation 
        maxFissions={maxFissions}
        currentFissions={currentFissions}
        isPlaying={isPlaying}
        onFissionOccurred={onFissionOccurred}
      />
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
      />
    </>
  );
}