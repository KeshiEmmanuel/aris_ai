"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Phone } from "lucide-react";
import Navbar from "./Navbar";
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
          ".container",
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
      paddingRight: "28px",
      duration: 0.3,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(".cta-icon", {
      opacity: 1,
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
      gap: "0px",
      paddingRight: "", // Setting to "" removes the inline style, reverting to your CSS file
      duration: 0.2,
      ease: "power4.out",
      overwrite: "auto", // Prevents conflict with onEnter
    });

    // 2. Icon fade out
    gsap.to(".cta-icon", {
      opacity: 0,
      duration: 0.2,
      ease: "power4.out",
      overwrite: "auto",
    });
  });

  return (
    <div ref={homePageRef}>
      <div className="absolute top-0 z-30 loader overflow-hidden bg-black w-screen h-screen flex items-center justify-center">
        <Image
          src="/zendt_white.png"
          className="loader-logo"
          width={50}
          height={50}
          alt="logo-foreground"
        />
      </div>
      <div className="container mx-auto w-screen h-screen">
        <Navbar />
        <section className="pt-10 h-[90%]">
          <div className="flex flex-col p-10 justify-between h-full">
            <div className="flex justify-between">
              {/*<h1 className="text-9xl font-satoshi font-bold">
          Beautiful <br /> is Not Enough.
        </h1>*/}
              <div>{/*<h2>Works</h2>*/}</div>
            </div>
            <div className="flex items-start justify-between font-sans">
              <p className="w-[700px] font-grotesk">
                <strong className="font-bold underline text-2xl">ZENDT</strong>{" "}
                is a web development studio for architecture firms and interior
                design studios that want more than a good-looking site. We build
                with <span className="uppercase font-bold text-2xl">one </span>{" "}
                question in mind: what does this website need to do for your
                business? Then we go make that happen from the first interaction
                to the first qualified lead it sends your way. We&apos;re not a
                vendor. We&apos;re the people you call when the work is serious.
                Currently booking our first founding clients at a reduced rate
                in exchange for full transparency on results.
              </p>

              <div className="flex cta items-center justify-center p-8 bg-[#EBE8EB]">
                <button
                  onMouseEnter={ctaButtonOnEnter}
                  onMouseLeave={ctaButtonOnLeave}
                  className="
            font-satoshi
            cta-btn
            px-6 py-2.5
            text-[17px] font-medium text-white
            rounded-[12px]
            bg-gradient-to-b from-[#3a3a3a] to-[#111111]
            border border-[#050505]
            flex items-center
            shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)]
            hover:from-[#454545] hover:to-[#1a1a1a]
            transition-all duration-200 ease-in-out
            active:scale-95 active:shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]
          "
                >
                  Book 15-min intro call
                  <Phone className="cta-icon opacity-0" size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
