import React, { useRef } from "react";
const Hero = () => {
  const HeroSection = useRef(null);
  // useGSAP(
  //   () => {
  //     const tl = gsap.timeline({ delay: 0.5 });

  //     let heroTitle = SplitText.create(".hero-title", {
  //       type: "words",
  //       mask: "words",
  //     });
  //     let heroSubtitle = SplitText.create(".hero-subtitle", {
  //       type: "words",
  //       mask: "words",
  //     });

  //     tl.from(heroTitle.words, {
  //       y: "100%",
  //       skewX: "40",
  //       opacity: 0,
  //       ease: "power4.out",
  //       stagger: 0.1,
  //     }).from(heroSubtitle.words, {
  //       y: "100%",
  //       skewX: "30",
  //       opacity: 0,
  //       ease: "power1.out",
  //       stagger: {
  //         from: "edges",
  //         amount: 0.2,
  //       },
  //     });
  //   },
  //   { scope: HeroSection },
  // );

  return (
    <section
      ref={HeroSection}
      className="font-primary w-full flex flex-col px-4 md:px-10 gap-4 bg-[#19191A]  pt-32"
    >
      <h1
        style={{
          fontSize: "56px",
          lineHeight: "59px",
          color: "white",
        }}
      >
        Data engineering for the people
      </h1>
      <p className="text-[#A3A1A6] max-w-[780px]" style={{ fontSize: "20px" }}>
        Helping growing businesses like yours turn scattered data across your
        tools into a reliable source of truth for growth and better decision
        making.with reports that update themselves{" "}
      </p>
      <a href="mailto:keshi@zendt.site" target="_blank">
        <button
          style={{
            paddingInline: "24px",
            paddingBlock: "10px",
            color: "#F6EBFF ",
            borderRadius: "12px",
            fontSize: "20px",
            backgroundColor: "#7C0AF5",
          }}
          className="w-fit"
        >
          Hire Us
        </button>
      </a>
      <div className="flex items-end justify-end w-full">
        <img src={"/heroimg.png"} className="w-[1000px]" />
      </div>
    </section>
  );
};

export default Hero;
