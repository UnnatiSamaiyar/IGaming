import React, { useRef } from "react";
import videoframe from "../assets/Images/videoframe.png";
import frameVideo from "../assets/Images/Igaming-video.mp4";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const IgamingVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
    });

    
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img
                src={videoframe}
                alt="frame"
                className="bg-transparent relative z-10"
              />
            </div>
            <div className="hiw-video">
              <video
                className="pointer-events-none"
                playsInline
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default IgamingVideo;
