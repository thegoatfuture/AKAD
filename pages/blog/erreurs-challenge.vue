<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Hero Section -->
    <div class="relative h-[60vh] overflow-hidden">
      <img 
        src="https://images.pexels.com/photos/7567436/pexels-photo-7567436.jpeg" 
        alt="Erreurs à éviter pendant le challenge" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
      <div class="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-4 text-sm text-gray-300 mb-4">
            <span class="bg-yellow-400/20 backdrop-blur-sm px-3 py-1 rounded-full">Guide Trading</span>
            <span>•</span>
            <span>12 min de lecture</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            5 erreurs à éviter pendant le challenge
          </h1>
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-3">
              <img 
                src="https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg" 
                alt="Marc Dubois" 
                class="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
              />
              <div>
                <p class="font-medium">Marc Dubois</p>
                <p class="text-sm text-gray-400">28 mai 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content with Fixed TOC -->
    <div class="max-w-4xl mx-auto px-4 py-16 relative">
      <!-- Fixed Table of Contents -->
      <div class="lg:absolute lg:left-full lg:ml-8 lg:w-64 space-y-2 top-8 lg:sticky">
        <div class="bg-zinc-900/50 backdrop-blur rounded-xl p-6">
          <h2 class="text-lg font-semibold mb-4">Table des matières</h2>
          <nav class="space-y-2">
            <a href="#introduction" class="block text-gray-400 hover:text-yellow-400 transition-colors">Introduction</a>
            <a href="#erreur1" class="block text-gray-400 hover:text-yellow-400 transition-colors">Sur-trading</a>
            <a href="#erreur2" class="block text-gray-400 hover:text-yellow-400 transition-colors">Mauvaise gestion du risque</a>
            <a href="#erreur3" class="block text-gray-400 hover:text-yellow-400 transition-colors">Trading émotionnel</a>
            <a href="#erreur4" class="block text-gray-400 hover:text-yellow-400 transition-colors">Objectifs irréalistes</a>
            <a href="#erreur5" class="block text-gray-400 hover:text-yellow-400 transition-colors">Manque de préparation</a>
          </nav>
        </div>
      </div>

      <!-- Article Content -->
      <div class="prose prose-lg prose-invert max-w-none">
        <p class="text-xl text-gray-300 leading-relaxed">
          Le Challenge AKAD est une étape cruciale vers le trading professionnel. Découvrez les erreurs les plus communes et comment les éviter pour maximiser vos chances de réussite.
        </p>

        <div id="introduction" class="scroll-mt-8">
          <h2 class="text-2xl font-bold mb-6">Introduction</h2>
          <p>
            Réussir le Challenge AKAD nécessite une préparation minutieuse et une exécution précise. Malheureusement, de nombreux traders commettent des erreurs qui compromettent leurs chances de succès.
          </p>
        </div>

        <div id="erreur1" class="scroll-mt-8">
          <h2 class="text-2xl font-bold mb-6">1. Le sur-trading</h2>
          <p>Le sur-trading est l'une des erreurs les plus fréquentes :</p>
          <ul>
            <li>Trading sans setup valide</li>
            <li>Multiplication des positions</li>
            <li>Non-respect des temps de pause</li>
          </ul>
          <p>
            Solution : Établissez des critères stricts pour vos entrées et limitez votre nombre de trades quotidiens.
          </p>
        </div>

        <div id="erreur2" class="scroll-mt-8">
          <h2 class="text-2xl font-bold mb-6">2. Mauvaise gestion du risque</h2>
          <p>Une gestion du risque approximative peut rapidement mener à l'échec :</p>
          <ul>
            <li>Position sizing inadapté</li>
            <li>Absence de stop-loss</li>
            <li>Non-respect des limites de drawdown</li>
          </ul>
          <p>
            Solution : Utilisez notre calculateur de risque et respectez strictement vos règles de money management.
          </p>
        </div>

        <div id="erreur3" class="scroll-mt-8">
          <h2 class="text-2xl font-bold mb-6">3. Trading émotionnel</h2>
          <p>Les émotions sont l'ennemi du trader :</p>
          <ul>
            <li>Revenge trading après une perte</li>
            <li>FOMO (Fear Of Missing Out)</li>
            <li>Excès de confiance après une série gagnante</li>
          </ul>
          <p>
            Solution : Tenez un journal de trading et analysez vos états émotionnels.
          </p>
        </div>

        <div id="erreur4" class="scroll-mt-8">
          <h2 class="text-2xl font-bold mb-6">4. Objectifs irréalistes</h2>
          <p>Des objectifs mal calibrés créent une pression inutile :</p>
          <ul>
            <li>Vouloir atteindre l'objectif trop rapidement</li>
            <li>Négliger la gestion du risque pour des gains rapides</li>
            <li>Se fixer des objectifs quotidiens trop ambitieux</li>
          </ul>
          <p>
            Solution : Concentrez-vous sur le processus plutôt que sur les résultats.
          </p>
        </div>

        <div id="erreur5" class="scroll-mt-8">
          <h2 class="text-2xl font-bold mb-6">5. Manque de préparation</h2>
          <p>Une préparation insuffisante compromet vos chances :</p>
          <ul>
            <li>Absence de plan de trading</li>
            <li>Méconnaissance des règles du Challenge</li>
            <li>Manque de backtesting</li>
          </ul>
          <p>
            Solution : Utilisez notre programme de préparation et nos ressources éducatives.
          </p>
        </div>

        <!-- Call to Action -->
        <div class="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-xl p-8 mt-12">
          <h3 class="text-2xl font-bold mb-4">Prêt à relever le Challenge ?</h3>
          <p class="text-gray-300 mb-6">
            Évitez ces erreurs courantes et maximisez vos chances de réussite avec notre programme d'accompagnement.
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
            src="https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg" 
            alt="Marc Dubois" 
            class="w-20 h-20 rounded-full object-cover border-2 border-yellow-400"
          />
          <div>
            <h3 class="font-bold text-xl mb-1">Marc Dubois</h3>
            <p class="text-gray-400 mb-2">Coach trading chez AKAD</p>
            <p class="text-sm text-gray-300">
              Ancien trader institutionnel, Marc accompagne les traders débutants et confirmés depuis plus de 10 ans.
            </p>
          </div>
        </div>
      </div>

      <!-- Related Articles -->
      <div class="mt-12 border-t border-zinc-800 pt-12">
        <h3 class="text-2xl font-bold mb-8">Articles similaires</h3>
        <div class="grid md:grid-cols-2 gap-8">
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

          <NuxtLink to="/blog/reussir-verification" class="group">
            <div class="relative h-48 mb-4 overflow-hidden rounded-xl">
              <img 
                src="https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg" 
                alt="Réussir la vérification" 
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h4 class="font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
              Comment réussir votre première vérification
            </h4>
            <p class="text-gray-400 text-sm">12 mai 2025</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: '5 erreurs à éviter pendant le Challenge AKAD - Guide complet',
  description: 'Découvrez les erreurs les plus communes lors du Challenge AKAD et apprenez à les éviter pour maximiser vos chances de réussite.',
  ogImage: 'https://images.pexels.com/photos/7567436/pexels-photo-7567436.jpeg'
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

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Add padding to sections for anchor links */
.scroll-mt-8 {
  scroll-margin-top: 2rem;
}
</style>