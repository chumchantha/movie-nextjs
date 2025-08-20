"use client";

import LogoutButton from "@/components/auth/logout-button";
import { useSession } from "@/lib/auth-client";
import React from "react";

const ProtectedRoute = () => {
  const { data } = useSession();
  const session = data?.session;

  if (!session) {
    return (
      <div>
        <p>Unauthorized!</p>
      </div>
    );
  }
  return (
    <div>
      ProtectedRoute
      <LogoutButton />
    </div>
  );
};

export default ProtectedRoute;
