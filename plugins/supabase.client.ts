import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async () => {
  const { getSession } = useSupabase()
  
  // Get initial session on client-side load
  await getSession()
})