"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  TextFormatType,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  Bold,
  Italic,
  Underline,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  RotateCcw,
  RotateCw,
} from "lucide-react";

export default function FixedToolbar() {
  const [editor] = useLexicalComposerContext();

  // --- 1. TEXT FORMATTING (Bold, Italic, etc.) ---
  const formatText = (e: React.MouseEvent, format: TextFormatType) => {
    e.preventDefault(); // <--- CRITICAL: Prevents focus loss
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  // --- 2. BLOCK FORMATTING (Headings, Quotes) ---
  const formatHeading = (e: React.MouseEvent, tag: HeadingTagType) => {
    e.preventDefault();
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // This is the correct way to change a block to H1/H2 in Lexical
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };

  const formatQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  // --- 3. UNDO / REDO ---
  const handleUndo = (e: React.MouseEvent) => {
    e.preventDefault();
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const handleRedo = (e: React.MouseEvent) => {
    e.preventDefault();
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  return (
    <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md border border-neutral-800 p-1.5 rounded-lg shadow-sm">
      {/* HISTORY */}
      <div className="flex items-center gap-0.5 border-r border-neutral-800 pr-1 mr-1">
        <ToolbarBtn
          icon={<RotateCcw size={16} />}
          onClick={handleUndo}
          label="Undo"
        />
        <ToolbarBtn
          icon={<RotateCw size={16} />}
          onClick={handleRedo}
          label="Redo"
        />
      </div>

      {/* HEADINGS */}
      <div className="flex items-center gap-0.5 border-r border-neutral-800 pr-1 mr-1">
        <ToolbarBtn
          icon={<Heading1 size={16} />}
          onClick={(e) => formatHeading(e, "h1")}
          label="H1"
        />
        <ToolbarBtn
          icon={<Heading2 size={16} />}
          onClick={(e) => formatHeading(e, "h2")}
          label="H2"
        />
        <ToolbarBtn
          icon={<Heading3 size={16} />}
          onClick={(e) => formatHeading(e, "h3")}
          label="H3"
        />
      </div>

      {/* TEXT FORMATS */}
      <div className="flex items-center gap-0.5 border-r border-neutral-800 pr-1 mr-1">
        <ToolbarBtn
          icon={<Bold size={16} />}
          onClick={(e) => formatText(e, "bold")}
          label="Bold"
        />
        <ToolbarBtn
          icon={<Italic size={16} />}
          onClick={(e) => formatText(e, "italic")}
          label="Italic"
        />
        <ToolbarBtn
          icon={<Underline size={16} />}
          onClick={(e) => formatText(e, "underline")}
          label="Underline"
        />
        <ToolbarBtn
          icon={<Code size={16} />}
          onClick={(e) => formatText(e, "code")}
          label="Code"
        />
      </div>

      {/* QUOTE */}
      <ToolbarBtn
        icon={<Quote size={16} />}
        onClick={formatQuote}
        label="Quote"
      />
    </div>
  );
}

// Helper Component
function ToolbarBtn({
  icon,
  onClick,
  label,
}: {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  label: string;
}) {
  return (
    <button
      onMouseDown={onClick} // <--- CRITICAL: Using onMouseDown
      className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
      aria-label={label}
    >
      {icon}
    </button>
  );
}
