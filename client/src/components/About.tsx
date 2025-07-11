import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import aboutVideo from "../assets/Images/AboutVideo.mp4"; // Adjust the path as necessary

const About = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.4 }
    );
  }, []);

  return (
    <section className="relative w-full py-32 px-6 md:px-20 bg-[#0F172A] overflow-hidden text-white">
      {/* Background glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-500/20 blur-[160px] rounded-full z-0" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-teal-400/20 blur-[140px] rounded-full z-0" />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Video Placeholder */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <video
            src={aboutVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div ref={textRef} className="text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            Engineered for Instant Impact
          </h2>
          <p className="text-lg text-white/60 mb-6 leading-relaxed">
            We don’t just deliver messages. We engineer real-time, conversion-driven interactions for high-velocity markets like casino, betting, esports, and fantasy sports.
          </p>
          <p className="text-white/70 text-base">
            Backed by encryption, analytics, and scalable routing — our mission is to make every message feel like a moment. From activation to reactivation, we architect audience journeys that convert.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
