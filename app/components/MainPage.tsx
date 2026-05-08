"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
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
    // 1. Button collapse
    gsap.to(".cta-btn", {
      gap: "",
      paddingRight: "", // Setting to "" removes the inline style, reverting to your CSS file
      duration: 0.2,
      ease: "power4.out",
      overwrite: "auto", // Prevents conflict with onEnter
    });

    // 2. Icon fade out
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
      className="h-screen font-satoshi tracking-tighter relative"
    >
      <div className="fixed top-0 z-30 loader overflow-hidden bg-black w-screen h-screen flex items-center justify-center">
        <Image
          src="/zendt_white.png"
          className="loader-logo"
          width={50}
          height={50}
          alt="logo-foreground"
        />
      </div>
      <HeroGradient
        {...PRESETS.softGrid}
        style={{ position: "absolute", inset: 0 }}
      />
      // Deep ocean blues
      <HeroGradient
        {...PRESETS.ocean}
        style={{ position: "absolute", inset: 0 }}
      />
      <div className="flex h-full flex-col justify-between relative z-10">
        <div className="navbar flex p-2 justify-between">
          <ul className="uppercase flex items-center gap-2">
            <li>
              <h1 className="font-semibold">Projects</h1>
            </li>
            <li>
              <a className="text-sm">Obrien Architects</a>
            </li>
            <li>
              <a className="text-sm">Maquoekta Research</a>
            </li>
          </ul>
          <div className="headline">
            <h1 className="text-3xl max-w-[550px]">
              We build high converting landing pages for solo founders and
              Startups in{" "}
              <span className="font-semibold underline"> 5 days</span>
            </h1>
          </div>
          <div>
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
                           px-8  py-3
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
        <div className="watermark">
          <h1 className="text-[14rem] font-medium mix-blend-exclusion">
            Zendt
          </h1>
        </div>
      </div>
    </div>
  );
}

{
  /* <button
                    onMouseEnter={ctaButtonOnEnter}
                    onMouseLeave={ctaButtonOnLeave}
                    className="
                           font-satoshi
                           relative
                           cta-btn
                           px-10 py-5
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
                  </button>*/
}

//      <a
//   href="https://cal.com/chidera-keshi-qy98f0/30min"
//   target="_blank"
// ></a>
