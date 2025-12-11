import DraftPageClient from "@/components/editor/client/DraftPageClient";
import { createClient } from "@/lib/supabase/server";
import { getContent } from "@/utils/actions/content.action";
import { redirect } from "next/navigation";

export default async function DraftPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const draft = await getContent(id);

  if (!draft) {
    // Handle 404 or redirect if draft completely missing
    redirect("/new");
  }

  // 2. Pass the data to the Client Component
  // If 'draft.content' is empty/null, the client will trigger generation.
  // If it has text, the client will just display it.
  return <DraftPageClient draftId={id} initialContent={draft.content || ""} />;
}
