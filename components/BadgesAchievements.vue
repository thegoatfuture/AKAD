<template>
  <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="text-xl font-bold text-yellow-400">Badges & Achievements</h3>
        <p class="text-sm text-zinc-400 mt-1">{{ unlockedCount }}/{{ badges.length }} badges débloqués</p>
      </div>
      <NuxtLink to="/badges" 
                class="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-all">
        Voir tous les badges
      </NuxtLink>
    </div>

    <!-- Recent Badges Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="badge in recentBadges" :key="badge.id" 
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
    unlocked: true,
    unlockedDate: '15 juin 2025',
    progress: 100
  },
  {
    id: 2,
    icon: '🧊',
    name: 'Risk Manager',
    unlocked: true,
    unlockedDate: '12 juin 2025',
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
  }
]

const unlockedCount = computed(() => badges.filter(b => b.unlocked).length)
const recentBadges = computed(() => badges.slice(0, 4))
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>