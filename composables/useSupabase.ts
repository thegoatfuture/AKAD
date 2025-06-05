import { ref, computed } from 'vue'

export const useSupabase = () => {
  // Only proceed if we're on the client side
  if (process.server) {
    return {
      user: ref(null),
      loading: ref(true),
      error: ref(null),
      isAuthenticated: computed(() => false),
      signUp: async () => ({ data: null, error: new Error('Cannot call Supabase methods on server side') }),
      signIn: async () => ({ data: null, error: new Error('Cannot call Supabase methods on server side') }),
      signOut: async () => ({ error: new Error('Cannot call Supabase methods on server side') }),
      getSession: async () => ({ session: null, error: new Error('Cannot call Supabase methods on server side') }),
      supabase: null
    }
  }

  const nuxtApp = useNuxtApp()
  const supabase = nuxtApp.$supabase
  
  const user = ref(null)
  const loading = ref(true)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  async function signUp(email: string, password: string) {
    try {
      if (!supabase?.auth) {
        throw new Error('Supabase client is not initialized')
      }

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
      if (!supabase?.auth) {
        throw new Error('Supabase client is not initialized')
      }

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
      if (!supabase?.auth) {
        throw new Error('Supabase client is not initialized')
      }

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
      if (!supabase?.auth) {
        throw new Error('Supabase client is not initialized')
      }

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

  // Only set up auth state listener on client side
  if (supabase?.auth) {
    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user || null
    })
  }

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