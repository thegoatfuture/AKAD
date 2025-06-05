```vue
<template>
  <div class="min-h-screen bg-black flex">
    <!-- Left side - Registration form -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <img src="/images/logo-pf-nofond.svg" alt="Logo" class="h-16 mx-auto mb-6" />
          <h2 class="text-3xl font-extrabold text-yellow-400">
            Créer un compte
          </h2>
          <p class="mt-2 text-sm text-gray-400">
            Rejoignez la communauté AKAD Trading
          </p>
        </div>

        <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
          <div class="space-y-4">
            <div>
              <label for="name" class="sr-only">Nom complet</label>
              <input
                v-model="name"
                id="name"
                name="name"
                type="text"
                required
                class="appearance-none relative block w-full px-4 py-3 border border-zinc-700 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Nom complet"
              />
              <p v-if="nameError" class="mt-1 text-sm text-red-400">{{ nameError }}</p>
            </div>

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

            <div>
              <label for="confirmPassword" class="sr-only">Confirmer le mot de passe</label>
              <input
                v-model="confirmPassword"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                class="appearance-none relative block w-full px-4 py-3 border border-zinc-700 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Confirmer le mot de passe"
              />
              <p v-if="confirmPasswordError" class="mt-1 text-sm text-red-400">{{ confirmPasswordError }}</p>
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              class="h-4 w-4 accent-yellow-400"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-400">
              J'accepte les
              <NuxtLink to="/legal/cgu" class="text-yellow-400 hover:text-yellow-300">conditions d'utilisation</NuxtLink>
              et la
              <NuxtLink to="/legal/rgpd" class="text-yellow-400 hover:text-yellow-300">politique de confidentialité</NuxtLink>
            </label>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
            >
              Créer mon compte
            </button>
          </div>
        </form>

        <p class="mt-2 text-center text-sm text-gray-400">
          Déjà un compte ?
          <NuxtLink to="/login" class="font-medium text-yellow-400 hover:text-yellow-300">
            Connectez-vous
          </NuxtLink>
        </p>
      </div>
    </div>

    <!-- Right side - Image -->
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.pexels.com/photos/7567436/pexels-photo-7567436.jpeg"
        alt="Trading background"
      />
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const nameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const successMessage = ref('')
const errorMessage = ref('')

async function handleRegister() {
  // Reset errors
  nameError.value = ''
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  successMessage.value = ''
  errorMessage.value = ''

  // Validate inputs
  if (!name.value) {
    nameError.value = 'Nom requis'
  }

  if (!email.value) {
    emailError.value = 'Email requis'
  } else if (!/.+@.+\..+/.test(email.value)) {
    emailError.value = "Format d'email invalide"
  }

  if (!password.value) {
    passwordError.value = 'Mot de passe requis'
  } else if (password.value.length < 6) {
    passwordError.value = 'Le mot de passe doit contenir au moins 6 caractères'
  }

  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Les mots de passe ne correspondent pas'
  }

  if (nameError.value || emailError.value || passwordError.value || confirmPasswordError.value) {
    return
  }

  try {
    const { data, error } = await useFetch('/api/register', {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        password: password.value
      }
    })

    if (error.value) {
      errorMessage.value = error.value.message || "Erreur lors de l'inscription"
      return
    }

    if (data.value?.success) {
      successMessage.value = "Inscription réussie"
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigateTo('/login')
      }, 1500)
    } else {
      errorMessage.value = "Erreur lors de l'inscription"
    }
  } catch (e) {
    errorMessage.value = "Une erreur est survenue"
  }
}
</script>
```