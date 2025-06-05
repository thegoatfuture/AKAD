<template>
  <section class="relative bg-black text-white py-20 px-4 overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header Section -->
      <div class="text-center mb-10">
        <h2 class="text-4xl font-bold text-yellow-400 mb-4">OBJECTIFS DE TRADING</h2>
        <p class="text-gray-300 max-w-3xl mx-auto">
          Les Objectifs de Trading sont basés sur les principes fondamentaux de la gestion des risques. Une fois atteints lors du Challenge et de la Vérification, les clients deviennent AKAD Trader.
        </p>
      </div>

      <!-- Currency & Balance Selection -->
      <div class="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold">DEVISE :</span>
          <div class="flex gap-1">
            <button
              v-for="c in ['USD', 'EUR', 'GBP']"
              :key="c"
              @click="selectedCurrency = c"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105',
                selectedCurrency === c
                  ? 'bg-yellow-400 text-black shadow-lg'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              ]"
            >
              {{ c }}
            </button>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold">SOLDE :</span>
          <div class="flex flex-wrap gap-1">
            <button
              v-for="amount in balances[selectedCurrency]"
              :key="amount.value"
              @click="selectedBalance = amount.value"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105',
                selectedBalance === amount.value
                  ? 'bg-yellow-400 text-black shadow-lg'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              ]"
            >
              {{ formatCurrency(amount.value) }}
            </button>
          </div>
        </div>
      </div>

      <!-- Trading Objectives Table -->
      <div class="bg-zinc-900/50 backdrop-blur rounded-2xl overflow-hidden shadow-xl border border-zinc-800/50">
        <div class="grid grid-cols-4 text-center bg-zinc-800/50">
          <div class="p-6 font-bold text-yellow-400">Objectif</div>
          <div class="p-6 font-bold text-yellow-400">ÉTAPE 1<br/>CHALLENGE</div>
          <div class="p-6 font-bold text-yellow-400">ÉTAPE 2<br/>VÉRIFICATION</div>
          <div class="p-6 font-bold text-yellow-400">ÉTAPE 3<br/>AKAD TRADER</div>
        </div>

        <div v-for="row in tableData" :key="row.label" 
             class="grid grid-cols-4 border-t border-zinc-800/50 text-center hover:bg-zinc-800/30 transition-colors">
          <div class="p-6 font-medium text-yellow-300">{{ row.label }}</div>
          <div class="p-6">{{ formatValue(row.challenge) }}</div>
          <div class="p-6">{{ formatValue(row.verification) }}</div>
          <div class="p-6">{{ formatValue(row.trader) }}</div>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="text-center mt-10">
        <NuxtLink 
          to="/challenge"
          class="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105 hover:shadow-xl"
        >
          COMMENCER LE CHALLENGE
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCurrency = ref('USD')
const selectedBalance = ref(10000)

const balances = {
  USD: [
    { value: 10000, label: '$10,000' },
    { value: 25000, label: '$25,000' },
    { value: 50000, label: '$50,000' },
    { value: 100000, label: '$100,000' },
    { value: 200000, label: '$200,000' }
  ],
  EUR: [
    { value: 8000, label: '€8,000' },
    { value: 20000, label: '€20,000' },
    { value: 40000, label: '€40,000' },
    { value: 80000, label: '€80,000' },
    { value: 160000, label: '€160,000' }
  ],
  GBP: [
    { value: 7000, label: '£7,000' },
    { value: 17500, label: '£17,500' },
    { value: 35000, label: '£35,000' },
    { value: 70000, label: '£70,000' },
    { value: 140000, label: '£140,000' }
  ]
}

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£'
}

const tableData = computed(() => [
  {
    label: 'Période De Trading',
    challenge: 'Illimitée',
    verification: 'Illimitée',
    trader: 'Illimitée'
  },
  {
    label: 'Jours de Trading Min.',
    challenge: '4 Jours',
    verification: '4 Jours',
    trader: 'X'
  },
  {
    label: 'Perte Max. Journalière',
    challenge: calculateValue(0.05),
    verification: calculateValue(0.05),
    trader: calculateValue(0.05)
  },
  {
    label: 'Perte Max. Totale',
    challenge: calculateValue(0.10),
    verification: calculateValue(0.10),
    trader: calculateValue(0.10)
  },
  {
    label: 'Objectif De Profit',
    challenge: calculateValue(0.10),
    verification: calculateValue(0.05),
    trader: 'X'
  },
  {
    label: 'Frais',
    challenge: getFees(),
    verification: 'Gratuit',
    trader: 'Remboursés'
  }
])

function calculateValue(percentage) {
  const value = selectedBalance.value * percentage
  return formatCurrency(value)
}

function formatCurrency(value) {
  return `${currencySymbols[selectedCurrency.value]}${value.toLocaleString()}`
}

function getFees() {
  const feeStructure = {
    10000: 79,
    25000: 199,
    50000: 299,
    100000: 399,
    200000: 799
  }
  return `${currencySymbols[selectedCurrency.value]}${feeStructure[selectedBalance.value]}`
}

function formatValue(value) {
  if (value === 'X' || typeof value === 'string') return value
  return value
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