<template>
  <div ref="cursor" class="fixed inset-0 pointer-events-none" style="z-index: 0;">
    <div 
      ref="glowElement"
      class="absolute w-8 h-8 bg-yellow-400/5 rounded-full blur-md transition-all duration-75 ease-out"
      :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useElementHover } from '@vueuse/core'

const cursor = ref(null)
const glowElement = ref(null)
const position = ref({ x: 0, y: 0 })
const isHoveringInteractive = ref(false)

function updateCursorPosition(e) {
  if (!glowElement.value) return
  
  // Center the glow effect relative to the cursor
  position.value = {
    x: e.clientX - 16, // Half of width (8px)
    y: e.clientY - 16  // Half of height (8px)
  }

  // Check if hovering over interactive element
  const target = e.target
  const isInteractive = target.matches('button, a, input, [role="button"]')
  
  if (isInteractive) {
    glowElement.value.classList.add('scale-150', 'bg-yellow-400/10')
  } else {
    glowElement.value.classList.remove('scale-150', 'bg-yellow-400/10')
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
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 75ms;
}
</style>