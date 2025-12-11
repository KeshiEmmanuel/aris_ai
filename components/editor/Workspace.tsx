import getUserPersona from "@/utils/actions/companies.actions";

export default async function Workspace() {
  const profile = await getUserPersona();

  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className="h-5 w-5 shrink-0 rounded-sm bg-gray-300 dark:bg-[#37352F] flex items-center justify-center text-xs font-bold text-gray-700 dark:text-[#9B9B9B]">
        {profile.brand_name.charAt(0)}
      </div>
      <span
        className="text-sm font-medium text-[#37352F] dark:text-[#E3E2E0] truncate"
        title={profile.brand_name} // Shows full name on hover
      >
        {profile.brand_name} Workspace
      </span>
    </div>
  );
}
