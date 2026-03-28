import { createClient } from '@supabase/supabase-js'

// Required Vite env vars for the browser client:
// - VITE_SUPABASE_URL
// - VITE_SUPABASE_ANON_KEY
// Only the anon key belongs in browser code. Do not expose the service_role key here.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = hasSupabaseEnv
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null
