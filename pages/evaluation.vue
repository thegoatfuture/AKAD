<template>
  <div class="bg-black text-white min-h-screen">
    <Header />

    <section class="max-w-5xl mx-auto px-4 py-20">
      <h1 class="text-4xl font-bold text-yellow-400 mb-8">Règles du Challenge AKAD</h1>

      <div class="space-y-12">
        <!-- Phase 1 -->
        <div class="border-l-4 border-yellow-400 pl-6">
          <h2 class="text-2xl font-bold mb-2">Phase 1</h2>
          <ul class="list-disc list-inside text-gray-300 space-y-1">
            <li>Objectif de gain : +10 %</li>
            <li>Drawdown max : 10 %</li>
            <li>Perte journalière max : 5 %</li>
            <li>Levier autorisé : 1:100</li>
            <li>Durée : illimitée</li>
          </ul>
        </div>

        <!-- Phase 2 -->
        <div class="border-l-4 border-yellow-400 pl-6">
          <h2 class="text-2xl font-bold mb-2">Phase 2</h2>
          <ul class="list-disc list-inside text-gray-300 space-y-1">
            <li>Objectif de gain : +5 %</li>
            <li>Même règles que la phase 1</li>
            <li>Durée : illimitée</li>
          </ul>
        </div>

        <!-- Compte financé -->
        <div class="border-l-4 border-yellow-400 pl-6">
          <h2 class="text-2xl font-bold mb-2">Compte Financé</h2>
          <ul class="list-disc list-inside text-gray-300 space-y-1">
            <li>Drawdown max : 10 %</li>
            <li>Split des profits : 80/20 ou 90/10</li>
            <li>Paiement des gains : tous les 14 jours</li>
          </ul>
        </div>
      </div>

      <div class="mt-12 text-center">
        <NuxtLink to="/tarifs">
          <button class="bg-yellow-400 text-black px-6 py-3 font-semibold rounded hover:bg-yellow-500 transition">
            Commencer le Challenge
          </button>
        </NuxtLink>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>