```vue
<template>
  <div class="bg-black text-white min-h-screen">
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold text-center text-yellow-400 mb-4">
          Témoignages de nos Traders
        </h1>
        <p class="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-12">
          Découvrez les expériences de nos traders qui ont réussi le challenge AKAD
          et qui tradent maintenant avec un compte financé.
        </p>

        <!-- Featured Testimonials -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div v-for="testimonial in featuredTestimonials" :key="testimonial.name" 
               class="bg-zinc-900 rounded-xl overflow-hidden">
            <img :src="testimonial.image" :alt="testimonial.name" class="w-full h-48 object-cover" />
            <div class="p-6">
              <div class="flex items-center gap-4 mb-4">
                <div class="flex-1">
                  <h3 class="font-bold text-lg">{{ testimonial.name }}</h3>
                  <p class="text-yellow-400 text-sm">{{ testimonial.title }}</p>
                </div>
                <div class="flex gap-1">
                  <span v-for="n in 5" :key="n" class="text-yellow-400">★</span>
                </div>
              </div>
              <p class="text-gray-400 text-sm mb-4">{{ testimonial.content }}</p>
              <p class="text-sm text-gray-500">{{ testimonial.date }}</p>
            </div>
          </div>
        </div>

        <!-- All Testimonials -->
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="testimonial in testimonials" :key="testimonial.name"
               class="bg-zinc-800 p-6 rounded-xl">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                {{ testimonial.name.charAt(0) }}
              </div>
              <div>
                <h3 class="font-bold">{{ testimonial.name }}</h3>
                <p class="text-sm text-yellow-400">{{ testimonial.title }}</p>
              </div>
            </div>
            <p class="text-gray-300 text-sm">{{ testimonial.content }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const featuredTestimonials = [
  {
    name: 'Thomas R.',
    title: 'Trader AKAD depuis 2024',
    content: 'Le programme AKAD m\'a permis de développer une vraie discipline de trading. Le support est exceptionnel.',
    image: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg',
    date: 'Mars 2024'
  },
  {
    name: 'Sophie M.',
    title: 'Challenge réussi en 2 mois',
    content: 'La flexibilité du programme et la transparence des règles m\'ont permis de réussir sereinement.',
    image: 'https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg',
    date: 'Février 2024'
  },
  {
    name: 'Marc L.',
    title: 'Trader sur compte 100k',
    content: 'AKAD offre les meilleures conditions du marché. Le processus est clair et équitable.',
    image: 'https://images.pexels.com/photos/7567455/pexels-photo-7567455.jpeg',
    date: 'Janvier 2024'
  }
]

const testimonials = [
  {
    name: 'Julie D.',
    title: 'Trader Forex',
    content: 'La qualité du support technique est impressionnante. Toujours disponibles pour répondre à nos questions.'
  },
  {
    name: 'Pierre M.',
    title: 'Trader Indices',
    content: 'Les webinaires hebdomadaires sont une vraie valeur ajoutée pour progresser.'
  },
  {
    name: 'Sarah K.',
    title: 'Day Trader',
    content: 'Le système de paiement est rapide et fiable. Je reçois mes profits tous les 15 jours sans problème.'
  },
  {
    name: 'Antoine B.',
    title: 'Swing Trader',
    content: 'La plateforme est stable et les conditions de trading sont excellentes.'
  }
]

useSeoMeta({
  title: 'Témoignages - AKAD Trading',
  description: 'Découvrez les témoignages de nos traders qui ont réussi le challenge AKAD.'
})
</script>
```