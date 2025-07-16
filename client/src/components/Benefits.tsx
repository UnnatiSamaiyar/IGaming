import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ShinyText from '../ui/ShinyText'
import StarBorder from "../ui/StarBorder";


const Benefits = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const gridRef = useRef([]);
  const titleRef = useRef(null);

  const benefits = [
    {
      title: "User Acquisition",
      icon: "🚀",
      details: [
        "Instant welcome messages with bonus codes",
        "Real-time first deposit triggers (FTDs)",
        "Verification code delivery (99.9% deliverability)"
      ],
      color: "#FF6B6B"
    },
    {
      title: "Player Retention",
      icon: "🔄",
      details: [
        "Personalized cashback offers via SMS",
        "Time-sensitive tournament alerts",
        "Dormant player reactivation campaigns"
      ],
      color: "#4ECDC4"
    },
    {
      title: "Security Shield",
      icon: "🛡️",
      details: [
        "2FA for all transactions (OTP delivery)",
        "Instant suspicious activity alerts",
        "Regulatory compliance messaging"
      ],
      color: "#45A7E6"
    },
    {
      title: "Revenue Growth",
      icon: "💰",
      details: [
        "AI-driven personalized game offers",
        "Cross-promotion of new slot titles",
        "High-roller deposit incentives"
      ],
      color: "#A374FF"
    },
    {
      title: "Churn Defense",
      icon: "🎯",
      details: [
        "Automated win-back SMS sequences",
        "Abandoned gameplay recovery",
        "VIP loyalty retention programs"
      ],
      color: "#FFB347"
    }
  ];

  useEffect(() => {
    // Create dynamic fluid grid
    const createGrid = () => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = '';
      gridRef.current = [];

      const size = window.innerWidth < 768 ? 40 : 60;
      const columns = Math.ceil(window.innerWidth / size);
      const rows = Math.ceil(window.innerHeight / size);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const cell = document.createElement('div');
          cell.className = 'absolute bg-white/[0.03]';
          cell.style.width = `${size}px`;
          cell.style.height = `${size}px`;
          cell.style.left = `${x * size}px`;
          cell.style.top = `${y * size}px`;

          // Animate each cell individually
          gsap.fromTo(cell,
            { opacity: 0 },
            {
              opacity: 0.08,
              delay: (x * 0.01) + (y * 0.005),
              duration: 0.8,
              ease: "circ.out"
            }
          );

          containerRef.current.appendChild(cell);
          gridRef.current.push(cell);
        }
      }
    };

    createGrid();
    window.addEventListener('resize', createGrid);

    // Interactive mouse effects
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      gridRef.current.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        const cellX = rect.left + rect.width / 2;
        const cellY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(mouseX - cellX, 2) +
          Math.pow(mouseY - cellY, 2)
        );

        const intensity = 1 - Math.min(distance / 300, 0.8);
        gsap.to(cell, {
          background: `rgba(255,255,255,${0.02 + intensity * 0.15})`,
          duration: 1.5,
          ease: "power2.out"
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Title animation
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power4.out"
    });

    // Cards animation
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: {
        each: 0.15,
        from: "center"
      },
      ease: "back.out(2.5)",
      scrollTrigger: {
        trigger: ".cards-container",
        start: "top 70%"
      }
    });

    return () => {
      window.removeEventListener('resize', createGrid);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen py-16 md:py-24 px-6 overflow-hidden">
      {/* Interactive grid layer */}
      <div
        ref={containerRef}

        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-400/10 blur-3xl rounded-full z-0" />

      <div className="absolute -top-40 right-0 w-[400px] h-[400px] bg-cyan-400/20 blur-3xl rounded-full z-0" />
      {/* Gradient overlay */}
      <div className="absolute inset-0  z-1" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16 md:mb-24 px-4" ref={titleRef}>
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 backdrop-blur border border-white/10 text-sm text-cyan-400 mb-6">
            iGaming Messaging Solutions
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              A2P SMS
            </span> Benefits for Casino Platforms
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
            High-performance messaging infrastructure engineered specifically for online gambling operators
          </p>
        </div>

        {/* Premium Cards */}
        <div className=" grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 max-w-10xl mx-auto">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="group relative flex flex-col h-full"
            >
              <div className="flex-1 p-6 md:p-8 bg-white/5 backdrop-blur-lg border border-white/5 rounded-xl transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20">
                <div
                  className="text-4xl md:text-5xl mb-5 md:mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: benefit.color }}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-5">
                  {benefit.title}
                </h3>
                <ul className="space-y-3 md:space-y-4">
                  {benefit.details.map((detail, j) => (
                    <li
                      key={j}
                      className="text-gray-300 text-base md:text-[15px] flex items-start leading-snug"
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-150"
                        style={{ backgroundColor: benefit.color }}
                      />
                      <span className="flex-1">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enhanced hover effect */}
              <div
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(200px at center, ${benefit.color}20, transparent 70%)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-20 text-center">
          <StarBorder
  as="button"
  className="custom-class"
  color="cyan"
  speed="5s"
>
          <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur border border-white/10 rounded-full px-6 py-3">
            <div className="text-cyan-400 text-base md:text-lg">
              <ShinyText text="99.97% Delivery Rate" disabled={false} speed={3} className='custom-class' />
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="text-cyan-400 text-base md:text-lg">
              <ShinyText text="200+ Global Destinations" disabled={false} speed={3} className='custom-class' />
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="text-cyan-400 text-base md:text-lg">
              <ShinyText text="24/7 Monitoring" disabled={false} speed={3} className='custom-class' />
            </div>
          </div>
          </StarBorder>
        </div>

      </div>
    </section>
  );
};

export default Benefits;
