import ThemeToggle from "@/components/ThemeToggle";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-[40vh]">
      <h1>Hello Hi</h1>
      <ThemeToggle />
    </div>
  );
}
