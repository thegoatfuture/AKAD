<template>
  <section class="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white py-24 px-6 overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Gradient orbs -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
      
      <!-- Animated particles -->
      <div class="absolute inset-0">
        <div class="absolute w-2 h-2 bg-yellow-400/20 rounded-full top-1/4 left-1/4 animate-float-slow"></div>
        <div class="absolute w-3 h-3 bg-yellow-400/30 rounded-full top-3/4 right-1/4 animate-float-medium"></div>
        <div class="absolute w-2 h-2 bg-yellow-400/20 rounded-full top-1/2 left-3/4 animate-float-fast"></div>
      </div>
    </div>

    <!-- Content container -->
    <div class="max-w-5xl mx-auto relative">
      <div class="text-center space-y-6">
        <!-- Main heading with gradient -->
        <h2 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
          Devenez un trader d'élite
        </h2>
        
        <!-- Features list -->
        <div class="flex flex-wrap justify-center gap-6 text-lg text-gray-300 mt-6">
          <div class="flex items-center gap-2">
            <span class="text-yellow-400">•</span>
            <span>Capital simulé jusqu'à 200k€</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-yellow-400">•</span>
            <span>90% des profits reversés</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-yellow-400">•</span>
            <span>Support 24/7</span>
          </div>
        </div>

        <!-- Timer section -->
        <div v-if="remainingTime > 0" class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-800/50 backdrop-blur border border-zinc-700/50">
          <span class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
          <span class="text-gray-400">Offre spéciale valide encore</span>
          <span class="font-mono text-yellow-400">{{ formattedTime }}</span>
        </div>

        <!-- CTA Button -->
        <div class="mt-8">
          <NuxtLink
            to="/challenge"
            class="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(250,204,21,0.3)]"
          >
            Commencer maintenant
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </NuxtLink>
        </div>

        <!-- Trust indicators -->
        <div class="flex flex-wrap justify-center items-center gap-8 mt-12">
          <img v-for="method in paymentMethods" 
               :key="method"
               :src="`/images/${method}.svg`"
               :alt="method"
               class="h-8 w-auto opacity-50 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const remainingTime = ref(86400) // 24h in seconds
const paymentMethods = ['visa', 'mastercard', 'paypal', 'skrill']

const formattedTime = computed(() => {
  const hours = Math.floor(remainingTime.value / 3600)
  const minutes = Math.floor((remainingTime.value % 3600) / 60)
  const seconds = remainingTime.value % 60
  return `${hours}h ${minutes}m ${seconds}s`
})

onMounted(() => {
  const interval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      clearInterval(interval)
    }
  }, 1000)
})
</script>

<style scoped>
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}

@keyframes float-medium {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-15px, -15px); }
}

@keyframes float-fast {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(10px, -10px); }
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 5s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

.delay-700 {
  animation-delay: 700ms;
}

.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>