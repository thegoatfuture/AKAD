<template>
  <div class="bg-black text-white min-h-screen">
    <Header />

    <section class="max-w-4xl mx-auto px-4 py-20">
      <h1 class="text-4xl font-bold text-yellow-400 mb-10">
        Politique de Confidentialité (RGPD)
      </h1>

      <div class="space-y-8 text-gray-300 text-sm leading-relaxed">
        <div>
          <h2 class="text-xl font-semibold text-white mb-2">
            1. Données collectées
          </h2>
          <p>
            AKAD collecte uniquement les données nécessaires au fonctionnement
            du service : nom, email et message via le formulaire de contact.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold text-white mb-2">2. Finalité</h2>
          <p>
            Les données sont utilisées uniquement pour répondre aux demandes ou
            fournir l’accès au dashboard. Elles ne sont jamais vendues.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold text-white mb-2">3. Conservation</h2>
          <p>
            Les données sont conservées uniquement le temps nécessaire au
            traitement des demandes. Aucune donnée bancaire n’est stockée.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold text-white mb-2">
            4. Droit d’accès et de suppression
          </h2>
          <p>
            Conformément au RGPD, vous pouvez demander à consulter, modifier ou
            supprimer vos données à tout moment à l’adresse suivante :
            <strong>support@akad-trading.com</strong>
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold text-white mb-2">5. Cookies</h2>
          <p>
            Ce site n’utilise pas de cookies tiers à des fins publicitaires.
            Uniquement ceux nécessaires à son fonctionnement.
          </p>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>
