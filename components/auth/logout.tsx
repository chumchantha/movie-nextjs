"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  async function logout() {
    setIsLoading(true);
    const { data, error } = await signOut();

    if (data?.success) {
      toast.success("Logout successfully.");
      route.push("/login");
    } else {
      toast.error(error?.message || "Failed to logout!");
    }
    setIsLoading(false);
  }
  return (
    <Button asChild disabled={isLoading} onClick={logout} size="lg">
      {isLoading ? (
        "Logout..."
      ) : (
        <span>
          <LogOut /> Logout
        </span>
      )}
    </Button>
  );
};

export default Logout;
