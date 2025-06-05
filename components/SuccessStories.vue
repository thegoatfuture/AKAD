```vue
<template>
  <section class="relative py-20 px-4 bg-zinc-900/50 backdrop-blur">
    <!-- Background Effects -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <!-- Trading chart pattern -->
      <div class="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="success-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0 50 L25 25 L50 75 L75 35 L100 50" stroke="currentColor" fill="none" class="text-yellow-400" strokeWidth="2"/>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#success-pattern)"/>
        </svg>
      </div>
      
      <!-- Gradient overlays -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">Parcours de Réussite</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">
          Découvrez les histoires inspirantes de nos traders qui ont transformé leur passion en succès
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="story in successStories" :key="story.name" 
             class="group bg-black/30 rounded-2xl border border-zinc-800 hover:border-yellow-400/20 transition-all duration-500 overflow-hidden">
          <!-- Header with gradient overlay -->
          <div class="relative h-48">
            <img :src="story.image" :alt="story.name" 
                 class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <!-- Trading chart overlay -->
            <div class="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="chart-overlay" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
                  <path d="M0 25 Q25 10 50 30 T100 25" stroke="currentColor" fill="none" class="text-yellow-400" strokeWidth="1"/>
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#chart-overlay)"/>
              </svg>
            </div>
            <!-- Info overlay -->
            <div class="absolute bottom-4 left-4 right-4">
              <h3 class="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{{ story.name }}</h3>
              <p class="text-sm text-gray-400">{{ story.title }}</p>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Experience badge -->
            <div class="inline-block bg-yellow-400/10 text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {{ story.experience }} d'expérience
            </div>

            <!-- Performance Metrics -->
            <div class="grid grid-cols-3 gap-2 mb-6">
              <div class="bg-zinc-900/50 p-3 rounded-xl text-center">
                <div class="text-sm font-bold text-yellow-400">{{ story.metrics.winRate }}</div>
                <div class="text-xs text-gray-400">Win Rate</div>
              </div>
              <div class="bg-zinc-900/50 p-3 rounded-xl text-center">
                <div class="text-sm font-bold text-yellow-400">{{ story.metrics.avgRR }}</div>
                <div class="text-xs text-gray-400">Ratio R/R</div>
              </div>
              <div class="bg-zinc-900/50 p-3 rounded-xl text-center">
                <div class="text-sm font-bold text-yellow-400">{{ story.metrics.monthlyReturn }}</div>
                <div class="text-xs text-gray-400">Retour/mois</div>
              </div>
            </div>

            <!-- Story -->
            <p class="text-gray-300 text-sm leading-relaxed mb-6">{{ story.story }}</p>

            <!-- Trading Style Tags -->
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in story.tags" :key="tag"
                    class="bg-zinc-800 text-xs text-yellow-400/90 px-3 py-1 rounded-full border border-yellow-400/20">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const successStories = [
  {
    name: 'Thomas Laurent',
    title: 'Trader AKAD depuis 2024',
    experience: '2 ans',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
    metrics: {
      winRate: '67%',
      avgRR: '1:2.5',
      monthlyReturn: '+8.5%'
    },
    story: 'Ancien développeur reconverti dans le trading, j\'ai trouvé dans AKAD la structure parfaite pour développer mes compétences. La combinaison du coaching personnalisé et des outils avancés m\'a permis d\'atteindre une consistance que je n\'avais jamais eue auparavant.',
    tags: ['Swing Trading', 'Analyse Technique', 'Risk Management']
  },
  {
    name: 'Marie Chen',
    title: 'Challenge réussi en 45 jours',
    experience: '3 ans',
    image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg',
    metrics: {
      winRate: '72%',
      avgRR: '1:3.2',
      monthlyReturn: '+12.3%'
    },
    story: 'Après plusieurs tentatives avec d\'autres prop firms, AKAD m\'a fourni l\'environnement idéal pour exceller. Leur approche du risk management et leur support technique 24/7 ont été déterminants dans ma réussite.',
    tags: ['Day Trading', 'Price Action', 'Momentum']
  },
  {
    name: 'Alexandre Dubois',
    title: 'Top Performer 2024',
    experience: '4 ans',
    image: 'https://images.pexels.com/photos/2182981/pexels-photo-2182981.jpeg',
    metrics: {
      winRate: '65%',
      avgRR: '1:2.8',
      monthlyReturn: '+15.7%'
    },
    story: 'Le programme AKAD m\'a permis de passer au niveau supérieur. Grâce à leur infrastructure et leur accompagnement, j\'ai pu me concentrer uniquement sur l\'exécution de ma stratégie.',
    tags: ['Scalping', 'Futures', 'Algorithmic']
  }
]
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1) translate(var(--tw-translate-x), var(--tw-translate-y));
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05) translate(var(--tw-translate-x), var(--tw-translate-y));
  }
}

.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.delay-1000 {
  animation-delay: 1000ms;
}
</style>
```