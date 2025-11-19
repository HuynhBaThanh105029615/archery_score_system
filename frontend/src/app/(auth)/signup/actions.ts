"use server";

import api from "@/src/api/axios";

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await api.post("/auth/signup", {
      email,
      password,
    });

    return {
      ok: true,
      token: res.data.access_token,
    };
  } catch (err: any) {
    return {
      error:
        err.response?.data?.detail || "Signup failed. Please try again.",
    };
  }
}
