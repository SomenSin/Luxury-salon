"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SalonAsset() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        if (groupRef.current) {
          groupRef.current.rotation.y = self.progress * Math.PI * 4;
          groupRef.current.rotation.x = self.progress * Math.PI * 0.5; // Slight tilt
        }
      },
    });
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Main Bottle Body */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 2, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.0}
            color="#f1dcb8"
          />
        </mesh>

        {/* Bottle Neck/Pump */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.2, 0.8, 0.3, 32]} />
          <meshStandardMaterial color="#cba258" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
          <meshStandardMaterial color="#cba258" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Pump Head */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.15, 32]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0.2, 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 32]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={2} />
        <directionalLight position={[-5, 0, -5]} intensity={1} color="#f1dcb8" />
        <Environment preset="city" />
        <SalonAsset />
      </Canvas>
    </div>
  );
}
