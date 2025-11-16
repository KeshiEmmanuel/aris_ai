import * as React from "react";
import ProfileSection from "./ProfileSection";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { PiChatsLight } from "react-icons/pi";
import { IoDiamond } from "react-icons/io5";
import SignOutButton from "./SignOutButton";

const SideBar = () => {
  return (
    <nav className="fixed font-sans top-4 right-0 w-20 h-full">
      <div className="pt-3 flex flex-col items-center justify-center gap-5">
        <ProfileSection />
        <Link href="/dashboard/contents">
          <PiChatsLight className=" text-gray-400" />
        </Link>
        <Link href="/dashboard/settings">
          <FaCog className=" text-gray-400" />
        </Link>

        <Link href="/dashboard/pricing">
          <IoDiamond className=" text-gray-400" />
        </Link>

        <Link href="/dashboard/logout">
          <SignOutButton>
            <FaSignOutAlt className=" text-orange-400" />
          </SignOutButton>
        </Link>
      </div>
    </nav>
  );
};

export default SideBar;
