<template>
  <div class="bg-black text-white min-h-screen">
    <Header />

    <section class="max-w-3xl mx-auto px-4 py-20">
      <h1 class="text-4xl font-bold text-yellow-400 mb-6">Contact</h1>
      <p class="text-gray-300 mb-12">
        Une question ? Une remarque ? N'hésite pas à nous écrire via ce formulaire.
      </p>

      <form class="grid gap-6">
        <div>
          <label for="name" class="block text-sm font-medium mb-1">Prénom</label>
          <input
            type="text"
            id="name"
            placeholder="Votre prénom"
            class="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            placeholder="votremail@example.com"
            class="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-medium mb-1">Message</label>
          <textarea
            id="message"
            rows="5"
            placeholder="Votre message ici..."
            class="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
        </div>

        <button
          type="submit"
          class="bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-500 transition"
        >
          Envoyer le message
        </button>
      </form>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>
