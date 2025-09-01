"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isGooglePending, startGoogleTransition] = useTransition();
  const router = useRouter();

  function signinWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        fetchOptions: {
          onSuccess() {
            toast.success("You logged with Google that will redirect to...");
            router.push("/dashboard");
          },
          onError(error) {
            toast.error(error.error.message);
          },
        },
      });
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="gap-3 py-10 px-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Hey, Welcome
          </CardTitle>
          <CardDescription>Continue with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            disabled={isGooglePending}
            onClick={signinWithGoogle}
          >
            {isGooglePending ? "Loading..." : "Continue with Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
