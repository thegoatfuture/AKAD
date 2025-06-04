<script setup lang="ts">
import NotFound from '@/pages/404.vue'
const error = useError()
</script>

<template>
  <NuxtLayout>
    <NotFound v-if="error?.statusCode === 404" />
    <div
      v-else
      class="min-h-[60vh] flex flex-col items-center justify-center text-center py-10"
    >
      <h1 class="text-6xl font-bold mb-4">{{ error?.statusCode }}</h1>
      <p class="text-xl mb-6">{{ error?.message }}</p>
      <NuxtLink to="/" class="text-blue-500 hover:underline"
        >Retour à l'accueil</NuxtLink
      >
    </div>
  </NuxtLayout>
</template>
