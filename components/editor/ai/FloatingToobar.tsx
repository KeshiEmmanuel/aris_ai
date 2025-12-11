"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
  $isParagraphNode,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import { Terminal, ArrowRight, Loader2 } from "lucide-react";
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

    // 1. Safety Checks: If no valid selection, hide toolbar
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      setShow(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // If invisible selection (zero width), hide
    if (rect.width === 0) {
      setShow(false);
      return;
    }

    // Save Lexical selection state for the AI action later
    editor.getEditorState().read(() => {
      lastSelectionRef.current = $getSelection();
    });

    // 2. Positioning Logic
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
    // 3. LISTEN TO MOUSEUP (Crucial Fix)
    // We only want to show the toolbar when the user FINISHES dragging.
    // If we update continuously during drag, it might lag or glitch.
    const handleMouseUp = () => {
      editor.getEditorState().read(() => {
        updateToolbar();
      });
    };

    // Also listen to KeyUp for keyboard selection (Shift+Arrows)
    const handleKeyUp = () => {
      editor.getEditorState().read(() => {
        updateToolbar();
      });
    };

    const unregisterListeners = mergeRegister(
      // We still use UpdateListener to HIDE the toolbar if selection becomes empty
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          if (!selection || selection.getTextContent().length === 0) {
            setShow(false);
          }
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          // Optional: You can keep this or rely on mouseup.
          // Usually mouseup is smoother for Floating Toolbars.
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );

    // Attach DOM listeners to the editor root
    const rootElement = editor.getRootElement();
    if (rootElement) {
      rootElement.addEventListener("mouseup", handleMouseUp);
      rootElement.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      unregisterListeners();
      if (rootElement) {
        rootElement.removeEventListener("mouseup", handleMouseUp);
        rootElement.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, [editor, updateToolbar]);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    setIsStreaming(true);

    let selectedText = "";
    editor.getEditorState().read(() => {
      const current = $getSelection() || lastSelectionRef.current;
      if ($isRangeSelection(current)) {
        selectedText = current.getTextContent();
      }
    });

    try {
      const { output } = await refineTextAction(selectedText, input);

      for await (const delta of readStreamableValue(output)) {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            selection.insertText(delta as string);
          }
        });
      }
    } catch (error) {
      console.error("AI Refinement failed", error);
    } finally {
      setIsStreaming(false);
      setInput("");
      setShow(false);
      // Return focus to editor after operation
      editor.focus();
    }
  };

  if (!show) return null;

  return createPortal(
    <div
      className="fixed z-50 animate-in fade-in zoom-in-95 duration-100 ease-out"
      style={{ top: coords.top, left: coords.left }}
    >
      <div className="flex items-center bg-black border border-neutral-800 shadow-[0_8px_30px_rgb(0,0,0,0.5)] p-1 gap-2 w-[380px] group transition-all hover:border-neutral-700">
        <div
          className={`
          flex items-center justify-center w-8 h-8 border border-neutral-900 bg-neutral-950 transition-colors
          ${isStreaming ? "border-indigo-500/50" : "group-hover:border-neutral-800"}
        `}
        >
          {isStreaming ? (
            <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
          ) : (
            <Terminal className="w-4 h-4 text-neutral-500 group-hover:text-indigo-500 transition-colors" />
          )}
        </div>

        {/* CRITICAL FIX: Removed autoFocus
            The user can click here to type if they want AI.
            Otherwise, focus stays in editor for Copy/Paste/Highlighting.
        */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="// Modify selection..."
          className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono h-8 placeholder:text-neutral-600 focus:placeholder:text-neutral-500"
          disabled={isStreaming}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAskAI(e);
            if (e.key === "Escape") setShow(false);
          }}
        />

        <button
          onClick={handleAskAI}
          disabled={isStreaming || !input}
          className={`
            h-8 px-3 flex items-center justify-center transition-all duration-200
            ${
              input
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-neutral-900 text-neutral-600 cursor-not-allowed"
            }
          `}
        >
          {isStreaming ? (
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>,
    document.body,
  );
}
