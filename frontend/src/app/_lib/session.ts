// /src/app/_lib/session.ts
"use server";

import { cookies } from "next/headers";

export function setUserSession(user: any) {
  const cookieStore = cookies();

  cookieStore.set("role", user.role, { path: "/" });
  cookieStore.set("user_id", String(user.id), { path: "/" });
}

export function getUserSession() {
  const cookieStore = cookies();

  return {
    role: cookieStore.get("role")?.value ?? null,
    user_id: cookieStore.get("user_id")?.value ?? null,
  };
}
