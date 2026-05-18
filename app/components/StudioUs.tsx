import React from "react";

const StudioUs = () => {
  return (
    <section className="py-40">
      <article className="flex items-center text-center flex-col max-w-[1000px] mx-auto  gap-10 font-medium text-gray-700">
        <aside className="flex justify-center gap-2">
          <img src="/zendt_new_logo.jpeg" className="w-8 h-8" />
          <h1 className="text-xl font-medium text-black">Zendt</h1>
        </aside>
        <aside>
          <p className="text-4xl">
            A small studio. Built for{" "}
            <span className="font-bold text-black px-1">speed</span> without
            shortcuts.
          </p>
        </aside>
        <aside>
          <p className="text-4xl">
            We work with a limited number of companies each month to protect the
            14-day commitment.
          </p>
        </aside>
        <aside>
          <p className="text-4xl">If the brief is right, so is the timeline.</p>
        </aside>
        <button className="btn px-8 py-3 rounded-full text-gray-800  text-2xl">
          <a>Let's talk about your project</a>
        </button>
      </article>
    </section>
  );
};

export default StudioUs;
