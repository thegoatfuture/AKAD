<template>
  <div class="bg-black text-white min-h-screen">
    <section class="relative py-20 px-4 overflow-hidden">
      <!-- Background decorations -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-0 w-64 h-64 bg-yellow-500 opacity-20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400 opacity-20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <!-- Main content -->
      <div class="max-w-6xl mx-auto relative z-10">
        <h1 class="text-5xl font-bold text-center mb-8">
          Challenge <span class="text-yellow-400">AKAD</span>
        </h1>
        <p class="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-12">
          Prouvez vos compétences de trading et accédez à un capital simulé jusqu'à 200 000 €
        </p>

        <!-- Challenge Steps -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div class="bg-zinc-900 p-8 rounded-xl">
            <h3 class="text-xl font-bold text-yellow-400 mb-4">Phase 1: Challenge</h3>
            <ul class="space-y-3 text-gray-300">
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Objectif de gain: +10%
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Durée illimitée
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Drawdown max: 10%
              </li>
            </ul>
          </div>

          <div class="bg-zinc-900 p-8 rounded-xl">
            <h3 class="text-xl font-bold text-yellow-400 mb-4">Phase 2: Vérification</h3>
            <ul class="space-y-3 text-gray-300">
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Objectif de gain: +5%
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Mêmes règles que phase 1
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Durée illimitée
              </li>
            </ul>
          </div>

          <div class="bg-zinc-900 p-8 rounded-xl">
            <h3 class="text-xl font-bold text-yellow-400 mb-4">Phase 3: Compte Financé</h3>
            <ul class="space-y-3 text-gray-300">
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Split des profits: jusqu'à 90%
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Paiements bi-mensuels
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Support dédié
              </li>
            </ul>
          </div>
        </div>

        <div class="text-center">
          <NuxtLink to="/tarifs" class="inline-block bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 transition">
            Commencer le Challenge
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Trading Rules -->
    <section class="relative bg-zinc-900 py-20 px-4 overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
      </div>

      <div class="max-w-6xl mx-auto relative z-10">
        <h2 class="text-3xl font-bold text-center text-yellow-400 mb-12">Règles de Trading</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Risk Management Card -->
          <div class="bg-zinc-800/50 backdrop-blur p-8 rounded-2xl border border-zinc-700/50 hover:border-yellow-400/20 transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold">Gestion du Risque</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-center gap-3 text-gray-300">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Maximum 5% de perte journalière
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Maximum 10% de drawdown total
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Levier maximum de 1:100
              </li>
            </ul>
          </div>

          <!-- Duration & Trading Card -->
          <div class="bg-zinc-800/50 backdrop-blur p-8 rounded-2xl border border-zinc-700/50 hover:border-yellow-400/20 transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold">Durée & Trading</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-center gap-3 text-gray-300">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Minimum 4 jours de trading
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Trading pendant les heures de marché
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Pas de trading le week-end
              </li>
            </ul>
          </div>

          <!-- Instruments Card -->
          <div class="bg-zinc-800/50 backdrop-blur p-8 rounded-2xl border border-zinc-700/50 hover:border-yellow-400/20 transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold">Instruments</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-center gap-3 text-gray-300">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Forex majeurs et mineurs
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Indices principaux
              </li>
              <li class="flex items-center gap-3 text-gray-300">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Matières premières
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Challenge AKAD - Évaluation de Trading',
  description: 'Découvrez les règles et étapes du challenge AKAD pour devenir un trader financé.'
})
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