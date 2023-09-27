<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'
import ProductItem from './ProductItem.vue'
import Error from '@/components/Error.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import { computed, onUnmounted, toRaw } from 'vue'

const {
  data: products,
  isLoading,
  error,
  cancel
} = useFetch<ProductResponse>(
  'https://dummyjson.com/products?limit=4&skip=4&select=id,title,price,thumbnail'
)

onUnmounted(() => {
  cancel()
})

const computedProducts = computed(() => {
  if (!products.value) return []
  const productsList = toRaw(products.value.products)
  return productsList
})

interface ProductResponse {
  products: Product[]
  total: number
  limit: number
}

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
}
</script>

<template>
  <div class="flex flex-row items-center justify-between">
    <h3 class="text-2xl font-bold text-main">Top Selling Products</h3>

    <RouterLink
      to="/products"
      class="text-xs font-medium text-main-soft hover:text-main hover:underline"
    >
      View All
    </RouterLink>
  </div>

  <LoadingIndicator :isLoading="isLoading" />
  <Error :error="error" />

  <ul v-if="computedProducts">
    <ProductItem
      v-for="(product, index) in computedProducts"
      :key="product.id"
      :rank="index + 1"
      :product="product"
    />
  </ul>
</template>
