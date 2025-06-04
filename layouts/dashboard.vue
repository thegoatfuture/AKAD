<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref({
  name: 'TEST123',
  email: 'mathis@example.com',
  avatar: 'F',
  points: 0
})

const showProfilePanel = ref(false)

function toggleProfilePanel() {
  showProfilePanel.value = !showProfilePanel.value
}
function goTo(path) {
  showProfilePanel.value = false
  router.push(path)
}

const menuItems = [
  { name: 'Aperçu des Comptes', to: '/dashboard' },
  { name: 'Premium', to: '/premium' },
  { name: 'Profil', to: '/profil' },
  { name: 'AKAD Traders', to: '/traders' },
  { name: 'AKAD Academy', to: '/academy' },
  { name: 'Facturation', to: '/facturation', badge: 5 },
  { name: 'Leaderboard', to: '/leaderboard' },
  { name: 'Certificats', to: '/certificats' },
  { name: 'Téléchargements', to: '/telechargement' },
]
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white flex">
    <div class="flex-1 flex flex-col">
      <!-- HEADER -->
      <header class="flex justify-between items-center px-6 py-4 bg-zinc-900 border-b border-zinc-800 relative">
        <div class="flex items-center gap-3">
          <img src="/images/logo-pf.png" alt="Logo AKAD" class="h-12 w-auto" />
        </div>

        <div class="flex items-center gap-4 cursor-pointer" @click="toggleProfilePanel">
          <span class="font-semibold hover:underline">
            {{ user?.name || 'Utilisateur' }}
          </span>
          <div class="bg-blue-200 text-blue-700 rounded-full h-10 w-10 flex items-center justify-center font-bold">
            {{ user?.avatar || 'U' }}
          </div>
          <div class="relative">
            <svg class="w-6 h-6" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute -top-2 -right-2 bg-red-500 text-xs font-bold text-white px-1.5 py-0.5 rounded-full">24</span>
          </div>
        </div>

        <!-- Profile Panel -->
        <div
          v-if="showProfilePanel"
          class="absolute right-6 top-16 bg-white text-black rounded-xl shadow-xl w-80 z-50 p-5"
        >
          <div class="flex items-center gap-4 mb-4">
            <div class="bg-blue-100 text-blue-700 rounded-full h-14 w-14 flex items-center justify-center font-bold text-xl">
              {{ user?.avatar || 'U' }}
            </div>
            <div>
              <h3 class="font-bold text-zinc-800">{{ user?.name || 'Utilisateur' }}</h3>
              <p class="text-sm text-gray-500">{{ user?.email || '' }}</p>
              <p class="text-sm text-blue-600 font-semibold">{{ user?.points || 0 }} Points AKAD</p>
            </div>
          </div>

          <div class="space-y-4 text-zinc-700">
            <div @click="goTo('/profil')" class="cursor-pointer hover:text-yellow-500">
              <p class="font-semibold">Mon Profil</p>
              <p class="text-sm text-gray-500">Informations du Compte et plus</p>
            </div>
            <div @click="goTo('/facturation')" class="cursor-pointer hover:text-yellow-500">
              <p class="font-semibold">Facturation</p>
              <p class="text-sm text-gray-500">Facturation et relevés</p>
            </div>
            <div @click="goTo('/settings')" class="cursor-pointer hover:text-yellow-500">
              <p class="font-semibold">Personnaliser</p>
              <p class="text-sm text-gray-500">Options de personnalisation</p>
            </div>
          </div>

          <button
            class="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg"
          >
            Se déconnecter
          </button>
        </div>
      </header>

      <!-- BODY -->
      <div class="flex flex-1">
        <!-- SIDEBAR -->
        <aside class="bg-white rounded-2xl shadow-2xl ml-8 mr-3 mt-6 p-5 w-64 flex-shrink-0 sticky top-6 self-start">
          <button class="bg-yellow-400 w-full font-bold py-2 rounded mb-6 shadow hover:bg-yellow-500 transition">
            Nouveau AKAD Challenge
          </button>

          <h3 class="text-black font-semibold text-lg mb-4">Menu principal</h3>

          <ul class="space-y-2">
            <li v-for="item in menuItems" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="block px-4 py-2 rounded font-medium"
                :class="{
                  'bg-yellow-100 text-yellow-700 font-bold': $route.path === item.to,
                  'text-black hover:bg-yellow-50': $route.path !== item.to
                }"
              >
                {{ item.name }}
                <span
                  v-if="item.badge"
                  class="ml-2 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full"
                >
                  {{ item.badge }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </aside>

        <!-- PAGE CONTENT -->
        <main class="flex-1 p-6 space-y-10 overflow-y-auto">
          <slot />
        </main>
      </div>
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
