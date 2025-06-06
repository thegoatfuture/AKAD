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

        <!-- Monthly Summary Button -->
        <button @click="showMonthlySummary = true"
                class="px-4 py-2 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors">
          Monthly Summary
        </button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="p-6">
      <!-- Week Headers -->
      <div class="grid grid-cols-9 gap-2 mb-4">
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
             class="grid grid-cols-9 gap-2 items-stretch">
          
          <!-- Week Number -->
          <div class="flex items-center justify-center bg-zinc-800/50 rounded-lg p-2">
            <span class="text-sm font-bold text-yellow-400">Week {{ week.weekNumber }}</span>
          </div>

          <!-- Saturday (Grayed out and smaller) -->
          <div class="bg-zinc-800/20 rounded-lg p-1 opacity-40 border border-zinc-700/20 transform scale-90">
            <div class="text-center">
              <div class="text-xs text-zinc-500 mb-1">{{ week.days[0].date }}</div>
              <div class="text-sm">🏖️</div>
              <div class="text-xs text-zinc-600 mt-1">Rest</div>
            </div>
          </div>

          <!-- Monday to Friday (Trading Days) -->
          <div v-for="(day, dayIndex) in week.days.slice(1, 6)" :key="dayIndex"
               @click="openDayPanel(day)"
               @mouseenter="day.isHovered = true"
               @mouseleave="day.isHovered = false"
               :class="[
                 'group relative rounded-lg p-3 border-2 transition-all duration-300 cursor-pointer',
                 'hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-400/20',
                 getDayColorClass(day),
                 day.isToday ? 'ring-2 ring-blue-400' : '',
                 day.isCurrentMonth ? 'opacity-100' : 'opacity-40',
                 day.isHovered ? 'transform -translate-y-2 shadow-lg shadow-yellow-400/20' : ''
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

              <!-- Note Indicator -->
              <div v-if="day.notes && day.notes.trim()" class="flex justify-center mt-1">
                <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
            </div>

            <!-- Hover Tooltip -->
            <div class="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
              <div>{{ day.trades.length }} trades</div>
              <div v-if="day.trades.length > 0">P&L: {{ day.pnl >= 0 ? '+' : '' }}{{ day.pnl.toFixed(1) }}%</div>
              <div v-if="day.trades.length > 0">Win Rate: {{ day.winRate }}%</div>
              <div v-if="day.notes && day.notes.trim()" class="text-yellow-400">📝 Has notes</div>
            </div>
          </div>

          <!-- Sunday (Grayed out and smaller) -->
          <div class="bg-zinc-800/20 rounded-lg p-1 opacity-40 border border-zinc-700/20 transform scale-90">
            <div class="text-center">
              <div class="text-xs text-zinc-500 mb-1">{{ week.days[6].date }}</div>
              <div class="text-sm">📊</div>
              <div class="text-xs text-zinc-600 mt-1">Analysis</div>
            </div>
          </div>

          <!-- Weekly Summary with Button -->
          <div class="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50 relative">
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
              
              <!-- Weekly Summary Button -->
              <button @click="showWeeklySummary(week, weekIndex)"
                      class="mt-2 px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded text-xs hover:bg-yellow-400/30 transition-colors">
                Details
              </button>
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
                <div class="flex justify-between items-center mb-4">
                  <h4 class="text-lg font-bold text-white">Daily Notes</h4>
                  <button @click="saveNotes" 
                          class="px-3 py-1 bg-green-400 text-black rounded-lg text-sm font-medium hover:bg-green-500 transition-colors">
                    Save Notes
                  </button>
                </div>
                <textarea v-model="selectedDay.notes"
                          class="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-400 resize-none"
                          placeholder="Add your trading notes, market observations, lessons learned..."></textarea>
                <div v-if="notesSaved" class="text-green-400 text-xs mt-2 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Notes saved successfully
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Summary Modal -->
    <div v-if="showWeeklySummaryModal" 
         class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
         @click.self="showWeeklySummaryModal = false">
      <div class="bg-zinc-900 rounded-2xl border border-zinc-800 w-full max-w-2xl">
        <div class="flex justify-between items-center p-6 border-b border-zinc-800">
          <h3 class="text-xl font-bold text-yellow-400">Week {{ selectedWeek?.weekNumber }} Summary</h3>
          <button @click="showWeeklySummaryModal = false" 
                  class="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-zinc-800/50 p-4 rounded-xl text-center">
              <div class="text-2xl font-bold text-yellow-400">{{ selectedWeek?.summary.totalTrades }}</div>
              <div class="text-xs text-zinc-400">Total Trades</div>
            </div>
            <div class="bg-zinc-800/50 p-4 rounded-xl text-center">
              <div :class="[
                'text-2xl font-bold',
                selectedWeek?.summary.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'
              ]">
                {{ selectedWeek?.summary.totalPnL >= 0 ? '+' : '' }}{{ selectedWeek?.summary.totalPnL.toFixed(1) }}%
              </div>
              <div class="text-xs text-zinc-400">Total P&L</div>
            </div>
            <div class="bg-zinc-800/50 p-4 rounded-xl text-center">
              <div class="text-2xl font-bold text-yellow-400">{{ selectedWeek?.summary.winRate }}%</div>
              <div class="text-xs text-zinc-400">Win Rate</div>
            </div>
            <div class="bg-zinc-800/50 p-4 rounded-xl text-center">
              <div class="text-2xl font-bold text-blue-400">{{ selectedWeek?.activeDays }}</div>
              <div class="text-xs text-zinc-400">Active Days</div>
            </div>
          </div>

          <!-- Daily Breakdown -->
          <h4 class="text-lg font-bold text-white mb-4">Daily Breakdown</h4>
          <div class="space-y-2">
            <div v-for="day in selectedWeek?.days.slice(1, 6)" :key="day.date"
                 class="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="font-medium">{{ day.dayName }}</div>
                <div class="text-sm text-zinc-400">{{ day.date }}</div>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-sm">{{ day.trades.length }} trades</div>
                <div v-if="day.trades.length > 0" :class="[
                  'text-sm font-bold',
                  day.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                ]">
                  {{ day.pnl >= 0 ? '+' : '' }}{{ day.pnl.toFixed(1) }}%
                </div>
                <div v-else class="text-sm text-zinc-500">No trades</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Monthly Summary Modal -->
    <div v-if="showMonthlySummary" 
         class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
         @click.self="showMonthlySummary = false">
      <div class="bg-zinc-900 rounded-2xl border border-zinc-800 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div class="flex justify-between items-center p-6 border-b border-zinc-800">
          <h3 class="text-xl font-bold text-yellow-400">{{ currentMonthName }} {{ currentYear }} - Monthly Summary</h3>
          <button @click="showMonthlySummary = false" 
                  class="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div class="bg-zinc-800/50 p-4 rounded-xl text-center">
              <div class="text-2xl font-bold text-yellow-400">{{ monthlyStats.totalTrades }}</div>
              <div class="text-xs text-zinc-400">Total Trades</div>
            </div>
            <div class="bg-zinc-800/50 p-4 rounded-xl text-center">
              <div :class="[
                'text-2xl font-bold',
                monthlyStats.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'
              ]">
                {{ monthlyStats.totalPnL >= 0 ? '+' : '' }}{{ monthlyStats.totalPnL.toFixed(1) }}%
              </div>
              <div class="text-xs text-zinc-400">Total P&L</div>
            </div>
            <div class="bg-zinc-800/50 p-4 rounded-xl text-center">
              <div class="text-2xl font-bold text-yellow-400">{{ monthlyStats.winRate }}%</div>
              <div class="text-xs text-zinc-400">Win Rate</div>
            </div>
            <div class="bg-zinc-800/50 p-4 rounded-xl text-center">
              <div class="text-2xl font-bold text-blue-400">{{ monthlyStats.activeDays }}</div>
              <div class="text-xs text-zinc-400">Active Days</div>
            </div>
            <div class="bg-zinc-800/50 p-4 rounded-xl text-center">
              <div class="text-2xl font-bold text-purple-400">{{ monthlyStats.avgDaily.toFixed(1) }}%</div>
              <div class="text-xs text-zinc-400">Avg Daily</div>
            </div>
          </div>

          <!-- Weekly Performance Chart -->
          <div class="mb-8">
            <h4 class="text-lg font-bold text-white mb-4">Weekly Performance</h4>
            <div class="bg-zinc-800/50 rounded-lg p-4 h-64 flex items-center justify-center border border-zinc-700/50">
              <div class="text-center">
                <div class="text-3xl mb-2">📊</div>
                <div class="text-sm text-zinc-400">Weekly P&L Chart</div>
                <div class="text-xs text-zinc-500 mt-1">(Chart visualization would go here)</div>
              </div>
            </div>
          </div>

          <!-- Best and Worst Days -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-bold text-green-400 mb-4">Best Trading Days</h4>
              <div class="space-y-2">
                <div v-for="day in monthlyStats.bestDays" :key="day.date"
                     class="flex justify-between items-center p-3 bg-green-900/20 rounded-lg border border-green-700/30">
                  <div>
                    <div class="font-medium">{{ day.dayName }}, {{ day.date }}</div>
                    <div class="text-sm text-zinc-400">{{ day.trades.length }} trades</div>
                  </div>
                  <div class="text-green-400 font-bold">+{{ day.pnl.toFixed(1) }}%</div>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-lg font-bold text-red-400 mb-4">Challenging Days</h4>
              <div class="space-y-2">
                <div v-for="day in monthlyStats.worstDays" :key="day.date"
                     class="flex justify-between items-center p-3 bg-red-900/20 rounded-lg border border-red-700/30">
                  <div>
                    <div class="font-medium">{{ day.dayName }}, {{ day.date }}</div>
                    <div class="text-sm text-zinc-400">{{ day.trades.length }} trades</div>
                  </div>
                  <div class="text-red-400 font-bold">{{ day.pnl.toFixed(1) }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const currentMonth = ref(0) // January 2025
const currentYear = ref(2025)
const selectedDay = ref(null)
const notesSaved = ref(false)
const showWeeklySummaryModal = ref(false)
const showMonthlySummary = ref(false)
const selectedWeek = ref(null)

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const currentMonthName = computed(() => monthNames[currentMonth.value])

// Sample trading data with localStorage persistence
const tradingData = ref({})

// Realistic trading symbols and scenarios
const tradingSymbols = [
  'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CHF', 'NZD/USD',
  'EUR/GBP', 'GBP/JPY', 'EUR/JPY', 'AUD/JPY', 'CAD/JPY', 'CHF/JPY',
  'XAU/USD', 'US30', 'NAS100', 'SPX500', 'UK100', 'GER40'
]

const tradingNotes = [
  'Strong momentum after NFP release. Clean breakout above resistance.',
  'Caught the London session reversal perfectly. Risk/reward 1:3.',
  'Market consolidation phase. Waited for clear direction before entry.',
  'News-driven volatility created excellent scalping opportunities.',
  'Trend continuation trade worked well. Held position through minor pullback.',
  'Quick scalp during NY session overlap. In and out within 15 minutes.',
  'Support level held perfectly. Bounced exactly as expected.',
  'Breakout failed, but quick exit limited losses. Good risk management.',
  'Patience paid off. Waited 2 hours for the perfect setup.',
  'Strong dollar momentum across all pairs. Rode the trend.',
  'ECB dovish tone created EUR weakness. Capitalized on the move.',
  'Technical analysis spot on. Fibonacci retracement worked perfectly.',
  'Market sentiment shifted after Fed minutes. Adapted strategy quickly.',
  'Clean price action setup. No indicators needed for this trade.',
  'Volatility spike during Asian session. Managed risk carefully.'
]

// Generate realistic trading data
function generateRealisticTrades(dateString, dayOfWeek) {
  const trades = []
  
  // Skip weekends
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return { trades: [], notes: '' }
  }
  
  const numTrades = Math.floor(Math.random() * 4) + 1 // 1-4 trades per day
  
  // Higher probability of trading on Tuesday-Thursday
  const tradingProbability = dayOfWeek === 2 || dayOfWeek === 3 || dayOfWeek === 4 ? 0.9 : 0.7
  
  if (Math.random() > tradingProbability) return { trades: [], notes: '' }
  
  for (let i = 0; i < numTrades; i++) {
    const symbol = tradingSymbols[Math.floor(Math.random() * tradingSymbols.length)]
    const isWin = Math.random() > 0.35 // 65% win rate
    const pnl = isWin ? 
      (Math.random() * 2.5 + 0.5) : // Win: 0.5% to 3%
      -(Math.random() * 1.5 + 0.3)   // Loss: -0.3% to -1.8%
    
    const hour = Math.floor(Math.random() * 10) + 8 // 8:00 to 17:59
    const minute = Math.floor(Math.random() * 60)
    
    // Generate realistic prices based on symbol
    let entry, exit, size
    if (symbol.includes('JPY')) {
      entry = (Math.random() * 20 + 140).toFixed(2)
      exit = (parseFloat(entry) + (pnl > 0 ? Math.random() * 0.5 : -Math.random() * 0.3)).toFixed(2)
      size = (Math.random() * 0.8 + 0.2).toFixed(1)
    } else if (symbol.includes('XAU')) {
      entry = (Math.random() * 100 + 2000).toFixed(2)
      exit = (parseFloat(entry) + (pnl > 0 ? Math.random() * 15 : -Math.random() * 10)).toFixed(2)
      size = (Math.random() * 0.3 + 0.1).toFixed(1)
    } else if (symbol.includes('US30') || symbol.includes('NAS') || symbol.includes('SPX')) {
      entry = (Math.random() * 1000 + 35000).toFixed(0)
      exit = (parseFloat(entry) + (pnl > 0 ? Math.random() * 50 : -Math.random() * 30)).toFixed(0)
      size = (Math.random() * 0.5 + 0.1).toFixed(1)
    } else {
      entry = (Math.random() * 0.3 + 1.0).toFixed(4)
      exit = (parseFloat(entry) + (pnl > 0 ? Math.random() * 0.01 : -Math.random() * 0.008)).toFixed(4)
      size = (Math.random() * 0.8 + 0.2).toFixed(1)
    }
    
    trades.push({
      symbol,
      time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      entry,
      exit,
      size,
      pnl: parseFloat(pnl.toFixed(2))
    })
  }
  
  // Generate realistic notes
  const notes = Math.random() > 0.4 ? 
    tradingNotes[Math.floor(Math.random() * tradingNotes.length)] : ''
  
  return { trades, notes }
}

// Load data from localStorage on mount
onMounted(() => {
  const saved = localStorage.getItem('tradingJournalData')
  if (saved) {
    tradingData.value = JSON.parse(saved)
  } else {
    // Generate realistic sample data for the current month and previous months
    tradingData.value = {}
    
    // Generate data for December 2024 and January 2025
    for (let month = 11; month <= 12; month++) {
      const year = month === 11 ? 2024 : 2025
      const actualMonth = month === 11 ? 11 : 0
      const daysInMonth = new Date(year, actualMonth + 1, 0).getDate()
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, actualMonth, day)
        const dayOfWeek = date.getDay()
        const dateString = date.toISOString().split('T')[0]
        tradingData.value[dateString] = generateRealisticTrades(dateString, dayOfWeek)
      }
    }
    
    saveToLocalStorage()
  }
  
  // Set current month based on today's date
  const today = new Date()
  currentMonth.value = today.getMonth()
  currentYear.value = today.getFullYear()
})

// Save to localStorage whenever data changes
function saveToLocalStorage() {
  localStorage.setItem('tradingJournalData', JSON.stringify(tradingData.value))
}

// Watch for changes in trading data
watch(tradingData, saveToLocalStorage, { deep: true })

const calendarWeeks = computed(() => {
  const weeks = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  
  // Find the first Saturday of the calendar view (start of week)
  let startDate = new Date(firstDay)
  const firstDayOfWeek = firstDay.getDay() // 0 = Sunday, 1 = Monday, etc.
  const daysToSubtract = firstDayOfWeek === 0 ? 1 : firstDayOfWeek + 1 // Adjust to start on Saturday
  startDate.setDate(startDate.getDate() - daysToSubtract)
  
  let weekNumber = getWeekNumber(startDate)
  let currentDate = new Date(startDate)
  
  while (currentDate <= lastDay || weeks.length < 5) {
    const week = {
      weekNumber: weekNumber++,
      days: [],
      summary: { totalTrades: 0, totalPnL: 0, winRate: 0 },
      activeDays: 0
    }
    
    // Generate 7 days for the week (Sat, Mon, Tue, Wed, Thu, Fri, Sun)
    const weekDays = []
    
    // Saturday
    weekDays.push(createDayObject(new Date(currentDate)))
    currentDate.setDate(currentDate.getDate() + 1)
    
    // Monday to Friday
    for (let i = 0; i < 5; i++) {
      weekDays.push(createDayObject(new Date(currentDate)))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    // Sunday
    weekDays.push(createDayObject(new Date(currentDate)))
    currentDate.setDate(currentDate.getDate() + 1)
    
    week.days = weekDays
    
    // Calculate week summary (only trading days - Monday to Friday)
    const tradingDays = week.days.slice(1, 6).filter(day => day.isCurrentMonth)
    week.summary.totalTrades = tradingDays.reduce((sum, day) => sum + day.trades.length, 0)
    week.summary.totalPnL = tradingDays.reduce((sum, day) => sum + day.pnl, 0)
    week.summary.winRate = week.summary.totalTrades > 0 ? 
      Math.round((tradingDays.reduce((sum, day) => sum + day.trades.filter(t => t.pnl > 0).length, 0) / week.summary.totalTrades) * 100) : 0
    week.activeDays = tradingDays.filter(day => day.trades.length > 0).length
    
    weeks.push(week)
    
    if (weeks.length >= 6) break
  }
  
  return weeks
})

// Monthly statistics
const monthlyStats = computed(() => {
  const allDays = calendarWeeks.value.flatMap(week => 
    week.days.slice(1, 6).filter(day => day.isCurrentMonth && !day.isWeekend)
  )
  
  const activeDays = allDays.filter(day => day.trades.length > 0)
  const totalTrades = allDays.reduce((sum, day) => sum + day.trades.length, 0)
  const totalPnL = allDays.reduce((sum, day) => sum + day.pnl, 0)
  const totalWins = allDays.reduce((sum, day) => sum + day.trades.filter(t => t.pnl > 0).length, 0)
  
  // Best and worst days
  const daysWithTrades = activeDays.filter(day => day.trades.length > 0)
  const bestDays = daysWithTrades
    .filter(day => day.pnl > 0)
    .sort((a, b) => b.pnl - a.pnl)
    .slice(0, 3)
  
  const worstDays = daysWithTrades
    .filter(day => day.pnl < 0)
    .sort((a, b) => a.pnl - b.pnl)
    .slice(0, 3)
  
  return {
    totalTrades,
    totalPnL,
    winRate: totalTrades > 0 ? Math.round((totalWins / totalTrades) * 100) : 0,
    activeDays: activeDays.length,
    avgDaily: activeDays.length > 0 ? totalPnL / activeDays.length : 0,
    bestDays,
    worstDays
  }
})

function createDayObject(dayDate) {
  const dateString = dayDate.toISOString().split('T')[0]
  const dayOfWeek = dayDate.getDay()
  
  // Generate data for weekdays if not exists
  if (!tradingData.value[dateString] && dayOfWeek >= 1 && dayOfWeek <= 5) {
    tradingData.value[dateString] = generateRealisticTrades(dateString, dayOfWeek)
  }
  
  const dayData = tradingData.value[dateString] || { trades: [], notes: '' }
  
  return {
    date: dayDate.getDate(),
    dateString,
    dayName: dayNames[dayDate.getDay()],
    isCurrentMonth: dayDate.getMonth() === currentMonth.value,
    isToday: isToday(dayDate),
    isWeekend: dayDate.getDay() === 0 || dayDate.getDay() === 6,
    trades: dayData.trades || [],
    notes: dayData.notes || '',
    pnl: (dayData.trades || []).reduce((sum, trade) => sum + trade.pnl, 0),
    winRate: (dayData.trades || []).length > 0 ? 
      Math.round(((dayData.trades || []).filter(t => t.pnl > 0).length / (dayData.trades || []).length) * 100) : 0,
    isHovered: false
  }
}

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

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
  notesSaved.value = false
}

function closeDayPanel() {
  selectedDay.value = null
  notesSaved.value = false
}

function showWeeklySummary(week, weekIndex) {
  selectedWeek.value = week
  showWeeklySummaryModal.value = true
}

function addTrade() {
  if (!selectedDay.value) return
  
  const symbol = tradingSymbols[Math.floor(Math.random() * tradingSymbols.length)]
  const isWin = Math.random() > 0.35
  const pnl = isWin ? (Math.random() * 2.5 + 0.5) : -(Math.random() * 1.5 + 0.3)
  
  let entry, exit, size
  if (symbol.includes('JPY')) {
    entry = (Math.random() * 20 + 140).toFixed(2)
    exit = (parseFloat(entry) + (pnl > 0 ? Math.random() * 0.5 : -Math.random() * 0.3)).toFixed(2)
    size = (Math.random() * 0.8 + 0.2).toFixed(1)
  } else if (symbol.includes('XAU')) {
    entry = (Math.random() * 100 + 2000).toFixed(2)
    exit = (parseFloat(entry) + (pnl > 0 ? Math.random() * 15 : -Math.random() * 10)).toFixed(2)
    size = (Math.random() * 0.3 + 0.1).toFixed(1)
  } else {
    entry = (Math.random() * 0.3 + 1.0).toFixed(4)
    exit = (parseFloat(entry) + (pnl > 0 ? Math.random() * 0.01 : -Math.random() * 0.008)).toFixed(4)
    size = (Math.random() * 0.8 + 0.2).toFixed(1)
  }
  
  const newTrade = {
    symbol,
    time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    entry,
    exit,
    size,
    pnl: parseFloat(pnl.toFixed(2))
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

function saveNotes() {
  if (!selectedDay.value) return
  
  // Update trading data
  if (!tradingData.value[selectedDay.value.dateString]) {
    tradingData.value[selectedDay.value.dateString] = { trades: [], notes: '' }
  }
  tradingData.value[selectedDay.value.dateString].notes = selectedDay.value.notes
  
  notesSaved.value = true
  setTimeout(() => {
    notesSaved.value = false
  }, 3000)
}
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

/* Hover animation for day cells */
.hover\:transform:hover {
  transform: translateY(-8px);
}

.hover\:-translate-y-2:hover {
  transform: translateY(-8px);
}

.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-yellow-400\/20:hover {
  box-shadow: 0 10px 15px -3px rgba(250, 204, 21, 0.2), 0 4px 6px -2px rgba(250, 204, 21, 0.1);
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

/* Weekend cells styling */
.scale-90 {
  transform: scale(0.9);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: transform, box-shadow, opacity, background-color, border-color;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>