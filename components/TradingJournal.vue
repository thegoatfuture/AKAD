<template>
  <div class="flex gap-6">
    <!-- Recent Trades Sidebar -->
    <div class="w-80 bg-zinc-900/80 backdrop-blur rounded-2xl p-4 border border-zinc-800/50 h-fit">
      <h4 class="text-sm font-medium text-zinc-400 mb-3">Trades Récents</h4>
      <div class="space-y-3">
        <div v-for="trade in recentTrades" :key="trade.id" 
             class="bg-zinc-800/50 rounded-lg p-3">
          <div class="flex justify-between items-center mb-1">
            <span class="font-medium">{{ trade.pair }}</span>
            <span :class="trade.profit >= 0 ? 'text-green-400' : 'text-red-400'">
              {{ formatProfit(trade.profit) }}
            </span>
          </div>
          <div class="flex justify-between text-sm text-zinc-500">
            <span>{{ trade.type }} • {{ trade.size }}</span>
            <span>{{ formatTime(trade.time) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Trading Journal -->
    <div class="flex-1 bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
      <!-- Header with month navigation -->
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

      <!-- Trading Calendar -->
      <div class="w-full">
        <table class="w-full">
          <thead>
            <tr>
              <th class="p-3 text-left w-40 text-zinc-400">Semaine</th>
              <th class="p-3 text-zinc-400 text-center text-zinc-600">Sam</th>
              <th class="p-3 text-zinc-400 text-center text-zinc-600">Dim</th>
              <th v-for="(date, index) in weekDays" :key="index" class="p-3 text-zinc-400 text-center">
                {{ formatWeekDay(date) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, weekIndex) in calendarDays" :key="weekIndex" 
                class="border-t border-zinc-800">
              <td class="p-3">
                <div class="flex flex-col">
                  <span class="text-zinc-400">Semaine {{ weekIndex + 1 }}</span>
                  <span :class="getWeekTotal(week) >= 0 ? 'text-green-400' : 'text-red-400'" class="font-medium">
                    {{ formatProfit(getWeekTotal(week)) }}
                  </span>
                </div>
              </td>
              <!-- Weekend days -->
              <td v-for="i in 2" :key="`weekend-${i}`" class="p-3">
                <div class="bg-zinc-800/20 rounded-xl p-4 opacity-50">
                  <div class="text-zinc-600">{{ i === 1 ? 'Sam' : 'Dim' }}</div>
                </div>
              </td>
              <!-- Weekdays -->
              <td v-for="(day, dayIndex) in week" :key="dayIndex" class="p-3">
                <div v-if="day" 
                     @click="selectDay(day)"
                     :class="[
                       'bg-zinc-800/50 rounded-xl p-4 cursor-pointer hover:bg-zinc-700/50 transition-all duration-300 transform hover:-translate-y-1',
                       {'opacity-50': !isCurrentMonth(day.date)}
                     ]">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-zinc-400">{{ formatDayNumber(day.date) }}</span>
                    <span :class="day.profit >= 0 ? 'text-green-400' : 'text-red-400'" class="font-medium">
                      {{ formatProfit(day.profit) }}
                    </span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-zinc-500">
                    <span>{{ day.trades }} trades</span>
                    <span v-if="day.trades > 0" class="text-xs">
                      (Win: {{ getWinRate(day.tradeList) }}%)
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Monthly Stats Modal -->
    <div v-if="showMonthStats" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-zinc-900 rounded-2xl p-6 w-full max-w-4xl">
        <div class="flex justify-between items-center mb-6">
          <h4 class="text-xl font-bold text-yellow-400">Statistiques {{ currentMonthDisplay }}</h4>
          <button @click="showMonthStats = false" class="text-zinc-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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

        <div class="h-64 mb-6">
          <Line :data="monthlyChartData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <!-- Day Detail Modal -->
    <div v-if="selectedDay" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-zinc-900 rounded-2xl p-6 w-full max-w-4xl">
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

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-zinc-800 p-4 rounded-xl">
            <div class="text-sm text-zinc-400">Profit du jour</div>
            <div class="text-xl font-bold" :class="selectedDay.profit >= 0 ? 'text-green-400' : 'text-red-400'">
              {{ formatProfit(selectedDay.profit) }}
            </div>
          </div>
          <div class="bg-zinc-800 p-4 rounded-xl">
            <div class="text-sm text-zinc-400">Win Rate</div>
            <div class="text-xl font-bold text-yellow-400">
              {{ getWinRate(selectedDay.tradeList) }}%
            </div>
          </div>
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

        <!-- Notes Section -->
        <div class="mt-6">
          <label class="block text-sm font-medium text-zinc-400 mb-2">Notes du jour</label>
          <textarea
            v-model="selectedDay.notes"
            rows="3"
            class="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white resize-none focus:outline-none focus:border-yellow-400"
            placeholder="Ajoutez vos notes pour cette journée..."
          ></textarea>
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

const currentMonth = ref(new Date(2025, 0, 1)) // Start with January 2025
const selectedDay = ref(null)
const showMonthStats = ref(false)

const weekDays = computed(() => {
  const days = []
  const date = new Date(currentMonth.value)
  date.setDate(1)
  
  // Find first Monday
  while (date.getDay() !== 1) {
    date.setDate(date.getDate() - 1)
  }
  
  // Get all 7 days of the week
  for (let i = 0; i < 7; i++) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  
  return days
})

const calendarDays = computed(() => {
  const weeks = []
  const firstDay = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), 1)
  const lastDay = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 0)
  
  // Find first Monday
  let startDate = new Date(firstDay)
  while (startDate.getDay() !== 1) {
    startDate.setDate(startDate.getDate() - 1)
  }
  
  // Generate weeks until we pass the last day of the month
  while (startDate <= lastDay) {
    const week = []
    
    // Add all 7 days of the week
    for (let i = 0; i < 7; i++) {
      if (startDate.getDay() === 0 || startDate.getDay() === 6) {
        // Weekend days - add empty placeholder with date
        week.push({
          date: new Date(startDate),
          isWeekend: true,
          profit: 0,
          trades: 0,
          tradeList: []
        })
      } else {
        week.push(generateDayData(new Date(startDate)))
      }
      startDate.setDate(startDate.getDate() + 1)
    }
    
    weeks.push(week)
    
    // Stop if we've gone past the end of the month and have a complete week
    if (startDate > lastDay && startDate.getDay() === 1) break
  }
  
  return weeks
})

function generateDayData(date) {
  const trades = Math.floor(Math.random() * 6)
  const profit = trades === 0 ? 0 : Math.floor((Math.random() * 2000) - 1000)
  
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

  return {
    date,
    profit,
    trades,
    tradeList,
    drawdown,
    notes: ''
  }
}

const recentTrades = computed(() => {
  const allTrades = []
  calendarDays.value.forEach(week => {
    week.forEach(day => {
      if (day) allTrades.push(...day.tradeList)
    })
  })
  return allTrades
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 5)
})

const monthlyStats = computed(() => {
  let totalProfit = 0
  let totalTrades = 0
  let winningTrades = 0
  let bestTrade = 0
  const dailyProfits = []

  calendarDays.value.forEach(week => {
    week.forEach(day => {
      if (day && isCurrentMonth(day.date)) {
        totalProfit += day.profit
        totalTrades += day.trades
        dailyProfits.push(day.profit)
        day.tradeList.forEach(trade => {
          if (trade.profit > 0) winningTrades++
          bestTrade = Math.max(bestTrade, trade.profit)
        })
      }
    })
  })

  return {
    totalProfit,
    totalTrades,
    winRate: totalTrades ? Math.round((winningTrades / totalTrades) * 100) : 0,
    bestTrade,
    dailyProfits
  }
})

const monthlyChartData = computed(() => ({
  labels: monthlyStats.value.dailyProfits.map((_, i) => `Jour ${i + 1}`),
  datasets: [{
    label: 'Profit journalier',
    data: monthlyStats.value.dailyProfits,
    borderColor: '#facc15',
    backgroundColor: 'rgba(250, 204, 21, 0.1)',
    fill: true,
    tension: 0.4
  }]
}))

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

function isCurrentMonth(date) {
  return date.getMonth() === currentMonth.value.getMonth() &&
         date.getFullYear() === currentMonth.value.getFullYear()
}

function getWeekTotal(week) {
  return week.reduce((total, day) => total + (day ? day.profit : 0), 0)
}

function getWinRate(trades) {
  if (!trades?.length) return 0
  const winningTrades = trades.filter(t => t.profit > 0).length
  return Math.round((winningTrades / trades.length) * 100)
}

function formatWeekDay(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
    day: 'numeric'
  }).format(date)
}

function formatDayNumber(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric'
  }).format(date)
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

const currentMonthDisplay = computed(() => {
  return new Intl.DateTimeFormat('fr-FR', { 
    month: 'long',
    year: 'numeric'
  }).format(currentMonth.value)
})
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>