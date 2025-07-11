import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    // Text animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
    );

    // THREE.js background particles
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    if (!canvasRef.current) return;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = THREE.MathUtils.randFloatSpread(20);
      const y = THREE.MathUtils.randFloatSpread(20);
      const z = THREE.MathUtils.randFloatSpread(20);
      vertices.push(x, y, z);
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.03 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0007;
      particles.rotation.x += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background layers */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle,rgba(0,255,255,0.2)_1px,transparent_1px)] [background-size:40px_40px] animate-pulse"
      ></div>

      {/* Hero Content */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6"
      >
        <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 relative">
          <span className="text-cyan-400">Enter</span> the Future of Engagement
          <span className="absolute inset-0 blur-2xl text-cyan-400 opacity-30">Enter the Future of Engagement</span>
        </h1>
        <p className="text-white/60 max-w-xl text-lg mb-12">
          Journey through a neon-powered world of intelligent, immersive, instant messaging.
        </p>
        <div className="relative w-8 h-8 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full text-cyan-400 drop-shadow-[0_0_6px_rgba(0,255,255,0.7)]"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
