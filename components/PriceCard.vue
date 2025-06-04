<template>
  <div class="bg-zinc-800 p-6 rounded-lg shadow text-white text-center">
    <h3 class="text-2xl font-bold">{{ capital }}</h3>
    <div v-if="promo" class="bg-yellow-400 text-black font-semibold px-2 py-1 rounded mt-2 inline-block">
      Promo
    </div>
    <p class="mt-4 text-lg">Frais</p>
    <p class="text-2xl font-bold text-yellow-400">{{ price }}</p>
  </div>
</template>

<script setup>
defineProps({
  capital: String,
  price: String,
  promo: Boolean
})
</script>
