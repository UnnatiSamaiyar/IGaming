import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const FeaturesShowcase = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const featuresRef = useRef(null);

  const features = [
    {
      title: "Real-time Analytics",
      icon: "📊",
      description: ["Live engagement tracking", "Millisecond response metrics", "Customizable dashboards"],
      color: "from-purple-600 to-indigo-600"
    },
    {
      title: "AI Optimization",
      icon: "🤖", 
      description: ["Predictive routing", "Smart throttling", "Adaptive algorithms"],
      color: "from-teal-500 to-emerald-600"
    },
    {
      title: "Global Network",
      icon: "🌐",
      description: ["70+ edge locations", "Geo-redundant systems", "Multi-cloud infrastructure"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Military Security",
      icon: "🔒",
      description: ["End-to-end encryption", "Zero-knowledge proofs", "FIPS 140-2 compliant"],
      color: "from-amber-500 to-orange-500"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.from(sectionRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      });

      // Tab animation sequence
      gsap.from(".feature-tab", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".tabs-container",
          start: "top 80%"
        }
      });

      // Card animation
      ScrollTrigger.batch(".feature-card", {
        start: "top 80%",
        onEnter: batch => {
          gsap.from(batch, {
            opacity: 0,
            y: 80,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out"
          });
        }
      });

      // Active tab indicator animation
      gsap.to(".active-indicator", {
        x: () => tabsRef.current[activeTab]?.offsetLeft || 0,
        width: () => tabsRef.current[activeTab]?.clientWidth || 0,
        ease: "power3.out",
        duration: 0.6
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-32 px-6 md:px-12 bg-gradient-to-b from-gray-950 to-black overflow-hidden"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: i % 2 ? "#6366F1" : "#10B981",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 10}s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
            Advanced Feature Suite
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Engineered for the most demanding real-time communication requirements at global scale
          </p>
        </div>

        {/* Tabbed interface */}
        <div className="tabs-container relative mb-16 max-w-4xl mx-auto">
          <div className="flex justify-center space-x-6 relative">
            <div className="absolute bottom-0 h-1 bg-white/10 w-full rounded-full" />
            <div className="absolute bottom-0 h-1 bg-indigo-500 rounded-full active-indicator" />
            
            {features.map((feature, index) => (
              <button
                key={index}
                ref={el => { tabsRef.current[index] = el; }}
                className={`feature-tab px-6 py-3 text-lg font-medium transition-colors ${activeTab === index ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab(index)}
              >
                {feature.title}
              </button>
            ))}
          </div>
        </div>

        {/* Feature cards grid */}
        <div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className={`feature-card group relative overflow-hidden rounded-2xl p-0.5 bg-gradient-to-br ${feature.color}`}
            >
              <div className="h-full bg-gray-900 rounded-[calc(1rem-2px)] p-8 transition-all duration-300 group-hover:bg-gray-900/90">
                <div className="text-4xl mb-6 opacity-90">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <ul className="space-y-3">
                  {feature.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-400 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="text-center mt-20">
          <button className="relative px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-lg font-medium overflow-hidden group">
            <span className="relative z-10 flex items-center justify-center">
              Explore All Features
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      {/* Global styles for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px); }
        }
      `}</style>
    </section>
  );
};

export default FeaturesShowcase;
