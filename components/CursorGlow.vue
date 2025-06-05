<template>
  <div ref="cursor" class="cursor-glow fixed pointer-events-none z-50 transition-transform duration-100 ease-out">
    <div class="w-16 h-16 bg-yellow-400/30 rounded-full blur-2xl transform scale-150"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400/20 rounded-full blur-xl"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cursor = ref(null)

function updateCursorPosition(e) {
  if (!cursor.value) return
  
  const x = e.clientX
  const y = e.clientY
  
  // Center the glow effect precisely under the cursor
  cursor.value.style.transform = `translate(${x - 32}px, ${y - 32}px)`
}

onMounted(() => {
  document.addEventListener('mousemove', updateCursorPosition)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', updateCursorPosition)
})
</script>

<style scoped>
.cursor-glow {
  will-change: transform;
  pointer-events: none;
}
</style>