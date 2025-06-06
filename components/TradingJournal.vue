<template>
  <div class="w-full min-h-screen bg-zinc-900/80 backdrop-blur rounded-2xl border border-zinc-800/50 overflow-hidden">
    <!-- Header with Month Navigation -->
    <div class="flex justify-between items-center p-6 border-b border-zinc-800/50 bg-zinc-800/30">
      <div>
        <h2 class="text-2xl font-bold text-yellow-400">Trading Journal 2025</h2>
        <p class="text-sm text-zinc-400 mt-1">Track your daily performance and analyze your progress</p>
      </div>
      
      <div class="flex items-center gap-4">
        <button @click="previousMonth" 
                class="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <div class="text-center">
          <div class="text-xl font-bold text-white">{{ currentMonthName }}</div>
          <div class="text-sm text-zinc-400">{{ currentYear }}</div>
        </div>
        
        <button @click="nextMonth" 
                class="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="p-6">
      <!-- Week Headers -->
      <div class="grid grid-cols-10 gap-2 mb-4">
        <div class="text-center text-xs font-medium text-zinc-500 py-2">Week</div>
        <div class="text-center text-xs font-medium text-zinc-500 py-2 opacity-50">Sat</div>
        <div class="text-center text-xs font-medium text-zinc-400 py-2">Mon</div>
        <div class="text-center text-xs font-medium text-zinc-400 py-2">Tue</div>
        <div class="text-center text-xs font-medium text-zinc-400 py-2">Wed</div>
        <div class="text-center text-xs font-medium text-zinc-400 py-2">Thu</div>
        <div class="text-center text-xs font-medium text-zinc-400 py-2">Fri</div>
        <div class="text-center text-xs font-medium text-zinc-500 py-2 opacity-50">Sun</div>
        <div class="text-center text-xs font-medium text-zinc-500 py-2">Summary</div>
      </div>

      <!-- Calendar Weeks -->
      <div class="space-y-3">
        <div v-for="(week, weekIndex) in calendarWeeks" :key="weekIndex" 
             class="grid grid-cols-10 gap-2 items-stretch">
          
          <!-- Week Number -->
          <div class="flex items-center justify-center bg-zinc-800/50 rounded-lg p-2">
            <span class="text-sm font-bold text-yellow-400">Week {{ week.weekNumber }}</span>
          </div>

          <!-- Saturday (Grayed out) -->
          <div class="bg-zinc-800/30 rounded-lg p-2 opacity-50 border border-zinc-700/30">
            <div class="text-center">
              <div class="text-xs text-zinc-500 mb-1">{{ week.days[0].date }}</div>
              <div class="text-lg">🏖️</div>
              <div class="text-xs text-zinc-600 mt-1">Rest</div>
            </div>
          </div>

          <!-- Monday to Friday (Trading Days) -->
          <div v-for="(day, dayIndex) in week.days.slice(1, 6)" :key="dayIndex"
               @click="openDayPanel(day)"
               :class="[
                 'relative rounded-lg p-3 border-2 transition-all duration-300 cursor-pointer transform hover:scale-105',
                 getDayColorClass(day),
                 day.isToday ? 'ring-2 ring-blue-400' : '',
                 day.isCurrentMonth ? 'opacity-100' : 'opacity-40'
               ]">
            
            <!-- Day Header -->
            <div class="text-center mb-2">
              <div class="text-sm font-bold">{{ day.date }}</div>
              <div v-if="day.isToday" class="w-2 h-2 bg-blue-400 rounded-full mx-auto mt-1 animate-pulse"></div>
            </div>

            <!-- Trading Stats -->
            <div v-if="day.isCurrentMonth && !day.isWeekend" class="space-y-1">
              <div class="text-xs text-center">
                <div class="font-medium">{{ day.trades.length }} trades</div>
                <div v-if="day.trades.length > 0" :class="day.pnl >= 0 ? 'text-green-400' : 'text-red-400'">
                  {{ day.pnl >= 0 ? '+' : '' }}{{ day.pnl.toFixed(1) }}%
                </div>
                <div v-if="day.trades.length > 0" class="text-zinc-400">
                  {{ day.winRate }}% WR
                </div>
              </div>
              
              <!-- Performance Bar -->
              <div class="w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
                <div :class="[
                  'h-full transition-all duration-500',
                  day.pnl >= 0 ? 'bg-green-400' : 'bg-red-400'
                ]" :style="{ width: `${Math.min(100, Math.abs(day.pnl) * 10)}%` }"></div>
              </div>
            </div>

            <!-- Hover Tooltip -->
            <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
              <div>{{ day.trades.length }} trades</div>
              <div v-if="day.trades.length > 0">P&L: {{ day.pnl >= 0 ? '+' : '' }}{{ day.pnl.toFixed(1) }}%</div>
              <div v-if="day.trades.length > 0">Win Rate: {{ day.winRate }}%</div>
            </div>
          </div>

          <!-- Sunday (Grayed out) -->
          <div class="bg-zinc-800/30 rounded-lg p-2 opacity-50 border border-zinc-700/30">
            <div class="text-center">
              <div class="text-xs text-zinc-500 mb-1">{{ week.days[6].date }}</div>
              <div class="text-lg">📊</div>
              <div class="text-xs text-zinc-600 mt-1">Analysis</div>
            </div>
          </div>

          <!-- Weekly Summary -->
          <div class="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50">
            <div class="text-center space-y-1">
              <div class="text-xs text-zinc-400">Total</div>
              <div class="text-sm font-bold">{{ week.summary.totalTrades }} trades</div>
              <div :class="[
                'text-sm font-bold',
                week.summary.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'
              ]">
                {{ week.summary.totalPnL >= 0 ? '+' : '' }}{{ week.summary.totalPnL.toFixed(1) }}%
              </div>
              <div class="text-xs text-zinc-400">{{ week.summary.winRate }}% WR</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Day Detail Panel -->
    <div v-if="selectedDay" 
         class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
         @click.self="closeDayPanel">
      <div class="bg-zinc-900 rounded-2xl border border-zinc-800 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <!-- Panel Header -->
        <div class="flex justify-between items-center p-6 border-b border-zinc-800">
          <div>
            <h3 class="text-xl font-bold text-yellow-400">
              {{ selectedDay.dayName }}, {{ selectedDay.date }} {{ currentMonthName }} {{ currentYear }}
            </h3>
            <p class="text-sm text-zinc-400 mt-1">Trading Session Details</p>
          </div>
          <button @click="closeDayPanel" 
                  class="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Trades List -->
            <div>
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-lg font-bold text-white">Trades ({{ selectedDay.trades.length }})</h4>
                <button @click="addTrade" 
                        class="px-3 py-1 bg-yellow-400 text-black rounded-lg text-sm font-medium hover:bg-yellow-500 transition-colors">
                  Add Trade
                </button>
              </div>
              
              <div class="space-y-3 max-h-80 overflow-y-auto">
                <div v-for="(trade, index) in selectedDay.trades" :key="index"
                     class="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <div class="font-medium text-white">{{ trade.symbol }}</div>
                      <div class="text-xs text-zinc-400">{{ trade.time }}</div>
                    </div>
                    <div :class="[
                      'text-sm font-bold',
                      trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                    ]">
                      {{ trade.pnl >= 0 ? '+' : '' }}{{ trade.pnl.toFixed(2) }}%
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span class="text-zinc-400">Entry:</span>
                      <span class="text-white ml-1">{{ trade.entry }}</span>
                    </div>
                    <div>
                      <span class="text-zinc-400">Exit:</span>
                      <span class="text-white ml-1">{{ trade.exit }}</span>
                    </div>
                    <div>
                      <span class="text-zinc-400">Size:</span>
                      <span class="text-white ml-1">{{ trade.size }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Chart and Notes -->
            <div class="space-y-6">
              <!-- Performance Chart -->
              <div>
                <h4 class="text-lg font-bold text-white mb-4">Daily Performance</h4>
                <div class="bg-zinc-800/50 rounded-lg p-4 h-48 flex items-center justify-center border border-zinc-700/50">
                  <div class="text-center">
                    <div class="text-3xl mb-2">📈</div>
                    <div class="text-sm text-zinc-400">TP/SL vs Drawdown Chart</div>
                    <div class="text-xs text-zinc-500 mt-1">(Chart visualization would go here)</div>
                  </div>
                </div>
              </div>

              <!-- Daily Notes -->
              <div>
                <h4 class="text-lg font-bold text-white mb-4">Daily Notes</h4>
                <textarea v-model="selectedDay.notes"
                          class="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-400 resize-none"
                          placeholder="Add your trading notes, market observations, lessons learned..."></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const currentMonth = ref(0) // January 2025
const currentYear = ref(2025)
const selectedDay = ref(null)

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const dayNames = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const currentMonthName = computed(() => monthNames[currentMonth.value])

// Sample trading data
const tradingData = ref({
  '2025-01-06': {
    trades: [
      { symbol: 'EUR/USD', time: '09:30', entry: '1.0450', exit: '1.0465', size: '0.5', pnl: 1.44 },
      { symbol: 'GBP/USD', time: '14:15', entry: '1.2750', exit: '1.2735', size: '0.3', pnl: -1.18 }
    ],
    notes: 'Good momentum in EUR/USD morning session. GBP/USD stopped out due to unexpected news.'
  },
  '2025-01-07': {
    trades: [
      { symbol: 'USD/JPY', time: '10:00', entry: '157.50', exit: '158.20', size: '0.4', pnl: 1.78 },
      { symbol: 'EUR/USD', time: '15:30', entry: '1.0440', exit: '1.0455', size: '0.6', pnl: 0.86 }
    ],
    notes: 'Strong JPY weakness continued. EUR showing resilience.'
  },
  '2025-01-08': {
    trades: [
      { symbol: 'GBP/JPY', time: '08:45', entry: '200.50', exit: '201.80', size: '0.2', pnl: 1.30 }
    ],
    notes: 'Single high-conviction trade on GBP/JPY breakout.'
  }
})

const calendarWeeks = computed(() => {
  const weeks = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  
  // Find the first Saturday of the calendar view
  let startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - ((startDate.getDay() + 1) % 7))
  
  let weekNumber = 1
  let currentDate = new Date(startDate)
  
  while (currentDate <= lastDay || weeks.length < 5) {
    const week = {
      weekNumber: weekNumber++,
      days: [],
      summary: { totalTrades: 0, totalPnL: 0, winRate: 0 }
    }
    
    // Generate 7 days for the week (Sat, Sun, Mon, Tue, Wed, Thu, Fri)
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(currentDate)
      const dateString = dayDate.toISOString().split('T')[0]
      const dayData = tradingData.value[dateString] || { trades: [], notes: '' }
      
      const day = {
        date: dayDate.getDate(),
        dateString,
        dayName: dayNames[dayDate.getDay()],
        isCurrentMonth: dayDate.getMonth() === currentMonth.value,
        isToday: isToday(dayDate),
        isWeekend: dayDate.getDay() === 0 || dayDate.getDay() === 6,
        trades: dayData.trades,
        notes: dayData.notes,
        pnl: dayData.trades.reduce((sum, trade) => sum + trade.pnl, 0),
        winRate: dayData.trades.length > 0 ? Math.round((dayData.trades.filter(t => t.pnl > 0).length / dayData.trades.length) * 100) : 0
      }
      
      week.days.push(day)
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    // Calculate week summary (only trading days)
    const tradingDays = week.days.filter(day => !day.isWeekend && day.isCurrentMonth)
    week.summary.totalTrades = tradingDays.reduce((sum, day) => sum + day.trades.length, 0)
    week.summary.totalPnL = tradingDays.reduce((sum, day) => sum + day.pnl, 0)
    week.summary.winRate = week.summary.totalTrades > 0 ? 
      Math.round((tradingDays.reduce((sum, day) => sum + day.trades.filter(t => t.pnl > 0).length, 0) / week.summary.totalTrades) * 100) : 0
    
    weeks.push(week)
    
    if (weeks.length >= 6) break
  }
  
  return weeks
})

function isToday(date) {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

function getDayColorClass(day) {
  if (!day.isCurrentMonth || day.isWeekend) {
    return 'bg-zinc-800/30 border-zinc-700/30'
  }
  
  if (day.trades.length === 0) {
    return 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600'
  }
  
  if (day.pnl > 0) {
    return 'bg-green-900/30 border-green-700/50 hover:border-green-600'
  } else {
    return 'bg-red-900/30 border-red-700/50 hover:border-red-600'
  }
}

function previousMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function openDayPanel(day) {
  if (!day.isCurrentMonth || day.isWeekend) return
  selectedDay.value = day
}

function closeDayPanel() {
  selectedDay.value = null
}

function addTrade() {
  if (!selectedDay.value) return
  
  const newTrade = {
    symbol: 'EUR/USD',
    time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    entry: '1.0500',
    exit: '1.0520',
    size: '0.5',
    pnl: 1.90
  }
  
  selectedDay.value.trades.push(newTrade)
  
  // Update trading data
  if (!tradingData.value[selectedDay.value.dateString]) {
    tradingData.value[selectedDay.value.dateString] = { trades: [], notes: '' }
  }
  tradingData.value[selectedDay.value.dateString].trades = selectedDay.value.trades
  
  // Recalculate day stats
  selectedDay.value.pnl = selectedDay.value.trades.reduce((sum, trade) => sum + trade.pnl, 0)
  selectedDay.value.winRate = selectedDay.value.trades.length > 0 ? 
    Math.round((selectedDay.value.trades.filter(t => t.pnl > 0).length / selectedDay.value.trades.length) * 100) : 0
}

onMounted(() => {
  // Set current month based on today's date
  const today = new Date()
  currentMonth.value = today.getMonth()
  currentYear.value = today.getFullYear()
})
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(250, 204, 21, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(250, 204, 21, 0.7);
}
</style>