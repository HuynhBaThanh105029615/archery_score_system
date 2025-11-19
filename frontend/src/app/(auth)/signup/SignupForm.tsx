"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupAction } from "./actions";

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await signupAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    if (result?.token) {
      localStorage.setItem("access_token", result.token);
      router.push("/competitions");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-sm w-full bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Create an Account
      </h2>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          placeholder="Enter your email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          placeholder="Create a password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
}
