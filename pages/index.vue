<template>
  <div class="bg-black text-white overflow-x-hidden">
    <!-- 1. Hero principal avec animation -->
    <ClientOnly>
      <HeroAccueil />
    </ClientOnly>

    <!-- 2. Défilement des cours en temps réel -->
    <ClientOnly>
      <DefilementAccueil />
    </ClientOnly>

    <!-- 3. Stats avec animation au scroll -->
    <ClientOnly>
      <StatsAccueil />
    </ClientOnly>

    <!-- 4. Étapes du trading avec design amélioré -->
    <ClientOnly>
      <EtapeTradingAccueil />
    </ClientOnly>

    <!-- 5. Objectifs de trading dynamiques -->
    <ClientOnly>
      <ObjectifAccueil />
    </ClientOnly>

    <!-- 6. Comparatif des comptes -->
    <ClientOnly>
      <ComparatifAccueil />
    </ClientOnly>

    <!-- 7. Avis clients avec carrousel -->
    <ClientOnly>
      <AvisClientAccueil />
    </ClientOnly>

    <!-- 8. Avis horizontaux avec animation -->
    <ClientOnly>
      <AvisHorizontalAccueil />
    </ClientOnly>

    <!-- 9. Marques de confiance -->
    <ClientOnly>
      <TrustAccueil />
    </ClientOnly>

    <!-- 10. FAQ interactive -->
    <ClientOnly>
      <FaqAccueil />
    </ClientOnly>

    <!-- 11. Blog avec images optimisées -->
    <ClientOnly>
      <BlogAccueil />
    </ClientOnly>

    <!-- 12. CTA Boost avec compte à rebours -->
    <ClientOnly>
      <CtaBoostAccueil />
    </ClientOnly>

    <!-- 13. Bande flottante avec notifications -->
    <ClientOnly>
      <BandeFlottanteAccueil />
    </ClientOnly>
  </div>
</template>

<script setup>
import HeroAccueil from '@/components/Hero-accueil.vue'
import StatsAccueil from '@/components/Stats-accueil.vue'
import CtaBoostAccueil from '@/components/cta-boost-accueil.vue'
import EtapeTradingAccueil from '@/components/EtapeTrading-accueil.vue'
import ComparatifAccueil from '@/components/comparatif-accueil.vue'
import DefilementAccueil from '@/components/defilement-accueil.vue'
import ObjectifAccueil from '@/components/objectif-accueil.vue'
import AvisClientAccueil from '@/components/AvisClient-accueil.vue'
import AvisHorizontalAccueil from '@/components/AvisHorizontal-accueil.vue'
import TrustAccueil from '@/components/trust-accueil.vue'
import FaqAccueil from '@/components/faq-accueil.vue'
import BlogAccueil from '@/components/blog-accueil.vue'
import BandeFlottanteAccueil from '@/components/bande-flottante-accueil.vue'

useSeoMeta({
  title: 'AKAD - Prop Firm de Trading Professionnelle',
  description: 'Rejoignez AKAD, votre partenaire pour devenir un trader professionnel. Accédez à des comptes financés jusqu\'à 200 000€ et bénéficiez d\'un accompagnement personnalisé.',
  ogTitle: 'AKAD - Prop Firm de Trading Professionnelle',
  ogDescription: 'Devenez un trader professionnel avec AKAD. Comptes financés jusqu\'à 200 000€.',
  ogImage: 'https://akad-trading.com/images/og-image.jpg',
  twitterCard: 'summary_large_image',
})

// Optimisations de performance
onMounted(() => {
  // Préchargement des images importantes
  const imagesToPreload = [
    '/images/hero-bg.jpg',
    '/images/evaluation.png',
    '/images/account.png',
    '/images/pro.png'
  ]
  
  imagesToPreload.forEach(src => {
    const img = new Image()
    img.src = src
  })
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>