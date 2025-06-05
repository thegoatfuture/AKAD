<template>
  <section class="bg-zinc-900 py-16 px-4 text-white">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-yellow-400 text-center mb-12">
        Inspirations du Marché
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-zinc-800 rounded-xl p-6 text-center">
          <CandlestickChart class="w-8 h-8 text-yellow-400 mx-auto mb-4" />
          <h3 class="text-xl font-semibold mb-2">EUR/USD</h3>
          <p class="text-sm text-gray-300">
            Tendance haussière à moyen terme. Suivez les annonces de la BCE pour
            saisir les meilleures opportunités.
          </p>
        </div>
        <div class="bg-zinc-800 rounded-xl p-6 text-center">
          <Bitcoin class="w-8 h-8 text-yellow-400 mx-auto mb-4" />
          <h3 class="text-xl font-semibold mb-2">Bitcoin</h3>
          <p class="text-sm text-gray-300">
            La cryptomonnaie phénomène continue d’attirer les investisseurs et
            offre une forte volatilité.
          </p>
        </div>
        <div class="bg-zinc-800 rounded-xl p-6 text-center">
          <TrendingUp class="w-8 h-8 text-yellow-400 mx-auto mb-4" />
          <h3 class="text-xl font-semibold mb-2">Nasdaq 100</h3>
          <p class="text-sm text-gray-300">
            Les valeurs technologiques dynamisent l’indice américain, créant des
            opportunités régulières pour les traders actifs.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CandlestickChart, Bitcoin, TrendingUp } from 'lucide-vue-next'
</script>
