import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-tr from-[#0B0F1C] to-[#1F1B35] px-6 md:px-16">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:30px_30px] opacity-10 z-0" />

      {/* Ambient Glow */}
      <div className="absolute w-[300px] h-[300px] bg-[#925CFF]/20 blur-3xl rounded-full top-24 left-10 animate-pulse z-0" />

      <div
        ref={ref}
        className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto"
      >
        {/* Left Text Content */}
        <div className="flex-1 text-left pt-24 md:pt-32">
          <span className="inline-block text-sm bg-white/10 text-white px-4 py-1 rounded-full backdrop-blur border border-white/10 mb-4">
            Secure. Scalable. Crypto SaaS.
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Gain Clarity<br />Take Control<br />Grow
          </h1>
          <p className="text-white/60 text-lg mb-8 max-w-md">
            A powerful crypto SaaS platform designed to help you launch, manage, and scale digital assets and blockchain-based financial tools securely and efficiently.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="group bg-[#925CFF] hover:bg-[#7F3FFF] text-white font-semibold px-6 py-3 rounded-full shadow-md transition flex items-center gap-2">
              <span className="group-hover:-translate-x-1 transition-transform">🚀</span> Get Started
            </button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium px-6 py-3 rounded-full transition">
              Learn More
            </button>
          </div>

          <div className="flex items-center gap-6 mt-10 text-white/80 text-sm">
            <div className="flex -space-x-2">
              <img
                src="/assets/avatar1.png"
                alt="user1"
                className="w-8 h-8 rounded-full border-2 border-white/10"
              />
              <img
                src="/assets/avatar2.png"
                alt="user2"
                className="w-8 h-8 rounded-full border-2 border-white/10"
              />
            </div>
            <span className="hover:text-white transition duration-300">99.9% Uptime</span>
            <span className="hover:text-white transition duration-300">400k+ Active Users</span>
          </div>
        </div>

        {/* Right Image Mockup */}
        <div className="flex-1 relative w-full max-w-xl">
          <img
            src="/assets/hero-dashboard.png"
            alt="dashboard-preview"
            className="rounded-2xl shadow-lg border border-white/10 w-full h-auto"
          />
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;