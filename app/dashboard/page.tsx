import NewPage from "@/components/NewPage";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
const NewChatPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main>
      <NewPage />
    </main>
  );
};
export default NewChatPage;
