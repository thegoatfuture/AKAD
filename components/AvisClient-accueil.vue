<template>
  <section class="bg-black text-white py-20">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-12 text-yellow-400">
        TÉMOIGNAGES DE NOS TRADERS
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="bg-zinc-800 p-6 rounded-lg shadow-md"
        >
          <div class="mb-4">
            <img
              :src="testimonial.image"
              alt=""
              class="w-full rounded-md object-cover"
            />
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ testimonial.name }}</h3>
          <p class="text-gray-300 text-sm mb-4">{{ testimonial.origin }}</p>
          <blockquote class="italic text-sm text-gray-400">
            « {{ testimonial.quote }} »
          </blockquote>
        </div>
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
    quote:
      "Je recommande AKAD à tout le monde, la plupart des gens n'y croient même pas. J'ai été surpris lors de la première Récompense entre moi et AKAD. C'est FOU",
  },
  {
    name: 'DAISY',
    origin: 'Kenya – 4 ans d’expérience',
    image: '/images/daisy.png',
    quote:
      "AKAD change des vies si vous respectez votre plan de trading. Si je peux le faire, vous pouvez également le faire. N'abandonnez pas votre rêve.",
  },
  {
    name: 'MUGI',
    origin: 'Mongolie – fière représentante FTMO',
    image: '/images/mugi.png',
    quote:
      'Je suis très reconnaissante pour cette opportunité et je voudrais recommander AKAD aux traders en France.',
  },
]
</script>
