import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FEATURES = [
  {
    title: 'High-Delivery Routes',
    desc: 'Optimized casino/iGaming SMS routes with instant delivery',
    icon: '🚀'
  },
  {
    title: 'Compliance Security',
    desc: 'GDPR-compliant infrastructure with end-to-end encryption',
    icon: '🔐'
  },
  {
    title: 'Live Analytics',
    desc: 'Real-time tracking of all campaign metrics',
    icon: '📊'
  },
  {
    title: 'Global Network',
    desc: 'Local routes in 50+ countries worldwide',
    icon: '🌍'
  },
  {
    title: 'Smart Triggers',
    desc: 'Automated campaigns for player engagement',
    icon: '💡'
  }
];

const ChooseUs = () => {
  const containerRef = useRef();
  const cardsRef = useRef([]);

  useEffect(() => {
    // Horizontal scroll effect
    gsap.to(cardsRef.current, {
      xPercent: -100 * (cardsRef.current.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (cardsRef.current.length - 1),
        end: () => "+=" + (cardsRef.current.length * 300) // approximate card width
      }
    });
  }, []);

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          iGaming Communication Solutions
        </h2>

        {/* Horizontal scroller */}
        <div ref={containerRef} className="relative h-80 overflow-hidden">
          <div className="flex h-full space-x-6">
            {FEATURES.map((feature, i) => (
              <div 
                key={i}
                ref={el => cardsRef.current[i] = el}
                className="flex-shrink-0 w-72 bg-gray-800 rounded-xl p-6 flex flex-col border border-gray-700 transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <div className="text-4xl mb-4 text-cyan-400">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
                <div className="mt-auto pt-4 border-t border-gray-700">
                  <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom scrollbar indicator */}
        <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 rounded-full" style={{ width: '25%' }}></div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
