export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, loading, getSession } = useSupabase()
  
  // Get initial session
  if (loading.value) {
    await getSession()
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated.value && to.path !== '/login' && to.path !== '/register') {
    return navigateTo('/login')
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated.value && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/dashboard')
  }
})