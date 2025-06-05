<template>
  <div class="bg-black text-white overflow-x-hidden">
    <!-- 1. Hero principal -->
    <HeroAccueil />

    <!-- 2. CTA BOOST impactant -->
    <CtaBoostAccueil />

    <!-- 3. Stats visibles rapidement -->
    <ClientOnly>
      <StatsAccueil />
    </ClientOnly>

    <!-- 4. Trading view defile -->
    <DefilementAccueil />

    <!-- 5. Objectifs de trading dynamiques -->
    <ObjectifAccueil />

    <!-- 6. Étapes du trading -->
    <EtapeTradingAccueil />

    <!-- 7. Comparatif rapide des comptes -->
    <ComparatifAccueil />

    <!-- 8. Avis clients défilants (horizontal & classique) -->
    <AvisClientAccueil />
    <AvisHorizontalAccueil />

    <!-- 9. Marques de confiance / partenaires -->
    <TrustAccueil />

    <!-- 10. Foire Aux Questions -->
    <FaqAccueil />

    <!-- 11. Blog / Actualités pour SEO + réassurance -->
    <BlogAccueil />
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

useSeoMeta({
  title: 'AKAD - Challenge de trading professionnel',
  description:
    'Rejoignez le challenge AKAD et accédez à des outils pour améliorer vos performances de trading.',
})
</script>