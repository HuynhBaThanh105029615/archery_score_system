/* "use server";

import { cookies } from "next/headers.js";


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
*/

export async function getUser() {
  // In a real app, you'd check cookies or JWT here.
  // For now, just simulate logged-in vs guest.

  const loggedIn = true; // We can change this file to simulate the login state
  if (loggedIn) {
    return { 
      id: 1, 
      name: "Tuan Le",
      role: "archer", //change this attribute to the one's page you want an access
    };
  }
  return null;
}