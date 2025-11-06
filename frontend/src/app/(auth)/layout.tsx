import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E3FFE4]">
      {/* 🔗 Simple top link to home */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Page content (login/register forms, etc.) */}
      <main className="w-full max-w-md p-6">{children}</main>
    </div>
  );
}