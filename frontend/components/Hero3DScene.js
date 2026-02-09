"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Animated floating sphere with distortion
function AnimatedSphere({ position = [0, 0, 0] }) {
    const meshRef = useRef();

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position}>
                <icosahedronGeometry args={[2, 20]} />
                <MeshDistortMaterial
                    color="#00D2BE"
                    emissive="#00D2BE"
                    emissiveIntensity={0.3}
                    roughness={0.1}
                    metalness={0.8}
                    distort={0.4}
                    speed={2}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    );
}

// Orbiting ring
function OrbitRing({ radius = 3, speed = 1, color = "#00D2BE" }) {
    const ringRef = useRef();

    useFrame(({ clock }) => {
        if (ringRef.current) {
            ringRef.current.rotation.y = clock.getElapsedTime() * speed;
            ringRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
        }
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
    );
}

// Floating particles around the sphere
function Particles({ count = 100 }) {
    const particlesRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 3 + Math.random() * 2;

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, [count]);

    useFrame(({ clock }) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#00D2BE"
                size={0.05}
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

// Main 3D scene component
export default function Hero3DScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            style={{
                width: '100%',
                height: '100%',
                background: 'transparent'
            }}
            gl={{ alpha: true, antialias: true }}
        >
            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00D2BE" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F5DD" />

            {/* Main sphere */}
            <AnimatedSphere />

            {/* Orbit rings */}
            <OrbitRing radius={3} speed={0.5} color="#00D2BE" />
            <OrbitRing radius={3.5} speed={-0.3} color="#00A89A" />
            <OrbitRing radius={4} speed={0.2} color="#00F5DD" />

            {/* Particles */}
            <Particles count={80} />
        </Canvas>
    );
}
