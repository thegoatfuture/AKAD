<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'dashboard'
})

const activeTab = ref('akad')
const modalContent = ref(null)
const showModal = ref(false)

function openModal(contentType) {
  modalContent.value = contentType
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  modalContent.value = null
}
</script>

<template>
  <div class="flex min-h-screen bg-zinc-950 text-white">
    <main class="flex-1 p-6 overflow-y-auto space-y-6">

      <!-- Compte Actif Section -->
      <div class="bg-zinc-900 rounded-xl p-6 shadow">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-lg font-semibold text-yellow-400">
              AKAD Challenge : <span class="text-white font-bold">510163222</span>
            </h2>
            <p class="text-sm text-gray-400">Solde : <span class="text-white font-semibold">€160,000.00</span></p>
          </div>
          <NuxtLink to="/challenge/start" class="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-semibold">
            Commencer un challenge
          </NuxtLink>
        </div>

        <div class="bg-zinc-800 p-4 rounded-lg">
          <h3 class="text-white font-medium mb-2">Comptes actifs</h3>
          <div class="flex justify-between items-center mb-2">
            <div class="flex gap-2 items-center">
              <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">En cours</span>
              <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Vérification</span>
              <span class="text-sm font-medium text-gray-200">Login : <span class="text-white font-semibold">430227405</span></span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">Visible</span>
              <input type="checkbox" class="accent-yellow-500" checked />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div class="bg-red-100 text-red-700 p-4 rounded">
              <h4 class="text-sm font-semibold">Profits de ce jour</h4>
              <p class="text-lg font-bold">€-12,572.28</p>
            </div>
            <div class="bg-red-100 text-gray-900 p-4 rounded">
              <h4 class="text-sm font-semibold">Equity</h4>
              <p class="text-lg font-bold">€79,649.35</p>
            </div>
            <div class="bg-red-100 text-red-700 p-4 rounded">
              <h4 class="text-sm font-semibold">PnL non réalisé</h4>
              <p class="text-lg font-bold">€-12,572.28</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Historique Tabs Section -->
      <div class="bg-zinc-900 rounded-xl p-6 shadow">
        <div class="border-b border-zinc-700 mb-4 flex gap-6 text-sm font-semibold">
          <button @click="activeTab = 'akad'" :class="activeTab === 'akad' ? 'text-yellow-400 border-b-2 border-yellow-400 pb-2' : 'text-gray-400 pb-2 hover:text-white'">AKAD Account</button>
          <button @click="activeTab = 'verification'" :class="activeTab === 'verification' ? 'text-yellow-400 border-b-2 border-yellow-400 pb-2' : 'text-gray-400 pb-2 hover:text-white'">Vérification</button>
          <button @click="activeTab = 'challenge'" :class="activeTab === 'challenge' ? 'text-yellow-400 border-b-2 border-yellow-400 pb-2' : 'text-gray-400 pb-2 hover:text-white'">AKAD Challenge</button>
        </div>

        <div v-show="activeTab === 'akad'" class="bg-zinc-800 p-4 rounded-lg">
          <div class="flex justify-between items-center">
            <div>
              <span class="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">Validé</span>
              <p class="text-sm text-white mt-1">Login : <strong>520265159</strong></p>
              <p class="text-xs text-gray-300">Solde: $210,087.05 — Fin: 9/5/2025 — Résultat: <span class="text-blue-400 font-semibold">Validé</span></p>
            </div>
            <div class="flex gap-2 items-center">
              <button @click="openModal('identifiants')" class="bg-zinc-700 text-white text-xs px-3 py-1 rounded">Identifiants</button>
              <button @click="openModal('metrix')" class="bg-zinc-700 text-white text-xs px-3 py-1 rounded">MetriX</button>
              <button @click="openModal('live-metrix')" class="bg-zinc-700 text-white text-xs px-3 py-1 rounded">Live MetriX</button>
              <button @click="openModal('analyse')" class="bg-zinc-700 text-white text-xs px-3 py-1 rounded">Analyse</button>
              <button @click="openModal('detail')" class="bg-yellow-400 text-black text-xs px-3 py-1 rounded">Détail</button>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'verification'" class="bg-zinc-800 p-4 rounded-lg">
          <p class="text-white">Détails de la vérification à afficher ici...</p>
        </div>

        <div v-show="activeTab === 'challenge'" class="bg-zinc-800 p-4 rounded-lg">
          <p class="text-white">Détails du challenge à afficher ici...</p>
        </div>
      </div>

      <!-- MODAL -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-zinc-800 p-6 rounded-xl shadow-xl w-full max-w-md relative">
          <button @click="closeModal" class="absolute top-3 right-3 text-white hover:text-red-400">&times;</button>
          <h3 class="text-xl font-bold text-yellow-400 mb-4">{{ modalContent }}</h3>
          <p class="text-sm text-gray-300">Contenu de {{ modalContent }} à détailler ici...</p>
        </div>
      </div>

      <!-- Free Trial & Challenge Section -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-zinc-800 p-6 rounded-xl shadow flex flex-col justify-between">
          <div>
            <h3 class="text-lg font-bold text-yellow-400 mb-2">Free Trial</h3>
            <p class="text-sm text-gray-400 mb-4">Maîtrisez vos compétences en vous entraînant sans risque.</p>
            <ul class="text-sm text-gray-300 list-disc list-inside space-y-1 mb-4">
              <li>Pas d’éligibilité pour le FTMO Account</li>
              <li>14 jours</li>
              <li>Analyse de Compte basique</li>
              <li>Apps limitées</li>
            </ul>
          </div>
          <NuxtLink to="/trial/start" class="bg-yellow-400 text-black px-4 py-2 rounded font-semibold w-full text-center block">
            Commencer votre Free Trial
          </NuxtLink>
        </div>

        <div class="bg-zinc-800 p-6 rounded-xl shadow flex flex-col justify-between">
          <div>
            <h3 class="text-lg font-bold text-yellow-400 mb-2">FTMO Challenge</h3>
            <p class="text-sm text-gray-400 mb-4">Tradez jusqu’à $200,000 sur un FTMO Account.</p>
            <ul class="text-sm text-gray-300 list-disc list-inside space-y-1 mb-4">
              <li>Jusqu’à $200,000 de capital</li>
              <li>Analyse complète</li>
              <li>Apps Premium</li>
            </ul>
          </div>
          <NuxtLink to="/challenge/start" class="bg-yellow-400 text-black px-4 py-2 rounded font-semibold w-full text-center block">
            Commencer le Challenge
          </NuxtLink>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
main::-webkit-scrollbar {
  width: 6px;
}
main::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}
</style>