import React from "react";

const Hero = () => {
  return (
    <section className="max-w-[800px] h-screen font-primary pt-40 w-full mx-auto flex flex-col items-center gap-4">
      <h1 className="font-medium text-5xl text-center">
        Your business has grown.
        <br /> Your website hasn't.
      </h1>
      <p className="text-gray-700">
        We build websites for B2B service companies. In{" "}
        <span className="font-bold">14</span> days.
      </p>
      <button className="btn px-4 py-2 rounded-full">
        <a href="https://cal.com/chidera-keshi-qy98f0/30min">Start a project</a>
      </button>
    </section>
  );
};

export default Hero;
