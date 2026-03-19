import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Zap, AlertCircle, ChevronRight, Lock } from "lucide-react";
import { getUserPlanLimits } from "@/lib/payments";

export default async function SidebarUsage() {
  const supabase = await createClient();

  // 1. Get Current User
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // 2. Fetch Usage Data using the provided function
  const usage = await getUserPlanLimits(user.id);

  // 3. Calculate Percentage for Progress Bar
  const percentage = Math.min(
    100,
    Math.max(0, (usage.used / usage.limit) * 100),
  );

  // 4. Determine State (Critical vs Normal)
  const isCritical = percentage >= 100;
  const isWarning = percentage >= 80 && percentage < 100;

  return (
    <div className="border-t border-neutral-800 p-4 bg-black">
      {/* HEADER: Plan Name & Icon */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`p-1 rounded-sm border ${isCritical ? "bg-red-900/20 border-red-900" : "bg-neutral-900 border-neutral-800"}`}
          >
            {isCritical ? (
              <Lock size={12} className="text-red-500" />
            ) : (
              <Zap
                size={12}
                className={isWarning ? "text-yellow-500" : "text-indigo-500"}
              />
            )}
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-300">
            {usage.plan}_Plan
          </span>
        </div>

        {/* Usage Numbers (Monospace) */}
        <div
          className={`font-mono text-xs ${isCritical ? "text-red-500" : "text-neutral-500"}`}
        >
          {usage.used}/{usage.limit}
        </div>
      </div>

      {/* PROGRESS BAR (Industrial Style) */}
      <div className="relative h-1 w-full bg-neutral-900 border border-neutral-800 mb-4 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out ${
            isCritical
              ? "bg-red-600"
              : isWarning
                ? "bg-yellow-500"
                : "bg-indigo-600"
          }`}
          style={{ width: `${percentage}%` }}
        />
        {/* Scanline Effect overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.5)_50%,transparent_100%)] w-full opacity-20" />
      </div>

      {/* FOOTER: Upgrade Call to Action */}
      {isCritical ? (
        // STATE: LIMIT REACHED
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-[10px] text-red-400 font-mono leading-tight">
            <AlertCircle size={10} className="shrink-0 mt-0.5" />
            <span>PROTOCOL_HALTED: Monthly limit exceeded.</span>
          </div>
          <Link
            href="/settings/billing"
            className="group flex items-center justify-between w-full p-2 bg-red-950/30 border border-red-900 hover:bg-red-900/50 transition-colors"
          >
            <span className="text-xs font-bold text-red-500 uppercase tracking-wide">
              Upgrade System
            </span>
            <ChevronRight
              size={12}
              className="text-red-500 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      ) : (
        // STATE: NORMAL / WARNING
        <div className="flex justify-between items-end">
          <p className="text-[10px] text-neutral-600 font-mono max-w-[120px]">
            {usage.remaining} generations remaining in current cycle.
          </p>

          {/* Only show small upgrade text if Free Tier */}
          {usage.plan === "Free" && (
            <Link
              href="/settings/billing"
              className="text-[10px] font-bold text-indigo-500 hover:text-white uppercase tracking-wider transition-colors"
            >
              Upgrade
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
