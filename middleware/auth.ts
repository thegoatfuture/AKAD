import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, loading, getSession, user } = useSupabase()
  
  // Get initial session
  if (loading.value) {
    await getSession()
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/email-sent-for-verification']
  
  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  // If user is authenticated and trying to access public routes or homepage
  if (isAuthenticated.value && (publicRoutes.includes(to.path) || to.path === '/')) {
    return navigateTo('/dashboard')
  }

  // If user is authenticated but email not verified
  if (isAuthenticated.value && !user.value?.email_confirmed_at && !publicRoutes.includes(to.path)) {
    return navigateTo('/email-sent-for-verification')
  }
})