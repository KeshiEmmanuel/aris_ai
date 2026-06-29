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
  className="font-primary w-full flex flex-col md:flex-row px-4 md:px-10 gap-4"
>
  <div className="md:sticky top-0 pt-20 md:pt-52 md:h-screen flex flex-col justify-start w-full md:w-1/2">
    <h1 className="hero-title max-w-[720px] font-semibold text-2xl  md:text-5xl">
     Your B2B website should be your best salesperson.
If it isn't We fixes that in 14 days.
</h1>
    <button className="btn px-4 py-2 rounded-xl text-gray-800 w-fit mt-4">
      <a href="https://cal.com/chidera-keshi-qy98f0/30min">Book a Free call</a>
    </button>
  </div>
  <div className="w-full md:w-1/2 pt-10 flex flex-col gap-4">
    <a href="https://hireright-phi.vercel.app/" target="_blank">
      <div className="border border-gray-200">
        <img src={"/goodwinhalf.png"} alt="a Recuritment Agency Website revamp" />
      </div>
    </a>
    <div className="border border-gray-200">
      <a href="https://keshi-first-project.webflow.io/" target="_blank">
        <img src={"/obrien.png"} alt="a Recuritment Agency Website revamp" />
      </a>
    </div>
    <div className="h-60 md:h-screen bg-gray-100"></div>
  </div>
</section>
  );
};

export default Hero;
