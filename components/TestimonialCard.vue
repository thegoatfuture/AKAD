<template>
  <div class="bg-zinc-900 rounded-xl p-6 shadow-md border border-zinc-700 min-w-[320px] max-w-sm">
    <!-- Nom + date -->
    <div class="flex items-center gap-4 mb-4">
      <div class="bg-zinc-800 text-white font-semibold w-10 h-10 rounded-full flex items-center justify-center">
        {{ initials }}
      </div>
      <div>
        <p class="font-semibold text-white">{{ testimonial.name }}</p>
        <p class="text-xs text-gray-400">{{ testimonial.date }}</p>
      </div>
    </div>

    <!-- Étoiles Trustpilot -->
    <div class="flex items-center gap-1 mb-3">
      <svg
        v-for="n in 5"
        :key="n"
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        viewBox="0 0 24 24"
        :fill="n <= testimonial.stars ? '#00B67A' : '#d1d5db'"
      >
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.857 1.528 8.307L12 18.896l-7.464 4.574 1.528-8.307L0 9.306l8.332-1.151z" />
      </svg>
    </div>

    <!-- Titre & contenu -->
    <p class="font-bold text-white mb-2">{{ testimonial.title }}</p>
    <p class="text-sm text-gray-300">{{ testimonial.content }}</p>

    <!-- Vérifié -->
    <div class="flex items-center gap-1 text-green-400 text-sm mt-3">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path
          d="M20.292 5.708a1 1 0 010 1.414L10.707 16.707a1 1 0 01-1.414 0L3.707 11.12a1 1 0 011.414-1.414l5.172 5.172 8.88-8.88a1 1 0 011.414 0z"
        />
      </svg>
      Vérifié
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  testimonial: {
    type: Object,
    required: true
  }
})

const initials = computed(() =>
  props.testimonial.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
)
</script>