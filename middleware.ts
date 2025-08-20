import { auth } from "@/lib/auth"; // your Better Auth setup
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Full session validation
  const session = await auth.api.getSession({ headers: req.headers });

  const url = new URL(req.url);

  // Protect /dashboard/*
  if (url.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
