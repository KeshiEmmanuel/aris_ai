"use server";

import { google } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { CompanyContext, StyleGuide, styleGuideSchema } from "../schema";
import getUserPersona from "@/utils/actions/companies.actions";
import { PLAN_LIMITS } from "../features";
import { getCurrentUser } from "@/utils/actions/auth.actions";
import { createClient } from "../supabase/server";
import { canUserGenerate, incrementGenerationCount } from "../payments";
import {
  generateSystemPrompt,
  generateToneAnalysisPrompt,
  generateUserPrompt,
} from "./prompts";

type Return = {
  success: boolean;
  text: string;
  finishReason: string;
};

type ObjectReturn = {
  success: boolean;
  object: StyleGuide | null;
  finishedReason: string;
};

export const generateTone = async (newCompany: any): Promise<ObjectReturn> => {
  const currentCompany: CompanyContext = {
    companyName: newCompany.company_name,
    companyProductDescription: newCompany.product_description,
    companyIndustry: newCompany.industry,
    targetAudienceJobTitle: newCompany.target_audience,
    targetAudienceTechnicalLevel: newCompany.technical_level,
    companyVoiceTone: newCompany.brand_voice_style,
    companyContentTemplate: newCompany.brand_voice_samples,
    companyProductBenefits: newCompany.key_benefits,
    companyKeyDifferentiator: newCompany.differentiator,
  };
  try {
    const result = await generateObject({
      model: google("gemini-2.0-flash"),
      schema: styleGuideSchema,
      prompt: generateToneAnalysisPrompt(currentCompany),
      temperature: 0.5,
    });
    return {
      success: true,
      object: result.object,
      finishedReason: result.finishReason,
    };
  } catch (error) {
    return {
      success: false,
      object: null,
      finishedReason: "error",
    };
  }
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
    styleGuide: company.user_profile,
  };

  const user = await getCurrentUser();

  const { allowed, reason, limits } = await canUserGenerate(user?.id as string);

  if (!allowed) {
    throw new Error(`User not allowed to generate content: ${reason}`);
  }
  console.log(currentCompany);
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
