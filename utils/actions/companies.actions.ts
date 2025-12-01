"use server";

import { createClient } from "@/lib/supabase/server";
import { userInfoSchema } from "@/lib/schema";
import z from "zod";
import { getCurrentUser } from "./auth.actions";
import { generateTone } from "@/lib/context/ai";
import { parseStringfy } from "@/lib/utils";

type UserProfile = z.infer<typeof userInfoSchema>;

export const createUserCompanyPersona = async (userPersona: UserProfile) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("user_company")
    .upsert(
      {
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
      },
      { onConflict: "user_id" },
    )
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
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

export const hasCompany = async () => {
  const supabase = await createClient();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("user_company")
    .select()
    .eq("user_id", user?.id);

  if (error || !data) {
    return false;
  }

  return data[0];
};

export const createUserProfile = async (
  companyRowId: string,
  generatedPersona: any,
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_company")
    .update({
      user_profile: generatedPersona,
    })
    .eq("id", companyRowId)
    .select();

  if (error || !data) {
    return false;
  }

  return data[0];
};
