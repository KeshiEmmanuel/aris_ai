import React from "react";

function StudioBrief() {
  return (
    <section className=" w-full px-5 font-primary  h-screen">
      <aside className="max-w-[1000px] mx-auto w-full gap-5 flex flex-col justify-center h-full text-gray-700">
        <p className="text-4xl font-medium">
          Most B2B companies have grown into businesses their website doesn't
          know about yet.
        </p>
        <div className="text-4xl font-medium text-right">
          <p>The recruitment firm that placed 200 people last year.</p>
          <p>The logistics company moving freight across three continents.</p>
          <p> The consultancy that just closed its biggest contract.</p>
        </div>
        <p className="text-4xl font-medium">
          All of them. Same tired website from three years ago.
        </p>
        <p className="text-4xl font-medium text-right">
          We build the website that closes the gap. Not in ten weeks. In
          <span className="font-bold px-1 text-black">fourteen</span>days.
        </p>
      </aside>
    </section>
  );
}

export default StudioBrief;
