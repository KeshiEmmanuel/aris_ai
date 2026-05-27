import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
function WhoWeWorkWith() {
  const whoweworkwith = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: whoweworkwith.current,
          start: "top 10%",
          end: "bottom bottom",
          // toggleActions: "start reverse",
          // scrub: true,
          // markers: true,
        },
      });

      let WhoWeWorkWith = SplitText.create(".who-we-work-with", {
        type: "words",
        mask: "words",
      });

      tl.from(WhoWeWorkWith.words, {
        y: "100%",
        opacity: 0,
        skewX: "40",
        ease: "power4.out",
        stagger: 0.1,
      });
    },
    {
      scope: whoweworkwith,
    },
  );
  return (
    <section
      ref={whoweworkwith}
      className="h-screen text-gray-700 font-primary  w-full max-w-[1000px] w-full mx-auto flex flex-col justify-center gap-4 px-4  lg:px-0"
    >
      <small className="text-xs font-semibold  uppercase text-black">
        the right fit
      </small>
      <p className="text-3xl lg:text-4xl who-we-work-with font-medium">
        We work with B2B service companies that have outgrown how they appear.
      </p>
      <aside className="text-3xl lg:text-4xl font-medium text-right">
        <p className="who-we-work-with">Recruitment & staffing agencies.</p>
        <p className="who-we-work-with">Management consultancies.</p>
        <p className="who-we-work-with">Logistics and freight companies.</p>
        <p className="who-we-work-with">Financial advisory firms.</p>
        <p className="who-we-work-with">IT managed service providers.</p>
        <p className="who-we-work-with">and Other b2b services companies</p>
      </aside>
      <aside>
        <p className="text-3xl lg:text-4xl who-we-work-with  font-medium">
          If your business is
          <span className="text-black px-2 font-semibold">serious</span>
          and your website
          <span className="px-2 font-semibold text-black">isn't.</span>
        </p>
        <p className="text-3xl lg:text-4xl who-we-work-with font-medium">
          {" "}
          we should talk!
        </p>
      </aside>
    </section>
  );
}

export default WhoWeWorkWith;
