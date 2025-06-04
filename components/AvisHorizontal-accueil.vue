<template>
  <section class="relative bg-gradient-to-b from-white to-zinc-100 py-20 overflow-hidden">
    <!-- Dégradé de fond et texture SVG subtile -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <div class="w-full h-full bg-[url('/images/pattern-light.svg')] bg-repeat opacity-10"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Ligne du haut -->
      <div class="relative overflow-hidden mb-14">
        <div class="fade-left" />
        <div class="fade-right" />
        <div class="flex gap-10 whitespace-nowrap animate-premium-scroll-top px-2">
          <TestimonialCardPremium
            v-for="(testimonial, index) in testimonials.slice(0, 4)"
            :key="'top-' + index"
            :testimonial="testimonial"
            :highlight="index === 1"
          />
        </div>
      </div>

      <!-- Ligne du bas -->
      <div class="relative overflow-hidden">
        <div class="fade-left" />
        <div class="fade-right" />
        <div class="flex gap-10 whitespace-nowrap animate-premium-scroll-bottom px-2">
          <TestimonialCardPremium
            v-for="(testimonial, index) in testimonials.slice(4, 8)"
            :key="'bottom-' + index"
            :testimonial="testimonial"
            :highlight="index === 2"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import TestimonialCardPremium from './TestimonialCardPremium.vue'

const testimonials = [
  { name: 'Sophie R.', date: '14/12/2024', title: 'Payout fluide', content: "Premier payout atteint, tout s'est déroulé sans accroc." },
  { name: 'Karim T.', date: '05/09/2024', title: 'Dashboard intuitif', content: "Suivi parfait de mes performances." },
  { name: 'Marine L.', date: '17/07/2024', title: 'Support réactif', content: "Réponses rapides et précises du support." },
  { name: 'Nathan G.', date: '28/09/2024', title: 'Règles réalistes', content: "Conditions proches du réel, parfait pour apprendre." },
  { name: 'Inès V.', date: '15/12/2024', title: 'Compétition équitable', content: "Des objectifs clairs et atteignables." },
  { name: 'Thom H.', date: '06/01/2025', title: 'Expérience honnête', content: "Transparence sur les règles et les risques." },
  { name: 'Clara P.', date: '05/08/2024', title: 'Stratégie compatible', content: "J'ai pu appliquer ma méthode sans contrainte." },
  { name: 'Romain E.', date: '22/10/2024', title: 'Conditions réelles', content: "Le mode démo reflète parfaitement les marchés." }
]
</script>

<style scoped>
@keyframes premium-scroll-top {
  0% { transform: translateX(0); }
  100% { transform: translateX(-70%); }
}

@keyframes premium-scroll-bottom {
  0% { transform: translateX(-10%); }
  100% { transform: translateX(-80%); }
}

.animate-premium-scroll-top {
  animation: premium-scroll-top 18s linear infinite;
}

.animate-premium-scroll-bottom {
  animation: premium-scroll-bottom 22s linear infinite;
}

.fade-left,
.fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 60px;
  z-index: 10;
  pointer-events: none;
}

.fade-left {
  left: 0;
  background: linear-gradient(to right, #fff, transparent);
}

.fade-right {
  right: 0;
  background: linear-gradient(to left, #fff, transparent);
}
</style>