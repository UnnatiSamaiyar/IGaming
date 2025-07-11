import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FEATURES = [
  {
    icon: "🚀",
    title: "High-Delivery Routes",
    desc: "Optimized casino/iGaming SMS routes that reach users instantly, even in strict regions.",
  },
  {
    icon: "🔐",
    title: "Compliance & Security",
    desc: "DLT-ready, GDPR-compliant delivery with OTPs, fraud alerts, and secure flows.",
  },
  {
    icon: "📊",
    title: "Real-Time Analytics",
    desc: "Full visibility into delivery, clicks, conversions, and retention campaigns.",
  },
  {
    icon: "🌍",
    title: "Global Coverage",
    desc: "Deliver messages in India, Turkey, Brazil, UAE and more via stable, compliant routes.",
  },
  {
    icon: "💡",
    title: "Tailored Campaigns",
    desc: "Bonus nudges, FTD triggers, tournaments — all automated through dashboard/API.",
  },
];

const ChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".feature-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100vh] py-24 px-6 md:px-20 bg-[#0F172A] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why iGaming Brands Choose Us</h2>
        <p className="text-lg text-white/60 max-w-3xl mx-auto">
          Built for operators, affiliates & betting tech. Reach real players, fast.
        </p>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 place-items-center">
        {FEATURES.map((item, index) => (
          <div
            key={index}
            className="feature-card group w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl shadow-[0_0_30px_#ffffff0a] hover:shadow-[0_0_50px_#0ff6] transition duration-300 transform hover:-translate-y-2 hover:scale-[1.02]"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 3D Gradient Glow Backgrounds */}
      <div className="absolute -top-10 -left-10 w-[300px] h-[300px] rounded-full bg-[#F43F5E]/20 blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute -bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-[#0ff]/20 blur-3xl opacity-30 pointer-events-none"></div>
    </section>
  );
};

export default ChooseUs;
