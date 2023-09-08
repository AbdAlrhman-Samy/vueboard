<template>
  <div class="flex lg:justify-between items-center lg:items-start gap-6 lg:gap-24 flex-col justify-center lg:flex-row">
    <div class="flex flex-col gap-4">

      <div class="flex md:flex-row flex-col justify-between gap-4">
        <Summary title="orders" value="23,789">
          <ClipboardDocumentListIcon class="w-10 h-10 bg-white text-main p-2 rounded-tl-xl rounded-br-xl rounded-bl rounded-tr" />
        </Summary>

        <Summary title="profit" value="$12,890,89">
          <CurrencyDollarIcon class="w-10 h-10 bg-white text-main p-2 rounded-tl-xl rounded-br-xl rounded-bl rounded-tr" />
        </Summary>
      </div>

    </div>

    <div class="flex flex-col gap-4 w-full">

      <TopProducts />
      <VisitorsChart />

    </div>
  </div>
</template>

<script setup lang="ts">
import Summary from './Summary.vue';
import TopProducts from './TopProducts.vue';
import VisitorsChart from './VisitorsChart.vue';
import { ClipboardDocumentListIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline';


</script>

<style scoped>
h1 {
  text-align: center;
}
</style>