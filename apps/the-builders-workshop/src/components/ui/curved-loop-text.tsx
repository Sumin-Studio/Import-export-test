"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CurvedLoopTextProps {
  text: string;
  className?: string;
  radius?: number;
  fontSize?: number;
  duration?: number;
}

export function CurvedLoopText({
  text,
  className = "",
  radius = 250,
  fontSize = 56,
  duration = 80,
}: CurvedLoopTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const rafRef = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 800;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.z = 1000;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create text sprites along a circle
    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // Create canvas for text
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = 512;
    canvas.height = 128;

    // Set up text style
    context.font = `700 ${fontSize}px var(--font-inter), system-ui, sans-serif`;
    context.fillStyle = "currentColor";
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Measure text
    const metrics = context.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize;

    // Create text texture
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    // Calculate how many times to repeat text
    const circumference = 2 * Math.PI * radius;
    const spacing = " • ";
    const spacingWidth = context.measureText(spacing).width;
    const totalWidth = textWidth + spacingWidth;
    const repeatCount = Math.ceil(circumference / totalWidth) + 2;

    // Create sprites along the circle
    const angleStep = (2 * Math.PI) / repeatCount;

    for (let i = 0; i < repeatCount; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // Create sprite for each text instance
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        color: 0x000000,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(x, y, 0);
      sprite.scale.set(textWidth * 0.01, textHeight * 0.01, 1);

      // Rotate sprite to face outward along the circle
      sprite.rotation.z = angle + Math.PI / 2;

      group.add(sprite);
    }

    // Animation loop
    const animate = () => {
      const elapsed = clockRef.current.getElapsedTime();
      const rotationSpeed = (2 * Math.PI) / duration;
      group.rotation.z = elapsed * rotationSpeed;

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 800;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      texture.dispose();
      group.children.forEach((child: THREE.Object3D) => {
        if (child instanceof THREE.Sprite) {
          child.material.dispose();
        }
      });
    };
  }, [text, radius, fontSize, duration]);

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center ${className}`}
      style={{ width: "100%", height: "100%", minHeight: "600px" }}
    />
  );
}
