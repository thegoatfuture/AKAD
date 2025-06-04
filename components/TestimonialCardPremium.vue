<template>
  <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-md w-80 flex-shrink-0 overflow-hidden max-w-full">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-3">
        <div class="bg-gray-300 text-white text-sm font-semibold w-10 h-10 flex items-center justify-center rounded-full">
          {{ initials }}
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-sm">{{ testimonial.name }}</h4>
          <p class="text-gray-500 text-xs">{{ testimonial.date }}</p>
        </div>
      </div>
      <div class="flex gap-1">
        <img v-for="i in 5" :key="i" src="/images/star-green.svg" class="h-4 w-4" />
      </div>
    </div>

    <h5 class="text-gray-800 font-bold text-sm mb-1 leading-tight truncate">
      {{ testimonial.title }}
    </h5>
    <p class="text-sm text-gray-600 line-clamp-4 leading-snug">
      {{ testimonial.content }}
    </p>

    <div class="flex items-center gap-1 text-xs text-green-600 font-medium mt-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414L8.414 15 4 10.586a1 1 0 011.414-1.414L8.414 13.172l7.293-7.293a1 1 0 011.414 0z"/></svg>
      Vérifié
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  testimonial: {
    type: Object,
    required: true
  }
})

const initials = computed(() => {
  const name = props.testimonial?.name || ''
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
})
</script>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;

  /* ✅ Ajout de la version standard pour compatibilité */
  line-clamp: 4;
  box-orient: vertical;
}

</style>