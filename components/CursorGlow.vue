<template>
  <div ref="cursor" class="cursor-glow fixed pointer-events-none z-50 transition-transform duration-100 ease-out">
    <div :class="[
      'w-16 h-16 bg-yellow-400/30 rounded-full blur-2xl transform scale-150 transition-opacity duration-300',
      { 'opacity-0': isMoving }
    ]"></div>
    <div :class="[
      'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400/20 rounded-full blur-xl transition-opacity duration-300',
      { 'opacity-0': isMoving }
    ]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cursor = ref(null)
const isMoving = ref(false)
let timeout = null

function updateCursorPosition(e) {
  if (!cursor.value) return
  
  const x = e.clientX
  const y = e.clientY
  
  // Center the glow effect precisely under the cursor
  cursor.value.style.transform = `translate(${x - 32}px, ${y - 32}px)`

  // Set isMoving to true and clear any existing timeout
  isMoving.value = true
  clearTimeout(timeout)

  // Set a timeout to set isMoving back to false after 100ms of no movement
  timeout = setTimeout(() => {
    isMoving.value = false
  }, 100)
}

onMounted(() => {
  document.addEventListener('mousemove', updateCursorPosition)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', updateCursorPosition)
  clearTimeout(timeout)
})
</script>

<style scoped>
.cursor-glow {
  will-change: transform;
  pointer-events: none;
}
</style>