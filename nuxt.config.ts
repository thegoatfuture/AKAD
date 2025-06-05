export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: ['@/plugins/intersect.client.js'],
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      nuxtSupabaseUrl: process.env.NUXT_SUPABASE_URL,
      nuxtSupabaseAnonKey: process.env.NUXT_SUPABASE_ANON_KEY
    },
  },
  devtools: {
    enabled: false
  }
})