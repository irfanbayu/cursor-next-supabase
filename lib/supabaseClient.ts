import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for API keys table - sesuai dengan struktur di Supabase
export interface ApiKey {
  id: number;
  created_at: string;
  name: string;
  value: string;
  usage: number;
}

export interface CreateApiKeyData {
  name: string;
  value?: string;
  usage?: number;
}

export interface UpdateApiKeyData {
  name?: string;
  value?: string;
  usage?: number;
}
