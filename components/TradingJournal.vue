<template>
  <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
    <!-- Header with month navigation and stats toggle -->
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold text-yellow-400">Journal de Trading</h3>
      <div class="flex items-center gap-4">
        <button @click="previousMonth" class="text-zinc-400 hover:text-yellow-400">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button @click="toggleMonthStats" class="text-white font-medium hover:text-yellow-400">
          {{ currentMonthDisplay }}
        </button>
        <button @click="nextMonth" class="text-zinc-400 hover:text-yellow-400">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Monthly Stats Modal -->
    <div v-if="showMonthStats" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-zinc-900 rounded-2xl p-6 w-full max-w-3xl">
        <div class="flex justify-between items-center mb-6">
          <h4 class="text-xl font-bold text-yellow-400">Statistiques {{ currentMonthDisplay }}</h4>
          <button @click="showMonthStats = false" class="text-zinc-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-zinc-800 p-4 rounded-xl">
            <div class="text-sm text-zinc-400">Profit Total</div>
            <div class="text-xl font-bold" :class="monthlyStats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'">
              {{ formatProfit(monthlyStats.totalProfit) }}
            </div>
          </div>
          <div class="bg-zinc-800 p-4 rounded-xl">
            <div class="text-sm text-zinc-400">Nombre de Trades</div>
            <div class="text-xl font-bold text-white">{{ monthlyStats.totalTrades }}</div>
          </div>
          <div class="bg-zinc-800 p-4 rounded-xl">
            <div class="text-sm text-zinc-400">Win Rate</div>
            <div class="text-xl font-bold text-yellow-400">{{ monthlyStats.winRate }}%</div>
          </div>
          <div class="bg-zinc-800 p-4 rounded-xl">
            <div class="text-sm text-zinc-400">Meilleur Trade</div>
            <div class="text-xl font-bold text-green-400">{{ formatProfit(monthlyStats.bestTrade) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main trading calendar - Full width -->
    <div class="overflow-x-auto mb-8">
      <table class="w-full">
        <thead>
          <tr class="text-sm text-zinc-400">
            <th class="p-2 text-left w-32">Semaine</th>
            <th v-for="day in ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']" 
                :key="day" 
                class="p-2 text-center">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, weekIndex) in currentMonthData" :key="weekIndex" 
              class="border-t border-zinc-800">
            <!-- Week number and total -->
            <td class="p-2">
              <div class="text-zinc-400 font-medium">Semaine {{ week.weekNumber }}</div>
              <div class="text-sm mt-1" :class="getWeekTotal(week) >= 0 ? 'text-green-400' : 'text-red-400'">
                {{ formatProfit(getWeekTotal(week)) }}
              </div>
            </td>
            <!-- Trading days -->
            <td v-for="day in week.days" :key="day.date" class="p-2">
              <div @click="selectDay(day)"
                   class="bg-zinc-800/50 rounded-lg p-3 cursor-pointer hover:bg-zinc-700/50 transition-colors">
                <div class="flex justify-between items-center">
                  <span class="text-sm">{{ formatDayNumber(day.date) }}</span>
                  <span :class="day.profit >= 0 ? 'text-green-400' : 'text-red-400'" class="text-sm font-medium">
                    {{ formatProfit(day.profit) }}
                  </span>
                </div>
                <div class="text-xs text-zinc-400 mt-1">{{ day.trades }} trades</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Recent Trades - Smaller size -->
    <div class="bg-zinc-800/50 rounded-xl p-4">
      <h4 class="text-sm font-medium text-zinc-400 mb-3">Trades Récents</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead class="text-zinc-500">
            <tr>
              <th class="text-left py-2">Paire</th>
              <th class="text-left py-2">Type</th>
              <th class="text-left py-2">Taille</th>
              <th class="text-left py-2">P/L</th>
              <th class="text-left py-2">R:R</th>
              <th class="text-left py-2">Heure</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trade in selectedDay?.tradeList?.slice(0, 5)" :key="trade.id" 
                class="border-t border-zinc-700/30">
              <td class="py-2">{{ trade.pair }}</td>
              <td class="py-2" :class="trade.type === 'BUY' ? 'text-green-400' : 'text-red-400'">
                {{ trade.type }}
              </td>
              <td class="py-2">{{ trade.size }}</td>
              <td class="py-2" :class="trade.profit >= 0 ? 'text-green-400' : 'text-red-400'">
                {{ formatProfit(trade.profit) }}
              </td>
              <td class="py-2 text-zinc-400">{{ trade.rr }}</td>
              <td class="py-2 text-zinc-400">{{ formatTime(trade.time) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Day Detail Modal -->
    <div v-if="selectedDay" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-zinc-900 rounded-2xl p-6 w-full max-w-3xl">
        <div class="flex justify-between items-center mb-6">
          <h4 class="text-xl font-bold text-yellow-400">{{ formatDetailDate(selectedDay.date) }}</h4>
          <button @click="selectedDay = null" class="text-zinc-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="h-64 mb-6">
          <Line :data="dayChartData" :options="chartOptions" />
        </div>
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
const showMonthStats = ref(false)

// Generate sample trade data for the current month
const generateMonthData = () => {
  const weeks = []
  const daysInWeek = 5 // Monday to Friday
  const numWeeks = 4

  for (let week = 1; week <= numWeeks; week++) {
    const days = []
    
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
        rr: (1 + Math.random() * 2).toFixed(1),
        time: new Date(date.setHours(9 + Math.random() * 8)).toISOString()
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
    }

    weeks.push({
      weekNumber: week,
      days
    })
  }

  return weeks
}

const currentMonthData = computed(() => generateMonthData())

const monthlyStats = computed(() => {
  let totalProfit = 0
  let totalTrades = 0
  let winningTrades = 0
  let bestTrade = 0

  currentMonthData.value.forEach(week => {
    week.days.forEach(day => {
      totalProfit += day.profit
      totalTrades += day.trades
      day.tradeList.forEach(trade => {
        if (trade.profit > 0) winningTrades++
        bestTrade = Math.max(bestTrade, trade.profit)
      })
    })
  })

  return {
    totalProfit,
    totalTrades,
    winRate: totalTrades ? Math.round((winningTrades / totalTrades) * 100) : 0,
    bestTrade
  }
})

const getWeekTotal = (week) => {
  return week.days.reduce((total, day) => total + day.profit, 0)
}

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

function toggleMonthStats() {
  showMonthStats.value = !showMonthStats.value
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

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatProfit(value) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    signDisplay: 'always'
  }).format(value)
}
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>