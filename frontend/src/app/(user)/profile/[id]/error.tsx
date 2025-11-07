"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Archer Profile Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-2">
        Something went wrong 😕
      </h2>
      <p className="text-gray-700 mb-4">We couldn't load this profile.</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
      >
        Try again
      </button>
    </div>
  );
}
