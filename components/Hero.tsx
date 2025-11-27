"use client";

import TextArea from "./TextArea";
import { useState } from "react";
const Hero = () => {
  const [description, setDescription] = useState<string>("");
  const [mode, setMode] = useState({ value: "", text: "" });
  return (
    <section className="w-[80%] mx-auto">
      <div className="content">
        <div className="py-16 gap-8 font-sans text-center flex flex-col items-center">
          <button className="text-xs flex items-center gap-2 bg-black/10 px-4 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            Your Brand Voice Engine
          </button>
          <div className="flex text-7xl flex-col items-center">
            <p className="font-sofia">It sounds</p>
            <p className="font-sofia">exactly like you!</p>
          </div>
          <p className="text-gray-800">
            Don't settle for "default AI" voice. Zendt mirrors your existing
            writing style to generate B2B content that fits your brand
            perfectly. No complex prompting, no training time.
          </p>
          <TextArea
            isAuthenticated={false}
            description={description}
            setDescription={setDescription}
            mode={mode}
            setMode={setMode}
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
