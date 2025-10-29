"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { generateSystemPrompt, generateUserPrompt } from "./prompts";
import { CompanyContext } from "../schema";
import getUserPersona from "@/utils/actions/companies.actions";

type Return = {
  success: boolean;
  text: string;
  usage: any;
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

  try {
    const result = await generateText({
      model: google("gemini-2.0-flash"),
      system: generateSystemPrompt(currentCompany, mode),
      prompt: generateUserPrompt(description, mode),
      temperature: 0.7,
    });

    return {
      success: true,
      text: result.text,
      usage: result.usage,
      finishReason: result.finishReason,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      text: "",
      usage: 0,
      finishReason: "error",
    };
  }
}
