<template>
  <div class="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
    <h1 class="text-7xl font-extrabold text-yellow-400 mb-4">404</h1>
    <p class="text-lg text-gray-300 mb-8">
      Désolé, la page que vous recherchez n'existe plus ou a été déplacée.
    </p>
    <div class="space-x-4">
      <NuxtLink to="/" class="bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-500 transition">
        Retourner à l'accueil
      </NuxtLink>
      <NuxtLink to="/contact" class="border border-yellow-400 text-yellow-400 font-semibold px-6 py-3 rounded hover:bg-yellow-400 hover:text-black transition">
        Contacter le support
      </NuxtLink>
    </div>
  </div>
</template>
