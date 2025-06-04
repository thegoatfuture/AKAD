<template>
  <header class="bg-black text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo uniquement (agrandi) -->
      <NuxtLink to="/" class="flex items-center">
        <img src="/images/logo-pf.png" alt="Logo AKAD" class="h-24 w-auto" />
      </NuxtLink>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
        <NuxtLink to="/" class="hover:text-yellow-400 transition"
          >Accueil</NuxtLink
        >
        <NuxtLink to="/challenge" class="hover:text-yellow-400 transition"
          >Challenge</NuxtLink
        >
        <NuxtLink to="/trader" class="hover:text-yellow-400 transition"
          >Trader</NuxtLink
        >
        <NuxtLink to="/avis" class="hover:text-yellow-400 transition"
          >Témoignages</NuxtLink
        >
        <NuxtLink to="/faq" class="hover:text-yellow-400 transition"
          >FAQ</NuxtLink
        >
      </nav>

      <!-- Call to Action -->
      <div class="hidden md:block">
        <NuxtLink
          to="/login"
          class="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
        >
          Connexion
        </NuxtLink>
      </div>

      <!-- Burger Menu (mobile) -->
      <button
        @click="mobileOpen = !mobileOpen"
        class="md:hidden text-yellow-400 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileOpen" class="md:hidden bg-black px-4 pb-4">
      <nav class="flex flex-col gap-3">
        <NuxtLink to="/" class="hover:text-yellow-400 transition"
          >Accueil</NuxtLink
        >
        <NuxtLink to="/challenge" class="hover:text-yellow-400 transition"
          >Challenge</NuxtLink
        >
        <NuxtLink to="/trader" class="hover:text-yellow-400 transition"
          >Trader</NuxtLink
        >
        <NuxtLink to="/avis" class="hover:text-yellow-400 transition"
          >Témoignages</NuxtLink
        >
        <NuxtLink to="/faq" class="hover:text-yellow-400 transition"
          >FAQ</NuxtLink
        >
        <NuxtLink
          to="/login"
          class="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition mt-2"
        >
          Connexion
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const mobileOpen = ref(false)
</script>
