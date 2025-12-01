import { z } from "zod";

export const userInfoSchema = z.object({
  companyName: z.string().min(2).max(200),
  companyProductDescription: z.string().min(2).max(600),
  companyIndustry: z.string().min(2).max(200),
  targetAudienceJobTitle: z.string().min(2).max(1000),
  targetAudienceTechnicalLevel: z.string().min(2).max(100),
  companyContentTemplate: z
    .array(z.string().min(2).max(6000).min(1, "Content required"))
    .min(2, "Please provide at least 2 examples")
    .max(3, "Maximum 3 examples allowed"),
  companyVoiceTone: z.string().min(2).max(200),
  companyProductBenefits: z.array(z.string().min(2).max(200)),
  companyKeyDifferentiator: z.string().min(2).max(500),
  styleGuide: z.any().optional(),
});
export const styleGuideSchema = z.object({
  voice_profile_name: z
    .string()
    .describe("A short, catchy name for this voice profile"),
  system_instructions: z
    .string()
    .describe("The master instruction for the AI to adopt this persona"),
  style_rules: z.object({
    vocabulary: z.string(),
    sentence_structure: z.string(),
    formatting: z.string(),
    perspective: z.string(),
  }),
  negative_constraints: z
    .array(z.string())
    .describe("List of things the AI should explicitly avoid"),
  few_shot_examples: z
    .array(z.string())
    .describe("2 perfect sentences extracted from the samples"),
});

export type CompanyContext = z.infer<typeof userInfoSchema>;
export type StyleGuide = z.infer<typeof styleGuideSchema>;
