<template>
  <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50 relative overflow-hidden">
    <!-- Glow effect container -->
    <div ref="glowContainer" class="absolute inset-0 pointer-events-none">
      <div 
        ref="glowElement"
        class="absolute w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl opacity-0 transition-opacity duration-300"
        :style="{ transform: `translate(${glowPosition.x}px, ${glowPosition.y}px)` }"
      ></div>
    </div>

    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="text-xl font-bold text-yellow-400">Badges & Achievements</h3>
        <p class="text-sm text-zinc-400">{{ unlockedCount }}/{{ badges.length }} badges débloqués</p>
      </div>
      <NuxtLink to="/badges" class="text-sm text-yellow-400 hover:text-yellow-300">
        Voir tous les badges
      </NuxtLink>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useMouseInElement } from '@vueuse/core'

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
  }
]

const unlockedCount = computed(() => badges.filter(b => b.unlocked).length)

const glowContainer = ref(null)
const glowElement = ref(null)
const glowPosition = ref({ x: 0, y: 0 })

const { elementX, elementY, isOutside } = useMouseInElement(glowContainer)

function updateGlowPosition() {
  if (glowElement.value && !isOutside.value) {
    // Center the glow effect by subtracting half its width/height
    glowPosition.value = {
      x: elementX.value - 64,
      y: elementY.value - 64
    }
    glowElement.value.style.opacity = '1'
  } else if (glowElement.value) {
    glowElement.value.style.opacity = '0'
  }
}

onMounted(() => {
  window.addEventListener('mousemove', updateGlowPosition)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', updateGlowPosition)
})

function showBadgeDetails(badge) {
  // TODO: Implement badge details modal
  console.log('Show badge details:', badge)
}
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>