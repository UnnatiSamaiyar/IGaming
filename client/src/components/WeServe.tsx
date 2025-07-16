import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const INDUSTRIES = [
  {
    icon: "🎰",
    title: "Online Casinos",
    desc: "Reach players with bonus spins, reactivation offers, and secure OTP flows.",
  },
  {
    icon: "🏏",
    title: "Fantasy Sports",
    desc: "Push live match reminders, team locks, and bonus contests for Dream11-like apps.",
  },
  {
    icon: "🎮",
    title: "Esports Betting",
    desc: "Target fans of DOTA, PUBG, CS:GO with game-based alerts and live offers.",
  },
  {
    icon: "🤝",
    title: "Affiliates & Traffic",
    desc: "Provide automated lead alerts, tracking updates, and promo flows.",
  },
  {
    icon: "🧾",
    title: "Payment Gateways",
    desc: "Send OTPs, transaction alerts, and deposit confirmations securely and fast.",
  },
  {
    icon: "🕹️",
    title: "White-label Platforms",
    desc: "Enable white-label casino brands to scale with localized SMS marketing.",
  },
];

const WeServe = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current.querySelectorAll(".industry-card"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
        }
      );
    }
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full py-24 px-6 md:px-20 bg-[#000000] text-white overflow-hidden"
    >
      {/* Gradient Glows */}
      <div className="absolute -bottom-50 -left-30 w-[400px] h-[400px] bg-pink-500/20 blur-3xl rounded-full z-0" />

      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Industries We Serve</h2>
        <p className="text-lg text-white/60 max-w-3xl mx-auto">
          From casino giants to esports startups, our A2P SMS powers every level of gaming growth.
        </p>
      </div>

      <div className="relative z-10 grid md:grid-cols-3 sm:grid-cols-2 gap-10 place-items-center">
        {INDUSTRIES.map((item, idx) => (
          <div
            key={idx}
            className="industry-card group w-full max-w-xs bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left shadow-xl hover:shadow-[0_0_50px_#0ff6] transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03]"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-white/70">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeServe;
