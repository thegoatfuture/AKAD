<template>
  <section class="relative bg-gradient-to-b from-black via-zinc-950 to-black py-20 px-4 overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Gradient background -->
      <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-black to-black"></div>
      
      <!-- Animated particles -->
      <div class="absolute inset-0">
        <div class="absolute w-2 h-2 bg-yellow-400/20 rounded-full top-1/4 left-1/4 animate-float-slow"></div>
        <div class="absolute w-3 h-3 bg-yellow-400/30 rounded-full top-3/4 right-1/4 animate-float-medium"></div>
        <div class="absolute w-2 h-2 bg-yellow-400/20 rounded-full top-1/2 left-3/4 animate-float-fast"></div>
      </div>

      <!-- Glowing orbs -->
      <div class="absolute top-20 left-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-slower"></div>
    </div>

    <div class="max-w-4xl mx-auto relative z-10">
      <!-- Section header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-yellow-400 mb-4">Questions Fréquentes</h2>
        <p class="text-lg text-zinc-400">Tout ce que vous devez savoir sur le challenge AKAD</p>
      </div>

      <!-- FAQ Items -->
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" 
             class="bg-zinc-900/50 backdrop-blur border border-zinc-800/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-yellow-400/20">
          <button
            class="w-full text-left flex justify-between items-center p-6 focus:outline-none group"
            @click="toggle(index)"
          >
            <span class="font-medium text-lg text-white group-hover:text-yellow-400 transition-colors">
              {{ faq.question }}
            </span>
            <svg
              class="w-6 h-6 text-yellow-400 transform transition-transform duration-300"
              :class="{ 'rotate-180': activeIndex === index }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            v-show="activeIndex === index"
            class="px-6 pb-6 text-zinc-300 text-sm leading-relaxed"
          >
            <div class="border-t border-zinc-800 pt-4">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <!-- Help section -->
      <div class="mt-12 text-center">
        <div class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900/50 backdrop-blur border border-zinc-800/50">
          <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span class="text-zinc-400">Besoin d'aide ?</span>
          <NuxtLink to="/contact" class="text-yellow-400 font-semibold hover:text-yellow-300">
            Contactez-nous
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(null)

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const faqs = [
  {
    question: "Comment fonctionne le AKAD Challenge ?",
    answer: "Le AKAD Challenge évalue votre discipline de trading à travers des règles strictes de gestion des risques. Une fois les objectifs atteints, vous accédez à la Vérification."
  },
  {
    question: "Quels sont les frais à payer ?",
    answer: "Le coût varie selon le compte sélectionné. Pour un compte 10k€, c'est 79€, remboursable si vous réussissez la phase de challenge."
  },
  {
    question: "Puis-je trader les week-ends ?",
    answer: "Non, le trading est uniquement autorisé pendant les jours ouvrés, conformément aux heures d'ouverture des marchés."
  },
  {
    question: "Quand suis-je payé ?",
    answer: "Une fois AKAD Trader, vous recevez vos profits simulés chaque mois selon le programme de distribution."
  },
  {
    question: "Puis-je échouer si je ne trade pas ?",
    answer: "Oui. Il faut un minimum de jours actifs pour valider la régularité de vos performances. Une inactivité prolongée peut entraîner une disqualification."
  }
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

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 5s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
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