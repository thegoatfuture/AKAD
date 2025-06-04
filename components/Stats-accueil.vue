<template>
  <section class="bg-black text-white py-20 relative overflow-hidden">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-yellow-400">Des chiffres qui parlent</h2>
      <p class="mt-2 text-gray-300 text-sm">
        Notre mission : propulser chaque trader vers la réussite avec transparence et performance.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
      <div
        v-for="(item, index) in stats"
        :key="index"
        v-intersect="{ callback: () => visible[index] = true, once: true }"
      >
        <div
          class="bg-zinc-900 hover:bg-zinc-800 transition duration-300 rounded-xl text-center p-6 shadow-md transform"
          :class="{
            'opacity-0 translate-y-6': !visible[index],
            'opacity-100 translate-y-0': visible[index]
          }"
          style="transition: all 0.6s ease"
        >
          <component
            :is="item.icon"
            class="mx-auto h-8 w-8 text-yellow-400 mb-3"
            :aria-label="item.label"
          />
          <div class="text-3xl font-bold text-white drop-shadow-lg">
            <CountUp :to="item.value" :suffix="item.suffix" />
          </div>
          <p class="text-sm text-gray-400 mt-2">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { DollarSign, BarChart2, Users, Percent } from 'lucide-vue-next'
import CountUp from '@/components/CountUp.vue'

const stats = [
  { icon: BarChart2, value: 500, suffix: '+', label: 'Actifs à trader' },
  { icon: DollarSign, value: 20, suffix: 'M$', label: 'Versés à nos opérateurs' },
  { icon: Users, value: 25, suffix: ' ans', label: "d'expérience" },
  { icon: Percent, value: 90, suffix: '%', label: 'Des profits pour nos traders' }
]

const visible = ref(stats.map(() => false))
</script> 
<CountUp :to="item.value" :suffix="item.suffix" :start="visible[index]" />
