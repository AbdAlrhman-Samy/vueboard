<template>
    <div class="flex flex-row justify-between items-center">
      <h3 class="text-2xl font-bold text-main">
        Top Selling Products
      </h3>

      <RouterLink to="/products" class="text-xs font-medium text-main-soft hover:underline hover:text-main">
        View All
      </RouterLink>
    </div>


    <div v-if="loading" class="flex items-center justify-center h-full">
      <div class="animate-spin rounded-full h-32 w-32 border-4 border-b-0 border-main"></div>
    </div>

    <ul v-if="topProducts.length && !loading" class="grid lg:grid-cols-2 gap-2 mt-4">
      <ProductItem v-for="(product, index) in topProducts" :key="product.id" :rank="index + 1" :image="product.thumbnail" :name="product.title" :price="product.price" />
    </ul>

    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProductItem from './ProductItem.vue';

const topProducts = ref<TopProducts[]>([]);
const loading = ref<boolean>(false);

function fetchTopProducts() {
  loading.value = true;
  fetch("https://dummyjson.com/products?limit=4&skip=4")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      topProducts.value = data.products;
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      loading.value = false;
    })
}

fetchTopProducts();
</script>

<style scoped>

</style>