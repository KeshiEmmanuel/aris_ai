import { createClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ProfileSection = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={user?.user_metadata.avatar_url} />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfileSection;
