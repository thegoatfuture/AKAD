<template>
  <section class="bg-black text-white py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold text-yellow-400 text-center mb-12">Questions Fréquentes</h2>

      <div v-for="(faq, index) in faqs" :key="index" class="border-b border-zinc-700 py-4">
        <button
          class="w-full text-left flex justify-between items-center font-medium text-lg focus:outline-none"
          @click="toggle(index)"
        >
          <span>{{ faq.question }}</span>
          <svg
            class="h-6 w-6 transform transition-transform duration-300"
            :class="{ 'rotate-180': activeIndex === index }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <transition name="fade">
          <div v-if="activeIndex === index" class="mt-3 text-zinc-300 text-sm leading-relaxed">
            {{ faq.answer }}
          </div>
        </transition>
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
    question: 'Comment fonctionne le AKAD Challenge ?',
    answer: 'Le AKAD Challenge évalue votre discipline de trading à travers des règles strictes de gestion des risques. Une fois les objectifs atteints, vous accédez à la Vérification.'
  },
  {
    question: 'Quels sont les frais à payer ?',
    answer: 'Le coût varie selon le compte sélectionné. Pour un compte 10k$, c’est 79€, remboursable si vous réussissez la phase de challenge.'
  },
  {
    question: 'Puis-je trader les week-ends ?',
    answer: 'Non, le trading est uniquement autorisé pendant les jours ouvrés, conformément aux heures d’ouverture des marchés.'
  },
  {
    question: 'Quand suis-je payé ?',
    answer: 'Une fois AKAD Trader, vous recevez vos profits simulés chaque mois selon le programme de distribution.'
  },
  {
    question: 'Puis-je échouer si je ne trade pas ?',
    answer: 'Oui. Il faut un minimum de jours actifs pour valider la régularité de vos performances. Inactivité prolongée peut entraîner une disqualification.'
  }
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>