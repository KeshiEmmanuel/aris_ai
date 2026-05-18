import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
function OurProcess() {
  const ourProcess = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ourProcess.current,
          start: "top 10%",
          end: "bottom bottom",
          // toggleActions: "start reverse",
          // scrub: true,
          markers: true,
        },
      });

      let WhoWeWorkWith = SplitText.create(".our-process-details", {
        type: "words",
        mask: "words",
      });

      tl.from(WhoWeWorkWith.words, {
        y: "100%",
        opacity: 0,
        skewX: "40",
        ease: "power4.out",
        stagger: 0.2,
      });
    },
    {
      scope: ourProcess,
    },
  );
  return (
    <section
      ref={ourProcess}
      className="h-screen text-gray-700 font-primary  w-full max-w-[1000px] w-full mx-auto flex flex-col justify-center gap-4"
    >
      <small className="text-xs font-semibold  uppercase text-black">
        How we work
      </small>

      <aside className="text-4xl font-medium text-right">
        <p className="our-process-details">We don't do long engagements.</p>
        <p className="our-process-details">
          We don't do "discovery phases" that last six weeks.
        </p>
        <p className="our-process-details">
          {" "}
          We don't disappear after kickoff.
        </p>
      </aside>
      <aside>
        <p className="our-process-details">
          We do
          <span className="text-4xl font-medium text-black our-process-details">
            fourteen
          </span>
          days.
        </p>
        <p className="our-process-details">
          Strategy, design, and build running together,
        </p>
        <p className="our-process-details">not one after the other.</p>
      </aside>
      <aside className="text-4xl font-medium text-right">
        <p className="our-process-details">
          Day 01–02 · We learn your business.
        </p>
        <p className="our-process-details">Day 03–05 · We map the site.</p>
        <p className="our-process-details">Day 06–11 · We design and build.</p>
        <p className="our-process-details">Day 12–14 · We refine and launch.</p>
      </aside>
      <aside>
        <p className="our-process-details">You walk away with a website</p>
        <p className="text-4xl our-process-details  font-medium text-right">
          that works on day one.
        </p>
      </aside>
    </section>
  );
}

export default OurProcess;
