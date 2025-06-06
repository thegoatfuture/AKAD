```vue
<template>
  <div class="min-h-screen bg-zinc-950 text-white">
    <main class="p-6 max-w-6xl mx-auto space-y-8">
      <!-- Page Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-yellow-400">Facturation</h1>
        <button @click="showUpdateBilling = true" 
                class="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
          Mettre à jour les informations
        </button>
      </div>

      <!-- Active Subscriptions -->
      <div class="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h2 class="text-lg font-semibold mb-4">Abonnements Actifs</h2>
        <div class="space-y-4">
          <div v-for="sub in activeSubscriptions" :key="sub.id"
               class="flex justify-between items-center p-4 bg-zinc-800 rounded-lg">
            <div>
              <div class="font-medium">{{ sub.name }}</div>
              <div class="text-sm text-zinc-400">Prochain paiement le {{ sub.nextBilling }}</div>
            </div>
            <div class="text-right">
              <div class="font-bold text-yellow-400">{{ sub.amount }}</div>
              <button class="text-sm text-red-400 hover:text-red-300">Annuler</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Moyens de paiement</h2>
          <button @click="showAddCard = true" 
                  class="text-yellow-400 hover:text-yellow-300">
            + Ajouter une carte
          </button>
        </div>
        <div class="space-y-4">
          <div v-for="card in paymentMethods" :key="card.id"
               class="flex justify-between items-center p-4 bg-zinc-800 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="text-2xl">{{ card.icon }}</div>
              <div>
                <div class="font-medium">•••• •••• •••• {{ card.last4 }}</div>
                <div class="text-sm text-zinc-400">Expire {{ card.expiry }}</div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div v-if="card.default" class="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded">
                Par défaut
              </div>
              <button class="text-red-400 hover:text-red-300">Supprimer</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Billing History -->
      <div class="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h2 class="text-lg font-semibold mb-4">Historique de facturation</h2>
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
                  class="text-sm">
                <td class="py-3 px-4">{{ invoice.date }}</td>
                <td class="py-3 px-4">{{ invoice.description }}</td>
                <td class="py-3 px-4">{{ invoice.amount }}</td>
                <td class="py-3 px-4">
                  <span :class="[
                    'px-2 py-1 rounded text-xs',
                    invoice.status === 'Payé' ? 'bg-green-400/20 text-green-400' :
                    invoice.status === 'En attente' ? 'bg-yellow-400/20 text-yellow-400' :
                    'bg-red-400/20 text-red-400'
                  ]">
                    {{ invoice.status }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right">
                  <button class="text-yellow-400 hover:text-yellow-300">
                    Télécharger
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Promo Code Section -->
      <div class="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h2 class="text-lg font-semibold mb-4">Code promo</h2>
        <div class="flex gap-4">
          <input type="text" v-model="promoCode"
                 placeholder="Entrez votre code"
                 class="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400" />
          <button class="bg-yellow-400 text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
            Appliquer
          </button>
        </div>
      </div>

      <!-- VAT/Tax Section -->
      <div class="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h2 class="text-lg font-semibold mb-4">Informations fiscales</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-zinc-400 mb-1">Numéro de TVA</label>
            <input type="text" v-model="vatNumber"
                   placeholder="FR 12345678900"
                   class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400" />
          </div>
          <div>
            <label class="block text-sm text-zinc-400 mb-1">Pays de facturation</label>
            <select v-model="billingCountry"
                    class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400">
              <option value="FR">France</option>
              <option value="BE">Belgique</option>
              <option value="CH">Suisse</option>
            </select>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h2 class="text-lg font-semibold mb-4">Questions fréquentes</h2>
        <div class="space-y-4 text-sm">
          <div>
            <h3 class="font-medium text-yellow-400 mb-1">Quand suis-je facturé ?</h3>
            <p class="text-zinc-400">Les factures sont émises le 1er de chaque mois pour les abonnements actifs.</p>
          </div>
          <div>
            <h3 class="font-medium text-yellow-400 mb-1">Comment obtenir un remboursement ?</h3>
            <p class="text-zinc-400">Les remboursements sont possibles dans les 14 jours suivant l'achat si le service n'a pas été utilisé.</p>
          </div>
          <div>
            <h3 class="font-medium text-yellow-400 mb-1">Quels moyens de paiement acceptez-vous ?</h3>
            <p class="text-zinc-400">Nous acceptons les cartes Visa, Mastercard, ainsi que PayPal et les virements bancaires.</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Card Modal -->
    <div v-if="showAddCard" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
         @click.self="showAddCard = false">
      <div class="bg-zinc-900 rounded-xl p-6 w-full max-w-md">
        <h3 class="text-xl font-bold mb-6">Ajouter une carte</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-zinc-400 mb-1">Numéro de carte</label>
            <input type="text" placeholder="4242 4242 4242 4242"
                   class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-zinc-400 mb-1">Date d'expiration</label>
              <input type="text" placeholder="MM/YY"
                     class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400" />
            </div>
            <div>
              <label class="block text-sm text-zinc-400 mb-1">CVC</label>
              <input type="text" placeholder="123"
                     class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400" />
            </div>
          </div>
          <button class="w-full bg-yellow-400 text-black py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
            Ajouter la carte
          </button>
        </div>
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
const showUpdateBilling = ref(false)
const promoCode = ref('')
const vatNumber = ref('')
const billingCountry = ref('FR')

const activeSubscriptions = [
  {
    id: 1,
    name: 'AKAD Premium',
    amount: '29,99 €/mois',
    nextBilling: '01/07/2025'
  },
  {
    id: 2,
    name: 'Challenge AKAD 100k',
    amount: '399 €',
    nextBilling: '15/07/2025'
  }
]

const paymentMethods = [
  {
    id: 1,
    icon: '💳',
    type: 'visa',
    last4: '4242',
    expiry: '12/25',
    default: true
  },
  {
    id: 2,
    icon: '💳',
    type: 'mastercard',
    last4: '8888',
    expiry: '09/24',
    default: false
  }
]

const billingHistory = [
  {
    id: 1,
    date: '01/06/2025',
    description: 'AKAD Premium - Juin 2025',
    amount: '29,99 €',
    status: 'Payé'
  },
  {
    id: 2,
    date: '15/05/2025',
    description: 'Challenge AKAD 100k',
    amount: '399 €',
    status: 'Payé'
  },
  {
    id: 3,
    date: '01/05/2025',
    description: 'AKAD Premium - Mai 2025',
    amount: '29,99 €',
    status: 'Payé'
  }
]
</script>
```