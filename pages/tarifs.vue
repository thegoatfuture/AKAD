<template>
  <div class="bg-black text-white min-h-screen">
    <Header />

    <section class="max-w-6xl mx-auto px-4 py-20">
      <h1 class="text-4xl font-bold text-yellow-400 mb-6 text-center">Tarifs & Paliers de financement</h1>
      <p class="text-gray-300 text-center mb-12">
        Choisissez un capital de départ et commencez votre évaluation sans limite de temps.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(plan, index) in plans"
          :key="index"
          class="bg-zinc-900 border border-zinc-700 rounded-xl p-6 text-center shadow"
        >
          <h2 class="text-xl font-bold text-yellow-400 mb-2">{{ plan.capital }}</h2>
          <p class="text-3xl font-bold mb-4">{{ plan.price }}</p>
          <ul class="text-sm text-gray-400 space-y-1 mb-6">
            <li>Objectif Phase 1 : +10%</li>
            <li>Objectif Phase 2 : +5%</li>
            <li>Max Drawdown : 10%</li>
            <li>Perte journalière : 5%</li>
            <li>Durée : illimitée</li>
          </ul>
          <NuxtLink to="/evaluation">
            <button class="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500 transition">
              Commencer ce plan
            </button>
          </NuxtLink>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

const plans = [
  { capital: '10 000 €', price: '79 €' },
  { capital: '25 000 €', price: '199 €' },
  { capital: '50 000 €', price: '299 €' },
  { capital: '100 000 €', price: '399 €' },
  { capital: '200 000 €', price: '899 €' },
]
</script>
