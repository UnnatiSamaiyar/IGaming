import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const VERTICALS = [
  { emoji: "🎰", title: "Online Casinos", desc: "Promote bonus spins, FTD nudges, loyalty rewards & more" },
  { emoji: "⚽", title: "Sports Betting", desc: "Boost real-time odds, event alerts, and match offers" },
  { emoji: "📱", title: "Fantasy Sports", desc: "Send match reminders, bonus nudges, and team tips" },
  { emoji: "♠️", title: "Poker / Rummy", desc: "Highlight tournaments, chip reloads, referrals, and leaderboards" },
  { emoji: "🎮", title: "Esports Betting", desc: "Target CS:GO, PUBG, DOTA events and bonus drops" },
  { emoji: "🚀", title: "Crash Games", desc: "Trigger multiplier streaks, countdowns, cashbacks, and streak rewards" },
];


const UseCases = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll(".case-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, rotate: -3 },
        { y: 0, opacity: 1, rotate: 0, duration: 1.2, ease: "power3.out", stagger: 0.12 }
      );
    }
  }, []);

  return (
    <section className="relative w-full py-24 px-6 md:px-20 bg-[#000000] text-white overflow-hidden">
      {/* Neon Glows */}
      <div className="absolute -top-40 -left-30 w-[400px] h-[400px] bg-pink-500/20 blur-3xl rounded-full z-0" />
      <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] bg-cyan-400/20 blur-3xl rounded-full z-0" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Verticals & Use Cases</h2>
        <p className="text-lg text-white/60 max-w-3xl mx-auto">
          Explore how A2P SMS transforms every aspect of digital betting engagement.
        </p>
      </div>

      <div ref={ref} className="relative z-10 grid md:grid-cols-3 sm:grid-cols-2 gap-8 place-items-center">
        {VERTICALS.map((item, idx) => (
          <div key={idx} className="case-card group w-full max-w-xs bg-black/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,255,255,0.1)] transition transform hover:-translate-y-4 hover:scale-105 hover:shadow-[0_0_60px_rgba(0,255,255,0.4)] duration-300">
            <div className="text-5xl mb-4">{item.emoji}</div>
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-white/70 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UseCases;
