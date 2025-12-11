"use client";

import { useEffect, useState } from "react";
import { X, Check, Shield, Zap, Database } from "lucide-react";
import { createPortal } from "react-dom";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string; // "Free", "Operator", or "Growth"
}

// Pricing Data Source of Truth
const PLANS = {
  OPERATOR: {
    name: "OPERATOR",
    price: 29,
    generations: 50,
    features: [
      "50 Generated Content / mo",
      "All 4 Writing Modes",
      "AI Auto-Complete (Edit Mode)",
      "Priority Support",
    ],
  },
  GROWTH: {
    name: "GROWTH",
    price: 79,
    generations: 80,
    features: [
      "80 Generated Content / mo",
      "All 4 Writing Modes",
      "AI Auto-Complete (Edit Mode)",
      "Early Feature Access",
    ],
  },
};

export default function UpgradeModal({
  isOpen,
  onClose,
  currentPlan,
}: UpgradeModalProps) {
  // 1. Determine Target: If on Operator, target Growth. Otherwise target Operator.
  const initialSelection =
    currentPlan.toLowerCase() === "operator" ? "GROWTH" : "OPERATOR";
  const [selectedTier, setSelectedTier] = useState<"OPERATOR" | "GROWTH">(
    initialSelection,
  );

  const targetPlan = PLANS[selectedTier];

  // 2. Get Current Plan Details for the Left Column
  const getCurrentPlanDetails = () => {
    const planKey = currentPlan.toUpperCase();
    if (planKey === "OPERATOR") return PLANS.OPERATOR;
    if (planKey === "GROWTH") return PLANS.GROWTH;

    // Default to Free Tier details
    return {
      name: "FREE",
      generations: 5,
      features: [
        "5 Generated Content / mo",
        "Manual Editing Only",
        "Standard Queue",
      ],
    };
  };

  const currentDetails = getCurrentPlanDetails();
  const isCurrentPlan = (planName: string) =>
    currentPlan.toUpperCase() === planName;

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* MODAL WINDOW */}
      <div className="relative w-full max-w-5xl bg-black border border-neutral-800 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row overflow-hidden font-sans">
        {/* HEADER (Mobile Only Close) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-neutral-500 hover:text-white bg-black border border-neutral-800 transition-colors"
        >
          <X size={16} />
        </button>

        {/* LEFT COLUMN: CURRENT STATUS (Dynamic) */}
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-neutral-800 bg-neutral-950/50 p-8 flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-2">
              Current_State
            </span>
            <h3 className="text-2xl font-bold text-neutral-400 mb-6">
              {currentPlan.toUpperCase()} TIER
            </h3>

            <div className="space-y-4 opacity-50 grayscale text-sm">
              {/* Dynamic Feature List based on Current Plan */}
              {currentDetails.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Check size={14} /> <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DYNAMIC LIMIT CONSTRAINT BOX */}
          <div className="mt-12 p-4 bg-red-950/20 border border-red-900/30">
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <Database size={14} />
              <span className="font-mono text-[10px] uppercase font-bold">
                Hard_Limit: {currentDetails.generations}
              </span>
            </div>
            <p className="text-xs text-red-400/80 leading-relaxed font-mono">
              {currentPlan === "Free"
                ? "Free tier bandwidth exceeded. Upgrade required for continued operation."
                : "Monthly generation volume maxed out. Scale to next tier."}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: UPGRADE TARGET */}
        <div className="flex-1 p-8 md:p-10 bg-black relative flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />

          {/* PLAN SELECTOR TABS */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setSelectedTier("OPERATOR")}
              className={`pb-2 text-sm font-mono uppercase tracking-wider border-b-2 transition-colors ${
                selectedTier === "OPERATOR"
                  ? "border-indigo-500 text-white"
                  : "border-transparent text-neutral-600 hover:text-neutral-400"
              }`}
            >
              Operator_Tier
            </button>
            <button
              onClick={() => setSelectedTier("GROWTH")}
              className={`pb-2 text-sm font-mono uppercase tracking-wider border-b-2 transition-colors ${
                selectedTier === "GROWTH"
                  ? "border-indigo-500 text-white"
                  : "border-transparent text-neutral-600 hover:text-neutral-400"
              }`}
            >
              Growth_Tier
            </button>
          </div>

          {/* PLAN DETAILS */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <span className="font-mono text-[10px] text-indigo-500 uppercase tracking-widest block mb-2">
                Target_Protocol
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {targetPlan.name}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                ${targetPlan.price}
              </div>
              <div className="text-xs text-neutral-500 font-mono uppercase">
                / Month
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-12">
            {targetPlan.features.map((feature, i) => (
              <FeatureItem key={i} text={feature} active />
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-neutral-900 pt-8">
            <div className="flex items-center gap-2 text-neutral-500">
              <Shield size={14} />
              <span className="font-mono text-[10px] uppercase tracking-wider">
                Secure_Checkout
              </span>
            </div>

            {/* Dynamic Button State */}
            {isCurrentPlan(selectedTier) ? (
              <button
                disabled
                className="bg-neutral-900 text-neutral-500 px-8 py-4 font-bold tracking-wide flex items-center gap-3 cursor-not-allowed border border-neutral-800 font-mono text-xs"
              >
                CURRENT PLAN ACTIVE
              </button>
            ) : (
              <button className="bg-white text-black px-8 py-4 font-bold tracking-wide hover:bg-neutral-200 transition-colors flex items-center gap-3 group">
                DEPLOY {selectedTier}
                <Zap
                  size={16}
                  className="text-indigo-600 group-hover:scale-110 transition-transform"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// Helper for list items
function FeatureItem({
  text,
  active = false,
}: {
  text: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-3 border border-neutral-800 bg-neutral-900/20">
      <div
        className={`p-0.5 rounded-sm ${active ? "bg-indigo-900/30 text-indigo-400" : "bg-neutral-800 text-neutral-500"}`}
      >
        <Check size={12} />
      </div>
      <span
        className={`text-sm font-medium ${active ? "text-white" : "text-neutral-500"}`}
      >
        {text}
      </span>
    </div>
  );
}
