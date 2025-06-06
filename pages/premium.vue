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
        <div class="inline-flex items-center gap-2 bg-yellow-400/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-yellow-400/20">
          <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <span class="text-yellow-400 text-sm font-medium">Exclusif</span>
        </div>
        
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
          AKAD Premium
        </h1>
        <p class="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Débloquez votre potentiel de trading avec des outils exclusifs et un accompagnement personnalisé
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-3 gap-8 mb-20">
        <!-- Monthly Plan -->
        <div class="group relative bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800/50 hover:border-yellow-400/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/10">
          <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative">
            <h3 class="text-xl font-bold mb-2">Mensuel</h3>
            <div class="flex items-baseline mb-6">
              <span class="text-4xl font-extrabold text-yellow-400">29,99€</span>
              <span class="text-zinc-400 ml-2">/mois</span>
            </div>
            <p class="text-zinc-400 text-sm mb-6">Parfait pour commencer</p>
            
            <button @click="handleSubscribe('monthly')" 
                    class="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              Choisir ce plan
            </button>
          </div>
        </div>

        <!-- Annual Plan (Most Popular) -->
        <div class="group relative bg-gradient-to-br from-yellow-400/10 to-yellow-500/5 backdrop-blur-lg rounded-2xl p-8 border-2 border-yellow-400/50 transform scale-105 shadow-2xl shadow-yellow-400/20">
          <!-- Popular badge -->
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              Le plus populaire
            </div>
          </div>
          
          <div class="relative">
            <h3 class="text-xl font-bold mb-2 text-yellow-400">Annuel</h3>
            <div class="flex items-baseline mb-2">
              <span class="text-4xl font-extrabold text-yellow-400">299€</span>
              <span class="text-zinc-400 ml-2">/an</span>
            </div>
            <div class="flex items-center gap-2 mb-6">
              <span class="text-sm text-zinc-500 line-through">359,88€</span>
              <span class="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-semibold">
                Économisez 60€
              </span>
            </div>
            <p class="text-zinc-400 text-sm mb-6">2 mois offerts</p>
            
            <button @click="handleSubscribe('annual')" 
                    class="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Choisir ce plan
            </button>
          </div>
        </div>

        <!-- Trial Plan -->
        <div class="group relative bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800/50 hover:border-green-400/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-400/10">
          <div class="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative">
            <h3 class="text-xl font-bold mb-2">Essai gratuit</h3>
            <div class="flex items-baseline mb-6">
              <span class="text-4xl font-extrabold text-green-400">0€</span>
              <span class="text-zinc-400 ml-2">/7 jours</span>
            </div>
            <p class="text-zinc-400 text-sm mb-6">Sans engagement</p>
            
            <button @click="handleSubscribe('trial')" 
                    class="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              Essayer gratuitement
            </button>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="mb-20">
        <h2 class="text-3xl font-bold text-center mb-12 text-yellow-400">
          Fonctionnalités Premium
        </h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(feature, index) in premiumFeatures" :key="index"
               class="group bg-zinc-900/30 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/30 hover:border-yellow-400/20 transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors duration-300">
                <component :is="feature.icon" class="w-6 h-6 text-yellow-400" />
              </div>
              <h3 class="font-semibold text-lg group-hover:text-yellow-400 transition-colors duration-300">
                {{ feature.title }}
              </h3>
            </div>
            <p class="text-zinc-400 text-sm leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- Comparison Table -->
      <div class="mb-20">
        <h2 class="text-3xl font-bold text-center mb-12 text-yellow-400">
          Comparaison des fonctionnalités
        </h2>
        
        <div class="bg-zinc-900/50 backdrop-blur-lg rounded-2xl border border-zinc-800/50 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-zinc-800/50">
                <tr>
                  <th class="text-left p-6 font-semibold">Fonctionnalité</th>
                  <th class="text-center p-6 font-semibold text-zinc-400">Gratuit</th>
                  <th class="text-center p-6 font-semibold text-yellow-400">Premium</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-800/30">
                <tr v-for="(comparison, index) in featureComparison" :key="index" 
                    class="hover:bg-zinc-800/20 transition-colors duration-200">
                  <td class="p-6 font-medium">{{ comparison.feature }}</td>
                  <td class="p-6 text-center">
                    <component :is="comparison.free ? 'CheckIcon' : 'XIcon'" 
                               :class="comparison.free ? 'text-green-400' : 'text-red-400'" 
                               class="w-5 h-5 mx-auto" />
                  </td>
                  <td class="p-6 text-center">
                    <CheckIcon class="w-5 h-5 text-yellow-400 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Testimonials -->
      <div class="mb-20">
        <h2 class="text-3xl font-bold text-center mb-12 text-yellow-400">
          Ce que disent nos membres Premium
        </h2>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(testimonial, index) in testimonials" :key="index"
               class="bg-zinc-900/30 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/30">
            <div class="flex items-center gap-1 mb-4">
              <div v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400">
                ⭐
              </div>
            </div>
            <p class="text-zinc-300 mb-4 italic">"{{ testimonial.quote }}"</p>
            <div class="flex items-center gap-3">
              <img :src="testimonial.avatar" :alt="testimonial.name" 
                   class="w-10 h-10 rounded-full object-cover" />
              <div>
                <p class="font-semibold text-sm">{{ testimonial.name }}</p>
                <p class="text-zinc-400 text-xs">{{ testimonial.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mb-20">
        <h2 class="text-3xl font-bold text-center mb-12 text-yellow-400">
          Questions fréquentes
        </h2>
        
        <div class="max-w-3xl mx-auto space-y-4">
          <div v-for="(faq, index) in faqs" :key="index"
               class="bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-800/30 overflow-hidden">
            <button @click="toggleFaq(index)"
                    class="w-full text-left p-6 flex justify-between items-center hover:bg-zinc-800/20 transition-colors duration-200">
              <span class="font-semibold">{{ faq.question }}</span>
              <ChevronDownIcon :class="[
                'w-5 h-5 text-yellow-400 transition-transform duration-300',
                activeFaq === index ? 'rotate-180' : ''
              ]" />
            </button>
            <div v-if="activeFaq === index" 
                 class="px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800/30 pt-4">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center">
        <div class="bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-12 border border-yellow-400/20">
          <h2 class="text-3xl font-bold mb-4">Prêt à passer au niveau supérieur ?</h2>
          <p class="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de traders qui ont déjà transformé leur approche du trading avec AKAD Premium.
          </p>
          <button @click="handleSubscribe('annual')"
                  class="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Commencer maintenant
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal"
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-zinc-900/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-zinc-800/50 animate-modal-in">
        <button @click="showModal = false"
                class="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors duration-200">
          <XIcon class="w-6 h-6" />
        </button>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CrownIcon class="w-8 h-8 text-yellow-400" />
          </div>
          
          <h3 class="text-2xl font-bold text-yellow-400 mb-4">
            Souscription {{ selectedPlan }}
          </h3>
          <p class="text-zinc-300 mb-8">
            Vous allez être redirigé vers la page de contact pour finaliser votre abonnement Premium.
          </p>
          
          <div class="space-y-4">
            <button @click="proceedToPayment"
                    class="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 rounded-lg transition-all duration-300">
              Continuer
            </button>
            <button @click="showModal = false"
                    class="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-lg transition-colors duration-200">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  CheckIcon, 
  XIcon, 
  ChevronDownIcon,
  CrownIcon,
  StarIcon,
  ChartBarIcon,
  AcademicCapIcon,
  SupportIcon,
  BellIcon,
  ShieldCheckIcon,
  LightningBoltIcon,
  UsersIcon,
  TrendingUpIcon
} from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
})

const showModal = ref(false)
const selectedPlan = ref('')
const activeFaq = ref(null)

const premiumFeatures = [
  {
    icon: ChartBarIcon,
    title: 'Analyses avancées',
    description: 'Accédez à des analyses de marché exclusives et des rapports détaillés sur vos performances.'
  },
  {
    icon: AcademicCapIcon,
    title: 'Formation personnalisée',
    description: 'Sessions de coaching individuelles avec nos experts traders certifiés.'
  },
  {
    icon: SupportIcon,
    title: 'Support prioritaire',
    description: 'Support technique et commercial disponible 24/7 avec temps de réponse garanti.'
  },
  {
    icon: BellIcon,
    title: 'Alertes en temps réel',
    description: 'Notifications instantanées sur les opportunités de marché et signaux de trading.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Accès anticipé',
    description: 'Découvrez en avant-première toutes les nouvelles fonctionnalités de la plateforme.'
  },
  {
    icon: LightningBoltIcon,
    title: 'Outils exclusifs',
    description: 'Calculateurs avancés, backtesting et outils d\'analyse technique professionnels.'
  },
  {
    icon: UsersIcon,
    title: 'Communauté VIP',
    description: 'Accès à notre Discord privé avec les meilleurs traders et sessions live exclusives.'
  },
  {
    icon: TrendingUpIcon,
    title: 'Stratégies avancées',
    description: 'Bibliothèque de stratégies de trading testées et validées par nos experts.'
  },
  {
    icon: StarIcon,
    title: 'Badge Premium',
    description: 'Statut Premium visible sur votre profil et dans le leaderboard.'
  }
]

const featureComparison = [
  { feature: 'Accès aux challenges', free: true },
  { feature: 'Dashboard de base', free: true },
  { feature: 'Support standard', free: true },
  { feature: 'Analyses de marché hebdomadaires', free: false },
  { feature: 'Coaching personnalisé', free: false },
  { feature: 'Support prioritaire 24/7', free: false },
  { feature: 'Alertes en temps réel', free: false },
  { feature: 'Outils avancés', free: false },
  { feature: 'Communauté VIP', free: false },
  { feature: 'Accès anticipé aux nouveautés', free: false }
]

const testimonials = [
  {
    name: 'Thomas R.',
    title: 'Trader Premium depuis 6 mois',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    quote: 'Le coaching personnalisé a complètement transformé ma façon de trader. Mes résultats se sont améliorés de 300%.'
  },
  {
    name: 'Sophie M.',
    title: 'Ex-trader institutionnel',
    avatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg',
    quote: 'Les analyses exclusives et les alertes en temps réel me donnent un avantage considérable sur les marchés.'
  },
  {
    name: 'Marc L.',
    title: 'Trader professionnel',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
    quote: 'La communauté VIP est incroyable. J\'apprends constamment de traders expérimentés et partage mes stratégies.'
  }
]

const faqs = [
  {
    question: 'Puis-je annuler mon abonnement à tout moment ?',
    answer: 'Oui, vous pouvez annuler votre abonnement Premium à tout moment depuis votre espace client. L\'annulation prendra effet à la fin de votre période de facturation en cours.'
  },
  {
    question: 'Y a-t-il une période d\'essai gratuite ?',
    answer: 'Oui, nous offrons 7 jours d\'essai gratuit pour découvrir toutes les fonctionnalités Premium sans engagement.'
  },
  {
    question: 'Que se passe-t-il si je rétrograde vers le plan gratuit ?',
    answer: 'Vous conserverez l\'accès aux fonctionnalités Premium jusqu\'à la fin de votre période payée, puis votre compte reviendra automatiquement au plan gratuit.'
  },
  {
    question: 'Le coaching est-il vraiment personnalisé ?',
    answer: 'Absolument ! Chaque session de coaching est adaptée à votre niveau, vos objectifs et votre style de trading. Nos coachs analysent vos performances pour vous proposer des conseils sur mesure.'
  },
  {
    question: 'Puis-je changer de plan en cours d\'abonnement ?',
    answer: 'Oui, vous pouvez passer du plan mensuel au plan annuel à tout moment. La différence sera calculée au prorata et vous bénéficierez immédiatement de la réduction.'
  }
]

function handleSubscribe(plan) {
  selectedPlan.value = plan
  showModal.value = true
}

function proceedToPayment() {
  showModal.value = false
  navigateTo('/contact')
}

function toggleFaq(index) {
  activeFaq.value = activeFaq.value === index ? null : index
}
</script>

<style scoped>
/* Custom animations */
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
  25% { transform: translate(15px, -15px) rotate(-1deg); }
  75% { transform: translate(-15px, 15px) rotate(1deg); }
}

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

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

.animate-modal-in {
  animation: modal-in 0.3s ease-out;
}

/* Backdrop blur support */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
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
  background: linear-gradient(to bottom, rgba(250, 204, 21, 0.5), rgba(250, 204, 21, 0.2));
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, rgba(250, 204, 21, 0.7), rgba(250, 204, 21, 0.4));
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:bg-yellow-400\/20 {
  background-color: rgba(250, 204, 21, 0.2);
}

.group:hover .group-hover\:text-yellow-400 {
  color: rgb(250, 204, 21);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>