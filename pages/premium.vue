<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'dashboard'
})

const router = useRouter()
const showModal = ref(false)

function handleSubscribe() {
  showModal.value = true
}

function proceedToPayment() {
  showModal.value = false
  router.push('/facturation')
}
</script>

<template>
  <div class="bg-zinc-950 min-h-screen p-8 text-white">
    <div class="max-w-5xl mx-auto space-y-10">
      <!-- En-tête -->
      <header class="text-center">
        <h1 class="text-3xl font-bold text-yellow-400">AKAD Premium</h1>
        <p class="text-gray-400 mt-2">Profitez d'une expérience évoluée et d'avantages exclusifs</p>
      </header>

      <!-- Bénéfices Premium -->
      <section class="bg-zinc-900 rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-semibold text-yellow-300 mb-4">Bénéfices Premium</h2>
        <ul class="grid md:grid-cols-2 gap-4 text-sm text-gray-300 list-disc list-inside">
          <li>Accès prioritaire aux nouveaux comptes financés</li>
          <li>Support personnalisé avec nos mentors certifiés</li>
          <li>Analyse technique hebdomadaire exclusive</li>
          <li>Badge Premium visible sur votre profil et leaderboard</li>
          <li>Sessions de coaching mensuelles</li>
          <li>Webinaires de stratégie avancée</li>
          <li>Alertes en temps réel sur les opportunités de marché</li>
          <li>Accès anticipé aux nouvelles fonctionnalités de la plateforme</li>
        </ul>
      </section>

      <!-- Détails de l'abonnement -->
      <section class="bg-zinc-900 rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-semibold text-yellow-300 mb-4">Tarifs & Abonnement</h2>
        <div class="flex flex-col md:flex-row justify-between text-sm text-gray-300 gap-4">
          <div class="flex-1">
            <p class="mb-1">Abonnement mensuel</p>
            <p class="text-yellow-400 font-bold text-lg">29,99 € / mois</p>
          </div>
          <div class="flex-1">
            <p class="mb-1">Abonnement annuel</p>
            <p class="text-yellow-400 font-bold text-lg">299 € / an (2 mois offerts)</p>
          </div>
          <div class="flex-1">
            <p class="mb-1">Essai gratuit</p>
            <p class="text-green-400 font-bold text-lg">7 jours d’accès sans engagement</p>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <div class="text-center">
        <button
          @click="handleSubscribe"
          class="bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
        >
          S'abonner à AKAD Premium
        </button>
        <p class="text-xs text-gray-400 mt-2">Annulable à tout moment depuis votre espace personnel.</p>
      </div>

      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-zinc-800 p-6 rounded-xl shadow-xl w-full max-w-md relative">
          <button @click="showModal = false" class="absolute top-3 right-3 text-white hover:text-red-400">&times;</button>
          <h3 class="text-xl font-bold text-yellow-400 mb-4">Souscription AKAD Premium</h3>
          <p class="text-sm text-gray-300 mb-6">Vous allez être redirigé vers la page de paiement pour finaliser votre abonnement.</p>
          <button @click="proceedToPayment" class="bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition w-full">
            Procéder au paiement
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}
</style>