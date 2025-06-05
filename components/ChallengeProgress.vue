<template>
  <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
    <h3 class="text-xl font-bold text-yellow-400 mb-6">Progression du Challenge</h3>
    
    <div class="space-y-6">
      <div v-for="metric in metrics" :key="metric.label">
        <div class="flex justify-between text-sm mb-2">
          <span class="text-zinc-400">{{ metric.label }}</span>
          <span :class="metric.textColor">{{ metric.current }}{{ metric.unit }} / {{ metric.target }}{{ metric.unit }}</span>
        </div>
        <div class="h-2 bg-zinc-800 rounded-full">
          <div class="h-full rounded-full transition-all duration-500"
               :class="metric.barColor"
               :style="{ width: `${(metric.current / metric.target) * 100}%` }">
          </div>
        </div>
        <p v-if="metric.warning" class="text-yellow-400 text-xs mt-1">
          ⚠️ {{ metric.warning }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const metrics = [
  {
    label: 'Objectif de Profit',
    current: 7.5,
    target: 10,
    unit: '%',
    barColor: 'bg-green-400',
    textColor: 'text-green-400'
  },
  {
    label: 'Jours de Trading',
    current: 8,
    target: 14,
    unit: '',
    barColor: 'bg-blue-400',
    textColor: 'text-blue-400'
  },
  {
    label: 'Perte Maximale',
    current: 4.8,
    target: 10,
    unit: '%',
    barColor: 'bg-yellow-400',
    textColor: 'text-yellow-400',
    warning: 'Approche de la limite de drawdown'
  },
  {
    label: 'Perte Journalière',
    current: 2.1,
    target: 5,
    unit: '%',
    barColor: 'bg-purple-400',
    textColor: 'text-purple-400'
  }
]
</script>