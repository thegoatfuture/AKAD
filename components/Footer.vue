<template>
  <footer class="bg-zinc-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
      <!-- Colonne Logo & Contact -->
      <div class="space-y-4">
        <img src="/images/logo-pf-nofond.svg" alt="Logo" class="h-20 mb-4" />
        <div>
          <p>Quadrio offices</p>
          <p>Adresse fictive, France</p>
        </div>
        <div class="text-sm space-y-1">
          <p>support@akadfirm.com</p>
          <p>+33 6 12 34 56 78</p>
          <p>WhatsApp</p>
        </div>
      </div>

      <!-- Colonne Entreprise -->
      <div>
        <h4 class="text-sm font-bold uppercase mb-3 text-white/70">
          Entreprise
        </h4>
        <ul class="space-y-2 text-sm text-gray-300">
          <li><a href="#">À propos de nous</a></li>
          <li><a href="#">Contactez-nous</a></li>
          <li><a href="#">Carrières</a></li>
          <li><a href="#">Press Kit</a></li>
          <li><a href="#">Comment fonctionne AKAD</a></li>
        </ul>
      </div>

      <!-- Colonne Plus -->
      <div>
        <h4 class="text-sm font-bold uppercase mb-3 text-white/70">Plus</h4>
        <ul class="space-y-2 text-sm text-gray-300">
          <li><a href="#">Programme d’affiliation</a></li>
          <li><a href="#">Shop</a></li>
        </ul>
      </div>

      <!-- Colonne Sociétés (socials/icons) -->
      <div>
        <h4 class="text-sm font-bold uppercase mb-3 text-white/70">Sociétés</h4>
        <div class="flex flex-wrap gap-2">
          <button class="bg-white text-black rounded-lg p-2">FB</button>
          <button class="bg-white text-pink-500 rounded-lg p-2">IG</button>
          <button class="bg-white text-red-500 rounded-lg p-2">YT</button>
          <button class="bg-white text-blue-500 rounded-lg p-2">TW</button>
        </div>
      </div>
    </div>

    <!-- App Download & Newsletter -->
    <div
      class="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
    >
      <div>
        <h4 class="text-sm font-bold uppercase mb-3">Téléchargez notre app</h4>
        <div class="flex gap-4">
          <img src="/images/appstore.svg" alt="App Store" class="h-20" />
          <img src="/images/googleplay.svg" alt="Google Play" class="h-20" />
        </div>
      </div>
      <div>
        <h4 class="text-sm font-bold uppercase mb-3">Newsletter</h4>
        <div class="flex items-center gap-2">
          <input
            type="email"
            placeholder="E-mail"
            class="px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-sm w-full"
          />
          <button class="bg-yellow-400 text-black px-4 py-2 rounded text-sm">
            S'abonner
          </button>
        </div>
      </div>
    </div>

    <!-- Paiements -->
    <div class="max-w-7xl mx-auto px-6 mt-12 border-t border-zinc-700 pt-6">
      <h4 class="text-sm font-bold uppercase text-center mb-6">
        Options de paiement
      </h4>
      <div class="flex flex-wrap justify-center items-center gap-6">
        <img
          src="/images/bank-transfert.svg"
          alt="Bank Transfer"
          class="h-8 w-auto"
        />
        <img src="/images/skrill.svg" alt="Skrill" class="h-8 w-auto" />
        <img src="/images/mastercard.svg" alt="Mastercard" class="h-8 w-auto" />
        <img src="/images/visa.svg" alt="Visa" class="h-8 w-auto" />
        <img src="/images/discovers.svg" alt="Discover" class="h-8 w-auto" />
        <img src="/images/paypal.svg" alt="Paypal" class="h-8 w-auto" />
      </div>
    </div>

    <!-- Bas de page -->
    <div
      class="text-xs text-center text-gray-400 mt-8 border-t border-zinc-800 pt-4 px-4"
    >
      <p>
        Veuillez noter que tous les comptes fournis sont démo avec des fonds
        fictifs et que tout trade s'effectue dans un environnement simulé. Voir
        notre <a href="#" class="underline">FAQ</a>.
      </p>
    </div>
  </footer>
</template>

<script setup>
// Aucun script pour l'instant
</script>

<style scoped>
/* Icônes et images de paiement doivent être dans public/images */
</style>
