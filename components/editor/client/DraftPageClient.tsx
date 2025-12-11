"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { readStreamableValue } from "@ai-sdk/rsc";
import { generateDraftAction } from "@/lib/context/ai"; // Adjust path if needed
import NotionEditor from "@/components/editor/ai/TextEditor";

interface DraftClientProps {
  draftId: string;
  initialContent: string;
}

export default function DraftPageClient({
  draftId,
  initialContent,
}: DraftClientProps) {
  const [content, setContent] = useState<string>(initialContent || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasStarted, setHasStarted] = useState(!!initialContent);

  // FIX 1: Add this Ref to prevent React Strict Mode double-firing
  const generationStarted = useRef(false);

  useEffect(() => {
    // FIX 2: Check the ref. If we already started or have DB content, STOP.
    if (initialContent || generationStarted.current) return;

    // Lock it immediately
    generationStarted.current = true;

    const startGeneration = async () => {
      setIsGenerating(true);
      try {
        const { output } = await generateDraftAction(draftId);
        setHasStarted(true);

        for await (const delta of readStreamableValue(output)) {
          setContent((current) => current + delta);
        }
      } catch (error) {
        console.error("Generation failed", error);
      } finally {
        setIsGenerating(false);
      }
    };

    startGeneration();
  }, [draftId, initialContent]);

  if (!hasStarted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <NotionEditor
        content={content}
        draftId={draftId}
        isStreaming={isGenerating}
      />
    </div>
  );
}
