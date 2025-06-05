<template>
  <section class="bg-black text-white py-20">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-12 text-yellow-400">
        TÉMOIGNAGES DE NOS TRADERS
      </h2>

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="bg-zinc-800/50 backdrop-blur p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative group"
        >
          <!-- Decorative elements -->
          <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <!-- Image container -->
          <div class="relative mb-6 transform transition-transform group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
            <img
              :src="testimonial.image"
              :alt="`Photo de ${testimonial.name}`"
              class="w-full h-48 object-cover rounded-xl"
            />
            <!-- Quote icon -->
            <div class="absolute -bottom-4 -right-4 bg-yellow-400 text-black p-2 rounded-full shadow-lg">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="relative">
            <h3 class="text-xl font-bold mb-1 text-yellow-400">{{ testimonial.name }}</h3>
            <p class="text-gray-400 text-sm mb-4">{{ testimonial.origin }}</p>
            <blockquote class="relative">
              <p class="italic text-sm text-gray-300 leading-relaxed">
                « {{ testimonial.quote }} »
              </p>
            </blockquote>

            <!-- Rating stars -->
            <div class="flex gap-1 mt-4">
              <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="text-center mt-12">
        <NuxtLink
          to="/avis"
          class="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-colors"
        >
          Voir tous les témoignages
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: 'PEPE',
    origin: 'Pays-Bas – 76 000 $ de gains à 19 ans',
    image: '/images/pepe.png',
    quote: "Je recommande AKAD à tout le monde, la plupart des gens n'y croient même pas. J'ai été surpris lors de la première Récompense entre moi et AKAD. C'est FOU",
  },
  {
    name: 'DAISY',
    origin: 'Kenya – 4 ans d'expérience',
    image: '/images/daisy.png',
    quote: "AKAD change des vies si vous respectez votre plan de trading. Si je peux le faire, vous pouvez également le faire. N'abandonnez pas votre rêve.",
  },
  {
    name: 'MUGI',
    origin: 'Mongolie – fière représentante FTMO',
    image: '/images/mugi.png',
    quote: 'Je suis très reconnaissante pour cette opportunité et je voudrais recommander AKAD aux traders en France.',
  },
]
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Hover animations */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:-translate-y-2 {
  transform: translateY(-8px);
}
</style>