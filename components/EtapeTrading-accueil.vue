<template>
  <section class="bg-gradient-to-b from-zinc-900 to-black py-20 px-4 relative overflow-hidden">
    <!-- Animated background pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0 bg-[url('/images/pattern-light.svg')] bg-repeat animate-slide"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <h2 class="text-4xl font-bold text-center text-white mb-16">
        MONTREZ-NOUS VOTRE TALENT ET SOYEZ
        <span class="text-yellow-400">RÉCOMPENSÉS</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Challenge Card -->
        <div class="group bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
          <div class="relative">
            <img src="/images/evaluation.png" alt="Evaluation" class="w-full h-48 object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent"></div>
            <div class="absolute top-4 left-4">
              <span class="bg-blue-500/30 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">ÉTAPE 01</span>
            </div>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-white">AKAD CHALLENGE</h3>
              <p class="text-blue-100 text-sm leading-relaxed mt-4">
                Le AKAD Challenge évalue votre discipline et votre maîtrise du trading. Démontrez votre expertise en suivant nos règles de gestion des risques.
              </p>

              <div class="pt-4 space-y-2">
                <h4 class="text-blue-200 text-sm font-semibold">ÉTAPE 02 - VERIFICATION</h4>
                <p class="text-blue-100/80 text-sm">
                  Confirmez vos compétences avec des objectifs simplifiés et des règles identiques.
                </p>
              </div>
            </div>

            <NuxtLink to="/challenge" class="mt-6 inline-flex items-center justify-center w-full bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-all">
              DÉCOUVRIR LE CHALLENGE
            </NuxtLink>
          </div>
        </div>

        <!-- AKAD Account Card -->
        <div class="group bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
          <div class="relative">
            <img src="/images/account.png" alt="Account" class="w-full h-48 object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-transparent"></div>
            <div class="absolute top-4 left-4">
              <span class="bg-emerald-500/30 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">ÉTAPE 03</span>
            </div>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-white">AKAD TRADER</h3>
              <p class="text-emerald-100 text-sm leading-relaxed mt-4">
                Accédez à un compte avec fonds fictifs jusqu'à 200 000 €, recevez jusqu'à 90% des bénéfices simulés.
              </p>

              <ul class="space-y-2 mt-4">
                <li class="flex items-center text-sm text-emerald-100">
                  <svg class="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Capital fictif jusqu'à 200 000 €
                </li>
                <li class="flex items-center text-sm text-emerald-100">
                  <svg class="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Coaching performance inclus
                </li>
                <li class="flex items-center text-sm text-emerald-100">
                  <svg class="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Programme Premium AKAD
                </li>
              </ul>
            </div>

            <NuxtLink to="/trader" class="mt-6 inline-flex items-center justify-center w-full bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-all">
              EN SAVOIR PLUS
            </NuxtLink>
          </div>
        </div>

        <!-- Quantlane Card -->
        <div class="group bg-gradient-to-br from-orange-900 to-orange-800 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
          <div class="relative">
            <img src="/images/pro.png" alt="Pro Trading" class="w-full h-48 object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-orange-900/90 to-transparent"></div>
            <div class="absolute top-4 left-4">
              <span class="bg-orange-500/30 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">ÉTAPE 04</span>
            </div>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-white">QUANTLANE TRADER</h3>
              <p class="text-orange-100 text-sm leading-relaxed mt-4">
                Devenez trader professionnel chez Quantlane avec un contrat réel et une infrastructure institutionnelle.
              </p>

              <ul class="space-y-2 mt-4">
                <li class="flex items-center text-sm text-orange-100">
                  <svg class="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Contrat avec salaire fixe
                </li>
                <li class="flex items-center text-sm text-orange-100">
                  <svg class="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Coach en Performance & Mindset
                </li>
                <li class="flex items-center text-sm text-orange-100">
                  <svg class="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Outils professionnels dédiés
                </li>
              </ul>
            </div>

            <NuxtLink to="/quantlane" class="mt-6 inline-flex items-center justify-center w-full bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-all">
              DEVENIR PRO TRADER
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes slide {
  0% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}

.animate-slide {
  animation: slide 20s linear infinite;
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>