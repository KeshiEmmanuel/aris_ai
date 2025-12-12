"use client";

import { useEffect, useState } from "react";
import { X, Check, Shield, Zap, Database, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";
import { toast } from "sonner"; // Assuming you use Sonner or similar
import { getCurrentUser } from "@/utils/actions/auth.actions"; // Import your auth action

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
}

// Pricing Data with REAL Product IDs
const PLANS = {
  OPERATOR: {
    id: "pdt_I1kjhHjzuY31V6OyMD0sp", // Your ACTUAL Operator ID
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
    id: "pdt_IM53Zh5GY97bf81MYeK3y", // Your ACTUAL Growth ID
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
  const [selectedTier, setSelectedTier] = useState<"OPERATOR" | "GROWTH">(
    "OPERATOR",
  );
  const [loading, setLoading] = useState(false);

  // Set default selection based on current plan
  useEffect(() => {
    if (isOpen) {
      setSelectedTier(
        currentPlan.toLowerCase() === "operator" ? "GROWTH" : "OPERATOR",
      );
    }
  }, [isOpen, currentPlan]);

  const targetPlan = PLANS[selectedTier];
  const isCurrentPlan = currentPlan.toUpperCase() === targetPlan.name;

  // --- CHECKOUT LOGIC ---
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(
        `${window.location.origin}/api/create-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_cart: [
              {
                product_id: targetPlan.id,
                quantity: 1,
              },
            ],
            customer: {
              email: currentUser?.email,
              name: currentUser?.user_metadata.full_name,
            },
            metadata: {
              user_id: currentUser?.id,
            },
            return_url: `${window.location.origin}/settings/profile`, // Redirect back to profile
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { checkout_url } = await response.json();
      window.location.href = checkout_url;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to initialize payment gateway.");
      setLoading(false);
    }
  };

  // Close on Escape
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
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl bg-black border border-neutral-800 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row overflow-hidden font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-neutral-500 hover:text-white bg-black border border-neutral-800 transition-colors"
        >
          <X size={16} />
        </button>

        {/* LEFT COLUMN: CURRENT STATUS */}
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-neutral-800 bg-neutral-950/50 p-8 flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-2">
              Current_State
            </span>
            <h3 className="text-2xl font-bold text-neutral-400 mb-6">
              {currentPlan.toUpperCase()} TIER
            </h3>
            {/* Visual constraints... */}
            <div className="space-y-4 opacity-50 grayscale text-sm">
              <div className="flex items-center gap-3">
                <Check size={14} /> <span>Current Limits Active</span>
              </div>
              <div className="flex items-center gap-3">
                <Check size={14} /> <span>Standard Queue</span>
              </div>
            </div>
          </div>
          <div className="mt-12 p-4 bg-red-950/20 border border-red-900/30">
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <Database size={14} />
              <span className="font-mono text-[10px] uppercase font-bold">
                Limit_Constraint
              </span>
            </div>
            <p className="text-xs text-red-400/80 leading-relaxed font-mono">
              Your current bandwidth is insufficient for scaling operations.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: UPGRADE TARGET */}
        <div className="flex-1 p-8 md:p-10 bg-black relative flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />

          {/* PLAN SELECTOR */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setSelectedTier("OPERATOR")}
              className={`pb-2 text-sm font-mono uppercase tracking-wider border-b-2 transition-colors ${selectedTier === "OPERATOR" ? "border-indigo-500 text-white" : "border-transparent text-neutral-600 hover:text-neutral-400"}`}
            >
              Operator_Tier
            </button>
            <button
              onClick={() => setSelectedTier("GROWTH")}
              className={`pb-2 text-sm font-mono uppercase tracking-wider border-b-2 transition-colors ${selectedTier === "GROWTH" ? "border-indigo-500 text-white" : "border-transparent text-neutral-600 hover:text-neutral-400"}`}
            >
              Growth_Tier
            </button>
          </div>

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

            {isCurrentPlan ? (
              <button
                disabled
                className="bg-neutral-900 text-neutral-500 px-8 py-4 font-bold tracking-wide flex items-center gap-3 cursor-not-allowed border border-neutral-800 font-mono text-xs"
              >
                CURRENT PLAN ACTIVE
              </button>
            ) : (
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="bg-white text-black px-8 py-4 font-bold tracking-wide hover:bg-neutral-200 transition-colors flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    INITIALIZING...
                    <Loader2
                      size={16}
                      className="text-indigo-600 animate-spin"
                    />
                  </>
                ) : (
                  <>
                    DEPLOY {selectedTier}
                    <Zap
                      size={16}
                      className="text-indigo-600 group-hover:scale-110 transition-transform"
                    />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

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
