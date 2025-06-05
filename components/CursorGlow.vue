<template>
  <div ref="cursor" class="cursor-glow fixed pointer-events-none z-50 transition-transform duration-100 ease-out">
    <div class="w-8 h-8 bg-yellow-400/20 rounded-full blur-xl transform scale-150"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cursor = ref(null)

function updateCursorPosition(e) {
  if (!cursor.value) return
  
  const x = e.clientX
  const y = e.clientY
  
  cursor.value.style.transform = `translate(${x - 16}px, ${y - 16}px)`
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
}
</style>