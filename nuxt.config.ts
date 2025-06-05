export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    compatibilityDate: '2025-06-01',
  },
  plugins: ['@/plugins/intersect.client.js'], // 👈 Ajout du plugin d'intersection
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
})
