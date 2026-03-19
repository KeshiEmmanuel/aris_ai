"use client";

import { useState } from "react";
import {
  Camera,
  Mail,
  LogOut,
  User as UserIcon,
  Loader2,
  ChevronRight,
  AlertCircle,
  Shield,
  Terminal,
  Fingerprint,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js"; // Import Supabase User type
import UsageTracker from "./UsageTracker";
import UpgradeModal from "./UpgradeModal";

// Interface matching your function's return type
interface UsageStats {
  plan: string;
  productId: string;
  limit: number;
  used: number;
  remaining: number;
  resetsAt: string | null;
  hasAccess: boolean;
}

interface UserProfileProps {
  user: User;
  usageStats: UsageStats;
}

export default function UserProfile({ user, usageStats }: UserProfileProps) {
  const supabase = createClient();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // Local state for editable fields (Name)
  const [fullName, setFullName] = useState(user.user_metadata?.full_name || "");
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Format the Date to look "Technical" (YYYY-MM-DD)
  const formattedResetDate = usageStats.resetsAt
    ? new Date(usageStats.resetsAt).toISOString().split("T")[0]
    : "N/A";

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  const handleNameUpdate = async (value: string) => {
    setFullName(value);
    setSaving(true);
    try {
      // Supabase Update Logic
      const { error } = await supabase.auth.updateUser({
        data: { full_name: value },
      });
      if (error) throw error;

      router.refresh(); // Refresh server data
      setTimeout(() => setSaving(false), 800);
    } catch (err) {
      console.error("Error saving name:", err);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white flex justify-center selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-4xl px-6 md:px-12 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* HEADER BAR */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800 pb-6 mb-12 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">
                <span>sys_config</span>
                <ChevronRight size={10} />
                <span className="text-indigo-500">user_profile</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
                OPERATOR ID
              </h1>
            </div>

            {/* Status Badge */}
            <div
              className={`
              flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300
              ${
                saving
                  ? "bg-neutral-900 border-indigo-500/50 text-indigo-400"
                  : "bg-neutral-950 border-neutral-800 text-neutral-500"
              }
            `}
            >
              {saving ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span className="font-mono text-xs tracking-widest uppercase">
                    Syncing...
                  </span>
                </>
              ) : (
                <>
                  <Shield size={14} className="text-green-500" />
                  <span className="font-mono text-xs tracking-widest uppercase text-green-500">
                    Verified
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* IDENTITY CARD */}
        <div className="mb-16 border border-neutral-800 bg-neutral-950/30">
          <div className="h-2 bg-neutral-900 w-full border-b border-neutral-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-indigo-500/50" />
          </div>

          <div className="p-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="relative group shrink-0">
              <div className="w-32 h-32 bg-black border border-neutral-800 flex items-center justify-center overflow-hidden relative">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Avatar"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <UserIcon size={48} className="text-neutral-700" />
                )}

                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-indigo-500">
                  <Camera size={20} className="text-indigo-500 mb-2" />
                  <span className="text-[10px] font-mono uppercase text-white tracking-widest">
                    Update_Img
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-neutral-600">
                <Fingerprint size={12} />
                <span>ID: {user.id.slice(0, 8)}...</span>
              </div>
            </div>

            <div className="flex-1 w-full pt-2">
              <label className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
                Display Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => handleNameUpdate(e.target.value)}
                  placeholder="Enter Operator Name"
                  className="w-full bg-transparent text-4xl font-bold text-white placeholder-neutral-800 border-b border-neutral-800 focus:border-indigo-500 outline-none py-2 transition-all"
                />
                <div className="absolute right-0 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Terminal size={16} className="text-neutral-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- USAGE TRACKING SECTION (Connected to Real Data) --- */}
        <div className="mb-16">
          <label className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 block flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-sm"></span>
            System Consumption
          </label>

          <UsageTracker
            used={usageStats.used}
            limit={usageStats.limit}
            planName={usageStats.plan.toUpperCase()}
            resetDate={formattedResetDate}
            onUpgradeClick={() => setIsUpgradeModalOpen(true)}
          />
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <label className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
              Primary Contact
            </label>
            <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 px-4 py-4 group hover:border-neutral-700 transition-colors">
              <Mail
                size={16}
                className="text-neutral-500 group-hover:text-white transition-colors"
              />
              <span className="text-sm font-mono text-neutral-300">
                {user.email}
              </span>
              <div className="ml-auto px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] font-mono uppercase text-neutral-500">
                Locked
              </div>
            </div>
          </div>

          <div>
            <label className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
              Access Level
            </label>
            <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 px-4 py-4">
              <Shield size={16} className="text-indigo-500" />
              <span className="text-sm font-mono text-neutral-300">
                {usageStats.plan.toUpperCase()} OPERATOR
              </span>
            </div>
          </div>
        </div>

        {/* LOGOUT */}
        <div className="border-t border-neutral-800 pt-8">
          <h3 className="text-xs font-bold font-mono text-red-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <AlertCircle size={12} />
            Session Control
          </h3>

          <button
            onClick={handleSignOut}
            className="group flex items-center justify-between w-full p-4 border border-neutral-800 hover:border-red-900 hover:bg-red-950/10 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-neutral-900 group-hover:bg-red-900/20 rounded-sm transition-colors">
                <LogOut
                  size={16}
                  className="text-neutral-500 group-hover:text-red-500"
                />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-neutral-300 group-hover:text-red-400">
                  Terminate Session
                </span>
                <span className="block text-xs text-neutral-600 font-mono mt-1">
                  Securely log out of Zendt Console
                </span>
              </div>
            </div>
            <ChevronRight
              size={16}
              className="text-neutral-700 group-hover:text-red-500 transition-colors"
            />
          </button>
        </div>

        {/* UPGRADE MODAL */}
        <UpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          currentPlan={usageStats.plan}
        />
      </div>
    </div>
  );
}
