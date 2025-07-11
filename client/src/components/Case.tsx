import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const USE_CASES = [
  {
    label: "🎰 Casino Reactivation",
    desc: "Send weekend bonuses to lapsed users and bring them back to the tables instantly."
  },
  {
    label: "⚽ Live Bet Alerts",
    desc: "Trigger messages when a key match kicks off or odds shift in real-time."
  },
  {
    label: "📱 Fantasy Game Reminders",
    desc: "Nudge users to lock their teams before deadline with personalized reminders."
  },
  {
    label: "🎯 Win-back Campaigns",
    desc: "Send time-sensitive offers to inactive users with compelling one-click CTAs."
  },
  {
    label: "🧾 Transaction Confirmations",
    desc: "Notify users about deposits, withdrawals, and wins in real time securely."
  },
  {
    label: "💡 Campaign Nudges",
    desc: "Send smart messages triggered by user activity across betting funnels."
  }
];

const Case = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll(".usecase-item");
    if (items) {
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.2 }
      );
    }
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full py-24 px-6 md:px-20 bg-[#0F172A] text-white overflow-hidden"
    >
      {/* Neon Glows */}
      <div className="absolute -top-24 left-0 w-[300px] h-[300px] bg-purple-400/10 blur-3xl rounded-full z-0" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-teal-400/10 blur-3xl rounded-full z-0" />

      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Use Case Examples</h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Here’s how top gaming & betting brands use A2P SMS to dominate engagement.
        </p>
      </div>

      <div className="relative z-10 grid md:grid-cols-3 sm:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {USE_CASES.map((use, i) => (
          <div
            key={i}
            className="usecase-item bg-white/5 border border-white/10 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)] hover:-translate-y-2"
          >
            <h3 className="text-lg font-semibold mb-2">{use.label}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{use.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Case;
