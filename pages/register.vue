<template>
  <div class="bg-black text-white min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-lg">
      <h1 class="text-2xl font-bold text-yellow-400 mb-6 text-center">Inscription</h1>

      <div v-if="successMessage" class="bg-green-500 text-white px-4 py-2 rounded mb-4">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="bg-red-500 text-white px-4 py-2 rounded mb-4">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
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
          S'inscrire
        </button>
      </form>

      <p class="text-center text-sm text-gray-400 mt-4">
        Déjà un compte ?
        <NuxtLink to="/login" class="text-yellow-400 hover:underline">Connectez-vous</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const successMessage = ref('')
const errorMessage = ref('')

async function handleRegister() {
  emailError.value = ''
  passwordError.value = ''
  successMessage.value = ''
  errorMessage.value = ''

  if (!email.value) {
    emailError.value = 'Email requis'
  } else if (!/.+@.+\..+/.test(email.value)) {
    emailError.value = "Format d'email invalide"
  }

  if (!password.value) {
    passwordError.value = 'Mot de passe requis'
  } else if (password.value.length < 6) {
    passwordError.value = 'Au moins 6 caractères'
  }

  if (emailError.value || passwordError.value) {
    return
  }

  const { data, error } = await useFetch('/api/register', {
    method: 'POST',
    body: { email: email.value, password: password.value },
  })

  if (error.value) {
    errorMessage.value = error.value.message || "Erreur lors de l'inscription"
    return
  }

  if (data.value?.success) {
    successMessage.value = "Inscription réussie"
  } else {
    errorMessage.value = "Erreur lors de l'inscription"
  }
}
</script>