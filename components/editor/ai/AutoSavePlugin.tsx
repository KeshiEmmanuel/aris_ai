"use client";

import { useEffect, useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { debounce } from "lodash"; // npm install lodash @types/lodash
import { updateContent } from "@/utils/actions/content.action";

export function AutoSavePlugin({ id }: { id: string }) {
  const [editor] = useLexicalComposerContext();

  // Create a debounced save function (waits 1000ms after last change)
  const debouncedSave = useCallback(
    debounce(async (editorState) => {
      editorState.read(async () => {
        // Convert Editor State to Markdown (or JSON if you prefer)
        const markdown = $convertToMarkdownString(TRANSFORMERS);

        // Call Server Action
        await updateContent(id, markdown);
        console.log("Auto-saved!");
      });
    }, 1000),
    [id], // Dependencies
  );

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        debouncedSave(editorState);
      }}
    />
  );
}
