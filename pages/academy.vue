<script setup>
definePageMeta({
  layout: 'dashboard'
})

const courses = [
  {
    title: 'Gestion des Risques Avancée',
    description: 'Apprenez à maîtriser la gestion du risque et à protéger votre capital.',
    slug: 'gestion-risques',
    category: 'gestion'
  },
  {
    title: 'Psychologie du Trading',
    description: 'Développez une mentalité de gagnant et gérez vos émotions.',
    slug: 'psychologie-trading',
    category: 'psychologie'
  },
  {
    title: 'Analyse Technique Approfondie',
    description: 'Explorez les indicateurs, figures chartistes et stratégies techniques.',
    slug: 'analyse-technique',
    category: 'technique'
  },
  {
    title: 'Stratégies de Trading sur CFD',
    description: 'Utilisez les cotations CFD pour des entrées précises et un money management rigoureux.',
    slug: 'trading-cfd',
    category: 'strategie'
  },
  {
    title: 'Levier et Volatilité',
    description: 'Exploitez au mieux l’effet de levier sans vous exposer au sur-risque.',
    slug: 'levier-volatilite',
    category: 'gestion'
  },
  {
    title: 'Journal de Trading et Suivi',
    description: 'Apprenez à structurer votre suivi de performance comme un pro.',
    slug: 'journal-suivi',
    category: 'suivi'
  }
]
</script>

<template>
  <div class="p-6 bg-zinc-900 rounded-2xl text-white shadow-md">
    <h2 class="text-3xl font-bold mb-4 text-yellow-400">🎓 AKAD Academy</h2>
    <p class="mb-6 text-gray-300">Accédez à notre bibliothèque de contenu éducatif exclusif conçu pour faire progresser votre trading.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(course, index) in courses"
        :key="index"
        class="bg-zinc-800 p-5 rounded-xl hover:bg-zinc-700 transition-transform transform hover:scale-105 hover:shadow-lg"
      >
        <h3 class="text-xl font-semibold text-white mb-1">{{ course.title }}</h3>
        <p class="text-sm text-gray-400 mb-3">{{ course.description }}</p>
        <NuxtLink
          :to="`/academy/${course.slug}`"
          class="text-yellow-400 font-semibold hover:underline"
          :aria-label="`Accéder au cours ${course.title}`"
        >
          Accéder ➔
        </NuxtLink>
      </div>
    </div>
  </div>
</template>