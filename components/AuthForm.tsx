import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { GrGoogle } from "react-icons/gr";
import { createClient } from "@/lib/supabase/server";
import { signInWithGoogle } from "@/utils/actions/auth.actions";

const AuthForm = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main>
      <div className="max-w-[500px] mx-auto mt-20 bg-transparent backdrop-blur-2xl py-10 rounded-lg shadow-lg font-sans flex items-center justify-center flex-col">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-orange-400">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Welcome back! Please sign in to continue.
          </p>
        </div>

        <div className="mt-2">
          <form action={signInWithGoogle}>
            <Button type="submit" className="button button-secondary">
              <GrGoogle /> Continue with Google
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AuthForm;
