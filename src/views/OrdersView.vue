<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'
import OrderListItem from '@/components/Orders/OrderListItem.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import Error from '@/components/Error.vue'

const { data, isLoading, error } = useFetch<Order>('https://dummyjson.com/carts')

interface Cart {
  id: number | string
  userId: number
  totalQuantity: number
  discountedTotal: number
}

interface Order {
  carts: Cart[]
}
</script>

<template>
  <LoadingIndicator :isLoading="isLoading" />

  <Error :error="error" />

  <div v-if="!isLoading && data" class="flex h-full w-full flex-col gap-4 overflow-auto">
    <OrderListItem v-for="order in data.carts" :key="order.id" :order="order" />
  </div>
</template>
