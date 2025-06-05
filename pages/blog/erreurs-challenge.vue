<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Hero Section -->
    <div class="relative h-[60vh] overflow-hidden">
      <img 
        src="https://images.pexels.com/photos/7567436/pexels-photo-7567436.jpeg" 
        alt="Erreurs à éviter" 
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
            5 erreurs critiques à éviter pendant le challenge AKAD
          </h1>
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-3">
              <img 
                src="https://images.pexels.com/photos/7567455/pexels-photo-7567455.jpeg" 
                alt="Sophie Dubois" 
                class="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
              />
              <div>
                <p class="font-medium">Sophie Dubois</p>
                <p class="text-sm text-gray-400">28 mai 2025</p>
              </div>
            </div>
            <div class="flex items-center gap-4 text-sm">
              <button class="hover:text-yellow-400 transition-colors flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span>247</span>
              </button>
              <button class="hover:text-yellow-400 transition-colors flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <span>42</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Article Content -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <!-- Table of Contents -->
      <div class="bg-zinc-900/50 backdrop-blur rounded-xl p-6 mb-12 sticky top-8">
        <h2 class="text-lg font-semibold mb-4">Table des matières</h2>
        <nav class="space-y-2">
          <a href="#intro" class="block text-gray-400 hover:text-yellow-400 transition-colors">Introduction</a>
          <a href="#error1" class="block text-gray-400 hover:text-yellow-400 transition-colors">1. Le surtrading compulsif</a>
          <a href="#error2" class="block text-gray-400 hover:text-yellow-400 transition-colors">2. La négligence du risk management</a>
          <a href="#error3" class="block text-gray-400 hover:text-yellow-400 transition-colors">3. Le trading émotionnel</a>
          <a href="#error4" class="block text-gray-400 hover:text-yellow-400 transition-colors">4. Le manque de préparation</a>
          <a href="#error5" class="block text-gray-400 hover:text-yellow-400 transition-colors">5. La mauvaise gestion du temps</a>
        </nav>
      </div>

      <!-- Article Content -->
      <div class="prose prose-lg prose-invert max-w-none">
        <div id="intro" class="mb-12">
          <p class="text-xl text-gray-300 leading-relaxed">
            Le challenge AKAD représente une opportunité unique de démontrer vos compétences de trading et d'accéder à un compte financé. Cependant, de nombreux traders échouent en commettant des erreurs qui auraient pu être évitées. Dans cet article, nous analysons les 5 erreurs les plus critiques et vous donnons les clés pour les éviter.
          </p>
        </div>

        <div id="error1" class="mb-16">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center">
              <span class="text-2xl font-bold text-yellow-400">1</span>
            </div>
            <h2 class="text-2xl font-bold">Le surtrading compulsif</h2>
          </div>
          
          <div class="bg-zinc-900/50 backdrop-blur rounded-xl p-6 mb-6">
            <div class="flex items-center gap-3 mb-4">
              <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="font-medium">Point clé à retenir</p>
            </div>
            <p class="text-gray-300">
              La qualité prime toujours sur la quantité. Un bon trade par jour vaut mieux que dix trades médiocres.
            </p>
          </div>

          <p>
            L'une des erreurs les plus fréquentes est de vouloir atteindre l'objectif trop rapidement. Cette précipitation se manifeste par :
          </p>

          <ul>
            <li>Des positions trop importantes par rapport au capital</li>
            <li>Des entrées sur le marché sans setup clair</li>
            <li>L'ignorance des règles de gestion du risque</li>
          </ul>

          <div class="bg-zinc-800 rounded-xl p-6 my-8">
            <h4 class="font-semibold mb-4">Solution recommandée</h4>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Définir un nombre maximum de trades par jour</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Attendre les setups parfaits</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Tenir un journal de trading détaillé</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Continue with similar structured sections for errors 2-5 -->
        
        <!-- Call to Action -->
        <div class="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-xl p-8 mt-12">
          <h3 class="text-2xl font-bold mb-4">Prêt à relever le challenge ?</h3>
          <p class="text-gray-300 mb-6">
            Évitez ces erreurs et maximisez vos chances de réussite avec notre programme d'accompagnement personnalisé.
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
            alt="Sophie Dubois" 
            class="w-20 h-20 rounded-full object-cover border-2 border-yellow-400"
          />
          <div>
            <h3 class="font-bold text-xl mb-1">Sophie Dubois</h3>
            <p class="text-gray-400 mb-2">Coach senior chez AKAD</p>
            <p class="text-sm text-gray-300">
              Avec plus de 10 ans d'expérience en trading, Sophie accompagne les traders débutants et confirmés dans leur journey vers le succès.
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
  title: '5 erreurs critiques à éviter pendant le challenge AKAD - Guide complet',
  description: 'Découvrez les erreurs les plus courantes qui font échouer les traders pendant le challenge AKAD et apprenez à les éviter.',
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
</style>