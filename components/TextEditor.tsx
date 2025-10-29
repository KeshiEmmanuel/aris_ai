"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";
import {
  Code,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Save,
} from "lucide-react";
import { Toggle } from "./ui/toggle";
import { FaCopy } from "react-icons/fa";
import { Button } from "./ui/button";
import { useState } from "react";
import { updateContent } from "@/utils/actions/content.action";
import { toast } from "sonner";

interface EditorProps {
  id: string;
  content: string;
  contentTitle: string;
}

const TextEditor = ({ content, contentTitle, id }: EditorProps) => {
  const [copied, setCopied] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Markdown,
    ],
    content: content,
    contentType: "markdown",
    immediatelyRender: false,
    editable: true,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[60vh] px-8 py-6 text-gray-200 font-sans",
      },
    },
  });

  const copyToClipboard = async () => {
    if (!editor) return;

    // Get the content in your preferred format
    const htmlContent = editor.getMarkdown();
    // Or use: const markdownContent = editor.storage.markdown.getMarkdown();
    // Or use: const textContent = editor.getText();

    try {
      await navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  async function handleSave() {
    if (!editor) return;
    const content = editor.getMarkdown();

    try {
      const response = await updateContent(id, content);

      if (response) {
        toast.success("Content saved successfully");
      }
    } catch (error) {
      toast.error("Failed to save content");
    }
  }

  if (!editor) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-12">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 mb-1 bg-zinc-900/95 backdrop-blur-sm border border-zinc-800 rounded-t-xl shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-1 p-2 flex-wrap">
          <Toggle
            value="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-state={editor.isActive("bold") ? "on" : "off"}
            className="h-9 w-9 data-[state=on]:bg-zinc-700 data-[state=on]:text-white hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            value="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-state={editor.isActive("italic") ? "on" : "off"}
            className="h-9 w-9 data-[state=on]:bg-zinc-700 data-[state=on]:text-white hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            value="underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            data-state={editor.isActive("underline") ? "on" : "off"}
            className="h-9 w-9 data-[state=on]:bg-zinc-700 data-[state=on]:text-white hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Underline className="h-4 w-4" />
          </Toggle>

          <div className="w-px h-6 bg-zinc-700 mx-1" />

          <Toggle
            value="heading1"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            data-state={editor.isActive("heading", { level: 1 }) ? "on" : "off"}
            className="h-9 w-9 data-[state=on]:bg-zinc-700 data-[state=on]:text-white hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Heading1 className="h-4 w-4" />
          </Toggle>
          <Toggle
            value="heading2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            data-state={editor.isActive("heading", { level: 2 }) ? "on" : "off"}
            className="h-9 w-9 data-[state=on]:bg-zinc-700 data-[state=on]:text-white hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Heading2 className="h-4 w-4" />
          </Toggle>
          <Toggle
            value="heading3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            data-state={editor.isActive("heading", { level: 3 }) ? "on" : "off"}
            className="h-9 w-9 data-[state=on]:bg-zinc-700 data-[state=on]:text-white hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Heading3 className="h-4 w-4" />
          </Toggle>

          <div className="w-px h-6 bg-zinc-700 mx-1" />

          <Toggle
            value="list"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            data-state={editor.isActive("bulletList") ? "on" : "off"}
            className="h-9 w-9 data-[state=on]:bg-zinc-700 data-[state=on]:text-white hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle
            value="orderedList"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            data-state={editor.isActive("orderedList") ? "on" : "off"}
            className="h-9 w-9 data-[state=on]:bg-zinc-700 data-[state=on]:text-white hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>

          <div className="w-px h-6 bg-zinc-700 mx-1" />

          <Toggle
            value="code"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            data-state={editor.isActive("codeBlock") ? "on" : "off"}
            className="h-9 w-9 data-[state=on]:bg-zinc-700 data-[state=on]:text-white hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Code className="h-4 w-4" />
          </Toggle>
        </div>
        <div className="flex items-center gap-1 p-2">
          <button
            className="flex items-center gap-1 text-background rounded-xl px-3 py-1 font-sans bg-gray-100 text-sm"
            onClick={copyToClipboard}
          >
            <FaCopy size={13} className="text-background hover:text-gray-300" />{" "}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            className="flex items-center gap-1 text-background rounded-xl px-3 py-1 font-sans bg-orange-400 text-sm"
            onClick={handleSave}
          >
            <Save className="text-background" size={13} /> Save
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="bg-zinc-900 border border-zinc-800 border-t-0 rounded-b-xl shadow-xl overflow-hidden">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
