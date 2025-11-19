//frontend\src\app\(user)\layout.tsx
import { getUser } from "@/src/app/_lib/auth";
import { UserHeader } from "@/src/component/userheader";
import { Header } from "../../component/header";
import "../global.css";
import { Footer } from "../../component/footer";

export default async function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await getUser(); // ✅ Server-side check
  return (
    <>
      {user ? <UserHeader /> : <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
}