import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(useGSAP);

export default function FlipButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const btn = buttonRef.current;
      if (!btn) return;

      const textDefault = btn.querySelector(".text-default");
      const textHover = btn.querySelector(".text-hover");
      const iconDefault = btn.querySelector(".icon-default");
      const iconHover = btn.querySelector(".icon-hover");

      // Set starting positions for the incoming layers
      gsap.set(textHover, { y: "100%", opacity: 1 });
      gsap.set(iconHover, { x: "-100%", y: "100%", opacity: 1 });

      tlRef.current = gsap
        .timeline({ paused: true })
        // Text: current slides UP and out, incoming slides UP from bottom
        .to(textDefault, { y: "-100%", duration: 0.4, ease: "power3.inOut" }, 0)
        .to(textHover, { y: "0%", duration: 0.4, ease: "power3.inOut" }, 0)
        // Icon: current slides diagonally UP-RIGHT out, incoming slides in from BOTTOM-LEFT
        .to(
          iconDefault,
          { x: "100%", y: "-100%", duration: 0.4, ease: "power3.inOut" },
          0,
        )
        .to(
          iconHover,
          { x: "0%", y: "0%", duration: 0.4, ease: "power3.inOut" },
          0,
        );

      const onEnter = () => tlRef.current?.play();
      const onLeave = () => tlRef.current?.reverse();

      btn.addEventListener("mouseenter", onEnter);
      btn.addEventListener("mouseleave", onLeave);

      return () => {
        btn.removeEventListener("mouseenter", onEnter);
        btn.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: buttonRef },
  );

  return (
    <button
      ref={buttonRef}
      className="text-6xl bg-[#c8ff00] px-10 py-6 rounded-full text-black flex items-center gap-4 overflow-hidden"
    >
      {/* Text */}
      <span className="relative inline-block overflow-hidden">
        <span className="text-default block">Let's make sure it holds up</span>
        <span className="text-hover absolute inset-0 block">
          Let's make sure it holds up
        </span>
      </span>

      {/* Icon */}
      <span className="relative inline-block overflow-hidden">
        <span className="icon-default block">
          <FiArrowUpRight className="bg-black text-white p-2 rounded-full" />
        </span>
        <span className="icon-hover absolute inset-0 flex">
          <FiArrowUpRight className="bg-black text-white p-2 rounded-full" />
        </span>
      </span>
    </button>
  );
}
