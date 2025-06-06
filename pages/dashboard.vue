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

      <!-- Trading Plan - New Component -->
      <TradingPlan />

      <!-- Equity Chart -->
      <EquityChart />

      <!-- Challenge Progress & Risk Management -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChallengeProgress />
        <BadgesAchievements />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TradingPlan from '../components/TradingPlan.vue'
import EquityChart from '../components/EquityChart.vue'
import ChallengeProgress from '../components/ChallengeProgress.vue'
import BadgesAchievements from '../components/BadgesAchievements.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const accountStats = [
  { label: 'Balance', value: '€160,000.00', change: '-2.5%', color: 'text-red-400' },
  { label: 'Equity', value: '€157,500.00', change: '-1.8%', color: 'text-red-400' },
  { label: 'Profit/Loss', value: '-€2,500.00', change: null, color: 'text-red-400' },
  { label: 'Drawdown', value: '4.8%', change: '+0.5%', color: 'text-yellow-400' }
]
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>