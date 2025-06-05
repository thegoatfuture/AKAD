```vue
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
              <a href="#" class="font-medium text-yellow-400 hover:text-yellow-300">
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
            >
              Se connecter
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
```