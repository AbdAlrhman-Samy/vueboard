<template>
  <div class="flex flex-col w-full lg:h-96">

    <h3 class="text-2xl mb-4 font-bold text-main">
      Sales
    </h3>

    <div class="h-max w-full grow">
      <Line :data="data" :options="options" />
    </div>

  </div>
</template>

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
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Orders',
      backgroundColor: '#C7F2FFaa',
      borderColor: '#C7F2FF',
      data: [4000, 3700, 1900, 4000, 3200, 6400, 11000],
      pointBackgroundColor: '#42427D',
    },

    {
      label: 'Profit',
      backgroundColor: 'rgba(66, 66, 125, 0.15)',
      borderColor: '#FFE5EE',
      data: [2000, 1700, 900, 2000, 1200, 4400, 9000],
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
        stepSize: 2000
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

<style scoped></style>