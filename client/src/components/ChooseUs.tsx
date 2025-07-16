import { useRef } from 'react';
import loadingGif from '../assets/Images/igaming-video.gif';

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

  return (
    <section className="w-full py-16 px-4 overflow-hidden relative" style={{
      background:
        "radial-gradient(circle at center, #07050F 0%, #000000 100%)",
    }}>
      <div className="max-w-8xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          iGaming Communication Solutions
        </h2>

        <div ref={containerRef} className="relative w-full overflow-hidden">


          <div
            className="flex w-max animate-scroll gap-6"
            style={{ animation: 'scroll 20s linear infinite' }}
          >
            {[...FEATURES, ...FEATURES].map((feature, i) => (
              <div
                key={i}
                className="w-72 flex-shrink-0 rounded-xl p-6 flex flex-col border border-white/10 bg-white/10 backdrop-blur-md transition-transform hover:shadow-lg"
                style={{
                  transformOrigin: 'center',
                  perspective: '1000px'
                }}
              >

                <div className="text-4xl mb-4 text-cyan-400">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
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
      <div className="flex justify-center mt-10">
        <img src={loadingGif} alt="loading gif" className=" object-contain" />
      </div>

    </section>
  );
};

export default ChooseUs;
