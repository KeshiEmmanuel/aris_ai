"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./auth.actions";

interface contentProps {
  id: string;
  used_mode: string;
  content: string;
}

interface getContentProps extends contentProps {
  id: string;
  mode: string;
  input_context: string;
  created_at: string;
  content: string;
}

export async function createContent(
  input_context: any,
  mode: string,
): Promise<contentProps> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("user_content")
    .insert({
      user_id: user?.id,
      mode: mode,
      input_context: input_context,
    })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data[0].id,
    used_mode: data[0].used_mode,
    content: data[0].content,
  };
}

export async function getContent(id: string): Promise<getContentProps> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_content")
    .select()
    .eq("id", id);

  if (error || !data)
    throw new Error(error?.message || "Failed to fetch Content");

  return data[0];
}
export async function getAllUserContent(): Promise<getContentProps[]> {
  const user = await getCurrentUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_content")
    .select()
    .eq("user_id", user?.id);

  if (error || !data)
    throw new Error(error?.message || "Failed to fetch Content");

  return data;
}

export async function updateContent(
  id: string,
  content: string,
): Promise<contentProps> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_content")
    .update({ content })
    .eq("id", id)
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to update Content");

  return data[0];
}

export async function deleteContent(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("user_content").delete().eq("id", id);
  revalidatePath("/dashboard/history");
  if (error) throw new Error(error?.message || "Failed to delete Content");
}
