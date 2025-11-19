"use server";

import { cookies } from "next/headers";

export async function getUser() {
  // ⬅ FIX: await cookies()
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const res = await fetch(`${API_URL}/api/v1/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return await res.json();
}
