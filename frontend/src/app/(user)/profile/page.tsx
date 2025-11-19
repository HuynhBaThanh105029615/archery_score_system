import { getUser } from "@/src/app/_lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) redirect("/login");

  redirect(`/profile/${user.id}`);
}