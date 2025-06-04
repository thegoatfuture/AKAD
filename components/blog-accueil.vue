<template>
  <section class="bg-black py-20 px-4 text-white">
    <div class="max-w-7xl mx-auto">
      <h2
        class="text-3xl md:text-4xl font-bold text-yellow-400 text-center mb-12"
      >
        Derniers articles & actualités
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(article, index) in articles"
          :key="index"
          class="bg-zinc-900 hover:bg-zinc-800 transition rounded-xl overflow-hidden shadow-md"
        >
          <img
            :src="article.image"
            alt="Article"
            class="w-full h-40 object-cover"
          />
          <div class="p-5">
            <p class="text-xs text-gray-400 uppercase mb-2">
              {{ article.date }}
            </p>
            <h3 class="text-lg font-semibold text-white mb-2">
              {{ article.title }}
            </h3>
            <p class="text-sm text-gray-300 mb-4">{{ article.excerpt }}</p>
            <NuxtLink
              :to="article.link"
              class="text-yellow-400 font-bold hover:underline text-sm"
            >
              Lire l’article →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const articles = [
  {
    title: '5 erreurs à éviter pendant le challenge',
    excerpt:
      'Nos experts partagent les pièges courants des traders débutants et comment les contourner.',
    image: '/images/article1.jpg',
    date: '28 mai 2025',
    link: '/blog/erreurs-challenge',
  },
  {
    title: 'Comprendre la psychologie du trader',
    excerpt: 'Discipline, mindset, et gestion émotionnelle au cœur du succès.',
    image: '/images/article2.jpg',
    date: '20 mai 2025',
    link: '/blog/psychologie-trading',
  },
  {
    title: 'Comment réussir votre première vérification',
    excerpt:
      'Nos conseils pour franchir sereinement la seconde étape du programme.',
    image: '/images/article3.jpg',
    date: '12 mai 2025',
    link: '/blog/reussir-verification',
  },
]
</script>
