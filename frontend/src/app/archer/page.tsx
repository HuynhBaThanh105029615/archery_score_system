import { getUser } from "@/src/app/_lib/auth";
import { redirect } from "next/navigation";
import { ArcherProfilePage } from "@/src/app/(user)/profile/[id]/ArcherProfilePage";

export default async function ArcherDashboard() {
  const user = await getUser();

  if (!user) redirect("/login");
  if (user.role !== "archer") redirect("/403");

  return (
    <div className="p-8">
      <ArcherProfilePage user={user} />
    </div>
  );
}