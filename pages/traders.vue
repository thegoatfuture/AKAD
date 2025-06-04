<script setup>
definePageMeta({
  layout: 'dashboard'
})

const traders = [
  { name: 'Emma D.', status: 'Actif', capital: '$200,000', profit: '$20,824.00', performance: '+10.4%', updated: '01/06/2025' },
  { name: 'Léa B.', status: 'Inactif', capital: '$200,000', profit: '$19,440.16', performance: '+9.7%', updated: '01/06/2025' },
  { name: 'Emma S.', status: 'Actif', capital: '$100,000', profit: '$14,737.24', performance: '+14.7%', updated: '01/06/2025' },
  { name: 'Emma N.', status: 'Inactif', capital: '$100,000', profit: '$13,040.14', performance: '+13.0%', updated: '01/06/2025' },
  { name: 'Emma L.', status: 'Inactif', capital: '$100,000', profit: '$10,545.28', performance: '+10.5%', updated: '01/06/2025' },
  { name: 'Lucas N.', status: 'Inactif', capital: '$200,000', profit: '$10,026.68', performance: '+5.0%', updated: '01/06/2025' },
  { name: 'Nathan G.', status: 'Actif', capital: '$50,000', profit: '$8,948.25', performance: '+17.9%', updated: '01/06/2025' },
  { name: 'Noah G.', status: 'Inactif', capital: '$200,000', profit: '$8,120.39', performance: '+4.1%', updated: '01/06/2025' },
  { name: 'Lucas O.', status: 'Actif', capital: '$100,000', profit: '$7,814.59', performance: '+7.8%', updated: '01/06/2025' },
  { name: 'Lucas K.', status: 'Inactif', capital: '$200,000', profit: '$7,444.06', performance: '+3.7%', updated: '01/06/2025' },
  { name: 'Léa G.', status: 'Inactif', capital: '$100,000', profit: '$6,806.83', performance: '+6.8%', updated: '01/06/2025' },
  { name: 'Léa K.', status: 'Actif', capital: '$100,000', profit: '$6,553.12', performance: '+6.5%', updated: '01/06/2025' },
  { name: 'Lucas I.', status: 'Inactif', capital: '$25,000', profit: '$6,298.62', performance: '+25.2%', updated: '01/06/2025' },
  { name: 'Noah S.', status: 'Actif', capital: '$50,000', profit: '$6,227.42', performance: '+12.5%', updated: '01/06/2025' },
  { name: 'Nathan M.', status: 'Actif', capital: '$50,000', profit: '$5,533.42', performance: '+11.1%', updated: '01/06/2025' },
  { name: 'Noah C.', status: 'Actif', capital: '$50,000', profit: '$4,591.38', performance: '+9.2%', updated: '01/06/2025' },
  { name: 'Lucas Q.', status: 'Actif', capital: '$25,000', profit: '$4,511.39', performance: '+18.0%', updated: '01/06/2025' },
  { name: 'Noah K.', status: 'Inactif', capital: '$25,000', profit: '$4,091.15', performance: '+16.4%', updated: '01/06/2025' },
  { name: 'Emma Q.', status: 'Actif', capital: '$50,000', profit: '$3,902.28', performance: '+7.8%', updated: '01/06/2025' },
  { name: 'Nathan T.', status: 'Actif', capital: '$25,000', profit: '$3,877.91', performance: '+15.5%', updated: '01/06/2025' },
  { name: 'Lucas E.', status: 'Inactif', capital: '$25,000', profit: '$3,470.59', performance: '+13.9%', updated: '01/06/2025' },
  { name: 'Emma P.', status: 'Actif', capital: '$25,000', profit: '$3,188.85', performance: '+12.8%', updated: '01/06/2025' },
  { name: 'Lucas D.', status: 'Actif', capital: '$50,000', profit: '$2,621.63', performance: '+5.2%', updated: '01/06/2025' },
  { name: 'Nathan D.', status: 'Inactif', capital: '$25,000', profit: '$2,246.70', performance: '+9.0%', updated: '01/06/2025' },
  { name: 'Lucas P.', status: 'Inactif', capital: '$50,000', profit: '$2,186.90', performance: '+4.3%', updated: '01/06/2025' },
  { name: 'Lucas M.', status: 'Inactif', capital: '$25,000', profit: '$1,992.49', performance: '+8.0%', updated: '01/06/2025' },
  { name: 'Emma I.', status: 'Actif', capital: '$10,000', profit: '$1,888.11', performance: '+18.9%', updated: '01/06/2025' },
  { name: 'Lucas R.', status: 'Actif', capital: '$25,000', profit: '$1,734.09', performance: '+6.9%', updated: '01/06/2025' },
  { name: 'Emma M.', status: 'Inactif', capital: '$10,000', profit: '$1,663.97', performance: '+16.6%', updated: '01/06/2025' },
  { name: 'Nathan G.', status: 'Actif', capital: '$25,000', profit: '$1,263.48', performance: '+5.1%', updated: '01/06/2025' },
  { name: 'Emma O.', status: 'Inactif', capital: '$25,000', profit: '$1,014.66', performance: '+4.1%', updated: '01/06/2025' },
]
</script>

<template>
  <div class="bg-zinc-950 text-white p-6 rounded-2xl">
    <h2 class="text-3xl font-bold mb-8 text-yellow-400">Top Traders de la Semaine</h2>

    <div class="overflow-x-auto">
      <table class="min-w-full table-auto text-sm text-left">
        <thead class="bg-zinc-900 text-gray-400 border-b border-zinc-800">
          <tr>
            <th class="px-6 py-3">#</th>
            <th class="px-6 py-3">Trader</th>
            <th class="px-6 py-3">Statut</th>
            <th class="px-6 py-3">Capital</th>
            <th class="px-6 py-3">Profit</th>
            <th class="px-6 py-3">Performance</th>
            <th class="px-6 py-3">Mise à jour</th>
            <th class="px-6 py-3">Récompense</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(trader, index) in traders" :key="index" class="border-b border-zinc-800 hover:bg-zinc-900 transition">
            <td class="px-6 py-4 font-bold">
              <span v-if="index === 0" class="text-yellow-400">1</span>
              <span v-else-if="index === 1" class="text-gray-300">2</span>
              <span v-else-if="index === 2" class="text-amber-600">3</span>
              <span v-else>{{ index + 1 }}</span>
            </td>
            <td class="px-6 py-4 font-medium">{{ trader.name }}</td>
            <td class="px-6 py-4">
              <span :class="trader.status === 'Actif' ? 'text-green-400' : 'text-gray-400'">
                {{ trader.status }}
              </span>
            </td>
            <td class="px-6 py-4">{{ trader.capital }}</td>
            <td class="px-6 py-4">{{ trader.profit }}</td>
            <td class="px-6 py-4 text-yellow-400">{{ trader.performance }}</td>
            <td class="px-6 py-4 text-gray-400">{{ trader.updated }}</td>
            <td class="px-6 py-4">
              <span v-if="index === 0" class="bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                Compte 10 000 € offert
              </span>
              <span v-else class="text-xs text-gray-500">-</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
