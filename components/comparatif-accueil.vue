<template>
  <section class="relative bg-black text-white py-20 px-4 overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-yellow-400 mb-4">Choisissez votre compte</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">
          Sélectionnez le capital qui correspond à vos objectifs et commencez votre journey vers le trading professionnel
        </p>
      </div>

      <!-- Account Cards -->
      <div class="grid md:grid-cols-4 gap-6">
        <div v-for="amount in [10000, 25000, 50000, 100000]" :key="amount"
             class="bg-zinc-900/50 backdrop-blur rounded-2xl p-6 border border-zinc-800/50 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-2">
          <!-- Account Header -->
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-yellow-400">{{ formatCurrency(amount) }}</h3>
            <p class="text-sm text-gray-400 mt-2">Capital de trading</p>
          </div>

          <!-- Account Features -->
          <ul class="space-y-4 mb-8">
            <li class="flex items-center gap-2 text-sm">
              <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Objectif : {{ formatCurrency(amount * 0.1) }}</span>
            </li>
            <li class="flex items-center gap-2 text-sm">
              <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Drawdown : {{ formatCurrency(amount * 0.1) }}</span>
            </li>
            <li class="flex items-center gap-2 text-sm">
              <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Perte max/jour : {{ formatCurrency(amount * 0.05) }}</span>
            </li>
            <li class="flex items-center gap-2 text-sm">
              <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Durée illimitée</span>
            </li>
          </ul>

          <!-- Price -->
          <div class="text-center mb-6">
            <div class="text-3xl font-bold">{{ getFees(amount) }}</div>
            <p class="text-sm text-gray-400 mt-1">Frais uniques</p>
          </div>

          <!-- CTA Button -->
          <NuxtLink 
            :to="`/challenge?amount=${amount}`"
            class="block w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-xl text-center transition-colors"
          >
            Commencer
          </NuxtLink>
        </div>
      </div>

      <!-- Additional Features -->
      <div class="grid md:grid-cols-3 gap-8 mt-16">
        <div class="text-center">
          <div class="w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h4 class="font-semibold mb-2">Durée illimitée</h4>
          <p class="text-sm text-gray-400">Prenez votre temps pour atteindre vos objectifs</p>
        </div>

        <div class="text-center">
          <div class="w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h4 class="font-semibold mb-2">Vérification gratuite</h4>
          <p class="text-sm text-gray-400">Pas de frais pour la phase de vérification</p>
        </div>

        <div class="text-center">
          <div class="w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h4 class="font-semibold mb-2">Profit sharing jusqu'à 90%</h4>
          <p class="text-sm text-gray-400">Profitez des meilleures conditions du marché</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

function formatCurrency(amount) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amount)
}

function getFees(amount) {
  const fees = {
    10000: 79,
    25000: 199,
    50000: 299,
    100000: 399
  }
  return formatCurrency(fees[amount])
}
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1) translate(var(--tw-translate-x), var(--tw-translate-y));
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05) translate(var(--tw-translate-x), var(--tw-translate-y));
  }
}

.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.delay-1000 {
  animation-delay: 1000ms;
}
</style>