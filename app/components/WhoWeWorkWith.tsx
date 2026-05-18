import React from "react";

function WhoWeWorkWith() {
  return (
    <section className="h-screen text-gray-700 font-primary  w-full max-w-[1000px] w-full mx-auto flex flex-col justify-center gap-4 ">
      <small className="text-xs font-semibold  uppercase text-black">
        the right fit
      </small>
      <p className="text-4xl font-medium">
        We work with B2B service companies that have outgrown how they appear.
      </p>
      <aside className="text-4xl font-medium text-right">
        <p>Recruitment & staffing agencies.</p>
        <p>Management consultancies.</p>
        <p>Logistics and freight companies.</p>
        <p>Financial advisory firms.</p>
        <p>IT managed service providers.</p>
        <p>and Other b2b services companies</p>
      </aside>
      <aside>
        <p className="text-4xl font-medium">
          If your business is
          <span className="text-black px-2 font-semibold">serious</span>
          and your website
          <span className="px-2 font-semibold text-black">isn't.</span>
        </p>
        <p className="text-4xl font-medium"> we should talk!</p>
      </aside>
    </section>
  );
}

export default WhoWeWorkWith;
