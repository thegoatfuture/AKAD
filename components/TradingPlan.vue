<template>
  <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="text-xl font-bold text-yellow-400">7-Day Trading Plan</h3>
        <p class="text-sm text-zinc-400 mt-1">Plan your week and track your progress</p>
      </div>
      <div class="flex gap-2">
        <button @click="currentWeek = Math.max(0, currentWeek - 1)" 
                class="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <span class="px-3 py-2 bg-yellow-400 text-black rounded-lg font-medium text-sm">
          Week {{ currentWeek + 1 }}
        </span>
        <button @click="currentWeek++" 
                class="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Week Overview Stats -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-zinc-800/50 p-4 rounded-xl text-center">
        <div class="text-2xl font-bold text-green-400">{{ weekStats.totalTrades }}</div>
        <div class="text-xs text-zinc-400">Total Trades</div>
      </div>
      <div class="bg-zinc-800/50 p-4 rounded-xl text-center">
        <div class="text-2xl font-bold text-yellow-400">{{ weekStats.winRate }}%</div>
        <div class="text-xs text-zinc-400">Win Rate</div>
      </div>
      <div class="bg-zinc-800/50 p-4 rounded-xl text-center">
        <div class="text-2xl font-bold" :class="weekStats.pnl >= 0 ? 'text-green-400' : 'text-red-400'">
          {{ weekStats.pnl >= 0 ? '+' : '' }}{{ weekStats.pnl }}%
        </div>
        <div class="text-xs text-zinc-400">P&L</div>
      </div>
    </div>

    <!-- Daily Trading Plan Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-7 gap-4">
      <div v-for="(day, index) in weekDays" :key="index"
           @click="selectDay(index)"
           :class="[
             'relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105',
             selectedDay === index 
               ? 'border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20' 
               : 'border-zinc-700 bg-zinc-800/30 hover:border-zinc-600',
             day.isToday ? 'ring-2 ring-blue-400' : '',
             day.isWeekend ? 'opacity-60' : ''
           ]">
        
        <!-- Day Header -->
        <div class="flex justify-between items-center mb-3">
          <div>
            <div class="font-bold text-sm">{{ day.name }}</div>
            <div class="text-xs text-zinc-400">{{ day.date }}</div>
          </div>
          <div v-if="day.isToday" class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </div>

        <!-- Market Session Indicator -->
        <div v-if="!day.isWeekend" class="mb-3">
          <div class="flex items-center gap-2 text-xs">
            <div :class="[
              'w-2 h-2 rounded-full',
              day.marketStatus === 'open' ? 'bg-green-400 animate-pulse' : 
              day.marketStatus === 'pre' ? 'bg-yellow-400' : 'bg-red-400'
            ]"></div>
            <span class="text-zinc-400">{{ day.marketStatusText }}</span>
          </div>
        </div>

        <!-- Trading Counters -->
        <div v-if="!day.isWeekend" class="space-y-3">
          <!-- Trades Planned -->
          <div class="bg-zinc-800/50 p-3 rounded-lg">
            <div class="text-xs text-zinc-400 mb-2">Trades Planned</div>
            <div class="flex items-center justify-between">
              <button @click.stop="updateCounter(index, 'planned', -1)"
                      class="w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors">
                <svg class="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                </svg>
              </button>
              <span class="font-bold text-lg">{{ day.tradesPlanned }}</span>
              <button @click.stop="updateCounter(index, 'planned', 1)"
                      class="w-6 h-6 rounded-full bg-green-500/20 hover:bg-green-500/30 flex items-center justify-center transition-colors">
                <svg class="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Trades Executed -->
          <div class="bg-zinc-800/50 p-3 rounded-lg">
            <div class="text-xs text-zinc-400 mb-2">Trades Executed</div>
            <div class="flex items-center justify-between">
              <button @click.stop="updateCounter(index, 'executed', -1)"
                      class="w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors">
                <svg class="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                </svg>
              </button>
              <span class="font-bold text-lg">{{ day.tradesExecuted }}</span>
              <button @click.stop="updateCounter(index, 'executed', 1)"
                      class="w-6 h-6 rounded-full bg-green-500/20 hover:bg-green-500/30 flex items-center justify-center transition-colors">
                <svg class="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Win/Loss Indicator -->
          <div class="flex justify-center">
            <div :class="[
              'w-full h-2 rounded-full transition-all duration-500',
              day.tradesExecuted === 0 ? 'bg-zinc-700' :
              day.winRate >= 70 ? 'bg-green-400' :
              day.winRate >= 50 ? 'bg-yellow-400' : 'bg-red-400'
            ]" :style="{ width: `${Math.max(20, day.winRate)}%` }"></div>
          </div>
        </div>

        <!-- Weekend Message -->
        <div v-else class="text-center py-4">
          <div class="text-2xl mb-2">🏖️</div>
          <div class="text-xs text-zinc-400">Market Closed</div>
          <div class="text-xs text-zinc-500">Rest & Analysis</div>
        </div>

        <!-- Day Status Badge -->
        <div class="absolute -top-2 -right-2">
          <div v-if="day.status === 'completed'" 
               class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
            <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div v-else-if="day.status === 'active'" 
               class="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
            <div class="w-2 h-2 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected Day Details -->
    <div v-if="selectedDay !== null" class="mt-6 p-4 bg-zinc-800/50 rounded-xl border border-yellow-400/20">
      <h4 class="font-bold text-yellow-400 mb-3">{{ weekDays[selectedDay].name }} Details</h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Trading Notes -->
        <div>
          <label class="block text-sm font-medium text-zinc-400 mb-2">Trading Notes</label>
          <textarea v-model="weekDays[selectedDay].notes"
                    class="w-full h-20 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400 resize-none"
                    placeholder="Add your trading notes for this day..."></textarea>
        </div>

        <!-- Market Analysis -->
        <div>
          <label class="block text-sm font-medium text-zinc-400 mb-2">Market Analysis</label>
          <textarea v-model="weekDays[selectedDay].analysis"
                    class="w-full h-20 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400 resize-none"
                    placeholder="Market conditions, key levels, news..."></textarea>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="flex gap-2 mt-4">
        <button @click="markDayComplete(selectedDay)"
                :disabled="weekDays[selectedDay].status === 'completed'"
                class="px-4 py-2 bg-green-400 text-black rounded-lg font-medium text-sm hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {{ weekDays[selectedDay].status === 'completed' ? 'Completed' : 'Mark Complete' }}
        </button>
        <button @click="resetDay(selectedDay)"
                class="px-4 py-2 bg-zinc-700 text-white rounded-lg font-medium text-sm hover:bg-zinc-600 transition-colors">
          Reset Day
        </button>
      </div>
    </div>

    <!-- Weekly Summary -->
    <div class="mt-6 p-4 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-xl border border-yellow-400/20">
      <h4 class="font-bold text-yellow-400 mb-3">Weekly Progress</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <div class="text-zinc-400">Days Completed</div>
          <div class="font-bold">{{ completedDays }}/5</div>
        </div>
        <div>
          <div class="text-zinc-400">Avg Daily Trades</div>
          <div class="font-bold">{{ avgDailyTrades }}</div>
        </div>
        <div>
          <div class="text-zinc-400">Best Day</div>
          <div class="font-bold text-green-400">{{ bestDay }}</div>
        </div>
        <div>
          <div class="text-zinc-400">Focus Area</div>
          <div class="font-bold text-yellow-400">{{ focusArea }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const currentWeek = ref(0)
const selectedDay = ref(null)

const weekDays = ref([
  {
    name: 'Monday',
    date: 'Jan 15',
    isToday: false,
    isWeekend: false,
    tradesPlanned: 3,
    tradesExecuted: 2,
    winRate: 75,
    status: 'completed',
    marketStatus: 'open',
    marketStatusText: 'Market Open',
    notes: 'Good momentum in EUR/USD',
    analysis: 'Bullish trend continuation expected'
  },
  {
    name: 'Tuesday',
    date: 'Jan 16',
    isToday: true,
    isWeekend: false,
    tradesPlanned: 4,
    tradesExecuted: 1,
    winRate: 100,
    status: 'active',
    marketStatus: 'open',
    marketStatusText: 'Market Open',
    notes: '',
    analysis: ''
  },
  {
    name: 'Wednesday',
    date: 'Jan 17',
    isToday: false,
    isWeekend: false,
    tradesPlanned: 2,
    tradesExecuted: 0,
    winRate: 0,
    status: 'pending',
    marketStatus: 'pre',
    marketStatusText: 'Pre-Market',
    notes: '',
    analysis: ''
  },
  {
    name: 'Thursday',
    date: 'Jan 18',
    isToday: false,
    isWeekend: false,
    tradesPlanned: 3,
    tradesExecuted: 0,
    winRate: 0,
    status: 'pending',
    marketStatus: 'closed',
    marketStatusText: 'Market Closed',
    notes: '',
    analysis: ''
  },
  {
    name: 'Friday',
    date: 'Jan 19',
    isToday: false,
    isWeekend: false,
    tradesPlanned: 2,
    tradesExecuted: 0,
    winRate: 0,
    status: 'pending',
    marketStatus: 'closed',
    marketStatusText: 'Market Closed',
    notes: '',
    analysis: ''
  },
  {
    name: 'Saturday',
    date: 'Jan 20',
    isToday: false,
    isWeekend: true,
    tradesPlanned: 0,
    tradesExecuted: 0,
    winRate: 0,
    status: 'weekend',
    marketStatus: 'closed',
    marketStatusText: 'Weekend',
    notes: '',
    analysis: ''
  },
  {
    name: 'Sunday',
    date: 'Jan 21',
    isToday: false,
    isWeekend: true,
    tradesPlanned: 0,
    tradesExecuted: 0,
    winRate: 0,
    status: 'weekend',
    marketStatus: 'closed',
    marketStatusText: 'Weekend',
    notes: '',
    analysis: ''
  }
])

const weekStats = computed(() => {
  const tradingDays = weekDays.value.filter(day => !day.isWeekend)
  const totalTrades = tradingDays.reduce((sum, day) => sum + day.tradesExecuted, 0)
  const totalWins = tradingDays.reduce((sum, day) => sum + Math.floor(day.tradesExecuted * day.winRate / 100), 0)
  const winRate = totalTrades > 0 ? Math.round((totalWins / totalTrades) * 100) : 0
  const pnl = tradingDays.reduce((sum, day) => sum + (day.winRate - 50) * 0.1, 0)
  
  return {
    totalTrades,
    winRate,
    pnl: Math.round(pnl * 100) / 100
  }
})

const completedDays = computed(() => {
  return weekDays.value.filter(day => day.status === 'completed' && !day.isWeekend).length
})

const avgDailyTrades = computed(() => {
  const tradingDays = weekDays.value.filter(day => !day.isWeekend && day.tradesExecuted > 0)
  if (tradingDays.length === 0) return 0
  const total = tradingDays.reduce((sum, day) => sum + day.tradesExecuted, 0)
  return Math.round((total / tradingDays.length) * 10) / 10
})

const bestDay = computed(() => {
  const tradingDays = weekDays.value.filter(day => !day.isWeekend && day.tradesExecuted > 0)
  if (tradingDays.length === 0) return 'N/A'
  const best = tradingDays.reduce((best, day) => day.winRate > best.winRate ? day : best)
  return best.name
})

const focusArea = computed(() => {
  const areas = ['Risk Management', 'Entry Timing', 'Exit Strategy', 'Market Analysis', 'Psychology']
  return areas[currentWeek.value % areas.length]
})

function selectDay(index) {
  selectedDay.value = selectedDay.value === index ? null : index
}

function updateCounter(dayIndex, type, delta) {
  const day = weekDays.value[dayIndex]
  if (type === 'planned') {
    day.tradesPlanned = Math.max(0, day.tradesPlanned + delta)
  } else if (type === 'executed') {
    day.tradesExecuted = Math.max(0, Math.min(day.tradesPlanned, day.tradesExecuted + delta))
    // Update win rate based on executed trades
    if (day.tradesExecuted > 0) {
      day.winRate = Math.round((Math.random() * 40 + 50)) // Simulate win rate between 50-90%
    } else {
      day.winRate = 0
    }
  }
}

function markDayComplete(dayIndex) {
  weekDays.value[dayIndex].status = 'completed'
}

function resetDay(dayIndex) {
  const day = weekDays.value[dayIndex]
  day.tradesPlanned = 0
  day.tradesExecuted = 0
  day.winRate = 0
  day.status = 'pending'
  day.notes = ''
  day.analysis = ''
}

onMounted(() => {
  // Auto-select today
  const todayIndex = weekDays.value.findIndex(day => day.isToday)
  if (todayIndex !== -1) {
    selectedDay.value = todayIndex
  }
})
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0,-8px,0);
  }
  70% {
    transform: translate3d(0,-4px,0);
  }
  90% {
    transform: translate3d(0,-2px,0);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>