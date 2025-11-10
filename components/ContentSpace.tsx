"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import { FaEdit, FaCopy } from "react-icons/fa";

const ContentSpace = ({ content, id }: { content: string; id: string }) => {
  const router = useRouter();

  async function handleEdit(id: string) {
    router.push(`/dashboard/${id}`);
    // Implement edit functionality here
  }

  return (
    <div className="text-gray-100 p-8 min-h-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold mb-4 text-white" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-3xl font-semibold mb-3 text-gray-100"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-2xl font-semibold mb-2 text-gray-200"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 leading-relaxed text-gray-300" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-white" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-inside mb-4 space-y-2 text-gray-300"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-inside mb-4 space-y-2 text-gray-300"
              {...props}
            />
          ),
          li: ({ node, ...props }) => <li className="ml-4" {...props} />,
          a: ({ node, ...props }) => (
            <a className="text-orange-400 hover:underline" {...props} />
          ),
          code: ({ node, ...props }) => (
            <code
              className="block bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      <div className="flex items-center gap-2">
        <FaEdit
          onClick={() => handleEdit(id)}
          className="text-gray-400 hover:text-gray-300"
        />
        <FaCopy className="text-gray-400 hover:text-gray-300" />
      </div>
    </div>
  );
};
export default ContentSpace;
