<template>
  <section class="bg-black text-white py-20 px-4">
    <!-- Devise & Solde -->
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
      <div class="flex gap-2">
        <span class="text-sm font-semibold">DEVISE :</span>
        <button
          v-for="currency in currencies"
          :key="currency"
          @click="selectedCurrency = currency"
          :class="[
            'px-3 py-1 rounded text-sm font-semibold transition',
            selectedCurrency === currency ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-300'
          ]"
        >
          {{ currency }}
        </button>
      </div>
      <div class="flex gap-2">
        <span class="text-sm font-semibold">SOLDE :</span>
        <button
          v-for="amount in balances"
          :key="amount"
          @click="selectedBalance = amount"
          :class="[
            'px-3 py-1 rounded text-sm font-semibold transition',
            selectedBalance === amount ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-300'
          ]"
        >
          {{ getFormattedBalance(amount) }}
        </button>
      </div>
    </div>

    <!-- Comparatif -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-zinc-900 border border-zinc-700 text-sm">
        <thead>
          <tr class="text-yellow-400 text-center">
            <th class="border-b p-4 text-left">Critères</th>
            <th class="border-b p-4">Challenge</th>
            <th class="border-b p-4">Vérification</th>
            <th class="border-b p-4">AKAD Trader</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="row in comparatifData" :key="row.label" class="hover:bg-zinc-800">
            <td class="p-4 text-left text-yellow-300 font-medium">{{ row.label }}</td>
            <td class="p-4">{{ getValue(row.challenge) }}</td>
            <td class="p-4">{{ getValue(row.verification) }}</td>
            <td class="p-4">{{ getValue(row.trader) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const currencies = ['USD', 'EUR', 'GBP']
const selectedCurrency = ref('USD')

const balances = [10000, 25000, 50000, 100000, 200000]
const selectedBalance = ref(10000)

const conversionRates = {
  USD: 1,
  EUR: 0.8,
  GBP: 0.7
}

function convert(value) {
  const rate = conversionRates[selectedCurrency.value] || 1
  return Math.round(value * rate).toLocaleString()
}

function getFormattedBalance(balance) {
  const converted = convert(balance)
  return `${converted} ${selectedCurrency.value}`
}

function getValue(entry) {
  if (typeof entry === 'object') {
    return entry[selectedCurrency.value] || '-'
  }
  return entry
}

const comparatifData = [
  {
    label: 'Période de trading',
    challenge: 'Illimitée',
    verification: 'Illimitée',
    trader: 'Illimitée'
  },
  {
    label: 'Objectif de profit',
    challenge: { USD: '$1000', EUR: '800€', GBP: '700£' },
    verification: { USD: '$500', EUR: '400€', GBP: '350£' },
    trader: 'X'
  },
  {
    label: 'Perte journalière max',
    challenge: { USD: '$500', EUR: '400€', GBP: '350£' },
    verification: { USD: '$500', EUR: '400€', GBP: '350£' },
    trader: { USD: '$500', EUR: '400€', GBP: '350£' }
  },
  {
    label: 'Perte max totale',
    challenge: { USD: '$1000', EUR: '800€', GBP: '700£' },
    verification: { USD: '$1000', EUR: '800€', GBP: '700£' },
    trader: { USD: '$1000', EUR: '800€', GBP: '700£' }
  },
  {
    label: 'Frais remboursables',
    challenge: { USD: '$89', EUR: '79€', GBP: '69£' },
    verification: 'Gratuit',
    trader: 'Remboursés'
  }
]
</script>

<style scoped>
th, td {
  white-space: nowrap;
}
</style>
