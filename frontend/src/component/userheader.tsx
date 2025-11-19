"use client";

import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

export function UserHeader() {
  return (
    <header className="bg-green-500 text-black px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo / Title */}
      <div className="text-xl font-bold">
        <Link href="/">ArcheryScoreSystem</Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-8">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/recording" className="hover:underline">
          Recording
        </Link>
        <Link href="/competitions" className="hover:underline">
          Competitions
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>

        {/* Profile Icon */}
        <Link href="/profile">
          <FaUserCircle className="text-2xl text-purple-600 hover:text-purple-800 transition-colors" />
        </Link>
      </nav>
    </header>
  );
}
