"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Loader2,
  Smile,
  Zap,
  Ban,
  Users,
  Target,
  Building,
  Megaphone,
  PenTool,
  Mail,
  LayoutTemplate,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { userInfoSchema } from "@/lib/schema";
import { createUserCompanyPersona } from "@/utils/actions/companies.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// --- 1. The Engineering Schema ---

export default function BrandOnboarding() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      brand_name: "",
      user_term: "",
      product_term: "",
      enemy: "",
      core_benefit: "",
      banned_words: "delve, tapestry, landscape, elevate, game-changer, unlock",
      sample_update: "",
      sample_blog: "",
      sample_email: "",
      sample_landing: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userInfoSchema>) {
    setIsSubmitting(true);
    try {
      const brandPersona = await createUserCompanyPersona(values);
      setIsSubmitting(false);
      toast.success("Brand Persona created successfully!");
      router.push("/new");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Brand Persona");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center bg-white dark:bg-[#191919] font-sans text-[#37352F] dark:text-[#D4D4D4]">
      {/* Container */}
      <div className="w-full max-w-[900px] px-12 py-20 md:py-28">
        {/* --- PAGE HEADER --- */}
        <div className="group relative mb-12">
          <div className="mb-6 flex items-center gap-4">
            <div className="text-7xl cursor-default">🧬</div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-2 text-[#37352F] dark:text-[#E3E2E0]">
            Brand DNA
          </h1>

          <div className="flex items-center gap-2 text-[#9B9A97] text-sm">
            <span>System prompt configuration.</span>
          </div>
        </div>

        {/* --- THE FORM --- */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            {/* SECTION 1: IDENTITY */}
            <SectionHeader title="Identity" />
            <NotionRow
              icon={<Building className="w-4 h-4" />}
              label="Brand Name"
              description="The name of your company."
            >
              <Input
                {...form.register("brand_name")}
                placeholder="e.g. Zendt"
                className="notion-input font-semibold"
              />
            </NotionRow>

            <NotionRow
              icon={<Users className="w-4 h-4" />}
              label="User Term"
              description="What do you call your customers?"
            >
              <Input
                {...form.register("user_term")}
                placeholder="e.g. Builders, Creators, Members"
                className="notion-input"
              />
            </NotionRow>

            <NotionRow
              icon={<Zap className="w-4 h-4" />}
              label="Product Term"
              description="What do you call your tool?"
            >
              <Input
                {...form.register("product_term")}
                placeholder="e.g. Platform, Engine, Toolkit"
                className="notion-input"
              />
            </NotionRow>

            {/* SECTION 2: STANCE */}
            <SectionHeader title="Stance & ROI" className="mt-12" />
            <NotionRow
              icon={<Target className="w-4 h-4" />}
              label="The Enemy"
              description="Status quo you are disrupting."
            >
              <Input
                {...form.register("enemy")}
                placeholder="e.g. Excel Spreadsheets, Expensive Agencies"
                className="notion-input"
              />
            </NotionRow>

            <NotionRow
              icon={<Smile className="w-4 h-4" />}
              label="Core Benefit"
              description="The primary outcome/ROI."
            >
              <Textarea
                {...form.register("core_benefit")}
                placeholder="e.g. We save developers 10 hours a week on debugging."
                className="notion-textarea"
              />
            </NotionRow>

            {/* SECTION 3: CONSTRAINTS */}
            <SectionHeader title="Constraints" className="mt-12" />
            <NotionRow
              icon={<Ban className="w-4 h-4 text-red-400" />}
              label="Banned Words"
              description="Words the AI should never use."
            >
              <Textarea
                {...form.register("banned_words")}
                className="notion-textarea text-red-600/80"
              />
            </NotionRow>

            {/* SECTION 4: TRAINING DATA (SINGLE SAMPLES) */}
            <SectionHeader title="One-Shot Training" className="mt-12 mb-6" />
            <p className="text-sm text-[#9B9A97] mb-8 -mt-4">
              Paste your absolute best example for each mode.
            </p>

            {/* Mode 1: Product Update */}
            <NotionRow
              icon={<Megaphone className="w-4 h-4 text-blue-500" />}
              label="Product Update"
              description="Paste your best changelog."
            >
              <Textarea
                {...form.register("sample_update")}
                placeholder="Paste text here..."
                className="notion-textarea min-h-[80px]"
              />
            </NotionRow>

            {/* Mode 2: Blog Post */}
            <NotionRow
              icon={<PenTool className="w-4 h-4 text-orange-500" />}
              label="Blog Post"
              description="Paste a paragraph from your best article."
            >
              <Textarea
                {...form.register("sample_blog")}
                placeholder="Paste text here..."
                className="notion-textarea min-h-[80px]"
              />
            </NotionRow>

            {/* Mode 3: Email */}
            <NotionRow
              icon={<Mail className="w-4 h-4 text-green-500" />}
              label="Email"
              description="Paste a high-converting email."
            >
              <Textarea
                {...form.register("sample_email")}
                placeholder="Paste text here..."
                className="notion-textarea min-h-[80px]"
              />
            </NotionRow>

            {/* Mode 4: Landing Page */}
            <NotionRow
              icon={<LayoutTemplate className="w-4 h-4 text-purple-500" />}
              label="Landing Page"
              description="Paste a Hero section headline/copy."
            >
              <Textarea
                {...form.register("sample_landing")}
                placeholder="Paste text here..."
                className="notion-textarea min-h-[80px]"
              />
            </NotionRow>

            {/* ACTION AREA */}
            <div className="mt-20 pt-8 border-t border-[#E9E9E7] dark:border-[#2F2F2F]">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 h-10 px-6 font-medium rounded-sm"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save Context"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* --- CSS OVERRIDES --- */}
      <style jsx global>{`
        .notion-input {
          border: none;
          background: transparent;
          padding: 0;
          height: auto;
          font-size: 15px;
          color: inherit;
          box-shadow: none !important;
        }
        .notion-input:focus {
          outline: none;
          background: #e9e9e780;
          padding: 4px 8px;
          margin: -4px -8px;
          border-radius: 4px;
        }
        .notion-textarea {
          border: none;
          background: transparent;
          padding: 0;
          font-size: 15px;
          color: inherit;
          resize: none;
          min-height: 24px;
          box-shadow: none !important;
        }
        .notion-textarea:focus {
          outline: none;
          background: #e9e9e780;
          padding: 6px 8px;
          margin: -6px -8px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SectionHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h3
      className={`text-xl font-semibold mb-4 text-[#37352F] dark:text-[#E3E2E0] ${className}`}
    >
      {title}
    </h3>
  );
}

function NotionRow({
  icon,
  label,
  description,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 py-2 group">
      <div className="w-[180px] flex-shrink-0 flex items-center gap-2 pt-1">
        <div className="text-[#9B9A97] group-hover:text-[#37352F] dark:group-hover:text-[#D4D4D4] transition-colors">
          {icon}
        </div>
        <span className="text-[#9B9A97] text-sm truncate" title={description}>
          {label}
        </span>
      </div>
      <div className="flex-grow min-w-0 pt-1">{children}</div>
    </div>
  );
}
