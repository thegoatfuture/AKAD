<template>
  <div class="space-y-8">
    <!-- Active Subscriptions -->
    <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
      <h2 class="text-xl font-bold text-yellow-400 mb-6">Abonnements Actifs</h2>
      <div class="space-y-4">
        <div v-for="sub in activeSubscriptions" :key="sub.id"
             class="bg-zinc-800/50 p-4 rounded-xl flex justify-between items-center">
          <div>
            <div class="font-medium text-white">{{ sub.name }}</div>
            <div class="text-sm text-zinc-400">{{ sub.status }}</div>
          </div>
          <div class="text-right">
            <div class="font-bold text-yellow-400">{{ sub.price }}</div>
            <div class="text-sm text-zinc-400">Prochain paiement: {{ sub.nextPayment }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Methods -->
    <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-yellow-400">Moyens de Paiement</h2>
        <button @click="showAddCard = true" 
                class="text-sm bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500">
          Ajouter une carte
        </button>
      </div>
      
      <div class="space-y-4">
        <div v-for="card in paymentMethods" :key="card.id"
             class="bg-zinc-800/50 p-4 rounded-xl flex justify-between items-center">
          <div class="flex items-center gap-4">
            <div class="text-2xl">{{ card.icon }}</div>
            <div>
              <div class="font-medium text-white">{{ card.type }} •••• {{ card.last4 }}</div>
              <div class="text-sm text-zinc-400">Expire {{ card.expiry }}</div>
            </div>
          </div>
          <button @click="removeCard(card.id)" 
                  class="text-red-400 hover:text-red-300">
            Supprimer
          </button>
        </div>
      </div>
    </div>

    <!-- Billing History -->
    <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
      <h2 class="text-xl font-bold text-yellow-400 mb-6">Historique de Facturation</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="text-sm text-zinc-400">
            <tr>
              <th class="text-left py-3 px-4">Date</th>
              <th class="text-left py-3 px-4">Description</th>
              <th class="text-left py-3 px-4">Montant</th>
              <th class="text-left py-3 px-4">Statut</th>
              <th class="text-right py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-800">
            <tr v-for="invoice in billingHistory" :key="invoice.id"
                class="hover:bg-zinc-800/30">
              <td class="py-3 px-4">{{ invoice.date }}</td>
              <td class="py-3 px-4">{{ invoice.description }}</td>
              <td class="py-3 px-4 font-medium">{{ invoice.amount }}</td>
              <td class="py-3 px-4">
                <span :class="{
                  'text-green-400': invoice.status === 'Payé',
                  'text-yellow-400': invoice.status === 'En attente',
                  'text-red-400': invoice.status === 'Échoué'
                }">
                  {{ invoice.status }}
                </span>
              </td>
              <td class="py-3 px-4 text-right">
                <button @click="downloadInvoice(invoice.id)"
                        class="text-yellow-400 hover:text-yellow-300">
                  Télécharger
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Billing Details -->
    <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
      <h2 class="text-xl font-bold text-yellow-400 mb-6">Informations de Facturation</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Company Details -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-zinc-400 mb-1">
              Nom de l'entreprise (optionnel)
            </label>
            <input type="text" v-model="billingDetails.company"
                   class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400" />
          </div>
          <div>
            <label class="block text-sm font-medium text-zinc-400 mb-1">
              Numéro de TVA (optionnel)
            </label>
            <input type="text" v-model="billingDetails.vatNumber"
                   class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400" />
          </div>
        </div>

        <!-- Address -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-zinc-400 mb-1">
              Adresse de facturation
            </label>
            <textarea v-model="billingDetails.address" rows="3"
                      class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400">
            </textarea>
          </div>
          <button @click="updateBillingDetails"
                  class="w-full bg-yellow-400 text-black font-medium px-4 py-2 rounded-lg hover:bg-yellow-500">
            Mettre à jour
          </button>
        </div>
      </div>
    </div>

    <!-- Promo Code -->
    <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
      <h2 class="text-xl font-bold text-yellow-400 mb-6">Code Promo</h2>
      <div class="flex gap-4">
        <input type="text" v-model="promoCode" placeholder="Entrez votre code"
               class="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400" />
        <button @click="applyPromoCode"
                class="bg-yellow-400 text-black font-medium px-6 py-2 rounded-lg hover:bg-yellow-500">
          Appliquer
        </button>
      </div>
    </div>
  </div>

  <!-- Add Card Modal -->
  <div v-if="showAddCard"
       class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="bg-zinc-900 rounded-2xl p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-yellow-400">Ajouter une carte</h3>
        <button @click="showAddCard = false" class="text-zinc-400 hover:text-white">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-zinc-400 mb-1">
            Numéro de carte
          </label>
          <input type="text" v-model="newCard.number"
                 class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-zinc-400 mb-1">
              Date d'expiration
            </label>
            <input type="text" v-model="newCard.expiry" placeholder="MM/YY"
                   class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400" />
          </div>
          <div>
            <label class="block text-sm font-medium text-zinc-400 mb-1">
              CVC
            </label>
            <input type="text" v-model="newCard.cvc"
                   class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400" />
          </div>
        </div>
        <button @click="saveCard"
                class="w-full bg-yellow-400 text-black font-medium px-4 py-2 rounded-lg hover:bg-yellow-500">
          Ajouter la carte
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'dashboard'
})

const showAddCard = ref(false)
const promoCode = ref('')

const activeSubscriptions = [
  {
    id: 1,
    name: 'AKAD Premium',
    status: 'Actif',
    price: '29.99€/mois',
    nextPayment: '15/07/2025'
  }
]

const paymentMethods = [
  {
    id: 1,
    icon: '💳',
    type: 'Visa',
    last4: '4242',
    expiry: '12/25'
  },
  {
    id: 2,
    icon: '💳',
    type: 'Mastercard',
    last4: '8888',
    expiry: '09/26'
  }
]

const billingHistory = [
  {
    id: 1,
    date: '01/06/2025',
    description: 'AKAD Premium - Juin 2025',
    amount: '29.99€',
    status: 'Payé'
  },
  {
    id: 2,
    date: '01/05/2025',
    description: 'AKAD Premium - Mai 2025',
    amount: '29.99€',
    status: 'Payé'
  }
]

const billingDetails = ref({
  company: '',
  vatNumber: '',
  address: ''
})

const newCard = ref({
  number: '',
  expiry: '',
  cvc: ''
})

function removeCard(id) {
  // TODO: Implement card removal
  console.log('Remove card:', id)
}

function downloadInvoice(id) {
  // TODO: Implement invoice download
  console.log('Download invoice:', id)
}

function updateBillingDetails() {
  // TODO: Implement billing details update
  console.log('Update billing details:', billingDetails.value)
}

function applyPromoCode() {
  // TODO: Implement promo code application
  console.log('Apply promo code:', promoCode.value)
}

function saveCard() {
  // TODO: Implement card saving
  console.log('Save card:', newCard.value)
  showAddCard.value = false
}
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>