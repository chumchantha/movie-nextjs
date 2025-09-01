"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {} from "@/components/ui/dropdown-menu";
import { Label } from "@radix-ui/react-label";
import { Switch } from "./ui/switch";
import { Skeleton } from "./ui/skeleton";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-8 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme"
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <Label htmlFor="theme">{theme === "dark" ? "Dark" : "Light"}</Label>
    </div>
  );
};

export default ThemeToggle;
