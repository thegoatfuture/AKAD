<template>
  <section class="relative bg-gradient-to-b from-white to-zinc-100 py-20 overflow-hidden">
    <!-- Background decorations -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <div class="w-full h-full bg-[url('/images/pattern-light.svg')] bg-repeat opacity-10"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Section header -->
      <div class="text-center mb-14">
        <h2 class="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
          La voix de nos traders
        </h2>
        <p class="text-zinc-600 max-w-2xl mx-auto">
          Découvrez les retours d'expérience de nos traders qui ont réussi le challenge AKAD
        </p>
      </div>

      <!-- Top row -->
      <div class="relative overflow-hidden mb-14 group">
        <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div class="flex gap-6 animate-scroll-left">
          <TestimonialCardPremium
            v-for="(testimonial, index) in firstRow"
            :key="'top-' + index"
            :testimonial="testimonial"
            :highlight="index === 1"
          />
          <!-- Duplicate for seamless loop -->
          <TestimonialCardPremium
            v-for="(testimonial, index) in firstRow"
            :key="'top-duplicate-' + index"
            :testimonial="testimonial"
            :highlight="index === 1"
          />
        </div>
      </div>

      <!-- Bottom row -->
      <div class="relative overflow-hidden group">
        <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div class="flex gap-6 animate-scroll-right">
          <TestimonialCardPremium
            v-for="(testimonial, index) in secondRow"
            :key="'bottom-' + index"
            :testimonial="testimonial"
            :highlight="index === 2"
          />
          <!-- Duplicate for seamless loop -->
          <TestimonialCardPremium
            v-for="(testimonial, index) in secondRow"
            :key="'bottom-duplicate-' + index"
            :testimonial="testimonial"
            :highlight="index === 2"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import TestimonialCardPremium from './TestimonialCardPremium.vue'

const testimonials = [
  {
    name: 'Sophie R.',
    date: '14/12/2024',
    title: 'Payout fluide',
    content: "Premier payout atteint, tout s'est déroulé sans accroc.",
  },
  {
    name: 'Karim T.',
    date: '05/09/2024',
    title: 'Dashboard intuitif',
    content: 'Suivi parfait de mes performances.',
  },
  {
    name: 'Marine L.',
    date: '17/07/2024',
    title: 'Support réactif',
    content: 'Réponses rapides et précises du support.',
  },
  {
    name: 'Nathan G.',
    date: '28/09/2024',
    title: 'Règles réalistes',
    content: 'Conditions proches du réel, parfait pour apprendre.',
  },
  {
    name: 'Inès V.',
    date: '15/12/2024',
    title: 'Compétition équitable',
    content: 'Des objectifs clairs et atteignables.',
  },
  {
    name: 'Thom H.',
    date: '06/01/2025',
    title: 'Expérience honnête',
    content: 'Transparence sur les règles et les risques.',
  },
  {
    name: 'Clara P.',
    date: '05/08/2024',
    title: 'Stratégie compatible',
    content: "J'ai pu appliquer ma méthode sans contrainte.",
  },
  {
    name: 'Romain E.',
    date: '22/10/2024',
    title: 'Conditions réelles',
    content: 'Le mode démo reflète parfaitement les marchés.',
  },
]

const half = Math.ceil(testimonials.length / 2)
const firstRow = computed(() => testimonials.slice(0, half))
const secondRow = computed(() => testimonials.slice(half))
</script>

<style scoped>
.animate-scroll-left {
  animation: scroll-left 30s linear infinite;
}

.animate-scroll-right {
  animation: scroll-right 30s linear infinite;
}

.group:hover .animate-scroll-left,
.group:hover .animate-scroll-right {
  animation-play-state: paused;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>