<template>
  <section class="bg-black py-16 px-4 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <h1
        class="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-6 text-center"
      >
        Foire Aux Questions
      </h1>
      <p class="text-center text-gray-300 max-w-3xl mx-auto mb-8">
        Retrouvez ici les réponses aux questions les plus fréquentes concernant nos services,
        la création de compte et le fonctionnement du challenge AKAD.
      </p>

      <faq-faq />

      <div class="mt-12 text-center">
        <NuxtLink
          to="/contact"
          class="text-yellow-400 font-medium hover:underline"
        >
          Vous n'avez pas trouvé réponse à votre question ? Contactez-nous.
        </NuxtLink>
      </div>
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
