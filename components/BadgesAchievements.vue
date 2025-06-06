<template>
  <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-4 border border-zinc-800/50">
    <div class="flex justify-between items-center mb-4">
      <div>
        <h3 class="text-lg font-bold text-yellow-400">Badges & Achievements</h3>
        <p class="text-xs text-zinc-400 mt-1">{{ unlockedCount }}/{{ badges.length }} badges débloqués</p>
      </div>
      <NuxtLink to="/badges" 
                class="bg-yellow-400 text-black px-3 py-1.5 rounded-lg font-medium text-sm hover:bg-yellow-500 transition-all">
        Voir tous
      </NuxtLink>
    </div>

    <!-- Horizontal Scrollable Badges Container -->
    <div class="relative">
      <!-- Scroll buttons -->
      <button @click="scrollLeft" 
              class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-zinc-800/80 hover:bg-zinc-700 p-2 rounded-full transition-all duration-300 shadow-lg">
        <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <button @click="scrollRight" 
              class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-zinc-800/80 hover:bg-zinc-700 p-2 rounded-full transition-all duration-300 shadow-lg">
        <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- Badges Horizontal Scroll Container -->
      <div ref="badgesContainer" 
           class="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-8"
           style="scrollbar-width: none; -ms-overflow-style: none;">
        
        <div v-for="badge in recentBadges" :key="badge.id" 
             class="group relative bg-zinc-800/50 rounded-xl p-3 cursor-pointer border border-zinc-700/30 transition-all duration-300 hover:border-yellow-400/30 flex-shrink-0 w-24 hover:scale-105">
          
          <!-- Badge Icon & Status -->
          <div class="relative flex justify-center mb-2">
            <div :class="[
              'text-2xl transition-all duration-300 group-hover:scale-110',
              badge.unlocked ? 'opacity-100' : 'opacity-40 grayscale'
            ]">
              {{ badge.icon }}
            </div>
            <div v-if="!badge.unlocked" 
                 class="absolute -top-1 -right-1 text-xs opacity-70">
              🔒
            </div>
          </div>

          <!-- Badge Info -->
          <div class="text-center">
            <h4 class="font-medium text-xs mb-1 leading-tight" :class="badge.unlocked ? 'text-white' : 'text-zinc-500'">
              {{ badge.name }}
            </h4>
            <div v-if="badge.unlocked" class="text-xs text-yellow-400">
              {{ badge.unlockedDate }}
            </div>
            <div v-else class="text-xs text-zinc-500">
              {{ badge.progress }}%
            </div>
          </div>

          <!-- Progress Bar for Locked Badges -->
          <div v-if="!badge.unlocked" class="absolute bottom-0 left-0 right-0 px-2 pb-2">
            <div class="h-0.5 bg-zinc-700 rounded-full overflow-hidden">
              <div class="h-full bg-yellow-400/50 transition-all duration-300"
                   :style="{ width: `${badge.progress}%` }">
              </div>
            </div>
          </div>

          <!-- Glow Effect for Unlocked Badges -->
          <div v-if="badge.unlocked" 
               class="absolute inset-0 bg-yellow-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Trades Section -->
    <div class="mt-6">
      <div class="flex justify-between items-center mb-3">
        <h4 class="text-sm font-bold text-yellow-400">Trades Récents</h4>
        <div class="flex gap-1">
          <button @click="scrollTradesUp" 
                  class="bg-zinc-800/50 hover:bg-zinc-700 p-1 rounded transition-all">
            <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
            </svg>
          </button>
          <button @click="scrollTradesDown" 
                  class="bg-zinc-800/50 hover:bg-zinc-700 p-1 rounded transition-all">
            <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Vertical Scrollable Trades Container -->
      <div ref="tradesContainer" 
           class="space-y-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400/50 scrollbar-track-zinc-800">
        <div v-for="trade in recentTrades" :key="trade.id"
             class="flex items-center justify-between p-2 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 transition-all duration-300 text-xs">
          <div class="flex items-center gap-2">
            <div :class="[
              'w-2 h-2 rounded-full flex-shrink-0',
              trade.pnl > 0 ? 'bg-green-400' : 'bg-red-400'
            ]"></div>
            <div class="min-w-0">
              <p class="font-medium truncate">{{ trade.symbol }}</p>
              <p class="text-zinc-400 text-xs">{{ trade.time }}</p>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <p :class="[
              'font-bold text-xs',
              trade.pnl > 0 ? 'text-green-400' : 'text-red-400'
            ]">
              {{ trade.pnl > 0 ? '+' : '' }}{{ trade.pnl.toFixed(1) }}%
            </p>
            <p class="text-zinc-400 text-xs">{{ trade.size }}L</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const badgesContainer = ref(null)
const tradesContainer = ref(null)

const badges = [
  {
    id: 1,
    icon: '📈',
    name: '3 Green Days',
    unlocked: true,
    unlockedDate: '15 juin',
    progress: 100
  },
  {
    id: 2,
    icon: '🧊',
    name: 'Risk Manager',
    unlocked: true,
    unlockedDate: '12 juin',
    progress: 100
  },
  {
    id: 3,
    icon: '✍️',
    name: 'Disciplined Trader',
    unlocked: false,
    progress: 80
  },
  {
    id: 4,
    icon: '🎯',
    name: 'Hit Your Goal',
    unlocked: false,
    progress: 65
  },
  {
    id: 5,
    icon: '🔥',
    name: 'Hot Streak',
    unlocked: false,
    progress: 45
  },
  {
    id: 6,
    icon: '💎',
    name: 'Diamond Hands',
    unlocked: true,
    unlockedDate: '10 juin',
    progress: 100
  }
]

const recentTrades = [
  { id: 1, symbol: 'EUR/USD', time: '14:32', pnl: 1.25, size: 0.5 },
  { id: 2, symbol: 'GBP/JPY', time: '13:15', pnl: -0.85, size: 0.3 },
  { id: 3, symbol: 'XAU/USD', time: '11:45', pnl: 2.10, size: 0.2 },
  { id: 4, symbol: 'US30', time: '10:20', pnl: -1.45, size: 0.1 },
  { id: 5, symbol: 'NAS100', time: '09:30', pnl: 0.95, size: 0.4 },
  { id: 6, symbol: 'BTC/USD', time: '08:45', pnl: 3.20, size: 0.1 },
  { id: 7, symbol: 'ETH/USD', time: '08:15', pnl: -2.10, size: 0.2 }
]

const unlockedCount = computed(() => badges.filter(b => b.unlocked).length)
const recentBadges = computed(() => badges)

// Scroll functions for badges (horizontal)
function scrollLeft() {
  if (badgesContainer.value) {
    badgesContainer.value.scrollBy({ left: -120, behavior: 'smooth' })
  }
}

function scrollRight() {
  if (badgesContainer.value) {
    badgesContainer.value.scrollBy({ left: 120, behavior: 'smooth' })
  }
}

// Scroll functions for trades (vertical)
function scrollTradesUp() {
  if (tradesContainer.value) {
    tradesContainer.value.scrollBy({ top: -60, behavior: 'smooth' })
  }
}

function scrollTradesDown() {
  if (tradesContainer.value) {
    tradesContainer.value.scrollBy({ top: 60, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}

/* Hide scrollbar for badges container */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Custom scrollbar for trades */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thumb-yellow-400\/50::-webkit-scrollbar-thumb {
  background-color: rgba(250, 204, 21, 0.5);
  border-radius: 2px;
}

.scrollbar-track-zinc-800::-webkit-scrollbar-track {
  background-color: rgb(39, 39, 42);
  border-radius: 2px;
}

/* Smooth scroll behavior */
.scroll-smooth {
  scroll-behavior: smooth;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .w-24 {
    width: 5rem;
  }
}

@media (max-width: 640px) {
  .w-24 {
    width: 4.5rem;
  }
  
  .text-xs {
    font-size: 0.65rem;
  }
}
</style>