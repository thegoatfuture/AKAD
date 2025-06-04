<template>
  <section class="bg-white py-20 px-4">
    <h2 class="text-4xl font-bold text-center text-black mb-16">
      MONTREZ-NOUS VOTRE TALENT ET SOYEZ RÉCOMPENSÉS
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
      <!-- Bloc 1 -->
      <div class="bg-blue-800 text-white rounded-xl overflow-hidden shadow-lg flex flex-col h-full">
        <img src="/images/evaluation.png" alt="Evaluation" class="w-full object-cover" />
        <div class="p-6 flex flex-col flex-grow">
          <div class="space-y-3 flex-grow">
            <p class="text-blue-300 text-sm font-bold pt-2">ÉTAPE 01</p>
            <h3 class="text-xl font-bold">AKAD CHALLENGE</h3>
            <p class="text-sm">
              Le AKAD Challenge éduque les traders et les amène à maîtriser leurs habitudes de trading. Les traders
              démontrent leur expérience en suivant nos Objectifs de Trading inspirés des règles clés de la gestion du
              risque. Une fois le AKAD Challenge réussi, les traders passent à l'étape de la Verification.
            </p>

            <p class="text-blue-300 text-sm font-bold pt-2">ÉTAPE 02</p>
            <h4 class="font-bold">VERIFICATION</h4>
            <p class="text-sm">
              L'étape de la Verification permet de confirmer les compétences démontrées lors du AKAD Challenge. Objectifs
              simplifiés, règles identiques. Une fois réussie, accès à un AKAD Account.
            </p>

            <p class="text-blue-200 text-xs font-semibold uppercase pt-2">OUTILS ET SERVICES DE TRADING</p>
          </div>
          <div class="pt-4 text-center">
            <NuxtLink
              to="/challenge"
              class="inline-block bg-blue-100 text-blue-900 font-semibold text-sm px-5 py-2 rounded hover:bg-blue-200 transition"
            >
              EN SAVOIR PLUS
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Bloc 2 -->
      <div class="bg-emerald-700 text-white rounded-xl overflow-hidden shadow-lg flex flex-col h-full">
        <img src="/images/account.png" alt="Account" class="w-full object-cover" />
        <div class="p-6 flex flex-col flex-grow">
          <div class="space-y-3 flex-grow">
            <p class="text-emerald-200 text-sm font-bold pt-2">ÉTAPE 03</p>
            <h3 class="text-xl font-bold">AKAD TRADER</h3>
            <p class="text-sm">
              Accédez à un compte AKAD avec fonds fictifs jusqu'à 200 000 $, recevez jusqu'à 90 % des bénéfices simulés,
              sans risque personnel, et rejoignez notre programme premium.
            </p>

            <ul class="list-disc text-sm pl-5 pt-2 space-y-1 text-white">
              <li>FTMO Account avec des fonds fictifs jusqu’à 200 000 $</li>
              <li>Récompense jusqu’à 90 % des bénéfices simulés</li>
              <li>Coaching performance</li>
              <li>Programme Premium AKAD</li>
            </ul>
          </div>
          <div class="pt-4 text-center">
            <NuxtLink
              to="/trader"
              class="inline-block bg-emerald-100 text-emerald-900 font-semibold text-sm px-5 py-2 rounded hover:bg-emerald-200 transition"
            >
              EN SAVOIR PLUS
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Bloc 3 -->
      <div class="bg-orange-700 text-white rounded-xl overflow-hidden shadow-lg flex flex-col h-full">
        <img src="/images/pro.png" alt="Pro Trading" class="w-full object-cover" />
        <div class="p-6 flex flex-col flex-grow">
          <div class="space-y-3 flex-grow">
            <p class="text-orange-200 text-sm font-bold pt-2">ÉTAPE 04</p>
            <h3 class="text-xl font-bold">QUATLANE TRADER</h3>
            <p class="text-sm">
              Devenez trader professionnel chez Quantlane avec un contrat réel, un coaching mindset et une infrastructure
              de trading institutionnelle.
            </p>

            <ul class="list-disc text-sm pl-5 pt-2 space-y-1 text-white">
              <li>Contrat avec salaire fixe</li>
              <li>Coach en Performance & Mindset</li>
              <li>Environnement de trading pro</li>
              <li>Plateforme & outils personnalisés</li>
            </ul>
          </div>
          <div class="pt-4 text-center">
            <NuxtLink
              to="/quantlane"
              class="inline-block bg-orange-100 text-orange-900 font-semibold text-sm px-5 py-2 rounded hover:bg-orange-200 transition"
            >
              EN SAVOIR PLUS
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
