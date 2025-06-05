<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Hero Section -->
    <div class="relative h-[60vh] overflow-hidden">
      <img 
        src="https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg" 
        alt="Réussir la vérification" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
      <div class="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-4 text-sm text-gray-300 mb-4">
            <span class="bg-yellow-400/20 backdrop-blur-sm px-3 py-1 rounded-full">Guide Trading</span>
            <span>•</span>
            <span>10 min de lecture</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Comment réussir votre première vérification
          </h1>
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-3">
              <img 
                src="https://images.pexels.com/photos/7567455/pexels-photo-7567455.jpeg" 
                alt="Thomas Martin" 
                class="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
              />
              <div>
                <p class="font-medium">Thomas Martin</p>
                <p class="text-sm text-gray-400">12 mai 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <!-- Table of Contents -->
      <div class="bg-zinc-900/50 backdrop-blur rounded-xl p-6 mb-12 sticky top-8">
        <h2 class="text-lg font-semibold mb-4">Table des matières</h2>
        <nav class="space-y-2">
          <a href="#differences" class="block text-gray-400 hover:text-yellow-400 transition-colors">Différences avec le Challenge</a>
          <a href="#strategy" class="block text-gray-400 hover:text-yellow-400 transition-colors">Stratégie recommandée</a>
          <a href="#risk" class="block text-gray-400 hover:text-yellow-400 transition-colors">Gestion du risque</a>
          <a href="#psychology" class="block text-gray-400 hover:text-yellow-400 transition-colors">Aspects psychologiques</a>
          <a href="#planning" class="block text-gray-400 hover:text-yellow-400 transition-colors">Organisation et planning</a>
          <a href="#tools" class="block text-gray-400 hover:text-yellow-400 transition-colors">Outils AKAD</a>
        </nav>
      </div>

      <!-- Article Content -->
      <div class="prose prose-lg prose-invert max-w-none">
        <p class="text-xl text-gray-300 leading-relaxed">
          La phase de vérification est une étape cruciale pour devenir un trader AKAD. Voici nos conseils pour la réussir du premier coup.
        </p>

        <div id="differences" class="mb-16">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold">Différences avec le Challenge</h2>
          </div>

          <div class="bg-zinc-900/50 backdrop-blur rounded-xl p-6 mb-6">
            <div class="flex items-center gap-3 mb-4">
              <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="font-medium">Points clés à retenir</p>
            </div>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Objectif de profit réduit (5% au lieu de 10%)</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Mêmes règles de drawdown</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Durée illimitée maintenue</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Continue with similar structured sections for Strategy, Risk Management, etc. -->

        <!-- Call to Action -->
        <div class="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-xl p-8 mt-12">
          <h3 class="text-2xl font-bold mb-4">Prêt à passer à l'étape suivante ?</h3>
          <p class="text-gray-300 mb-6">
            Mettez en pratique ces conseils et maximisez vos chances de réussite avec notre programme d'accompagnement.
          </p>
          <NuxtLink 
            to="/challenge" 
            class="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-colors"
          >
            Commencer le challenge
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Author Section -->
      <div class="mt-12 border-t border-zinc-800 pt-8">
        <div class="flex items-center gap-6">
          <img 
            src="https://images.pexels.com/photos/7567455/pexels-photo-7567455.jpeg" 
            alt="Thomas Martin" 
            class="w-20 h-20 rounded-full object-cover border-2 border-yellow-400"
          />
          <div>
            <h3 class="font-bold text-xl mb-1">Thomas Martin</h3>
            <p class="text-gray-400 mb-2">Analyste senior chez AKAD</p>
            <p class="text-sm text-gray-300">
              Expert en trading avec plus de 8 ans d'expérience, Thomas accompagne les traders dans leur progression vers l'excellence.
            </p>
          </div>
        </div>
      </div>

      <!-- Related Articles -->
      <div class="mt-12 border-t border-zinc-800 pt-12">
        <h3 class="text-2xl font-bold mb-8">Articles similaires</h3>
        <div class="grid md:grid-cols-2 gap-8">
          <NuxtLink to="/blog/erreurs-challenge" class="group">
            <div class="relative h-48 mb-4 overflow-hidden rounded-xl">
              <img 
                src="https://images.pexels.com/photos/7567436/pexels-photo-7567436.jpeg" 
                alt="Erreurs à éviter" 
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h4 class="font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
              5 erreurs à éviter pendant le challenge
            </h4>
            <p class="text-gray-400 text-sm">28 mai 2025</p>
          </NuxtLink>

          <NuxtLink to="/blog/psychologie-trading" class="group">
            <div class="relative h-48 mb-4 overflow-hidden rounded-xl">
              <img 
                src="https://images.pexels.com/photos/7567455/pexels-photo-7567455.jpeg" 
                alt="Psychologie du trading" 
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h4 class="font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
              Comprendre la psychologie du trader
            </h4>
            <p class="text-gray-400 text-sm">20 mai 2025</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Comment réussir votre première vérification - Guide complet AKAD',
  description: 'Découvrez les étapes clés et conseils d\'experts pour réussir la phase de vérification du programme AKAD Trading.',
  ogImage: 'https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg'
})
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}

.prose {
  max-width: none;
}

.prose h2 {
  color: #fff;
  font-size: 1.875rem;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
}

.prose p {
  color: #d1d5db;
  line-height: 1.75;
}

.prose ul {
  color: #d1d5db;
}

.prose strong {
  color: #fff;
}
</style>