<template>
  <span>{{ displayValue }}{{ suffix }}</span>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  to: {
    type: Number,
    required: true
  },
  suffix: {
    type: String,
    default: ''
  },
  start: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 2000 // en millisecondes
  }
})

const displayValue = ref(0)
let frame

const animate = () => {
  const startTime = performance.now()
  const startValue = 0
  const endValue = props.to
  const duration = props.duration

  const step = (timestamp) => {
    const progress = Math.min((timestamp - startTime) / duration, 1)
    displayValue.value = Math.floor(progress * (endValue - startValue) + startValue)

    if (progress < 1) {
      frame = requestAnimationFrame(step)
    }
  }

  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(step)
}

watch(() => props.start, (val) => {
  if (val) {
    animate()
  }
})

onMounted(() => {
  if (props.start) {
    animate()
  }
})
</script>