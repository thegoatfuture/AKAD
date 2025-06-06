<template>
  <div class="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Animated gradient orbs -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-float-medium"></div>
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300/5 rounded-full blur-2xl animate-float-fast"></div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-[url('/images/pattern-light.svg')] bg-repeat opacity-[0.02]"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-12">
      <!-- Rest of the content remains unchanged -->
    </div>

    <!-- Modal -->
    <div v-if="showModal"
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-zinc-900/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-zinc-800/50 animate-modal-in">
        <!-- Modal content remains unchanged -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CheckIcon, XIcon, ChevronDownIcon, CrownIcon, StarIcon, BarChartIcon as ChartBarIcon, MapIcon as AcademicCapIcon, ImportIcon as SupportIcon, BellIcon, ShieldCheckIcon, CloudLightningIcon as LightningBoltIcon, UsersIcon, TrendingUpIcon } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
})

// Rest of the script remains unchanged

</script>

<style scoped>
/* All style content remains unchanged */
</style>