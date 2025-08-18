import { db } from "@/db";

export default async function Home() {
  const user = await db.query.users.findMany();

  console.log(user);
  return (
    <div>
      <h1>Authentication</h1>
    </div>
  );
}
