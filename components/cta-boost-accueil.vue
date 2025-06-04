<template>
  <section class="relative bg-white text-black py-20 px-6 overflow-hidden">
    <!-- Animation de fond floue -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-30 top-[-50px] left-[-50px]" />
      <div class="absolute w-72 h-72 bg-yellow-300 rounded-full blur-3xl opacity-20 bottom-[-50px] right-[-50px]" />
    </div>

    <!-- Contenu principal -->
    <div class="max-w-5xl mx-auto text-center space-y-6">
      <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight">
        Rejoignez le programme AKAD maintenant
      </h2>
      <p class="text-lg max-w-2xl mx-auto">
        Jusqu’à 200 000 $ simulés • 90 % des profits simulés reversés • Contrat réel chez Quantlane
      </p>

      <!-- Compte à rebours -->
      <div v-if="remainingTime > 0" class="text-sm text-zinc-800">
        Offre spéciale valide encore pendant
        <span class="font-semibold">{{ formattedTime }}</span>
      </div>

      <NuxtLink
        to="/challenge"
        class="inline-block bg-yellow-400 text-black font-bold px-8 py-4 rounded-full text-lg hover:bg-zinc-900 transition"
      >
        COMMENCER LE CHALLENGE
      </NuxtLink>
    </div>

    <!-- Logos partenaires -->
    <div class="mt-12 flex flex-wrap justify-center items-center gap-6 opacity-60">
      <img src="/images/visa.svg" class="h-6" alt="Visa" />
      <img src="/images/mastercard.svg" class="h-6" alt="Mastercard" />
      <img src="/images/paypal.svg" class="h-6" alt="PayPal" />
      <img src="/images/skrill.svg" class="h-6" alt="Skrill" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const remainingTime = ref(86400) // 24h en secondes

const formattedTime = computed(() => {
  const hours = Math.floor(remainingTime.value / 3600)
  const minutes = Math.floor((remainingTime.value % 3600) / 60)
  const seconds = remainingTime.value % 60
  return `${hours}h ${minutes}m ${seconds}s`
})

onMounted(() => {
  const interval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      clearInterval(interval)
    }
  }, 1000)
})
</script>