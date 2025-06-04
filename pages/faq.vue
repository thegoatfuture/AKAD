<template>
  <section class="bg-black py-16 px-4 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-12 text-center">
        Foire Aux Questions
      </h1>

      <faq-faq />
    </div>
  </section>
</template>

<script setup>
import FaqFaq from '@/components/faq-faq.vue'
</script>

<style scoped>
h1 {
  text-transform: uppercase;
}
</style>
