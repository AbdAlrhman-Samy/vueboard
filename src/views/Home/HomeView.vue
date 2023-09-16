<template>
  <div class="flex lg:justify-between items-center lg:items-start gap-4 lg:gap-24 flex-col justify-center lg:flex-row">
    

    <!-- Left Section -->
    <div class="flex flex-col gap-8 h-full justify-between grow">

      <!-- Badges -->
      <div class="flex md:flex-row flex-col lg:justify-evenly justify-center gap-2">
        <Summary title="orders" value="23,789">
          <ClipboardDocumentListIcon class="w-10 h-10 bg-white text-main p-2 rounded-tl-xl rounded-br-xl rounded-bl rounded-tr" />
        </Summary>
        <Summary title="profit" value="$12,890,89">
          <CurrencyDollarIcon class="w-10 h-10 bg-white text-main p-2 rounded-tl-xl rounded-br-xl rounded-bl rounded-tr" />
        </Summary>
      </div>

      <!-- Sales Chart -->
      <SalesChart />
    </div>

    <!-- Right Section -->
    <div class="flex flex-col lg:gap-4 gap-8">
      <TopProducts />
      <VisitorsChart />
    </div>

  </div>
</template>

<script setup lang="ts">
import SalesChart from './SalesChart.vue';
import Summary from './Summary.vue';
import TopProducts from './TopProducts.vue';
import VisitorsChart from './VisitorsChart.vue';
import { ClipboardDocumentListIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline';


</script>

<style scoped>

</style>