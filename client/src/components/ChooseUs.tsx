import { useRef } from 'react';

const FEATURES = [
  {
    title: 'High-Delivery Routes',
    desc: 'Optimized casino/iGaming SMS routes with instant delivery',
    icon: '🚀',
  },
  {
    title: 'Compliance Security',
    desc: 'GDPR-compliant infrastructure with end-to-end encryption',
    icon: '🔐',
  },
  {
    title: 'Live Analytics',
    desc: 'Real-time tracking of all campaign metrics',
    icon: '📊',
  },
  {
    title: 'Global Network',
    desc: 'Local routes in 50+ countries worldwide',
    icon: '🌍',
  },
  {
    title: 'Smart Triggers',
    desc: 'Automated campaigns for player engagement',
    icon: '💡',
  },
];

const ChooseUs = () => {
  const containerRef = useRef();

  return (
    <section
      className="w-full py-20 px-6 md:px-12 overflow-hidden relative"
      style={{
        background: 'radial-gradient(circle at center, #07050F 0%, #000000 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-sm text-white/90">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4">
            Built for <span className="text-[#925CFF]">iGaming Excellence</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            From lightning-fast delivery to global compliance, we power iGaming communication at scale.
          </p>
        </div>

        <div ref={containerRef} className="relative w-full overflow-hidden">
          <div
            className="flex w-max animate-scroll gap-6"
            style={{ animation: 'scroll 30s linear infinite' }}
          >
            {[...FEATURES, ...FEATURES].map((feature, i) => (
              <div
                key={i}
                className="w-64 md:w-72 flex-shrink-0 rounded-xl p-6 flex flex-col border border-white/10 bg-white/5 backdrop-blur-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-cyan-400">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes for scrolling */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default ChooseUs;
