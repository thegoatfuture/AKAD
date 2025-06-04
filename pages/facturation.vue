<script setup>
definePageMeta({
  layout: 'dashboard'
})

const factures = [
  {
    id: '#F-20250401',
    date: '01/04/2025',
    description: 'Compte 10 000€ - Offre promotionnelle',
    montant: 79,
    statut: 'Payée'
  },
  {
    id: '#F-20250415',
    date: '15/04/2025',
    description: 'Compte 25 000€',
    montant: 199,
    statut: 'Payée'
  },
  {
    id: '#F-20250501',
    date: '01/05/2025',
    description: 'Compte 100 000€',
    montant: 399,
    statut: 'En attente'
  }
]
</script>

<template>
  <div class="p-6 bg-zinc-900 rounded-2xl shadow-lg text-white">
    <h2 class="text-xl font-bold mb-4 text-yellow-400">Historique de facturation</h2>

    <div class="overflow-x-auto rounded-lg border border-zinc-700">
      <table class="min-w-full divide-y divide-zinc-700">
        <thead class="bg-zinc-800 text-yellow-300 text-sm">
          <tr>
            <th class="px-6 py-3 text-left font-semibold">ID</th>
            <th class="px-6 py-3 text-left font-semibold">Date</th>
            <th class="px-6 py-3 text-left font-semibold">Description</th>
            <th class="px-6 py-3 text-left font-semibold">Montant</th>
            <th class="px-6 py-3 text-left font-semibold">Statut</th>
            <th class="px-6 py-3 text-right font-semibold">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-800 text-sm">
          <tr v-for="(facture, index) in factures" :key="index" class="hover:bg-zinc-800">
            <td class="px-6 py-4">{{ facture.id }}</td>
            <td class="px-6 py-4">{{ facture.date }}</td>
            <td class="px-6 py-4">{{ facture.description }}</td>
            <td class="px-6 py-4 font-semibold">{{ facture.montant }} €</td>
            <td class="px-6 py-4">
              <span
                :class="{
                  'text-green-400': facture.statut === 'Payée',
                  'text-yellow-400': facture.statut === 'En attente',
                  'text-red-400': facture.statut === 'Refusée'
                }"
              >
                {{ facture.statut }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-yellow-400 hover:underline hover:text-yellow-300">
                Télécharger
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
