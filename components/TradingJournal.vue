<template>
  <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold text-yellow-400">Journal de Trading</h3>
      <div class="flex gap-2">
        <button @click="previousMonth" class="text-zinc-400 hover:text-yellow-400">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <span class="text-white font-medium">{{ currentMonthDisplay }}</span>
        <button @click="nextMonth" class="text-zinc-400 hover:text-yellow-400">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-5 gap-4 mb-6">
      <div v-for="week in weeks" :key="week.weekNumber" class="space-y-2">
        <div class="text-sm text-zinc-400 font-medium">Semaine {{ week.weekNumber }}</div>
        <div v-for="day in week.days" :key="day.date" 
             @click="selectDay(day)"
             class="bg-zinc-800/50 rounded-lg p-3 cursor-pointer hover:bg-zinc-700/50 transition-colors">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium">{{ formatDay(day.date) }}</span>
            <span :class="day.profit >= 0 ? 'text-green-400' : 'text-red-400'" class="text-sm font-medium">
              {{ formatProfit(day.profit) }}
            </span>
          </div>
          <div class="text-xs text-zinc-400">{{ day.trades }} trades</div>
        </div>
      </div>
    </div>

    <!-- Weekly Summary -->
    <div class="grid grid-cols-5 gap-4 border-t border-zinc-800 pt-4">
      <div v-for="week in weeks" :key="'summary-'+week.weekNumber" class="text-center">
        <div class="text-sm font-medium" :class="week.profit >= 0 ? 'text-green-400' : 'text-red-400'">
          {{ formatProfit(week.profit) }}
        </div>
        <div class="text-xs text-zinc-400">Total</div>
      </div>
    </div>

    <!-- Day Detail Modal -->
    <div v-if="selectedDay" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-zinc-900 rounded-2xl p-6 w-full max-w-3xl">
        <div class="flex justify-between items-center mb-6">
          <h4 class="text-xl font-bold text-yellow-400">
            {{ formatDetailDate(selectedDay.date) }}
          </h4>
          <button @click="selectedDay = null" class="text-zinc-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Drawdown Chart -->
        <div class="h-64 mb-6">
          <Line :data="dayChartData" :options="chartOptions" />
        </div>

        <!-- Trades List -->
        <div class="space-y-4">
          <div v-for="trade in selectedDay.trades" :key="trade.id" 
               class="bg-zinc-800 rounded-lg p-4 flex justify-between items-center">
            <div>
              <div class="font-medium">{{ trade.pair }}</div>
              <div class="text-sm text-zinc-400">{{ trade.type }} • {{ trade.size }} lots</div>
            </div>
            <div class="text-right">
              <div :class="trade.profit >= 0 ? 'text-green-400' : 'text-red-400'" class="font-medium">
                {{ formatProfit(trade.profit) }}
              </div>
              <div class="text-sm text-zinc-400">R:R {{ trade.rr }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const currentMonth = ref(new Date())
const selectedDay = ref(null)

// Sample data - replace with real data from your backend
const weeks = ref([
  {
    weekNumber: 1,
    profit: 2500,
    days: [
      { date: '2025-01-01', profit: 500, trades: 3, drawdown: [0, -200, -100, 500] },
      { date: '2025-01-02', profit: 800, trades: 5, drawdown: [0, -300, 200, 800] },
      { date: '2025-01-03', profit: -300, trades: 2, drawdown: [0, -500, -300] },
      { date: '2025-01-04', profit: 1500, trades: 4, drawdown: [0, -200, 800, 1500] },
      { date: '2025-01-05', profit: 0, trades: 0, drawdown: [0] }
    ]
  },
  // Add more weeks...
])

const currentMonthDisplay = computed(() => {
  return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(currentMonth.value)
})

const dayChartData = computed(() => ({
  labels: selectedDay.value ? Array.from({length: selectedDay.value.drawdown.length}, (_, i) => `Trade ${i+1}`) : [],
  datasets: [{
    label: 'Drawdown',
    data: selectedDay.value?.drawdown || [],
    borderColor: '#facc15',
    tension: 0.4
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
      ticks: { color: '#9ca3af' }
    },
    x: {
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
      ticks: { color: '#9ca3af' }
    }
  },
  plugins: {
    legend: { display: false }
  }
}

function previousMonth() {
  currentMonth.value = new Date(currentMonth.value.setMonth(currentMonth.value.getMonth() - 1))
}

function nextMonth() {
  currentMonth.value = new Date(currentMonth.value.setMonth(currentMonth.value.getMonth() + 1))
}

function selectDay(day) {
  if (day.trades > 0) {
    selectedDay.value = day
  }
}

function formatDay(dateString) {
  return new Date(dateString).getDate()
}

function formatDetailDate(dateString) {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(new Date(dateString))
}

function formatProfit(value) {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    signDisplay: 'always'
  }).format(value)
}
</script>