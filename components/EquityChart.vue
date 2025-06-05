<template>
  <div class="bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-zinc-800/50">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold text-yellow-400">Courbe d'Equity</h3>
      <div class="flex gap-2">
        <button v-for="period in periods" 
                :key="period.value"
                @click="selectedPeriod = period.value"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-colors',
                  selectedPeriod === period.value 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                ]">
          {{ period.label }}
        </button>
      </div>
    </div>
    
    <div class="h-[400px]">
      <Line
        :data="chartData"
        :options="chartOptions"
        class="h-full w-full"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const selectedPeriod = ref('1d')

const periods = [
  { label: '1J', value: '1d' },
  { label: '1S', value: '1w' },
  { label: '1M', value: '1m' }
]

// Sample data - replace with real data from your backend
const equityData = {
  '1d': {
    labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
    values: [100000, 100500, 101200, 100800, 101500, 101200, 102000, 101800]
  },
  '1w': {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    values: [100000, 101000, 102000, 101500, 102500, 103000, 102800]
  },
  '1m': {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    values: [100000, 102000, 103500, 102800]
  }
}

const chartData = computed(() => ({
  labels: equityData[selectedPeriod.value].labels,
  datasets: [{
    label: 'Equity',
    data: equityData[selectedPeriod.value].values,
    borderColor: '#facc15',
    backgroundColor: 'rgba(250, 204, 21, 0.1)',
    fill: true,
    tension: 0.4
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#9ca3af'
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#9ca3af'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>