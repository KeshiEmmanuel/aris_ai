"use client";

import {  useState } from "react";
import TextArea from "./TextArea";
import ContentSpace from "./ContentSpace";
import { motion } from "motion/react";
export default function NewPage() {
  const [description, setDescription] = useState<string>("");
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [currentId, setCurrentId] = useState<string>("");
  const [mode, setMode] = useState({ value: "", text: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const text = "...";

  console.log(generatedContent);
  console.log(currentId);
  return (
    <section className="max-w-[800px] w-full h-screen new-page-grid font-sans mx-auto">
      <div className="content-area">
        {isLoading ? (
          <div className="flex justify-start h-full">
            <h1 className="text-5xl font-semibold flex">
              {text.split("").map((char, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </div>
        ) : generatedContent.length > 0 ? (
          <ContentSpace content={generatedContent} id={currentId} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div>
              <h1 className="text-5xl font-semibold text-center">
                Start talking with{" "}
                <span className="text-orange-400">Zendt</span>
              </h1>
              <p className="text-center text-gray-500">
                Write compelling and engaging content that resonates with your
                audience.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="first-column">
        <TextArea
          isAuthenticated={true}
          description={description}
          setDescription={setDescription}
          mode={mode}
          setGeneratedContent={setGeneratedContent}
          setMode={setMode}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          setCurrentId={setCurrentId}
        />
      </div>
    </section>
  );
}
