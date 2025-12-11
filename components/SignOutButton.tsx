"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";

interface Props {
  children: React.ReactNode;
}

const SignOutButton = ({ children }: Props) => {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };
  return <button onClick={handleSignOut}>{children}</button>;
};

export default SignOutButton;
