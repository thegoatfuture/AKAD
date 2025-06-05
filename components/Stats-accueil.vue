<template>
  <section class="bg-black text-white py-20 relative overflow-hidden">
    <!-- Enhanced Background Pattern -->
    <div class="absolute inset-0">
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-black to-black"></div>
      
      <!-- Animated patterns -->
      <div class="absolute inset-0 opacity-[0.03]">
        <div class="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-light.svg')] bg-repeat animate-slide"></div>
        <div class="absolute top-0 left-[-100%] w-full h-full bg-[url('/images/pattern-light.svg')] bg-repeat animate-slide"></div>
      </div>

      <!-- Glowing orbs -->
      <div class="absolute top-20 left-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-yellow-400">
          Des chiffres qui parlent
        </h2>
        <p class="mt-2 text-gray-300 text-lg">
          Notre mission : propulser chaque trader vers la réussite avec
          transparence et performance.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          v-intersect="{ callback: () => (visible[index] = true), once: true }"
          class="relative group"
        >
          <div
            class="bg-zinc-900/80 backdrop-blur p-6 rounded-xl transform transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-xl"
            :class="{
              'opacity-0 translate-y-6': !visible[index],
              'opacity-100 translate-y-0': visible[index],
            }"
            :style="`transition-delay: ${index * 100}ms`"
          >
            <!-- Icon -->
            <div class="mb-4">
              <component
                :is="stat.icon"
                class="h-8 w-8 text-yellow-400 mx-auto transform transition-transform group-hover:scale-110"
              />
            </div>

            <!-- Value with animation -->
            <div class="relative">
              <div class="text-3xl font-bold text-white mb-2 flex justify-center items-baseline">
                <CountUp
                  v-if="visible[index]"
                  :to="stat.value"
                  :suffix="stat.suffix"
                  :duration="2000"
                />
              </div>
              
              <!-- Progress circle -->
              <svg class="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="0.5"
                  class="text-yellow-400/20"
                />
              </svg>
            </div>

            <!-- Label -->
            <p class="text-sm text-gray-400 mt-2">{{ stat.label }}</p>

            <!-- Hover effect -->
            <div class="absolute inset-0 bg-gradient-to-tr from-yellow-400/0 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { BarChart2, DollarSign, Users, Percent } from 'lucide-vue-next'
import CountUp from '@/components/CountUp.vue'

const stats = [
  {
    icon: BarChart2,
    value: 500,
    suffix: '+',
    label: 'Actifs disponibles',
  },
  {
    icon: DollarSign,
    value: 20,
    suffix: 'M$',
    label: 'Versés à nos traders',
  },
  {
    icon: Users,
    value: 25,
    suffix: ' ans',
    label: "d'expérience cumulée",
  },
  {
    icon: Percent,
    value: 90,
    suffix: '%',
    label: 'Profit sharing maximum',
  },
]

const visible = ref(stats.map(() => false))
</script>

<style scoped>
@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-slide {
  animation: slide 20s linear infinite;
}

.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-slow {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}
</style>