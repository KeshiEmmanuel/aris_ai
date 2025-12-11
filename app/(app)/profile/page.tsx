import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserPlanLimits } from "@/lib/payments";
import UserProfile from "@/components/editor/UserProfile";

export default async function ProfilePage() {
  const supabase = await createClient();

  // 1. Get User
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Fetch Usage Data (Server-Side)
  const usageStats = await getUserPlanLimits(user.id);

  // 3. Pass data to Client Component
  return <UserProfile user={user} usageStats={usageStats} />;
}
