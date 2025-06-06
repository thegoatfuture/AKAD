<template>
  <div class="min-h-screen bg-zinc-950 text-white">
    <!-- Welcome Message -->
    <Transition name="fade">
      <div v-if="showWelcome" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
        <div class="text-center space-y-4">
          <h1 class="text-4xl font-bold text-yellow-400">
            Welcome back, {{ user?.name || 'Trader' }} 🚀
          </h1>
          <p class="text-xl text-gray-400">Let's make it count today!</p>
        </div>
      </div>
    </Transition>

    <main class="p-6 space-y-6">
      <!-- Account Overview -->
      <TransitionGroup 
        name="dashboard-card"
        tag="div"
        class="space-y-6"
        appear
      >
        <!-- Stats Cards -->
        <div key="overview" class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50 hover-glow">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-2xl font-bold text-yellow-400">AKAD Challenge #510163222</h2>
              <div class="flex items-center gap-2 mt-1">
                <span class="bg-green-400/20 text-green-400 text-xs px-2 py-1 rounded-full">
                  Phase de Vérification
                </span>
                <span class="text-zinc-400 text-sm">Jour 8/14</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="(stat, index) in accountStats" 
                 :key="stat.label"
                 :style="{ animationDelay: `${index * 100}ms` }"
                 class="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/30 animate-on-scroll">
              <p class="text-sm text-zinc-400">{{ stat.label }}</p>
              <p :class="['text-xl font-bold', stat.color]">{{ stat.value }}</p>
              <p v-if="stat.change" class="text-xs mt-1" :class="stat.color">
                {{ stat.change }} aujourd'hui
              </p>
            </div>
          </div>
        </div>

        <!-- Equity Chart -->
        <EquityChart key="chart" />

        <!-- Challenge Progress & Risk Management -->
        <div key="progress" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChallengeProgress />
          <BadgesAchievements />
        </div>

        <!-- Trading Journal -->
        <div key="journal" class="flex gap-6">
          <TradingJournal />
        </div>
      </TransitionGroup>
    </main>

    <!-- Idle Prompts -->
    <Transition name="fade">
      <div v-if="showPrompt" 
           class="fixed bottom-8 right-8 bg-zinc-900/90 backdrop-blur-sm rounded-xl p-4 border border-yellow-400/30 shadow-lg">
        <p class="text-yellow-400">{{ currentPrompt }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIdle } from '@vueuse/core'
import EquityChart from '../components/EquityChart.vue'
import ChallengeProgress from '../components/ChallengeProgress.vue'
import TradingJournal from '../components/TradingJournal.vue'
import BadgesAchievements from '../components/BadgesAchievements.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const showWelcome = ref(true)
const showPrompt = ref(false)
const currentPrompt = ref('')

const prompts = [
  "✨ Did you update today's journal?",
  "🔥 One trade away from your next badge!",
  "📊 Your win rate is improving - keep it up!",
  "⚡ Remember to check your risk levels",
]

const accountStats = [
  { label: 'Balance', value: '€160,000.00', change: '-2.5%', color: 'text-red-400' },
  { label: 'Equity', value: '€157,500.00', change: '-1.8%', color: 'text-red-400' },
  { label: 'Profit/Loss', value: '-€2,500.00', change: null, color: 'text-red-400' },
  { label: 'Drawdown', value: '4.8%', change: '+0.5%', color: 'text-yellow-400' }
]

// Handle welcome message
onMounted(() => {
  setTimeout(() => {
    showWelcome.value = false
  }, 2000)
})

// Handle idle prompts
const { idle } = useIdle(15000) // 15 seconds

watch(idle, (isIdle) => {
  if (isIdle) {
    currentPrompt.value = prompts[Math.floor(Math.random() * prompts.length)]
    showPrompt.value = true
    setTimeout(() => {
      showPrompt.value = false
    }, 5000)
  }
})
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.animate-on-scroll.animate-in {
  opacity: 1;
  transform: translateY(0);
}
</style>