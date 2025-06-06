<template>
  <NuxtLayout>
    <NuxtPage />
    <ClientOnly>
      <CursorGlow />
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup>
import { useIntersectionObserver } from '@vueuse/core'

// Add intersection observer for animations
onMounted(() => {
  const elements = document.querySelectorAll('.animate-on-scroll')
  elements.forEach(el => {
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.classList.add('animate-in')
      }
    })
  })
})
</script>