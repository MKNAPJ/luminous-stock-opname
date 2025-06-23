import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ptyufinlyvmlzgcqaseo.supabase.co'
const supabaseAnonKey = 'ISI_DENGAN_ANON_KEY_KAMU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
