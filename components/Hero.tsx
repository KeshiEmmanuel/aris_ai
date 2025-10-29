"use client";

import TextArea from "./TextArea";
import { useState } from "react";
const Hero = () => {
  const [description, setDescription] = useState<string>("");
  const [mode, setMode] = useState({ value: "", text: "" });
  return (
    <section className="w-[80%] mx-auto">
      <div className="py-16 gap-8 font-sans text-center flex flex-col items-center">
        <button className="text-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse" />
          Built for B2B SaaS Marketer&apos;s only
        </button>
        <div className="flex text-5xl flex-col font-medium items-center">
          <p className="">Zendt understands SaaS funnels.</p>
          <p className=""> Thinks Like Your Team.</p>
          <span className="inline-block text-orange-400">
            Ships Launch-Ready Content.
          </span>
        </div>
        <p className="text-gray-300">
          Zendt helps SaaS marketers launch features, grow pipelines, and
          activate users in minutes without AI tools built for bloggers and
          agencies.
        </p>
        <TextArea
          isAuthenticated={false}
          description={description}
          setDescription={setDescription}
          mode={mode}
          setMode={setMode}
        />
      </div>
    </section>
  );
};
export default Hero;
