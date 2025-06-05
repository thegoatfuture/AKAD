```vue
<template>
  <section class="relative py-20 px-4 bg-black">
    <!-- Background Effects -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[url('/images/pattern-light.svg')] bg-repeat opacity-5"></div>
      <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Coaching Programs -->
      <div class="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">Programme de Coaching Premium</h2>
          <p class="text-gray-400 mb-8 leading-relaxed">
            Accélérez votre progression avec notre programme de coaching personnalisé. Nos experts vous accompagnent dans le développement de votre stratégie et la gestion de vos émotions.
          </p>
          <ul class="space-y-4">
            <li v-for="feature in coachingFeatures" :key="feature" 
                class="flex items-center gap-3 text-gray-300">
              <div class="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
              {{ feature }}
            </li>
          </ul>
          <button class="mt-8 bg-yellow-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-colors transform hover:scale-105">
            Découvrir le Programme
          </button>
        </div>
        <div class="relative">
          <img src="https://images.pexels.com/photos/7567436/pexels-photo-7567436.jpeg" 
               alt="Coaching session" 
               class="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
        </div>
      </div>

      <!-- Discord Community -->
      <div class="bg-zinc-900/50 backdrop-blur rounded-2xl p-8 md:p-12 border border-zinc-800">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <div class="relative aspect-video rounded-xl overflow-hidden">
              <img src="https://images.pexels.com/photos/7567455/pexels-photo-7567455.jpeg" 
                   alt="Discord Community" 
                   class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <!-- Discord Stats -->
              <div class="absolute bottom-4 left-4 right-4 flex justify-around">
                <div class="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <div class="text-sm text-gray-400">Membres</div>
                  <div class="text-xl font-bold text-white">5,000+</div>
                </div>
                <div class="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <div class="text-sm text-gray-400">Messages/Jour</div>
                  <div class="text-xl font-bold text-white">2,500+</div>
                </div>
                <div class="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <div class="text-sm text-gray-400">Actifs</div>
                  <div class="text-xl font-bold text-white">1,200+</div>
                </div>
              </div>
            </div>
          </div>
          <div class="order-1 md:order-2">
            <h3 class="text-2xl font-bold text-yellow-400 mb-4">Rejoignez notre Communauté Discord</h3>
            <p class="text-gray-400 mb-6 leading-relaxed">
              Connectez-vous avec des traders passionnés, partagez vos expériences et accédez à des ressources exclusives dans notre communauté Discord active et bienveillante.
            </p>
            <ul class="space-y-3 mb-8">
              <li v-for="benefit in discordBenefits" :key="benefit" 
                  class="flex items-center gap-2 text-gray-300">
                <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ benefit }}
              </li>
            </ul>
            <button class="bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 group">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span class="transform group-hover:translate-x-1 transition-transform">Rejoindre le Discord</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const coachingFeatures = [
  'Sessions individuelles avec nos experts',
  'Analyse approfondie de vos trades',
  'Développement de stratégies personnalisées',
  'Gestion du risque et psychologie du trading',
  'Accès aux webinaires exclusifs'
]

const discordBenefits = [
  'Analyses de marché en temps réel',
  'Salons dédiés par style de trading',
  'Sessions de Q&R avec les coachs',
  'Partage de setups et discussions',
  'Ressources éducatives exclusives'
]
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1) translate(var(--tw-translate-x), var(--tw-translate-y));
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05) translate(var(--tw-translate-x), var(--tw-translate-y));
  }
}

.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.delay-1000 {
  animation-delay: 1000ms;
}
</style>
```