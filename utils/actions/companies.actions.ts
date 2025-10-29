"use server";

import { createClient } from "@/lib/supabase/server";
import { userInfoSchema } from "@/lib/schema";
import z from "zod";

type UserProfile = z.infer<typeof userInfoSchema>;

export const createUserCompanyPersona = async (userPersona: UserProfile) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("user_company")
    .insert({
      user_id: user?.id,
      company_name: userPersona.companyName,
      product_description: userPersona.companyProductDescription,
      industry: userPersona.companyIndustry,
      target_audience: userPersona.targetAudienceJobTitle,
      technical_level: userPersona.targetAudienceTechnicalLevel,
      brand_voice_style: userPersona.companyVoiceTone,
      brand_voice_samples: userPersona.companyContentTemplate,
      key_benefits: userPersona.companyProductBenefits,
      differentiator: userPersona.companyKeyDifferentiator,
    })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default async function getUserPersona() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user?.id);
  const { data: company, error } = await supabase
    .from("user_company")
    .select()
    .eq("user_id", user?.id);

  if (error || !company) {
    throw new Error("persona not found");
  }
  return company[0];
}

export async function updateUserPersona(userPersona: UserProfile) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("user_company")
    .update({
      company_name: userPersona.companyName,
      product_description: userPersona.companyProductDescription,
      industry: userPersona.companyIndustry,
      target_audience: userPersona.targetAudienceJobTitle,
      technical_level: userPersona.targetAudienceTechnicalLevel,
      brand_voice_style: userPersona.companyVoiceTone,
      brand_voice_samples: userPersona.companyContentTemplate,
      key_benefits: userPersona.companyProductBenefits,
      differentiator: userPersona.companyKeyDifferentiator,
    })
    .eq("user_id", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
