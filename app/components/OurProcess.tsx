import React from "react";

function OurProcess() {
  return (
    <section className="h-screen text-gray-700 font-primary  w-full max-w-[1000px] w-full mx-auto flex flex-col justify-center gap-4">
      <small className="text-xs font-semibold  uppercase text-black">
        How we work
      </small>

      <aside className="text-4xl font-medium text-right">
        <p>We don't do long engagements.</p>
        <p>We don't do "discovery phases" that last six weeks.</p>
        <p> We don't disappear after kickoff.</p>
      </aside>
      <aside>
        <p>
          We do
          <span className="text-4xl font-medium text-black">fourteen</span>
          days.
        </p>
        <p>Strategy, design, and build running together,</p>
        <p>not one after the other.</p>
      </aside>
      <aside className="text-4xl font-medium text-right">
        <p>Day 01–02 · We learn your business.</p>
        <p>Day 03–05 · We map the site.</p>
        <p>Day 06–11 · We design and build.</p>
        <p>Day 12–14 · We refine and launch.</p>
      </aside>
      <aside>
        <p>You walk away with a website</p>
        <p className="text-4xl font-medium text-right">
          that works on day one.
        </p>
      </aside>
    </section>
  );
}

export default OurProcess;
