<template>
  <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="text-xl font-bold text-yellow-400">Plan de Trading</h3>
        <p class="text-sm text-zinc-400 mt-1">Semaine {{ currentWeek + 1 }} - {{ isWeekend ? 'Planification active' : 'Exécution uniquement' }}</p>
      </div>
      <div class="flex gap-2">
        <button @click="previousWeek" 
                class="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <span class="px-3 py-2 bg-yellow-400 text-black rounded-lg font-medium text-sm">
          Week {{ currentWeek + 1 }}
        </span>
        <button @click="nextWeek" 
                class="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Week Overview Stats - Compact -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-zinc-800/50 p-3 rounded-xl text-center">
        <div class="text-xl font-bold text-green-400">{{ weekStats.totalTrades }}</div>
        <div class="text-xs text-zinc-400">Trades</div>
      </div>
      <div class="bg-zinc-800/50 p-3 rounded-xl text-center">
        <div class="text-xl font-bold text-yellow-400">{{ weekStats.winRate }}%</div>
        <div class="text-xs text-zinc-400">Win Rate</div>
      </div>
      <div class="bg-zinc-800/50 p-3 rounded-xl text-center">
        <div class="text-xl font-bold" :class="weekStats.pnl >= 0 ? 'text-green-400' : 'text-red-400'">
          {{ weekStats.pnl >= 0 ? '+' : '' }}{{ weekStats.pnl }}%
        </div>
        <div class="text-xs text-zinc-400">P&L</div>
      </div>
    </div>

    <!-- Compact Daily Grid -->
    <div class="grid grid-cols-5 gap-2 mb-6">
      <div v-for="(day, index) in tradingDays" :key="index"
           @click="selectDay(index)"
           :class="[
             'relative p-3 rounded-lg border transition-all duration-300 cursor-pointer text-center',
             selectedDay === index 
               ? 'border-yellow-400 bg-yellow-400/10' 
               : 'border-zinc-700 bg-zinc-800/30 hover:border-zinc-600',
             day.isToday ? 'ring-1 ring-blue-400' : '',
             !isWeekend && !day.canModify ? 'opacity-75' : ''
           ]">
        
        <!-- Day Header -->
        <div class="mb-2">
          <div class="font-bold text-sm">{{ day.shortName }}</div>
          <div class="text-xs text-zinc-400">{{ day.date }}</div>
        </div>

        <!-- Status Indicator -->
        <div class="mb-2 flex justify-center">
          <div v-if="day.status === 'completed'" 
               class="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
            <svg class="w-2 h-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div v-else-if="day.status === 'executed'" 
               class="w-4 h-4 bg-blue-400 rounded-full flex items-center justify-center">
            <svg class="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          <div v-else-if="day.status === 'active'" 
               class="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          <div v-else 
               class="w-4 h-4 bg-zinc-600 rounded-full"></div>
        </div>

        <!-- Quick Stats -->
        <div class="space-y-1">
          <div class="text-xs">
            <span class="text-zinc-400">Plan:</span>
            <span class="font-medium ml-1">{{ day.tradesPlanned }}</span>
          </div>
          <div class="text-xs">
            <span class="text-zinc-400">Exec:</span>
            <span class="font-medium ml-1">{{ day.tradesExecuted }}</span>
          </div>
        </div>

        <!-- Performance Bar -->
        <div class="mt-2 h-1 bg-zinc-700 rounded-full overflow-hidden">
          <div :class="[
            'h-full transition-all duration-500',
            day.tradesExecuted === 0 ? 'bg-zinc-600' :
            day.winRate >= 70 ? 'bg-green-400' :
            day.winRate >= 50 ? 'bg-yellow-400' : 'bg-red-400'
          ]" :style="{ width: `${Math.max(10, day.winRate)}%` }"></div>
        </div>

        <!-- Lock indicator for weekdays when not weekend -->
        <div v-if="!isWeekend && !day.canModify" 
             class="absolute top-1 right-1 text-zinc-500">
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Weekend/Weekday Notice -->
    <div v-if="!isWeekend" class="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div>
          <p class="text-sm font-medium text-blue-400">Mode exécution - Semaine</p>
          <p class="text-xs text-blue-300/80">Planification verrouillée. Vous pouvez seulement marquer les jours comme "exécutés" ou "complétés".</p>
        </div>
      </div>
    </div>

    <div v-else class="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
        <div>
          <p class="text-sm font-medium text-green-400">Mode planification - Week-end</p>
          <p class="text-xs text-green-300/80">Vous pouvez modifier les objectifs pour la semaine prochaine et gérer la semaine actuelle.</p>
        </div>
      </div>
    </div>

    <!-- Selected Day Actions -->
    <div v-if="selectedDay !== null" class="bg-zinc-800/50 rounded-xl p-4">
      <div class="flex justify-between items-center mb-3">
        <h4 class="font-bold text-yellow-400">{{ tradingDays[selectedDay].name }}</h4>
        
        <!-- Weekend: Full editing -->
        <div v-if="isWeekend" class="flex gap-2">
          <button @click="updateCounter(selectedDay, 'planned', -1)"
                  class="w-6 h-6 rounded bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors">
            <svg class="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
            </svg>
          </button>
          <span class="px-2 py-1 bg-zinc-700 rounded text-sm font-medium">{{ tradingDays[selectedDay].tradesPlanned }}</span>
          <button @click="updateCounter(selectedDay, 'planned', 1)"
                  class="w-6 h-6 rounded bg-green-500/20 hover:bg-green-500/30 flex items-center justify-center transition-colors">
            <svg class="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>
        
        <!-- Weekday: Read-only display -->
        <div v-else class="text-sm text-zinc-400">
          Objectif: {{ tradingDays[selectedDay].tradesPlanned }} trades
        </div>
      </div>
      
      <!-- Weekend: Full control buttons -->
      <div v-if="isWeekend" class="flex gap-2">
        <button @click="markDayComplete(selectedDay)"
                :disabled="tradingDays[selectedDay].status === 'completed'"
                class="flex-1 px-3 py-2 bg-green-400 text-black rounded-lg font-medium text-sm hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {{ tradingDays[selectedDay].status === 'completed' ? 'Complété' : 'Marquer complété' }}
        </button>
        <button @click="resetDay(selectedDay)"
                class="px-3 py-2 bg-zinc-700 text-white rounded-lg font-medium text-sm hover:bg-zinc-600 transition-colors">
          Reset
        </button>
      </div>
      
      <!-- Weekday: Limited actions -->
      <div v-else class="flex gap-2">
        <button @click="markDayExecuted(selectedDay)"
                :disabled="tradingDays[selectedDay].status === 'executed' || tradingDays[selectedDay].status === 'completed'"
                class="flex-1 px-3 py-2 bg-blue-400 text-black rounded-lg font-medium text-sm hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {{ tradingDays[selectedDay].status === 'executed' ? 'Exécuté' : 'Marquer exécuté' }}
        </button>
        <button @click="markDayComplete(selectedDay)"
                :disabled="tradingDays[selectedDay].status === 'completed'"
                class="flex-1 px-3 py-2 bg-green-400 text-black rounded-lg font-medium text-sm hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {{ tradingDays[selectedDay].status === 'completed' ? 'Complété' : 'Marquer complété' }}
        </button>
      </div>
    </div>

    <!-- Weekly Summary - Compact -->
    <div class="mt-4 p-4 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-xl border border-yellow-400/20">
      <div class="grid grid-cols-4 gap-4 text-sm">
        <div>
          <div class="text-zinc-400">Complétés</div>
          <div class="font-bold">{{ completedDays }}/5</div>
        </div>
        <div>
          <div class="text-zinc-400">Exécutés</div>
          <div class="font-bold">{{ executedDays }}/5</div>
        </div>
        <div>
          <div class="text-zinc-400">Avg Trades</div>
          <div class="font-bold">{{ avgDailyTrades }}</div>
        </div>
        <div>
          <div class="text-zinc-400">Focus</div>
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

// Check if it's weekend (Saturday or Sunday)
const isWeekend = computed(() => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  return dayOfWeek === 0 || dayOfWeek === 6 // Sunday = 0, Saturday = 6
})

const weekDays = ref([
  {
    name: 'Lundi',
    shortName: 'Lun',
    date: '15',
    isToday: false,
    canModify: false, // Can only modify on weekends
    tradesPlanned: 3,
    tradesExecuted: 2,
    winRate: 75,
    status: 'completed'
  },
  {
    name: 'Mardi',
    shortName: 'Mar',
    date: '16',
    isToday: true,
    canModify: false,
    tradesPlanned: 4,
    tradesExecuted: 1,
    winRate: 100,
    status: 'executed'
  },
  {
    name: 'Mercredi',
    shortName: 'Mer',
    date: '17',
    isToday: false,
    canModify: false,
    tradesPlanned: 2,
    tradesExecuted: 0,
    winRate: 0,
    status: 'pending'
  },
  {
    name: 'Jeudi',
    shortName: 'Jeu',
    date: '18',
    isToday: false,
    canModify: false,
    tradesPlanned: 3,
    tradesExecuted: 0,
    winRate: 0,
    status: 'pending'
  },
  {
    name: 'Vendredi',
    shortName: 'Ven',
    date: '19',
    isToday: false,
    canModify: false,
    tradesPlanned: 2,
    tradesExecuted: 0,
    winRate: 0,
    status: 'pending'
  }
])

// Only trading days (Monday to Friday)
const tradingDays = computed(() => weekDays.value)

const weekStats = computed(() => {
  const totalTrades = tradingDays.value.reduce((sum, day) => sum + day.tradesExecuted, 0)
  const totalWins = tradingDays.value.reduce((sum, day) => sum + Math.floor(day.tradesExecuted * day.winRate / 100), 0)
  const winRate = totalTrades > 0 ? Math.round((totalWins / totalTrades) * 100) : 0
  const pnl = tradingDays.value.reduce((sum, day) => sum + (day.winRate - 50) * 0.1, 0)
  
  return {
    totalTrades,
    winRate,
    pnl: Math.round(pnl * 100) / 100
  }
})

const completedDays = computed(() => {
  return tradingDays.value.filter(day => day.status === 'completed').length
})

const executedDays = computed(() => {
  return tradingDays.value.filter(day => day.status === 'executed' || day.status === 'completed').length
})

const avgDailyTrades = computed(() => {
  const activeDays = tradingDays.value.filter(day => day.tradesExecuted > 0)
  if (activeDays.length === 0) return 0
  const total = activeDays.reduce((sum, day) => sum + day.tradesExecuted, 0)
  return Math.round((total / activeDays.length) * 10) / 10
})

const focusArea = computed(() => {
  const areas = ['Risk Management', 'Entry Timing', 'Exit Strategy', 'Market Analysis', 'Psychology']
  return areas[currentWeek.value % areas.length]
})

function selectDay(index) {
  selectedDay.value = selectedDay.value === index ? null : index
}

function updateCounter(dayIndex, type, delta) {
  // Only allow editing on weekends
  if (!isWeekend.value) return
  
  const day = tradingDays.value[dayIndex]
  if (type === 'planned') {
    day.tradesPlanned = Math.max(0, day.tradesPlanned + delta)
  } else if (type === 'executed') {
    day.tradesExecuted = Math.max(0, Math.min(day.tradesPlanned, day.tradesExecuted + delta))
    if (day.tradesExecuted > 0) {
      day.winRate = Math.round((Math.random() * 40 + 50))
    } else {
      day.winRate = 0
    }
  }
}

function markDayExecuted(dayIndex) {
  tradingDays.value[dayIndex].status = 'executed'
  // Simulate some trading activity
  const day = tradingDays.value[dayIndex]
  if (day.tradesExecuted === 0) {
    day.tradesExecuted = Math.min(day.tradesPlanned, Math.floor(Math.random() * 3) + 1)
    day.winRate = Math.round((Math.random() * 40 + 50))
  }
}

function markDayComplete(dayIndex) {
  tradingDays.value[dayIndex].status = 'completed'
}

function resetDay(dayIndex) {
  // Only allow reset on weekends
  if (!isWeekend.value) return
  
  const day = tradingDays.value[dayIndex]
  day.tradesPlanned = 0
  day.tradesExecuted = 0
  day.winRate = 0
  day.status = 'pending'
}

function previousWeek() {
  currentWeek.value = Math.max(0, currentWeek.value - 1)
}

function nextWeek() {
  currentWeek.value++
}

onMounted(() => {
  const todayIndex = tradingDays.value.findIndex(day => day.isToday)
  if (todayIndex !== -1) {
    selectedDay.value = todayIndex
  }
})
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>