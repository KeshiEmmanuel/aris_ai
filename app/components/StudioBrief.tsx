import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function StudioBrief() {
  const sectionRef = useRef(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%",
          end: "bottom bottom",
          // toggleActions: "start reverse",
          // scrub: true,
          // markers: true,
        },
      });

      let studioHighlight = SplitText.create(".studio-brief-paragraph", {
        type: "words",
        mask: "words",
      });

      tl.from(studioHighlight.words, {
        y: "100%",
        opacity: 0,
        skewX: "40",
        ease: "power2.out",
        stagger: 0.08,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className=" w-full px-5 font-primary  h-screen">
      <aside className="max-w-[1000px] mx-auto w-full gap-5 flex flex-col justify-center h-full text-gray-700">
        <p className="text-4xl  studio-brief-paragraph font-medium">
          Most B2B companies have grown into businesses their website doesn't
          know about yet.
        </p>
        <div className="text-4xl font-medium text-right">
          <p className="studio-brief-paragraph">
            The recruitment firm that placed 200 people last year.
          </p>
          <p className="studio-brief-paragraph">
            The logistics company moving freight across three continents.
          </p>
          <p className="studio-brief-paragraph">
            The consultancy that just closed its biggest contract.
          </p>
        </div>
        <p className="studio-brief-paragraph text-4xl font-medium">
          All of them. Same tired website from three years ago.
        </p>
        <p className="studio-brief-paragraph text-4xl font-medium text-right">
          We build the website that closes the gap. Not in ten weeks. In
          <span className="font-bold px-1 text-black">fourteen</span>days.
        </p>
      </aside>
    </section>
  );
}

export default StudioBrief;
