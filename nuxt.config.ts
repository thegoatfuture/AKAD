export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: ['@/plugins/intersect.client.js'],
  app: {
    head: {
      meta: [
        {
          'http-equiv': 'Content-Security-Policy',
          content: "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://s3.tradingview.com"
        }
      ]
    }
  },
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://s3.tradingview.com"
        }
      }
    }
  },
  ssr: true,
  experimental: {
    payloadExtraction: false
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      nuxtSupabaseUrl: process.env.SUPABASE_URL,
      nuxtSupabaseAnonKey: process.env.SUPABASE_ANON_KEY
    },
  },
  devtools: {
    enabled: false
  }
})