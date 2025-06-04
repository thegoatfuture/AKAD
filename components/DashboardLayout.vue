<!-- components/DashboardLayout.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-black text-yellow-400 flex-shrink-0">
      <div class="text-2xl font-bold p-6">AKAD Dashboard</div>
      <nav class="flex flex-col gap-2 px-4">
        <button class="text-left py-2 hover:text-white">🏠 Aperçu des comptes</button>
        <button class="text-left py-2 hover:text-white">📈 Challenge</button>
        <button class="text-left py-2 hover:text-white">🧠 Academy</button>
        <button class="text-left py-2 hover:text-white">💼 Facturation</button>
        <button class="text-left py-2 hover:text-white">🏆 Leaderboard</button>
        <button class="text-left py-2 hover:text-white">📜 Certificats</button>
        <button class="text-left py-2 hover:text-white">⬇️ Téléchargements</button>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-6 overflow-y-auto bg-white text-gray-800">
      <h1 class="text-2xl font-bold mb-6">Aperçu des comptes</h1>

      <div class="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow">
        <p class="text-gray-900 font-semibold">Challenge AKAD #123456</p>
        <p class="text-gray-700">Solde : <strong>€100,000.00</strong></p>
        <button class="mt-2 px-4 py-2 bg-yellow-400 text-black rounded font-semibold hover:bg-yellow-500">
          Commencer le Challenge
        </button>
      </div>

      <div class="mt-8">
        <h2 class="text-lg font-bold mb-4">Comptes actifs</h2>
        <div class="bg-gray-100 p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p class="text-sm text-gray-600">Solde</p>
            <p class="text-lg font-semibold text-red-600">-€12,572.28</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Equity</p>
            <p class="text-lg font-semibold">€79,649.35</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">PnL non réalisé</p>
            <p class="text-lg font-semibold text-red-600">-€12,572.28</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>