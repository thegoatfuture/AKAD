import { createClient } from '@supabase/supabase-js'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.nuxtSupabaseUrl
  const supabaseKey = config.public.nuxtSupabaseAnonKey

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })

  // Get initial session
  const { getSession } = useSupabase()
  getSession()

  // Provide supabase client to the app
  nuxtApp.provide('supabase', supabase)
})