import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { SplitText } from 'gsap/SplitText';
import AboutVideo from '../assets/Images/AboutVideo.mp4'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, SplitText);

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const floatingShapesRef = useRef<HTMLDivElement[]>([]);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const isMobile = window.innerWidth < 768;

  // Fluid cursor effect
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 15,
          y: e.clientY - 15,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating shapes animation
      floatingShapesRef.current.forEach((shape, i) => {
        const duration = 8 + Math.random() * 7;
        const delay = Math.random() * 3;
        const yoyo = Math.random() > 0.5;
        
        gsap.to(shape, {
          motionPath: {
            path: [
              { x: 0, y: 0 },
              { x: gsap.utils.random(-50, 50), y: gsap.utils.random(-100, 100) },
              { x: gsap.utils.random(-100, 100), y: gsap.utils.random(-50, 50) },
              { x: 0, y: 0 }
            ],
            autoRotate: true
          },
          duration: duration,
          delay: delay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: yoyo
        });
      });

      // Text animation with SplitText
      const split = new SplitText(".hero-title", { 
        type: "chars,words,lines",
        linesClass: "overflow-hidden"
      });

      gsap.from(split.chars, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".hero-title",
          start: "top 80%"
        }
      });

      // Particle trail effect on video hover
      if (!isMobile) {
        gsap.set(".particle", { xPercent: -50, yPercent: -50 });
        
        if (videoRef.current) {
          videoRef.current.addEventListener("mousemove", (e) => {
            const particles = gsap.utils.toArray<HTMLElement>(".particle");
            const tl = gsap.timeline();
            
            particles.forEach(particle => {
              const x = e.clientX;
              const y = e.clientY;
              
              tl.to(particle, {
                x: x,
                y: y,
                opacity: 1,
                duration: 0.1
              }, 0)
              .to(particle, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                  gsap.set(particle, { x: x, y: y });
                }
              }, 0.1);
            });
          });
        }
      }

      // 3D tilt effect
      if (!isMobile) {
        gsap.to(videoRef.current, {
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top center",
            onEnter: () => {
              if (videoRef.current) {
                videoRef.current.style.transformStyle = "preserve-3d";
                videoRef.current.addEventListener("mousemove", handleTilt);
                videoRef.current.addEventListener("mouseleave", resetTilt);
              }
            },
            onLeaveBack: () => {
              if (videoRef.current) {
                videoRef.current.removeEventListener("mousemove", handleTilt);
                videoRef.current.removeEventListener("mouseleave", resetTilt);
              }
              resetTilt();
            }
          }
        });
      }

      // Background distortion effect (WebGL would be better but CSS alternative)
      gsap.to(".distortion-bg", {
        filter: "blur(2px)",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
          start: "top bottom",
          end: "bottom top"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // 3D tilt functions
  const handleTilt = (e: MouseEvent) => {
    if (!videoRef.current) return;
    const rect = videoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const tiltX = (x - 0.5) * 20;
    const tiltY = (0.5 - y) * 20;
    
    videoRef.current.style.transform = `
      perspective(1000px)
      rotateX(${tiltY}deg)
      rotateY(${tiltX}deg)
      scale3d(1.05, 1.05, 1.05)
    `;
  };

  const resetTilt = () => {
    if (videoRef.current) {
      videoRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  // Features with animated icons
  const features = [
    {
      title: "Real-time Analytics",
      desc: "Monitor engagement with millisecond precision",
      icon: "📊"
    },
    {
      title: "Military Encryption",
      desc: "End-to-end AES-256 protected channels",
      icon: "🔒"
    },
    {
      title: "AI Optimization",
      desc: "Dynamic routing powered by machine learning",
      icon: "🤖"
    },
    {
      title: "Global Infrastructure",
      desc: "70+ edge locations worldwide",
      icon: "🌐"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-32 px-6 md:px-12 overflow-hidden"
      style={{ background: "radial-gradient(circle at center, #07050F 0%, #000000 100%)" }}
    >
      {/* Custom cursor (desktop only) */}
      {!isMobile && (
        <div 
          ref={cursorRef}
          className="fixed w-8 h-8 rounded-full bg-white mix-blend-difference pointer-events-none z-50"
        />
      )}

      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            ref={el => { floatingShapesRef.current[i] = el!; }}
            className="absolute opacity-10 w-3 h-3 rounded-full"
            style={{
              backgroundColor: i % 2 ? "#6366F1" : "#10B981",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Distortion effect background */}
      <div className="distortion-bg absolute inset-0 bg-[url('/path-to-texture.png')] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Video with particle effect */}
          <div className="relative">
            <div 
              ref={videoRef}
              className="relative aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-2xl will-change-transform cursor-pointer"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={AboutVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10 pointer-events-none" />
              
              {/* Particle effect elements */}
              {!isMobile && [...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="particle absolute w-2 h-2 rounded-full bg-white opacity-0 pointer-events-none"
                  style={{
                    backgroundColor: i % 2 ? "#EC4899" : "#3B82F6",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-10">
            <h2 className="hero-title text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
              Redefining <span className="bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Communication</span> Infrastructure
            </h2>
            
            <p className="text-xl text-zinc-300 leading-relaxed">
              Our quantum messaging framework delivers zero-latency communications with military-grade security and enterprise scalability.  
              Built for the next generation of real-time applications.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <div 
                  key={i}
                  className="feature-card p-6 rounded-xl bg-gradient-to-br from-zinc-900/50 to-zinc-800/20 border border-zinc-800/40 hover:border-zinc-700 transition-all"
                >
                  <div className="text-3xl mb-3 text-white">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-zinc-300">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Animated button */}
            <div className="flex flex-wrap gap-4 pt-6">
              <button className="relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-lg font-medium overflow-hidden group">
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              
              <button className="px-8 py-4 rounded-full bg-zinc-900/70 border border-zinc-700 hover:bg-zinc-900/40 hover:border-zinc-500 text-lg font-medium transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
