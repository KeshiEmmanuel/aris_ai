import SideBar from "@/components/Sidebar";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main>
      <SideBar />
      {children}
    </main>
  );
};

export default DashboardLayout;
