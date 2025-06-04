<template>
  <div class="bg-black text-white min-h-screen">
    <Header />

    <section class="max-w-4xl mx-auto px-4 py-20">
      <h1 class="text-4xl font-bold text-yellow-400 mb-10">Mentions Légales</h1>

      <div class="space-y-8 text-gray-300 text-sm leading-relaxed">
        <div>
          <h2 class="text-xl font-semibold text-white mb-2">Éditeur du site</h2>
          <p>
            Le site AKAD est édité par : <br />
            <strong>AKAD Prop Firm</strong><br />
            Statut : Auto-entrepreneur (ou SASU selon évolution)<br />
            Numéro SIRET : À définir<br />
            Siège social : Paris, France<br />
            Responsable de la publication : [Ton nom]
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold text-white mb-2">Contact</h2>
          <p>
            Email : support@akad-trading.com<br />
            Discord privé : accessible après achat
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold text-white mb-2">Hébergement</h2>
          <p>
            Hébergeur : <br />
            Vercel Inc.<br />
            440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
            Site web : <a href="https://vercel.com" class="text-yellow-400 underline" target="_blank">vercel.com</a>
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold text-white mb-2">Conditions d’utilisation</h2>
          <p>
            L’utilisateur reconnaît avoir pris connaissance des présentes mentions légales et s’engage à les respecter.
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