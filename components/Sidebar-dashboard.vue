<template>
  <div class="min-h-screen bg-zinc-950 text-white flex">
    <!-- Sidebar -->
    <aside
  class="bg-white rounded-2xl shadow-2xl mt-6 ml-8 mr-3 mb-6 p-5 w-64 flex-shrink-0"
>
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

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
   

      <!-- Page Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
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
