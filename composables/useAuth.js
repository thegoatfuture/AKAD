import { computed } from 'vue'
import { useState } from '#app'

export function useAuth() {
  const user = useState('user', () => null)

  function login(userData) {
    user.value = userData
  }

  function logout() {
    user.value = null
  }

  const isAuthenticated = computed(() => !!user.value)

  return { user, isAuthenticated, login, logout }
}
