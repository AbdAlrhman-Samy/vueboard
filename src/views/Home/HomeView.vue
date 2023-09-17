<script setup lang="ts">
import SalesChart from './SalesChart.vue';
import Summary from './Summary.vue';
import TopProducts from './TopProducts.vue';
import VisitorsChart from './VisitorsChart.vue';
import { ClipboardDocumentListIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline';


</script>

<template>
  <div class="flex flex-col items-center justify-center h-full gap-4 lg:justify-between lg:items-start lg:gap-24 lg:flex-row">
    

    <!-- Left Section -->
    <div class="flex flex-col h-full gap-8 grow">

      <!-- Badges -->
      <div class="flex flex-col justify-center gap-2 md:flex-row lg:justify-evenly">
        <Summary title="orders" value="23,789">
          <ClipboardDocumentListIcon class="w-10 h-10 p-2 bg-white rounded-tr rounded-bl text-main rounded-tl-xl rounded-br-xl" />
        </Summary>
        <Summary title="profit" value="$12,890,89">
          <CurrencyDollarIcon class="w-10 h-10 p-2 bg-white rounded-tr rounded-bl text-main rounded-tl-xl rounded-br-xl" />
        </Summary>
      </div>

      <!-- Sales Chart -->
      <SalesChart />
    </div>

    <!-- Right Section -->
    <div class="flex flex-col h-full gap-8 lg:gap-4">
      <TopProducts />
      <VisitorsChart />
    </div>

  </div>
</template>

<style scoped>

</style>