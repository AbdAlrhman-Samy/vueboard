<script setup lang="ts">
import { ref } from 'vue'
import ProductItem from './ProductItem.vue'

const topProducts = ref<TopProducts[]>([])
const loading = ref<boolean>(false)

function fetchTopProducts() {
  loading.value = true
  fetch('https://dummyjson.com/products?limit=4&skip=4')
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
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

  <div v-if="loading" class="flex h-full items-center justify-center">
    <div class="h-32 w-32 animate-spin rounded-full border-4 border-b-0 border-main"></div>
  </div>

  <ul v-if="topProducts.length && !loading">
    <ProductItem
      v-for="(product, index) in topProducts"
      :key="product.id"
      :rank="index + 1"
      :image="product.thumbnail"
      :name="product.title"
      :price="product.price"
    />
  </ul>
</template>

<style scoped></style>
