<template>
  <div class="bg-black text-white min-h-screen">
    <Header />

    <section class="max-w-4xl mx-auto px-4 py-20">
      <h1 class="text-4xl font-bold text-yellow-400 mb-10">
        Conditions Générales d'Utilisation
      </h1>

      <div class="space-y-8 text-gray-300 text-sm leading-relaxed">
        <div>
          <h2 class="text-xl text-white font-semibold mb-2">1. Objet</h2>
          <p>
            Les présentes conditions ont pour objet de définir les modalités
            d’accès et d’utilisation du site AKAD et des services proposés.
          </p>
        </div>

        <div>
          <h2 class="text-xl text-white font-semibold mb-2">
            2. Acceptation des CGU
          </h2>
          <p>
            L’utilisation du site implique l’acceptation pleine et entière des
            présentes CGU.
          </p>
        </div>

        <div>
          <h2 class="text-xl text-white font-semibold mb-2">
            3. Accès au service
          </h2>
          <p>
            Le site est accessible gratuitement 24h/24, 7j/7, sauf interruption
            programmée ou non pour maintenance.
          </p>
        </div>

        <div>
          <h2 class="text-xl text-white font-semibold mb-2">
            4. Responsabilité
          </h2>
          <p>
            AKAD ne saurait être tenu responsable en cas de dommages directs ou
            indirects causés par l’utilisation du site.
          </p>
        </div>

        <div>
          <h2 class="text-xl text-white font-semibold mb-2">
            5. Propriété intellectuelle
          </h2>
          <p>
            Tous les éléments du site (textes, images, logos, etc.) sont la
            propriété exclusive d’AKAD ou de ses partenaires.
          </p>
        </div>

        <div>
          <h2 class="text-xl text-white font-semibold mb-2">
            6. Modification des CGU
          </h2>
          <p>
            AKAD se réserve le droit de modifier à tout moment les présentes
            conditions. Les utilisateurs sont invités à les consulter
            régulièrement.
          </p>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Conditions d'utilisation - AKAD",
  description: "Modalités d'accès et d'utilisation du site AKAD."
})
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>
