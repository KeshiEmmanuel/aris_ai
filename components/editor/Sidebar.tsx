"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, User, Plus, History, Command, Terminal } from "lucide-react";
import SidebarUsage from "./SidebarUsage";

// Updated items with "Terminal" logic
const sidebarItems = [
  {
    label: "NEW DRAFT",
    href: "/new",
    icon: Plus,
  },
  {
    label: "HISTORY",
    href: "/history",
    icon: History,
  },
  {
    label: "PROFILE",
    href: "/profile",
    icon: User,
  },
  {
    label: "SETTINGS",
    href: "/settings",
    icon: Settings,
  },
];

const Sidebar = ({
  profile,
  workspace,
  usageTracker,
}: {
  profile: React.ReactNode;
  usageTracker: React.ReactNode;
  workspace: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-black transition-colors duration-300">
      {/* Workspace Switcher / Header
          Style: High contrast, sharp corners
      */}
      <div className="px-4 py-6 border-b border-neutral-800">
        <div className="group flex items-center justify-between cursor-pointer p-2 -ml-2 hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-indigo-600 flex items-center justify-center">
              <Terminal className="w-3 h-3 text-white" />
            </div>
            {/* Assuming 'workspace' is text, we wrap it to force style,
                or pass the style into the Workspace component */}
            <span className="font-bold tracking-tight text-sm text-white">
              ZENDT INC.
            </span>
          </div>
          <Command className="h-4 w-4 text-neutral-600 group-hover:text-white transition-colors" />
        </div>
      </div>

      {/* Navigation Links
          Style: Monospace, Technical, Indigo Accents
      */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        <div className="px-2 mb-4 text-[10px] font-mono tracking-widest text-neutral-600 uppercase">
          // Main_Menu
        </div>

        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-2 py-2 text-sm transition-all duration-200 border-l-2 ${
                isActive
                  ? "border-indigo-500 text-white bg-neutral-900/50" // Active: Glowing edge
                  : "border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900" // Inactive
              }`}
            >
              <Icon
                className={`h-4 w-4 transition-colors ${
                  isActive
                    ? "text-indigo-400"
                    : "text-neutral-600 group-hover:text-neutral-400"
                }`}
              />
              <span className="font-mono text-xs tracking-wide">
                {item.label}
              </span>

              {/* Optional: Add a visual indicator for active state */}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {usageTracker}
      {/* Bottom User Section
          Style: Anchored to bottom, border top
      */}
      <div className="border-t border-neutral-800 p-4">
        <div className="hover:bg-neutral-900 p-2 -ml-2 transition-colors border border-transparent hover:border-neutral-800 cursor-pointer">
          {profile}
        </div>
        <div className="mt-4 flex items-center gap-2 text-[10px] text-neutral-700 font-mono">
          <div className="w-1.5 h-1.5 bg-green-900 rounded-full"></div>
          SYSTEM ONLINE v1.0.4
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
