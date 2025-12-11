import { hasCompany } from "@/utils/actions/companies.actions";
import { redirect } from "next/navigation";

export default async function SuccessPage() {
  const checkCompany = await hasCompany();

  if (!checkCompany) {
    return redirect("/onboarding");
  } else {
    return redirect("/new");
  }
}
