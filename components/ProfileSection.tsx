import { createClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/utils/actions/auth.actions";

const ProfileSection = async () => {
  const user = await getCurrentUser();
  return (
    <div className="p-2 border-t border-[#E9E9E7] dark:border-[#2f2f2f]">
      <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-[#5F5E5B] dark:text-[#9B9B9B] hover:bg-[#EFEFEF] dark:hover:bg-[#2C2C2C] transition-colors">
        <Avatar>
          <AvatarImage src={user?.user_metadata.avatar_url} alt="User Avatar" />
          <AvatarFallback>{user?.user_metadata.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <span>{user?.user_metadata.name}</span>
      </button>
    </div>
  );
};

export default ProfileSection;
