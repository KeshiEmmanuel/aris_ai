"use client";

import { useState } from "react";
import {
  PenTool,
  Megaphone,
  LayoutTemplate,
  Mail,
  ArrowRight,
  Terminal,
  Clock,
  Archive,
} from "lucide-react";
import { Mode, ModeModal } from "@/components/editor/ai/ModeModal";
import HistoryRow from "@/components/editor/HistoryCard"; // Assuming this is your HistoryRow component
import Link from "next/link";
import { Button } from "@/components/ui/button";

// --- MODE CONFIGURATION ---
const modes: Mode[] = [
  {
    id: "product_update",
    title: "Product Update",
    description: "Turn bullet points into a professional changelog.",
    icon: Megaphone,
    color: "group-hover:text-blue-400",
    borderColor: "group-hover:border-blue-500",
  },
  {
    id: "blog_post",
    title: "Blog Post",
    description: "Write SEO-optimized articles in your brand voice.",
    icon: PenTool,
    color: "group-hover:text-orange-400",
    borderColor: "group-hover:border-orange-500",
  },
  {
    id: "landing_page",
    title: "Landing Page",
    description: "Generate hero sections and value props.",
    icon: LayoutTemplate,
    color: "group-hover:text-purple-400",
    borderColor: "group-hover:border-purple-500",
  },
  {
    id: "email_sequence",
    title: "Email Sequence",
    description: "Create nurture emails and cold outreach.",
    icon: Mail,
    color: "group-hover:text-green-400",
    borderColor: "group-hover:border-green-500",
  },
];

// --- PROPS INTERFACE ---
// This ensures the component expects data from the server page
interface DashboardClientProps {
  recentDrafts: any[]; // Replace 'any' with your specific Content type definition if you have one
  userName: string;
  usageCheck: {
    allowed: boolean;
    limits: { plan: string }; // We only strictly need the plan name for the blocker
  }; // Optional: To make the greeting dynamic
}

export default function DashboardClient({
  recentDrafts,
  userName,
  usageCheck,
}: DashboardClientProps) {
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);

  const handleClose = (open: boolean) => {
    if (!open) setSelectedMode(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-16 animate-in fade-in duration-500">
      {/* HEADER SECTION */}
      <div className="border-b border-neutral-800 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
            System_Ready
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">
          READY TO SHIP,{" "}
          <span className="text-neutral-500 uppercase">
            {userName.split(" ")[0]}
          </span>
        </h1>
        <p className="text-neutral-400 font-mono text-sm max-w-xl">
          // SELECT_PROTOCOL: Choose a workflow below to initialize the writing
          engine.
        </p>
      </div>

      {/* ACTION MODULES (The Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modes.map((mode) => (
          <div
            key={mode.id}
            onClick={() => setSelectedMode(mode)}
            className={`
              group relative flex flex-col justify-between
              bg-black border border-neutral-800 p-6
              cursor-pointer transition-all duration-300
              hover:bg-neutral-900/50 hover:shadow-2xl hover:-translate-y-1
              ${mode.borderColor}
            `}
          >
            {/* Tech Accent: Glowing Top Line */}
            <div
              className={`absolute top-0 left-0 w-full h-[1px] bg-transparent transition-colors duration-300 ${mode.borderColor.replace("border", "bg")}`}
            />

            <div>
              <div className="mb-6 flex justify-between items-start">
                <div className="p-3 bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700 transition-colors">
                  <mode.icon
                    className={`h-6 w-6 text-neutral-400 transition-colors duration-300 ${mode.color}`}
                    strokeWidth={1.5}
                  />
                </div>
                <span className="font-mono text-[10px] text-neutral-600 group-hover:text-white transition-colors uppercase">
                  v1.0
                </span>
              </div>

              <h3 className="font-bold text-lg text-white mb-2 tracking-tight">
                {mode.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-mono">
                {mode.description}
              </p>
            </div>

            <div className="mt-8 flex items-center text-xs font-bold font-mono text-neutral-500 group-hover:text-white transition-colors uppercase tracking-wider">
              Initialize{" "}
              <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* RECENT LOGS SECTION (Integrated) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-500" />
            RECENT LOGS
          </h2>

          <Link href="/history">
            <Button
              variant="ghost"
              size="sm"
              className="font-mono text-xs text-neutral-500 hover:text-white hover:bg-neutral-900"
            >
              {" VIEW_ALL_LOGS ->"}
            </Button>
          </Link>
        </div>

        <div className="border border-neutral-800 bg-black divide-y divide-neutral-800">
          {recentDrafts.length > 0 ? (
            recentDrafts.map((draft) => (
              <div
                key={draft.id}
                className="hover:bg-neutral-900/30 transition-colors duration-200"
              >
                {/* Reusing the HistoryRow component logic we built earlier */}
                <HistoryRow
                  id={draft.id}
                  mode={draft.mode}
                  input_context={draft.input_context}
                  created_at={draft.created_at}
                />
              </div>
            ))
          ) : (
            // Empty State
            <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
              <Archive className="w-8 h-8 text-neutral-800" />
              <div className="font-mono text-xs text-neutral-600 uppercase tracking-widest">
                // No_Logs_Available
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <ModeModal
        mode={selectedMode}
        isOpen={!!selectedMode}
        onClose={handleClose}
        usageCheck={usageCheck}
      />
    </div>
  );
}
