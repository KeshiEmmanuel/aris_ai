import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import this

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/success";

  if (code) {
    // 1. Check if the Code Verifier cookie exists
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll().map((c) => c.name);
    const hasVerifier = allCookies.some((name) =>
      name.includes("code-verifier"),
    );

    console.log("Cookies received:", allCookies);
    console.log("Has Verifier?", hasVerifier);

    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Exchange Error:", error);
      // If the verifier is missing, we know that's the root cause
      if (!hasVerifier) {
        console.error("CRITICAL: Code Verifier cookie is missing!");
      }
    }

    if (!error) {
      // ... (Rest of your success logic)
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
