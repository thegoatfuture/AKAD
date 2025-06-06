<template>
  <div class="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Animated gradient orbs -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/3 rounded-full blur-3xl animate-float-medium"></div>
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300/3 rounded-full blur-2xl animate-float-fast"></div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-[url('/images/pattern-light.svg')] bg-repeat opacity-[0.01]"></div>
    </div>

    <main class="relative z-10 p-6 space-y-8">
      <!-- Rest of the content remains unchanged -->
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TradingJournal from '../components/TradingJournal.vue'
import EquityChart from '../components/EquityChart.vue'
import TradingPlan from '../components/TradingPlan.vue'
import BadgesAchievements from '../components/BadgesAchievements.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const accountStats = [
  { label: 'Balance', value: '€160,000.00', change: '-2.5%', color: 'text-red-400' },
  { label: 'Equity', value: '€157,500.00', change: '-1.8%', color: 'text-red-400' },
  { label: 'Profit/Loss', value: '-€2,500.00', change: null, color: 'text-red-400' },
  { label: 'Drawdown', value: '4.8%', change: '+0.5%', color: 'text-yellow-400' }
]

const recentTrades = [
  {
    id: 1,
    symbol: 'EUR/USD',
    time: '14:32',
    pnl: 1.25,
    size: 0.5
  },
  {
    id: 2,
    symbol: 'GBP/JPY',
    time: '13:15',
    pnl: -0.85,
    size: 0.3
  },
  {
    id: 3,
    symbol: 'XAU/USD',
    time: '11:45',
    pnl: 2.10,
    size: 0.2
  },
  {
    id: 4,
    symbol: 'US30',
    time: '10:20',
    pnl: -1.45,
    size: 0.1
  }
]
</script>

<style scoped>
/* Floating animations */
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(1deg); }
  66% { transform: translate(-20px, 20px) rotate(-1deg); }
}

@keyframes float-medium {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-25px, -25px) rotate(2deg); }
}

@keyframes float-fast {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, -10px) rotate(-1deg); }
  75% { transform: translate(-15px, 15px) rotate(1deg); }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

/* Backdrop blur support */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
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

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Pulse animation for status indicators */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>