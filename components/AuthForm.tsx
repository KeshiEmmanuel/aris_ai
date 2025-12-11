import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { signInWithGoogle } from "@/utils/actions/auth.actions";
import { Terminal, ShieldCheck, ArrowRight, Command } from "lucide-react";
import { GrGoogle } from "react-icons/gr";

const AuthForm = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/new");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 relative overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Decor: Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[400px] relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Status Bar */}
        <div className="flex items-center justify-between mb-8 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            <Terminal size={12} />
            <span>System_Access</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest">
              Secured
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">
            IDENTIFY.
          </h1>
          <p className="text-neutral-500 text-sm font-mono">
            // Please authenticate to access the workspace.
          </p>
        </div>

        {/* Auth Actions */}
        <div className="space-y-6">
          {/* PRIMARY: GOOGLE LOGIN */}
          <form action={signInWithGoogle} className="w-full group">
            <Button
              type="submit"
              variant="ghost"
              className="w-full h-14 bg-white text-black hover:bg-neutral-200 hover:text-black border border-transparent transition-all rounded-none flex items-center justify-between px-6"
            >
              <div className="flex items-center gap-3 font-bold tracking-wide">
                <GrGoogle className="text-xl" />
                <span>GOOGLE_AUTH</span>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* DIVIDER */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-800" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest">
              <span className="bg-black px-2 text-neutral-600">
                Alternative_Route
              </span>
            </div>
          </div>

          {/* SECONDARY: EMAIL (Disabled Visual) */}
          <div className="space-y-4 opacity-50 pointer-events-none grayscale">
            <div className="relative">
              <input
                type="email"
                placeholder="ENTER_EMAIL_ADDRESS..."
                className="w-full h-12 bg-neutral-950 border border-neutral-800 text-white px-4 text-xs font-mono placeholder-neutral-700 focus:outline-none rounded-none"
                disabled
              />
              <div className="absolute right-3 top-3 text-neutral-700">
                <Command size={14} />
              </div>
            </div>

            <Button
              disabled
              className="w-full h-12 bg-neutral-900 border border-neutral-800 text-neutral-500 font-mono text-xs tracking-widest uppercase rounded-none justify-start px-4"
            >
              [ Email_Link_Disabled ]
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-neutral-800 pt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-neutral-600 mb-4">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-mono uppercase tracking-widest">
              End-to-End Encrypted
            </span>
          </div>
          <p className="text-[10px] text-neutral-700 max-w-xs mx-auto leading-relaxed">
            By accessing the console, you agree to the{" "}
            <a
              href="#"
              className="text-neutral-500 hover:text-white underline decoration-neutral-800 transition-colors"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-neutral-500 hover:text-white underline decoration-neutral-800 transition-colors"
            >
              Privacy Protocols
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
};

export default AuthForm;
