export async function apiClient(url: string, options: RequestInit = {}) {
  const role = document.cookie
    .split("; ")
    .find((c) => c.startsWith("role="))
    ?.split("=")[1];

  // Example: block delete unless admin
  if (options.method === "DELETE" && role !== "admin") {
    throw new Error("Not authorized");
  }

  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (!res.ok) throw new Error("API Error");

  return res.json();
}
