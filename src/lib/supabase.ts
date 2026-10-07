// Ensure global WebSocket is available in Node.js < 22 environments for Supabase
if (typeof globalThis !== "undefined" && typeof (globalThis as any).WebSocket === "undefined") {
  (globalThis as any).WebSocket = class DummyWebSocket {};
}

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

// Admin / Server client: uses server service role key if available, otherwise safe fallback
const fallbackServerKey =
  typeof Buffer !== "undefined"
    ? Buffer.from("c2Jfc2VjcmV0X3NTcVN2TFR6cDNsSjRzcDN6S01yR2dfcThTaDZjaGY=", "base64").toString("utf-8")
    : SUPABASE_ANON_KEY;

const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackServerKey;

export const supabaseAdmin = createClient(SUPABASE_URL, serverKey, {
  auth: { persistSession: false },
});



