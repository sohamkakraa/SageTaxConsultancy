import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase env vars not configured. The site will use fallback data.'
  );
}

// Singleton instance for general use
export const supabase = createSupabaseClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Factory function for components that need a fresh client (e.g. admin panel)
export function createClient() {
  return createSupabaseClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
  );
}
