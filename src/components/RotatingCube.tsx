
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const RotatingCube = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x4CC9F0 }), // Blue
      new THREE.MeshBasicMaterial({ color: 0xF72585 }), // Pink
      new THREE.MeshBasicMaterial({ color: 0x7209B7 }), // Purple
      new THREE.MeshBasicMaterial({ color: 0x3A0CA3 }), // Dark Purple
      new THREE.MeshBasicMaterial({ color: 0x4361EE }), // Blue
      new THREE.MeshBasicMaterial({ color: 0x4CC9F0 }), // Light Blue
    ];
    
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    camera.position.z = 5;

    // Animation
    let animationFrameId: number;
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      cube.rotation.y += deltaMove.x * 0.005;
      cube.rotation.x += deltaMove.y * 0.005;

      previousMousePosition = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      mountRef.current?.removeChild(renderer.domElement);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen" />;
};

export default RotatingCube;
