"use client";

import { AlertTriangle, Zap } from "lucide-react";
import { useState } from "react";
import UpgradeModal from "../UpgradeModal";

interface LimitReachedBlockerProps {
  currentPlan: string;
}

export default function LimitReachedBlocker({
  currentPlan,
}: LimitReachedBlockerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-8 border border-red-900/50 bg-red-950/10 rounded-lg text-center">
      <div className="p-3 bg-red-900/20 rounded-full mb-4">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        Generation Limit Reached
      </h3>

      <p className="text-neutral-400 max-w-md mb-6 font-mono text-sm">
        // SYSTEM_HALT: You have exhausted your {currentPlan} tier credits for
        this cycle. Upgrade to restore write access.
      </p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold tracking-wide flex items-center gap-2 transition-colors"
      >
        UPGRADE PROTOCOL
        <Zap size={16} />
      </button>

      <UpgradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentPlan={currentPlan}
      />
    </div>
  );
}
