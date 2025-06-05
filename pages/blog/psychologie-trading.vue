<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Hero Section -->
    <div class="relative h-[60vh] overflow-hidden">
      <img 
        src="https://images.pexels.com/photos/7567455/pexels-photo-7567455.jpeg" 
        alt="Psychologie du trading" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
      <div class="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-4 text-sm text-gray-300 mb-4">
            <span class="bg-yellow-400/20 backdrop-blur-sm px-3 py-1 rounded-full">Guide Trading</span>
            <span>•</span>
            <span>8 min de lecture</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Comprendre la psychologie du trader
          </h1>
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-3">
              <img 
                src="https://images.pexels.com/photos/7567436/pexels-photo-7567436.jpeg" 
                alt="Sarah Laurent" 
                class="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
              />
              <div>
                <p class="font-medium">Sarah Laurent</p>
                <p class="text-sm text-gray-400">20 mai 2025</p>
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
            <a href="#emotions" class="block text-gray-400 hover:text-yellow-400 transition-colors">Gestion des émotions</a>
            <a href="#biais" class="block text-gray-400 hover:text-yellow-400 transition-colors">Biais cognitifs</a>
            <a href="#discipline" class="block text-gray-400 hover:text-yellow-400 transition-colors">Discipline et routine</a>
            <a href="#mindset" class="block text-gray-400 hover:text-yellow-400 transition-colors">Mindset gagnant</a>
          </nav>
        </div>
      </div>

      <!-- Article Content -->
      <div class="prose prose-lg prose-invert max-w-none">
        <p class="text-xl text-gray-300 leading-relaxed">
          La psychologie est souvent considérée comme l'aspect le plus important du trading. Découvrez comment maîtriser vos émotions et développer un mindset de trader professionnel.
        </p>

        <div id="introduction" class="scroll-mt-8">
          <h2 class="text-2xl font-bold mb-6">Introduction à la psychologie du trading</h2>
          <p>La psychologie joue un rôle crucial dans le trading. Un trader qui ne maîtrise pas ses émotions aura du mal à appliquer sa stratégie de manière cohérente, même si celle-ci est techniquement solide.</p>
          <ul>
            <li>Impact des émotions sur les décisions</li>
            <li>Importance du contrôle mental</li>
            <li>Rôle de la discipline</li>
          </ul>
        </div>

        <div id="emotions" class="scroll-mt-8">
          <h2 class="text-2xl font-bold mb-6">Gestion des émotions</h2>
          <p>Les principales émotions à gérer en trading sont :</p>
          <ul>
            <li>La peur de perdre</li>
            <li>L'avidité et l'euphorie</li>
            <li>La frustration après une perte</li>
            <li>L'impatience</li>
          </ul>
        </div>

        <div id="biais" class="scroll-mt-8">
          <h2 class="text-2xl font-bold mb-6">Biais cognitifs en trading</h2>
          <p>Les biais cognitifs peuvent sérieusement impacter vos performances :</p>
          <ul>
            <li>Biais de confirmation</li>
            <li>Aversion à la perte</li>
            <li>Excès de confiance</li>
            <li>Ancrage mental</li>
          </ul>
        </div>

        <div id="discipline" class="scroll-mt-8">
          <h2 class="text-2xl font-bold mb-6">Discipline et routine</h2>
          <p>Une routine solide est essentielle pour maintenir la discipline :</p>
          <ul>
            <li>Préparation quotidienne</li>
            <li>Journal de trading</li>
            <li>Analyse post-session</li>
            <li>Gestion du stress</li>
          </ul>
        </div>

        <div id="mindset" class="scroll-mt-8">
          <h2 class="text-2xl font-bold mb-6">Développer un mindset gagnant</h2>
          <p>Le mindset d'un trader professionnel se construit sur :</p>
          <ul>
            <li>Acceptation des pertes</li>
            <li>Focus sur le processus</li>
            <li>Amélioration continue</li>
            <li>Patience et persévérance</li>
          </ul>
        </div>

        <!-- Call to Action -->
        <div class="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-xl p-8 mt-12">
          <h3 class="text-2xl font-bold mb-4">Prêt à transformer votre trading ?</h3>
          <p class="text-gray-300 mb-6">
            Mettez en pratique ces principes psychologiques et améliorez significativement vos performances.
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
            src="https://images.pexels.com/photos/7567436/pexels-photo-7567436.jpeg" 
            alt="Sarah Laurent" 
            class="w-20 h-20 rounded-full object-cover border-2 border-yellow-400"
          />
          <div>
            <h3 class="font-bold text-xl mb-1">Sarah Laurent</h3>
            <p class="text-gray-400 mb-2">Psychologue du trading chez AKAD</p>
            <p class="text-sm text-gray-300">
              Spécialiste en psychologie du trading, Sarah aide les traders à développer leur mental et à optimiser leurs performances depuis plus de 6 ans.
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
                src="https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg" 
                alt="Erreurs à éviter" 
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h4 class="font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
              5 erreurs à éviter pendant le challenge
            </h4>
            <p class="text-gray-400 text-sm">28 mai 2025</p>
          </NuxtLink>

          <NuxtLink to="/blog/reussir-verification" class="group">
            <div class="relative h-48 mb-4 overflow-hidden rounded-xl">
              <img 
                src="https://images.pexels.com/photos/7567436/pexels-photo-7567436.jpeg" 
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
  title: 'Comprendre la psychologie du trader - Guide AKAD',
  description: 'Découvrez les aspects psychologiques essentiels du trading et apprenez à maîtriser vos émotions pour devenir un meilleur trader.',
  ogImage: 'https://images.pexels.com/photos/7567455/pexels-photo-7567455.jpeg'
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