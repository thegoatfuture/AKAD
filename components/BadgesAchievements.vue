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

    <!-- Missions Section -->
    <div class="mt-6">
      <div class="flex justify-between items-center mb-3">
        <h4 class="text-sm font-bold text-yellow-400">Missions Quotidiennes</h4>
        <div class="flex gap-1">
          <button @click="scrollMissionsUp" 
                  class="bg-zinc-800/50 hover:bg-zinc-700 p-1 rounded transition-all">
            <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
            </svg>
          </button>
          <button @click="scrollMissionsDown" 
                  class="bg-zinc-800/50 hover:bg-zinc-700 p-1 rounded transition-all">
            <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Vertical Scrollable Missions Container -->
      <div ref="missionsContainer" 
           class="space-y-3 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400/50 scrollbar-track-zinc-800">
        
        <div v-for="mission in dailyMissions" :key="mission.id"
             class="bg-zinc-800/30 rounded-lg p-3 hover:bg-zinc-800/50 transition-all duration-300 border border-zinc-700/30 hover:border-yellow-400/20">
          
          <!-- Mission Header -->
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <div class="text-lg">{{ mission.icon }}</div>
              <div>
                <h5 class="font-medium text-white text-sm">{{ mission.title }}</h5>
                <p class="text-zinc-400 text-xs">{{ mission.description }}</p>
              </div>
            </div>
            
            <!-- Mission Status -->
            <div class="flex items-center gap-2">
              <div v-if="mission.completed" 
                   class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div v-else class="text-xs font-bold text-yellow-400">
                +{{ mission.reward }}
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mb-2">
            <div class="flex justify-between items-center mb-1">
              <span class="text-xs text-zinc-400">Progression</span>
              <span class="text-xs font-medium" :class="mission.completed ? 'text-green-400' : 'text-yellow-400'">
                {{ mission.current }}/{{ mission.target }}
              </span>
            </div>
            
            <div class="h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div :class="[
                'h-full rounded-full transition-all duration-500',
                mission.completed ? 'bg-green-400' : 'bg-yellow-400'
              ]" :style="{ width: `${Math.min(100, (mission.current / mission.target) * 100)}%` }">
              </div>
            </div>
          </div>

          <!-- Mission Reward -->
          <div class="flex justify-between items-center">
            <div class="text-xs text-zinc-500">
              {{ mission.timeLeft }}
            </div>
            <div class="flex items-center gap-1 text-xs">
              <span class="text-zinc-400">Récompense:</span>
              <span :class="mission.completed ? 'text-green-400' : 'text-yellow-400'" class="font-medium">
                {{ mission.reward }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Daily Progress Summary -->
      <div class="mt-4 p-3 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-lg border border-yellow-400/20">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm font-medium text-yellow-400">Progression du jour</p>
            <p class="text-xs text-zinc-400">{{ completedMissions }}/{{ dailyMissions.length }} missions complétées</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-yellow-400">{{ totalRewardsEarned }}</p>
            <p class="text-xs text-zinc-400">Points gagnés</p>
          </div>
        </div>
        
        <!-- Overall Progress Bar -->
        <div class="mt-2 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
               :style="{ width: `${(completedMissions / dailyMissions.length) * 100}%` }">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const badgesContainer = ref(null)
const missionsContainer = ref(null)

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

const dailyMissions = [
  {
    id: 1,
    icon: '📊',
    title: 'Analyser 3 paires',
    description: 'Effectuer une analyse technique sur 3 paires différentes',
    current: 2,
    target: 3,
    completed: false,
    reward: '50 pts',
    timeLeft: 'Expire dans 8h'
  },
  {
    id: 2,
    icon: '💰',
    title: 'Trade profitable',
    description: 'Réaliser au moins 1 trade gagnant',
    current: 1,
    target: 1,
    completed: true,
    reward: '100 pts',
    timeLeft: 'Complété'
  },
  {
    id: 3,
    icon: '📝',
    title: 'Journal de trading',
    description: 'Remplir le journal pour tous vos trades',
    current: 3,
    target: 5,
    completed: false,
    reward: '75 pts',
    timeLeft: 'Expire dans 12h'
  },
  {
    id: 4,
    icon: '🎯',
    title: 'Respecter le stop-loss',
    description: 'Ne pas dépasser 2% de risque par trade',
    current: 4,
    target: 5,
    completed: false,
    reward: '80 pts',
    timeLeft: 'Expire dans 6h'
  },
  {
    id: 5,
    icon: '⏰',
    title: 'Session matinale',
    description: 'Trader pendant la session de Londres',
    current: 1,
    target: 1,
    completed: true,
    reward: '60 pts',
    timeLeft: 'Complété'
  },
  {
    id: 6,
    icon: '📚',
    title: 'Formation continue',
    description: 'Regarder 1 vidéo éducative',
    current: 0,
    target: 1,
    completed: false,
    reward: '40 pts',
    timeLeft: 'Expire dans 15h'
  }
]

const unlockedCount = computed(() => badges.filter(b => b.unlocked).length)
const recentBadges = computed(() => badges)

const completedMissions = computed(() => dailyMissions.filter(m => m.completed).length)
const totalRewardsEarned = computed(() => {
  return dailyMissions
    .filter(m => m.completed)
    .reduce((total, m) => total + parseInt(m.reward), 0)
})

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

// Scroll functions for missions (vertical)
function scrollMissionsUp() {
  if (missionsContainer.value) {
    missionsContainer.value.scrollBy({ top: -80, behavior: 'smooth' })
  }
}

function scrollMissionsDown() {
  if (missionsContainer.value) {
    missionsContainer.value.scrollBy({ top: 80, behavior: 'smooth' })
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

/* Custom scrollbar for missions */
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

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
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

/* Progress bar animations */
@keyframes progress-fill {
  from {
    width: 0%;
  }
  to {
    width: var(--progress-width);
  }
}

.progress-animate {
  animation: progress-fill 1s ease-out;
}

/* Mission completion effect */
.mission-completed {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
  border-color: rgba(34, 197, 94, 0.3);
}

/* Pulse animation for active missions */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.3);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(250, 204, 21, 0.1);
  }
}

.mission-active {
  animation: pulse-glow 2s infinite;
}
</style>