<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref({
  name: 'TEST123',
  email: 'mathis@example.com',
  avatar: 'F',
  points: 0,
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
  { 
    name: 'Aperçu des Comptes', 
    to: '/dashboard',
    icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z'
  },
  { 
    name: 'Premium', 
    to: '/premium',
    icon: 'M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
  },
  { 
    name: 'Profil', 
    to: '/profil',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  { 
    name: 'AKAD Traders', 
    to: '/traders',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  },
  { 
    name: 'AKAD Academy', 
    to: '/academy',
    icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'
  },
  { 
    name: 'Facturation', 
    to: '/facturation', 
    badge: 5,
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  },
  { 
    name: 'Leaderboard', 
    to: '/leaderboard',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
  },
  { 
    name: 'Certificats', 
    to: '/certificats',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  { 
    name: 'Téléchargements', 
    to: '/telechargement',
    icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  },
]
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white flex">
    <div class="flex-1 flex flex-col">
      <!-- HEADER -->
      <header
        class="flex justify-between items-center px-6 py-4 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800/50 relative"
      >
        <div class="flex items-center gap-3">
          <img src="/images/logo-pf.png" alt="Logo AKAD" class="h-12 w-auto" />
        </div>

        <div
          class="flex items-center gap-4 cursor-pointer group"
          @click="toggleProfilePanel"
        >
          <span class="font-semibold hover:text-yellow-400 transition-colors duration-200">
            {{ user?.name || 'Utilisateur' }}
          </span>
          <div
            class="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold shadow-lg transform group-hover:scale-105 transition-transform duration-200"
          >
            {{ user?.avatar || 'U' }}
          </div>
          <div class="relative">
            <svg
              class="w-6 h-6 transform group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="white"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span
              class="absolute -top-2 -right-2 bg-red-500 text-xs font-bold text-white px-1.5 py-0.5 rounded-full animate-pulse"
              >24</span
            >
          </div>
        </div>

        <!-- Profile Panel -->
        <div
          v-if="showProfilePanel"
          class="absolute right-6 top-16 bg-zinc-900/95 backdrop-blur-lg text-white rounded-xl shadow-2xl w-80 z-50 p-6 border border-zinc-700/50 animate-fade-in"
        >
          <div class="flex items-center gap-4 mb-6">
            <div
              class="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full h-14 w-14 flex items-center justify-center font-bold text-xl shadow-lg"
            >
              {{ user?.avatar || 'U' }}
            </div>
            <div>
              <h3 class="font-bold text-white text-lg">
                {{ user?.name || 'Utilisateur' }}
              </h3>
              <p class="text-sm text-zinc-400">{{ user?.email || '' }}</p>
              <p class="text-sm text-yellow-400 font-semibold">
                {{ user?.points || 0 }} Points AKAD
              </p>
            </div>
          </div>

          <div class="space-y-3 text-zinc-300">
            <div
              @click="goTo('/profil')"
              class="cursor-pointer hover:text-yellow-400 transition-colors duration-200 p-3 rounded-lg hover:bg-zinc-800/50"
            >
              <p class="font-semibold">Mon Profil</p>
              <p class="text-sm text-zinc-400">
                Informations du Compte et plus
              </p>
            </div>
            <div
              @click="goTo('/facturation')"
              class="cursor-pointer hover:text-yellow-400 transition-colors duration-200 p-3 rounded-lg hover:bg-zinc-800/50"
            >
              <p class="font-semibold">Facturation</p>
              <p class="text-sm text-zinc-400">Facturation et relevés</p>
            </div>
            <div
              @click="goTo('/settings')"
              class="cursor-pointer hover:text-yellow-400 transition-colors duration-200 p-3 rounded-lg hover:bg-zinc-800/50"
            >
              <p class="font-semibold">Personnaliser</p>
              <p class="text-sm text-zinc-400">Options de personnalisation</p>
            </div>
          </div>

          <button
            class="mt-6 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Se déconnecter
          </button>
        </div>
      </header>

      <!-- BODY -->
      <div class="flex flex-1">
        <!-- SIDEBAR -->
        <aside
          class="bg-zinc-900/50 backdrop-blur-lg rounded-2xl shadow-2xl ml-6 mr-3 mt-6 mb-6 p-6 w-64 flex-shrink-0 sticky top-6 self-start border border-zinc-800/50"
        >
          <button
            class="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 w-full font-bold py-3 rounded-lg mb-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-black"
          >
            Nouveau AKAD Challenge
          </button>

          <h3 class="text-zinc-400 font-semibold text-sm uppercase tracking-wider mb-6 px-2">Menu principal</h3>

          <ul class="space-y-2">
            <li v-for="item in menuItems" :key="item.to" class="group">
              <NuxtLink
                :to="item.to"
                class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 relative overflow-hidden"
                :class="{
                  'bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 text-yellow-400 border-l-4 border-yellow-400 shadow-lg': $route.path === item.to,
                  'text-zinc-300 hover:text-white hover:bg-zinc-800/50 hover:translate-x-1': $route.path !== item.to,
                }"
              >
                <!-- Icon -->
                <svg class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" 
                     fill="none" 
                     viewBox="0 0 24 24" 
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"/>
                </svg>
                
                <!-- Text -->
                <span class="flex-1">{{ item.name }}</span>
                
                <!-- Badge -->
                <span
                  v-if="item.badge"
                  class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse"
                >
                  {{ item.badge }}
                </span>

                <!-- Hover effect -->
                <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
              </NuxtLink>
            </li>
          </ul>

          <!-- Bottom section with user stats -->
          <div class="mt-8 pt-6 border-t border-zinc-800/50">
            <div class="bg-zinc-800/30 rounded-lg p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-sm text-zinc-400">Statut du compte</span>
              </div>
              <p class="text-sm font-medium text-white">Challenge actif</p>
              <p class="text-xs text-zinc-400 mt-1">Phase de vérification</p>
            </div>
          </div>
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
/* Custom animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Smooth scrollbar */
main::-webkit-scrollbar {
  width: 6px;
}
main::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, rgba(250, 204, 21, 0.3), rgba(250, 204, 21, 0.1));
  border-radius: 3px;
}
main::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

/* Backdrop blur support */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* Gradient text effect */
.bg-gradient-to-r {
  background: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Custom pulse animation for notifications */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>