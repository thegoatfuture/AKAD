<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-6">
          Nos Meilleurs <span class="text-yellow-400">Traders</span>
        </h1>
        <p class="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-12">
          Découvrez les performances exceptionnelles de nos traders qui excellent dans leur domaine
        </p>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div class="bg-zinc-900/50 backdrop-blur p-6 rounded-xl border border-zinc-800 text-center">
            <div class="text-3xl font-bold text-yellow-400 mb-2">200k€+</div>
            <div class="text-gray-400">Capital total géré</div>
          </div>
          <div class="bg-zinc-900/50 backdrop-blur p-6 rounded-xl border border-zinc-800 text-center">
            <div class="text-3xl font-bold text-yellow-400 mb-2">90%</div>
            <div class="text-gray-400">Profit sharing max</div>
          </div>
          <div class="bg-zinc-900/50 backdrop-blur p-6 rounded-xl border border-zinc-800 text-center">
            <div class="text-3xl font-bold text-yellow-400 mb-2">500+</div>
            <div class="text-gray-400">Traders actifs</div>
          </div>
          <div class="bg-zinc-900/50 backdrop-blur p-6 rounded-xl border border-zinc-800 text-center">
            <div class="text-3xl font-bold text-yellow-400 mb-2">15M€+</div>
            <div class="text-gray-400">Profits distribués</div>
          </div>
        </div>

        <!-- Top Coaches Section -->
        <div class="mb-16">
          <h2 class="text-2xl font-bold text-center mb-8">Nos Coachs Experts</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div v-for="coach in coaches" :key="coach.name" 
                 class="bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 text-center group hover:border-yellow-400/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden cursor-pointer">
              <div class="relative p-4">
                <img :src="coach.image" :alt="coach.name" 
                     class="w-24 h-24 rounded-full mx-auto object-cover border-4 border-yellow-400/20 group-hover:border-yellow-400 transition-all duration-300 group-hover:w-32 group-hover:h-32" />
                <div class="absolute -bottom-3 right-1/2 transform translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {{ coach.specialty }}
                </div>
              </div>
              
              <div class="p-4">
                <h3 class="text-xl font-bold mb-2">{{ coach.name }}</h3>
                <p class="text-gray-400 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">
                  {{ coach.description }}
                </p>
                <div class="flex flex-wrap justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div v-for="badge in coach.badges" :key="badge" 
                       class="bg-zinc-800 text-xs text-gray-300 px-2 py-1 rounded">
                    {{ badge }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Traders Table -->
        <div class="bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 overflow-hidden">
          <div class="p-6 border-b border-zinc-800">
            <h2 class="text-2xl font-bold">Top Traders du Mois</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-zinc-800/50">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rang</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">Trader</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">Capital</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">Performance</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">Gains</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-800">
                <tr v-for="(trader, index) in topTraders" :key="index" 
                    class="hover:bg-zinc-800/50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <div v-if="index < 3" :class="[
                        'w-8 h-8 rounded-full flex items-center justify-center text-black font-bold',
                        index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-300' : 'bg-amber-600'
                      ]">
                        {{ index + 1 }}
                      </div>
                      <div v-else class="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center font-bold">
                        {{ index + 1 }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <img :src="trader.image" :alt="trader.name" class="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div class="font-semibold">{{ trader.name }}</div>
                        <div class="text-sm text-gray-400">{{ trader.type }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">{{ trader.capital }}</td>
                  <td class="px-6 py-4 text-green-400">+{{ trader.performance }}%</td>
                  <td class="px-6 py-4 font-semibold">{{ trader.profit }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6">Prêt à rejoindre l'élite ?</h2>
        <p class="text-gray-400 mb-8">
          Commencez votre journey vers le trading professionnel avec AKAD
        </p>
        <NuxtLink
          to="/challenge"
          class="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-all transform hover:scale-105"
        >
          Commencer le Challenge
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const coaches = [
  {
    name: 'Alexandre Martin',
    specialty: 'Day Trading',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
    description: '15 ans d\'expérience en trading institutionnel. Expert en analyse technique et gestion du risque.',
    badges: ['Forex', 'Indices', 'Commodities']
  },
  {
    name: 'Sarah Chen',
    specialty: 'Swing Trading',
    image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg',
    description: 'Spécialiste du swing trading et de la psychologie du trading. Coach certifiée en performance.',
    badges: ['Cryptos', 'Actions', 'Risk Management']
  },
  {
    name: 'Marc Durant',
    specialty: 'Scalping',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    description: 'Expert en scalping et en trading algorithmique. Développeur de stratégies quantitatives.',
    badges: ['Algo Trading', 'High Frequency', 'Technical Analysis']
  }
]

const topTraders = [
  {
    name: 'Thomas R.',
    type: 'Swing Trader',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    capital: '200,000€',
    performance: 18.5,
    profit: '37,000€'
  },
  {
    name: 'Sophie M.',
    type: 'Day Trader',
    image: 'https://images.pexels.com/photos/3796218/pexels-photo-3796218.jpeg',
    capital: '100,000€',
    performance: 15.3,
    profit: '15,300€'
  },
  {
    name: 'Marc L.',
    type: 'Scalper',
    image: 'https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg',
    capital: '50,000€',
    performance: 14.7,
    profit: '7,350€'
  },
  {
    name: 'Julie D.',
    type: 'Position Trader',
    image: 'https://images.pexels.com/photos/3796219/pexels-photo-3796219.jpeg',
    capital: '100,000€',
    performance: 12.8,
    profit: '12,800€'
  },
  {
    name: 'Nicolas F.',
    type: 'Day Trader',
    image: 'https://images.pexels.com/photos/2379007/pexels-photo-2379007.jpeg',
    capital: '200,000€',
    performance: 11.2,
    profit: '22,400€'
  },
  {
    name: 'Emma S.',
    type: 'Swing Trader',
    image: 'https://images.pexels.com/photos/3796220/pexels-photo-3796220.jpeg',
    capital: '100,000€',
    performance: 10.5,
    profit: '10,500€'
  },
  {
    name: 'Lucas P.',
    type: 'Scalper',
    image: 'https://images.pexels.com/photos/2379008/pexels-photo-2379008.jpeg',
    capital: '50,000€',
    performance: 9.8,
    profit: '4,900€'
  },
  {
    name: 'Marie C.',
    type: 'Position Trader',
    image: 'https://images.pexels.com/photos/3796221/pexels-photo-3796221.jpeg',
    capital: '100,000€',
    performance: 9.2,
    profit: '9,200€'
  },
  {
    name: 'Antoine D.',
    type: 'Day Trader',
    image: 'https://images.pexels.com/photos/2379009/pexels-photo-2379009.jpeg',
    capital: '200,000€',
    performance: 8.7,
    profit: '17,400€'
  },
  {
    name: 'Laura B.',
    type: 'Swing Trader',
    image: 'https://images.pexels.com/photos/3796222/pexels-photo-3796222.jpeg',
    capital: '100,000€',
    performance: 8.1,
    profit: '8,100€'
  }
]

useSeoMeta({
  title: 'Top Traders AKAD - Performance et Classement',
  description: 'Découvrez les meilleurs traders AKAD et leurs performances exceptionnelles. Rejoignez notre communauté de traders d\'élite.'
})
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