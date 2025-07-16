import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const FeaturesShowcase = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isHovering, setIsHovering] = useState(null);
  const tabsRef = useRef([]);
  const cardsRef = useRef([]);
  const decorRef = useRef(null);
  const raycastRef = useRef(null);

  const features = [
    {
      title: "Neural Analytics",
      icon: "📈",
      stats: ["200ms Response", "99.99% SLA", "50+ Metrics"],
      color: "from-purple-600 to-indigo-500",
      gradient: "rgba(124, 58, 237, 0.3)",
      accent: "#8B5CF6",
    },
    {
      title: "AI Convergence",
      icon: "🤖",
      stats: ["Predictive Scaling", "Smart Routing", "Auto-Healing"],
      color: "from-teal-500 to-emerald-500",
      gradient: "rgba(20, 184, 166, 0.3)",
      accent: "#10B981",
    },
    {
      title: "Omni-Network",
      icon: "🌐",
      stats: ["80+ Edge Nodes", "Geo-Sharding", "Anycast"],
      color: "from-blue-500 to-cyan-400",
      gradient: "rgba(6, 182, 212, 0.3)",
      accent: "#06B6D4",
    },
    {
      title: "Quantum Encryption",
      icon: "🔐",
      stats: ["ZK-Proofs", "FIPS 140-3", "Post-Quantum"],
      color: "from-amber-500 to-orange-400",
      gradient: "rgba(245, 158, 11, 0.3)",
      accent: "#F59E0B",
    },
  ];

  useEffect(() => {
    // Section entrance animation
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: "power4.out",
    });

    // Tab animations
    gsap.from(".feature-tab", {
      scrollTrigger: {
        trigger: ".tabs-container",
        start: "top 60%",
      },
      opacity: 0,
      x: -20,
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(2)",
    });

    // Card animations
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 60%",
      },
      opacity: 0,
      y: 60,
      scale: 0.95,
      stagger: {
        amount: 0.4,
        from: "center",
      },
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    // Light ray animation
    if (decorRef.current) {
      const rays = decorRef.current.querySelectorAll(".light-ray");
      rays.forEach((ray, i) => {
        gsap.to(ray, {
          rotation: 360,
          duration: 20 + i * 5,
          repeat: -1,
          ease: "none",
        });
      });
    }

    // Mouse follower effect
    const handleMouseMove = (e) => {
      if (!raycastRef.current) return;

      const { left, width } = raycastRef.current.getBoundingClientRect();
      const xPos = ((e.clientX - left) / width) * 100;

      gsap.to(raycastRef.current, {
        background: `linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) ${xPos}%, rgba(255,255,255,0.05) 100%)`,
        duration: 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Active tab indicator
    if (tabsRef.current[activeTab]) {
      gsap.to(".active-indicator", {
        x: tabsRef.current[activeTab].offsetLeft,
        width: tabsRef.current[activeTab].offsetWidth,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    }
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-40 px-6 md:px-16 overflow-hidden bg-gray-950"
    >
      {/* Raycast effect layer */}
      <div
        ref={raycastRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-30"
      />

      {/* Animated decor particles */}
      <div ref={decorRef} className="absolute inset-0 overflow-hidden z-[1]">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute light-ray w-px h-32 bg-gradient-to-t from-transparent via-white/30 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-24">
          <span className="inline-block mb-4 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-sm text-white/90">
            Enterprise-Grade Infrastructure
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-6">
            Architectonic <span className="text-[#925CFF]">Features</span>
          </h2>
          <p className="text-xl text-gray-400 mx-auto max-w-3xl">
            Precision-engineered network capabilities for hyper-scale
            deployments
          </p>
        </div>

        {/* Tabbed Navigation */}
        <div className="tabs-container relative mb-20 max-w-4xl mx-auto">
          <div className="relative border-b border-gray-800 flex justify-center flex-wrap gap-4">
            {/* Active Indicator */}
            <div
              className="absolute bottom-0 h-0.5 bg-[#925CFF] rounded-full transition-all duration-300"
              style={{
                left: tabsRef.current[activeTab]?.offsetLeft ?? 0,
                width: tabsRef.current[activeTab]?.offsetWidth ?? 0,
              }}
            />

            {/* Tab Buttons */}
            {features.map((feature, i) => (
              <button
                key={i}
                ref={(el) => (tabsRef.current[i] = el)}
                onClick={() => setActiveTab(i)}
                onMouseEnter={() => setIsHovering(i)}
                onMouseLeave={() => setIsHovering(null)}
                className={`relative px-6 py-3 text-base font-medium transition-colors ${
                  activeTab === i
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {feature.icon}
                  {feature.title}
                </span>

                {/* Optional: Hover background */}
                {isHovering === i && (
                  <div className="absolute inset-0 bg-white/5 rounded-lg backdrop-blur-sm z-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Features grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="feature-card relative group rounded-xl overflow-hidden p-px"
              style={{
                background: `linear-gradient(to bottom right, ${feature.color})`,
              }}
            >
              <div
                className="h-full bg-gray-900 rounded-xl p-8 transition-all duration-500"
                onMouseEnter={() => setIsHovering(i)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {feature.title}
                </h3>
                <ul className="space-y-3">
                  {feature.stats.map((stat, j) => (
                    <li key={j} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-white mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{stat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover state enhancement */}
              {isHovering === i && (
                <>
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      background: `radial-gradient(400px at center, ${feature.gradient}, transparent 70%)`,
                    }}
                  />
                  <div className="absolute -inset-px rounded-xl border border-white/20 pointer-events-none" />
                </>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button className="px-10 py-5 bg-gradient-to-r from-[#925CFF] to-[#7F3FFF] rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-[#925CFF]/30 transition-all duration-300 group relative overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-3">
              Explore Architectural Blueprint
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:scale-110"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#925CFF] to-[#7F3FFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        .active-indicator {
          filter: drop-shadow(0 0 8px currentColor);
          transition: filter 0.3s ease;
        }
        .feature-card {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .feature-card:hover {
          transform: translateY(-5px) scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default FeaturesShowcase;
