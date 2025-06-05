<template>
  <section class="relative bg-black text-white overflow-hidden py-28 px-6 lg:px-12">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-0 left-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
    </div>

    <!-- Main content -->
    <div class="relative max-w-5xl mx-auto text-center">
      <div class="space-y-6">
        <!-- Main heading with animated typing effect -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
          <span class="inline-block mb-2">Rejoignez une PROP FIRM d'élite</span>
          <br />
          <span class="text-yellow-400 inline-block typewriter">et devenez trader financé</span>
        </h1>

        <!-- Subheading with gradient text -->
        <p class="mt-6 text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 max-w-2xl mx-auto">
          Prouvez votre discipline et vos compétences. Gagnez jusqu'à 200 000 € de
          capital de trading simulé grâce à notre évaluation structurée.
        </p>

        <!-- Stats section -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
          <div class="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-xl">
            <div class="text-2xl font-bold text-yellow-400">
              <CountUp :to="200" suffix="k€" />
            </div>
            <p class="text-sm text-gray-400">Capital maximum</p>
          </div>
          <div class="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-xl">
            <div class="text-2xl font-bold text-yellow-400">
              <CountUp :to="90" suffix="%" />
            </div>
            <p class="text-sm text-gray-400">Profit sharing</p>
          </div>
          <div class="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-xl">
            <div class="text-2xl font-bold text-yellow-400">
              <CountUp :to="24" suffix="h" />
            </div>
            <p class="text-sm text-gray-400">Support réactif</p>
          </div>
          <div class="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-xl">
            <div class="text-2xl font-bold text-yellow-400">
              <CountUp :to="14" suffix=" jours" />
            </div>
            <p class="text-sm text-gray-400">Paiement rapide</p>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <NuxtLink
            to="/evaluation"
            class="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
          >
            DÉMARRER L'ÉVALUATION
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold px-8 py-4 rounded-xl text-lg transition-all"
          >
            NOUS CONTACTER
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CountUp from '@/components/CountUp.vue'
</script>

<style scoped>
.typewriter {
  overflow: hidden;
  border-right: 0.15em solid #fbbf24;
  white-space: nowrap;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #fbbf24 }
}

.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.delay-500 {
  animation-delay: 500ms;
}

.delay-1000 {
  animation-delay: 1000ms;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1) translate(var(--tw-translate-x), var(--tw-translate-y));
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05) translate(var(--tw-translate-x), var(--tw-translate-y));
  }
}
</style>