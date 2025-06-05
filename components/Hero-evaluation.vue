<template>
  <section
    class="relative bg-black text-white overflow-hidden py-24 px-6 lg:px-12"
  >
    <div class="max-w-5xl mx-auto text-center">
      <h1
        class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
      >
        Relevez le <span class="text-yellow-400">Challenge AKAD</span>
      </h1>
      <p class="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
        Prouvez vos compétences de trading et accédez à un capital simulé
        jusqu'à 200 000 €.
      </p>
      <NuxtLink
        to="/tarifs"
        class="mt-10 inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl text-lg transition"
      >
        Commencer le Challenge
      </NuxtLink>
    </div>
    <div
      class="absolute top-0 left-0 w-64 h-64 bg-yellow-500 opacity-20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400 opacity-20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"
    ></div>
  </section>
</template>

<script setup>
// Ce composant est purement présentationnel
</script>
