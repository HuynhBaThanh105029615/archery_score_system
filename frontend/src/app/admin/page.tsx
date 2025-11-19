//frontend\src\app\admin\page.tsx
import { getUser } from "@/src/app/_lib/auth";
import { redirect } from "next/navigation";
import { ManagerProfilePage } from "@/src/app/(user)/profile/[id]/ManagerProfilePage";

export default async function AdminDashboard() {
  const user = await getUser();

  if (!user) redirect("/login");

  // Admin only
  if (user.role !== "admin") redirect("/403");

  return (
    <div className="p-8">
      <ManagerProfilePage user={user} />
    </div>
  );
}
