<template>
  <div :class="['rounded-xl shadow-lg p-6 md:p-8 transition-transform hover:-translate-y-1', bgColor]">
    <!-- Badge et titre principal -->
    <div class="flex items-center gap-4 mb-4">
      <div class="text-white text-3xl">
        <slot name="icon" />
      </div>
      <div>
        <p class="text-sm font-semibold text-white uppercase">{{ badge }}</p>
        <h3 class="text-xl font-bold text-white">{{ title }}</h3>
      </div>
    </div>

    <!-- Description -->
    <p class="text-white mb-4">
      {{ description }}
    </p>

    <!-- Liste des avantages -->
    <ul class="text-white space-y-2">
      <li v-for="(item, index) in features" :key="index" class="flex items-start gap-2">
        <CheckIcon class="w-5 h-5 text-white flex-shrink-0 mt-1" />
        <span>{{ item }}</span>
      </li>
    </ul>

    <!-- Bouton -->
    <div class="mt-6 text-center">
      <NuxtLink
        :to="link"
        class="inline-block bg-white text-black font-semibold px-5 py-2 rounded hover:bg-gray-200 transition"
      >
        {{ buttonText }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { CheckIcon } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  badge: String,
  description: String,
  features: Array,
  link: String,
  buttonText: String,
  bgColor: {
    type: String,
    default: 'bg-blue-600'
  }
})
</script>