"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import {
  Terminal,
  ArrowRight,
  Loader2,
  Bold,
  Italic,
  Underline,
  Code,
} from "lucide-react";
import { refineTextAction } from "@/lib/context/ai";
import { readStreamableValue } from "@ai-sdk/rsc";

export default function FloatingToolbar() {
  const [editor] = useLexicalComposerContext();
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [isStreaming, setIsStreaming] = useState(false);
  const [input, setInput] = useState("");

  const lastSelectionRef = useRef<any>(null);

  const updateToolbar = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      setShow(false);
      return;
    }
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (rect.width === 0) {
      setShow(false);
      return;
    }

    editor.getEditorState().read(() => {
      lastSelectionRef.current = $getSelection();
    });

    const isCloseToTop = rect.top < 80;
    setCoords({
      top: isCloseToTop
        ? rect.bottom + window.scrollY + 10
        : rect.top + window.scrollY - 60,
      left: rect.left + window.scrollX,
    });
    setShow(true);
  }, [editor]);

  useEffect(() => {
    const handleMouseUp = () =>
      editor.getEditorState().read(() => updateToolbar());
    const handleKeyUp = () =>
      editor.getEditorState().read(() => updateToolbar());

    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          if (!selection || selection.getTextContent().length === 0)
            setShow(false);
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => false,
        COMMAND_PRIORITY_LOW,
      ),
    );

    const root = editor.getRootElement();
    if (root) {
      root.addEventListener("mouseup", handleMouseUp);
      root.addEventListener("keyup", handleKeyUp);
    }
    return () => {
      unregister();
      if (root) {
        root.removeEventListener("mouseup", handleMouseUp);
        root.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, [editor, updateToolbar]);

  // --- FIX: Formatting Handler ---
  const formatText = (e: React.MouseEvent, format: TextFormatType) => {
    e.preventDefault(); // Prevents AI input or Toolbar from stealing focus
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    setIsStreaming(true);
    // ... (rest of AI logic is fine)
    let selectedText = "";
    editor.getEditorState().read(() => {
      const current = $getSelection() || lastSelectionRef.current;
      if ($isRangeSelection(current)) selectedText = current.getTextContent();
    });

    try {
      const { output } = await refineTextAction(selectedText, input);
      for await (const delta of readStreamableValue(output)) {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection))
            selection.insertText(delta as string);
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsStreaming(false);
      setInput("");
      setShow(false);
      editor.focus();
    }
  };

  if (!show) return null;

  return createPortal(
    <div
      className="fixed z-50 animate-in fade-in zoom-in-95 duration-100 ease-out"
      style={{ top: coords.top, left: coords.left }}
    >
      <div className="flex items-center bg-black border border-neutral-800 shadow-[0_8px_30px_rgb(0,0,0,0.5)] p-1 gap-1 rounded-md group hover:border-neutral-700">
        {/* --- AI Section --- */}
        <div
          className={`flex items-center justify-center w-6 h-6 border border-neutral-900 bg-neutral-950 transition-colors ${isStreaming ? "border-indigo-500/50" : "group-hover:border-neutral-800"}`}
        >
          {isStreaming ? (
            <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
          ) : (
            <Terminal className="w-3.5 h-3.5 text-neutral-500 group-hover:text-indigo-500" />
          )}
        </div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI..."
          className="w-[120px] bg-transparent border-none outline-none text-white text-xs font-mono h-8 placeholder:text-neutral-600 focus:placeholder:text-neutral-500 focus:w-[180px] transition-all duration-300"
          disabled={isStreaming}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAskAI(e);
            if (e.key === "Escape") setShow(false);
          }}
        />
        <button
          onClick={handleAskAI}
          disabled={isStreaming || !input}
          className={`h-6 w-6 flex items-center justify-center transition-all ${input ? "bg-indigo-600 text-white" : "bg-neutral-900 text-neutral-600"}`}
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
