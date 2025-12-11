import NewPageClient from "@/components/editor/client/NewPageClient";
import { getCurrentUser } from "@/utils/actions/auth.actions";
import { getAllUserContent } from "@/utils/actions/content.action"; // The client component

export default async function DashboardPage() {
  // 1. FETCH
  const allContent = await getAllUserContent();
  const recentDrafts = allContent.slice(0, 2);
  const currentUser = await getCurrentUser();
  // 2. PASS TO CLIENT
  // The layout wraps this component automatically.
  return (
    <NewPageClient
      recentDrafts={recentDrafts}
      userName={currentUser?.user_metadata?.full_name}
    />
  );
}
