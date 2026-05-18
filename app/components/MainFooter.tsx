import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import FlipButton from "./FilpButton";
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
function MainFooter() {
  const mainFooterRef = useRef(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainFooterRef.current,
          start: "top 10%",
          end: "bottom bottom",
          // toggleActions: "start reverse",
          // scrub: true,
          // markers: true,
        },
      });

      let studioHighlight = SplitText.create(".main-footer-headline", {
        type: "words",
        mask: "words",
      });
      let footersubtitle = SplitText.create(".main-footer-subtitle", {
        type: "words",
        mask: "words",
      });
      tl.from(studioHighlight.words, {
        y: "100%",
        opacity: 0,
        skewX: "40",
        ease: "power2.out",
        stagger: 0.08,
      }).from(footersubtitle.words, {
        y: "100%",
        opacity: 0,
        skewX: "40",
        ease: "power2.out",
        stagger: 0.08,
      });
    },
    { scope: mainFooterRef },
  );

  return (
    <footer
      ref={mainFooterRef}
      className="h-screen px-10  bg-black text-gray-100 pt-20 pb-10"
    >
      <article className="flex flex-col h-full justify-between">
        <h1 className="main-footer-headline text-8xl">
          Your next client is already looking at your website.
        </h1>
        <aside className="flex flex-col gap-10">
          <div className="flex justify-between">
            <FlipButton />

            <p className="max-w-[480px] main-footer-subtitle">
              Book a 20-minute call. No pitch. No deck. Just a conversation
              about whether we're the right fit.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>ZENDT STUDIO © 2026</p>
            <a href="https://linkedin.com/company/zendt-studio" target="_blank">
              LINKEDIN{" "}
            </a>
            <a href="mailto:keshi@zendt.site" target="_blank">
              keshi@zendt.site
            </a>
          </div>
        </aside>
      </article>
    </footer>
  );
}

export default MainFooter;
