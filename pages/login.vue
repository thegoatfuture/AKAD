<template>
  <div class="min-h-screen bg-black flex">
    <!-- Left side - Login form -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <img src="/images/logo-pf-nofond.svg" alt="Logo" class="h-16 mx-auto mb-6" />
          <h2 class="text-3xl font-extrabold text-yellow-400">
            Connexion
          </h2>
          <p class="mt-2 text-sm text-gray-400">
            Accédez à votre espace trader AKAD
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
          <div class="space-y-4">
            <div>
              <label for="email" class="sr-only">Email</label>
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                required
                class="appearance-none relative block w-full px-4 py-3 border border-zinc-700 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Adresse email"
              />
              <p v-if="emailError" class="mt-1 text-sm text-red-400">{{ emailError }}</p>
            </div>

            <div>
              <label for="password" class="sr-only">Mot de passe</label>
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                required
                class="appearance-none relative block w-full px-4 py-3 border border-zinc-700 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Mot de passe"
              />
              <p v-if="passwordError" class="mt-1 text-sm text-red-400">{{ passwordError }}</p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 accent-yellow-400"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-400">
                Se souvenir de moi
              </label>
            </div>

            <div class="text-sm">
              <NuxtLink to="/forgot-password" class="font-medium text-yellow-400 hover:text-yellow-300">
                Mot de passe oublié ?
              </NuxtLink>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Connexion en cours...</span>
              <span v-else>Se connecter</span>
            </button>
          </div>
        </form>

        <p class="mt-2 text-center text-sm text-gray-400">
          Pas encore de compte ?
          <NuxtLink to="/register" class="font-medium text-yellow-400 hover:text-yellow-300">
            Inscrivez-vous
          </NuxtLink>
        </p>
      </div>
    </div>

    <!-- Right side - Image -->
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.pexels.com/photos/7567455/pexels-photo-7567455.jpeg"
        alt="Trading background"
      />
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabase } from '@/composables/useSupabase'

const email = ref('')
const password = ref('')
const loading = ref(false)

const emailError = ref('')
const passwordError = ref('')

const { signIn } = useSupabase()

async function handleLogin() {
  // Reset errors
  emailError.value = ''
  passwordError.value = ''

  // Validate inputs
  if (!email.value) {
    emailError.value = 'Email requis'
    return
  }

  if (!/.+@.+\..+/.test(email.value)) {
    emailError.value = "Format d'email invalide"
    return
  }

  if (!password.value) {
    passwordError.value = 'Mot de passe requis'
    return
  }

  loading.value = true

  try {
    const { data, error } = await signIn(email.value, password.value)
    
    if (error) throw error

    // Redirect to dashboard on successful login
    navigateTo('/dashboard')
  } catch (error) {
    if (error.message.includes('email')) {
      emailError.value = 'Email ou mot de passe incorrect'
    } else if (error.message.includes('confirmed')) {
      emailError.value = "Veuillez confirmer votre email avant de vous connecter"
    } else {
      emailError.value = "Une erreur s'est produite lors de la connexion"
    }
  } finally {
    loading.value = false
  }
}
</script>