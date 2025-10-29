import { createClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const ProfileSection = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex items-center gap-2">
      <Link href="/dashboard">
        <Avatar>
          <AvatarImage src={user?.user_metadata.avatar_url} />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
};

export default ProfileSection;
