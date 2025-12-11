"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Users,
  Package,
  Swords,
  Sparkles,
  Ban,
  MessageSquare,
  Globe,
  Mail,
  ChevronRight,
  Clock,
  Loader2,
  Save,
  Terminal,
  Cpu,
} from "lucide-react";
import getUserPersona, {
  updateUserPersona,
} from "@/utils/actions/companies.actions";

// --- COMPONENTS ---

// 1. The Key-Value Row (Technical Style)
const ConfigRow = ({
  icon,
  label,
  value,
  onChange,
  placeholder,
  isTextArea = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isTextArea?: boolean;
}) => (
  <div className="group grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 py-6 border-b border-neutral-800 items-start transition-colors hover:bg-neutral-900/30">
    {/* Label Column */}
    <div className="flex items-center gap-3 pt-2">
      <div className="p-1.5 bg-neutral-900 border border-neutral-800 text-neutral-500 group-hover:text-indigo-500 group-hover:border-indigo-500/50 transition-colors">
        {icon}
      </div>
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 group-hover:text-neutral-300 transition-colors">
        {label}
      </span>
    </div>

    {/* Input Column */}
    <div className="relative">
      {isTextArea ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={1}
          className="w-full bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-700 px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none overflow-hidden min-h-[50px]"
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = target.scrollHeight + "px";
          }}
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-700 px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
        />
      )}
    </div>
  </div>
);

// 2. The Sample Data Block
const SampleBlock = ({
  icon,
  label,
  value,
  onChange,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => (
  <div className="mb-8 border border-neutral-800 bg-black group hover:border-neutral-700 transition-colors">
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-950/50">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">
          {label}
        </span>
      </div>
      <div className="flex gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-yellow-500 transition-colors" />
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-green-500 transition-colors" />
      </div>
    </div>

    {/* Input Area */}
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-black text-neutral-300 placeholder-neutral-700 p-6 outline-none resize-none leading-relaxed text-sm font-mono min-h-[120px]"
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement;
        target.style.height = "auto";
        target.style.height = target.scrollHeight + "px";
      }}
    />
  </div>
);

export default function BrandSettings() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userProfile = await getUserPersona();
        setProfile(userProfile);
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Debounced Save
  useEffect(() => {
    if (!profile) return;
    const saveToSupabase = async () => {
      setSaving(true);
      try {
        await updateUserPersona(profile);
      } catch (err) {
        console.error("Error saving:", err);
      } finally {
        setSaving(false);
      }
    };
    const debounceTimer = setTimeout(saveToSupabase, 2000);
    return () => clearTimeout(debounceTimer);
  }, [profile]);

  const handleUpdate = (field: string, value: string) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-neutral-500">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <span className="font-mono text-xs uppercase tracking-widest animate-pulse">
          Initializing System...
        </span>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500 font-mono text-sm">
        [ERROR]: CONNECTION_REFUSED // {error}
      </div>
    );
  }

  // --- Main UI ---
  return (
    <div className="min-h-screen bg-black font-sans text-white flex justify-center selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-5xl px-6 md:px-12 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* HEADER & STATUS BAR */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800 pb-6 mb-12 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            {/* Breadcrumb & Title */}
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">
                <span>sys_config</span>
                <ChevronRight size={10} />
                <span className="text-indigo-500">brand_matrix</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
                BRAND PARAMETERS
              </h1>
            </div>

            {/* Status Indicator */}
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
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  <span className="font-mono text-xs tracking-widest uppercase">
                    System Online
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 1: CORE IDENTITY */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 text-white border-l-2 border-indigo-500 pl-4">
            <Cpu size={20} />
            <h2 className="text-xl font-bold tracking-tight">IDENTITY_CORE</h2>
          </div>

          <div className="border-t border-neutral-800">
            {/* Brand Name (Featured Input) */}
            <div className="py-8 border-b border-neutral-800">
              <label className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
                Organization Name
              </label>
              <input
                type="text"
                value={profile.brand_name}
                onChange={(e) => handleUpdate("brand_name", e.target.value)}
                placeholder="Untitled Entity"
                className="w-full bg-transparent text-4xl md:text-5xl font-bold text-white placeholder-neutral-800 outline-none border-none p-0 focus:ring-0"
              />
            </div>

            <ConfigRow
              icon={<Users size={14} className="text-indigo-500" />}
              label="User Terminology"
              value={profile.user_term}
              onChange={(val: any) => handleUpdate("user_term", val)}
              placeholder="e.g. Developers, Founders, Operators"
            />
            <ConfigRow
              icon={<Package size={14} className="text-indigo-500" />}
              label="Product Terminology"
              value={profile.product_term}
              onChange={(val: any) => handleUpdate("product_term", val)}
              placeholder="e.g. The Platform, The Engine"
            />
            <ConfigRow
              icon={<Swords size={14} className="text-indigo-500" />}
              label="The Adversary"
              value={profile.enemy}
              onChange={(val: any) => handleUpdate("enemy", val)}
              placeholder="e.g. Busywork, Legacy Software"
            />
            <ConfigRow
              icon={<Sparkles size={14} className="text-indigo-500" />}
              label="Core Value Prop"
              value={profile.core_benefit}
              onChange={(val: any) => handleUpdate("core_benefit", val)}
              placeholder="e.g. Automates 90% of manual workflows"
              isTextArea
            />
            <ConfigRow
              icon={<Ban size={14} className="text-indigo-500" />}
              label="Restricted Syntax"
              value={profile.banned_words}
              onChange={(val: any) => handleUpdate("banned_words", val)}
              placeholder="e.g. Synergize, Robust, Innovative"
              isTextArea
            />
          </div>
        </div>

        {/* SECTION 2: TRAINING DATA */}
        <div>
          <div className="flex items-end justify-between mb-8 border-l-2 border-white pl-4">
            <div className="flex items-center gap-2 text-white">
              <Terminal size={20} />
              <h2 className="text-xl font-bold tracking-tight">
                TRAINING_VECTORS
              </h2>
            </div>
            <p className="hidden md:block text-xs font-mono text-neutral-500 max-w-xs text-right">
              // Provide raw data to calibrate the neural engine's tone output.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <SampleBlock
              icon={<MessageSquare size={14} className="text-indigo-500" />}
              label="Sample: Product Update"
              value={profile.sample_update}
              onChange={(val: any) => handleUpdate("sample_update", val)}
              placeholder="// Paste a previous changelog entry here..."
            />

            <SampleBlock
              icon={<Globe size={14} className="text-indigo-500" />}
              label="Sample: Blog Intro"
              value={profile.sample_blog}
              onChange={(val: any) => handleUpdate("sample_blog", val)}
              placeholder="// Paste a high-performing blog introduction..."
            />

            <SampleBlock
              icon={<Mail size={14} className="text-indigo-500" />}
              label="Sample: Cold Outreach"
              value={profile.sample_email}
              onChange={(val: any) => handleUpdate("sample_email", val)}
              placeholder="// Paste an email that converted well..."
            />

            <SampleBlock
              icon={<FileText size={14} className="text-indigo-500" />}
              label="Sample: Landing Page"
              value={profile.sample_landing}
              onChange={(val: any) => handleUpdate("sample_landing", val)}
              placeholder="// Paste a hero section headline and subheader..."
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="h-32 flex flex-col items-center justify-center mt-12 border-t border-neutral-900">
          <span className="font-mono text-[10px] text-neutral-700 uppercase tracking-[0.2em]">
            End of Configuration
          </span>
          <div className="h-8 w-px bg-neutral-800 mt-4" />
        </div>
      </div>
    </div>
  );
}
