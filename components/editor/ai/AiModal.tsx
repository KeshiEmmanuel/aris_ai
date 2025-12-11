"use client";
import { Bot, X, Wand2, Check, Sparkles, Loader2 } from "lucide-react";

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt?: string) => void;
  prompt: string;
  setPrompt: (value: string) => void;
  isGenerating: boolean;
  selectedTextContext: string;
}

export const AIModal = ({
  isOpen,
  onClose,
  onGenerate,
  prompt,
  setPrompt,
  isGenerating,
  selectedTextContext,
}: AIModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 ring-1 ring-black/5">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold">
            <Bot size={20} />
            <span>AI Assistant</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {selectedTextContext && (
            <div className="mb-4 bg-indigo-50 border border-indigo-100 rounded-lg p-3 text-sm text-indigo-800 flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-wide text-indigo-400">
                Context (Selected Text)
              </span>
              <p className="line-clamp-2 italic opacity-80">
                "{selectedTextContext}"
              </p>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-600">Quick Actions</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <ActionButton
                disabled={isGenerating}
                onClick={() =>
                  onGenerate("Improve writing style, fix grammar.")
                }
                icon={Wand2}
                label="Polish"
              />
              <ActionButton
                disabled={isGenerating}
                onClick={() => onGenerate("Summarize this text concisely.")}
                icon={Check}
                label="Summarize"
              />
              <ActionButton
                disabled={isGenerating}
                onClick={() => onGenerate("Continue writing naturally.")}
                icon={Sparkles}
                label="Continue"
              />
            </div>

            <div className="relative mt-2">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  selectedTextContext
                    ? "How should I change this text?"
                    : "Ask the AI to write something..."
                }
                className="w-full border border-gray-200 rounded-xl p-3 h-32 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none bg-gray-50 focus:bg-white transition-colors"
              />
              {isGenerating && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-indigo-600 w-8 h-8" />
                    <span className="text-xs font-semibold text-indigo-600 animate-pulse">
                      Initializing...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onGenerate()}
              disabled={!prompt.trim() || isGenerating}
              className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ disabled, onClick, icon: Icon, label }: any) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 whitespace-nowrap"
  >
    <Icon size={14} /> {label}
  </button>
);
