import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const benefitsData = [
  { icon: "📈", text: "Boost Acquisition" },
  { icon: "🔁", text: "Improve Retention" },
  { icon: "🛡️", text: "Enhance Security" },
  { icon: "💰", text: "Drive Conversions" },
  { icon: "🎯", text: "Recover Churn" },
];

const Benefits = () => {
  const blobRefs = useRef<Array<HTMLDivElement | null>>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Floating animation for blobs
    blobRefs.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          y: "+=30",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          duration: 3 + i * 0.3,
          delay: i * 0.2,
        });
      }
    });

    // Three.js floating particles background
    import("three").then(THREE => {
      if (!canvasRef.current) return;
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      // Define scene and camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
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
      const material = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.04 });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0006;
        particles.rotation.x += 0.0003;
        renderer.render(scene, camera);
      };
      animate();

      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    });
  }, []);

  return (
    <section className="relative w-full py-32 px-6 md:px-20 bg-[#0F172A] overflow-hidden text-white">
      {/* 3D Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Neon Background glows */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-pink-400/20 blur-[160px] rounded-full z-0" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-blue-400/20 blur-[140px] rounded-full z-0" />

      {/* Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
          Morphing Benefits of A2P SMS
        </h2>
        <p className="text-lg text-white/60">
          Not boxes. Not cards. Just pure motion-driven clarity that flows through user intent.
        </p>
      </div>

      {/* Morphing Floating Blobs - Single Line Layout */}
      <div className="relative z-10 w-full max-w-8xl mx-auto h-[300px] flex items-center justify-center gap-12 overflow-hidden">
        {benefitsData.map((item, i) => (
          <div
            key={i}
            ref={el => { blobRefs.current[i] = el; }}
            className="relative min-w-[200px] h-[200px] bg-gradient-to-br from-[#ff4dff33] via-[#00ffff33] to-[#ffffff22] rounded-[60%] animate-morph backdrop-blur-lg border border-white/10 shadow-[0_0_60px_rgba(0,255,255,0.1)] flex items-center justify-center text-center px-4 hover:scale-105 transition-transform duration-300"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <p className="text-white/80 text-base font-medium leading-snug">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Morphing Keyframes */}
      <style>{`
        @keyframes morph {
          0% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 40% 60% 70% 30% / 30% 60% 40% 70%;
          }
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }

          .animate-morph {
            animation: morph 10s ease-in-out infinite;
          }
        `}</style>
    </section>
  );
};

export default Benefits;
