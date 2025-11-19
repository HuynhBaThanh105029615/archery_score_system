"use client";

import { useEffect, useState, ReactNode } from "react";

// Helper to read a JS-visible cookie
function getCookie(name: string) {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
}

export function AdminOnly({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const role = getCookie("role_public");
    setAllowed(role === "admin");
  }, []);

  if (!allowed) return null;
  return <>{children}</>;
}

export function RecorderOnly({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const role = getCookie("role_public");
    setAllowed(role === "admin" || role === "recorder");
  }, []);

  if (!allowed) return null;
  return <>{children}</>;
}
