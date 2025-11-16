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
          Built for B2B SaaS Startups only
        </button>
        <div className="flex text-6xl flex-col items-center">
          <p className="font-sofia">Your SaaS Voice</p>
          <p className="font-sofia">Automated.</p>
        </div>
        <p className="text-gray-800">
          AI-powered writing that sounds exactly like you for blogs, landing
          pages, product updates, and emails. Paste your style, pick your mode,
          and stay authentic at every touchpoint
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
