<script setup>
definePageMeta({
  layout: 'dashboard'
})

const leaderboard = [
  { name: 'Nicolas F.', profit: 18250, drawdown: 3.2, days: 17 },
  { name: 'Sarah T.', profit: 15300, drawdown: 2.7, days: 15 },
  { name: 'Imane R.', profit: 12100, drawdown: 1.9, days: 10 },
  { name: 'Léo D.', profit: 10800, drawdown: 4.1, days: 12 },
  { name: 'Jules K.', profit: 9750, drawdown: 3.5, days: 9 }
]
</script>

<template>
  <div class="p-6 bg-zinc-900 rounded-2xl shadow-lg text-white">
    <h2 class="text-xl font-bold text-yellow-400 mb-6">Classement des Traders</h2>

    <div class="overflow-x-auto rounded-lg border border-zinc-700">
      <table class="min-w-full divide-y divide-zinc-700 text-sm">
        <thead class="bg-zinc-800 text-yellow-300">
          <tr>
            <th class="px-6 py-3 text-left font-semibold">Position</th>
            <th class="px-6 py-3 text-left font-semibold">Nom</th>
            <th class="px-6 py-3 text-left font-semibold">Profit</th>
            <th class="px-6 py-3 text-left font-semibold">Drawdown</th>
            <th class="px-6 py-3 text-left font-semibold">Jours actifs</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-800">
          <tr
            v-for="(trader, index) in leaderboard"
            :key="index"
            class="hover:bg-zinc-800"
          >
            <td class="px-6 py-4 font-semibold text-yellow-400">#{{ index + 1 }}</td>
            <td class="px-6 py-4 flex items-center gap-3">
              <div class="bg-yellow-500 text-black font-bold rounded-full h-8 w-8 flex items-center justify-center">
                {{ trader.name.charAt(0) }}
              </div>
              {{ trader.name }}
            </td>
            <td class="px-6 py-4 text-green-400 font-semibold">+{{ trader.profit }} €</td>
            <td class="px-6 py-4 text-red-400">{{ trader.drawdown }}%</td>
            <td class="px-6 py-4">{{ trader.days }} jours</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>