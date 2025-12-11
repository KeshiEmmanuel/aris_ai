"use client";

import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { getTimeAgo } from "@/lib/utils";
import { getDisplayData } from "@/lib/schema";

interface Props {
  id: string;
  mode: string;
  input_context: any;
  created_at: string;
}

export default function HistoryRow({
  id,
  mode,
  input_context,
  created_at,
}: Props) {
  // Extract only what matters
  const {
    title,
    subtitle,
    meta,
    icon: Icon,
  } = getDisplayData(mode, input_context);

  return (
    <Link
      href={`/draft/${id}`}
      className="grid grid-cols-[1fr_auto] md:grid-cols-[2fr_1fr_150px] gap-6 p-5 items-center group cursor-pointer"
    >
      {/* COLUMN 1: IDENTITY (Icon + Title) */}
      <div className="flex items-start gap-4 min-w-0">
        <div className="p-2.5 bg-neutral-900 border border-neutral-800 text-neutral-500 group-hover:text-indigo-400 group-hover:border-indigo-500/50 transition-colors shrink-0">
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <h2 className="font-bold text-base text-neutral-200 truncate group-hover:text-white transition-colors">
            {title}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-[10px] text-indigo-500 uppercase tracking-widest bg-indigo-500/10 px-1.5 py-0.5 rounded-sm">
              {subtitle}
            </span>
            {/* Mobile Date (Hidden on Desktop) */}
            <span className="md:hidden font-mono text-[10px] text-neutral-600">
              {getTimeAgo(created_at)}
            </span>
          </div>
        </div>
      </div>

      {/* COLUMN 2: CONTEXT META (Desktop Only) */}
      <div className="hidden md:block min-w-0">
        <p className="font-mono text-xs text-neutral-500 truncate border-l border-neutral-800 pl-4">
          {meta || "// No additional metadata"}
        </p>
      </div>

      {/* COLUMN 3: TIMESTAMP (Right Aligned) */}
      <div className="hidden md:flex items-center justify-end gap-3 text-neutral-600 group-hover:text-neutral-400 transition-colors">
        <span className="font-mono text-xs">{getTimeAgo(created_at)}</span>
        <ArrowUpRight
          size={14}
          className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 translate-x-1"
        />
      </div>
    </Link>
  );
}
