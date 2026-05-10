"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Phone } from "lucide-react";

import Image from "next/image";
import dynamic from "next/dynamic";
import { PRESETS } from "@/app/components/HeroGradient";

const HeroGradient = dynamic(() => import("@/app/components/HeroGradient"), {
  ssr: false,
});

export default function MainPage() {
  const homePageRef = useRef(null);

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(".loader", {
        height: 0,
        duration: 1.5,
        ease: "power4.inOut",
      })
        .to(
          ".loader-logo",
          {
            opacity: 0,
            duration: 0.5,
            ease: "power4.out",
          },
          "<",
        )
        .fromTo(
          ".hero-section",
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 1.5,
            ease: "power4.out",
          },
          "-=1",
        )
        .from(
          ".cta",
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=1.5",
        );
    },
    { scope: homePageRef },
  );

  const ctaButtonOnEnter = contextSafe(() => {
    gsap.to(".cta-btn", {
      gap: "5px",
      paddingRight: "50px",
      duration: 0.3,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(".cta-icon", {
      display: "block",
      duration: 0.3,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.fromTo(
      ".cta-icon",
      { rotation: 0 },
      {
        rotation: 15,
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        ease: "power1.inOut",
        overwrite: "auto",
      },
    );
  });

  const ctaButtonOnLeave = contextSafe(() => {
    gsap.to(".cta-btn", {
      gap: "",
      paddingRight: "",
      duration: 0.2,
      ease: "power4.out",
      overwrite: "auto",
    });

    gsap.to(".cta-icon", {
      display: "none",
      duration: 0.2,
      ease: "power4.out",
      overwrite: "auto",
    });
  });

  return (
    <div
      ref={homePageRef}
      className="h-screen font-satoshi tracking-tighter relative overflow-hidden"
    >
      {/* Loader */}
      <div className="fixed top-0 z-30 loader overflow-hidden bg-black w-screen h-screen flex items-center justify-center">
        <Image
          src="/zendt_white.png"
          className="loader-logo"
          width={50}
          height={50}
          alt="logo-foreground"
        />
      </div>

      {/* Gradients */}
      {/* <HeroGradient
        {...PRESETS.softGrid}
        style={{ position: "absolute", height: "100vh" }}
      /> */}
      <HeroGradient
        {...PRESETS.ocean}
        style={{ position: "absolute", height: "100vh" }}
      />

      {/* Main content */}
      <div className="flex h-full flex-col justify-between relative z-10 min-h-0">
        {/* Navbar */}
        <div className="navbar flex flex-col gap-4 p-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6 lg:p-6">
          <ul className="uppercase flex items-center gap-2 flex-shrink-0">
            <li>
              <h1 className="font-semibold">Projects</h1>
            </li>
            <li>
              <a className="lg:text-sm text-xs">Obrien Architects</a>
            </li>
            <li>
              <a className="lg:text-sm text-xs">Maquoekta Research</a>
            </li>
          </ul>

          <div className="headline w-full lg:max-w-[550px]">
            <h1 className="text-xl max-w-[540px] sm:text-2xl lg:text-3xl">
              We build high converting websites for serious businesses and
              companies{" "}
              <span className="font-semibold underline">in 14 days</span>
            </h1>
          </div>

          <div className="flex-shrink-0">
            <a
              href="https://cal.com/chidera-keshi-qy98f0/30min"
              target="_blank"
            >
              <button
                onMouseEnter={ctaButtonOnEnter}
                onMouseLeave={ctaButtonOnLeave}
                className="
                  font-satoshi
                  relative
                  cta-btn
                  px-8 py-3
                  text-[17px] font-medium text-white
                  rounded-full
                  bg-linear-to-b from-[#3a3a3a] to-[#111111]
                  border border-[#050505]
                  flex items-center justify-center
                  shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)]
                  hover:from-[#454545] hover:to-[#1a1a1a]
                  transition-all duration-200 ease-in-out
                  active:scale-95 active:shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]
                "
              >
                Book a call
                <Phone
                  className="cta-icon absolute right-6 hidden mr-0.5"
                  size={16}
                />
              </button>
            </a>
          </div>
        </div>

        {/* Watermark */}
        <div className="watermark overflow-hidden">
          <h1 className="md:text-[14rem] text-white  text-7xl font-bold mix-blend-exclusion">
            Zendt
          </h1>
        </div>
      </div>
    </div>
  );
}
