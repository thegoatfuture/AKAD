<template>
  <div class="flex gap-6">
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
          <button @click="showMonthStats = true" class="text-white font-medium hover:text-yellow-400">
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
              <th class="p-2 text-zinc-500 text-center text-sm w-16">Sam</th>
              <th v-for="day in ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven']" 
                  :key="day" 
                  class="p-3 text-zinc-400 text-center">
                {{ day }}
              </th>
              <th class="p-2 text-zinc-500 text-center text-sm w-16">Dim</th>
              <th class="p-3 text-zinc-400 text-center w-48">Résumé</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, weekIndex) in monthData" :key="weekIndex" 
                class="border-t border-zinc-800">
              <td class="p-3">
                <button @click="showWeekStats(week)" 
                        class="flex flex-col hover:bg-zinc-800/30 p-2 rounded-lg transition-colors w-full">
                  <span class="text-zinc-400">Semaine {{ week.weekNumber }}</span>
                  <span :class="week.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'" class="font-medium">
                    {{ formatProfit(week.totalPnL) }}
                  </span>
                </button>
              </td>
              <!-- Saturday placeholder -->
              <td class="p-2">
                <div class="bg-zinc-800/20 rounded-lg p-2 text-center text-xs text-zinc-600">
                  {{ formatDayNumber(week.saturday) }}
                </div>
              </td>
              <!-- Trading days -->
              <td v-for="day in week.tradingDays" :key="day.date" class="p-2">
                <div v-if="day.isCurrentMonth"
                     @click="selectDay(day)"
                     :class="[
                       'rounded-xl p-3 cursor-pointer transition-all duration-300 transform hover:-translate-y-1',
                       day.profit > 0 ? 'bg-green-900/20' : day.profit < 0 ? 'bg-red-900/20' : 'bg-zinc-800/30',
                       day.isToday ? 'border-2 border-yellow-400' : ''
                     ]">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-zinc-400">{{ formatDayNumber(day.date) }}</span>
                    <span :class="day.profit >= 0 ? 'text-green-400' : 'text-red-400'" class="font-medium">
                      {{ formatProfit(day.profit) }}
                    </span>
                  </div>
                  <div class="flex items-center gap-2 text-xs text-zinc-500">
                    <span>{{ day.trades }} trades</span>
                    <span v-if="day.trades > 0">({{ day.winRate }}%)</span>
                  </div>
                </div>
                <div v-else class="bg-zinc-800/20 rounded-lg p-2 text-center text-xs text-zinc-600">
                  {{ formatDayNumber(day.date) }}
                </div>
              </td>
              <!-- Sunday placeholder -->
              <td class="p-2">
                <div class="bg-zinc-800/20 rounded-lg p-2 text-center text-xs text-zinc-600">
                  {{ formatDayNumber(week.sunday) }}
                </div>
              </td>
              <!-- Weekly summary -->
              <td class="p-3">
                <div class="bg-zinc-800/30 rounded-lg p-3">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-zinc-400">Win Rate</span>
                    <span class="text-yellow-400">{{ week.weeklyWinRate }}%</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-zinc-400">Trades</span>
                    <span class="text-white">{{ week.totalTrades }}</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

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

    <!-- Monthly Stats Modal -->
    <div v-if="showMonthStats" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
         @click.self="showMonthStats = false">
      <div class="bg-zinc-900 rounded-2xl p-8 w-full max-w-5xl">
        <div class="flex justify-between items-center mb-8">
          <h3 class="text-2xl font-bold text-yellow-400">
            Performance {{ currentMonthDisplay }}
          </h3>
          <button @click="showMonthStats = false" class="text-zinc-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Monthly Stats Grid -->
        <div class="grid grid-cols-4 gap-6 mb-8">
          <div v-for="stat in monthlyStats" :key="stat.label" 
               class="bg-zinc-800 rounded-xl p-4">
            <div class="text-sm text-zinc-400 mb-1">{{ stat.label }}</div>
            <div :class="stat.color" class="text-xl font-bold">{{ stat.value }}</div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-2 gap-6 mb-8">
          <div class="bg-zinc-800 rounded-xl p-4">
            <h4 class="text-sm font-medium text-zinc-400 mb-4">Equity Curve</h4>
            <div class="h-64">
              <Line :data="monthlyEquityData" :options="chartOptions" />
            </div>
          </div>
          <div class="bg-zinc-800 rounded-xl p-4">
            <h4 class="text-sm font-medium text-zinc-400 mb-4">Performance par Semaine</h4>
            <div class="h-64">
              <Bar :data="weeklyPerformanceData" :options="chartOptions" />
            </div>
          </div>
        </div>

        <!-- Additional Stats -->
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-zinc-800 rounded-xl p-4">
            <h4 class="text-sm font-medium text-zinc-400 mb-4">Distribution des Trades</h4>
            <div class="h-48">
              <Doughnut :data="tradeDistributionData" :options="donutOptions" />
            </div>
          </div>
          <div class="bg-zinc-800 rounded-xl p-4">
            <h4 class="text-sm font-medium text-zinc-400 mb-4">Meilleurs/Pires Trades</h4>
            <div class="space-y-2">
              <div v-for="trade in bestWorstTrades" :key="trade.id"
                   class="flex justify-between items-center p-2 rounded bg-zinc-700/30">
                <span class="text-sm">{{ trade.pair }}</span>
                <span :class="trade.profit >= 0 ? 'text-green-400' : 'text-red-400'" class="font-medium">
                  {{ formatProfit(trade.profit) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Stats Modal -->
    <div v-if="selectedWeek" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
         @click.self="selectedWeek = null">
      <div class="bg-zinc-900 rounded-2xl p-8 w-full max-w-4xl">
        <div class="flex justify-between items-center mb-8">
          <h3 class="text-2xl font-bold text-yellow-400">
            Semaine {{ selectedWeek.weekNumber }} - {{ currentMonthDisplay }}
          </h3>
          <button @click="selectedWeek = null" class="text-zinc-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Weekly Stats Grid -->
        <div class="grid grid-cols-4 gap-6 mb-8">
          <div v-for="stat in weeklyStats" :key="stat.label" 
               class="bg-zinc-800 rounded-xl p-4">
            <div class="text-sm text-zinc-400 mb-1">{{ stat.label }}</div>
            <div :class="stat.color" class="text-xl font-bold">{{ stat.value }}</div>
          </div>
        </div>

        <!-- Weekly Chart -->
        <div class="bg-zinc-800 rounded-xl p-4 mb-8">
          <h4 class="text-sm font-medium text-zinc-400 mb-4">Performance de la Semaine</h4>
          <div class="h-64">
            <Line :data="weeklyChartData" :options="chartOptions" />
          </div>
        </div>

        <!-- Daily Breakdown -->
        <div class="bg-zinc-800 rounded-xl p-4">
          <h4 class="text-sm font-medium text-zinc-400 mb-4">Détail par Jour</h4>
          <div class="space-y-2">
            <div v-for="day in selectedWeek.tradingDays" :key="day.date"
                 class="flex justify-between items-center p-3 rounded bg-zinc-700/30">
              <div>
                <div class="font-medium">{{ formatDetailDate(day.date) }}</div>
                <div class="text-sm text-zinc-400">{{ day.trades }} trades ({{ day.winRate }}% win)</div>
              </div>
              <div :class="day.profit >= 0 ? 'text-green-400' : 'text-red-400'" class="font-bold">
                {{ formatProfit(day.profit) }}
              </div>
            </div>
          </div>
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

        <div class="space-y-3">
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
import { Line, Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const currentMonth = ref(new Date())
const selectedDay = ref(null)
const selectedWeek = ref(null)
const showMonthStats = ref(false)

// Get the first and last day of the month
const getMonthBounds = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return { firstDay, lastDay }
}

// Get the previous Saturday for a given date
const getPreviousSaturday = (date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? 1 : day + 1
  d.setDate(d.getDate() - diff)
  return d
}

// Get the next Sunday for a given date
const getNextSunday = (date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? 0 : 7 - day
  d.setDate(d.getDate() + diff)
  return d
}

// Generate month data with real calendar dates
const monthData = computed(() => {
  const { firstDay, lastDay } = getMonthBounds(currentMonth.value)
  const weeks = []
  let currentDate = getPreviousSaturday(firstDay)
  
  while (currentDate <= lastDay) {
    const week = {
      weekNumber: Math.ceil((currentDate.getDate() - currentDate.getDay()) / 7),
      saturday: new Date(currentDate),
      sunday: new Date(currentDate.setDate(currentDate.getDate() + 1)),
      tradingDays: [],
      totalPnL: 0,
      totalTrades: 0,
      weeklyWinRate: 0
    }

    let winningTrades = 0
    
    // Monday to Friday
    for (let i = 0; i < 5; i++) {
      currentDate.setDate(currentDate.getDate() + 1)
      const isCurrentMonth = currentDate.getMonth() === currentMonth.value.getMonth()
      
      const trades = isCurrentMonth ? Math.floor(Math.random() * 6) : 0
      const profit = trades === 0 ? 0 : Math.floor((Math.random() * 2000) - 1000)
      
      if (isCurrentMonth) {
        week.totalPnL += profit
        week.totalTrades += trades
        if (profit > 0) winningTrades++
      }

      week.tradingDays.push({
        date: new Date(currentDate),
        isCurrentMonth,
        isToday: currentDate.toDateString() === new Date().toDateString(),
        profit,
        trades,
        winRate: trades ? Math.round((Math.random() * 50 + 50)) : 0,
        notes: ''
      })
    }

    week.weeklyWinRate = week.totalTrades ? Math.round((winningTrades / week.totalTrades) * 100) : 0
    weeks.push(week)
    
    // Move to next Saturday
    currentDate.setDate(currentDate.getDate() + 2)
  }

  return weeks
})

// Monthly Stats
const monthlyStats = computed(() => {
  let totalPnL = 0
  let totalTrades = 0
  let winningTrades = 0
  let bestDay = { profit: -Infinity }
  let worstDay = { profit: Infinity }

  monthData.value.forEach(week => {
    week.tradingDays.forEach(day => {
      if (day.isCurrentMonth) {
        totalPnL += day.profit
        totalTrades += day.trades
        if (day.profit > 0) winningTrades += day.trades
        if (day.profit > bestDay.profit) bestDay = day
        if (day.profit < worstDay.profit) worstDay = day
      }
    })
  })

  return [
    {
      label: 'Profit/Perte',
      value: formatProfit(totalPnL),
      color: totalPnL >= 0 ? 'text-green-400' : 'text-red-400'
    },
    {
      label: 'Win Rate',
      value: totalTrades ? `${Math.round((winningTrades / totalTrades) * 100)}%` : '0%',
      color: 'text-yellow-400'
    },
    {
      label: 'Meilleur Jour',
      value: formatProfit(bestDay.profit),
      color: 'text-green-400'
    },
    {
      label: 'Pire Jour',
      value: formatProfit(worstDay.profit),
      color: 'text-red-400'
    }
  ]
})

// Monthly Equity Chart Data
const monthlyEquityData = computed(() => {
  const data = []
  let equity = 100000 // Starting equity
  
  monthData.value.forEach(week => {
    week.tradingDays.forEach(day => {
      if (day.isCurrentMonth) {
        equity += day.profit
        data.push(equity)
      }
    })
  })

  return {
    labels: data.map((_, i) => `Jour ${i + 1}`),
    datasets: [{
      label: 'Equity',
      data,
      borderColor: '#facc15',
      backgroundColor: 'rgba(250, 204, 21, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }
})

// Weekly Performance Chart Data
const weeklyPerformanceData = computed(() => ({
  labels: monthData.value.map(week => `Semaine ${week.weekNumber}`),
  datasets: [{
    label: 'Performance',
    data: monthData.value.map(week => week.totalPnL),
    backgroundColor: monthData.value.map(week => 
      week.totalPnL >= 0 ? 'rgba(74, 222, 128, 0.5)' : 'rgba(248, 113, 113, 0.5)'
    ),
    borderColor: monthData.value.map(week => 
      week.totalPnL >= 0 ? 'rgb(74, 222, 128)' : 'rgb(248, 113, 113)'
    ),
    borderWidth: 1
  }]
}))

// Trade Distribution Chart Data
const tradeDistributionData = computed(() => {
  let winning = 0
  let losing = 0
  let breakeven = 0

  monthData.value.forEach(week => {
    week.tradingDays.forEach(day => {
      if (day.isCurrentMonth) {
        if (day.profit > 0) winning++
        else if (day.profit < 0) losing++
        else breakeven++
      }
    })
  })

  return {
    labels: ['Gagnants', 'Perdants', 'Break Even'],
    datasets: [{
      data: [winning, losing, breakeven],
      backgroundColor: [
        'rgba(74, 222, 128, 0.5)',
        'rgba(248, 113, 113, 0.5)',
        'rgba(250, 204, 21, 0.5)'
      ],
      borderColor: [
        'rgb(74, 222, 128)',
        'rgb(248, 113, 113)',
        'rgb(250, 204, 21)'
      ],
      borderWidth: 1
    }]
  }
})

// Best/Worst Trades
const bestWorstTrades = computed(() => {
  const trades = []
  monthData.value.forEach(week => {
    week.tradingDays.forEach(day => {
      if (day.isCurrentMonth && day.trades > 0) {
        trades.push(...generateDayTrades(day))
      }
    })
  })
  
  return [
    ...trades.sort((a, b) => b.profit - a.profit).slice(0, 3),
    ...trades.sort((a, b) => a.profit - b.profit).slice(0, 3)
  ]
})

// Weekly Stats
const weeklyStats = computed(() => {
  if (!selectedWeek.value) return []
  
  const totalPnL = selectedWeek.value.totalPnL
  const avgTrades = selectedWeek.value.totalTrades / 5
  const winRate = selectedWeek.value.weeklyWinRate
  
  return [
    {
      label: 'Profit/Perte',
      value: formatProfit(totalPnL),
      color: totalPnL >= 0 ? 'text-green-400' : 'text-red-400'
    },
    {
      label: 'Trades/Jour',
      value: avgTrades.toFixed(1),
      color: 'text-white'
    },
    {
      label: 'Win Rate',
      value: `${winRate}%`,
      color: 'text-yellow-400'
    },
    {
      label: 'Drawdown',
      value: '-4.2%',
      color: 'text-red-400'
    }
  ]
})

// Weekly Chart Data
const weeklyChartData = computed(() => {
  if (!selectedWeek.value) return null
  
  return {
    labels: selectedWeek.value.tradingDays.map(day => formatDayNumber(day.date)),
    datasets: [{
      label: 'P&L Journalier',
      data: selectedWeek.value.tradingDays.map(day => day.profit),
      borderColor: '#facc15',
      backgroundColor: 'rgba(250, 204, 21, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }
})

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

const donutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#9ca3af'
      }
    }
  }
}

function generateDayTrades(day) {
  const trades = []
  for (let i = 0; i < day.trades; i++) {
    trades.push({
      id: `${day.date.getTime()}-${i}`,
      pair: ['EUR/USD', 'GBP/JPY', 'BTC/USD', 'ETH/USD'][Math.floor(Math.random() * 4)],
      type: Math.random() > 0.5 ? 'BUY' : 'SELL',
      size: (Math.random() * 2).toFixed(2),
      profit: Math.floor((Math.random() * 1000) - 500),
      rr: (1 + Math.random() * 2).toFixed(1),
      time: new Date(day.date.setHours(9 + Math.random() * 8)).toISOString()
    })
  }
  return trades
}

// Get 5 most recent trades
const recentTrades = computed(() => {
  const trades = []
  monthData.value.forEach(week => {
    week.tradingDays.forEach(day => {
      if (day.trades > 0) {
        trades.push(...generateDayTrades(day))
      }
    })
  })
  
  return trades
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 5)
})

const dayChartData = computed(() => ({
  labels: selectedDay.value ? Array.from({ length: selectedDay.value.trades }, (_, i) => `Trade ${i + 1}`) : [],
  datasets: [{
    label: 'P&L Cumulé',
    data: selectedDay.value ? generateDayChartData(selectedDay.value.trades) : [],
    borderColor: '#facc15',
    backgroundColor: 'rgba(250, 204, 21, 0.1)',
    fill: true,
    tension: 0.4
  }]
}))

function generateDayChartData(trades) {
  if (!trades) return []
  const data = [0]
  let cumulative = 0
  for (let i = 0; i < trades; i++) {
    cumulative += Math.random() > 0.5 ? Math.random() * 500 : -Math.random() * 500
    data.push(cumulative)
  }
  return data
}

function previousMonth() {
  currentMonth.value = new Date(currentMonth.value.setMonth(currentMonth.value.getMonth() - 1))
}

function nextMonth() {
  currentMonth.value = new Date(currentMonth.value.setMonth(currentMonth.value.getMonth() + 1))
}

function selectDay(day) {
  if (day.trades > 0) {
    selectedDay.value = {
      ...day,
      trades: generateDayTrades(day)
    }
  }
}

function showWeekStats(week) {
  selectedWeek.value = week
}

const currentMonthDisplay = computed(() => {
  return new Intl.DateTimeFormat('fr-FR', { 
    month: 'long',
    year: 'numeric'
  }).format(currentMonth.value)
})

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