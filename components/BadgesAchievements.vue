<template>
  <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50 relative overflow-hidden">
    <!-- Points Overview -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h3 class="text-xl font-bold text-yellow-400">Badges & Achievements</h3>
        <div class="flex items-center gap-4 mt-2">
          <p class="text-sm text-zinc-400">{{ unlockedCount }}/{{ badges.length }} badges débloqués</p>
          <div class="flex items-center gap-2 bg-yellow-400/10 px-3 py-1 rounded-full">
            <span class="text-yellow-400 font-bold">{{ totalPoints }}</span>
            <span class="text-sm text-zinc-400">points</span>
          </div>
        </div>
      </div>
      <button @click="showRewardsModal = true" 
              class="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-all">
        Utiliser mes points
      </button>
    </div>

    <!-- Glow effect container -->
    <div ref="glowContainer" class="absolute inset-0 pointer-events-none">
      <div 
        ref="glowElement"
        class="absolute w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl opacity-0 transition-opacity duration-300"
        :style="{ transform: `translate(${glowPosition.x}px, ${glowPosition.y}px)` }"
      ></div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="badge in badges" :key="badge.id" 
           @click="showBadgeDetails(badge)"
           class="group relative bg-zinc-800/50 rounded-xl p-4 cursor-pointer border border-zinc-700/30 transition-all duration-300 hover:border-yellow-400/30">
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
          <!-- Points indicator -->
          <div v-if="badge.points" class="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
            +{{ badge.points }}
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

    <!-- Rewards Modal -->
    <div v-if="showRewardsModal" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
         @click.self="showRewardsModal = false">
      <div class="bg-zinc-900 rounded-2xl p-8 w-full max-w-lg">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-2xl font-bold text-yellow-400">Récompenses</h3>
            <p class="text-sm text-zinc-400">Vous avez {{ totalPoints }} points</p>
          </div>
          <button @click="showRewardsModal = false" class="text-zinc-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div v-for="reward in availableRewards" :key="reward.id"
               class="bg-zinc-800 rounded-xl p-4 flex justify-between items-center">
            <div>
              <div class="font-medium text-white">{{ reward.name }}</div>
              <div class="text-sm text-zinc-400">{{ reward.points }} points</div>
            </div>
            <button 
              @click="redeemReward(reward)"
              :disabled="totalPoints < reward.points"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all',
                totalPoints >= reward.points 
                  ? 'bg-yellow-400 text-black hover:bg-yellow-500' 
                  : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
              ]"
            >
              Échanger
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const showRewardsModal = ref(false)
const glowContainer = ref(null)
const glowElement = ref(null)
const glowPosition = ref({ x: 0, y: 0 })

const badges = [
  {
    id: 1,
    icon: '📈',
    name: '3 Green Days',
    description: 'Trois jours consécutifs de trading gagnants',
    condition: '3 jours de trading positifs consécutifs',
    unlocked: true,
    unlockedDate: '15 juin 2025',
    points: 20,
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
    points: 30,
    progress: 100
  },
  {
    id: 3,
    icon: '✍️',
    name: 'Disciplined Trader',
    description: 'Journal de trading rempli pendant 5 jours consécutifs',
    condition: 'Journal complété 5 jours de suite',
    unlocked: false,
    points: 25,
    progress: 80
  },
  {
    id: 4,
    icon: '🎯',
    name: 'Hit Your Goal',
    description: 'Objectif mensuel atteint',
    condition: '+5% sur le mois',
    unlocked: false,
    points: 50,
    progress: 65
  }
]

const availableRewards = [
  {
    id: 1,
    name: '10% de réduction sur le prochain challenge',
    points: 50,
    code: 'POINTS10'
  },
  {
    id: 2,
    name: '20% de réduction sur le prochain challenge',
    points: 100,
    code: 'POINTS20'
  },
  {
    id: 3,
    name: 'Challenge gratuit',
    points: 200,
    code: 'POINTS100'
  }
]

const unlockedCount = computed(() => badges.filter(b => b.unlocked).length)
const totalPoints = computed(() => {
  return badges
    .filter(badge => badge.unlocked)
    .reduce((sum, badge) => sum + (badge.points || 0), 0)
})

const { elementX, elementY, isOutside } = useMouseInElement(glowContainer)

function updateGlowPosition() {
  if (glowElement.value && !isOutside.value) {
    glowPosition.value = {
      x: elementX.value - 64,
      y: elementY.value - 64
    }
    glowElement.value.style.opacity = '1'
  } else if (glowElement.value) {
    glowElement.value.style.opacity = '0'
  }
}

function showBadgeDetails(badge) {
  // TODO: Implement badge details modal
  console.log('Show badge details:', badge)
}

function redeemReward(reward) {
  if (totalPoints.value >= reward.points) {
    // TODO: Implement reward redemption
    console.log('Redeem reward:', reward)
    // Show success message with code
    alert(`Code de réduction: ${reward.code}`)
    showRewardsModal.value = false
  }
}

onMounted(() => {
  window.addEventListener('mousemove', updateGlowPosition)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', updateGlowPosition)
})
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>