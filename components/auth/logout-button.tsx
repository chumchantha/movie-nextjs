"use client";

import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const route = useRouter();

  async function logout() {
    const { data, error } = await signOut();

    if (data?.success) {
      toast.success("Logout successfully.");
      // route.push("/login");
    } else {
      toast.error(error?.message || "Failed to logout!");
    }
  }
  return (
    <Button asChild onClick={logout} size="lg">
      <span>
        <LogOut /> Logout
      </span>
    </Button>
  );
};

export default LogoutButton;
