"use client";

import "../app/global.css";

export function Header() {
  return (
    <header
      className="flex items-center justify-between bg-green-500 text-black px-8 py-4 shadow-md"
    >
      {/* Logo / App name */}
      <h1 className="text-lg font-semibold">ArcheryScoreHub</h1>

      {/* Navigation */}
      <nav className="flex items-center gap-8">
        <a href="/" className="hover:underline">Home</a>
        <a href="/tournaments" className="hover:underline">Tournaments</a>
        <a href="/about" className="hover:underline">About</a>

        {/* Login button */}
        <a
          href="/Login"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Login
        </a>
      </nav>
    </header>
  );
}
