import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BenefitsGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cellsRef = useRef<HTMLDivElement[]>([]);
  
  const benefits = [
    { label: "Higher Deliverability", color: "#FF6B6B" },
    { label: "Better Conversions", color: "#4ECDC4" }, 
    { label: "Secure Routing", color: "#45A7E6" },
    { label: "Global Reach", color: "#A374FF" },
    { label: "Instant Scaling", color: "#FFB347" }
  ];

  useEffect(() => {
    // Create animated tile grid
    const cellSize = 60;
    const columns = Math.ceil(window.innerWidth / cellSize);
    const rows = Math.ceil(window.innerHeight * 0.4 / cellSize);
    
    cellsRef.current = [];
    
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const cell = document.createElement('div');
          cell.className = 'absolute bg-gray-800/20 border border-white/5';
          cell.style.width = `${cellSize}px`;
          cell.style.height = `${cellSize}px`;
          cell.style.left = `${x * cellSize}px`;
          cell.style.top = `${y * cellSize}px`;
          
          containerRef.current.appendChild(cell);
          cellsRef.current.push(cell);
        }
      }
    }

    // Mouse move interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      cellsRef.current.forEach((cell, i) => {
        const rect = cell.getBoundingClientRect();
        const dx = (rect.left + rect.width/2) - mouseX;
        const dy = (rect.top + rect.height/2) - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        gsap.to(cell, {
          background: `rgba(255,255,255,${0.05 + 0.15 * (1 - Math.min(distance/200, 1))})`,
          scale: 1 - (0.1 * (1 - Math.min(distance/300, 1))),
          duration: 0.5
        });
      });
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
  <section className="relative w-full min-h-[100vh] pt-40 pb-32 px-6 bg-gray-950 overflow-hidden">
    
    {/* Animated grid background - place it before the content */}
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-b from-violet-950/50 to-gray-950/90"
        style={{ backdropFilter: 'blur(10px)' }}
      />
    </div>

    {/* Content - sits above grid */}
    <div className="relative z-10 max-w-7xl mx-auto">
      <div className="text-center mb-28">
        <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-6">
          Why Our Network Wins
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Cutting through the noise with bulletproof infrastructure
        </p>
      </div>

      {/* Benefit tiles */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {benefits.map((benefit, i) => (
          <div 
            key={i}
            className="relative bg-black/20 border border-white/10 rounded-xl p-8 backdrop-blur-sm hover:backdrop-blur-md transition-all"
            style={{
              boxShadow: `0 0 40px ${benefit.color}30`,
              transformStyle: 'preserve-3d'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -10,
                boxShadow: `0 0 60px ${benefit.color}50`,
                duration: 0.3
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0,
                boxShadow: `0 0 40px ${benefit.color}30`,
                duration: 0.3
              });
            }}
          >
            <div 
              className="w-4 h-4 rounded-full mb-4"
              style={{ background: benefit.color }}
            />
            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: benefit.color }}
            >
              {benefit.label}
            </h3>
            <p className="text-gray-300 text-sm">
              {i === 0 && "99.97% delivery rates through proprietary routes"}
              {i === 1 && "2-5x better conversion than standard providers"}
              {i === 2 && "Military-grade encryption at every network hop"}
              {i === 3 && "Direct connections in 50+ target markets"}
              {i === 4 && "Add 100,000+ messages in seconds with zero lag"}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

};

export default BenefitsGrid;
