import { createClient } from '@supabase/supabase-js'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  const supabase = createClient(
    config.public.nuxtSupabaseUrl,
    config.public.nuxtSupabaseAnonKey
  )

  // Get initial session
  const { getSession } = useSupabase()
  getSession()

  // Provide supabase client to the app
  nuxtApp.provide('supabase', supabase)
})