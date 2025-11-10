"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { generateSystemPrompt, generateUserPrompt } from "./prompts";
import { CompanyContext } from "../schema";
import getUserPersona from "@/utils/actions/companies.actions";
import { PLAN_LIMITS } from "../features";
import { getCurrentUser } from "@/utils/actions/auth.actions";
import { createClient } from "../supabase/server";
import { canUserGenerate, incrementGenerationCount } from "../payments";

type Return = {
  success: boolean;
  text: string;
  finishReason: string;
};

export default async function generateContent(
  description: string,
  mode: string,
): Promise<Return> {
  const company = await getUserPersona();

  const currentCompany: CompanyContext = {
    companyName: company.company_name,
    companyProductDescription: company.product_description,
    companyIndustry: company.industry,
    targetAudienceJobTitle: company.target_audience,
    targetAudienceTechnicalLevel: company.technical_level,
    companyVoiceTone: company.brand_voice_style,
    companyContentTemplate: company.brand_voice_samples,
    companyProductBenefits: company.key_benefits,
    companyKeyDifferentiator: company.differentiator,
  };
  const supabase = await createClient();
  const user = await getCurrentUser();

  const { allowed, reason, limits } = await canUserGenerate(user?.id as string);

  if (!allowed) {
    throw new Error(`User not allowed to generate content: ${reason}`);
  }

  try {
    const result = await generateText({
      model: google("gemini-2.0-flash"),
      system: generateSystemPrompt(currentCompany, mode),
      prompt: generateUserPrompt(description, mode),
      temperature: 0.7,
    });

    await incrementGenerationCount(user?.id as string);

    // Get updated limits
    const updatedLimits = await canUserGenerate(user?.id as string);
    const log = {
      plan: updatedLimits.limits.plan,
      used: updatedLimits.limits.used,
      limit: updatedLimits.limits.limit,
      remaining: updatedLimits.limits.remaining,
    };
    console.log(log);
    return {
      success: true,
      text: result.text,
      finishReason: result.finishReason,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      text: "",
      finishReason: "error",
    };
  }
}
