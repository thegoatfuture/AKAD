<template>
  <section class="relative bg-black text-white overflow-hidden py-28 px-6 lg:px-12">
    <div class="max-w-5xl mx-auto text-center">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
        Rejoignez une PROP FIRM d'élite
        <br />
        <span class="text-yellow-400">et devenez trader financé</span>
      </h1>
      <p class="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
        Prouvez votre discipline et vos compétences. Gagnez jusqu’à 200 000 € de capital de trading simulé grâce à notre évaluation structurée.
      </p>
      <NuxtLink
        to="/evaluation"
        class="mt-10 inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl text-lg transition"
      >
        DÉMARRER L'ÉVALUATION
      </NuxtLink>
    </div>

    <!-- Décoration en fond -->
    <div class="absolute top-0 left-0 w-64 h-64 bg-yellow-500 opacity-20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400 opacity-20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
  </section>
</template>

<script setup>
// Pas de logique JS nécessaire ici
</script>

<style scoped>
/* Décoratif, pas de style CSS supplémentaire requis si Tailwind est actif */
</style>