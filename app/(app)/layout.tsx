import Sidebar from "@/components/editor/Sidebar";
import SidebarUsage from "@/components/editor/SidebarUsage";
import Workspace from "@/components/editor/Workspace";
import ProfileSection from "@/components/ProfileSection";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black text-white font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* Sidebar - Hidden on mobile, fixed width on desktop */}
      <aside className="hidden h-full w-64 flex-col md:flex shrink-0 border-r border-neutral-800 z-20">
        {/* Pass your components here */}
        <Sidebar
          profile={<ProfileSection />}
          workspace={<Workspace />}
          usageTracker={<SidebarUsage />}
        />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col h-full relative">
        {/* Mobile Header (Brutalist style) */}
        <header className="flex items-center justify-between border-b border-neutral-800 bg-black px-4 py-4 md:hidden">
          <span className="font-bold tracking-tight text-sm">ZENDT_MOBILE</span>
          <button className="text-neutral-500 hover:text-white font-mono text-xs uppercase">
            [MENU]
          </button>
        </header>

        {/* Scrollable Canvas */}
        <main className="flex-1 overflow-y-auto bg-black scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          {/* A grid background pattern could go here for extra texture */}
          <div className="mx-auto max-w-5xl px-8 py-12">{children}</div>
        </main>
      </div>
    </div>
  );
}
