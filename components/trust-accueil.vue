<template>
  <section class="relative bg-gradient-to-b from-black via-zinc-950 to-black py-20 px-4 overflow-hidden">
    <!-- Background elements -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-black to-black"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-yellow-400 mb-4">
          Ils nous font confiance
        </h2>
        <p class="text-lg text-zinc-400 max-w-2xl mx-auto">
          Des partenaires de renom qui nous accompagnent dans notre mission
        </p>
      </div>

      <!-- Infinite logo slider -->
      <div class="relative overflow-hidden">
        <!-- Gradient overlays -->
        <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
        
        <!-- Logo container -->
        <div class="flex gap-16 animate-scroll">
          <!-- First set of logos -->
          <div v-for="(logo, index) in logos" :key="`first-${index}`" 
               class="flex-none w-48 h-32 group">
            <div class="relative w-full h-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-yellow-400/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                :src="logo.src"
                :alt="logo.alt"
                class="relative h-16 w-auto object-contain transition-all duration-500 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          </div>
          
          <!-- Duplicate set for seamless loop -->
          <div v-for="(logo, index) in logos" :key="`second-${index}`" 
               class="flex-none w-48 h-32 group">
            <div class="relative w-full h-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-yellow-400/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                :src="logo.src"
                :alt="logo.alt"
                class="relative h-16 w-auto object-contain transition-all duration-500 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Trust indicator -->
      <div class="mt-16 text-center">
        <div class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900/50 backdrop-blur border border-zinc-800/50">
          <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span class="text-zinc-400">Plus de</span>
          <span class="text-yellow-400 font-semibold">10 partenaires reconnus</span>
          <span class="text-zinc-400">dans l'industrie financière</span>
        </div>
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
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

.animate-scroll:hover {
  animation-play-state: paused;
}

.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>
