<template>
  <div ref="cursor" class="fixed inset-0 pointer-events-none" style="z-index: 0;">
    <div 
      ref="glowElement"
      class="absolute w-16 h-16 bg-yellow-400/10 rounded-full blur-xl transition-transform duration-100 ease-out"
      :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cursor = ref(null)
const glowElement = ref(null)
const position = ref({ x: 0, y: 0 })

function updateCursorPosition(e) {
  if (!glowElement.value) return
  
  // Center the glow effect relative to the cursor
  position.value = {
    x: e.clientX - 32, // Half of width (16px)
    y: e.clientY - 65  // Half of height (16px)
  }
}

onMounted(() => {
  document.addEventListener('mousemove', updateCursorPosition)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', updateCursorPosition)
})
</script>

<style scoped>
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 10ms;
}
</style>