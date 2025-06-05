```vue
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Tableau de bord - AKAD',
  description: 'Gérez vos comptes et suivez vos performances sur le tableau de bord AKAD.',
})

const activeTab = ref('akad')
const modalContent = ref(null)
const showModal = ref(false)

function openModal(contentType) {
  modalContent.value = contentType
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  modalContent.value = null
}

const accountStats = [
  { label: 'Balance', value: '€160,000.00', change: '-2.5%', color: 'text-red-400' },
  { label: 'Equity', value: '€157,500.00', change: '-1.8%', color: 'text-red-400' },
  { label: 'Profit/Loss', value: '-€2,500.00', change: null, color: 'text-red-400' },
  { label: 'Drawdown', value: '4.8%', change: '+0.5%', color: 'text-yellow-400' }
]

const recentTrades = [
  { pair: 'EUR/USD', type: 'BUY', size: '1.00', profit: '+€450.00', time: '14:30' },
  { pair: 'BTC/USD', type: 'SELL', size: '0.50', profit: '-€280.00', time: '13:15' },
  { pair: 'GBP/JPY', type: 'BUY', size: '2.00', profit: '+€670.00', time: '11:45' }
]

const upcomingEvents = [
  { title: 'NFP Report', date: '05 Jul', importance: 'high' },
  { title: 'ECB Meeting', date: '08 Jul', importance: 'medium' },
  { title: 'CPI Data', date: '12 Jul', importance: 'high' }
]
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white">
    <main class="p-6 space-y-6">
      <!-- Account Overview Card -->
      <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-2xl font-bold text-yellow-400">AKAD Challenge #510163222</h2>
            <p class="text-zinc-400">Phase de vérification en cours - Jour 8/14</p>
          </div>
          <button @click="openModal('details')" 
                  class="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-500 transition-all">
            Nouveau Challenge
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="stat in accountStats" :key="stat.label" 
               class="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/30">
            <p class="text-sm text-zinc-400">{{ stat.label }}</p>
            <p :class="['text-xl font-bold', stat.color]">{{ stat.value }}</p>
            <p v-if="stat.change" class="text-xs mt-1" :class="stat.color">
              {{ stat.change }} aujourd'hui
            </p>
          </div>
        </div>
      </div>

      <!-- Trading Activity & Calendar Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Trades -->
        <div class="lg:col-span-2 bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
          <h3 class="text-xl font-bold text-yellow-400 mb-4">Trades Récents</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="text-sm text-zinc-400">
                <tr>
                  <th class="text-left py-2">Paire</th>
                  <th class="text-left py-2">Type</th>
                  <th class="text-left py-2">Taille</th>
                  <th class="text-left py-2">P/L</th>
                  <th class="text-left py-2">Heure</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="trade in recentTrades" :key="trade.time" 
                    class="border-t border-zinc-800/30">
                  <td class="py-3 font-medium">{{ trade.pair }}</td>
                  <td class="py-3">
                    <span :class="trade.type === 'BUY' ? 'text-green-400' : 'text-red-400'">
                      {{ trade.type }}
                    </span>
                  </td>
                  <td class="py-3">{{ trade.size }}</td>
                  <td class="py-3" :class="trade.profit.includes('+') ? 'text-green-400' : 'text-red-400'">
                    {{ trade.profit }}
                  </td>
                  <td class="py-3 text-zinc-400">{{ trade.time }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Economic Calendar -->
        <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
          <h3 class="text-xl font-bold text-yellow-400 mb-4">Calendrier Économique</h3>
          <div class="space-y-4">
            <div v-for="event in upcomingEvents" :key="event.title" 
                 class="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
              <div>
                <p class="font-medium">{{ event.title }}</p>
                <p class="text-sm text-zinc-400">{{ event.date }}</p>
              </div>
              <div :class="{
                'bg-red-400/20 text-red-400': event.importance === 'high',
                'bg-yellow-400/20 text-yellow-400': event.importance === 'medium'
              }" class="px-3 py-1 rounded-full text-xs font-medium">
                {{ event.importance }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Win Rate Card -->
        <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-yellow-400">Win Rate</h3>
            <span class="text-2xl font-bold text-green-400">68%</span>
          </div>
          <div class="h-2 bg-zinc-800 rounded-full">
            <div class="h-full w-[68%] bg-green-400 rounded-full"></div>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p class="text-sm text-zinc-400">Trades Gagnants</p>
              <p class="text-lg font-bold text-green-400">34</p>
            </div>
            <div>
              <p class="text-sm text-zinc-400">Trades Perdants</p>
              <p class="text-lg font-bold text-red-400">16</p>
            </div>
            <div>
              <p class="text-sm text-zinc-400">Total Trades</p>
              <p class="text-lg font-bold">50</p>
            </div>
          </div>
        </div>

        <!-- Risk Management Card -->
        <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
          <h3 class="text-xl font-bold text-yellow-400 mb-4">Gestion du Risque</h3>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-zinc-400">Drawdown Maximum</span>
                <span class="text-yellow-400">4.8% / 10%</span>
              </div>
              <div class="h-2 bg-zinc-800 rounded-full">
                <div class="h-full w-[48%] bg-yellow-400 rounded-full"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-zinc-400">Perte Journalière</span>
                <span class="text-green-400">2.1% / 5%</span>
              </div>
              <div class="h-2 bg-zinc-800 rounded-full">
                <div class="h-full w-[42%] bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal -->
    <div v-if="showModal" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div class="bg-zinc-800 p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <button @click="closeModal" 
                class="absolute top-3 right-3 text-zinc-400 hover:text-white">
          &times;
        </button>
        <h3 class="text-xl font-bold text-yellow-400 mb-4">
          {{ modalContent }}
        </h3>
        <p class="text-sm text-zinc-300">
          Contenu de {{ modalContent }} à détailler ici...
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
```