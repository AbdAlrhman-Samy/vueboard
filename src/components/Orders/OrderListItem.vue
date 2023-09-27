<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { BanknotesIcon, ChevronRightIcon, UserIcon } from '@heroicons/vue/24/solid'

const props = defineProps<Props>()

const router = useRouter()

const orderStatus = computed(() => {
  switch (status.value) {
    case 'pending':
      return 'bg-yellow-200 text-yellow-800'
    case 'completed':
      return 'bg-green-200 text-green-800'
    case 'cancelled':
      return 'bg-red-200 text-red-800'
    default:
      return 'bg-gray-200 text-gray-800'
  }
})

const status = computed(() => {
  const statuses = ['pending', 'completed', 'cancelled']
  return statuses[Math.floor(Math.random() * statuses.length)]
})

const adjustedOrderId = computed(() => {
  return props.order.id.toString().padStart(3, '0')
})

interface Props {
  order: {
    id: number | string
    userId: number
    totalQuantity: number
    discountedTotal: number
  }
}
</script>

<template>
  <div
    class="flex min-w-fit flex-row items-center justify-between gap-2 rounded rounded-bl-xl rounded-tr-xl bg-light p-4 transition-shadow hover:shadow"
  >
    <span class="w-fit text-xs font-bold text-gray-400"> #{{ adjustedOrderId }} </span>

    <div class="flex w-full flex-row items-center justify-between gap-8">
      <!-- User ID -->
      <div class="flex w-1/4 justify-center">
        <router-link
          class="flex w-fit flex-col items-center gap-2 text-center text-main md:flex-row"
          :to="{ name: 'user-details', params: { id: order.userId } }"
        >
          <UserIcon class="h-4 w-4 font-bold" />
          <span class="w-fit font-bold underline">
            {{ order.userId }}
          </span>
        </router-link>
      </div>

      <!-- Discounted Total -->
      <h2
        class="flex w-1/4 min-w-fit flex-col items-center justify-start gap-2 text-base font-bold text-main md:flex-row"
      >
        <BanknotesIcon class="h-4 w-4 font-bold" />
        ${{ order.discountedTotal }}
      </h2>

      <!-- Order Status -->
      <div
        class="w-1/4 min-w-fit items-center justify-center rounded-3xl px-4 py-1 text-center"
        :class="orderStatus"
      >
        <h2 class="text-xs font-semibold uppercase">
          {{ status }}
        </h2>
      </div>

      <!-- Show Order Details -->
      <div class="justify-self-end">
        <button
          @click="router.push({ name: 'order-details', params: { id: order.id } })"
          class="rounded-full border-2 border-main bg-light p-1 text-main transition-colors hover:bg-main hover:text-light"
        >
          <ChevronRightIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
