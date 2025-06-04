<template>
  <section
    class="relative bg-gradient-to-br from-black via-zinc-900 to-black py-20 px-4 overflow-hidden"
  >
    <!-- Texture overlay -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="bg-[url('/images/texture-yellow.png')] opacity-5 w-full h-full bg-repeat mix-blend-overlay"
      />
    </div>

    <div class="relative z-10 max-w-7xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-yellow-400 mb-12">
        Ils nous font confiance
      </h2>

      <!-- Logos en carrousel ou grille responsive -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center"
      >
        <div
          v-for="(logo, index) in logos"
          :key="index"
          class="flex justify-center"
        >
          <img
            :src="logo.src"
            :alt="logo.alt"
            class="h-10 md:h-12 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition duration-300"
          />
        </div>
      </div>

      <!-- Optionnel : bouton ou label sous les logos -->
      <div class="mt-10 text-sm text-zinc-400">
        Plus de
        <span class="text-yellow-400 font-semibold"
          >10 partenaires reconnus</span
        >
        dans l'industrie financière.
      </div>
    </div>
  </section>
</template>

<script setup>
const logos = [
  { src: '/images/mt4.png', alt: 'MetaTrader 4' },
  { src: '/images/mt5.svg', alt: 'MetaTrader 5' },
  { src: '/images/tradingview.svg', alt: 'TradingView' },
  { src: '/images/myfxbook.svg', alt: 'MyFXBook' },
  { src: '/images/fxblue.svg', alt: 'FXBlue' },
  { src: '/images/quantlane.svg', alt: 'Quantlane' },
  { src: '/images/brokers.svg', alt: 'Brokers Verified' },
  { src: '/images/fxaudit.svg', alt: 'FXAudit' },
]
</script>

<style scoped>
/* Ajout d'une animation douce si besoin */
.fade-in {
  animation: fadeIn 1s ease-in-out both;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
