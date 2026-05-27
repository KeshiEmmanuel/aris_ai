import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
const Hero = () => {
  const HeroSection = useRef(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.5 });

      let heroTitle = SplitText.create(".hero-title", {
        type: "words",
        mask: "words",
      });
      let heroSubtitle = SplitText.create(".hero-subtitle", {
        type: "words",
        mask: "words",
      });

      tl.from(heroTitle.words, {
        y: "100%",
        skewX: "40",
        opacity: 0,
        ease: "power4.out",
        stagger: 0.1,
      }).from(heroSubtitle.words, {
        y: "100%",
        skewX: "30",
        opacity: 0,
        ease: "power1.out",
        stagger: {
          from: "edges",
          amount: 0.2,
        },
      });
    },
    { scope: HeroSection },
  );

  return (
    <section
      ref={HeroSection}
      className="max-w-[800px] h-screen font-primary pt-52  w-full mx-auto flex flex-col items-center gap-4"
    >
      <h1 className="hero-title max-w-[560px] font-semibold text-5xl md:text-5xl text-center">
        Your business has grown. Your website hasn't.
      </h1>
      <p className="text-gray-700 hero-subtitle">
        We build websites for B2B service companies. In
        <span className="font-bold px-0.5">14</span> days.
      </p>
      <button className="btn px-4 py-2 rounded-full text-gray-800">
        <a href="https://cal.com/chidera-keshi-qy98f0/30min">Start a project</a>
      </button>
    </section>
  );
};

export default Hero;
