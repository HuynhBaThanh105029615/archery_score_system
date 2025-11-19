// frontend/src/app/recorder/page.tsx
import { getUser } from "@/src/app/_lib/auth";
import { redirect } from "next/navigation";
import { RecorderProfilePage } from "@/src/app/(user)/profile/[id]/RecorderProfilePage";

export default async function RecorderDashboard() {
  const user = await getUser();

  if (!user) redirect("/login");
  if (user.role !== "recorder" && user.role !== "admin") redirect("/403");

  return (
    <div className="p-8">
      <RecorderProfilePage user={user} />
    </div>
  );
}
