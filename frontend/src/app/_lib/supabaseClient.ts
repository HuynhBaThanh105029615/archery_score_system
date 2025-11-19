// /src/app/_lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Must exist in .env
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon);
