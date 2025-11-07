import { getUser } from "../../../_lib/auth";
import { ArcherProfilePage } from "./ArcherProfilePage";
import { RecorderProfilePage } from "./RecorderProfilePage";
import { ManagerProfilePage } from "./ManagerProfilePage";
// import { AdminProfilePage } from "./AdminProfilePage";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) redirect("/login");

  switch (user.role) {
    case "archer":
      return <ArcherProfilePage user={user} />;
    case "manager":
      return <ManagerProfilePage user={user} />;
    case "recorder":
      return <RecorderProfilePage />;
    // case "admin":
    //   return <AdminProfilePage user={user} />;
    default:
      return <p>Invalid role</p>;
  }
}