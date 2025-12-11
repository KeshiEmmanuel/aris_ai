"use client";

import { useEffect, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { $getRoot } from "lexical";
// Nodes
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";

// Icons & UI
import FixedToolbar from "./FixedToolbar";
import FloatingToolbar from "./FloatingToobar";
import { AutoSavePlugin } from "./AutoSavePlugin";
import { Terminal, Cpu } from "lucide-react";

function MarkdownSyncPlugin({
  markdown,
  isStreaming,
  draftId,
}: {
  markdown: string;
  isStreaming: boolean;
  draftId: string;
}) {
  const [editor] = useLexicalComposerContext();
  const loadedDraftId = useRef<string | null>(null);

  useEffect(() => {
    // 1. Reset lock if the user switches to a completely new draft
    if (loadedDraftId.current !== draftId) {
      loadedDraftId.current = null;
    }

    // 2. Decide if we should sync
    // Sync if:
    // A. We are actively streaming (AI is typing)
    // B. We haven't loaded this draft ID yet AND we actually have content to load
    const isNewDraftLoad =
      loadedDraftId.current !== draftId && markdown.length > 0;
    const shouldSync = isStreaming || isNewDraftLoad;

    if (shouldSync) {
      editor.update(() => {
        // Prevent empty overwrite if we are just starting
        if (!markdown && isStreaming) return;

        $convertFromMarkdownString(markdown, TRANSFORMERS);

        // Keep cursor at the end only while streaming
        if (isStreaming) {
          const root = $getRoot();
          root.selectEnd();
        }
      });

      // 3. Mark this draft as "Loaded" so we don't overwrite user edits later
      // We only lock it if we are NOT streaming (i.e., this was a DB fetch)
      // or if the stream just finished.
      if (!isStreaming && markdown.length > 0) {
        loadedDraftId.current = draftId;
      }
    }
  }, [markdown, isStreaming, draftId, editor]);

  return null;
}

// --- ZENDT EDITOR THEME ---
const zendtTheme = {
  paragraph: "text-neutral-300 text-[16px] leading-7 mb-4 font-sans",
  heading: {
    h1: "text-4xl font-bold text-white mt-12 mb-6 tracking-tighter border-b border-neutral-800 pb-4",
    h2: "text-2xl font-bold text-white mt-8 mb-4 tracking-tight flex items-center before:content-['#'] before:mr-2 before:text-indigo-500 before:font-mono",
    h3: "text-xl font-bold text-white mt-6 mb-2 tracking-tight",
  },
  list: {
    ul: "list-disc ml-6 text-neutral-300 marker:text-indigo-500 mb-4",
    ol: "list-decimal ml-6 text-neutral-300 marker:text-indigo-500 mb-4 font-mono",
    listitem: "pl-1 my-1",
  },
  quote:
    "border-l-2 border-indigo-500 text-neutral-400 pl-6 py-2 my-6 text-lg italic bg-neutral-900/30",
  text: {
    bold: "font-bold text-white",
    italic: "italic text-neutral-400",
    underline: "underline underline-offset-4 decoration-indigo-500/50",
    code: "bg-neutral-950 text-indigo-400 px-1.5 py-0.5 text-sm font-mono border border-neutral-800",
  },
  code: "bg-black border border-neutral-800 text-neutral-300 block p-4 font-mono text-sm my-4 overflow-x-auto",
};

interface NotionEditorProps {
  draftId: string;
  content: string;
  isStreaming?: boolean;
}

export default function NotionEditor({
  draftId,
  content,
  isStreaming = false,
}: NotionEditorProps) {
  const initialConfig = {
    namespace: "ZendtEditor",
    theme: zendtTheme,
    onError: (e: Error) => console.error(e),
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      CodeHighlightNode,
      AutoLinkNode,
      LinkNode,
      HorizontalRuleNode,
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white pt-6 pb-40 px-6 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-[800px] mx-auto">
        {/* TOP META BAR */}
        <div className="flex items-center justify-between mb-12 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              <Terminal size={12} />
              <span>Session_ID: {draftId.slice(0, 8)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-green-500 uppercase tracking-widest">
            <div
              className={`w-1.5 h-1.5 bg-green-500 rounded-full ${
                isStreaming ? "animate-ping" : ""
              }`}
            />
            {isStreaming ? "Receiving_Stream..." : "Editor_Ready"}
          </div>
        </div>

        <LexicalComposer initialConfig={initialConfig}>
          {/* TOOLBAR WRAPPER */}
          <div className="sticky top-6 z-50 mb-8">
            <FixedToolbar />
          </div>

          <AutoSavePlugin id={draftId} />

          <div className="relative min-h-[500px] border-l border-neutral-900 pl-8 md:pl-12">
            {/* BACKGROUND DECORATION */}
            <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500/50 via-neutral-800 to-transparent" />

            <RichTextPlugin
              contentEditable={
                <ContentEditable className="outline-none min-h-[400px] resize-none focus:outline-none caret-indigo-500" />
              }
              placeholder={
                <div className="absolute top-0 left-12 text-neutral-700 pointer-events-none text-[16px] font-mono flex items-center gap-2">
                  <Cpu size={14} />
                  // Waiting for input...
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>

          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <HorizontalRulePlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <FloatingToolbar />

          <MarkdownSyncPlugin
            markdown={content}
            isStreaming={isStreaming}
            draftId={draftId}
          />
        </LexicalComposer>
      </div>
    </div>
  );
}
