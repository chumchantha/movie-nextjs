import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-[40vh]">
      <h1>Home</h1>

      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}
