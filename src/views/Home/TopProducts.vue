<template>
    <div class="flex flex-row lg:justify-between justify-center items-center gap-8">
      <h3 class="text-2xl font-bold text-main">
        Top Selling Products
      </h3>

      <RouterLink to="/products" class="text-xs font-medium text-main-soft hover:underline hover:text-main">
        View All
      </RouterLink>
    </div>

    <ul v-if="topProducts.length">
      <ProductItem v-for="(product, index) in topProducts" :key="product.id" :rank="index + 1" :image="product.thumbnail" :name="product.title" :price="product.price" />
    </ul>

    
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProductItem from './ProductItem.vue';

// create type for topProducts
type TopProducts = {
  id: string;
  title: string;
  price: string;
  thumbnail: string;
}

const topProducts = ref<TopProducts[]>([]);

function fetchTopProducts() {
  fetch("https://dummyjson.com/products?limit=4&skip=4")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      topProducts.value = data.products;
    })
}


onMounted(() => {
  fetchTopProducts();
})

</script>

<style scoped>

</style>