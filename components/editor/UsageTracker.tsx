"use client";

import { Zap, Lock, ChevronRight, Activity } from "lucide-react";

interface UsageTrackerProps {
  used: number;
  limit: number;
  planName: string;
  resetDate: string; // e.g. "Dec 31, 2025"
  onUpgradeClick: () => void;
}

export default function UsageTracker({
  used,
  limit,
  planName,
  resetDate,
  onUpgradeClick,
}: UsageTrackerProps) {
  // Calculate Percentage
  const percentage = Math.min(100, Math.max(0, (used / limit) * 100));

  // Status Logic
  const isCritical = percentage >= 100;
  const isWarning = percentage >= 80 && percentage < 100;

  // Dynamic Color
  const barColor = isCritical
    ? "bg-red-600"
    : isWarning
      ? "bg-yellow-500"
      : "bg-indigo-600";

  const textColor = isCritical
    ? "text-red-500"
    : isWarning
      ? "text-yellow-500"
      : "text-indigo-500";

  return (
    <div className="border border-neutral-800 bg-neutral-950/30 p-6 w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-neutral-500" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
            Resource_Monitor
          </span>
        </div>
        <div
          className={`px-2 py-0.5 border ${isCritical ? "border-red-900 bg-red-950/30" : "border-neutral-800 bg-neutral-900"} rounded-sm`}
        >
          <span
            className={`font-mono text-[10px] uppercase tracking-wider ${isCritical ? "text-red-500" : "text-neutral-400"}`}
          >
            {planName}_TIER
          </span>
        </div>
      </div>

      {/* STATS DISPLAY */}
      <div className="flex items-end gap-2 mb-3">
        <span className={`text-4xl font-bold tracking-tighter ${textColor}`}>
          {used}
        </span>
        <span className="text-xl text-neutral-600 font-light mb-1">
          / {limit}
        </span>
        <span className="text-xs font-mono text-neutral-500 mb-2 ml-auto uppercase">
          Generations Used
        </span>
      </div>

      {/* PROGRESS BAR (Industrial Style) */}
      <div className="relative h-4 w-full bg-black border border-neutral-800 mb-2 overflow-hidden">
        {/* The Fill */}
        <div
          className={`h-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${percentage}%` }}
        />

        {/* The Grid Overlay (Scanline effect) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 50%, #000 50%)`,
            backgroundSize: "4px 100%",
          }}
        />
      </div>

      {/* FOOTER INFO */}
      <div className="flex items-start justify-between mt-4">
        <div className="space-y-1">
          {isCritical ? (
            <div className="flex items-center gap-2 text-red-500">
              <Lock size={12} />
              <span className="font-mono text-[10px] uppercase tracking-wide">
                System Halted
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-neutral-500">
              <Zap size={12} />
              <span className="font-mono text-[10px] uppercase tracking-wide">
                System Nominal
              </span>
            </div>
          )}
          <p className="text-[10px] text-neutral-600 font-mono pl-5">
            Reset: {resetDate}
          </p>
        </div>

        {/* UPGRADE BUTTON */}
        <button
          onClick={onUpgradeClick}
          className={`
            group flex items-center gap-2 px-4 py-2 border transition-all duration-300
            ${
              isCritical
                ? "bg-red-600 text-white border-red-500 hover:bg-red-700"
                : "bg-transparent text-white border-neutral-700 hover:border-indigo-500 hover:text-indigo-400"
            }
          `}
        >
          <span className="font-mono text-xs font-bold uppercase tracking-widest">
            {isCritical ? "Unlock_Access" : "Increase_Limit"}
          </span>
          <ChevronRight
            size={12}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}
