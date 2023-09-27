<script setup lang="ts">
import SalesChart from '@/components/Home/SalesChart.vue'
import Summary from '@/components/Home/Summary.vue'
import TopProducts from '@/components/Home/TopProducts.vue'
import VisitorsChart from '@/components/Home/VisitorsChart.vue'
import { ClipboardDocumentListIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="flex h-full w-full flex-col gap-8 overflow-auto lg:flex-row lg:gap-12">
    <!-- Left Section -->
    <div class="flex h-full w-full flex-col justify-between gap-8 lg:w-3/5">
      <div class="flex flex-col justify-center gap-2 p-4 md:flex-row lg:justify-between">
        <Summary title="orders" value="23,789">
          <ClipboardDocumentListIcon
            class="h-10 w-10 rounded-bl rounded-br-xl rounded-tl-xl rounded-tr bg-white p-2 text-main"
          />
        </Summary>
        <Summary title="profit" value="$12,890,89">
          <CurrencyDollarIcon
            class="h-10 w-10 rounded-bl rounded-br-xl rounded-tl-xl rounded-tr bg-white p-2 text-main"
          />
        </Summary>
      </div>

      <SalesChart />
    </div>

    <!-- Right Section -->
    <div class="flex h-full w-full flex-col justify-between gap-8 lg:w-2/5 lg:gap-4">
      <TopProducts />
      <VisitorsChart />
    </div>
  </div>
</template>
