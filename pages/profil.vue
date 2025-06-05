<script setup>
import { ref, reactive } from 'vue'
import SidebarDashboard from '@/components/Sidebar-dashboard.vue'
import { useProfileState } from '@/composables/useProfile'

// Force le layout personnalisé
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const profile = useProfileState()

const successMessage = ref('')
const errorMessage = ref('')
const errors = reactive({
  name: '',
  email: '',
})

async function updateProfile() {
  successMessage.value = ''
  errorMessage.value = ''
  errors.name = ''
  errors.email = ''

  if (!profile.name) {
    errors.name = 'Nom requis'
  }
  if (!profile.email) {
    errors.email = 'Email requis'
  } else if (!/.+@.+\..+/.test(profile.email)) {
    errors.email = "Format d'email invalide"
  }

  if (errors.name || errors.email) {
    return
  }
  const { data, error } = await useFetch('/api/profile', {
    method: 'POST',
    body: profile,
  })

  if (error.value) {
    errorMessage.value = error.value.message || 'Erreur lors de la mise à jour du profil'
    return
  }

  if (data.value?.success) {
    successMessage.value = 'Profil mis à jour avec succès'
  } else {
    errorMessage.value = 'Erreur lors de la mise à jour du profil'
  }
}
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white flex">
    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Page Content -->
      <main class="p-6 space-y-10 overflow-y-auto">
        <div
          v-if="successMessage"
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          {{ successMessage }}
        </div>
        <div
          v-if="errorMessage"
          class="bg-red-500 text-white px-4 py-2 rounded"
        >
          {{ errorMessage }}
        </div>

        <!-- Informations Personnelles -->
        <div class="bg-zinc-900 text-white rounded-2xl shadow-md p-8">
          <h2 class="text-2xl font-bold text-yellow-400 mb-6">
            Informations personnelles
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block mb-1 text-sm font-medium">Nom complet</label>
              <input
                v-model="profile.name"
                type="text"
                class="w-full border border-gray-300 rounded-md px-4 py-2 bg-zinc-800 text-white"
              />
              <p v-if="errors.name" class="text-red-400 text-sm mt-1">{{ errors.name }}</p>
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium">Email</label>
              <input
                v-model="profile.email"
                type="email"
                class="w-full border border-gray-300 rounded-md px-4 py-2 bg-zinc-800 text-white"
              />
              <p v-if="errors.email" class="text-red-400 text-sm mt-1">{{ errors.email }}</p>
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium">Téléphone</label>
              <input
                v-model="profile.phone"
                type="tel"
                class="w-full border border-gray-300 rounded-md px-4 py-2 bg-zinc-800 text-white"
              />
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium">Pays</label>
              <select
                v-model="profile.country"
                class="w-full border border-gray-300 rounded-md px-4 py-2 bg-zinc-800 text-white"
              >
                <option value="">Sélectionner</option>
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Adresse -->
        <div class="bg-zinc-900 text-white rounded-2xl shadow-md p-8">
          <h2 class="text-2xl font-bold text-yellow-400 mb-6">Adresse</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block mb-1 text-sm font-medium">Adresse</label>
              <input
                v-model="profile.address"
                type="text"
                class="w-full border border-gray-300 rounded-md px-4 py-2 bg-zinc-800 text-white"
              />
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium">Code postal</label>
              <input
                v-model="profile.zip"
                type="text"
                class="w-full border border-gray-300 rounded-md px-4 py-2 bg-zinc-800 text-white"
              />
            </div>
          </div>
        </div>

        <!-- Bio -->
        <div class="bg-zinc-900 text-white rounded-2xl shadow-md p-8">
          <h2 class="text-2xl font-bold text-yellow-400 mb-6">
            À propos de vous
          </h2>
          <div>
            <label class="block mb-1 text-sm font-medium">Biographie</label>
            <textarea
              v-model="profile.bio"
              rows="4"
              class="w-full border border-gray-300 rounded-md px-4 py-2 bg-zinc-800 text-white"
            ></textarea>
          </div>
          <div class="mt-6">
            <button
              @click.prevent="updateProfile"
              class="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 transition"
            >
              Mettre à jour le profil
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
main::-webkit-scrollbar {
  width: 6px;
}
main::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}
</style>
