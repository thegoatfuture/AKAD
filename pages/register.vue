<template>
  <div class="bg-black text-white min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-lg">
      <h1 class="text-2xl font-bold text-yellow-400 mb-6 text-center">Inscription</h1>
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

async function handleRegister() {
  const { data, error } = await useFetch('/api/register', {
    method: 'POST',
    body: { email: email.value, password: password.value },
  })
  if (error.value) {
    console.error(error.value)
    return
  }
  console.log('Inscription reussie', data.value)
}
</script>
