<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const data = {
  labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Users',
      backgroundColor: 'rgba(66, 66, 125, 0.05)',
      borderColor: '#7979B2',
      data: [4000, 3700, 1900, 4000, 3200, 6400, 4000],
      fill: true,
      pointBackgroundColor: '#42427D',
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 4000
      }
    },
    x: {
      grid: {
        display: false
      },
    }
  },
  plugins: {
    legend: {
      display: false
    }
  },
  elements: {
    line: {
      tension: 0.4
    }
  },


}


</script>

<template>
  <div class="flex flex-col">

    <h3 class="mb-4 text-2xl font-bold text-main">
      Daily Users
    </h3>

    <div class="w-full h-full grow">
      <Line :data="data" :options="options" />
    </div>

  </div>
</template>

<style scoped></style>