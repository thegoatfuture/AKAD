<template>
  <footer class="bg-zinc-900 pt-20 pb-8">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <!-- Brand Column -->
        <div class="md:col-span-4 space-y-6">
          <img src="/images/logo-pf-nofond.svg" alt="Logo" class="h-16 mb-6" />
          <div class="space-y-4">
            <div class="flex items-start gap-3 text-gray-400">
              <svg class="w-5 h-5 mt-1 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <div>
                <p class="font-medium text-white">Quadrio offices</p>
                <p>Adresse fictive, France</p>
              </div>
            </div>
            <div class="flex items-start gap-3 text-gray-400">
              <svg class="w-5 h-5 mt-1 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <div>
                <p class="font-medium text-white">Contact</p>
                <p>support@akadfirm.com</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="md:col-span-2">
          <h4 class="text-lg font-semibold text-white mb-6">Entreprise</h4>
          <ul class="space-y-4">
            <li v-for="link in companyLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-gray-400 hover:text-yellow-400 transition-colors">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div class="md:col-span-2">
          <h4 class="text-lg font-semibold text-white mb-6">Légal</h4>
          <ul class="space-y-4">
            <li v-for="link in legalLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-gray-400 hover:text-yellow-400 transition-colors">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter Section -->
        <div class="md:col-span-4">
          <h4 class="text-lg font-semibold text-white mb-6">Newsletter</h4>
          <p class="text-gray-400 mb-4">
            Recevez nos dernières actualités et analyses de marché.
          </p>
          <form @submit.prevent="subscribeNewsletter" class="space-y-4">
            <div class="relative">
              <input
                v-model="email"
                type="email"
                placeholder="Votre email"
                class="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                required
              />
              <button
                type="submit"
                class="absolute right-2 top-2 px-4 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors"
              >
                S'abonner
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="border-t border-zinc-800 pt-8 pb-12">
        <h4 class="text-center text-sm font-semibold text-white mb-6">
          Moyens de paiement acceptés
        </h4>
        <div class="flex flex-wrap justify-center items-center gap-6">
          <img v-for="method in paymentMethods" 
               :key="method.name"
               :src="method.logo" 
               :alt="method.name"
               class="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-zinc-800 pt-8 text-center text-sm text-gray-400">
        <p class="max-w-3xl mx-auto">
          Veuillez noter que tous les comptes fournis sont démo avec des fonds fictifs et que tout trade s'effectue dans un environnement simulé. Voir notre
          <NuxtLink to="/faq" class="text-yellow-400 hover:underline">FAQ</NuxtLink>.
        </p>
        <p class="mt-4">© {{ new Date().getFullYear() }} AKAD. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const companyLinks = [
  { name: 'À propos', to: '/about' },
  { name: 'Contact', to: '/contact' },
  { name: 'Carrières', to: '/careers' },
  { name: 'Press Kit', to: '/press' },
]

const legalLinks = [
  { name: 'Mentions légales', to: '/legal/mentions' },
  { name: 'CGU', to: '/legal/cgu' },
  { name: 'RGPD', to: '/legal/rgpd' },
]

const paymentMethods = [
  { name: 'Visa', logo: '/images/visa.svg' },
  { name: 'Mastercard', logo: '/images/mastercard.svg' },
  { name: 'PayPal', logo: '/images/paypal.svg' },
  { name: 'Bank Transfer', logo: '/images/bank-transfert.svg' },
  { name: 'Skrill', logo: '/images/skrill.svg' },
]

async function subscribeNewsletter() {
  if (!email.value) return
  
  try {
    await $fetch('/api/newsletter/subscribe', {
      method: 'POST',
      body: { email: email.value }
    })
    email.value = ''
    alert('Inscription réussie à la newsletter!')
  } catch (error) {
    alert('Une erreur est survenue. Veuillez réessayer.')
  }
}
</script>