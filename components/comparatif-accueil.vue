<template>
  <section class="bg-black text-white py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <h2 class="text-3xl font-bold text-center text-yellow-400 mb-12">
        Comparez nos comptes de trading
      </h2>

      <!-- Account Selection -->
      <div class="flex flex-wrap justify-center gap-4 mb-10">
        <div class="flex items-center gap-4 bg-zinc-900/50 p-2 rounded-xl backdrop-blur">
          <span class="text-sm font-medium px-2">Capital :</span>
          <div class="flex gap-2">
            <button
              v-for="amount in [10000, 25000, 50000, 100000, 200000]"
              :key="amount"
              @click="selectedAmount = amount"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300',
                selectedAmount === amount
                  ? 'bg-yellow-400 text-black'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              ]"
            >
              {{ formatCurrency(amount) }}
            </button>
          </div>
        </div>
      </div>

      <!-- Comparison Table -->
      <div class="bg-zinc-900/50 rounded-2xl overflow-hidden backdrop-blur border border-zinc-800/50">
        <div class="grid grid-cols-4 text-center">
          <div class="p-6 font-bold text-yellow-400 bg-zinc-800/50">Caractéristiques</div>
          <div class="p-6 font-bold text-yellow-400 bg-zinc-800/50">Challenge</div>
          <div class="p-6 font-bold text-yellow-400 bg-zinc-800/50">Vérification</div>
          <div class="p-6 font-bold text-yellow-400 bg-zinc-800/50">AKAD Trader</div>
        </div>

        <div v-for="(row, index) in comparisonData" :key="index"
             class="grid grid-cols-4 border-t border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
          <div class="p-6 font-medium text-yellow-300">{{ row.feature }}</div>
          <div class="p-6 text-center">{{ formatValue(row.challenge) }}</div>
          <div class="p-6 text-center">{{ formatValue(row.verification) }}</div>
          <div class="p-6 text-center">{{ formatValue(row.trader) }}</div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-10">
        <NuxtLink
          to="/challenge"
          class="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
        >
          Commencer le Challenge
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedAmount = ref(10000)

function formatCurrency(amount) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amount)
}

const comparisonData = computed(() => [
  {
    feature: 'Période de trading',
    challenge: 'Illimitée',
    verification: 'Illimitée',
    trader: 'Illimitée'
  },
  {
    feature: 'Objectif de profit',
    challenge: formatCurrency(selectedAmount.value * 0.10),
    verification: formatCurrency(selectedAmount.value * 0.05),
    trader: 'X'
  },
  {
    feature: 'Perte journalière max',
    challenge: formatCurrency(selectedAmount.value * 0.05),
    verification: formatCurrency(selectedAmount.value * 0.05),
    trader: formatCurrency(selectedAmount.value * 0.05)
  },
  {
    feature: 'Perte max totale',
    challenge: formatCurrency(selectedAmount.value * 0.10),
    verification: formatCurrency(selectedAmount.value * 0.10),
    trader: formatCurrency(selectedAmount.value * 0.10)
  },
  {
    feature: 'Frais',
    challenge: getFees(selectedAmount.value),
    verification: 'Gratuit',
    trader: 'Remboursés'
  }
])

function getFees(amount) {
  const fees = {
    10000: 79,
    25000: 199,
    50000: 299,
    100000: 399,
    200000: 799
  }
  return formatCurrency(fees[amount])
}

function formatValue(value) {
  return value === 'X' ? value : value
}
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>