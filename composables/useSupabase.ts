import { ref, computed } from 'vue'

export const useSupabase = () => {
  const nuxtApp = useNuxtApp()
  const supabase = nuxtApp.$supabase
  
  const user = ref(null)
  const loading = ref(true)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  async function signUp(email: string, password: string) {
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`
        }
      })
      
      if (signUpError) throw signUpError
      
      // Store email temporarily for verification page
      localStorage.setItem('pendingEmail', email)
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (signInError) throw signInError
      
      user.value = data.user
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  async function signOut() {
    try {
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError
      
      user.value = null
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  async function getSession() {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError
      
      user.value = session?.user || null
      loading.value = false
      return { session, error: null }
    } catch (err) {
      loading.value = false
      return { session: null, error: err }
    }
  }

  // Listen for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null
  })

  return {
    user,
    loading,
    error,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
    getSession,
    supabase
  }
}