<template>
  <div class="min-h-screen bg-zinc-950 text-white">
    <main class="p-6 space-y-6">
      <!-- Account Overview -->
      <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-2xl font-bold text-yellow-400">AKAD Challenge #510163222</h2>
            <div class="flex items-center gap-2 mt-1">
              <span class="bg-green-400/20 text-green-400 text-xs px-2 py-1 rounded-full">Phase de Vérification</span>
              <span class="text-zinc-400 text-sm">Jour 8/14</span>
            </div>
          </div>
          <button @click="openModal('newChallenge')" 
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

      <!-- Equity Chart -->
      <EquityChart />

      <!-- Challenge Progress & Risk Management -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChallengeProgress />
        
        <!-- Performance Badges -->
        <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
          <h3 class="text-xl font-bold text-yellow-400 mb-6">Badges & Réalisations</h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="badge in badges" :key="badge.title"
                 class="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/30 flex items-center gap-3">
              <div :class="`text-${badge.color}-400`" class="text-2xl">{{ badge.icon }}</div>
              <div>
                <p class="font-medium">{{ badge.title }}</p>
                <p class="text-xs text-zinc-400">{{ badge.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trading Journal & Calendar -->
      <div class="flex gap-6">
        <TradingJournal />
      </div>

      <!-- Badges & Achievements -->
      <BadgesAchievements />
    </main>

    <!-- Modal -->
    <div v-if="showModal" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
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

<script setup>
import { ref } from 'vue'
import EquityChart from '../components/EquityChart.vue'
import ChallengeProgress from '../components/ChallengeProgress.vue'
import TradingJournal from '../components/TradingJournal.vue'
import BadgesAchievements from '../components/BadgesAchievements.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const modalContent = ref(null)
const showModal = ref(false)

const accountStats = [
  { label: 'Balance', value: '€160,000.00', change: '-2.5%', color: 'text-red-400' },
  { label: 'Equity', value: '€157,500.00', change: '-1.8%', color: 'text-red-400' },
  { label: 'Profit/Loss', value: '-€2,500.00', change: null, color: 'text-red-400' },
  { label: 'Drawdown', value: '4.8%', change: '+0.5%', color: 'text-yellow-400' }
]

const badges = [
  { title: '3 Jours Gagnants', description: 'Série en cours', icon: '🏆', color: 'yellow' },
  { title: 'Trader Prudent', description: 'Respect des règles', icon: '🛡️', color: 'blue' },
  { title: 'R:R Optimal', description: '+3R sur un trade', icon: '⚖️', color: 'green' },
  { title: 'Discipline', description: 'Journal à jour', icon: '📝', color: 'purple' }
]

function openModal(contentType) {
  modalContent.value = contentType
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  modalContent.value = null
}
</script>

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