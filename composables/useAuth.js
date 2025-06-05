import { computed, watch } from 'vue'
import { useState, useFetch, useCookie } from '#app'

export function useAuth() {
  const user = useState('user', () => null)
  const token = useState('token', () => null)
  const tokenCookie = useCookie('token')

  if (tokenCookie.value && !token.value) {
    token.value = tokenCookie.value
  }

  watch(token, (val) => {
    tokenCookie.value = val
  })

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials) {
    const { data, error } = await useFetch('/api/login', {
      method: 'POST',
      body: credentials,
    })
    if (error.value) throw error.value
    token.value = data.value.token
    user.value = data.value.user
  }

  async function logout() {
    await useFetch('/api/logout', { method: 'POST' })
    token.value = null
    user.value = null
  }

  return { user, token, isAuthenticated, login, logout }
}
