<template>
  <section class="relative bg-gradient-to-b from-black via-zinc-950 to-black py-20 px-4 overflow-hidden">
    <!-- Dynamic background elements -->
    <div class="absolute inset-0">
      <!-- Animated gradient background -->
      <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-black to-black"></div>
      
      <!-- Animated floating particles -->
      <div class="absolute inset-0">
        <div class="absolute w-2 h-2 bg-yellow-400/20 rounded-full top-1/4 left-1/4 animate-float-slow"></div>
        <div class="absolute w-3 h-3 bg-yellow-400/30 rounded-full top-3/4 right-1/4 animate-float-medium"></div>
        <div class="absolute w-2 h-2 bg-yellow-400/20 rounded-full top-1/2 left-3/4 animate-float-fast"></div>
      </div>

      <!-- Animated grid pattern -->
      <div class="absolute inset-0 opacity-[0.02]">
        <div class="absolute inset-0 bg-[url('/images/pattern-light.svg')] bg-repeat bg-center transform rotate-3 animate-slide"></div>
      </div>

      <!-- Glowing orbs -->
      <div class="absolute top-20 left-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-slower"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Section header with animated underline -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-yellow-400 mb-4 relative inline-block">
          Ils nous font confiance
          <div class="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400/30">
            <div class="absolute top-0 left-0 w-1/3 h-full bg-yellow-400 animate-slide-right"></div>
          </div>
        </h2>
        <p class="text-lg text-zinc-400 max-w-2xl mx-auto">
          Des partenaires de renom qui nous accompagnent dans notre mission
        </p>
      </div>

      <!-- Logo grid with enhanced hover effects -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
        <div v-for="(logo, index) in logos" :key="index" 
             class="group relative flex justify-center p-4">
          <!-- Logo container with hover effects -->
          <div class="relative w-full aspect-[3/2] flex items-center justify-center transform transition-all duration-500 group-hover:scale-110">
            <!-- Hover glow effect -->
            <div class="absolute inset-0 bg-yellow-400/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Animated border -->
            <div class="absolute inset-0 rounded-xl overflow-hidden">
              <div class="absolute inset-0 border border-yellow-400/20 rounded-xl"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100"></div>
            </div>
            
            <!-- Logo image -->
            <img
              :src="logo.src"
              :alt="logo.alt"
              class="relative h-12 w-auto object-contain transition-all duration-500 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
            />
          </div>
        </div>
      </div>

      <!-- Trust indicator with animation -->
      <div class="mt-16 text-center">
        <div class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900/50 backdrop-blur border border-zinc-800/50 relative overflow-hidden group">
          <!-- Animated background -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <!-- Content -->
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
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}

@keyframes float-medium {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-15px, -15px); }
}

@keyframes float-fast {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(10px, -10px); }
}

@keyframes slide {
  0% { transform: translateX(-100%) rotate(3deg); }
  100% { transform: translateX(100%) rotate(3deg); }
}

@keyframes slide-right {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 5s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

.animate-slide {
  animation: slide 20s linear infinite;
}

.animate-slide-right {
  animation: slide-right 2s linear infinite;
}

.animate-shimmer {
  animation: shimmer 2s linear infinite;
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-slower {
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