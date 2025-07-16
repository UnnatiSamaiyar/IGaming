import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const USE_CASES = [
  {
    label: "Welcome Bonus Offer",
    example: "“Welcome to <strong>BetZone</strong>! 🎉 Claim your ₹1,000 bonus now. Tap to activate: [link]”"
  },
  {
    label: "FTD Reminder",
    example: "“Double your first deposit today! Offer ends at midnight. [Deposit Now]”"
  },
  {
    label: "Live Casino Alert",
    example: "“⚡ Blackjack table now live with ₹50,000 prize pool! Join now: [link]”"
  },
  {
    label: "OTP for Login",
    example: "“Your Bet365 verification code is 834276. Valid for 5 mins.”"
  },
  {
    label: "Account Balance Alert",
    example: "“You’ve won ₹3,200 on Mega Spin! Withdraw or play more: [link]”"
  },
  {
    label: "Re-engagement Campaign",
    example: "“We miss you! Here’s a 25 free spin bonus to welcome you back: [link]”"
  }
];

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Case: React.FC<TrueFocusProps> = ({
  sentence = "Why SMS Marketing Works",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex!);
    }
  };
  const ref = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = ref.current?.querySelectorAll(".usecase-row");
    if (rows) {
      gsap.fromTo(
        rows,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          }
        }
      );
    }

    if (whyRef.current) {
      gsap.fromTo(
        whyRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: whyRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full py-24 px-6 md:px-20 bg-gradient-to-b from-black to-pink-500/13 text-white overflow-hidden"
    >
      {/* Background Glow Blobs */}

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Use Case Examples</h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Here’s how top gaming & betting brands use A2P SMS to dominate engagement.
        </p>
      </div>

      {/* SMS Table */}
      <div className="relative z-10 max-w-6xl mx-auto overflow-hidden border border-white/20 rounded-xl shadow-2xl bg-white/10 backdrop-blur-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-white/10 text-lg text-white">
              <th className="py-4 px-6 border-b border-white/10 text-left">Use Case</th>
              <th className="py-4 px-6 border-b border-white/10 text-left">SMS Example</th>
            </tr>
          </thead>
          <tbody>
            {USE_CASES.map((use, i) => (
              <tr key={i} className="usecase-row hover:bg-white/10 transition duration-300">
                <td className="py-4 px-6 border-b border-white/10">{use.label}</td>
                <td
                  className="py-4 px-6 border-b border-white/10"
                  dangerouslySetInnerHTML={{ __html: use.example }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Redesigned Why It Works Section */}
      <div
        ref={whyRef}
        className="relative z-10 mt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <div
          className="relative flex gap-4 mb-5 justify-center items-center flex-wrap"
          ref={containerRef}
        >
          {words.map((word, index) => {
            const isActive = index === currentIndex;
            return (
              <span
                key={index}
                ref={(el) => { wordRefs.current[index] = el; }}
                className="relative text-[3rem] font-black cursor-pointer"
                style={{
                  filter: manualMode
                    ? isActive
                      ? `blur(0px)`
                      : `blur(${blurAmount}px)`
                    : isActive
                      ? `blur(0px)`
                      : `blur(${blurAmount}px)`,
                  transition: `filter ${animationDuration}s ease`,
                } as React.CSSProperties}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {word}
              </span>
            );
          })}

          <motion.div
            className="absolute top-0 left-0 pointer-events-none box-border border-0"
            animate={{
              x: focusRect.x,
              y: focusRect.y,
              width: focusRect.width,
              height: focusRect.height,
              opacity: currentIndex >= 0 ? 1 : 0,
            }}
            transition={{
              duration: animationDuration,
            }}
            style={{
              "--border-color": borderColor,
              "--glow-color": glowColor,
            } as React.CSSProperties}
          >
            <span
              className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
              style={{
                borderColor: "var(--border-color)",
                filter: "drop-shadow(0 0 4px var(--border-color))",
              }}
            ></span>
            <span
              className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
              style={{
                borderColor: "var(--border-color)",
                filter: "drop-shadow(0 0 4px var(--border-color))",
              }}
            ></span>
            <span
              className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
              style={{
                borderColor: "var(--border-color)",
                filter: "drop-shadow(0 0 4px var(--border-color))",
              }}
            ></span>
            <span
              className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
              style={{
                borderColor: "var(--border-color)",
                filter: "drop-shadow(0 0 4px var(--border-color))",
              }}
            ></span>
          </motion.div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white shadow-xl hover:scale-[1.03] transition duration-300 border border-white/10">
            <div className="text-3xl mb-2">📈</div>
            <h4 className="text-xl font-semibold mb-2 text-purple-300">98% Open Rate</h4>
            <p className="text-white/80">
              SMS crushes email open rates — nearly every message is seen and read within minutes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white shadow-xl hover:scale-[1.03] transition duration-300 border border-white/10">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="text-xl font-semibold mb-2 text-pink-300">Instant Delivery</h4>
            <p className="text-white/80">
              Time-sensitive offers reach users immediately, driving fast clicks and high conversions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white shadow-xl hover:scale-[1.03] transition duration-300 border border-white/10">
            <div className="text-3xl mb-2">📱</div>
            <h4 className="text-xl font-semibold mb-2 text-blue-300">Universal Reach</h4>
            <p className="text-white/80">
              No apps, no internet — SMS works on every phone, across all geographies and user types.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Case;
