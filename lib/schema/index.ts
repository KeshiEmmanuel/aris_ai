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
});

export type CompanyContext = z.infer<typeof userInfoSchema>;
