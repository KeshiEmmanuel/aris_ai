import {
  LucideIcon,
  Megaphone,
  PenTool,
  LayoutTemplate,
  Mail,
  FileText,
} from "lucide-react";
import { z } from "zod";

export const userInfoSchema = z.object({
  // Identity
  brand_name: z.string().min(2, "Brand Name is required"),

  // Entities
  user_term: z.string().min(2, "What do you call them?"),
  product_term: z.string().min(2, "What is the tool called?"),

  // Stance & Grounding
  enemy: z.string().min(2, "Who is the enemy?"),
  core_benefit: z.string().min(10, "What is the main ROI?"),

  // Constraints
  banned_words: z.string().optional(),

  // Single "Best" Sample per Mode
  sample_update: z.string().optional(),
  sample_blog: z.string().optional(),
  sample_email: z.string().optional(),
  sample_landing: z.string().optional(),
});

export type CompanyContext = z.infer<typeof userInfoSchema>;

// types/content.ts (or inside your component file)

export type ContentMode =
  | "product_update"
  | "blog_post"
  | "email_sequence"
  | "landing_page";

// The shape of your DB row
export interface ContentItem {
  id: string;
  mode: ContentMode;
  input_context: any; // Raw JSON from DB
  created_at: string;
  // 'content' and 'task' might exist, but we prioritize input_context for display
}

// Helper to extract display data
export const getDisplayData = (mode: string, context: any) => {
  // Default fallback
  let data = {
    title: "Untitled Draft",
    subtitle: "Unknown Protocol",
    meta: "",
    icon: FileText,
  };

  if (!context) return data;

  switch (mode) {
    case "product_update":
      data = {
        title: context.feature_name || "Untitled Feature",
        subtitle: "PRODUCT UPDATE",
        meta: context.benefit
          ? `Benefit: ${context.benefit.substring(0, 30)}...`
          : "",
        icon: Megaphone,
      };
      break;
    case "blog_post":
      data = {
        title: context.topic || "Untitled Post",
        subtitle: "BLOG POST",
        meta: context.keywords ? `Keywords: ${context.keywords}` : "",
        icon: PenTool,
      };
      break;
    case "landing_page":
      data = {
        title: context.product_name || "Untitled Page",
        subtitle: "LANDING PAGE",
        meta: context.audience ? `Target: ${context.audience}` : "",
        icon: LayoutTemplate,
      };
      break;
    case "email_sequence":
      data = {
        title: context.email_goal || "Untitled Campaign",
        subtitle: "EMAIL SEQUENCE",
        meta: context.cta ? `Goal: ${context.cta}` : "",
        icon: Mail,
      };
      break;
  }
  return data;
};
