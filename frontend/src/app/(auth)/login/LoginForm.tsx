// /src/app/(auth)/login/LoginForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    const result = await loginAction(payload);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Redirect by role
    if (result.role === "admin") router.push("/admin");
    else if (result.role === "recorder") router.push("/recorder");
    else router.push("/archer");
  }

  return (
    <div className="flex justify-center pt-12">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm bg-white p-6 rounded-xl shadow gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}

        <input
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          required
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
