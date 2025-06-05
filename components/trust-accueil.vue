<template>
  <section class="relative bg-black py-20 px-4 overflow-hidden">
    <!-- Dynamic background elements -->
    <div class="absolute inset-0">
      <!-- Animated gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-black to-black"></div>
      
      <!-- Animated grid pattern -->
      <div class="absolute inset-0 opacity-[0.03]">
        <div class="absolute inset-0 bg-[url('/images/pattern-light.svg')] bg-repeat bg-center transform rotate-3 animate-float"></div>
      </div>

      <!-- Glowing orbs -->
      <div class="absolute top-20 left-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-yellow-400 mb-6">
          Ils nous font confiance
        </h2>
        <p class="text-lg text-zinc-400 max-w-2xl mx-auto">
          Des partenaires de renom qui nous accompagnent dans notre mission
        </p>
      </div>

      <!-- Logo grid with hover effects -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
        <div v-for="(logo, index) in logos" :key="index" 
             class="group relative flex justify-center p-4">
          <!-- Logo container with hover effects -->
          <div class="relative w-full aspect-[3/2] flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
            <!-- Background glow effect -->
            <div class="absolute inset-0 bg-yellow-400/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <!-- Logo image -->
            <img
              :src="logo.src"
              :alt="logo.alt"
              class="relative h-12 w-auto object-contain transition-all duration-300 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
            />
          </div>
        </div>
      </div>

      <!-- Trust indicator -->
      <div class="mt-16 text-center">
        <div class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900/50 backdrop-blur border border-zinc-800">
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
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(3deg);
  }
  50% {
    transform: translateY(-10px) rotate(3deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-slow {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>