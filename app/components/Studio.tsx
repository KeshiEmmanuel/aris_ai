"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
function Studio() {
  const sectionRef = useRef(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          // markers: true,
        },
      });

      let studioHighlight = SplitText.create(".studio-highlight", {
        type: "chars",
        mask: "chars",
      });

      tl.from(studioHighlight.chars, {
        y: "100%",
        ease: "power2.out",
        stagger: 0.05,
      })
        .to(".studio-content-wrap", {
          ease: "power1.out",
          width: "500px",
        })
        .to(".highlight-p-1 ", {
          opacity: 1,
          stagger: 0.01,
        });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="h-[400vh] font-primary">
      <article className="h-screen sticky top-0 flex items-center justify-center gap-4">
        <aside className="h-full studio-wrap  flex items-center gap-4">
          <h1 className="studio-highlight text-[24rem] text-center">14</h1>
          <div className="studio-content-wrap w-0">
            <p className="highlight-p-1 text-xl  opacity-0">
              days from brief to live website.
            </p>
            <p className="highlight-p-1 text-xl  opacity-0">Not a prototype.</p>
            <p className="highlight-p-1 text-xl  opacity-0">
              {" "}
              Not a staging site.
            </p>
            <p className="highlight-p-1 text-xl  opacity-0">
              A finished website, ready to win business.
            </p>
          </div>
        </aside>
      </article>
    </section>
  );
}

export default Studio;
