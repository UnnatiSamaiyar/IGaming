import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SplitText } from "gsap/SplitText";
import AboutVideo from "../assets/Images/AboutVideo.mp4";
import loadingGif from '../assets/Images/igaming-video.gif';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, SplitText);

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const floatingShapesRef = useRef<HTMLDivElement[]>([]);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : true;

  const features = [
    {
      title: "High-Delivery Casino Routes",
      desc: "Optimized A2P SMS delivery for iGaming across global markets.",
      icon: "🚀",
    },
    {
      title: "Compliance & Delivery",
      desc: "DLT-registered, GDPR-compliant with real-time delivery insights.",
      icon: "🔐",
    },
    {
      title: "Tailored Campaigns",
      desc: "Send FTD reminders, bonus codes, and tournament alerts easily.",
      icon: "💡",
    },
    {
      title: "Real-Time Analytics",
      desc: "Monitor delivery, clicks, and performance instantly.",
      icon: "📊",
    },
  ];


  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 15,
          y: e.clientY - 15,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating shapes
      floatingShapesRef.current.forEach((shape, i) => {
        gsap.to(shape, {
          motionPath: {
            path: [
              { x: 0, y: 0 },
              {
                x: gsap.utils.random(-50, 50),
                y: gsap.utils.random(-100, 100),
              },
              {
                x: gsap.utils.random(-100, 100),
                y: gsap.utils.random(-50, 50),
              },
              { x: 0, y: 0 },
            ],
          },
          duration: 6 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Title animation
      const split = new SplitText(".hero-title", {
        type: "chars,words,lines",
        linesClass: "overflow-hidden",
      });

      gsap.from(split.chars, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".hero-title",
          start: "top 80%",
        },
      });

      // Particle hover
      if (!isMobile && videoRef.current) {
        const particles = gsap.utils.toArray<HTMLElement>(".particle");
        videoRef.current.addEventListener("mousemove", (e) => {
          particles.forEach((particle) => {
            const x = e.clientX;
            const y = e.clientY;
            gsap.fromTo(
              particle,
              {
                x,
                y,
                opacity: 1,
              },
              {
                opacity: 0,
                duration: 1,
              }
            );
          });
        });
      }

      // 3D tilt
      if (!isMobile && videoRef.current) {
        const el = videoRef.current;
        const handleTilt = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          const tiltX = (x - 0.5) * 20;
          const tiltY = (0.5 - y) * 20;
          el.style.transform = `
            perspective(1000px)
            rotateX(${tiltY}deg)
            rotateY(${tiltX}deg)
            scale3d(1.05, 1.05, 1.05)
          `;
        };

        const resetTilt = () => {
          el.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        };

        el.addEventListener("mousemove", handleTilt);
        el.addEventListener("mouseleave", resetTilt);

        return () => {
          el.removeEventListener("mousemove", handleTilt);
          el.removeEventListener("mouseleave", resetTilt);
        };
      }

      // Background distortion blur
      gsap.to(".distortion-bg", {
        filter: "blur(2px)",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
          start: "top bottom",
          end: "bottom top",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 px-6 md:px-12 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at center, #07050F 0%, #000000 100%)",
      }}
      id="about"
    >
      {!isMobile && (
        <div
          ref={cursorRef}
          className="fixed w-8 h-8 rounded-full mix-blend-difference pointer-events-none z-50"
        />
      )}

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (floatingShapesRef.current[i] = el!)}
            className="absolute opacity-10 w-3 h-3 rounded-full"
            style={{
              backgroundColor: i % 2 ? "#6366F1" : "#10B981",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>


      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Video Block */}
          <div className="relative">
            <h2 className="hero-title text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
              Redefining Communication Infrastructure
            </h2>
            {/* <div
              ref={videoRef}
              className="relative mt-5 aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-2xl will-change-transform cursor-pointer"
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
              {!isMobile &&
                [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="particle absolute w-2 h-2 rounded-full opacity-0 pointer-events-none"
                    style={{
                      backgroundColor: i % 2 ? "#EC4899" : "#3B82F6",
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
            </div> */}
            <div
              ref={videoRef}
              className="relative mt-5 aspect-video rounded-3xl overflow-hidden shadow-2xl will-change-transform cursor-pointer flex items-center justify-center"
            >
              <img
                src={loadingGif}
                alt="loading gif"
                className="object-contain max-h-full"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10 pointer-events-none" />

              {!isMobile &&
                [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="particle absolute w-2 h-2 rounded-full opacity-0 pointer-events-none"
                    style={{
                      backgroundColor: i % 2 ? "#EC4899" : "#3B82F6",
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
            </div>

          </div>

          {/* Content Block */}
          <div className="space-y-10">
            <p className="text-xl text-zinc-300 leading-relaxed">
              🎮 Why iGaming & Casino Brands Choose Us: From high-conversion A2P
              routes and compliance-first delivery to real-time analytics and API-driven
              campaign execution – we power global iGaming communication with precision.
            </p>


            {/* Features Grid */}
            <div className="relative z-10">
              <div className="grid sm:grid-cols-2 gap-6 text-white">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className=" p-6 rounded-xl bg-gradient-to-br from-zinc-900/50 to-zinc-800/20 border border-zinc-800/40 hover:border-zinc-700 transition-all"
                  >
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-300">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            {/* <div className="flex flex-wrap gap-4 pt-6">
              <button className="hover:cursor-pointer relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-lg font-medium overflow-hidden group">
                <span className="relative z-10 text-white">Get Started</span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>

              <button className="hover:cursor-pointer px-8 py-4 text-white rounded-full bg-zinc-900/70 border border-zinc-700 hover:bg-zinc-900/40 hover:border-zinc-500 text-lg font-medium transition-all">
                Watch Demo
              </button>
            </div> */}
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
