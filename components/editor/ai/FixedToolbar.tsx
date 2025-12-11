"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from "lexical";
import {
  Bold,
  Italic,
  Underline,
  Code,
  Heading1,
  Heading2,
  Quote,
} from "lucide-react";

export default function FixedToolbar() {
  const [editor] = useLexicalComposerContext();

  const format = (command: any, payload?: any) => {
    editor.dispatchCommand(command, payload);
  };

  return (
    <div className="flex items-center gap-1 mb-4 p-2 border-b border-[#2f2f2f] sticky top-0 bg-[#191919] z-10">
      <button
        onClick={() => format(FORMAT_ELEMENT_COMMAND, "h1")}
        className="p-1.5 hover:bg-[#373737] rounded text-[#e3e2e0]"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        onClick={() => format(FORMAT_ELEMENT_COMMAND, "h2")}
        className="p-1.5 hover:bg-[#373737] rounded text-[#e3e2e0]"
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <div className="w-[1px] h-4 bg-[#3f3f3f] mx-1" />
      <button
        onClick={() => format(FORMAT_TEXT_COMMAND, "bold")}
        className="p-1.5 hover:bg-[#373737] rounded text-[#e3e2e0]"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => format(FORMAT_TEXT_COMMAND, "italic")}
        className="p-1.5 hover:bg-[#373737] rounded text-[#e3e2e0]"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => format(FORMAT_TEXT_COMMAND, "underline")}
        className="p-1.5 hover:bg-[#373737] rounded text-[#e3e2e0]"
      >
        <Underline className="w-4 h-4" />
      </button>
      <button
        onClick={() => format(FORMAT_TEXT_COMMAND, "code")}
        className="p-1.5 hover:bg-[#373737] rounded text-[#e3e2e0]"
      >
        <Code className="w-4 h-4" />
      </button>
      <button
        onClick={() => format(FORMAT_ELEMENT_COMMAND, "quote")}
        className="p-1.5 hover:bg-[#373737] rounded text-[#e3e2e0]"
      >
        <Quote className="w-4 h-4" />
      </button>
    </div>
  );
}
