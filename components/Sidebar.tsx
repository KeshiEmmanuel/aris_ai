import * as React from "react";
import ProfileSection from "./ProfileSection";
import { FaCog, FaHistory } from "react-icons/fa";
import Link from "next/link";

const SideBar = () => {
  return (
    <nav className="fixed font-sans top-4 right-0 w-20 h-full">
      <div className="pt-3 flex flex-col items-center justify-center gap-5">
        <ProfileSection />
        <Link href="/dashboard/settings">
          <FaCog className=" text-gray-400" />
        </Link>
        <Link href="/dashboard/contents">
          <FaHistory className=" text-gray-400" />
        </Link>
      </div>
    </nav>
  );
};

export default SideBar;
