<template>
  <section class="relative bg-black py-20 overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
          Ce que disent nos traders
        </h2>
        <p class="text-gray-400 max-w-2xl mx-auto">
          Découvrez les retours d'expérience de nos traders qui ont réussi le challenge AKAD
        </p>
      </div>

      <!-- Testimonials Carousel -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left Column -->
        <div class="space-y-6">
          <div v-for="testimonial in leftColumn" :key="testimonial.name"
               class="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-black font-bold shadow-lg">
                {{ testimonial.name.charAt(0) }}
              </div>
              <div>
                <h3 class="font-bold text-white">{{ testimonial.name }}</h3>
                <p class="text-sm text-yellow-400">{{ testimonial.date }}</p>
              </div>
              <div class="ml-auto flex">
                <span v-for="star in 5" :key="star" class="text-yellow-400">★</span>
              </div>
            </div>
            <p class="text-gray-300 text-sm leading-relaxed">{{ testimonial.content }}</p>
            <div class="mt-4 flex items-center gap-2 text-sm text-gray-400">
              <svg class="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Vérifié</span>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <div v-for="testimonial in rightColumn" :key="testimonial.name"
               class="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-black font-bold shadow-lg">
                {{ testimonial.name.charAt(0) }}
              </div>
              <div>
                <h3 class="font-bold text-white">{{ testimonial.name }}</h3>
                <p class="text-sm text-yellow-400">{{ testimonial.date }}</p>
              </div>
              <div class="ml-auto flex">
                <span v-for="star in 5" :key="star" class="text-yellow-400">★</span>
              </div>
            </div>
            <p class="text-gray-300 text-sm leading-relaxed">{{ testimonial.content }}</p>
            <div class="mt-4 flex items-center gap-2 text-sm text-gray-400">
              <svg class="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Vérifié</span>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12">
        <NuxtLink
          to="/avis"
          class="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
        >
          Voir tous les témoignages
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const leftColumn = [
  {
    name: 'Marine L.',
    date: '17/07/2024',
    content: 'Réponses rapides et précises du support. Une équipe vraiment à l'écoute des traders.'
  },
  {
    name: 'Nathan G.',
    date: '28/09/2024',
    content: 'Conditions proches du réel, parfait pour apprendre et progresser sereinement.'
  },
  {
    name: 'Clara P.',
    date: '05/08/2024',
    content: 'J'ai pu appliquer ma méthode sans contrainte. La flexibilité du programme est un vrai plus.'
  }
]

const rightColumn = [
  {
    name: 'Thom H.',
    date: '06/01/2025',
    content: 'Transparence sur les règles et les risques. Une expérience honnête du début à la fin.'
  },
  {
    name: 'Emma D.',
    date: '15/12/2024',
    content: 'Le mode démo reflète parfaitement les conditions réelles du marché. Excellent pour la préparation.'
  },
  {
    name: 'Lucas K.',
    date: '22/10/2024',
    content: 'Support technique disponible 24/7 et très compétent. Je recommande vivement.'
  }
]
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
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