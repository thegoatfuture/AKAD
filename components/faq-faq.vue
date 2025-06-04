<template>
  <section class="bg-black py-10">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="(column, colIndex) in faqs"
        :key="colIndex"
        class="bg-white rounded-xl overflow-hidden shadow-sm"
      >
        <div
          class="bg-gradient-to-r from-yellow-300 to-yellow-400 text-black text-center py-4 px-4 text-lg font-bold"
        >
          {{ column.title }}
        </div>

        <div
          v-for="(item, i) in column.items"
          :key="i"
          class="border-t border-gray-200"
        >
          <button
            @click="toggle(colIndex, i)"
            class="w-full text-left px-5 py-4 focus:outline-none flex justify-between items-center hover:bg-gray-50"
            :class="{ 'border-l-4 border-yellow-400': open[colIndex] === i }"
          >
            <span class="font-semibold text-black">{{ item.q }}</span>
            <span class="text-yellow-500 font-bold">{{
              open[colIndex] === i ? '-' : '+'
            }}</span>
          </button>
          <div
            v-if="open[colIndex] === i"
            class="px-5 pb-4 text-gray-700 text-sm leading-snug bg-gray-50"
          >
            {{ item.a }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const faqs = [
  {
    title: 'Nouveau avec AKAD',
    items: [
      {
        q: 'Qu’est-ce que AKAD ?',
        a: 'AKAD est une prop firm innovante dédiée aux traders ambitieux.',
      },
      {
        q: 'Pourquoi choisir AKAD ?',
        a: 'Pour nos outils, notre transparence et nos conditions favorables.',
      },
      {
        q: 'Qui peut rejoindre AKAD ?',
        a: 'Toute personne majeure avec une bonne compréhension des marchés.',
      },
      {
        q: 'AKAD est-il un broker ?',
        a: 'Non, nous ne sommes pas un broker, nous finançons les traders.',
      },
      {
        q: 'Est-ce lié à une autre société ?',
        a: 'Non, AKAD est une entité indépendante.',
      },
    ],
  },
  {
    title: "Processus d'évaluation",
    items: [
      {
        q: 'Comment devenir AKAD Trader ?',
        a: 'Vous devez réussir le Challenge et la Vérification.',
      },
      {
        q: 'Étape 1 - Challenge',
        a: 'Montrez vos compétences avec un objectif clair et des règles définies.',
      },
      {
        q: 'Étape 2 - Vérification',
        a: 'Validez votre régularité avec moins de pression.',
      },
      {
        q: 'Étape 3 - Compte financé',
        a: 'Commencez à trader avec un capital fourni par AKAD.',
      },
      {
        q: 'Est-ce que je peux échouer une étape ?',
        a: 'Oui, mais vous pouvez recommencer si vous le souhaitez.',
      },
    ],
  },
  {
    title: 'Règles de trading',
    items: [
      {
        q: 'Jours de trading minimum',
        a: 'Minimum de 4 jours de trading requis.',
      },
      {
        q: 'Perte journalière maximale',
        a: 'Vous ne devez pas dépasser la perte autorisée par jour.',
      },
      {
        q: 'Perte maximale',
        a: 'La perte cumulée ne doit pas dépasser le maximum prévu.',
      },
      {
        q: 'Objectif de profit',
        a: 'Un objectif de performance est à atteindre durant le Challenge.',
      },
      {
        q: 'Règle des 45',
        a: 'Votre equity ne doit pas descendre sous 45% de votre balance.',
      },
      {
        q: 'Utilisation du levier',
        a: 'Le levier maximum autorisé est de 1:100.',
      },
    ],
  },
  {
    title: 'Spécifications techniques',
    items: [
      {
        q: 'Puis-je trader les nouvelles économiques ?',
        a: 'Oui, mais en respectant les règles de gestion du risque.',
      },
      {
        q: 'Dois-je fermer mes positions la nuit ?',
        a: 'Non, sauf indication contraire dans votre contrat.',
      },
      {
        q: 'Quelles plateformes sont disponibles ?',
        a: 'MetaTrader 4, MetaTrader 5 et TradingView.',
      },
      {
        q: 'Quel type de marché est disponible ?',
        a: 'Forex, indices, crypto, métaux.',
      },
    ],
  },
  {
    title: 'Facturation & paiements',
    items: [
      {
        q: 'Quels sont les moyens de paiement ?',
        a: 'Carte bancaire, PayPal, crypto-monnaies.',
      },
      {
        q: 'Y a-t-il des frais ?',
        a: 'Des frais peuvent s’appliquer selon le plan choisi.',
      },
      {
        q: 'Facturez-vous des frais cachés ?',
        a: 'Non, tout est clairement indiqué avant l’achat.',
      },
      {
        q: 'Quand ai-je accès à mon compte après paiement ?',
        a: 'Immédiatement ou dans un délai de quelques minutes.',
      },
      {
        q: 'Puis-je me faire rembourser ?',
        a: 'Oui sous certaines conditions si vous n’avez pas commencé à trader.',
      },
    ],
  },
  {
    title: 'Comptes financés',
    items: [
      {
        q: 'Que se passe-t-il après avoir été financé ?',
        a: 'Vous recevez un compte réel avec des conditions professionnelles.',
      },
      {
        q: 'Comment sont payés les gains ?',
        a: 'Par virement ou crypto, une fois le seuil minimum atteint.',
      },
      {
        q: 'Puis-je perdre le compte financé ?',
        a: 'Oui si vous enfreignez les règles de risque.',
      },
      {
        q: 'Y a-t-il des retraits partiels ?',
        a: 'Oui, à partir d’un certain montant cumulé.',
      },
    ],
  },
]

const open = ref({})

function toggle(colIndex, i) {
  open.value[colIndex] = open.value[colIndex] === i ? null : i
}
</script>

<style scoped>
button {
  transition: background-color 0.2s ease;
}
</style>
