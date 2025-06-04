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
})
