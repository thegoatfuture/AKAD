```vue
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
    <section class="bg-zinc-900 py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-yellow-400 mb-12">Règles de Trading</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-zinc-800 p-6 rounded-xl">
            <h3 class="text-xl font-bold mb-4">Gestion du Risque</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Maximum 5% de perte journalière</li>
              <li>Maximum 10% de drawdown total</li>
              <li>Levier maximum de 1:100</li>
            </ul>
          </div>
          
          <div class="bg-zinc-800 p-6 rounded-xl">
            <h3 class="text-xl font-bold mb-4">Durée & Trading</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Minimum 4 jours de trading</li>
              <li>Trading pendant les heures de marché</li>
              <li>Pas de trading le week-end</li>
            </ul>
          </div>

          <div class="bg-zinc-800 p-6 rounded-xl">
            <h3 class="text-xl font-bold mb-4">Instruments</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Forex majeurs et mineurs</li>
              <li>Indices principaux</li>
              <li>Matières premières</li>
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
```