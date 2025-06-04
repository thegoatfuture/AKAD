<template>
  <section class="bg-black text-white py-16 px-4">
    <!-- Header + Sélecteurs -->
    <div class="max-w-7xl mx-auto text-center mb-10">
      <h2 class="text-4xl font-bold text-yellow-400 mb-4">OBJECTIFS DE TRADING</h2>
      <p class="text-gray-300 mb-6 max-w-3xl mx-auto">
        Les Objectifs de Trading sont basés sur les principes fondamentaux de la gestion des risques. Une fois atteints lors du Challenge et de la Vérification, les clients deviennent AKAD Trader.
      </p>

      <div class="flex flex-wrap justify-center items-center gap-4 mb-6">
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold">DEVISE :</span>
          <button v-for="c in ['USD', 'EUR', 'GBP']" :key="c"
            class="px-3 py-1 rounded text-sm font-bold transition"
            :class="currency === c ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-white'"
            @click="currency = c"
          >
            {{ c }}
          </button>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold">SOLDE :</span>
          <button
            v-for="(amount, i) in balances[currency]"
            :key="i"
            class="px-3 py-1 rounded text-sm font-bold transition"
            :class="selectedIndex === i ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-white'"
            @click="selectedIndex = i"
          >
            {{ amount.label }}
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button class="px-4 py-2 bg-yellow-400 text-black font-bold rounded" @click="showComparison = !showComparison">
            {{ showComparison ? 'RETOUR' : 'COMPARAISON RAPIDE' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Transition de contenu -->
    <transition name="fade" mode="out-in">
      <!-- Vue standard -->
      <div v-if="!showComparison" key="normal" class="max-w-5xl mx-auto">
        <div class="bg-zinc-900 rounded-lg overflow-hidden text-sm text-white">
          <div class="grid grid-cols-4 text-center bg-zinc-800 font-bold text-yellow-400">
            <div class="p-4">Objectif</div>
            <div class="p-4">ÉTAPE 1<br />CHALLENGE</div>
            <div class="p-4">ÉTAPE 2<br />VÉRIFICATION</div>
            <div class="p-4">ÉTAPE 3<br />AKAD TRADER</div>
          </div>
          <div v-for="row in rows" :key="row.label" class="grid grid-cols-4 border-t border-zinc-700 text-center hover:bg-zinc-800">
            <div class="p-4 font-medium text-yellow-400">{{ row.label }}</div>
            <div class="p-4">{{ row.e1[selectedIndex] }}</div>
            <div class="p-4">{{ row.e2[selectedIndex] }}</div>
            <div class="p-4">{{ row.e3[selectedIndex] }}</div>
          </div>
        </div>
        <div class="text-center mt-8">
          <button class="bg-yellow-400 text-black font-bold px-6 py-3 rounded hover:bg-yellow-500 transition">
            COMMENCER LE CHALLENGE
          </button>
        </div>
      </div>

      <!-- Vue comparaison -->
      <div v-else key="comparison" class="max-w-7xl mx-auto">
        <div class="overflow-x-auto">
          <table class="min-w-full text-white text-sm border-collapse">
            <thead>
              <tr class="bg-zinc-800 text-yellow-400">
                <th class="text-left p-4">Objectif</th>
                <th v-for="b in balances[currency]" :key="b.label" class="text-center p-4">
                  {{ b.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in rows" :key="row.label" class="border-t border-zinc-700 hover:bg-zinc-800">
                <td class="p-4 text-yellow-300 font-medium">{{ row.label }}</td>
                <td v-for="val in row.e1" :key="val" class="p-4 text-center">
                  {{ val }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const currency = ref('USD')
const selectedIndex = ref(0)
const showComparison = ref(false)

const balances = {
  USD: [
    { label: '$10,000' },
    { label: '$25,000' },
    { label: '$50,000' },
    { label: '$100,000' },
    { label: '$200,000' }
  ],
  EUR: [
    { label: '€8,000' },
    { label: '€20,000' },
    { label: '€40,000' },
    { label: '€80,000' },
    { label: '€160,000' }
  ],
  GBP: [
    { label: '£7,000' },
    { label: '£17,500' },
    { label: '£35,000' },
    { label: '£70,000' },
    { label: '£140,000' }
  ]
}

const rows = computed(() => {
  const cur = currency.value
  const sym = cur === 'USD' ? '$' : cur === 'EUR' ? '€' : '£'

  const values = [
    { maxDay: 500, max: 1000, profit: 1000, fee: cur === 'USD' ? 79 : cur === 'EUR' ? 89 : 79 },
    { maxDay: 1250, max: 2500, profit: 2500, fee: cur === 'USD' ? 199 : cur === 'EUR' ? 199 : 199 },
    { maxDay: 2500, max: 5000, profit: 5000, fee: cur === 'USD' ? 299 : 299 },
    { maxDay: 5000, max: 10000, profit: 10000, fee: cur === 'USD' ? 399 : 399 },
    { maxDay: 10000, max: 20000, profit: 20000, fee: cur === 'USD' ? 799 : 799 }
  ]

  return [
    {
      label: 'Période De Trading',
      e1: Array(5).fill('Illimité'),
      e2: Array(5).fill('Illimité'),
      e3: Array(5).fill('Illimité')
    },
    {
      label: 'Nombre Minimum De Jours De Trading',
      e1: Array(5).fill('4 Jours'),
      e2: Array(5).fill('4 Jours'),
      e3: Array(5).fill('X')
    },
    {
      label: 'Perte Maximale Journalière',
      e1: values.map(v => `${sym}${v.maxDay}`),
      e2: values.map(v => `${sym}${v.maxDay}`),
      e3: values.map(v => `${sym}${v.maxDay}`)
    },
    {
      label: 'Perte Maximale',
      e1: values.map(v => `${sym}${v.max}`),
      e2: values.map(v => `${sym}${v.max}`),
      e3: values.map(v => `${sym}${v.max}`)
    },
    {
      label: 'Objectif De Profit',
      e1: values.map(v => `${sym}${v.profit}`),
      e2: values.map(v => `${sym}${v.profit / 2}`),
      e3: Array(5).fill('X')
    },
    {
      label: 'Frais',
      e1: values.map((v, i) => i === 0 ? `${sym}${v.fee} (promo)` : `${sym}${v.fee}`),
      e2: Array(5).fill('Gratuit'),
      e3: Array(5).fill('Remboursement')
    }
  ]
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>