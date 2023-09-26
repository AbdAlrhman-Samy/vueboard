<script setup lang="ts">
import { ref } from 'vue'
import ProductItem from './ProductItem.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

const topProducts = ref<Product[]>([])
const loading = ref<boolean>(false)

/**
 * !: change to use the useFetch composable
 */

function fetchTopProducts() {
  loading.value = true
  fetch('https://dummyjson.com/products?limit=4&skip=4&select=id,title,price,thumbnail')
    .then((res) => res.json())
    .then((data) => {
      topProducts.value = data.products
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}

fetchTopProducts()

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

  <LoadingIndicator :isLoading="loading" />

  <ul v-if="topProducts.length && !loading">
    <ProductItem
      v-for="(product, index) in topProducts"
      :key="product.id"
      :rank="index + 1"
      :product="product"
    />
  </ul>
</template>

<style scoped></style>
