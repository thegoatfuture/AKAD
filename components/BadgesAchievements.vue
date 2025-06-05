<template>
  <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="text-xl font-bold text-yellow-400">Badges & Achievements</h3>
        <p class="text-sm text-zinc-400">{{ unlockedCount }}/{{ badges.length }} badges débloqués</p>
      </div>
      <NuxtLink to="/challenge" class="text-sm text-yellow-400 hover:text-yellow-300">
        Voir tous les challenges
      </NuxtLink>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="badge in badges" :key="badge.id" 
           @click="showBadgeDetails(badge)"
           class="group relative bg-zinc-800/50 rounded-xl p-4 cursor-pointer border border-zinc-700/30 transition-all duration-300 hover:border-yellow-400/30 hover:transform hover:scale-105">
        <!-- Badge Icon & Status -->
        <div class="relative flex justify-center mb-3">
          <div :class="[
            'text-4xl transition-all duration-300 group-hover:scale-110',
            badge.unlocked ? 'opacity-100' : 'opacity-40 grayscale'
          ]">
            {{ badge.icon }}
          </div>
          <div v-if="!badge.unlocked" 
               class="absolute top-0 right-0 text-lg opacity-70">
            🔒
          </div>
        </div>

        <!-- Badge Info -->
        <div class="text-center">
          <h4 class="font-medium mb-1" :class="badge.unlocked ? 'text-white' : 'text-zinc-500'">
            {{ badge.name }}
          </h4>
          <div v-if="badge.unlocked" class="text-xs text-yellow-400">
            Débloqué {{ badge.unlockedDate }}
          </div>
          <div v-else class="text-xs text-zinc-500">
            {{ badge.progress }}% complété
          </div>
        </div>

        <!-- Progress Bar for Locked Badges -->
        <div v-if="!badge.unlocked" class="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <div class="h-1 bg-zinc-700 rounded-full overflow-hidden">
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

    <!-- Badge Details Modal -->
    <div v-if="selectedBadge" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
         @click.self="selectedBadge = null">
      <div class="bg-zinc-900 rounded-2xl p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-6">
          <div class="text-4xl">{{ selectedBadge.icon }}</div>
          <button @click="selectedBadge = null" class="text-zinc-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <h3 class="text-xl font-bold text-yellow-400 mb-2">{{ selectedBadge.name }}</h3>
        <p class="text-zinc-300 mb-4">{{ selectedBadge.description }}</p>

        <div class="space-y-3">
          <div class="bg-zinc-800 rounded-lg p-3">
            <div class="text-sm text-zinc-400 mb-1">Condition</div>
            <div class="font-medium">{{ selectedBadge.condition }}</div>
          </div>

          <div v-if="selectedBadge.unlocked" class="bg-zinc-800 rounded-lg p-3">
            <div class="text-sm text-zinc-400 mb-1">Débloqué le</div>
            <div class="font-medium">{{ selectedBadge.unlockedDate }}</div>
          </div>

          <div v-if="selectedBadge.reward" class="bg-zinc-800 rounded-lg p-3">
            <div class="text-sm text-zinc-400 mb-1">Récompense</div>
            <div class="flex justify-between items-center">
              <div class="font-medium text-yellow-400">{{ selectedBadge.reward }}</div>
              <button v-if="selectedBadge.unlocked" 
                      @click="copyReward(selectedBadge.rewardCode)"
                      class="text-sm bg-yellow-400 text-black px-3 py-1 rounded-lg hover:bg-yellow-500">
                Copier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const badges = [
  {
    id: 1,
    icon: '📈',
    name: '3 Green Days',
    description: 'Trois jours consécutifs de trading gagnants',
    condition: '3 jours de trading positifs consécutifs',
    unlocked: true,
    unlockedDate: '15 juin 2025',
    reward: '-10% sur votre prochain challenge',
    rewardCode: 'GREEN10',
    progress: 100
  },
  {
    id: 2,
    icon: '🧊',
    name: 'Risk Manager',
    description: 'Excellent contrôle du risque sur une semaine complète',
    condition: 'Drawdown < 3% sur une semaine',
    unlocked: true,
    unlockedDate: '12 juin 2025',
    progress: 100
  },
  {
    id: 3,
    icon: '✍️',
    name: 'Disciplined Trader',
    description: 'Journal de trading rempli pendant 5 jours consécutifs',
    condition: 'Journal complété 5 jours de suite',
    unlocked: false,
    reward: '-10% sur votre prochain challenge',
    rewardCode: 'JOURNAL10',
    progress: 80
  },
  {
    id: 4,
    icon: '🎯',
    name: 'Hit Your Goal',
    description: 'Objectif mensuel atteint',
    condition: '+5% sur le mois',
    unlocked: false,
    reward: '-15% sur votre prochain challenge',
    rewardCode: 'GOAL15',
    progress: 65
  },
  {
    id: 5,
    icon: '🔒',
    name: 'Consistency King',
    description: 'Aucune violation de règle pendant 10 jours',
    condition: '10 jours sans violation',
    unlocked: true,
    unlockedDate: '10 juin 2025',
    reward: '-20% sur votre prochain challenge',
    rewardCode: 'KING20',
    progress: 100
  },
  {
    id: 6,
    icon: '⚖️',
    name: 'Perfect R/R',
    description: 'Trade avec un excellent ratio risque/récompense',
    condition: '1 trade avec R > 3',
    unlocked: false,
    reward: '-5% sur votre prochain challenge',
    rewardCode: 'RR05',
    progress: 45
  },
  {
    id: 7,
    icon: '💡',
    name: 'Setup Master',
    description: 'Même setup utilisé avec succès plusieurs fois',
    condition: 'Même setup 3x gagnant',
    unlocked: false,
    progress: 33
  },
  {
    id: 8,
    icon: '🧘',
    name: 'No Revenge',
    description: 'Excellent contrôle émotionnel',
    condition: '5 jours sans surtrade',
    unlocked: true,
    unlockedDate: '8 juin 2025',
    progress: 100
  },
  {
    id: 9,
    icon: '⏳',
    name: 'Patient Trader',
    description: 'Pas de fermeture prématurée',
    condition: '3 trades tenus jusqu'au TP',
    unlocked: false,
    reward: '-10% sur votre prochain challenge',
    rewardCode: 'PATIENT10',
    progress: 67
  },
  {
    id: 10,
    icon: '🧪',
    name: 'Backtester',
    description: 'Préparation complète avant trading',
    condition: '1 semaine de backtest',
    unlocked: false,
    progress: 20
  },
  {
    id: 11,
    icon: '🎓',
    name: 'Academy Master',
    description: 'Formation AKAD complétée',
    condition: '100% des modules terminés',
    unlocked: false,
    progress: 85
  },
  {
    id: 12,
    icon: '🏆',
    name: 'Challenge Complete',
    description: 'Challenge AKAD réussi',
    condition: 'Objectif du challenge atteint',
    unlocked: true,
    unlockedDate: '5 juin 2025',
    reward: 'Accès Premium 1 mois',
    rewardCode: 'PREMIUM30',
    progress: 100
  }
]

const selectedBadge = ref(null)
const unlockedCount = computed(() => badges.filter(b => b.unlocked).length)

function showBadgeDetails(badge) {
  selectedBadge.value = badge
}

function copyReward(code) {
  navigator.clipboard.writeText(code)
    .then(() => {
      // TODO: Show success notification
      console.log('Code copied!')
    })
    .catch(err => {
      console.error('Failed to copy code:', err)
    })
}
</script>