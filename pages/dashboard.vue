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
      <!-- Welcome Section -->
      <div class="bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 backdrop-blur-lg rounded-3xl p-8 border border-zinc-800/50">
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
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Active Challenge - Enhanced with Account Selector -->
        <div class="lg:col-span-2 bg-zinc-900/50 backdrop-blur-lg rounded-2xl border border-zinc-800/50 relative overflow-hidden">
          <!-- Account Selector Header -->
          <div class="bg-zinc-800/30 p-4 border-b border-zinc-700/50">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2"/>
                </svg>
                <h3 class="text-lg font-bold text-white">Mes Comptes</h3>
              </div>
              
              <!-- Account Dropdown -->
              <div class="relative">
                <button @click="showAccountSelector = !showAccountSelector"
                        class="flex items-center gap-2 bg-zinc-700/50 hover:bg-zinc-600/50 px-4 py-2 rounded-lg transition-all duration-300">
                  <span class="text-sm font-medium">{{ selectedAccount.name }}</span>
                  <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': showAccountSelector }" 
                       fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div v-if="showAccountSelector" 
                     class="absolute right-0 top-full mt-2 w-80 bg-zinc-800/95 backdrop-blur-lg rounded-xl border border-zinc-700/50 shadow-2xl z-50 animate-fade-in">
                  <div class="p-4">
                    <h4 class="text-sm font-semibold text-zinc-400 mb-3">Sélectionner un compte</h4>
                    <div class="space-y-2">
                      <div v-for="account in accounts" :key="account.id"
                           @click="selectAccount(account)"
                           :class="[
                             'p-3 rounded-lg cursor-pointer transition-all duration-200 border',
                             selectedAccount.id === account.id 
                               ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' 
                               : 'bg-zinc-700/30 border-zinc-600/30 hover:bg-zinc-600/50 hover:border-zinc-500/50'
                           ]">
                        <div class="flex items-center justify-between">
                          <div>
                            <div class="font-medium text-sm">{{ account.name }}</div>
                            <div class="text-xs text-zinc-400">{{ account.type }} • {{ account.capital }}</div>
                          </div>
                          <div class="flex items-center gap-2">
                            <div :class="[
                              'w-2 h-2 rounded-full',
                              account.status === 'active' ? 'bg-green-400 animate-pulse' : 
                              account.status === 'verification' ? 'bg-yellow-400 animate-pulse' : 'bg-zinc-500'
                            ]"></div>
                            <span class="text-xs capitalize" :class="[
                              account.status === 'active' ? 'text-green-400' : 
                              account.status === 'verification' ? 'text-yellow-400' : 'text-zinc-400'
                            ]">
                              {{ account.statusText }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Add New Account Button -->
                    <button @click="createNewAccount" 
                            class="w-full mt-4 p-3 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-yellow-400">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                      <span class="text-sm font-medium">Nouveau Challenge</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Details -->
          <div class="p-6">
            <!-- Status indicator -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-2xl font-bold text-yellow-400 mb-2">{{ selectedAccount.name }}</h2>
                <div class="flex items-center gap-4 text-sm text-zinc-400">
                  <span>{{ selectedAccount.phase }}</span>
                  <span>•</span>
                  <span>Capital: {{ selectedAccount.capital }}</span>
                  <span>•</span>
                  <span>Objectif: {{ selectedAccount.target }}</span>
                </div>
              </div>
              
              <div class="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                {{ selectedAccount.statusText }}
              </div>
            </div>

            <!-- Dynamic Progress Bar -->
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-zinc-400">Progression vers l'objectif</span>
                <span class="text-sm font-medium">{{ selectedAccount.currentPnL }} / {{ selectedAccount.target }}</span>
              </div>
              <div class="h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div :class="[
                  'h-full rounded-full transition-all duration-500',
                  selectedAccount.progressColor
                ]" :style="{ width: `${Math.max(0, selectedAccount.progressPercent)}%` }"></div>
              </div>
              <div class="flex justify-between text-xs text-zinc-500 mt-1">
                <span>{{ selectedAccount.progressPercent }}% complété</span>
                <span>{{ selectedAccount.daysRemaining }} jours restants</span>
              </div>
            </div>

            <!-- Key Metrics Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div v-for="stat in selectedAccount.stats" :key="stat.label" 
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
            <div class="flex gap-3">
              <button class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Accéder au Trading
              </button>
              <button class="px-6 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-lg font-semibold transition-all duration-300">
                Détails
              </button>
              <button @click="showAccountHistory = !showAccountHistory"
                      class="px-6 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-lg font-semibold transition-all duration-300">
                Historique
              </button>
            </div>

            <!-- Account History (Collapsible) -->
            <div v-if="showAccountHistory" class="mt-6 p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/30 animate-fade-in">
              <h4 class="text-sm font-semibold text-yellow-400 mb-3">Historique des performances</h4>
              <div class="space-y-2">
                <div v-for="entry in selectedAccount.history" :key="entry.date"
                     class="flex justify-between items-center text-sm">
                  <span class="text-zinc-400">{{ entry.date }}</span>
                  <span :class="entry.pnl >= 0 ? 'text-green-400' : 'text-red-400'">
                    {{ entry.pnl >= 0 ? '+' : '' }}{{ entry.pnl }}%
                  </span>
                </div>
              </div>
            </div>
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
                <span class="font-bold text-green-400">{{ selectedAccount.performance.winRate }}%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-zinc-400">Profit Factor</span>
                <span class="font-bold text-blue-400">{{ selectedAccount.performance.profitFactor }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-zinc-400">Avg R:R</span>
                <span class="font-bold text-purple-400">{{ selectedAccount.performance.avgRR }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-zinc-400">Max Drawdown</span>
                <span class="font-bold text-red-400">{{ selectedAccount.performance.maxDrawdown }}%</span>
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
                <span class="font-bold">{{ selectedAccount.activity.tradesToday }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-zinc-400">Trades cette semaine</span>
                <span class="font-bold">{{ selectedAccount.activity.tradesWeek }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-zinc-400">Jours actifs</span>
                <span class="font-bold">{{ selectedAccount.activity.activeDays }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-zinc-400">Dernière activité</span>
                <span class="font-bold text-green-400">{{ selectedAccount.activity.lastActivity }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts and Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Equity Chart -->
        <EquityChart />
        
        <!-- Trading Plan -->
        <TradingPlan />
      </div>

      <!-- Recent Activity & Achievements -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      <TradingJournal />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TradingJournal from '../components/TradingJournal.vue'
import EquityChart from '../components/EquityChart.vue'
import TradingPlan from '../components/TradingPlan.vue'
import BadgesAchievements from '../components/BadgesAchievements.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const showAccountSelector = ref(false)
const showAccountHistory = ref(false)
const selectedAccountId = ref(1)

// Multiple accounts data
const accounts = ref([
  {
    id: 1,
    name: 'AKAD Challenge #510163222',
    type: 'Challenge',
    capital: '€160,000',
    target: '€8,000',
    currentPnL: '-€2,500',
    progressPercent: 0,
    progressColor: 'bg-red-400',
    phase: 'Jour 8/14',
    status: 'verification',
    statusText: 'Phase de Vérification',
    daysRemaining: 6,
    stats: [
      { label: 'Balance', value: '€160,000.00', change: '-2.5%', color: 'text-red-400' },
      { label: 'Equity', value: '€157,500.00', change: '-1.8%', color: 'text-red-400' },
      { label: 'Profit/Loss', value: '-€2,500.00', change: null, color: 'text-red-400' },
      { label: 'Drawdown', value: '4.8%', change: '+0.5%', color: 'text-yellow-400' }
    ],
    performance: {
      winRate: 68,
      profitFactor: 1.45,
      avgRR: '1:2.3',
      maxDrawdown: 4.8
    },
    activity: {
      tradesToday: 3,
      tradesWeek: 12,
      activeDays: '8/14',
      lastActivity: 'Il y a 2h'
    },
    history: [
      { date: '15 Juin', pnl: -1.2 },
      { date: '14 Juin', pnl: 0.8 },
      { date: '13 Juin', pnl: -0.5 },
      { date: '12 Juin', pnl: 1.5 },
      { date: '11 Juin', pnl: -2.1 }
    ]
  },
  {
    id: 2,
    name: 'AKAD Challenge #510163111',
    type: 'Challenge',
    capital: '€100,000',
    target: '€10,000',
    currentPnL: '+€7,500',
    progressPercent: 75,
    progressColor: 'bg-green-400',
    phase: 'Jour 12/14',
    status: 'active',
    statusText: 'Challenge Actif',
    daysRemaining: 2,
    stats: [
      { label: 'Balance', value: '€107,500.00', change: '+1.2%', color: 'text-green-400' },
      { label: 'Equity', value: '€107,200.00', change: '+0.8%', color: 'text-green-400' },
      { label: 'Profit/Loss', value: '+€7,500.00', change: null, color: 'text-green-400' },
      { label: 'Drawdown', value: '2.1%', change: '-0.3%', color: 'text-green-400' }
    ],
    performance: {
      winRate: 72,
      profitFactor: 1.85,
      avgRR: '1:2.8',
      maxDrawdown: 2.1
    },
    activity: {
      tradesToday: 5,
      tradesWeek: 18,
      activeDays: '12/14',
      lastActivity: 'Il y a 30min'
    },
    history: [
      { date: '15 Juin', pnl: 2.1 },
      { date: '14 Juin', pnl: 1.8 },
      { date: '13 Juin', pnl: 0.5 },
      { date: '12 Juin', pnl: 1.2 },
      { date: '11 Juin', pnl: 1.9 }
    ]
  },
  {
    id: 3,
    name: 'AKAD Trader #510163000',
    type: 'Funded',
    capital: '€200,000',
    target: 'Aucun objectif',
    currentPnL: '+€15,200',
    progressPercent: 100,
    progressColor: 'bg-yellow-400',
    phase: 'Compte financé',
    status: 'active',
    statusText: 'Trader Financé',
    daysRemaining: 'Illimité',
    stats: [
      { label: 'Balance', value: '€215,200.00', change: '+0.9%', color: 'text-green-400' },
      { label: 'Equity', value: '€214,800.00', change: '+0.7%', color: 'text-green-400' },
      { label: 'Profit/Loss', value: '+€15,200.00', change: null, color: 'text-green-400' },
      { label: 'Drawdown', value: '1.2%', change: '+0.1%', color: 'text-green-400' }
    ],
    performance: {
      winRate: 78,
      profitFactor: 2.15,
      avgRR: '1:3.1',
      maxDrawdown: 1.2
    },
    activity: {
      tradesToday: 2,
      tradesWeek: 8,
      activeDays: '∞',
      lastActivity: 'Il y a 1h'
    },
    history: [
      { date: '15 Juin', pnl: 1.5 },
      { date: '14 Juin', pnl: 2.2 },
      { date: '13 Juin', pnl: 0.8 },
      { date: '12 Juin', pnl: 1.8 },
      { date: '11 Juin', pnl: 2.5 }
    ]
  }
])

const selectedAccount = computed(() => {
  return accounts.value.find(acc => acc.id === selectedAccountId.value) || accounts.value[0]
})

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

function selectAccount(account) {
  selectedAccountId.value = account.id
  showAccountSelector.value = false
}

function createNewAccount() {
  showAccountSelector.value = false
  // Redirect to challenge creation
  navigateTo('/challenge')
}

// Close dropdown when clicking outside
function handleClickOutside(event) {
  if (!event.target.closest('.account-selector')) {
    showAccountSelector.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
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

/* Fade in animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
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