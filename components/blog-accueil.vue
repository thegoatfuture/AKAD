<template>
  <section class="relative bg-gradient-to-b from-black via-zinc-950 to-black py-20 px-4 overflow-hidden">
    <!-- Background elements -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-black to-black"></div>
      
      <!-- Animated particles -->
      <div class="absolute inset-0">
        <div class="absolute w-2 h-2 bg-yellow-400/20 rounded-full top-1/4 left-1/4 animate-float-slow"></div>
        <div class="absolute w-3 h-3 bg-yellow-400/30 rounded-full top-3/4 right-1/4 animate-float-medium"></div>
        <div class="absolute w-2 h-2 bg-yellow-400/20 rounded-full top-1/2 left-3/4 animate-float-fast"></div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-yellow-400 mb-4">Derniers articles & actualités</h2>
        <p class="text-lg text-zinc-400">Restez informé des dernières tendances et stratégies de trading</p>
      </div>

      <!-- Blog grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(article, index) in articles" :key="index" 
             class="group bg-zinc-900/50 backdrop-blur rounded-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <!-- Image container -->
          <div class="relative h-48 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img :src="article.image" :alt="article.title" 
                 class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute bottom-4 left-4 z-20">
              <p class="text-xs font-medium text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                {{ article.date }}
              </p>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
              {{ article.title }}
            </h3>
            <p class="text-zinc-400 text-sm mb-4 line-clamp-2">{{ article.excerpt }}</p>
            
            <NuxtLink :to="article.link" 
                     class="inline-flex items-center gap-2 text-yellow-400 font-medium hover:text-yellow-300 transition-colors">
              <span>Lire l'article</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
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
    excerpt: 'Nos experts partagent les pièges courants des traders débutants et comment les contourner.',
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
    excerpt: 'Nos conseils pour franchir sereinement la seconde étape du programme.',
    image: '/images/article3.jpg',
    date: '12 mai 2025',
    link: '/blog/reussir-verification',
  },
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

.backdrop-blur {
  backdrop-filter: blur(8px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>