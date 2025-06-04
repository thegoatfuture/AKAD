<script setup>
definePageMeta({ layout: 'dashboard' })

const certificates = [
  {
    title: 'Challenge Réussi - 10k€',
    description:
      'Certificat prouvant la réussite du Challenge AKAD sur un compte 10,000€',
    date: '14 avril 2025',
    pdfUrl: '/certificates/challenge-10k.pdf',
    status: 'valid',
  },
  {
    title: 'Vérification Complétée',
    description: 'Vous avez passé la phase de vérification avec succès.',
    date: '28 avril 2025',
    pdfUrl: '/certificates/verification.pdf',
    status: 'valid',
  },
  {
    title: 'Trader AKAD Officiel',
    description: 'Certificat d’adhésion au programme AKAD Trader.',
    date: '3 mai 2025',
    pdfUrl: '/certificates/official-trader.pdf',
    status: 'locked',
  },
]
</script>

<template>
  <div class="flex flex-col min-h-screen bg-zinc-950 text-white">
    <!-- Body -->
    <div class="flex flex-1">
      <main class="flex-1 p-6 space-y-10">
        <div class="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h2 class="text-3xl font-extrabold text-yellow-400 mb-4">
            Certificats
          </h2>
          <p class="text-sm text-gray-400 mb-6">
            Téléchargez votre certificat respectif et soyez fier de votre
            réussite. Les certificats grisés se débloqueront automatiquement
            quand vous franchirez les étapes requises. Seuil minimum pour
            débloquer : 100 USD ou équivalent.
          </p>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(certif, index) in certificates"
              :key="index"
              :class="[
                'relative p-5 border rounded-xl transition',
                certif.status === 'valid'
                  ? 'bg-zinc-800 border-zinc-700 hover:shadow-xl'
                  : 'bg-zinc-800 border-zinc-700 opacity-50 pointer-events-none blur-[1px]',
              ]"
            >
              <h3 class="text-yellow-300 font-semibold text-lg mb-2">
                {{ certif.title }}
              </h3>
              <p class="text-gray-300 text-sm mb-2">{{ certif.description }}</p>
              <p class="text-xs text-gray-500">Reçu le : {{ certif.date }}</p>

              <a
                v-if="certif.status === 'valid'"
                :href="certif.pdfUrl"
                download
                class="mt-4 inline-block bg-yellow-400 text-black text-sm font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
              >
                Télécharger PDF
              </a>

              <span
                v-else
                class="mt-4 inline-block bg-gray-600 text-white text-xs font-semibold px-4 py-2 rounded"
              >
                Verrouillé
              </span>
            </div>
          </div>

          <div
            v-if="certificates.length === 0"
            class="text-center text-gray-400 mt-10"
          >
            Aucun certificat disponible pour le moment.
          </div>
        </div>
      </main>
    </div>
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
