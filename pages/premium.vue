<template>
  <div class="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Animated gradient orbs -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-float-medium"></div>
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300/5 rounded-full blur-2xl animate-float-fast"></div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-[url('/images/pattern-light.svg')] bg-repeat opacity-[0.02]"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-12">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-3 bg-yellow-400/10 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-400/20 mb-6">
          <CrownIcon class="w-6 h-6 text-yellow-400" />
          <span class="text-yellow-400 font-semibold">AKAD Premium</span>
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
          Expérience Premium
        </h1>
        <p class="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Débloquez des fonctionnalités exclusives et bénéficiez d'un accompagnement personnalisé pour maximiser vos performances de trading.
        </p>
      </div>

      <!-- Premium Features Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div v-for="(feature, index) in premiumFeatures" :key="index"
             class="group bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800/50 hover:border-yellow-400/30 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/10">
          
          <!-- Icon with glow effect -->
          <div class="relative mb-6">
            <div class="absolute inset-0 bg-yellow-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-2xl flex items-center justify-center border border-yellow-400/30 group-hover:scale-110 transition-transform duration-300">
              <component :is="feature.icon" class="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <h3 class="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors duration-300">
            {{ feature.title }}
          </h3>
          <p class="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
            {{ feature.description }}
          </p>

          <!-- Feature highlight -->
          <div class="mt-4 inline-flex items-center gap-2 text-sm text-yellow-400/80">
            <StarIcon class="w-4 h-4" />
            <span>{{ feature.highlight }}</span>
          </div>
        </div>
      </div>

      <!-- Pricing Section -->
      <div class="bg-zinc-900/50 backdrop-blur-lg rounded-3xl border border-zinc-800/50 p-8 md:p-12 mb-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Choisissez votre formule</h2>
          <p class="text-zinc-400">Des tarifs transparents pour tous les niveaux</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Monthly Plan -->
          <div class="bg-zinc-800/50 rounded-2xl p-8 border border-zinc-700/50 hover:border-yellow-400/30 transition-all duration-300">
            <div class="text-center mb-8">
              <h3 class="text-xl font-bold mb-2">Mensuel</h3>
              <div class="text-4xl font-bold text-yellow-400 mb-2">29,99€</div>
              <p class="text-zinc-400">par mois</p>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5 text-green-400 flex-shrink-0" />
                <span class="text-sm">Toutes les fonctionnalités Premium</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5 text-green-400 flex-shrink-0" />
                <span class="text-sm">Support prioritaire</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5 text-green-400 flex-shrink-0" />
                <span class="text-sm">Annulation à tout moment</span>
              </li>
            </ul>
            <button @click="handleSubscribe('monthly')" 
                    class="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-3 rounded-lg transition-colors">
              Choisir ce plan
            </button>
          </div>

          <!-- Annual Plan (Popular) -->
          <div class="bg-gradient-to-br from-yellow-400/10 to-yellow-500/10 rounded-2xl p-8 border-2 border-yellow-400/50 relative transform scale-105">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-yellow-400 text-black text-sm font-bold px-4 py-2 rounded-full">
                Le plus populaire
              </span>
            </div>
            <div class="text-center mb-8">
              <h3 class="text-xl font-bold mb-2">Annuel</h3>
              <div class="text-4xl font-bold text-yellow-400 mb-2">299€</div>
              <p class="text-zinc-400">par an</p>
              <p class="text-sm text-green-400 mt-2">Économisez 60€</p>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5 text-green-400 flex-shrink-0" />
                <span class="text-sm">Toutes les fonctionnalités Premium</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5 text-green-400 flex-shrink-0" />
                <span class="text-sm">Support prioritaire</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5 text-green-400 flex-shrink-0" />
                <span class="text-sm">2 mois offerts</span>
              </li>
            </ul>
            <button @click="handleSubscribe('annual')" 
                    class="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-colors">
              Choisir ce plan
            </button>
          </div>

          <!-- Trial Plan -->
          <div class="bg-zinc-800/50 rounded-2xl p-8 border border-zinc-700/50 hover:border-yellow-400/30 transition-all duration-300">
            <div class="text-center mb-8">
              <h3 class="text-xl font-bold mb-2">Essai gratuit</h3>
              <div class="text-4xl font-bold text-green-400 mb-2">0€</div>
              <p class="text-zinc-400">7 jours</p>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5 text-green-400 flex-shrink-0" />
                <span class="text-sm">Accès complet pendant 7 jours</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5 text-green-400 flex-shrink-0" />
                <span class="text-sm">Aucun engagement</span>
              </li>
              <li class="flex items-center gap-3">
                <CheckIcon class="w-5 h-5 text-green-400 flex-shrink-0" />
                <span class="text-sm">Annulation facile</span>
              </li>
            </ul>
            <button @click="handleSubscribe('trial')" 
                    class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
              Commencer l'essai
            </button>
          </div>
        </div>
      </div>

      <!-- Testimonials Section -->
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-12">Ce que disent nos membres Premium</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800/50">
            <div class="flex items-center gap-4 mb-6">
              <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" 
                   alt="Thomas R." 
                   class="w-12 h-12 rounded-full object-cover" />
              <div class="text-left">
                <h4 class="font-semibold">Thomas R.</h4>
                <p class="text-sm text-zinc-400">Trader Premium depuis 6 mois</p>
              </div>
            </div>
            <p class="text-zinc-300 italic">
              "Le coaching personnalisé m'a permis d'améliorer considérablement mes performances. 
              L'investissement en vaut vraiment la peine."
            </p>
          </div>

          <div class="bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800/50">
            <div class="flex items-center gap-4 mb-6">
              <img src="https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg" 
                   alt="Sarah M." 
                   class="w-12 h-12 rounded-full object-cover" />
              <div class="text-left">
                <h4 class="font-semibold">Sarah M.</h4>
                <p class="text-sm text-zinc-400">Trader Premium depuis 1 an</p>
              </div>
            </div>
            <p class="text-zinc-300 italic">
              "Les analyses exclusives et les alertes en temps réel ont transformé ma façon de trader. 
              Je recommande vivement !"
            </p>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800/50">
        <h2 class="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
        <div class="space-y-6">
          <div v-for="(faq, index) in faqs" :key="index" class="border-b border-zinc-800/50 pb-6 last:border-b-0">
            <button @click="toggleFaq(index)" 
                    class="flex justify-between items-center w-full text-left">
              <h3 class="font-semibold text-lg">{{ faq.question }}</h3>
              <ChevronDownIcon :class="['w-5 h-5 transition-transform', openFaq === index ? 'rotate-180' : '']" />
            </button>
            <div v-if="openFaq === index" class="mt-4 text-zinc-400">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal"
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-zinc-900/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-zinc-800/50 animate-modal-in">
        <button @click="showModal = false" 
                class="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors">
          <XIcon class="w-6 h-6" />
        </button>
        
        <div class="text-center">
          <CrownIcon class="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 class="text-2xl font-bold mb-4">Souscription AKAD Premium</h3>
          <p class="text-zinc-400 mb-6">
            Vous allez être redirigé vers la page de contact pour finaliser votre abonnement {{ selectedPlan }}.
          </p>
          <button @click="proceedToPayment" 
                  class="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-colors">
            Nous contacter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CheckIcon, XIcon, ChevronDownIcon, CrownIcon, StarIcon, BarChartIcon as ChartBarIcon, GraduationCap, HeadphonesIcon, BellIcon, ShieldCheckIcon, ZapIcon, UsersIcon, TrendingUpIcon } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
})

const showModal = ref(false)
const selectedPlan = ref('')
const openFaq = ref(null)

const premiumFeatures = [
  {
    icon: TrendingUpIcon,
    title: 'Analyses exclusives',
    description: 'Recevez des analyses de marché approfondies réalisées par nos experts.',
    highlight: 'Mis à jour quotidiennement'
  },
  {
    icon: GraduationCap,
    title: 'Formation personnalisée',
    description: 'Accédez à des sessions de coaching individuelles avec nos mentors certifiés.',
    highlight: '2h de coaching/mois'
  },
  {
    icon: HeadphonesIcon,
    title: 'Support prioritaire',
    description: 'Bénéficiez d\'un support technique et commercial prioritaire 24/7.',
    highlight: 'Réponse < 2h'
  },
  {
    icon: BellIcon,
    title: 'Alertes en temps réel',
    description: 'Recevez des notifications instantanées sur les opportunités de marché.',
    highlight: 'Push + Email + SMS'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Accès anticipé',
    description: 'Découvrez en avant-première toutes les nouvelles fonctionnalités.',
    highlight: 'Beta testeur officiel'
  },
  {
    icon: ZapIcon,
    title: 'Outils avancés',
    description: 'Utilisez des calculateurs de risque et des outils d\'analyse exclusifs.',
    highlight: '10+ outils premium'
  },
  {
    icon: UsersIcon,
    title: 'Communauté VIP',
    description: 'Rejoignez notre groupe Discord privé réservé aux membres Premium.',
    highlight: 'Accès exclusif'
  },
  {
    icon: ChartBarIcon,
    title: 'Statistiques avancées',
    description: 'Analysez vos performances avec des métriques détaillées et des rapports.',
    highlight: 'Rapports mensuels'
  },
  {
    icon: CrownIcon,
    title: 'Badge Premium',
    description: 'Affichez votre statut Premium sur votre profil et dans le leaderboard.',
    highlight: 'Reconnaissance VIP'
  }
]

const faqs = [
  {
    question: 'Puis-je annuler mon abonnement à tout moment ?',
    answer: 'Oui, vous pouvez annuler votre abonnement Premium à tout moment depuis votre espace client. L\'annulation prend effet à la fin de votre période de facturation en cours.'
  },
  {
    question: 'Y a-t-il une période d\'essai gratuite ?',
    answer: 'Oui, nous proposons un essai gratuit de 7 jours pour découvrir toutes les fonctionnalités Premium sans engagement.'
  },
  {
    question: 'Les fonctionnalités Premium sont-elles disponibles sur mobile ?',
    answer: 'Absolument ! Toutes les fonctionnalités Premium sont accessibles depuis notre application mobile et notre interface web responsive.'
  },
  {
    question: 'Comment fonctionne le coaching personnalisé ?',
    answer: 'Vous bénéficiez de 2 heures de coaching individuel par mois avec un de nos mentors certifiés. Les sessions peuvent être programmées selon votre disponibilité.'
  }
]

function handleSubscribe(plan) {
  selectedPlan.value = plan
  showModal.value = true
}

async function proceedToPayment() {
  showModal.value = false
  navigateTo('/contact')
}

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<style scoped>
/* Floating animations */
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(1deg); }
  66% { transform: translate(-20px, 20px) rotate(-1deg); }
}

@keyframes float-medium {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-25px, -25px) rotate(2deg); }
}

@keyframes float-fast {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, -10px) rotate(-1deg); }
  75% { transform: translate(-15px, 15px) rotate(1deg); }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

/* Modal animation */
@keyframes modal-in {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modal-in {
  animation: modal-in 0.3s ease-out;
}

/* Backdrop blur support */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

/* Gradient text */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(250, 204, 21, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(250, 204, 21, 0.7);
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:text-yellow-400 {
  color: rgb(250 204 21);
}

.group:hover .group-hover\:text-zinc-300 {
  color: rgb(212 212 216);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>