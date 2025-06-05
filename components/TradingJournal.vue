<template>
  <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
    <!-- Header with month navigation -->
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold text-yellow-400">Journal de Trading</h3>
      <div class="flex items-center gap-4">
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

    <!-- Weekly columns -->
    <div class="grid grid-cols-4 gap-4">
      <div v-for="week in currentMonthData" :key="week.weekNumber" class="space-y-2">
        <div class="text-sm text-zinc-400">Semaine {{ week.weekNumber }}</div>
        
        <!-- Trading days -->
        <div v-for="day in week.days" :key="day.date" 
             @click="selectDay(day)"
             class="bg-zinc-800/50 rounded-lg p-3 cursor-pointer hover:bg-zinc-700/50 transition-colors">
          <div class="flex justify-between items-center">
            <span class="text-sm">{{ formatDayNumber(day.date) }}</span>
            <span :class="day.profit >= 0 ? 'text-green-400' : 'text-red-400'" class="text-sm font-medium">
              {{ formatProfit(day.profit) }}
            </span>
          </div>
          <div class="text-xs text-zinc-400 mt-1">{{ day.trades }} trades</div>
        </div>

        <!-- Weekly summary -->
        <div class="border-t border-zinc-800 mt-4 pt-4">
          <div class="text-sm font-medium" :class="week.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'">
            {{ formatProfit(week.totalProfit) }}
          </div>
          <div class="text-xs text-zinc-400">Total</div>
        </div>
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
        <div class="space-y-3">
          <div v-for="trade in selectedDay.tradeList" :key="trade.id" 
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

// Generate sample trade data for the current month
const generateMonthData = () => {
  const weeks = []
  const daysInWeek = 5 // Monday to Friday
  const numWeeks = 4

  for (let week = 1; week <= numWeeks; week++) {
    const days = []
    let weekTotal = 0

    for (let day = 1; day <= daysInWeek; day++) {
      const date = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), (week - 1) * 7 + day)
      const trades = Math.floor(Math.random() * 6) // 0-5 trades per day
      const profit = trades === 0 ? 0 : Math.floor((Math.random() * 2000) - 1000) // -1000 to +1000
      
      const tradeList = Array.from({ length: trades }, (_, i) => ({
        id: `${date.getTime()}-${i}`,
        pair: ['EUR/USD', 'GBP/JPY', 'BTC/USD', 'ETH/USD'][Math.floor(Math.random() * 4)],
        type: Math.random() > 0.5 ? 'BUY' : 'SELL',
        size: (Math.random() * 2).toFixed(2),
        profit: Math.floor((Math.random() * 1000) - 500),
        rr: (1 + Math.random() * 2).toFixed(1)
      }))

      const drawdown = [0]
      let currentDD = 0
      tradeList.forEach(trade => {
        currentDD += trade.profit
        drawdown.push(currentDD)
      })

      days.push({
        date,
        profit,
        trades,
        tradeList,
        drawdown
      })

      weekTotal += profit
    }

    weeks.push({
      weekNumber: week,
      days,
      totalProfit: weekTotal
    })
  }

  return weeks
}

const currentMonthData = computed(() => generateMonthData())

const currentMonthDisplay = computed(() => {
  return new Intl.DateTimeFormat('fr-FR', { 
    month: 'long',
    year: 'numeric'
  }).format(currentMonth.value)
})

const dayChartData = computed(() => ({
  labels: selectedDay.value ? Array.from({ length: selectedDay.value.drawdown.length }, (_, i) => `Trade ${i}`) : [],
  datasets: [{
    label: 'Drawdown',
    data: selectedDay.value?.drawdown || [],
    borderColor: '#facc15',
    backgroundColor: 'rgba(250, 204, 21, 0.1)',
    fill: true,
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

function formatDayNumber(date) {
  return date.getDate()
}

function formatDetailDate(date) {
  return new Intl.DateTimeFormat('fr-FR', { 
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(date)
}

function formatProfit(value) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    signDisplay: 'always'
  }).format(value)
}
</script>