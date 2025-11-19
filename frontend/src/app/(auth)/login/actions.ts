// /src/app/(auth)/login/actions.ts
"use server";

import { cookies } from "next/headers";
import { supabase } from "../../_lib/supabaseClient";

type LoginPayload = {
  email: string;
  password: string;
};

export async function loginAction({ email, password }: LoginPayload) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };

  const user = data.user;
  const token = data.session?.access_token;

  const role = user?.user_metadata?.role ?? "archer";

  const cookieStore = cookies();
  cookieStore.set("access_token", token || "", { path: "/" });
  cookieStore.set("user_id", user?.id || "", { path: "/" });
  cookieStore.set("role", role, { path: "/" });

  return { token, role };
}
