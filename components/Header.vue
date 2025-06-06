<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800/50">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <nav class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <img src="/images/logo-pf.png" alt="Logo AKAD" class="h-12 w-auto transform hover:scale-105 transition-transform duration-300" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink 
            v-for="item in navigationItems" 
            :key="item.to" 
            :to="item.to"
            class="text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors relative group"
          >
            {{ item.name }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
        </div>

        <!-- Profile Dropdown -->
        <div class="relative">
          <button @click="toggleProfileMenu" class="flex items-center gap-2 text-gray-300 hover:text-yellow-400">
            <span>Profile</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <div v-if="showProfileMenu" 
               class="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-xl shadow-lg py-2 border border-zinc-800">
            <NuxtLink to="/dashboard" class="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800">
              Dashboard
            </NuxtLink>
            <NuxtLink to="/challenge" class="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800">
              New Challenge
            </NuxtLink>
            <NuxtLink to="/billing" class="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800">
              Billing
            </NuxtLink>
            <NuxtLink to="/payment-request" class="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800">
              Payment Request
            </NuxtLink>
            <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800">
              Profile
            </NuxtLink>
            <NuxtLink to="/change-password" class="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800">
              Change Password
            </NuxtLink>
            <NuxtLink to="/help" class="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800">
              Help Center
            </NuxtLink>
            <NuxtLink to="/community" class="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800">
              Join Community
            </NuxtLink>
            <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-800">
              Logout
            </button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileOpen = !mobileOpen"
          class="md:hidden text-gray-300 hover:text-yellow-400 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!mobileOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div
        v-if="mobileOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-zinc-800/50 py-4 px-4"
      >
        <nav class="flex flex-col gap-4">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.to"
            :to="item.to"
            class="text-gray-300 hover:text-yellow-400 transition-colors py-2"
            @click="mobileOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
  <!-- Spacer to prevent content from hiding under fixed header -->
  <div class="h-20"></div>
</template>

<script setup>
import { ref } from 'vue'

const mobileOpen = ref(false)
const showProfileMenu = ref(false)

const navigationItems = [
  { name: 'Accueil', to: '/' },
  { name: 'Challenge', to: '/evaluation' },
  { name: 'Trader', to: '/traders-public' },
  { name: 'Témoignages', to: '/avis' },
  { name: 'FAQ', to: '/faq' },
]

function toggleProfileMenu() {
  showProfileMenu.value = !showProfileMenu.value
}

function logout() {
  // Handle logout logic
  showProfileMenu.value = false
}
</script>

<style scoped>
.backdrop-blur-lg {
  backdrop-filter: blur(12px);
}
</style>