"use server";

import { createClient } from "@/lib/supabase/server";
import { userInfoSchema } from "@/lib/schema";
import z from "zod";
import { getCurrentUser } from "./auth.actions";

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
      brand_name: userPersona.brand_name,
      user_term: userPersona.user_term,
      product_term: userPersona.product_term,
      enemy: userPersona.enemy,
      core_benefit: userPersona.core_benefit,
      banned_words: userPersona.banned_words,
      sample_update: userPersona.sample_update,
      sample_blog: userPersona.sample_blog,
      sample_email: userPersona.sample_email,
      sample_landing: userPersona.sample_landing,
    })
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
      brand_name: userPersona.brand_name,
      user_term: userPersona.user_term,
      product_term: userPersona.product_term,
      enemy: userPersona.enemy,
      core_benefit: userPersona.core_benefit,
      banned_words: userPersona.banned_words,
      sample_update: userPersona.sample_update,
      sample_blog: userPersona.sample_blog,
      sample_email: userPersona.sample_email,
      sample_landing: userPersona.sample_landing,
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
