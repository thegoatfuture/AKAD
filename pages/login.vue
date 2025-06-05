<template>
  <div class="bg-black text-white min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-lg">
      <h1 class="text-2xl font-bold text-yellow-400 mb-6 text-center">
        Connexion
      </h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="votremail@example.com"
          />
          <p v-if="emailError" class="text-red-400 text-sm mt-1">{{ emailError }}</p>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Votre mot de passe"
          />
          <p v-if="passwordError" class="text-red-400 text-sm mt-1">{{ passwordError }}</p>
        </div>
        <button
          type="submit"
          class="w-full bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500 transition"
        >
          Se connecter
        </button>
        <p v-if="errorMsg" class="text-red-500 text-sm text-center mt-2">{{ errorMsg }}</p>
      </form>
      <p class="text-center text-sm text-gray-400 mt-4">
        Pas encore de compte ?
        <NuxtLink to="/register" class="text-yellow-400 hover:underline">Inscrivez-vous</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const errorMsg = ref('')

const { login } = useAuth()

function validateEmail(value) {
  const pattern = /.+@.+\..+/
  return pattern.test(value)
}

async function handleLogin() {
  emailError.value = ''
  passwordError.value = ''
  errorMsg.value = ''

  if (!email.value) {
    emailError.value = 'Email requis'
  } else if (!validateEmail(email.value)) {
    emailError.value = "Format d'email invalide"
  }

  if (!password.value) {
    passwordError.value = 'Mot de passe requis'
  }

  if (emailError.value || passwordError.value) {
    return
  }

  try {
    await login({ email: email.value, password: password.value })
    navigateTo('/dashboard')
  } catch (e) {
    errorMsg.value = e?.data?.message || 'Erreur de connexion'
  }
}
</script>
