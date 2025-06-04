<template>
  <router-link
    :to="to"
    class="flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-150"
    :class="[
      isActive
        ? 'bg-yellow-100 border-l-4 border-yellow-400 text-yellow-700 font-semibold'
        : 'text-black hover:bg-gray-100'
    ]"
  >
    <div class="flex items-center gap-3">
      <slot name="icon" />
      <span>{{ label }}</span>
    </div>
    <span
      v-if="badge"
      class="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full font-semibold"
    >
      {{ badge }}
    </span>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  to: String,
  label: String,
  badge: [String, Number]
})

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>