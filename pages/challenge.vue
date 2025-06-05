```vue
<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
      </div>

      <div class="max-w-6xl mx-auto relative z-10">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            Challenge AKAD
            <span class="text-yellow-400">{{ formatAmount }}</span>
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Commencez votre journey vers le trading professionnel avec un capital adapté à vos objectifs
          </p>
        </div>

        <!-- Challenge Details -->
        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <!-- Left Column: Challenge Info -->
          <div class="space-y-8">
            <div class="bg-zinc-900/50 backdrop-blur rounded-2xl p-6 border border-zinc-800">
              <h3 class="text-xl font-bold text-yellow-400 mb-4">Objectifs du Challenge</h3>
              <ul class="space-y-4">
                <li class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-yellow-400/10 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium">Objectif de profit</p>
                    <p class="text-sm text-gray-400">{{ formatCurrency(amount * 0.1) }}</p>
                  </div>
                </li>
                <li class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-yellow-400/10 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium">Durée</p>
                    <p class="text-sm text-gray-400">Illimitée</p>
                  </div>
                </li>
                <li class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-yellow-400/10 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium">Drawdown maximum</p>
                    <p class="text-sm text-gray-400">{{ formatCurrency(amount * 0.1) }}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="bg-zinc-900/50 backdrop-blur rounded-2xl p-6 border border-zinc-800">
              <h3 class="text-xl font-bold text-yellow-400 mb-4">Inclus dans votre Challenge</h3>
              <ul class="space-y-3">
                <li class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Accès à la plateforme MT4/MT5</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Support technique 24/7</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Analyse de trading détaillée</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Webinaires hebdomadaires</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right Column: Payment Card -->
          <div class="bg-zinc-900/50 backdrop-blur rounded-2xl p-8 border border-zinc-800 h-fit sticky top-8">
            <h3 class="text-2xl font-bold mb-6">Récapitulatif de votre Challenge</h3>
            
            <div class="space-y-4 mb-8">
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Capital de trading</span>
                <span class="font-bold">{{ formatAmount }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Frais d'inscription</span>
                <span class="font-bold">{{ formatCurrency(fees) }}</span>
              </div>
              <div class="border-t border-zinc-700 pt-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">Total à payer</span>
                  <span class="text-xl font-bold text-yellow-400">{{ formatCurrency(fees) }}</span>
                </div>
              </div>
            </div>

            <button 
              @click="startChallenge"
              class="w-full bg-yellow-400 text-black font-bold py-4 px-6 rounded-xl hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
            >
              <span>Commencer le Challenge</span>
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>

            <div class="mt-6 flex items-center justify-center gap-4 text-sm text-gray-400">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <span>Paiement sécurisé</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                <span>Garantie satisfait</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute()
const amount = ref(Number(route.query.amount) || 10000)

const fees = computed(() => {
  const feeStructure = {
    10000: 79,
    25000: 199,
    50000: 299,
    100000: 399,
    200000: 799
  }
  return feeStructure[amount.value] || 79
})

const formatAmount = computed(() => {
  return formatCurrency(amount.value)
})

function formatCurrency(value) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value)
}

async function startChallenge() {
  try {
    const { data } = await useFetch('/api/create-checkout-session', {
      method: 'POST',
      body: {
        amount: amount.value,
        fees: fees.value
      }
    })
    
    if (data.value?.url) {
      window.location.href = data.value.url
    }
  } catch (error) {
    console.error('Error creating checkout session:', error)
  }
}

// SEO
useSeoMeta({
  title: `Challenge AKAD ${formatAmount.value} - Commencez votre évaluation`,
  description: `Démarrez votre challenge de trading AKAD avec un capital de ${formatAmount.value}. Objectifs adaptés et durée illimitée.`
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
```