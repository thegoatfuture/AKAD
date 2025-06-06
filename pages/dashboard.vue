<template>
  <main class="p-6 space-y-8">
    <!-- Background Effects -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <!-- Animated gradient orbs -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/3 rounded-full blur-3xl animate-float-medium"></div>
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300/3 rounded-full blur-2xl animate-float-fast"></div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-[url('/images/pattern-light.svg')] bg-repeat opacity-[0.01]"></div>
    </div>

    <!-- Welcome Section -->
    <div class="relative z-10 bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 backdrop-blur-lg rounded-3xl p-8 border border-zinc-800/50">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-2">
            Bienvenue, <span class="text-yellow-400">TEST123</span> 👋
          </h1>
          <p class="text-zinc-400 text-lg">
            Voici un aperçu de vos performances et de votre progression
          </p>
        </div>
        
        <!-- Quick Actions -->
        <div class="flex gap-4">
          <button class="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Nouveau Challenge
          </button>
          <button class="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            Voir Rapports
          </button>
        </div>
      </div>
    </div>

    <!-- Account Status Cards -->
    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Active Challenge -->
      <div class="lg:col-span-2 bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800/50 relative overflow-hidden">
        <!-- Status indicator -->
        <div class="absolute top-4 right-4">
          <div class="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Phase de Vérification
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-2xl font-bold text-yellow-400 mb-2">AKAD Challenge #510163222</h2>
          <div class="flex items-center gap-4 text-sm text-zinc-400">
            <span>Jour 8/14</span>
            <span>•</span>
            <span>Capital: €160,000</span>
            <span>•</span>
            <span>Objectif: €8,000</span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-zinc-400">Progression vers l'objectif</span>
            <span class="text-sm font-medium">-€2,500 / €8,000</span>
          </div>
          <div class="h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-500" 
                 style="width: 0%"></div>
          </div>
        </div>

        <!-- Key Metrics Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="stat in accountStats" :key="stat.label" 
               class="bg-zinc-800/30 p-4 rounded-xl border border-zinc-700/30 hover:border-yellow-400/30 transition-all duration-300 group">
            <p class="text-xs text-zinc-400 mb-1">{{ stat.label }}</p>
            <p :class="['text-lg font-bold', stat.color]">{{ stat.value }}</p>
            <p v-if="stat.change" class="text-xs mt-1 flex items-center gap-1" :class="stat.color">
              <svg v-if="stat.change.includes('+')" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9.2-9.2M17 17V7H7"/>
              </svg>
              <svg v-else class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7l-9.2 9.2M7 7v10h10"/>
              </svg>
              {{ stat.change }}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 mt-6">
          <button class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-semibold transition-all duration-300">
            Accéder au Trading
          </button>
          <button class="px-6 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-lg font-semibold transition-all duration-300">
            Détails
          </button>
        </div>
      </div>

      <!-- Account Summary -->
      <div class="space-y-6">
        <!-- Performance Summary -->
        <div class="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800/50">
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            Performance
          </h3>
          
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-zinc-400">Win Rate</span>
              <span class="font-bold text-green-400">68%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-zinc-400">Profit Factor</span>
              <span class="font-bold text-blue-400">1.45</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-zinc-400">Avg R:R</span>
              <span class="font-bold text-purple-400">1:2.3</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-zinc-400">Max Drawdown</span>
              <span class="font-bold text-red-400">4.8%</span>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800/50">
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
            Activité
          </h3>
          
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-zinc-400">Trades aujourd'hui</span>
              <span class="font-bold">3</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-zinc-400">Trades cette semaine</span>
              <span class="font-bold">12</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-zinc-400">Jours actifs</span>
              <span class="font-bold">8/14</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-zinc-400">Dernière activité</span>
              <span class="font-bold text-green-400">Il y a 2h</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts and Analytics -->
    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Equity Chart -->
      <EquityChart />
      
      <!-- Trading Plan -->
      <TradingPlan />
    </div>

    <!-- Recent Activity & Achievements -->
    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Trades -->
      <div class="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800/50">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-yellow-400">Trades Récents</h3>
          <button class="text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
            Voir tout
          </button>
        </div>
        
        <div class="space-y-4">
          <div v-for="trade in recentTrades" :key="trade.id"
               class="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 transition-all duration-300">
            <div class="flex items-center gap-3">
              <div :class="[
                'w-3 h-3 rounded-full',
                trade.pnl > 0 ? 'bg-green-400' : 'bg-red-400'
              ]"></div>
              <div>
                <p class="font-medium">{{ trade.symbol }}</p>
                <p class="text-sm text-zinc-400">{{ trade.time }}</p>
              </div>
            </div>
            <div class="text-right">
              <p :class="[
                'font-bold',
                trade.pnl > 0 ? 'text-green-400' : 'text-red-400'
              ]">
                {{ trade.pnl > 0 ? '+' : '' }}{{ trade.pnl.toFixed(2) }}%
              </p>
              <p class="text-sm text-zinc-400">{{ trade.size }} lots</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Badges & Achievements -->
      <BadgesAchievements />
    </div>

    <!-- Risk Management & Alerts -->
    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Risk Metrics -->
      <div class="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800/50">
        <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          Gestion du Risque
        </h3>
        
        <div class="space-y-4">
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-zinc-400">Drawdown Actuel</span>
              <span class="text-sm font-medium text-red-400">4.8%</span>
            </div>
            <div class="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div class="h-full bg-red-400 rounded-full transition-all duration-500" style="width: 48%"></div>
            </div>
            <p class="text-xs text-zinc-500 mt-1">Limite: 10%</p>
          </div>
          
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-zinc-400">Risque par Trade</span>
              <span class="text-sm font-medium text-yellow-400">1.2%</span>
            </div>
            <div class="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div class="h-full bg-yellow-400 rounded-full transition-all duration-500" style="width: 24%"></div>
            </div>
            <p class="text-xs text-zinc-500 mt-1">Recommandé: ≤2%</p>
          </div>
        </div>
      </div>

      <!-- Market Alerts -->
      <div class="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800/50">
        <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          Alertes Marché
        </h3>
        
        <div class="space-y-3">
          <div class="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div class="w-2 h-2 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
            <div>
              <p class="text-sm font-medium">EUR/USD</p>
              <p class="text-xs text-zinc-400">Résistance à 1.0850</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div class="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
            <div>
              <p class="text-sm font-medium">NFP Report</p>
              <p class="text-xs text-zinc-400">Vendredi 15:30</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Tools -->
      <div class="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800/50">
        <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Outils Rapides
        </h3>
        
        <div class="space-y-3">
          <button class="w-full bg-zinc-800/50 hover:bg-zinc-700/50 p-3 rounded-lg text-left transition-all duration-300 group">
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
              <span class="text-sm font-medium">Calculateur de Position</span>
            </div>
          </button>
          
          <button class="w-full bg-zinc-800/50 hover:bg-zinc-700/50 p-3 rounded-lg text-left transition-all duration-300 group">
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <span class="text-sm font-medium">Analyse de Performance</span>
            </div>
          </button>
          
          <button class="w-full bg-zinc-800/50 hover:bg-zinc-700/50 p-3 rounded-lg text-left transition-all duration-300 group">
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              <span class="text-sm font-medium">Journal de Trading</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Trading Journal - Full Width -->
    <div class="relative z-10">
      <TradingJournal />
    </div>
  </main>
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