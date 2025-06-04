<template>
  <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white shadow-lg rounded-full flex items-center gap-6 px-6 py-3 backdrop-blur-sm border border-yellow-400">
    <div v-for="(item, index) in highlights" :key="index" class="flex items-center gap-2 text-sm">
      <component :is="item.icon" class="w-4 h-4 text-yellow-400" />
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<script setup>
import { Trophy, Star, TimerReset } from 'lucide-vue-next'

const highlights = [
  { icon: Trophy, text: '+200k€ simulés versés' },
  { icon: Star, text: 'Coaching inclus' },
  { icon: TimerReset, text: 'Paiement rapide' }
]
</script>

<style scoped>
@media (max-width: 768px) {
  div.fixed {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 1rem;
  }
}
</style>
