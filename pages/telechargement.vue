<script setup>
definePageMeta({
  layout: 'dashboard',
})

const downloads = [
  {
    title: 'Guide du Trader',
    description:
      'Document PDF expliquant les règles, les phases et les bonnes pratiques.',
    link: '/downloads/guide-akad.pdf',
    type: 'pdf',
  },
  {
    title: 'Expert Advisor - MT5',
    description: 'Téléchargez notre EA exclusif pour MetaTrader 5.',
    link: '/downloads/ea-akad-mt5.zip',
    type: 'zip',
  },
  {
    title: 'Application Mobile',
    description: 'Lien pour télécharger l’app Android/iOS.',
    link: '/downloads/akad-app.apk',
    type: 'apk',
  },
]

const getIcon = (type) => {
  switch (type) {
    case 'pdf':
      return '📄'
    case 'zip':
      return '🗜️'
    case 'apk':
      return '📱'
    default:
      return '📁'
  }
}
</script>

<template>
  <div class="bg-zinc-950 text-white min-h-screen flex flex-col">
    <!-- Body -->
    <main class="p-6 flex-1">
      <h2 class="text-2xl font-bold text-yellow-400 mb-6">Téléchargements</h2>
      <p class="text-sm text-gray-400 mb-6">
        Tous vos outils pour une expérience AKAD optimale.
      </p>

      <div class="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in downloads"
          :key="index"
          class="bg-zinc-800 border border-zinc-700 rounded-xl p-5 hover:shadow-lg transition flex flex-col justify-between"
        >
          <div class="mb-4">
            <div class="flex items-center gap-3 mb-2">
              <span class="text-2xl">{{ getIcon(item.type) }}</span>
              <h3 class="text-yellow-300 font-semibold text-lg">
                {{ item.title }}
              </h3>
            </div>
            <p class="text-sm text-gray-400">{{ item.description }}</p>
          </div>
          <a
            :href="item.link"
            download
            class="bg-yellow-400 text-black text-sm font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition text-center"
          >
            Télécharger
          </a>
        </div>
      </div>

      <div
        v-if="downloads.length === 0"
        class="text-center text-gray-400 mt-10"
      >
        Aucun fichier disponible pour le moment.
      </div>
    </main>
  </div>
</template>
