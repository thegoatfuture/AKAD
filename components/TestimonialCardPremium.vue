<template>
  <div
    :class="[
      'bg-white rounded-xl p-6 shadow-lg border border-zinc-100 flex-shrink-0 w-[300px] transform transition duration-300',
      highlight ? 'scale-105 shadow-xl border-yellow-200' : 'hover:shadow-xl hover:-translate-y-1'
    ]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-white font-bold shadow-lg"
        >
          {{ initials }}
        </div>
        <div>
          <h4 class="font-semibold text-zinc-900">{{ testimonial.name }}</h4>
          <p class="text-xs text-zinc-500">{{ testimonial.date }}</p>
        </div>
      </div>
      <div class="flex">
        <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      </div>
    </div>

    <!-- Content -->
    <div>
      <h5 class="font-semibold text-zinc-900 mb-2">{{ testimonial.title }}</h5>
      <p class="text-sm text-zinc-600 line-clamp-3">{{ testimonial.content }}</p>
    </div>

    <!-- Verified badge -->
    <div class="flex items-center gap-1.5 mt-4 text-xs text-emerald-600 font-medium">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      Vérifié
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  testimonial: {
    type: Object,
    required: true,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
})

const initials = computed(() => {
  return props.testimonial.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>