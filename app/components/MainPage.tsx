"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Phone } from "lucide-react";

import Image from "next/image";

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
    <div ref={homePageRef} className="h-full">
      <div className="fixed top-0 z-30 loader overflow-hidden bg-black w-screen h-screen flex items-center justify-center">
        <Image
          src="/zendt_white.png"
          className="loader-logo"
          width={50}
          height={50}
          alt="logo-foreground"
        />
      </div>
      <div className="hero-section">
        <div className="container mx-auto w-full h-screen">
          <div className="hero_first_column pt-10">
            <div className="flex flex-col items-center h-full pb-5">
              <h1 className="text-[16rem] leading-tight  font-grotesk font-bold">
                Zendt
              </h1>
              <p className="text-lg w-[460px] text-center opacity-80">
                Building High converting and performing websites for
                extraordinary businesses.
              </p>
              <a
                href="https://cal.com/chidera-keshi-qy98f0/30min"
                target="_blank"
              >
                <div className="flex cta items-center p-8 relative">
                  <button
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
                  </button>
                </div>
              </a>
            </div>
          </div>
          <div className="hero_second_column h-screen pb-20">
            <div className="w-full h-full">
              <iframe
                src="https://player.vimeo.com/video/1179586091?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&muted=1&background=1"
                className="w-full h-full object-cover"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="agency-showcase"
              ></iframe>
            </div>
          </div>

          <footer className="flex items-center justify-center pb-10  w-full">
            <div>
              Zendt is a design studio ran by{" "}
              <a
                className="italic font-bold hover:underline"
                href="https://x.com/_rudosurebec"
                target="_blank"
              >
                Rudo
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
