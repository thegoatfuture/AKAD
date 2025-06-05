<template>
  <div class="min-h-screen bg-black text-white py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-yellow-400 mb-8">Badges & Réalisations</h1>
      
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div class="bg-zinc-900/80 backdrop-blur rounded-xl p-6 border border-zinc-800/50">
          <div class="text-3xl font-bold text-yellow-400 mb-2">{{ unlockedCount }}/{{ totalBadges }}</div>
          <div class="text-zinc-400">Badges Débloqués</div>
        </div>
        <div class="bg-zinc-900/80 backdrop-blur rounded-xl p-6 border border-zinc-800/50">
          <div class="text-3xl font-bold text-yellow-400 mb-2">{{ rareCount }}</div>
          <div class="text-zinc-400">Badges Rares</div>
        </div>
        <div class="bg-zinc-900/80 backdrop-blur rounded-xl p-6 border border-zinc-800/50">
          <div class="text-3xl font-bold text-yellow-400 mb-2">{{ rewardsValue }}€</div>
          <div class="text-zinc-400">Récompenses Débloquées</div>
        </div>
        <div class="bg-zinc-900/80 backdrop-blur rounded-xl p-6 border border-zinc-800/50">
          <div class="text-3xl font-bold text-yellow-400 mb-2">{{ nextUnlock }}</div>
          <div class="text-zinc-400">Prochain Badge</div>
        </div>
      </div>

      <!-- Badge Categories -->
      <div class="space-y-12">
        <div v-for="(category, index) in badgeCategories" :key="index">
          <h2 class="text-2xl font-bold mb-6">{{ category.name }}</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="badge in category.badges" :key="badge.id"
                 @click="showBadgeDetails(badge)"
                 class="group relative bg-zinc-800/50 rounded-xl p-6 cursor-pointer border border-zinc-700/30 transition-all duration-300 hover:border-yellow-400/30 hover:transform hover:scale-105">
              <!-- Badge Icon & Status -->
              <div class="relative flex justify-center mb-4">
                <div :class="[
                  'text-5xl transition-all duration-300 group-hover:scale-110',
                  badge.unlocked ? 'opacity-100' : 'opacity-40 grayscale'
                ]">
                  {{ badge.icon }}
                </div>
                <div v-if="!badge.unlocked" 
                     class="absolute top-0 right-0 text-xl opacity-70">
                  🔒
                </div>
              </div>

              <!-- Badge Info -->
              <div class="text-center">
                <h4 class="font-medium mb-2" :class="badge.unlocked ? 'text-white' : 'text-zinc-500'">
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
              <div v-if="!badge.unlocked" class="absolute bottom-0 left-0 right-0 px-4 pb-4">
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
        </div>
      </div>
    </div>

    <!-- Badge Details Modal -->
    <div v-if="selectedBadge" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
         @click.self="selectedBadge = null">
      <div class="bg-zinc-900 rounded-2xl p-8 w-full max-w-lg">
        <div class="flex justify-between items-center mb-8">
          <div class="text-6xl">{{ selectedBadge.icon }}</div>
          <button @click="selectedBadge = null" class="text-zinc-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <h3 class="text-2xl font-bold text-yellow-400 mb-3">{{ selectedBadge.name }}</h3>
        <p class="text-zinc-300 mb-6">{{ selectedBadge.description }}</p>

        <div class="space-y-4">
          <div class="bg-zinc-800 rounded-xl p-4">
            <div class="text-sm text-zinc-400 mb-1">Condition</div>
            <div class="font-medium">{{ selectedBadge.condition }}</div>
          </div>

          <div v-if="selectedBadge.unlocked" class="bg-zinc-800 rounded-xl p-4">
            <div class="text-sm text-zinc-400 mb-1">Débloqué le</div>
            <div class="font-medium">{{ selectedBadge.unlockedDate }}</div>
          </div>

          <div v-if="selectedBadge.reward" class="bg-zinc-800 rounded-xl p-4">
            <div class="text-sm text-zinc-400 mb-1">Récompense</div>
            <div class="flex justify-between items-center">
              <div class="font-medium text-yellow-400">{{ selectedBadge.reward }}</div>
              <button v-if="selectedBadge.unlocked" 
                      @click="copyReward(selectedBadge.rewardCode)"
                      class="text-sm bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500">
                Copier le code
              </button>
            </div>
          </div>

          <div v-if="!selectedBadge.unlocked" class="bg-zinc-800 rounded-xl p-4">
            <div class="text-sm text-zinc-400 mb-2">Progression</div>
            <div class="h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div class="h-full bg-yellow-400 transition-all duration-300"
                   :style="{ width: `${selectedBadge.progress}%` }">
              </div>
            </div>
            <div class="text-sm text-zinc-400 mt-2">{{ selectedBadge.progress }}% complété</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedBadge = ref(null)

const badgeCategories = [
  {
    name: 'Performance',
    badges: [
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
        progress: 100,
        rare: false
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
        progress: 65,
        rare: true
      }
    ]
  },
  {
    name: 'Discipline',
    badges: [
      {
        id: 2,
        icon: '🧊',
        name: 'Risk Manager',
        description: 'Excellent contrôle du risque sur une semaine complète',
        condition: 'Drawdown < 3% sur une semaine',
        unlocked: true,
        unlockedDate: '12 juin 2025',
        progress: 100,
        rare: false
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
        progress: 80,
        rare: false
      }
    ]
  },
  {
    name: 'Expertise',
    badges: [
      {
        id: 6,
        icon: '⚖️',
        name: 'Perfect R/R',
        description: 'Trade avec un excellent ratio risque/récompense',
        condition: '1 trade avec R > 3',
        unlocked: false,
        reward: '-5% sur votre prochain challenge',
        rewardCode: 'RR05',
        progress: 45,
        rare: true
      },
      {
        id: 7,
        icon: '💡',
        name: 'Setup Master',
        description: 'Même setup utilisé avec succès plusieurs fois',
        condition: 'Même setup 3x gagnant',
        unlocked: false,
        progress: 33,
        rare: true
      }
    ]
  }
]

// Computed values for stats
const totalBadges = computed(() => {
  return badgeCategories.reduce((total, category) => total + category.badges.length, 0)
})

const unlockedCount = computed(() => {
  return badgeCategories.reduce((total, category) => {
    return total + category.badges.filter(b => b.unlocked).length
  }, 0)
})

const rareCount = computed(() => {
  return badgeCategories.reduce((total, category) => {
    return total + category.badges.filter(b => b.rare && b.unlocked).length
  }, 0)
})

const rewardsValue = computed(() => {
  // Calculate total value of unlocked rewards
  return 150 // Example value
})

const nextUnlock = computed(() => {
  // Find badge closest to being unlocked
  let closest = { progress: 0, name: 'N/A' }
  badgeCategories.forEach(category => {
    category.badges.forEach(badge => {
      if (!badge.unlocked && badge.progress > closest.progress) {
        closest = badge
      }
    })
  })
  return closest.name
})

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