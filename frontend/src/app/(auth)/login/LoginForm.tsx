"use client";

import { useFormStatus } from "react-dom";

export function LoginForm() {
  return (
    <div>
      <form className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="text-center text-2xl font-semibold text-gray-800">Login</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="Enter your email"
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="mt-2 rounded-lg bg-blue-600 py-2 text-white font-semibold transition-all hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}