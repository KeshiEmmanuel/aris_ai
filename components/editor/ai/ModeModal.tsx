"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Sparkles,
  Loader2,
  LucideIcon,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createContent } from "@/utils/actions/content.action";
import { useRouter } from "next/navigation";

// Define the Mode Interface
export interface Mode {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  borderColor: string; // Updated to match dashboard
}

interface ModeModalProps {
  mode: Mode | null;
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

// Generic type for form inputs
type FormValues = Record<string, string>;

export function ModeModal({ mode, isOpen, onClose }: ModeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // Reset form when the modal opens
  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, mode, reset]);

  if (!mode) return null;

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const content = await createContent(data, mode.id);
      router.push(`/draft/${content.id}`);
      onClose(false);
    } catch (error) {
      console.error("Error saving generation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 border border-neutral-800 bg-black shadow-2xl overflow-hidden rounded-none">
        {/* --- HEADER: TECHNICAL BAR --- */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/50">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-neutral-900 border border-neutral-800">
              <mode.icon className="w-4 h-4 text-indigo-500" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold tracking-tight text-white uppercase">
                {mode.title}
              </DialogTitle>
              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                PROTOCOL_ACTIVE
              </div>
            </div>
          </div>
        </div>

        {/* --- BODY: THE TERMINAL FORM --- */}
        <div className="p-8 bg-black">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-8">
              {/* === MODE 1: PRODUCT UPDATE === */}
              {mode.id === "product_update" && (
                <>
                  <div className="space-y-2">
                    <ZendtLabel>01 // Feature Name</ZendtLabel>
                    <ZendtInput
                      {...register("feature_name", { required: true })}
                      placeholder="e.g. Dark Mode 2.0"
                    />
                    {errors.feature_name && <ErrorMessage />}
                  </div>

                  <div className="space-y-2">
                    <ZendtLabel>
                      02 // Changelog Data (Bullet Points)
                    </ZendtLabel>
                    <ZendtTextarea
                      {...register("changes", { required: true })}
                      placeholder="- Added system preference toggle&#10;- Fixed contrast issues"
                    />
                    {errors.changes && <ErrorMessage />}
                  </div>

                  <div className="space-y-2">
                    <ZendtLabel>03 // User Benefit</ZendtLabel>
                    <ZendtInput
                      {...register("benefit")}
                      placeholder="e.g. Reduces eye strain during night ops"
                    />
                  </div>
                </>
              )}

              {/* === MODE 2: BLOG POST === */}
              {mode.id === "blog_post" && (
                <>
                  <div className="space-y-2">
                    <ZendtLabel>01 // Topic Vector</ZendtLabel>
                    <ZendtInput
                      {...register("topic", { required: true })}
                      placeholder="e.g. Why Generic AI is failing B2B"
                    />
                    {errors.topic && <ErrorMessage />}
                  </div>

                  <div className="space-y-2">
                    <ZendtLabel>02 // SEO Keywords</ZendtLabel>
                    <ZendtInput
                      {...register("keywords")}
                      placeholder="e.g. AI writing, content strategy, branding"
                    />
                  </div>

                  <div className="space-y-2">
                    <ZendtLabel>03 // Structural Outline</ZendtLabel>
                    <ZendtTextarea
                      {...register("outline", { required: true })}
                      placeholder="1. The Problem&#10;2. The Solution&#10;3. The Implementation"
                    />
                    {errors.outline && <ErrorMessage />}
                  </div>
                </>
              )}

              {/* === MODE 3: LANDING PAGE === */}
              {mode.id === "landing_page" && (
                <>
                  <div className="space-y-2">
                    <ZendtLabel>01 // Product Identifier</ZendtLabel>
                    <ZendtInput
                      {...register("product_name", { required: true })}
                      placeholder="e.g. Zendt Analytics"
                    />
                    {errors.product_name && <ErrorMessage />}
                  </div>

                  <div className="space-y-2">
                    <ZendtLabel>02 // Target Persona</ZendtLabel>
                    <ZendtInput
                      {...register("audience", { required: true })}
                      placeholder="e.g. Data Scientists at Series A startups"
                    />
                    {errors.audience && <ErrorMessage />}
                  </div>

                  <div className="space-y-2">
                    <ZendtLabel>03 // USP / Value Prop</ZendtLabel>
                    <ZendtTextarea
                      {...register("usp", { required: true })}
                      placeholder="What makes this specific feature unique compared to competitors?"
                    />
                    {errors.usp && <ErrorMessage />}
                  </div>
                </>
              )}

              {/* === MODE 4: EMAIL SEQUENCE === */}
              {mode.id === "email_sequence" && (
                <>
                  <div className="space-y-2">
                    <ZendtLabel>01 // Campaign Objective</ZendtLabel>
                    <ZendtInput
                      {...register("email_goal", { required: true })}
                      placeholder="e.g. Cold Outreach to Marketing Managers"
                    />
                    {errors.email_goal && <ErrorMessage />}
                  </div>

                  <div className="space-y-2">
                    <ZendtLabel>02 // Desired Action (CTA)</ZendtLabel>
                    <ZendtInput
                      {...register("cta", { required: true })}
                      placeholder="e.g. Book a 15-min demo"
                    />
                    {errors.cta && <ErrorMessage />}
                  </div>

                  <div className="space-y-2">
                    <ZendtLabel>03 // Contextual Data</ZendtLabel>
                    <ZendtTextarea
                      {...register("context", { required: true })}
                      placeholder="- Mention their recent funding&#10;- Introduce value prop"
                    />
                    {errors.context && <ErrorMessage />}
                  </div>
                </>
              )}
            </div>

            {/* --- FOOTER: ACTION --- */}
            <div className="mt-10">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500 rounded-none transition-all group"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2 font-mono text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    PROCESSING_REQUEST...
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full px-4">
                    <span className="font-mono text-sm tracking-widest uppercase font-bold">
                      Initialize_Generation
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// --- ZENDT UI COMPONENTS (Internal) ---

// 1. The Label: Monospace, Uppercase, Technical
function ZendtLabel({ children }: { children: React.ReactNode }) {
  return (
    <Label className="block font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-2">
      {children}
    </Label>
  );
}

// 2. The Input: Dark, Sharp, Focus Glow
const ZendtInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="flex h-12 w-full bg-neutral-950 border border-neutral-800 text-white px-4 py-2 text-sm font-mono placeholder:text-neutral-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
  />
);

// 3. The Textarea: Same style as input
const ZendtTextarea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) => (
  <textarea
    {...props}
    className="flex min-h-[120px] w-full bg-neutral-950 border border-neutral-800 text-white px-4 py-3 text-sm font-mono placeholder:text-neutral-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none leading-relaxed"
  />
);

// 4. Error State
function ErrorMessage() {
  return (
    <div className="flex items-center gap-1 mt-1">
      <div className="w-1 h-1 bg-red-500 rounded-full" />
      <span className="font-mono text-[10px] text-red-500 uppercase tracking-wide">
        Required_Field
      </span>
    </div>
  );
}
