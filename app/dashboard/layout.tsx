import SideBar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <SideBar />
      {children}
    </main>
  );
};

export default DashboardLayout;
