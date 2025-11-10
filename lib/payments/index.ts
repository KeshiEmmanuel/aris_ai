import { createClient, createAdminClient } from "@/lib/supabase/server";
export const PLAN_LIMITS = {
  free_tier: 5,
  pdt_RTwTPFke4ZFFbGBv5fu7R: 50, // Replace with your actual product ID
  pdt_IM53Zh5GY97bf81MYeK3y: 80, // Replace with your actual product ID
} as const;

function getPlanName(productId: string): string {
  if (productId === "free_tier") return "Free";
  if (PLAN_LIMITS[productId as keyof typeof PLAN_LIMITS] === 50)
    return "Starter";
  if (PLAN_LIMITS[productId as keyof typeof PLAN_LIMITS] === 80) return "Pro";
  return "Unknown";
}

export async function getUserPlanLimits(userId: string) {
  const supabase = await createClient();

  // Check active subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("product_id, current_period_end")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("price_cents", { ascending: false })
    .limit(1)
    .single();

  const productId = subscription?.product_id || "free_tier";
  const limit = PLAN_LIMITS[productId as keyof typeof PLAN_LIMITS] || 5;

  // Get usage record
  let { data: usage } = await supabase
    .from("generation_usage")
    .select("*")
    .eq("user_id", userId)
    .single();

  // Create if doesn't exist
  if (!usage) {
    const supabaseService = await createAdminClient();
    const { data: newUsage } = await supabaseService
      .from("generation_usage")
      .insert({
        user_id: userId,
        product_id: productId,
        generations_used: 0,
        generations_limit: limit,
        reset_at: subscription?.current_period_end || null,
      })
      .select()
      .single();

    usage = newUsage;
  }

  // Update if product changed
  if (
    usage &&
    (usage.product_id !== productId || usage.generations_limit !== limit)
  ) {
    const supabaseService = await createAdminClient();
    await supabaseService
      .from("generation_usage")
      .update({
        product_id: productId,
        generations_limit: limit,
        reset_at: subscription?.current_period_end || null,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    const { data: updatedUsage } = await supabase
      .from("generation_usage")
      .select("*")
      .eq("user_id", userId)
      .single();

    usage = updatedUsage;
  }

  const used = usage?.generations_used || 0;
  const remaining = Math.max(0, limit - used);

  return {
    plan: getPlanName(productId),
    productId,
    limit,
    used,
    remaining,
    resetsAt: usage?.reset_at,
    hasAccess: remaining > 0,
  };
}

export async function canUserGenerate(userId: string): Promise<{
  allowed: boolean;
  reason?: string;
  limits: Awaited<ReturnType<typeof getUserPlanLimits>>;
}> {
  const limits = await getUserPlanLimits(userId);

  if (!limits.hasAccess) {
    let reason = "";
    if (limits.plan === "Free") {
      reason =
        "You have reached your free tier limit of 5 generations. Upgrade to continue.";
    } else if (limits.plan === "Starter") {
      reason =
        "You have reached your monthly limit of 50 generations. Upgrade to Pro or wait for reset.";
    } else {
      reason =
        "You have reached your monthly limit of 80 generations. It will reset on your next billing date.";
    }

    return { allowed: false, reason, limits };
  }

  return { allowed: true, limits };
}

// Simple increment - no history tracking
export async function incrementGenerationCount(userId: string) {
  const supabaseService = await createAdminClient();

  const { data: usage } = await supabaseService
    .from("generation_usage")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (usage) {
    await supabaseService
      .from("generation_usage")
      .update({
        generations_used: usage.generations_used + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);
  }
}

export async function resetGenerationCount(
  userId: string,
  newResetDate?: string,
) {
  const supabaseService = await createAdminClient();

  await supabaseService
    .from("generation_usage")
    .update({
      generations_used: 0,
      reset_at: newResetDate || null,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);
}
