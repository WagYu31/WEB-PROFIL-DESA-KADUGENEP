import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://keqwbucedumpcajuytpo.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_0dA-jnth_cOfxhP12rEzrA_0xiJG2y6";

// Public client for browser & frontend
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

// Admin / Server client: uses server service role key if available, otherwise anon key
const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
export const supabaseAdmin = createClient(SUPABASE_URL, serverKey, {
  auth: { persistSession: false },
});
